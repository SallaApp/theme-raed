/*!
 * Crafted with ❤ by Salla
 */
import { h } from "@stencil/core";
import Star2 from "../../assets/svg/star2.svg";
import Star3 from "../../assets/svg/star3.svg";
import CancelIcon from "../../assets/svg/cancel.svg";
import GiftImg from "../../assets/svg/flat.svg";
/**
 * @slot widget - When used, will activate the component and needs to emit `loyalty::open` event to open the modal. If not provided the default value will be used.
 * @slot points-applied-widget -  Widget to show information about the already exchanged points. It should have it's own resetting action and call the `resetExchange` method. If not provided, it will use the default value.
 */
export class SallaLoyalty {
    constructor() {
        this.selectedItem = undefined;
        /**
         * Does the merchant allow to login using email
         */
        this.allowEmail = true;
        /**
         * Does the merchant/current location for visitor allow to login using mobile, By default outside KSA is `false`
         */
        this.allowMobile = true;
        /**
         * Does the merchant require registration with email & mobile
         */
        this.requireEmail = false;
        salla.event.on('loyalty::open', () => this.open());
        salla.auth.event.onLoggedIn(() => {
            this.is_loggedin = true;
        });
        salla.onReady(() => {
            this.is_loggedin = salla.config.isUser();
        });
        salla.lang.onLoaded(() => {
            this.guestMessage = salla.lang.get('pages.loyalty_program.guest_message');
            this.translationLoaded = true;
        });
        salla.cart.event.onUpdated(cart => {
            this.prizePoints = cart.loyalty.prize?.points;
            this.prizeTitle = cart.loyalty.prize?.title;
            this.customerPoints = cart.loyalty.customer_points || this.customerPoints;
        });
    }
    setSelectedPrizeItem(item) {
        if (!this.selectedItem || this.selectedItem?.id != item.id) {
            this.selectedItem = item;
        }
        else {
            this.selectedItem = undefined;
        }
    }
    handleLongText(text) {
        if (text.length > 150) {
            return text.substring(0, 150) + '...';
        }
        return text;
    }
    prizeItem(item) {
        let klass = {
            's-loyalty-prize-item-selected': !!this.selectedItem && this.selectedItem?.id == item.id,
            "s-loyalty-prize-item": true
        };
        return h("div", { onClick: () => this.setSelectedPrizeItem(item), class: klass }, h("img", { class: "s-loyalty-prize-item-image", src: item.image, alt: item.name }), h("div", { class: "s-loyalty-prize-item-title" }, item.name), h("div", { class: "s-loyalty-prize-item-subtitle" }, this.handleLongText(item.description)), h("div", { class: "s-loyalty-prize-item-points" }, item.cost_points, " ", salla.lang.get('pages.loyalty_program.point'), h("div", { class: "s-loyalty-prize-item-check" }, h("div", null))));
    }
    getConfirmationModal() {
        return [
            h("salla-placeholder", { alignment: "center", icon: Star3, class: "s-loyalty-confirmation-modal-content" }, h("div", { slot: "title", class: "s-loyalty-confirmation-title" }, salla.lang.get('pages.loyalty_program.exchange_points')), h("div", { slot: "description" }, salla.lang.get('pages.loyalty_program.are_you_sure_to_exchange'), " ( ", h("strong", null, this.selectedItem?.cost_points), " ", salla.lang.get('pages.loyalty_program.point'), " ) ", salla.lang.get('pages.loyalty_program.for'), " ( ", h("strong", null, this.selectedItem?.name), " )")),
            h("div", { class: "s-loyalty-confirmation-actions" }, h("salla-button", { fill: 'outline', width: "wide", onClick: () => this.cancelProcess() }, salla.lang.get('pages.loyalty_program.cancellation')), h("salla-button", { loading: this.buttonLoading, width: "wide", onClick: () => this.exchangeLoyaltyPoint() }, salla.lang.get('pages.loyalty_program.confirm')))
        ];
    }
    getAfterExchangeUI() {
        return h("slot", { name: 'points-applied-widget' }, h("salla-list-tile", { class: "s-loyalty-after-exchange" }, h("div", { slot: "title", class: "s-loyalty-after-exchange-title" }, this.prizeTitle, " \u00A0 - \u00A0 ", this.prizePoints, " ", salla.lang.get('pages.loyalty_program.point')), h("div", { slot: 'action', class: "s-loyalty-after-exchange-action" }, h("salla-button", { class: "s-loyalty-after-exchange-reset", shape: "icon", fill: 'outline', color: "danger", size: "small", onClick: () => this.resetExchange() }, h("span", { innerHTML: CancelIcon })))));
    }
    /**
     * Show loyalty modal
     */
    async open() {
        if (!this.is_loggedin)
            return salla.event.dispatch('login::open');
        this.modal?.open();
        return await salla.loyalty.getProgram()
            .then(response => {
            this.loyaltyProgram = response.data;
        })
            .catch(e => {
            this.hasError = true;
            this.errorMessage = e.response?.data?.error?.message || e.response?.data;
        })
            .finally(() => this.modal?.stopLoading());
    }
    /**
     *
     * Hide loyalty modal
     */
    async close() {
        return this.modal.close();
    }
    /**
     *
     * Cancel Exchanged prizes
     */
    async resetExchange() {
        return await salla.loyalty.reset();
    }
    /**
     * Open Confirmation modal
     */
    async openConfirmation() {
        return await this.modal.close()
            .then(() => this.confirmationModal?.open())
            .catch(e => console.log(e));
    }
    /**
     * Cancel process
     */
    async cancelProcess() {
        return await this.confirmationModal.close()
            .then(() => this.selectedItem = null)
            .catch(e => console.log(e));
    }
    /**
     * Exchange loyalty points with the selected prize item
     * @param {number} loyalty_prize_id
     *
     */
    async exchangeLoyaltyPoint() {
        this.buttonLoading = true;
        return await salla.loyalty.exchange(this.selectedItem?.id)
            .then(() => this.selectedItem.key == "FREE_PRODUCT" && salla.url.is_page('cart') && window.location.reload())
            .finally(() => {
            this.buttonLoading = false;
            this.cancelProcess();
        });
    }
    render() {
        // A. when the exchange is done, and we have the final prize points to show it in cart page
        if (this.prizePoints) {
            return this.getAfterExchangeUI();
        }
        //todo:: change all translations to states
        return [
            h("slot", { name: 'widget' }, this.customerPoints ?
                h("salla-list-tile", { class: 's-loyalty-widget' }, h("div", { slot: "icon", class: "s-loyalty-widget-icon", innerHTML: Star2 }), h("div", { slot: "subtitle" }, this.customerPoints ? salla.lang.get('pages.loyalty_program.cart_total_point_summary', { "balance": this.customerPoints }) : this.guestMessage, h("salla-button", { shape: "link", color: "primary", onClick: () => salla.event.dispatch("loyalty::open") }, this.customerPoints ? salla.lang.get('pages.loyalty_program.cart_point_exchange_now') : salla.lang.get('blocks.header.login')))) :
                ''),
            h("salla-modal", { noPadding: true, width: "sm", ref: modal => this.confirmationModal = modal }, this.getConfirmationModal()),
            h("salla-modal", { isLoading: true, "has-skeleton": true, width: "md", ref: modal => this.modal = modal }, h("div", { slot: "loading" }, h("div", { class: "s-loyalty-skeleton" }, h("salla-list-tile", { class: "s-loyalty-header" }, h("div", { slot: "icon", class: "s-loyalty-header-icon" }, h("salla-skeleton", { type: "circle", height: '6rem', width: '6rem' })), h("div", { slot: "title", class: "s-loyalty-header-title mb-5" }, h("salla-skeleton", { height: '15px', width: '50%' })), h("div", { slot: "subtitle", class: "s-loyalty-header-subtitle" }, h("salla-skeleton", { height: '10px' }), h("salla-skeleton", { height: '10px', width: '75%' }))), h("div", { class: "s-loyalty-skeleton-cards" }, [...Array(3)].map(() => h("div", { class: "s-loyalty-prize-item swiper-slide" }, h("salla-skeleton", { height: '9rem' }), h("div", { class: "s-loyalty-prize-item-title" }, h("salla-skeleton", { height: '15px', width: '75%' })), h("div", { class: "s-loyalty-prize-item-subtitle" }, h("salla-skeleton", { height: '10px', width: '50%' }), h("salla-skeleton", { height: '10px', width: '25%' })), h("div", { class: "s-loyalty-prize-item-points" }, h("salla-skeleton", { height: '15px', width: '100px' }), h("div", { class: "s-loyalty-prize-item-check" }, h("salla-skeleton", { height: '1rem', width: '1rem', type: 'circle' })))))))), !this.hasError && !!this.loyaltyProgram ?
                [
                    h("salla-list-tile", { id: 's-loyalty-header', class: "s-loyalty-header" }, h("div", { slot: "icon", class: "s-loyalty-header-icon", innerHTML: GiftImg }), h("div", { slot: "title", class: "s-loyalty-header-title" }, this.loyaltyProgram.prize_promotion_title), h("div", { slot: "subtitle", class: "s-loyalty-header-subtitle" }, this.loyaltyProgram.prize_promotion_description)),
                    h("salla-tabs", null, this.loyaltyProgram.prizes.map((prize) => h("salla-tab-header", { slot: "header", name: prize.title }, h("span", null, prize.title))), this.loyaltyProgram.prizes.map((prize, index) => h("salla-tab-content", { slot: "content", name: prize.title }, h("salla-slider", { class: "s-loyalty-slider", loop: false, "controls-outer": true, id: 'loyalty-popup-slider-' + index, type: "carousel" }, h("div", { slot: 'items' }, prize.items.map((item) => this.prizeItem(item))))))),
                    h("salla-button", { disabled: !this.selectedItem, width: "wide", class: "s-loyalty-program-redeem-btn", onClick: () => this.openConfirmation() }, salla.lang.get('pages.loyalty_program.exchange_points')),
                ]
                : h("salla-placeholder", { class: "s-loyalty-placeholder", alignment: "center" }, !!this.errorMessage ? h("span", { slot: "description" }, this.errorMessage) : '')),
        ];
    }
    static get is() { return "salla-loyalty"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-loyalty.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-loyalty.css"]
        };
    }
    static get properties() {
        return {
            "prizePoints": {
                "type": "any",
                "attribute": "prize-points",
                "mutable": true,
                "complexType": {
                    "original": "string | number",
                    "resolved": "number | string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The exchanged prize point"
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "customerPoints": {
                "type": "number",
                "attribute": "customer-points",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Available customer points with which they can exchange."
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "prizeTitle": {
                "type": "string",
                "attribute": "prize-title",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The prize title"
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "allowEmail": {
                "type": "boolean",
                "attribute": "allow-email",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Does the merchant allow to login using email"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "allowMobile": {
                "type": "boolean",
                "attribute": "allow-mobile",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Does the merchant/current location for visitor allow to login using mobile, By default outside KSA is `false`"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "requireEmail": {
                "type": "boolean",
                "attribute": "require-email",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Does the merchant require registration with email & mobile"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "guestMessage": {
                "type": "string",
                "attribute": "guest-message",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Message to show for guest users."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "loyaltyProgram": {},
            "buttonLoading": {},
            "selectedItem": {},
            "askConfirmation": {},
            "is_loggedin": {},
            "hasError": {},
            "errorMessage": {},
            "translationLoaded": {}
        };
    }
    static get methods() {
        return {
            "open": {
                "complexType": {
                    "signature": "() => Promise<any>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "LoyaltyProgram": {
                            "location": "import",
                            "path": "./loyalty-schema",
                            "id": "src/components/salla-loyalty/loyalty-schema.ts::LoyaltyProgram"
                        }
                    },
                    "return": "Promise<any>"
                },
                "docs": {
                    "text": "Show loyalty modal",
                    "tags": []
                }
            },
            "close": {
                "complexType": {
                    "signature": "() => Promise<HTMLElement>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "HTMLElement": {
                            "location": "global",
                            "id": "global::HTMLElement"
                        }
                    },
                    "return": "Promise<HTMLElement>"
                },
                "docs": {
                    "text": "\nHide loyalty modal",
                    "tags": []
                }
            },
            "resetExchange": {
                "complexType": {
                    "signature": "() => Promise<any>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<any>"
                },
                "docs": {
                    "text": "\nCancel Exchanged prizes",
                    "tags": []
                }
            },
            "exchangeLoyaltyPoint": {
                "complexType": {
                    "signature": "() => Promise<any>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<any>"
                },
                "docs": {
                    "text": "Exchange loyalty points with the selected prize item",
                    "tags": [{
                            "name": "param",
                            "text": "loyalty_prize_id"
                        }]
                }
            }
        };
    }
}
