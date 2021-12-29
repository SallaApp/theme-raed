require('../dist/filepond.js');
require('./partials/product-options')
let flatpickr = require("flatpickr").default;

document.addEventListener('DOMContentLoaded', () => {
    if (!cartItemsCount) {
        salla.cart.event.clearCartSummary();
    }
    animatedItem('.free-shipping');
    animatedItem('.shipping-item');
    salla.cart.event.onItemUpdated(res => updateCartPageInfo(res));
});
/**
 *
 * @param  {{
 *      data: {
 *              total: string,
 *              total_discount: string,
 *              shipping_cost: number,
 *              final_total: string,
 *              count: number,
 *              sub_total: string,
 *              total_before_discount: string,
 *              items: null|Array<Object>,
 *              coupon_discount: number
 *           }
 * sections: {'free-shipping-bar':string}
 *          }} res
 */
/**
 * @typedef {{isAvailable: boolean, notes: string, has_special_price: boolean, product_image: string, product_price: {amount: string, currency: string}, source: null, type: string, orderItemImages: *[], product_quantity: number, options_data: {"18819": number, "18836": number, "18821": number}, total_product_price_formatted: string, total_special_price: {amount: string, currency: string}, offer: boolean, total: number, enable_upload_image: boolean, uploaded_files: null, special_price_formatted: string, product_id: number, product_currency: string, product_available_quantity: number, selectedOptions: number[], onSale: boolean, currency: string, id: number, hide_quantity: boolean, product_price_formatted: string, quantity: number, display_price: string, isCustomized: boolean, has_options: boolean, product_name: string, _total_product_price: number, url: string, product_maximum_quantity_per_order: null, product_advance_option: {}, active_advance: number, display_total_price: string, product_options: *[], special_price: {amount: string, currency: string}, total_special_price_formatted: string, _product_price: number, total_product_price: {amount: string, currency: string}, enable_note: boolean}} CartItem
 */
let updateCartPageInfo = function (res) {
    res.data.items?.forEach(item => document.querySelector(`#item-${item.id}`)._x_dataStack[0].updateItemInfo(item));

    let shippingBar = res.sections['free-shipping-bar'];
    if (!shippingBar) {
        return;
    }
    document.querySelectorAll('#free-shipping-bar').forEach(shippingBarEl => shippingBarEl.outerHTML = shippingBar);
}
window.hasApplePay = function () {
    return {'has_apple_pay': !!window.ApplePaySession};
}

// TODO: add timeline
function animatedItem(selector) {
    anime({
        targets   : selector,
        opacity   : [0, 1],
        duration  : 2000,
        translateX: [-20, 0],
        delay     : (el, i) => i * 100,
    });
    // change progress
    //document.querySelectorAll('.progress-bg').style.width = '200px';
}

// flatpickr
flatpickr('.date-element', {
    // "enableTime": true,
    "dateFormat": "Y-m-d H:i",
});
flatpickr('.date-time-element', {
    "enableTime": true,
    "dateFormat": "Y-m-d H:i",
});
flatpickr('.time-element', {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
});

//======================= AlpainJs initate function for Cart & Cart Item =======================//
window.initCart = function (cart_id, coupon) {
    return {
        cart_id             : cart_id,
        couponCode          : coupon,
        isShowCouponDiscount: !!coupon,
        isShowCouponError   : false,
        couponErrorMessage  : '',
        addCoupon           : function () {
            this.isShowCouponError = false;

            if (this.couponCode) {
                salla.coupon.api
                    .add({id: this.cart_id, coupon: this.couponCode})
                    .then(res => {
                        this.isShowCouponDiscount = !this.isShowCouponDiscount;
                        this.updateCartSummary();
                    }).catch(err => {
                    this.isShowCouponError = true;
                    if (err) {
                        salla.log(err.message || err);
                        this.couponErrorMessage = err.message;
                    }
                });

            } else {
                this.isShowCouponError = true;
                this.couponErrorMessage = 'يجب إدخال كوبون صالح';
            }
        },
        removeCoupon        : function () {
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
        updateCartSummary   : function () {
            salla.cart.api.fetchFullSummary().then(res => updateCartPageInfo(res));
        },
    }
}

//cart Item
window.initCartItem = function ({id, quantity, total, price, product_price, has_offer, offer}) {
    return {
        itemId       : id,
        itemQty      : quantity,
        isRemoveItem : false,
        itemTotal    : total,
        itemPrice    : price,
        productPrice : product_price,
        qtyValidation: '',
        discountName : offer ? offer.offer_names : '',
        hasOffer     : has_offer,
        addQty       : function () {
            this.itemQty++;
            this.updateQty();
        },
        subQty       : function () {
            if (this.itemQty <= 1) {
                return;
            }
            this.itemQty--;
            this.updateQty();
        },

        updateQty         : function () {
            //simulate native event on change, to fire salla event `cart::update-item`
            setTimeout(() => {
                document
                    .querySelector(`#item-${this.itemId} > input[name=id]`)
                    .dispatchEvent(new Event('change', {'bubbles': true}));
            }, 100)
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
        /**
         * @param {CartItem} item
         */
        updateItemInfo(item) {
            this.itemTotal = item.display_total_price;
            if (!(this.hasOffer = item.has_special_price)) {
                this.itemPrice = item.product_price_formatted;
                return;
            }
            this.itemPrice = item.display_price;
            this.discountName = item.offer.offer_names;

            // this.itemTotal = item.total_special_price_formatted;
        },
        removeItem: function () {
            this.isRemoveItem = true;
            salla.cart.api
                .deleteItem(this.itemId).then(res => {
                updateCartPageInfo(res);
                let items = document.querySelectorAll('.cart-item');
                let item = document.querySelector('#item-' + this.itemId);
                anime({
                    targets         : item,
                    height          : '0', // -> from 'height' to '0',
                    margin          : 0,
                    easing          : 'easeInOutQuad',
                    duration        : 300,
                    opacity         : 0,
                    'padding-bottom': 0,
                    'padding-top'   : 0,
                    complete        : () => {
                        item.remove();
                        if (items.length == 1) {
                            window.location.reload();
                        }
                    },
                });
            })
        },
    }
}