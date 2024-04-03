import BasePage from './base-page';

class Cart extends BasePage {
    onReady() {
        // keep update the dom base in the events
        salla.event.cart.onUpdated(data => this.updateCartPageInfo(data));

        app.watchElements({
            couponCodeInput: '#coupon-input',
            couponBtn: '#coupon-btn',
            couponError: '#coupon-error',
            subTotal: '#sub-total',
            totalDiscount: '#total-discount',
            shippingCost: '#shipping-cost',
            freeShipping: '#free-shipping',
            freeShippingBar: '#free-shipping-bar',
            freeShippingMsg: '#free-shipping-msg',
            freeShipApplied: '#free-shipping-applied'
        });

        this.initiateCoupon();
        this.initSubmitCart();
    }

    initSubmitCart() {
        let submitBtn = document.querySelector('#cart-submit');
        let cartForms = document.querySelectorAll('form[id^="item-"]');
        
        if (!submitBtn) {
            return;
        }
        
        app.onClick(submitBtn, event => {
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
        if (!arrayTwoId.includes(parseInt(form.id.value))) {
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

        // update the dom for cart options
        this.updateCartOptions(cartData?.options);
        // update each item data
        cartData.items?.forEach(item => this.updateItemInfo(item));

        app.subTotal.innerText = salla.money(cartData.sub_total);

        app.toggleElementClassIf(app.totalDiscount, 'discounted', 'hidden', () => !!cartData.discount)
            .toggleElementClassIf(app.shippingCost, 'has_shipping', 'hidden', () => !!cartData.real_shipping_cost)
            .toggleElementClassIf(app.freeShipping, 'has_free', 'hidden', () => !!cartData.free_shipping_bar);

        app.totalDiscount.querySelector('b').innerText = '- ' + salla.money(cartData.discount);
        app.shippingCost.querySelector('b').innerText = salla.money(cartData.real_shipping_cost);

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
            offerElement = cartItem.querySelector('.offer-name'),
            offerIconElement = cartItem.querySelector('.offer-icon'),
            hasSpecialPrice = item.offer || item.special_price > 0;

        let total = salla.money(item.total);
        if (total !== totalElement.innerText) {
            totalElement.innerText = total;
            app.anime(totalElement, { scale: [.88, 1] });
        }

        app.toggleElementClassIf(offerElement, 'offer-applied', 'hidden', () => hasSpecialPrice)
            .toggleElementClassIf(offerIconElement, 'offer-applied', 'hidden', () => hasSpecialPrice)
            .toggleElementClassIf(regularPriceElement, 'offer-applied', 'hidden', () => hasSpecialPrice)
            .toggleElementClassIf(priceElement, 'text-red-400', 'text-sm text-gray-400', () => hasSpecialPrice);

        priceElement.innerText = salla.money(item.price);
        if (hasSpecialPrice) {
            offerElement.innerText = item.offer.names;
            regularPriceElement.innerText = salla.money(item.product_price);
        }
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
    toggleCoupon(res, applied) {
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
