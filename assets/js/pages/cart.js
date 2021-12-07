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
function updateCartPageInfo(res) {
    // TODO: items is not defined 
    // res.data.items.forEach(item => {
    // });
    let shippingBar = res.sections['free-shipping-bar'];
    let shippingBarEl = document.querySelector('#free-shipping-bar');
    if (shippingBar && shippingBarEl) {
        shippingBarEl.outerHTML = shippingBar;
        //     animatedItem('.free-shipping');
        //     animatedItem('.shipping-item');
    }
}

//cart Item
window.initCartItem = function (itemId, quantity) {
    return {
        itemId: itemId,
        itemQty: quantity,
        isRemoveItem: false,
        addQty: function () {
            salla.cart.api
                .updateItem({ id: this.itemId, quantity: this.itemQty + 1 })
                .then(res => {
                    updateCartPageInfo(res);
                    this.itemQty++;
                });
        },
        subQty: function () {
            if (this.itemQty <= 1) {
                return;
            }
            salla.cart.api
                .updateItem({ id: this.itemId, quantity: this.itemQty - 1 })
                .then(res => {
                    this.itemQty--;
                    updateCartPageInfo(res);
                });
        },
        removeItem: function () {
            this.isRemoveItem = true;
            salla.cart.api
                .deleteItem(this.itemId).then(res => {
                    updateCartPageInfo(res);
                    let item = document.querySelector('#item-' + itemId);
                    anime({
                        targets: item,
                        height: '0', // -> from 'height' to '0',
                        margin: 0,
                        easing: 'easeInOutQuad',
                        duration: 500,
                        opacity: 0,
                        'padding-bottom': 0,
                        'padding-top': 0,
                        complete: () => item.remove(),
                    });
                })
        },
    }
}