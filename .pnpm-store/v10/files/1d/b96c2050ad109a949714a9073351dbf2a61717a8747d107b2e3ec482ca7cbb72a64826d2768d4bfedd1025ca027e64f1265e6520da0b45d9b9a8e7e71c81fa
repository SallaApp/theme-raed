/*!
 * Crafted with ❤ by Salla
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { A as Add, M as Minus } from './minus.js';

const sallaAccordionHeadCss = "";

const SallaAccordionHead = /*@__PURE__*/ proxyCustomElement(class SallaAccordionHead extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.accordionToggle = createEvent(this, "accordionToggle", 7);
        /** Should the accordion be collapsible or not. */
        this.collapsible = false;
        /** Current collapsed state */
        this.collapsed = true;
    }
    emitCollapsePanel() {
        this.accordionToggle.emit({
            payload: {
                collapsed: this.collapsed,
            },
        });
    }
    toggleCollapse() {
        if (!this.collapsible)
            return;
        this.collapsed = !this.collapsed;
        this.host.parentElement?.setAttribute('data-collapsed', this.collapsed.toString());
        this.host.parentElement
            ?.querySelector('salla-accordion-body')
            ?.setAttribute('data-collapsed', this.collapsed.toString());
        this.emitCollapsePanel();
    }
    render() {
        return (h(Host, { key: '9d88d243306cdf451c20d7068fbb9f48807b22e9', "data-collapsed": this.collapsed.toString(), onClick: () => this.toggleCollapse(), class: "s-accordion-head-wrapper" }, h("div", { key: 'bad4c5a913ce1c4581b09c0b6d96fcbdb4236638', class: "s-accordion-head-wrapper-start" }, h("slot", { key: 'acb83cec8cbca5771a9f84e81c0b955c3edad731', name: "title" }), h("slot", { key: 'a4ad42ea6fad4f452c4c218a9ee02dca0adb4a67', name: "progress" }), h("slot", { key: '96ab95d413dc906ac299079f4008816f01881990', name: "html" })), (this.collapsible || this.host.querySelector('[slot="note"]')) && (h("div", { key: '8f9666a5038cd7b1ac6e357c6920ea26d31c5f03', class: "s-accordion-head-wrapper-end" }, h("slot", { key: '14895e8c1385e91c14f046c9ae38ce5e4a4c9a60', name: "note" }), this.collapsible && (h("button", { key: '97dc7fabbb207fcc8b68ebf0a86f6c8a980dca13', class: {
                's-accordion-head-wrapper-toggle': true,
                active: !this.collapsed,
            }, onClick: e => {
                e.stopPropagation();
                this.toggleCollapse();
            } }, h("span", { key: '3b24faf71dcd332663a354310b2ce09f7879eddc', class: "s-accordion-head-wrapper-toggle-icon", innerHTML: this.collapsed ? Add : Minus })))))));
    }
    get host() { return this; }
    static get style() { return sallaAccordionHeadCss; }
}, [4, "salla-accordion-head", {
        "collapsible": [4],
        "collapsed": [1540]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["salla-accordion-head"];
    components.forEach(tagName => { switch (tagName) {
        case "salla-accordion-head":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SallaAccordionHead);
            }
            break;
    } });
}
defineCustomElement();

export { SallaAccordionHead as S, defineCustomElement as d };
