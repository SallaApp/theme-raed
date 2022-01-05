//import './dataTypes/updateCartItemResponse';
import AlpineJS from 'alpinejs';
import BasePage from "./basePage";
import ProductOptions from './partials/product-options';

class Cart extends BasePage {
    onBoot() {
        window.initCart = this.initCart;
        window.initCartItem = this.initCartItem;
        window.cartClass = this;
    }

    onReady() {
        this.anime('.free-shipping', {translateX: [-20, 0]});
        this.anime('.shipping-item', {translateX: [-20, 0]});
        ProductOptions();
        window.hasApplePay = () => ({'has_apple_pay': !!window.ApplePaySession});
        AlpineJS.start();
    }

    registerEvents() {
        salla.cart.event.onItemUpdated(res => this.updateCartPageInfo(res));
        if (!document.querySelector('.cart-item')) {
            salla.cart.event.clearCartSummary();
        }
    }

    /**
     * @param  {UpdateCartItemResponse} res
     */
    updateCartPageInfo(res) {
        res.data.items?.forEach(item => document.querySelector(`#item-${item.id}`)._x_dataStack[0].updateItemInfo(item));
        let shippingBar = res.sections['free-shipping-bar'];
        if (!shippingBar) {
            return;
        }
        document.querySelectorAll('#free-shipping-bar').forEach(shippingBarEl => shippingBarEl.outerHTML = shippingBar);
    }

// TODO:Enhance it
//======================= AlpainJs initate function for Cart & Cart Item =======================//
    initCart(cart_id, coupon) {
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
                salla.cart.api.fetchFullSummary().then(res => this.updateCartPageInfo(res));
            },
        }
    }

// TODO:Enhance it
//cart Item
    initCartItem({id, quantity, total, price, product_price, has_offer, offer}) {
        return {
            itemId       : id,
            itemQty      : quantity,
            isRemoveItem : false,
            itemTotal    : total,
            itemPrice    : price,
            productPrice : product_price,
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

                let item = res.data.items?.find(item => item.id == this.itemId);
                this.itemTotal = item?.total;

                let shippingBar = res.sections['free-shipping-bar'];
                let shippingBarEl = document.querySelector('#free-shipping-bar');
                if (shippingBar && shippingBarEl) {
                    shippingBarEl.outerHTML = shippingBar;
                }
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
                    this.updateCartPageInfo(res);
                    let items = document.querySelectorAll('.cart-item');
                    let item = document.querySelector('#item-' + this.itemId);

                    cartClass.anime(item, false)
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
            },
        }
    }
}

new Cart;