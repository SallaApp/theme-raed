import BasePage from './basePage';
import Coupon from './partials/coupon';
import ProductOptions from './partials/product-options';

/**
 * These are watched in Coupon initiateCoupon() method
 * @see Coupon
 * @property {HTMLElement} couponCode
 * @property {HTMLElement} couponBtn
 * @property {HTMLElement} couponError
 *
 * @property {HTMLElement} submit
 * @property {HTMLElement} freeShipping
 * @property {HTMLElement} subTotal
 * @property {HTMLElement} totalDiscount
 * @property {HTMLElement} shippingCost
 */
class Cart extends BasePage {
    onReady() {
        this.initiateSubmit();
        this.initiateCartItems();
        this.anime('.free-shipping,.shipping-item', {translateX: [-20, 0]});
        this.watchElements({subTotal: '#sub-total', totalDiscount: '#total-discount', shippingCost: '#shipping-cost'});
        ProductOptions();
        Coupon();
    }

    registerEvents() {
        salla.cart.event.onItemUpdated(res => this.updateCartPageInfo(res));
    }

    initiateSubmit() {
        this.watchElement('submit', '#btn-submit');
        if (!this.submit) {
            salla.cart.event.clearCartSummary();
            throw 'Stopping processing JS logic, because there is no items, or summary.'
        }
        //important for safari & iphone browsers
        this.submit.dataset.has_apple_pay = !!window.ApplePaySession;
    }

    updateCartSummary() {
        salla.cart.api.fetchFullSummary().then(res => this.updateCartPageInfo(res));
    }

    /**
     * @param  {UpdateCartItemResponse} res
     */
    updateCartPageInfo(res) {
        res.data.items?.forEach(item => this.updateItemInfo(item));
        this.anime('.shipping-item', {translateX: [-10, 0]});
        this.subTotal.innerText = res.data.sub_total;
        this.toggleElement(this.totalDiscount, 'discounted', 'hidden', () => res.data.total_discount)
            .toggleElement(this.shippingCost, 'has_shipping', 'hidden', () => res.data.shipping_cost);
        this.totalDiscount.querySelector('b').innerText = '- ' + res.data.total_discount;
        this.shippingCost.querySelector('b').innerText = res.data.shipping_cost;
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
                this.onKeyUp(quantity, event => salla.helpers.digitsOnly(event.target))
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
                this.onClick(btnAdd, () => quantity.value++ && this.qunatityChanged(quantity));
                this.onClick(btnSub, () => this.subQty(quantity));
                this.onClick(cartItem.querySelector('.btn--delete'), () => this.removeItem(itemId))
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
        this.debounce(() => salla.document.event.fireEvent(quantity, 'change', {'bubbles': true}));
    }

    removeItem(itemId) {
        salla.cart.api.deleteItem(itemId).then(res => {
            this.updateCartPageInfo(res);
            let items = document.querySelectorAll('.cart-item');
            let item = document.querySelector('#item-' + itemId);

            pageClass.anime(item, false)
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

        this.toggleElement(cartItem.offer, 'offer-applied', 'hidden', () => item.has_special_price)
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
}

new Cart;