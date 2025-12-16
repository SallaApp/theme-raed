/*!
 * Crafted with ❤ by Salla
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

var informationIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99935 18.3332C5.39697 18.3332 1.66602 14.6022 1.66602 9.99984C1.66602 5.39746 5.39697 1.6665 9.99935 1.6665C14.6017 1.6665 18.3327 5.39746 18.3327 9.99984C18.3327 14.6022 14.6017 18.3332 9.99935 18.3332ZM9.99935 16.6665C13.6813 16.6665 16.666 13.6818 16.666 9.99984C16.666 6.31794 13.6813 3.33317 9.99935 3.33317C6.31745 3.33317 3.33268 6.31794 3.33268 9.99984C3.33268 13.6818 6.31745 16.6665 9.99935 16.6665ZM9.16602 5.83317H10.8327V7.49984H9.16602V5.83317ZM9.16602 9.1665H10.8327V14.1665H9.16602V9.1665Z" fill="#417AC8"/>
</svg>
`;

const sallaAlertCss = ":host{display:block}";

const SallaAlert$1 = /*@__PURE__*/ proxyCustomElement(class SallaAlert extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
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
    static get style() { return sallaAlertCss; }
}, [4, "salla-alert", {
        "message": [1],
        "variant": [1],
        "icon": [1]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["salla-alert"];
    components.forEach(tagName => { switch (tagName) {
        case "salla-alert":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SallaAlert$1);
            }
            break;
    } });
}
defineCustomElement$1();

const SallaAlert = SallaAlert$1;
const defineCustomElement = defineCustomElement$1;

export { SallaAlert, defineCustomElement };
