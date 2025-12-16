/*!
 * Crafted with ❤ by Salla
 */
import { Host, h } from "@stencil/core";
import infoIcon from "../../assets/svg/info.svg";
import cartIcon from "../../assets/svg/cart.svg";
import imageIcon from "../../assets/svg/image.svg";
import moneyIcon from "../../assets/svg/money-card.svg";
import checkCircleIcon from "../../assets/svg/check-circle.svg";
export class SallaBottomAlert {
    constructor() {
        this.storeId = salla.config.get('store.id');
        this.template = salla.config.get('store.template');
        this.loading = false;
        this.templateData = {};
        this.defaultMessage = salla.lang.getWithDefault('common.elements.store_is_available_for_purchase', 'هذا المتجر تطويري ومتاح للشراء من');
        this.defaultActionLabel = salla.lang.get('common.elements.know_more');
        this.storeFeatures = salla.lang.get('common.elements.store_features');
        this.storeDetails = salla.lang.get('common.elements.store_details');
        this.storePrice = salla.lang.getWithDefault('common.elements.store_price', 'سعر المتجر');
        this.storePriceDetails = salla.lang.getWithDefault('common.elements.store_price_details', 'السعر يشمل');
        this.theDeveloper = salla.lang.get('common.elements.the_developer');
        this.templateInformation = salla.lang.get('common.elements.template_information');
        this.buyTheTemplate = salla.lang.get('common.elements.buy_the_template');
        this.isRtl = salla.config.get('theme.is_rtl', true);
        this.storeName = salla.config.get('store.name');
        this.salla = salla.lang.getWithDefault('common.elements.salla', 'سلة');
        this.readyStores = salla.lang.getWithDefault('common.elements.ready_stores', 'المتاجر الجاهزة');
        this.moreDetailsLabel = salla.lang.getWithDefault('common.elements.more_details', 'تفاصيل أكثر');
        /**
         * Alert Type
         * */
        this.type = 'popup';
        salla.lang.onLoaded(() => {
            this.defaultMessage = salla.lang.get('common.elements.experimental_and_available_store');
            this.defaultActionLabel = salla.lang.get('common.elements.know_more');
            this.storeFeatures = salla.lang.get('common.elements.store_features');
            this.storeDetails = salla.lang.get('common.elements.store_details');
            this.templateInformation = salla.lang.get('common.elements.template_information');
            this.buyTheTemplate = salla.lang.get('common.elements.buy_the_template');
            salla.helpers.setNested(salla.lang.messages['ar.trans'], 'common.elements.more_details', 'تفاصيل أكثر');
            salla.helpers.setNested(salla.lang.messages['en.trans'], 'common.elements.more_details', 'More Details');
            salla.helpers.setNested(salla.lang.messages['ar.trans'], 'common.elements.store_price', 'سعر المتجر');
            salla.helpers.setNested(salla.lang.messages['en.trans'], 'common.elements.store_price', 'Store Price');
            salla.helpers.setNested(salla.lang.messages['ar.trans'], 'common.elements.the_developer', 'المطور');
            salla.helpers.setNested(salla.lang.messages['en.trans'], 'common.elements.the_developer', 'the developer');
            salla.helpers.setNested(salla.lang.messages['ar.trans'], 'common.elements.store_price_details', 'السعر يشمل');
            salla.helpers.setNested(salla.lang.messages['en.trans'], 'common.elements.store_price_details', 'Price Includes');
            salla.helpers.setNested(salla.lang.messages['ar.trans'], 'common.elements.salla', 'سلة');
            salla.helpers.setNested(salla.lang.messages['en.trans'], 'common.elements.salla', 'Salla');
            salla.helpers.setNested(salla.lang.messages['ar.trans'], 'common.elements.store_is_available_for_purchase', 'هذا المتجر تطويري ومتاح للشراء من');
            salla.helpers.setNested(salla.lang.messages['en.trans'], 'common.elements.store_is_available_for_purchase', 'This ready store is available for purchase from');
            salla.helpers.setNested(salla.lang.messages['ar.trans'], 'common.elements.ready_stores', 'المتاجر الجاهزة');
            salla.helpers.setNested(salla.lang.messages['en.trans'], 'common.elements.ready_stores', 'Ready Stores');
            setTimeout(() => {
                this.storePrice = salla.lang.get('common.elements.store_price');
                this.theDeveloper = salla.lang.get('common.elements.the_developer');
                this.storePriceDetails = salla.lang.getWithDefault('common.elements.store_price_details', 'السعر يشمل');
                this.salla = salla.lang.getWithDefault('common.elements.salla', 'سلة');
                this.defaultMessage = salla.lang.getWithDefault('common.elements.store_is_available_for_purchase', 'هذا المتجر تطويري ومتاح للشراء من');
                this.readyStores = salla.lang.getWithDefault('common.elements.ready_stores', 'المتاجر الجاهزة');
                // Initialize moreDetailsLabel after translations loaded
                this.moreDetailsLabel = salla.lang.getWithDefault('common.elements.more_details', 'More Details');
            }, 100);
        });
    }
    componentDidLoad() {
        // Fetch template data on mount if there's a template
        if (this.template &&
            typeof this.template === 'object' &&
            Object.keys(this.template).length > 0) {
            this.fetchTemplateData();
        }
    }
    open() {
        return this.drawer.open();
    }
    fetchTemplateData() {
        if (Object.keys(this.templateData).length) {
            return;
        }
        this.loading = true;
        return salla.api
            .request(`/store/template`, {}, 'get', { 'Store-Identifier': this.storeId })
            .then(res => {
            this.templateData = res.data;
            this.loading = false;
        })
            .catch(() => {
            this.loading = false;
        });
    }
    handleAction() {
        if (this.type === 'link') {
            window.location.href = this.actionUrl;
        }
        if (this.type === 'popup') {
            this.open();
        }
    }
    popup() {
        return (h("salla-drawer", { class: "s-bottom-alert-modal", ref: drawer => (this.drawer = drawer), "no-padding": true, onLoad: () => {
                if (this.drawer && Object.keys(this.templateData).length) {
                    this.drawer.setTitle(this.storeDetails + ' ' + this.storeName);
                }
            } }, Object.keys(this.templateData).length
            ? [
                h("div", { class: "s-bottom-alert-modal-inner s-scrollbar" }, h("div", { class: { 's-bottom-alert-modal-content': true } }, this.templateData?.features
                    ? [
                        h("div", { class: "s-bottom-alert-modal-content-title" }, h("i", { innerHTML: imageIcon, class: "s-bottom-alert-modal-content-icon" }), h("span", null, this.storeFeatures)),
                        h("div", { class: "s-bottom-alert-modal-content-features", innerHTML: this.templateData?.features }),
                    ]
                    : ''), h("div", { class: {
                        's-bottom-alert-modal-content': true,
                        's-bottom-alert-modal-content-extra-padding': this.templateData?.price,
                    } }, this.templateData?.features
                    ? [
                        h("div", { class: "s-bottom-alert-modal-content-title" }, h("i", { innerHTML: moneyIcon, class: "s-bottom-alert-modal-content-icon" }), h("span", null, this.storePriceDetails)),
                        h("div", { class: "s-bottom-alert-modal-content-price-details" }, this.templateData?.price_details?.items.map(item => (h("div", { class: "s-bottom-alert-modal-content-price-details-item" }, h("i", { innerHTML: checkCircleIcon, class: "s-bottom-alert-modal-content-price-details-item-icon" }), h("span", { class: "s-bottom-alert-modal-content-price-details-item-name" }, item.name), h("span", { class: "s-bottom-alert-modal-content-price-details-item-price", innerHTML: salla.money(item.price) }))))),
                    ]
                    : ''), this.templateData?.link ? (h("div", { class: "s-bottom-alert-modal-content-footer" }, h("salla-button", { color: "primary", size: "medium", width: "wide", href: this.templateData?.link }, h("i", { innerHTML: cartIcon }), this.buyTheTemplate))) : ('')),
            ]
            : ''));
    }
    render() {
        const hasTemplate = this.template && typeof this.template === 'object' && Object.keys(this.template).length > 0;
        return (h(Host, { key: 'e5f273d72875760e30d99d419b247137583bc450', class: `s-bottom-alert-wrapper ${hasTemplate ? 's-bottom-alert-wrapper-with-template' : ''}` }, hasTemplate && (h("div", { key: '1db37d7c67aae449f41a9a3ed83489b2a0653cef', class: "s-bottom-alert-logo-section" }, h("img", { key: '18701cd3d807042b4d852f283d43a6855282f791', src: "https://cdn.salla.network/images/logo/logo-light.svg", alt: "Salla", class: "s-bottom-alert-logo" }), h("span", { key: '66bb3f9b3c00aee5c2694d5ddb142e753ae7fa1a', class: "s-bottom-alert-logo-text" }, this.readyStores))), h("div", { key: '01d47c9ec38370b83bdb3fdc29291f55e1b3aa42', class: "s-bottom-alert-content" }, h("div", { key: '5380873bf9d393c0fa18da196e1bfb675a8c9c9b', class: "flex items-center gap-2" }, h("div", { key: '882382de35a7c9a767e2eb90305c8a973d01ac21', class: "s-bottom-alert-icon" }, this.icon ? h("i", { class: this.icon }) : h("i", { innerHTML: infoIcon })), h("div", { key: 'dfbaa427fd4e8b755a479e0b5459422e44a95f59', class: "s-bottom-alert-message" }, this.message ? (this.message) : hasTemplate ? (h("span", { class: "flex flex-wrap items-center gap-1" }, this.defaultMessage, h("span", { class: {
                's-bottom-alert-message-highlight': true,
            }, "aria-label": "Developer" }, this.salla), h("span", { innerHTML: salla.money(this.template.price) }))) : (this.defaultMessage))), this.type !== 'banner' && (h("div", { key: '327ef4b5ecdab7d994418c033a78c2531eb28de5', class: hasTemplate ? 's-bottom-alert-actions-group' : 's-bottom-alert-action' }, hasTemplate ? (this.loading ? (h("salla-loading", { size: "20" })) : (h("div", { class: "s-bottom-alert-actions-group-container" }, h("a", { class: "s-bottom-alert-action-link", onClick: () => this.handleAction() }, this.actionLabel || this.moreDetailsLabel), this.templateData?.link ? (h("button", { type: "button", class: "s-bottom-alert-action-purchase-button", onClick: () => window.open(this.templateData?.link, '_blank') }, this.buyTheTemplate)) : null))) : (h("salla-button", { href: this.actionUrl, size: "medium", onClick: () => this.handleAction(), width: "normal" }, this.actionLabel || this.defaultActionLabel)))), this.type === 'popup' && this.popup())));
    }
    static get is() { return "salla-bottom-alert"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-bottom-alert.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-bottom-alert.css"]
        };
    }
    static get properties() {
        return {
            "type": {
                "type": "string",
                "attribute": "type",
                "mutable": false,
                "complexType": {
                    "original": "'link' | 'popup' | 'banner'",
                    "resolved": "\"banner\" | \"link\" | \"popup\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Alert Type"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'popup'"
            },
            "icon": {
                "type": "string",
                "attribute": "icon",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Alert Icon class from salla icons library - ex: sicon-user"
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "message": {
                "type": "string",
                "attribute": "message",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Alert Message"
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "actionUrl": {
                "type": "string",
                "attribute": "action-url",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Button url - used when type is link"
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "actionLabel": {
                "type": "string",
                "attribute": "action-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Button label - used when type is link and popup"
                },
                "getter": false,
                "setter": false,
                "reflect": true
            }
        };
    }
    static get states() {
        return {
            "storeId": {},
            "template": {},
            "loading": {},
            "templateData": {},
            "defaultMessage": {},
            "defaultActionLabel": {},
            "storeFeatures": {},
            "storeDetails": {},
            "storePrice": {},
            "storePriceDetails": {},
            "theDeveloper": {},
            "templateInformation": {},
            "buyTheTemplate": {},
            "isRtl": {},
            "storeName": {},
            "salla": {},
            "readyStores": {},
            "moreDetailsLabel": {}
        };
    }
    static get elementRef() { return "host"; }
}
