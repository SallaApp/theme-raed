import flatpickr from "flatpickr";


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

// flatpickr
flatpickr('#productCalendar', {
    "enableTime": true,
    "dateFormat": "Y-m-d H:i",
});
flatpickr('#receiveTime', {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
});

// cart
window.initCart = function (cart_id, coupon) {
    return {
        cart_id: cart_id,
        couponCode: coupon,
        isShowCouponDiscount: !!coupon,
        isShowCouponError: false,
        couponErrorMessage: '',
        addCoupon: function () {
            this.isShowCouponError = false;

            if (this.couponCode) {
                salla.coupon.api
                    .add({ id: this.cart_id, coupon: this.couponCode })
                    .then(res => {
                        this.updateCartSummary();
                    }).catch(err => {
                        this.isShowCouponError = true;
                        if (err) {
                            salla.log(err.message || err);
                            this.couponErrorMessage = err.message;
                        }
                    });

                this.isShowCouponDiscount = !this.isShowCouponDiscount;
                if (!this.isShowCouponDiscount) {
                    this.couponCode = '';
                }
            } else {
                this.isShowCouponError = true;
                this.couponErrorMessage = 'يجب إدخال كوبون صالح';
            }
        },
        removeCoupon: function () {
            if (this.couponCode) {
                this.isShowCouponError = false;

                salla.coupon.api
                    .remove(this.cart_id)
                    .then(res => {
                        this.couponCode = '';
                        this.updateCartSummary();
                    }).catch(err => {
                        this.isShowCouponError = true;
                        this.couponErrorMessage = err.message;
                    });
            }
        },
        updateCartSummary: function () {

            salla.cart.api
                .fetchSummary()
                .then(res => {
                    console.log(res);
                });
        },
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
            if (this.itemQty <= 1) {
                return;
            }
            this.itemQty--;
            this.updateQty();
            // salla.cart.api
            //     .updateItem({ id: this.itemId, quantity: this.itemQty })
            //     .then(res => {
            //         // this.itemQty--; // cause issue when you send new request while old request not finish
            //         this.updateCartPageInfo(res);
            //     }).catch(err => this.validateQty(err));
        },

        updateQty: function () {
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
