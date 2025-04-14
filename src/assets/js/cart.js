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
            freeShipApplied: '#free-shipping-applied'
        });

        this.initiateCoupon();
        this.initSubmitCart();
        validateProductOptions();
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

        app.subTotal.innerHTML = salla.money(cartData.sub_total);
        if(app.taxAmount) 
          app.taxAmount.innerHTML = salla.money(cartData.tax_amount);
        if (app.orderOptionsTotal) app.orderOptionsTotal.innerHTML = salla.money(cartData.options_total);
        
        app.toggleElementClassIf(app.totalDiscount, 'discounted', 'hidden', () => !!cartData.total_discount)
            .toggleElementClassIf(app.shippingCost, 'has_shipping', 'hidden', () => !!cartData.real_shipping_cost)
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
            offerElement = cartItem.querySelector('.offer-name'),
            offerIconElement = cartItem.querySelector('.offer-icon'),
            hasSpecialPrice = item.offer || item.special_price > 0;

        let total = salla.money(item.total);
        if (total !== totalElement.innerHTML) {
            totalElement.innerHTML = total;
            app.anime(totalElement, { scale: [.88, 1] });
        }

        app.toggleElementClassIf(offerElement, 'offer-applied', 'hidden', () => hasSpecialPrice)
            .toggleElementClassIf(offerIconElement, 'offer-applied', 'hidden', () => hasSpecialPrice)
            .toggleElementClassIf(regularPriceElement, 'offer-applied', 'hidden', () => hasSpecialPrice)
            .toggleElementClassIf(priceElement, 'text-red-400', 'text-sm text-gray-400', () => hasSpecialPrice);

        priceElement.innerHTML = salla.money(item.price);
        if (hasSpecialPrice) {
            // offerElement.innerHTML = item.offer.names;
            this.renderOffers(item.detailed_offers, 3, item.id);
            regularPriceElement.innerHTML = salla.money(item.product_price);
        }
    }

    renderOffers(offers, visibleCount = 3, itemId = '') {
        const container = document.getElementById(`offers_list_${itemId}`);
        if (!container || !offers.length) return;
      
        const collapsedId = `offers_${itemId}`;
        const firstOffers = offers.slice(0, visibleCount);
        const restOffers = offers.slice(visibleCount);
      
        let html = '';
      
        // First offers
        firstOffers.forEach((offer) => {
          html += this.renderOfferItem(offer);
        });
      
        // Show more toggle
        if (restOffers.length) {
          html += `
            <div class="mt-4">
              <button class="group btn--collapse text-sm !bg-transparent !px-0 !justify-start hover:text-dark"
                      type="button"
                      data-show="${collapsedId}">
                <i class="sicon-discount is-opened rtl:ml-1.5 ltr:mr-1.5"></i>
                <span class="flex items-center">
                  +${restOffers.length} ${salla.lang.get('pages.checkout.show_more_offers')} 
                  <i class="transition-transform duration-300 group-[.is-opened]:-rotate-180 mx-0.5 sicon-keyboard_arrow_down"></i>
                </span>
              </button>
            </div>
            <div class="h-0 overflow-hidden opacity-0 is-closed" id="${collapsedId}">
              ${restOffers.map(this.renderOfferItem).join('')}
            </div>
          `;
        }
      
        container.innerHTML = html;
        window.app.initiateCollapse();
      }
       renderOfferItem(offer) {
        return `
          <div class="mt-4 text-green-600 flex items-start gap-2.5">
            <i class="${offer.discount_icon} font-bold -translate-y-0.5 text-lg"></i>
            <div>
              <p class="text-sm font-medium">
                ${salla.lang.get('pages.checkout.received_offer', {'offer': offer.offer_name})}
              </p>
              <p class="text-xs mt-1 text-gray-400">
                ${salla.lang.get('pages.checkout.discount_amount', {'amount': salla.money(offer.discount_amount)})}
              </p>
            </div>
          </div> 
        `;
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
