/*!
 * Crafted with ❤ by Salla
 */
import { h } from "@stencil/core";
export class SallaProgressBar {
    constructor() {
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
    static get is() { return "salla-progress-bar"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-progress-bar.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-progress-bar.css"]
        };
    }
    static get properties() {
        return {
            "donation": {
                "type": "string",
                "attribute": "donation",
                "mutable": false,
                "complexType": {
                    "original": "string | Donation",
                    "resolved": "Donation | string",
                    "references": {
                        "Donation": {
                            "location": "import",
                            "path": "../salla-product-options/interfaces",
                            "id": "src/components/salla-product-options/interfaces.ts::Donation"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "You can just pass the donation as json string ex: `{\"target_message\":null,\"target_date\":\"2023-04-18\",\"target_end_date\":\"2023-04-18\",\"target_amount\":400,\"collected_amount\":380,\"can_donate\":true}`"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "target": {
                "type": "number",
                "attribute": "target",
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
                    "text": "The goal of the progress bar"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "value": {
                "type": "number",
                "attribute": "value",
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
                    "text": "The progress so far as of the goal."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "height": {
                "type": "string",
                "attribute": "height",
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
                    "text": "Set height for the wrapper."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "\"10px\""
            },
            "header": {
                "type": "string",
                "attribute": "header",
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
                    "text": "Big Title, before the progress bar."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "stripped": {
                "type": "boolean",
                "attribute": "stripped",
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
                    "text": "Stripped effect for tje progress bar."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "message": {
                "type": "string",
                "attribute": "message",
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
                    "text": "Subtitle under the progress bar or instead of it if the target not being set."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "unit": {
                "type": "string",
                "attribute": "unit",
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
                    "text": "The unite to be added after the numbers, defaults to: `salla.config.currency().symbol`"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "color": {
                "type": "string",
                "attribute": "color",
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
                    "text": "Progress bar color, defaults to: `salla.config.get('theme.color.primary', \"#ffd5c4\")`"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "hideUnits": {
                "type": "boolean",
                "attribute": "hide-units",
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
                    "text": "Hide units above the progress bar"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
}
