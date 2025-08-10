import BasePage from './base-page';
import {validateProductOptions} from './partials/validate-product-options';
class Cart extends BasePage {
    onReady() {
        // keep update the dom base in the events
        salla.event.cart.onUpdated(data => this.updateCartPageInfo(data));

        app.watchElements({
            couponCodeInput: '#coupon-input',
            couponBtn: '#coupon-btn',
            couponError: '#coupon-error',
            subTotal: '#sub-total',
            orderOptionsTotal: '#cart-options-total',
            totalDiscount: '#total-discount',
            taxAmount: '#tax-amount',
            shippingCost: '#shipping-cost',
            freeShipping: '#free-shipping',
            freeShippingBar: '#free-shipping-bar',
            freeShippingMsg: '#free-shipping-msg',
            freeShipApplied: '#free-shipping-applied',
            cartGifting: '#cart-gifting',
            sallaGifting:'#salla-gifting'
        });

        this.initiateCoupon();
        this.initSubmitCart();
        validateProductOptions();
    }

    initSubmitCart() {
        let submitBtn = document.querySelector('#cart-submit');
        
        if (!submitBtn) {
            return;
        }
        
        app.onClick(submitBtn, event => {
            let cartForms = document.querySelectorAll('form[id^="item-"]');
            let isValid = true;
            cartForms.forEach(form => {
                isValid = isValid && form.reportValidity();
                if (!isValid) {
                    event.preventDefault();
                    salla.notify.error(salla.lang.get('common.messages.required_fields'));
                    return;
                }
            });
    
            if (isValid) {
                /** @type HTMLSallaButtonElement */
                let btn = event.currentTarget;
                salla.config.get('user.type') == 'guest' ? salla.cart.submit() : btn.load().then(() => salla.cart.submit())
            }
        });
    }

    updateCartOptions(options) {
      if (!options || !options.length) return;

      const arrayTwoId = options.map((item) => (item.id));

      document.querySelectorAll('.cart-options form')?.forEach((form) => {
        if (!arrayTwoId.includes(form.id.value)) {
          form.remove();
        }
      })
    }
    
    /**
     * @param {import("@salla.sa/twilight/types/api/cart").CartSummary} cartData
     */
    updateCartPageInfo(cartData) {
        //if item deleted & there is no more items, just reload the page
        if (!cartData.count) {
            // clear cart options from the dom before page reload
            document.querySelector('.cart-options')?.remove();
            return window.location.reload();
        }
        // toggle physical gifting depned on giftable flag
        app.toggleElementClassIf(app.cartGifting, 'active', 'hidden', () => cartData?.gift?.enabled);
        // Use toggleAttribute to handle the `physical-products` attribute
        app.sallaGifting?.toggleAttribute('physical-products', cartData?.gift?.type === 'physical');
        app.sallaGifting?.toggleAttribute('digital-products', cartData?.gift?.type === 'digital');

        // update the dom for cart options
        this.updateCartOptions(cartData?.options);
        // update each item data
        cartData.items?.forEach(item => this.updateItemInfo(item));

        app.subTotal.innerHTML = salla.money(cartData.sub_total);
        if(app.taxAmount) 
          app.taxAmount.innerHTML = salla.money(cartData.tax_amount);
        if (app.orderOptionsTotal) app.orderOptionsTotal.innerHTML = salla.money(cartData.options_total);
        
        app.toggleElementClassIf(app.totalDiscount, 'discounted', 'hidden', () => !!cartData.total_discount)
            .toggleElementClassIf(app.shippingCost, 'has_shipping', 'hidden', () => !!cartData.real_shipping_cost && !cartData.free_shipping_bar?.has_free_shipping) 
            .toggleElementClassIf(app.freeShipping, 'has_free', 'hidden', () => !!cartData.free_shipping_bar);

        app.totalDiscount.querySelector('b').innerHTML = '- ' + salla.money(cartData.total_discount);
        app.shippingCost.querySelector('b').innerHTML = salla.money(cartData.real_shipping_cost);

        if (!cartData.free_shipping_bar) {
            return;
        }

        let isFree = cartData.free_shipping_bar.has_free_shipping;
        app.toggleElementClassIf(app.freeShippingBar, 'active', 'hidden', () => !isFree)
            .toggleElementClassIf(app.freeShipApplied, 'active', 'hidden', () => isFree);

        app.freeShippingMsg.innerHTML = isFree
            ? salla.lang.get('pages.cart.has_free_shipping')
            : salla.lang.get('pages.cart.free_shipping_alert', { amount: salla.money(cartData.free_shipping_bar.remaining) });
        app.freeShippingBar.children[0].style.width = cartData.free_shipping_bar.percent + '%';

    }

    /**
     * @param {import("@salla.sa/twilight/types/api/cart").CartItem} item
     */
    updateItemInfo(item) {
        // lets get the elements for this item
        let cartItem = document.querySelector('#item-' + item.id);
        if (!cartItem) {
            salla.log(`Can't get the cart item dom for ${item.id}!`);
            return;
        }
        let totalElement = cartItem.querySelector('.item-total'),
            priceElement = cartItem.querySelector('.item-price'),
            regularPriceElement = cartItem.querySelector('.item-regular-price'),
            itemOriginalPrice = cartItem.querySelector('.item-original-price'),
            offerElement = cartItem.querySelector('.offer-name'),
            oldOffers = cartItem.querySelector('.old-offers'),
            freeRibbon = cartItem.querySelector('.free-ribbon'),
            offerIconElement = cartItem.querySelector('.offer-icon'),
            hasSpecialPrice = item.offer || item.special_price > 0,
            hasSalePrice = item.is_on_sale,
            newOffersActive = item.detailed_offers?.length > 0 ;
        let item_total = item.detailed_offers?.length > 0 ? item.total_special_price : item.total;
        let total = salla.money(item_total);
        if (total !== totalElement.innerHTML) {
            totalElement.innerHTML = total;
            app.anime(totalElement, { scale: [.88, 1] });
        }

        app.toggleElementClassIf([offerElement, oldOffers], 'offer-applied', 'hidden', () => hasSpecialPrice && !newOffersActive)
            .toggleElementClassIf([regularPriceElement, offerIconElement], 'offer-applied', 'hidden', () => hasSpecialPrice)
            .toggleElementClassIf([itemOriginalPrice], 'offer-applied', 'hidden', () => hasSalePrice)
            .toggleElementClassIf(priceElement, 'text-red-400', 'text-sm text-gray-400', () => hasSpecialPrice)
            .toggleElementClassIf(freeRibbon, 'active', 'hidden', () => item.price == 0);

        priceElement.innerHTML = salla.money(item.price);

        if (!hasSpecialPrice){return;}
        if (!newOffersActive) {offerElement.innerHTML = item.offer.names;}
        itemOriginalPrice.innerHTML = salla.money(item.original_price);
        regularPriceElement.innerHTML = salla.money(item.product_price);
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

        app.onClick(app.couponBtn, event => {
            //if it's remove coupon, will have `btn--danger` class
            let hasCoupon = app.couponBtn.classList.contains('btn--danger');
            /** @type HTMLSallaButtonElement */
            let btn = event.currentTarget;
            if (!hasCoupon && !app.couponCodeInput.value.length) {
                this.showCouponError('* ' + salla.lang.get('pages.checkout.enter_coupon'));
                return;
            }
            btn.load()
                .then(() => hasCoupon ? salla.cart.deleteCoupon() : salla.cart.addCoupon(app.couponCodeInput.value))
                .then(res => this.toggleCoupon(res, !hasCoupon))
                .catch(err => this.showCouponError(err.response?.data?.error.message, !hasCoupon))
                .finally(() => btn.stop());
        });
    }

    /**
     * @param {CartResponse.update} res
     * @param {boolean} applied
     */
    toggleCoupon(_res, applied) {
        app.couponError.innerText = '';
        app.couponCodeInput.value = applied ? app.couponCodeInput.value : '';
        app.couponCodeInput.toggleAttribute('disabled', applied);

        app.toggleElementClassIf(app.couponBtn, ['btn--danger', 'has-coupon'], ['btn-default', 'has-not-coupon'], () => applied)
            .toggleElementClassIf(app.couponBtn, ['btn-default', 'has-not-coupon'], ['btn--danger', 'has-coupon'], () => !applied)
            .hideElement(app.couponBtn.querySelector(applied ? 'span' : 'i'))
            .showElement(app.couponBtn.querySelector(applied ? 'i' : 'span'))
            .removeClass(app.couponCodeInput, 'has-error');
    }

    showCouponError(message, isApplying = true) {
        app.couponError.innerText = message || salla.lang.get('pages.checkout.error_occurred');
        isApplying ? app.addClass(app.couponCodeInput, 'has-error') : null;
    }
}

Cart.initiateWhenReady(['cart']);
