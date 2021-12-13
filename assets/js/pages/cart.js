document.addEventListener('DOMContentLoaded', () => {
    if (!cartItemsCount) {
        salla.cart.event.clearCartSummary();
    }
    animatedItem('.free-shipping');
    animatedItem('.shipping-item');
});
window.hasApplePay = function () {
    return { 'has_apple_pay': !!window.ApplePaySession };
}

// TODO: add timeline
function animatedItem(selector) {
    anime({
        targets: selector,
        opacity: [0, 1],
        duration: 2000,
        translateX: [-20, 0],
        delay: (el, i) => i * 100,
    });
    // change progress
    //document.querySelectorAll('.progress-bg').style.width = '200px';
}

// cart
window.initCart = function (copoun) {
    return {
        copounCode: copoun,
        isShowCopounDiscount: false,
        isShowCopounError: false,
        addCopoun: function () {
            if (this.copounCode) {
                this.isShowCopounError = false;
                this.isShowCopounDiscount = !this.isShowCopounDiscount;
                if (!this.isShowCopounDiscount) {
                    this.copounCode = '';
                }
            } else {
                this.isShowCopounError = true;
            }
        }
    }
}

/**
 *
 * @param  {{
 *      data:{
 *          total: string,
 *          total_discount: string,
 *          shipping_cost: number,
 *          final_total: string,
 *          count: number,
 *          sub_total: string,
 *          total_before_discount: string,
 *          items: Array<Object>,
 *          coupon_discount: number
 *          }
 *      sections:{'free-shipping-bar':string}
 *          }} res
 */

//cart Item
window.initCartItem = function (itemId, quantity, total) {
    return {
        itemId: itemId,
        itemQty: quantity,
        isRemoveItem: false,
        itemTotal: total,
        qtyValidation: '',
        addQty: function () {
            this.itemQty++;
            this.updateQty();
            // salla.cart.api
            //     .updateItem({ id: this.itemId, quantity: this.itemQty })
            //     .then(res => {
            //         this.updateCartPageInfo(res);
            //         // this.itemQty++; // cause issue when you send new request while old request not finish
            //     }).catch(err => this.validateQty(err));
        },
        subQty: function () {
            this.itemQty--;
            this.updateQty();
            // if (this.itemQty <= 1) {
            //     return;
            // }
            // salla.cart.api
            //     .updateItem({ id: this.itemId, quantity: this.itemQty })
            //     .then(res => {
            //         // this.itemQty--; // cause issue when you send new request while old request not finish
            //         this.updateCartPageInfo(res);
            //     }).catch(err => this.validateQty(err));
        },

        updateQty: function () {
            if (this.itemQty <= 1) {
                return;
            }
            salla.cart.api
                .updateItem({ id: this.itemId, quantity: this.itemQty })
                .then(res => {
                    this.updateCartPageInfo(res);
                }).catch(err => this.validateQty(err));
        },
        updateCartPageInfo: function (res) {
            // remove validation message
            this.qtyValidation = null;

            let item = res.data.items?.find(item => item.id == this.itemId);
            this.itemTotal = item?.total;

            let shippingBar = res.sections['free-shipping-bar'];
            let shippingBarEl = document.querySelector('#free-shipping-bar');
            if (shippingBar && shippingBarEl) {
                shippingBarEl.outerHTML = shippingBar;
            }
        },
        validateQty(err) {
            this.qtyValidation = err.response.data.error.fields.quantity[0];
        },
        removeItem: function () {
            this.isRemoveItem = true;
            salla.cart.api
                .deleteItem(this.itemId).then(res => {
                    this.updateCartPageInfo(res);
                    let item = document.querySelector('#item-' + itemId);
                    anime({
                        targets: item,
                        height: '0', // -> from 'height' to '0',
                        margin: 0,
                        easing: 'easeInOutQuad',
                        duration: 300,
                        opacity: 0,
                        'padding-bottom': 0,
                        'padding-top': 0,
                        complete: () => item.remove(),
                    });
                })
        },
    }
}