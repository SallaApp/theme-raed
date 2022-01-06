import BasePage from './base-page';
import ProductOptions from './partials/product-options';

class Cart extends BasePage {
    onReady() {
        this.initiateSubmit();
        this.initiateCartItems();
        app.anime('.free-shipping,.shipping-item', {translateX: [-20, 0]});
        app.watchElements({
            couponCode   : '#coupon',
            couponBtn    : '#btn-add-coupon',
            couponError  : '#coupon-error',
            subTotal     : '#sub-total',
            totalDiscount: '#total-discount',
            shippingCost : '#shipping-cost',
        });
        this.initiateCoupon();
        ProductOptions();
    }

    registerEvents() {
        salla.cart.event.onItemUpdated(res => this.updateCartPageInfo(res));
    }

    initiateSubmit() {
        app.watchElement('submit', '#btn-submit');
        if (!app.submit) {
            salla.cart.event.clearCartSummary();
            throw 'Stopping processing JS logic, because there is no items, or summary.'
        }
        //important for safari & iphone browsers
        app.submit.dataset.has_apple_pay = !!window.ApplePaySession;
    }

    updateCartSummary() {
        salla.cart.api.fetchFullSummary().then(res => this.updateCartPageInfo(res));
    }

    /**
     * @param  {UpdateCartItemResponse} res
     */
    updateCartPageInfo(res) {
        res.data.items?.forEach(item => this.updateItemInfo(item));
        app.anime('.shipping-item', {translateX: [-10, 0]});
        app.subTotal.innerText = res.data.sub_total;
        app.toggleElement(app.totalDiscount, 'discounted', 'hidden', () => res.data.total_discount)
            .toggleElement(app.shippingCost, 'has_shipping', 'hidden', () => res.data.shipping_cost);
        app.totalDiscount.querySelector('b').innerText = '- ' + res.data.total_discount;
        app.shippingCost.querySelector('b').innerText = res.data.shipping_cost;
    }

    // ========================== Cart Items ========================== //
    initiateCartItems() {
        this.items = {};
        document.querySelectorAll('.cart-item')
            .forEach(cartItem => {
                let itemId = cartItem.dataset.id,
                    btnAdd = cartItem.querySelector('.add-qty'),
                    btnSub = cartItem.querySelector('.sub-qty'),
                    quantity = cartItem.querySelector('.item-quantity');
                app.onKeyUp(quantity, event => salla.helpers.digitsOnly(event.target))
                this.items[itemId] = {
                    item        : cartItem,
                    total       : cartItem.querySelector('.item-total'),
                    price       : cartItem.querySelector('.item-price'),
                    productPrice: cartItem.querySelector('.product-price'),
                    offer       : cartItem.querySelector('.offer-name'),
                    offerIcon   : cartItem.querySelector('.offer-icon'),
                    quantity    : quantity,
                    btnAdd      : btnAdd,
                    btnSub      : btnSub,
                };
                app.onClick(btnAdd, () => quantity.value++ && this.qunatityChanged(quantity));
                app.onClick(btnSub, () => this.subQty(quantity));
                app.onClick(cartItem.querySelector('.btn--delete'), () => this.removeItem(itemId))
            });
    }

    /**
     * @param {HTMLElement} quantity
     */
    subQty(quantity) {
        if (quantity.value <= 1) {
            return;
        }
        quantity.value--;
        this.qunatityChanged(quantity);
    }

    /**
     * Workaround to fire data-on-change="cart::update.item"
     *
     * @param {HTMLElement} quantity
     */
    qunatityChanged(quantity) {
        app.debounce(() => salla.document.event.fireEvent(quantity, 'change', {'bubbles': true}));
    }

    removeItem(itemId) {
        salla.cart.api.deleteItem(itemId).then(res => {
            this.updateCartPageInfo(res);
            let items = document.querySelectorAll('.cart-item');
            let item = document.querySelector('#item-' + itemId);

            app.anime(item, false)
                .complete(() => item.remove() || items.length == 1 && window.location.reload())
                .easing('easeInOutQuad')
                .paddingBottom(0)
                .duration(300)
                .paddingTop(0)
                .opacity(0)
                .height(0)
                .margin(0)
                .play();
        });
    }

    /**
     * @param {CartItem} item
     */
    updateItemInfo(item) {
        /**
         * @type {{offer: HTMLElement, item: HTMLElement, total: HTMLElement, quantity: HTMLElement, btnSub: HTMLElement, btnAdd: HTMLElement, price: HTMLElement, offerIcon: HTMLElement, productPrice: HTMLElement}}
         */
        let cartItem = this.items[item.id];
        cartItem.total.innerText = item.display_total_price;

        app.toggleElement(cartItem.offer, 'offer-applied', 'hidden', () => item.has_special_price)
            .toggleElement(cartItem.offerIcon, 'offer-applied', 'hidden', () => item.has_special_price)
            .toggleElement(cartItem.productPrice, 'offer-applied', 'hidden', () => item.has_special_price)
            .toggleElement(cartItem.price, 'text-theme-red', 'text-sm text-gray-400', () => item.has_special_price);
        if (!item.has_special_price) {
            cartItem.price.innerText = item.product_price_formatted;
            return;
        }
        cartItem.price.innerText = item.display_price;
        cartItem.offer.innerText = item.offer.names;
    }


    //=================== Coupon Method ========================//
    initiateCoupon() {
        salla.coupon.event.onAdded(res => {
            app.couponCode.setAttribute('disabled', true);
            app.toggleElement(app.couponBtn, 'btn-default', 'btn-danger', () => false)
                .hideElement(app.couponBtn.querySelector('span'))
                .showElement(app.couponBtn.querySelector('i'))
                .removeClass(app.couponCode, 'has-error');
            app.couponError.innerText = '';
            app.updateCartSummary();
        });

        salla.coupon.event.onRemoved(res => {
            app.couponCode.removeAttribute('disabled');
            app.couponCode.value = '';
            app.toggleElement(app.couponBtn, 'btn-default', 'btn-danger', () => true)
                .hideElement(app.couponBtn.querySelector('i'))
                .showElement(app.couponBtn.querySelector('span'))
                .removeClass(app.couponCode, 'has-error');
            app.couponError.innerText = '';
            app.updateCartSummary();
        });

        salla.coupon.event.onAddedFailed(err => this.showCouponError(err.response.data.error.message));
        salla.coupon.event.onRemovedFailed(err => this.showCouponError(err.response.data.error.message, false));
        app.onKeyUp(app.couponCode, event => {
            event.keyCode === 13 && app.couponBtn.click();
            app.couponError.value = '';
            app.removeClass(app.couponCode, 'has-error');
        });
        app.onClick(app.couponBtn, event => {
            event.preventDefault();
            //if it's remove coupon, will have `btn-danger` class
            if (app.couponBtn.classList.contains('btn-danger')) {
                return salla.api.coupon.remove(app.pageData('id'));
            }

            if (!app.couponCode.value.length) {
                this.showCouponError('* ' + salla.lang.get('pages.checkout.enter_coupon'));
                return;
            }

            salla.api.coupon.add({id: app.pageData('id'), coupon: app.couponCode.value});
        });
    }

    showCouponError(message, isApplying = true) {
        app.couponError.innerText = message || salla.lang.get('pages.checkout.error_occurred');
        isApplying ? app.addClass(app.couponCode, 'has-error') : null;
    }
}

new Cart;