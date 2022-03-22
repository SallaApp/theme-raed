import BasePage from './base-page';
import ProductOptions from './partials/product-options';

class Cart extends BasePage {
    onReady() {
        // keep update the dom base in the events
        salla.event.cart.onItemUpdated(res => this.updateCartPageInfo(res.data.cart));
        salla.event.cart.onItemDeleted(res => this.updateCartPageInfo(res.data.cart));
        salla.event.coupon.onAdded(res => this.updateCartPageInfo(res.data.cart));
        salla.event.coupon.onRemoved(res => this.updateCartPageInfo(res.data.cart));

        app.watchElements({
            couponCodeInput: '#coupon-input',
            couponBtn: '#coupon-btn',
            couponError: '#coupon-error',
            subTotal: '#sub-total',
            totalDiscount: '#total-discount',
            shippingCost: '#shipping-cost',
            freeShipping: '#free-shipping',
            freeShippingBar: '#free-shipping-bar',
            freeShipppingMsg: '#free-shipping-msg',
            freeShipApplied: '#free-shipping-applied'
        });

        this.initiateCoupon();

        new ProductOptions();

        app.on('input', '[name="quantity"]', event => salla.helpers.inputDigitsOnly(event.target));
    }

    /**
     * @param  {CartDetailsResponse} cartData
     */
    updateCartPageInfo(cartData) {
        // update each item data
        cartData.items?.forEach(item => this.updateItemInfo(item));

        app.subTotal.innerText = salla.money(cartData.sub_total);

        app.toggleElementClassIf(app.totalDiscount, 'discounted', 'hidden', () => cartData.total_discount)
            .toggleElementClassIf(app.shippingCost, 'has_shipping', 'hidden', () => cartData.shipping_cost)
            .toggleElementClassIf(app.freeShipping, 'has_free', 'hidden', () => cartData.free_shipping_bar);

        app.totalDiscount.querySelector('b').innerText = '- ' + salla.money(cartData.total_discount);
        app.shippingCost.querySelector('b').innerText = salla.money(cartData.shipping_cost);

        if (!cartData.free_shipping_bar) {
            return;
        }

        let isFree = cartData.free_shipping_bar.has_free_shipping;
        app.toggleElementClassIf(app.freeShippingBar, 'active', 'hidden', () => !isFree)
            .toggleElementClassIf(app.freeShipApplied, 'active', 'hidden', () => isFree);

        app.freeShipppingMsg.innerHTML = isFree ? salla.lang.get('pages.cart.has_free_shipping')
            : salla.lang.get('pages.cart.free_shipping_alert', {amount: salla.money(cartData.free_shipping_bar.remaining)});
        app.freeShippingBar.children[0].style.width = cartData.free_shipping_bar.percent + '%';
    }

    // /**
    //  * @param {HTMLElement} quantity
    //  */
    // reduceQuantity(quantity) {
    //     if (quantity.value <= 1) {
    //         return;
    //     }
    //     quantity.value--;
    //     this.qunatityChanged(quantity);
    // }

    // /**
    //  * Workaround to fire data-on-change="cart::update.item"
    //  *
    //  * @param {HTMLElement} quantity
    //  */
    // qunatityChanged(quantity) {
    //     app.debounce(() => salla.document.event.fireEvent(quantity, 'change', {'bubbles': true}));
    // }

    /**
     * @param {CartItem} item
     */
    updateItemInfo(item) {

        // lets get the elements for this item
        let cartItem = document.querySelector('#item-' + item.id),
            totalElement = cartItem.querySelector('.item-total'),
            priceElement = cartItem.querySelector('.item-price'),
            regularPriceElement = cartItem.querySelector('.item-regular-price'),
            offerElement = cartItem.querySelector('.offer-name'),
            offerIconElement = cartItem.querySelector('.offer-icon');

        if (item.total !== totalElement.innerText) {
            totalElement.innerText = salla.money(item.total);
            app.anime(totalElement, {scale: [.88, 1]});
        }

        app.toggleElementClassIf(offerElement, 'offer-applied', 'hidden', () => item.has_special_price)
            .toggleElementClassIf(offerIconElement, 'offer-applied', 'hidden', () => item.has_special_price)
            .toggleElementClassIf(regularPriceElement, 'offer-applied', 'hidden', () => item.has_special_price)
            .toggleElementClassIf(priceElement, 'text-theme-red', 'text-sm text-gray-400', () => item.has_special_price);

        if (!item.has_special_price) {
            priceElement.innerText = salla.money(item.product_price);
            return;
        }

        priceElement.innerText = salla.money(item.product_price);
        offerElement.innerText = item.offer.names;
    }


    //=================== Coupon Method ========================//
    initiateCoupon() {
        if (!app.couponCodeInput) {
            return;
        }

        app.onKeyUp(app.couponCodeInput, event => {
            event.keyCode === 13 && app.couponBtn.click();
            app.couponError.value = '';
            app.removeClass(app.couponCodeInput, 'has-error');
        });

        salla.coupon.event.onAdded(res => this.toggleCoupon(app.couponBtn, res, true));
        salla.coupon.event.onRemoved(res => this.toggleCoupon(app.couponBtn, res, false));
        salla.coupon.event.onAddedFailed(err => this.showCouponError(app.couponBtn, err.response?.data?.error.message));
        salla.coupon.event.onRemovedFailed(err => this.showCouponError(app.couponBtn, err.response?.data?.error.message, false));

        app.onClick(app.couponBtn, ({currentTarget: btn}) => {
            //if it's remove coupon, will have `btn--danger` class
            if (app.couponBtn.classList.contains('btn--danger')) {
                btn.load();
                return salla.api.coupon.remove(salla.config.get('page.id'));
            }

            if (!app.couponCodeInput.value.length) {
                this.showCouponError(btn, '* ' + salla.lang.get('pages.checkout.enter_coupon'));
                return;
            }

            btn.load();
            salla.api.coupon.add({id: salla.config.get('page.id'), coupon: app.couponCodeInput.value});
        });
    }

    toggleCoupon(btn, res, applied) {
        btn.stop();
        app.couponError.innerText = '';
        app.couponCodeInput.value = applied ? app.couponCodeInput.value : '';
        app.couponCodeInput.toggleAttribute('disabled', applied);

        app.toggleElementClassIf(app.couponBtn, ['btn--danger', 'has-coupon'], ['btn-default', 'has-not-coupon'], () => applied)
            .toggleElementClassIf(app.couponBtn, ['btn-default', 'has-not-coupon'], ['btn--danger', 'has-coupon'], () => !applied)
            .hideElement(app.couponBtn.querySelector(applied ? 'span' : 'i'))
            .showElement(app.couponBtn.querySelector(applied ? 'i' : 'span'))
            .removeClass(app.couponCodeInput, 'has-error');
    }

    showCouponError(btn, message, isApplying = true) {
        btn.stop();
        app.couponError.innerText = message || salla.lang.get('pages.checkout.error_occurred');
        isApplying ? app.addClass(app.couponCodeInput, 'has-error') : null;
    }
}

Cart.intiateWhenReady('Cart', ['cart']);
