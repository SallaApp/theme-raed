/*!
 * Crafted with ❤ by Salla
 */
import { h } from "@stencil/core";
import SpecialDiscountIcon from "../../assets/svg/special-discount.svg";
import GiftIcon from "../../assets/svg/gift.svg";
import TagMoneyIcon from "../../assets/svg/tag-money.svg";
import FireIcon from "../../assets/svg/fire.svg";
import DiscountCouponIcon from "../../assets/svg/discount-coupon.svg";
import ArrowDownIcon from "../../assets/svg/keyboard_arrow_down.svg";
export class SallaCartItemOffers {
    constructor() {
        this.internalOffers = [];
        this.showAll = false;
        // Translations
        this.freeLabel = '';
        this.receivedOffer = '';
        this.discountAmountLabel = '';
        this.showMoreOffers = '';
        this.icons = {
            DiscountCouponIcon,
            GiftIcon,
            FireIcon,
            SpecialDiscountIcon,
            TagMoneyIcon,
        };
        this.visibleOffersCount = 3;
        this.handleCartItemUpdated = (event) => {
            const updatedItem = event.data.cart.items.find((item) => item.id === this.itemId);
            if (updatedItem?.id === this.itemId) {
                this.internalQuantity = updatedItem.quantity;
                this.internalOffers = updatedItem.detailed_offers || [];
                this.internalProductPrice = updatedItem.product_price;
            }
        };
        this.toggleShowAll = () => {
            this.showAll = !this.showAll;
        };
    }
    async componentWillLoad() {
        await Salla.onReady();
        await salla.lang.onLoaded(() => {
            this.freeLabel = salla.lang.get('common.elements.freeExclam');
            this.receivedOffer = salla.lang.get('pages.cart.received_offer');
            this.discountAmountLabel = salla.lang.get('pages.cart.discount_amount');
            this.showMoreOffers = salla.lang.get('pages.cart.show_more_offers');
        });
        this.internalQuantity = this.quantity;
        this.internalOffers = this.parseOffers(this.offers);
        this.internalProductPrice = this.productPrice;
    }
    componentDidLoad() {
        salla.event.on('cart::item.updated', (event) => this.handleCartItemUpdated(event));
    }
    parseOffers(offers) {
        try {
            if (typeof offers !== 'string') {
                console.warn('Offers is not a string. Returning as-is.', offers);
                return Array.isArray(offers) ? offers : [];
            }
            return JSON.parse(offers || '[]');
        }
        catch (e) {
            console.error('Failed to parse offers', e);
            return [];
        }
    }
    get visibleOffers() {
        return this.internalOffers.slice(0, this.visibleOffersCount);
    }
    get hiddenOffers() {
        return this.internalOffers.slice(this.visibleOffersCount);
    }
    getPaidQty(quantity, offer) {
        return quantity - offer.free_quantity;
    }
    renderOffer(quantity, offer) {
        const paidQty = this.getPaidQty(quantity, offer);
        return (h("div", { class: "s-cart-item-offers-box" }, offer.free_quantity > 0 && paidQty > 0 && (h("div", { class: "s-cart-item-offers-paid-free" }, h("div", { class: "s-cart-item-offers-line" }, salla.helpers.number(paidQty), " \u00D7 ", h("span", { innerHTML: salla.money(this.internalProductPrice) })), h("div", { class: "s-cart-item-offers-line" }, salla.helpers.number(offer.free_quantity), " \u00D7", h("span", { class: "s-cart-item-offers-regular-price", innerHTML: salla.money(this.internalProductPrice) }), h("span", { class: "s-cart-item-offers-free-label" }, this.freeLabel)))), h("div", { class: "s-cart-item-offers-details" }, h("span", { class: `s-cart-item-offers-icon`, innerHTML: this.icons[offer.discount_icon] || '' }), h("div", null, h("p", { class: "s-cart-item-offers-title" }, this.receivedOffer.replace(':offer', offer.offer_name)), h("p", { class: "s-cart-item-offers-discount" }, h("span", { innerHTML: this.discountAmountLabel.replace(':amount', salla.money(offer.discount_amount.toFixed(2))) }))))));
    }
    render() {
        if (!this.internalOffers?.length) {
            return null;
        }
        return (h("div", { class: "s-cart-item-offers-container", id: `offers_list_${this.itemId}` }, this.visibleOffers.map((offer) => this.renderOffer(this.internalQuantity, offer)), this.internalOffers?.length > this.visibleOffersCount && (h("div", { class: "s-cart-item-offers-show-more" }, h("button", { class: "s-cart-item-offers-show-more-btn", onClick: this.toggleShowAll, type: "button" }, h("span", { class: "s-cart-item-offers-show-more-label" }, "+", this.hiddenOffers.length, " ", this.showMoreOffers, h("span", { innerHTML: ArrowDownIcon, class: {
                's-cart-item-offers-arrow-icon': true,
                's-cart-item-offers-arrow-open': this.showAll,
            } }))))), this.showAll && (h("div", { class: "s-cart-item-offers-collapsed", id: `offers_${this.itemId}` }, this.hiddenOffers.map((offer) => this.renderOffer(this.internalQuantity, offer))))));
    }
    static get is() { return "salla-cart-item-offers"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-cart-item-offers.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-cart-item-offers.css"]
        };
    }
    static get properties() {
        return {
            "quantity": {
                "type": "number",
                "attribute": "quantity",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The quantity of the cart item"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "offers": {
                "type": "string",
                "attribute": "offers",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "JSON string containing the offers associated with the cart item"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "itemId": {
                "type": "number",
                "attribute": "item-id",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The unique identifier of the cart item"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "productPrice": {
                "type": "number",
                "attribute": "product-price",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The original price of the product in the cart"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "internalQuantity": {},
            "internalOffers": {},
            "internalProductPrice": {},
            "showAll": {},
            "freeLabel": {},
            "receivedOffer": {},
            "discountAmountLabel": {},
            "showMoreOffers": {}
        };
    }
}
