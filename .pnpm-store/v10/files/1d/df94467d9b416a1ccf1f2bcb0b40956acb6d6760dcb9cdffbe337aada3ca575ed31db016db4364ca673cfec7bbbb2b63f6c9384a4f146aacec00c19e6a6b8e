/*!
 * Crafted with ❤ by Salla
 */
import { Host, h } from "@stencil/core";
import informationIcon from "../../assets/svg/information-line.svg";
export class SallaAlert {
    constructor() {
        /** Variant theme */
        this.variant = 'info';
    }
    renderIcon() {
        const type = this.icon || this.variant;
        if (type === 'none')
            return null;
        switch (type) {
            case 'success':
                return (h("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor" }, h("path", { d: "M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" })));
            case 'warning':
                return (h("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor" }, h("path", { d: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" })));
            case 'error':
                return (h("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor" }, h("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 \n                     10 10 10-4.48 10-10S17.52 2 12 2zm5 \n                     13.59L15.59 17 12 13.41 8.41 17 \n                     7 15.59 10.59 12 7 8.41 8.41 7 \n                     12 10.59 15.59 7 17 8.41 13.41 \n                     12 17 15.59z" })));
            default:
                return h("span", { innerHTML: informationIcon });
        }
    }
    render() {
        return (h(Host, { key: '3b5dd808399eeda5d930454542cd41cca26b0cc3', class: `s-alert-wrapper s-alert-${this.variant}` }, h("span", { key: '4f58234774d1afc790fb83bff983ca9366faa349', class: "s-alert-icon" }, this.renderIcon()), h("span", { key: '10eb3f87e6e77dcc5406a24f866feee1cc1f46ef', class: "s-alert-text" }, this.message, h("slot", { key: '3656e15aeb25fb7285e88f694c090bad3b32dfbd' }))));
    }
    static get is() { return "salla-alert"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-alert.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-alert.css"]
        };
    }
    static get properties() {
        return {
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
                    "text": "Message text"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "'info' | 'success' | 'warning' | 'error'",
                    "resolved": "\"error\" | \"info\" | \"success\" | \"warning\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Variant theme"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'info'"
            },
            "icon": {
                "type": "string",
                "attribute": "icon",
                "mutable": false,
                "complexType": {
                    "original": "'info' | 'success' | 'warning' | 'error' | 'none'",
                    "resolved": "\"error\" | \"info\" | \"none\" | \"success\" | \"warning\"",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Icon type (defaults to variant)"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
}
