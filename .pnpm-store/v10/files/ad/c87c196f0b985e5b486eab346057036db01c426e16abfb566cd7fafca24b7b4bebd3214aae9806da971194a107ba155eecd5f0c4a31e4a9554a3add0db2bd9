/*!
 * Crafted with ❤ by Salla
 */
import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const sallaProgressBarCss = "";

const SallaProgressBar = /*@__PURE__*/ proxyCustomElement(class SallaProgressBar extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        /**
         * Set height for the wrapper.
         */
        this.height = "10px";
        try {
            if (this.donation) {
                let donationJson = typeof this.donation == 'string' ? JSON.parse(this.donation) : this.donation;
                if (donationJson.can_donate && donationJson.target_amount) {
                    donationJson.target_end_date = donationJson.target_end_date == '0000-00-00' ? null : donationJson.target_end_date;
                    this.value = donationJson.collected_amount;
                    this.target = donationJson.target_amount;
                    this.header = salla.lang.get('pages.products.target');
                    this.message = donationJson.target_end_date ? salla.lang.get('pages.products.donation_target_date') + ' ' + donationJson.target_end_date : '';
                }
                else {
                    //in case the product is not enabled target campaign
                    this.message = donationJson.target_amount
                        ? donationJson.target_message
                        : '';
                }
            }
        }
        catch (e) {
            salla.log('Wrong donation json');
        }
        salla.lang.onLoaded(() => {
            this.header = this.header?.replace('pages.products.target', salla.lang.get('pages.products.target'));
            this.message = this.message?.replace('pages.products.donation_target_date', salla.lang.get('pages.products.donation_target_date'));
        });
        salla.onReady(() => {
            this.color = this.color || salla.config.get('theme.color.primary', "#ffd5c4");
            if (!this.unit) {
                this.unit = salla.config.currency().symbol;
            }
        });
    }
    getPercentage() {
        return (this.value / this.target) * 100;
    }
    render() {
        if (!this.target && !this.message) {
            return '';
        }
        return (h("div", { class: "s-progress-bar-container" }, this.header ? h("div", { class: "s-progress-bar-header" }, this.header) : '', this.getProgressBar(), this.message ? h("span", { class: "s-progress-bar-message" }, this.message) : ''));
    }
    getProgressBar() {
        return this.target ? [
            !this.hideUnits ? (h("div", { class: "s-progress-bar-target-section" }, h("span", { innerHTML: `${salla.helpers.number(this.value)} ${this.unit}` }), h("span", { innerHTML: `${salla.helpers.number(this.target)} ${this.unit}` }))) : null,
            h("div", { class: "s-progress-bar-wrapper", style: { height: this.height } }, h("div", { class: {
                    "s-progress-bar-progress": true,
                    's-progress-bar-progress-stripped': this.stripped
                }, style: {
                    width: `${this.getPercentage()}%`,
                    backgroundColor: this.color
                } }))
        ] : null;
    }
    static get style() { return sallaProgressBarCss; }
}, [0, "salla-progress-bar", {
        "donation": [1],
        "target": [1026],
        "value": [1026],
        "height": [1025],
        "header": [1025],
        "stripped": [1028],
        "message": [1025],
        "unit": [1025],
        "color": [1025],
        "hideUnits": [4, "hide-units"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["salla-progress-bar"];
    components.forEach(tagName => { switch (tagName) {
        case "salla-progress-bar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SallaProgressBar);
            }
            break;
    } });
}
defineCustomElement();

export { SallaProgressBar as S, defineCustomElement as d };
