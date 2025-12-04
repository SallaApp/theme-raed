/*!
 * Crafted with ❤ by Salla
 */
import { Host, h } from "@stencil/core";
import CelebrationIcon from "../../assets/svg/party-horn.svg";
import PortraitIcon from "../../assets/svg/portrait.svg";
import IphoneXIcon from "../../assets/svg/iphone-x.svg";
import MailIcon from "../../assets/svg/mail.svg";
import CancelIcon from "../../assets/svg/cancel.svg";
export class SallaQuickOrder {
    constructor() {
        /**
         * quick order title
         */
        this.quickOrderTitle = 'ليش تنتظر؟';
        /**
         * quick order sub title
         */
        this.subTitle = 'احصل على المنتج مباشرة الآن';
        /**
         * quick order pay button text
         */
        this.payButtonTitle = 'اطلب المنتج';
        /**
         * quick order confirm pay button text
         */
        this.confirmPayButtonTitle = 'اشتر الآن';
        /**
         * agreement text from server or from props
         */
        this.agreementText = salla.lang.get('pages.checkout.show_full_agreement');
        /**
         * is email required
         */
        this.isEmailRequired = false;
        /**
         * Quick Order Style
         */
        this.quickOrderStyle = 'default';
        this.isAvailable = false;
        this.oneClick = false;
        this.expanded = false;
        this.isTermsRequired = false;
        this.countryCode = salla.config.get('user.country_code', 'SA') || 'SA';
        this.submitSucess = false;
        //Langugae states
        this.placeHolderEmail = salla.lang.get('common.elements.email');
        this.emailOptional = salla.lang.get('common.elements.optional');
        this.agreementShowText = salla.lang.get('pages.checkout.show_full_agreement');
        this.agreementModalHead = salla.lang.get('pages.checkout.full_agreement');
        this.userNameLabel = salla.lang.get('pages.products.your_name');
        this.termsChecked = false;
        salla.onReady(() => {
            this.productId = this.productId || salla.config.get('page.id');
        });
        salla.lang.onLoaded(() => {
            this.placeHolderEmail = salla.lang.get('common.elements.email');
            this.emailOptional = salla.lang.get('common.elements.optional');
            this.agreementShowText = salla.lang.get('pages.checkout.show_full_agreement');
            this.agreementModalHead = salla.lang.get('pages.checkout.full_agreement');
            this.userNameLabel = salla.lang.get('pages.products.your_name');
        });
    }
    getBtnColor() {
        return this.quickOrderStyle === 'default' ? 'light' : 'primary';
    }
    getErrorMessage(type, name) {
        return name == 'terms'
            ? salla.lang.get('pages.checkout.check_agreement')
            : salla.lang.get(`common.errors.${type}`, { attribute: name == 'name' ? this.userNameLabel : this.placeHolderEmail });
    }
    handleInvalidInput(e) {
        let input = e.target;
        let validity = input.validity;
        let errorMessage;
        if (validity.valueMissing) {
            errorMessage = this.getErrorMessage('field_required', input.name);
            console.log(this.getErrorMessage('field_required', input.name));
        }
        else if (validity.typeMismatch) {
            errorMessage = this.getErrorMessage('invalid_value', input.name);
        }
        input.setCustomValidity(errorMessage);
    }
    async setWrapperHeight() {
        let expandable = this.host.querySelector('.s-quick-order-expandable');
        setTimeout(() => {
            if (expandable.style.maxHeight || this.oneClick) {
                expandable.style.maxHeight = null;
            }
            else {
                expandable.style.maxHeight = expandable.scrollHeight + "px";
            }
        }, 50);
    }
    getDarkOrLight() {
        return this.quickOrderStyle === 'default' && salla.config.get('theme.color.is_dark') ? 'dark' : 'light';
    }
    getStyleColor() {
        return {
            gray: '#f3f3f3',
            white: '#ffffff',
            default: salla.config.get('theme.color.primary'),
        }[this.quickOrderStyle] || '#f3f3f3';
    }
    async submit(e, checkOneClick = false) {
        e.preventDefault();
        if (checkOneClick && !this.oneClick) {
            this.expanded = !this.expanded;
            this.setWrapperHeight();
            return;
        }
        return this.submitBtn.load()
            .then(() => this.getPayload())
            .then((payload) => salla.api.cart.createQuickOrder(payload))
            .then(() => {
            setTimeout(() => {
                this.submitBtn.stop();
                this.submitSucess = true;
                this.quickOrderSubmited.emit();
            }, 200);
        })
            .catch(error => error && (console.error(error), this.submitBtn.stop()));
    }
    async getPayload() {
        if (this.oneClick) {
            return {
                product_ids: [this.productId],
                agreement: true,
            };
        }
        return {
            product_ids: [this.productId],
            email: this.emailInput?.value,
            phone: Number((await this.phoneInput?.getValues())?.phone),
            country_code: (await this.phoneInput?.getValues())?.countryCode || this.countryCode,
            name: this.nameInput?.value,
            agreement: this.termsChecked,
        };
    }
    formatAgreementText(agreement_text, length = 150) {
        if (!agreement_text)
            return '';
        if (agreement_text.length <= length)
            return agreement_text;
        const parsedToDOM = new DOMParser().parseFromString(agreement_text, 'text/html');
        return parsedToDOM.documentElement.innerText.substring(0, length) + '...';
    }
    loadQuickOrderSettings() {
        let data = salla.config.get('store.settings.quick_order');
        if (!data) {
            return Promise.resolve();
        }
        this.user = salla.config.get('user') || salla.storage.get('user') || {};
        this.countryCode = this.user?.country_code || this.countryCode;
        // make email required if user is gust or is required from server
        this.isEmailRequired = this.user?.email ? false : this.isEmailRequired;
        // check if one click is available
        this.oneClick = this.user?.email;
        this.initComponentData(data);
        return Promise.resolve();
        // return salla.api.withoutNotifier(() => salla.api.cart.getQuickOrderSettings().then(res => this.initComponentData(res.data)));
    }
    initComponentData(data) {
        this.quickOrderTitle = data.title;
        this.subTitle = data.sub_title;
        this.payButtonTitle = data.order_now_button;
        this.isEmailRequired = data.is_email_required;
        this.isTermsRequired = data.show_agreement;
        this.agreementText = data.agreement;
        this.confirmPayButtonTitle = data.confirm_button;
        this.thanksMessage = data.thanks_message;
        this.quickOrderStyle = data.style;
        this.isAvailable = true;
        // toggle oneClick if true
        this.oneClick = this.oneClick && !this.isTermsRequired;
    }
    componentWillLoad() {
        return new Promise(resolve => salla.onReady(() => this.loadQuickOrderSettings().then(resolve)));
    }
    render() {
        if (!this.isAvailable) {
            return;
        }
        if (this.submitSucess) {
            return (h(Host, { class: "s-quick-order" }, h("div", { class: 's-quick-order-confirm', style: {
                    backgroundColor: salla.config.get('theme.color.primary') + '10',
                    borderColor: salla.config.get('theme.color.primary') + '10',
                    color: salla.config.get('theme.color.primary')
                } }, h("i", { innerHTML: CelebrationIcon }), h("span", null, this.thanksMessage))));
        }
        return (h(Host, { class: `s-quick-order s-quick-order-${this.getDarkOrLight()}` }, h("div", { class: `s-quick-order-container s-quick-order-${this.quickOrderStyle}`, style: { backgroundColor: this.getStyleColor() } }, h("div", { class: "s-quick-order-button-cont" }, h("div", null, h("h3", null, this.quickOrderTitle), h("p", null, this.subTitle)), h("salla-button", { class: this.expanded ? "s-quick-order-btn-close" : "", onClick: (e) => this.submit(e, true), color: this.getBtnColor() }, this.oneClick
            ? this.confirmPayButtonTitle : this.expanded ? h("i", { innerHTML: CancelIcon }) : this.confirmPayButtonTitle)), h("form", { onSubmit: (e) => this.submit(e), class: 's-quick-order-expandable ' + (this.expanded ? 's-quick-order-shown' : '') }, Salla.config.isGuest() &&
            [
                h("div", { class: "s-form-group" }, h("span", { innerHTML: PortraitIcon }), h("input", { type: "text", required: true, class: "s-form-control s-quick-order-phone-field", name: 'name', placeholder: this.userNameLabel, ref: el => (this.nameInput = el) })),
                h("div", { class: "s-quick-order-flex-input" }, h("div", { class: "s-form-group" }, h("span", { innerHTML: IphoneXIcon }), h("salla-tel-input", { ref: el => (this.phoneInput = el) })), h("div", { class: "s-form-group" }, h("span", { innerHTML: MailIcon }), h("input", { type: "email", class: "s-form-control s-quick-order-email-field", name: 'email', required: this.isEmailRequired, placeholder: this.placeHolderEmail + ' ' + (this.isEmailRequired ? '' : this.emailOptional), ref: el => (this.emailInput = el) }))),
            ], this.isTermsRequired && (h("label", { htmlFor: "terms", class: "s-quick-order-terms" }, h("input", { type: "checkbox", required: true, name: 'terms', id: 'terms', ref: el => (this.termsInput = el), onChange: () => (this.termsChecked = this.termsInput.checked), class: "s-checkbox" }), h("span", { class: "s-form-label" }, " ", h("div", { innerHTML: this.formatAgreementText(this.agreementText, 150) }, this.agreementText.length > 150 && (h("salla-button", { shape: "link", onClick: () => this.agreementModal.open() }, this.agreementShowText))), " "))), h("salla-button", { type: "submit", color: this.getBtnColor(), width: "wide", ref: el => (this.submitBtn = el) }, this.payButtonTitle)), h("salla-modal", { "modal-title": this.agreementModalHead, ref: modal => (this.agreementModal = modal) }, h("article", { innerHTML: this.agreementText })))));
    }
    componentDidLoad() {
        this.host.querySelectorAll('input').forEach(input => {
            input.addEventListener('invalid', e => {
                this.handleInvalidInput(e);
            });
            input.addEventListener('input', () => {
                input.setCustomValidity('');
                input.reportValidity();
            });
        });
    }
    static get is() { return "salla-quick-order"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-quick-order.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-quick-order.css"]
        };
    }
    static get properties() {
        return {
            "quickOrderTitle": {
                "type": "string",
                "attribute": "quick-order-title",
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
                    "text": "quick order title"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'\u0644\u064A\u0634 \u062A\u0646\u062A\u0638\u0631\u061F'"
            },
            "subTitle": {
                "type": "string",
                "attribute": "sub-title",
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
                    "text": "quick order sub title"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0646\u062A\u062C \u0645\u0628\u0627\u0634\u0631\u0629 \u0627\u0644\u0622\u0646'"
            },
            "payButtonTitle": {
                "type": "string",
                "attribute": "pay-button-title",
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
                    "text": "quick order pay button text"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'\u0627\u0637\u0644\u0628 \u0627\u0644\u0645\u0646\u062A\u062C'"
            },
            "confirmPayButtonTitle": {
                "type": "string",
                "attribute": "confirm-pay-button-title",
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
                    "text": "quick order confirm pay button text"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'\u0627\u0634\u062A\u0631 \u0627\u0644\u0622\u0646'"
            },
            "agreementText": {
                "type": "string",
                "attribute": "agreement-text",
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
                    "text": "agreement text from server or from props"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "salla.lang.get(\n    'pages.checkout.show_full_agreement'\n  )"
            },
            "isEmailRequired": {
                "type": "boolean",
                "attribute": "is-email-required",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "is email required"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "productId": {
                "type": "string",
                "attribute": "product-id",
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
                    "text": "product id local or from page"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "thanksMessage": {
                "type": "string",
                "attribute": "thanks-message",
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
                    "text": "product id local or from page"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "quickOrderStyle": {
                "type": "string",
                "attribute": "quick-order-style",
                "mutable": true,
                "complexType": {
                    "original": "'gray' | 'white' | 'default'",
                    "resolved": "\"default\" | \"gray\" | \"white\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Quick Order Style"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'default'"
            }
        };
    }
    static get states() {
        return {
            "user": {},
            "isAvailable": {},
            "oneClick": {},
            "expanded": {},
            "isTermsRequired": {},
            "countryCode": {},
            "submitSucess": {},
            "placeHolderEmail": {},
            "emailOptional": {},
            "agreementShowText": {},
            "agreementModalHead": {},
            "userNameLabel": {},
            "termsChecked": {}
        };
    }
    static get events() {
        return [{
                "method": "quickOrderSubmited",
                "name": "quickOrderSubmited",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Custome DOM event emitter when order gets submitted successfully."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "host"; }
}
