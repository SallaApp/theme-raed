import BasePage from './base-page';
import ProductOptions from './partials/product-options';

class Cart extends BasePage {
    onReady() {
        this.initiateSubmit();
        this.initiateCartItems();
        salla.cart.event.onItemUpdated(res => this.updateCartPageInfo(res.data.cart));
        app.watchElements({
            couponCode      : '#coupon',
            couponBtn       : '#btn-add-coupon',
            couponError     : '#coupon-error',
            subTotal        : '#sub-total',
            totalDiscount   : '#total-discount',
            shippingCost    : '#shipping-cost',
            freeShipping    : '#free-shipping',
            freeShippingBar : '#free-shipping-bar',
            freeShipppingMsg: '#free-shipping-msg',
            freeShipApplied : '#free-shipping-applied',
        });
        this.initiateCoupon();
        new ProductOptions();
    }

    initiateSubmit() {
        app.watchElement('submit', '#btn-submit');
        if (!app.submit) {
            salla.cart.event.clearCartSummary();
            throw 'Stopping processing JS logic, because there is no items, or summary.'
        }
        //important for safari & iphone browsers
        app.submit.dataset.has_apple_pay = !!window.ApplePaySession;

        app.onClick('#btn-submit', ({currentTarget: btn}) => btn.load());
    }

    /**
     * @param {import("@salla.sa/twilight/types/api/cart").CartSummary} cartData
     */
    updateCartPageInfo(cartData) {
        cartData.items?.forEach(item => this.updateItemInfo(item));
        app.subTotal.innerText = salla.money(cartData.sub_total);
        app.toggleElement(app.totalDiscount, 'discounted', 'hidden', () => cartData.discount)
            .toggleElement(app.shippingCost, 'has_shipping', 'hidden', () => cartData.real_shipping_cost)
            .toggleElement(app.freeShipping, 'has_free', 'hidden', () => cartData.free_shipping_bar);
        app.totalDiscount.querySelector('b').innerText = '- ' + salla.money(cartData.discount);
        app.shippingCost.querySelector('b').innerText = salla.money(cartData.real_shipping_cost);
        if (!cartData.free_shipping_bar) {
            return;
        }
        let isFree = cartData.free_shipping_bar.has_free_shipping;
        app.toggleElement(app.freeShippingBar, 'active', 'hidden', () => !isFree)
            .toggleElement(app.freeShipApplied, 'active', 'hidden', () => isFree);
        app.freeShipppingMsg.innerHTML = isFree
            ? salla.lang.get('pages.cart.has_free_shipping')
            : salla.lang.get('pages.cart.free_shipping_alert', {amount: salla.money(cartData.free_shipping_bar.remaining)});
        app.freeShippingBar.children[0].style.width = cartData.free_shipping_bar.percent + '%';
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
                quantity && app.on('input', quantity, event => salla.helpers.inputDigitsOnly(event.target)),
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
                btnAdd && app.onClick(btnAdd, () => quantity.value++ && this.qunatityChanged(quantity));
                btnSub && app.onClick(btnSub, () => this.reduceQuantity(quantity));

                app.onClick(cartItem.querySelector('.btn--delete'), ({currentTarget: btn}) => {
                    this.removeItem(itemId);
                    btn.load();
                })
            });
    }

    /**
     * @param {HTMLElement} quantity
     */
    reduceQuantity(quantity) {
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
        let item = document.querySelector('#item-' + itemId);
        salla.cart.api.deleteItem(itemId).then(res => {
            this.updateCartPageInfo(res.data);
            let items = document.querySelectorAll('.cart-item');

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
     * @param {import("@salla.sa/twilight/types/api/cart").CartItem} item
     */
    updateItemInfo(item) {
        /**
         * @type {{offer: HTMLElement, item: HTMLElement, total: HTMLElement, quantity: HTMLElement, btnSub: HTMLElement, btnAdd: HTMLElement, price: HTMLElement, offerIcon: HTMLElement, productPrice: HTMLElement}}
         */
        let cartItem = this.items[item.id];
        let total = salla.money(item.total);
        if (total !== cartItem.total.innerText) {
            cartItem.total.innerText = total;
            app.anime(cartItem.total, {scale: [.88, 1]});
        }
        app.toggleElement(cartItem.offer, 'offer-applied', 'hidden', () => item.offer)
            .toggleElement(cartItem.offerIcon, 'offer-applied', 'hidden', () => item.offer)
            .toggleElement(cartItem.productPrice, 'offer-applied', 'hidden', () => item.offer)
            .toggleElement(cartItem.price, 'text-theme-red', 'text-sm text-gray-400', () => item.offer);
        if (!item.offer) {
            cartItem.price.innerText = salla.money(item.product_price);
            return;
        }
        cartItem.price.innerText = salla.money(item.price);
        cartItem.offer.innerText = item.offer.names;
    }


    //=================== Coupon Method ========================//
    initiateCoupon() {
        if (!app.couponCode) {
            return;
        }
        let btn = app.couponBtn;
        app.onKeyUp(app.couponCode, event => {
            event.keyCode === 13 && btn.click();
            app.couponError.value = '';
            app.couponCode.classList.remove('has-error');
        });
        app.onClick(btn, () => {
            //if it's remove coupon, will have `btn--danger` class
            if (app.couponBtn.classList.contains('has-coupon')) {
                return btn.load().then(() => salla.coupon.api.remove()
                    .then(res => this.toggleCoupon(btn, res, false))
                    .catch(err => this.showCouponError(btn, err.response?.data?.error.message, false)));
            }

            if (!app.couponCode.value.length) {
                this.showCouponError(btn, '* ' + salla.lang.get('pages.checkout.enter_coupon'));
                return;
            }

            btn.load().then(() => salla.api.coupon.add(app.couponCode.value)
                .then(res => this.toggleCoupon(btn, res))
                .catch(err => this.showCouponError(btn, err.response?.data?.error.message)));
        });
    }

    /**
     * @param {HTMLSallaButtonElement} btn
     * @param {import("@salla.sa/twilight/types/api/coupon").AddCouponResponse} res
     * @param {boolean} applied
     */
    toggleCoupon(btn, res, applied = true) {
        btn.stop();
        this.updateCartPageInfo(res.data.cart);
        app.couponError.innerText = '';
        app.couponCode.value = applied ? app.couponCode.value : '';
        app.couponCode.toggleAttribute('disabled', applied);

        app.toggleElement(btn, 'has-coupon', 'has-no-coupon', () => applied)
            .hideElement(btn.querySelector(applied ? 'span' : 'i'))
            .showElement(btn.querySelector(applied ? 'i' : 'span'))
            .removeClass(app.couponCode, 'has-error');
        btn.setAttribute('color', applied ? 'danger' : 'primary');
    }

    showCouponError(btn, message, isApplying = true) {
        btn.stop();
        app.couponError.innerText = message || salla.lang.get('pages.checkout.error_occurred');
        isApplying ? app.addClass(app.couponCode, 'has-error') : null;
    }
}

Cart.intiateWhenReady('Cart', ['cart']);