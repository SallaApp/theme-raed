/*!
 * Crafted with ❤ by Salla
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { C as Cancel } from './cancel.js';
import { A as AlertEngineIcon, C as CheckCircle2 } from './check-circle2.js';
import { H as Helper } from './Helper.js';
import { d as defineCustomElement$1 } from './salla-loading2.js';

const sallaDrawerCss = "";

const SallaDrawer = /*@__PURE__*/ proxyCustomElement(class SallaDrawer extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.drawerVisibilityChanged = createEvent(this, "drawerVisibilityChanged", 7);
        /**
         * Sets the drawer to be closable. Defaults to `true`
         */
        this.isClosable = true;
        /**
         * The width of the drawer
         */
        this.width = 'md';
        /**
         * The position of the drawer (left or right)
         */
        this.position = 'right';
        /**
         * open the drawer on rendering
         */
        this.visible = false;
        /**
         * open the drawer on rendering
         */
        this.hasSkeleton = false;
        /**
         * Show loading in the middle
         */
        this.isLoading = false;
        /**
         * Show subtitle before the title or not, defaults to `false` (after the title)
         */
        this.subTitleFirst = false;
        /**
         * Avoid padding in the drawer body or not, defaults to `false`
         */
        this.noPadding = false;
        /**
         * Set drawer sub title.
         */
        this.subTitle = '';
        /**
         * Align drawer content to center, defaults to `false`
         */
        this.centered = false;
        /**
         * Set the style of the header icon.
         */
        this.iconStyle = undefined;
        salla.event.on('drawer::open', target => target == this.host.id && this.open());
        salla.event.on('drawer::close', target => target == this.host.id && this.close());
        this.drawerTitle = this.host.getAttribute('drawer-title');
    }
    handleVisible(newValue) {
        if (!newValue) {
            this.drawerVisibilityChanged.emit(false);
            this.toggleDrawer(false);
            return;
        }
        this.drawerVisibilityChanged.emit(true);
        this.host.classList.remove('s-hidden');
        setTimeout(() => this.toggleDrawer(true)); //small amont of time to running toggle After adding hidden
    }
    handleKeyUp(ev) {
        if (ev.key === "Escape") {
            this.closeDrawer();
        }
    }
    /**
     * Open the drawer
     */
    async open() {
        this.host.setAttribute('visible', '');
        this.handleAutoFocus();
        return this.host;
    }
    /**
     * close the drawer
     */
    async close() {
        this.host.removeAttribute('visible');
        return this.host;
    }
    /**
     * Change the Drawer Title
     * @param {string} drawerTitle
     */
    async setTitle(drawerTitle) {
        this.drawerTitle = drawerTitle;
        return this.host;
    }
    /**
     * Start loading
     */
    async loading() {
        this.isLoading = true;
        return this.host;
    }
    /**
     * Stop the loading
     */
    async stopLoading() {
        this.isLoading = false;
        return this.host;
    }
    handleAutoFocus() {
        const firstFocusableElement = this.host.querySelector('input, textarea, select');
        if (!firstFocusableElement) {
            return;
        }
        setTimeout(() => {
            firstFocusableElement.focus();
        }, 100);
    }
    toggleDrawer(isOpen) {
        const body = this.host.querySelector('.s-drawer-body');
        Helper.toggleElementClassIf(body, 's-drawer-entering', 's-drawer-leaving', () => isOpen)
            .toggleElementClassIf(this.overlay, 's-drawer-entering', 's-drawer-overlay-leaving', () => isOpen)
            .toggleElementClassIf(document.body, 'drawer-is-open', 'drawer-is-closed', () => isOpen);
        if (!isOpen) {
            setTimeout(() => this.host.classList.add('s-hidden'), 350);
        }
    }
    closeDrawer(reason) {
        if (!this.isClosable) {
            return;
        }
        salla.event.dispatch('drawer::close', { reason });
        this.host.removeAttribute('visible');
    }
    iconBlockClasses() {
        return {
            's-drawer-icon': true,
            's-drawer-bg-error': this.iconStyle == 'error',
            's-drawer-bg-success': this.iconStyle == 'success',
            's-drawer-bg-normal': !this.iconStyle,
            's-drawer-bg-primary': this.iconStyle == 'primary'
        };
    }
    getWidth() {
        return this.isLoading ? (this.hasSkeleton ? 'md' : 'xs') : this.width;
    }
    render() {
        this.host.id = this.host.id || 'salla-drawer';
        if (this.isLoading) {
            return (h(Host, { class: 'salla-drawer s-drawer s-drawer-container s-hidden', "aria-modal": "true", role: "dialog", onKeyUp: e => this.handleKeyUp(e) }, h("div", { class: "s-drawer-overlay s-drawer-overlay-leaving", ref: el => this.overlay = el, onClick: () => this.closeDrawer("backdropClick") }), h("div", { class: "s-drawer-wrapper s-drawer-wrapper-" + this.position }, h("div", { class: 's-drawer-body flex justify-center s-drawer-leaving s-drawer-' + this.position + ' s-drawer-' + this.getWidth() + (this.noPadding ? ' s-drawer-nopadding' : ' s-drawer-padding') }, h("slot", { name: "loading" }, h("salla-loading", null)), h("div", { class: "s-hidden" }, h("slot", null))))));
        }
        return (h(Host, { class: 'salla-drawer s-drawer s-drawer-container s-hidden', "aria-modal": "true", role: "dialog" }, h("div", { class: "s-drawer-overlay  s-drawer-overlay-leaving", ref: el => this.overlay = el, onClick: () => this.closeDrawer("backdropClick") }), h("div", { class: "s-drawer-wrapper s-drawer-wrapper-" + this.position }, h("div", { class: 's-drawer-body s-drawer-leaving s-drawer-' + this.position + ' s-drawer-' + this.getWidth() + (this.noPadding ? ' s-drawer-nopadding' : ' s-drawer-padding') }, h("div", { class: { 's-drawer-header': true, 's-drawer-is-center': this.centered } }, this.isClosable ?
            h("button", { class: "s-drawer-close", onClick: () => this.closeDrawer("closeButtonClick"), type: "button" }, h("span", { innerHTML: Cancel }))
            : '', this.drawerTitle || this.subTitle ?
            h("div", { class: "s-drawer-header-inner" }, h("slot", { name: 'icon' }, !!this.iconStyle ?
                h("div", { class: this.iconBlockClasses(), innerHTML: this.iconStyle == 'error' ? AlertEngineIcon : CheckCircle2 })
                : ''), h("div", { class: "s-drawer-header-content" }, this.drawerTitle ? h("div", { class: { 's-drawer-title': true, 's-drawer-title-below': this.subTitleFirst }, innerHTML: this.drawerTitle }) : '', this.subTitle ? h("p", { class: { 's-drawer-sub-title': true }, innerHTML: this.subTitle }) : ''))
            : ''), h("slot", null), h("slot", { name: "footer" })))));
    }
    //move the drawer as root dom, because we need the drawer to be outside the forms
    componentDidLoad() {
        document.body.append(this.host);
    }
    get host() { return this; }
    static get watchers() { return {
        "visible": ["handleVisible"]
    }; }
    static get style() { return sallaDrawerCss; }
}, [4, "salla-drawer", {
        "isClosable": [1028, "is-closable"],
        "width": [513],
        "position": [513],
        "visible": [516],
        "hasSkeleton": [516, "has-skeleton"],
        "isLoading": [1540, "is-loading"],
        "subTitleFirst": [4, "sub-title-first"],
        "noPadding": [4, "no-padding"],
        "subTitle": [1, "sub-title"],
        "centered": [4],
        "iconStyle": [1, "icon-style"],
        "drawerTitle": [32],
        "open": [64],
        "close": [64],
        "setTitle": [64],
        "loading": [64],
        "stopLoading": [64]
    }, [[0, "keyup", "handleKeyUp"]], {
        "visible": ["handleVisible"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["salla-drawer", "salla-loading"];
    components.forEach(tagName => { switch (tagName) {
        case "salla-drawer":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SallaDrawer);
            }
            break;
        case "salla-loading":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { SallaDrawer as S, defineCustomElement as d };
