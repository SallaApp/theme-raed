/*!
 * Crafted with ❤ by Salla
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { C as Cancel } from './cancel.js';
import { A as AlertEngineIcon, C as CheckCircle2 } from './check-circle2.js';
import { H as Helper } from './Helper.js';
import { d as defineCustomElement$1 } from './salla-loading2.js';

const sallaModalCss = "@media screen and (max-width: 470px){.modal-is-open{position:fixed;width:100%}}";

const SallaModal = /*@__PURE__*/ proxyCustomElement(class SallaModal extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.modalVisibilityChanged = createEvent(this, "modalVisibilityChanged", 7);
        /**
         * Sets the modal to be closable. Defaults to `true`
         */
        this.isClosable = true; //todo::rename unclude. Suggestion => persistent
        /**
         * The size of the modal
         */
        this.width = 'md';
        /**
         * The position of the modal
         */
        this.position = 'middle';
        /**
         * open the modal on rendering
         */
        this.visible = false;
        /**
         * open the modal on rendering
         */
        this.hasSkeleton = false;
        /**
         * Show loading in the middle
         */
        this.isLoading = false;
        /**
         * Show subtitle before the title or not, defaults to `false` (after the title)
         */
        this.subTitleFirst = false; //todo:: choose better name
        /**
         * Avoid padding in the modal body or not, defaults to `false`
         */
        this.noPadding = false; //todo:: choose better name
        /**
         * Set modal sub title.
         */
        this.subTitle = '';
        /**
         * Align modal content to center, defaults to `false`
         */
        this.centered = false;
        /**
         * Set the style of the header icon.
         */
        this.iconStyle = undefined;
        salla.event.on('modal::open', target => target == this.host.id && this.open());
        salla.event.on('modal::close', target => target == this.host.id && this.close());
        this.modalTitle = this.host.getAttribute('modal-title');
    }
    handleVisible(newValue) {
        if (!newValue) {
            this.modalVisibilityChanged.emit(false);
            this.toggleModal(false);
            return;
        }
        this.modalVisibilityChanged.emit(true);
        this.host.classList.remove('s-hidden');
        setTimeout(() => this.toggleModal(true)); //small amont of time to running toggle After adding hidden
    }
    handleKeyUp(ev) {
        if (ev.key === "KeyUp") {
            this.closeModal();
        }
    }
    /**
     * Open the modal
     */
    async open() {
        this.host.setAttribute('visible', '');
        this.handleAutoFocus();
        return this.host;
    }
    /**
     * close the modal
     */
    async close() {
        this.host.removeAttribute('visible');
        return this.host;
    }
    /**
     * Change the Modal Title
     * @param {string} modalTitle
     */
    async setTitle(modalTitle) {
        this.modalTitle = modalTitle;
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
    toggleModal(isOpen) {
        const body = this.host.querySelector('.s-modal-body');
        Helper.toggleElementClassIf(body, 's-modal-entering', 's-modal-leaving', () => isOpen)
            .toggleElementClassIf(this.overlay, 's-modal-entering', 's-modal-overlay-leaving', () => isOpen)
            .toggleElementClassIf(document.body, 'modal-is-open', 'modal-is-closed', () => isOpen);
        if (!isOpen) {
            setTimeout(() => this.host.classList.add('s-hidden'), 350);
        }
    }
    closeModal(reason) {
        if (!this.isClosable) {
            return;
        }
        salla.event.dispatch('modal::close', { reason });
        this.host.removeAttribute('visible');
    }
    iconBlockClasses() {
        return {
            's-modal-icon': true,
            's-modal-bg-error': this.iconStyle == 'error',
            's-modal-bg-success': this.iconStyle == 'success',
            's-modal-bg-normal': !this.iconStyle,
            's-modal-bg-primary': this.iconStyle == 'primary'
        };
    }
    getWidth() {
        return this.isLoading ? (this.hasSkeleton ? 'md' : 'xs') : this.width;
    }
    //todo:: pref for each modal
    render() {
        this.host.id = this.host.id || 'salla-modal';
        if (this.isLoading) {
            return (h(Host, { class: 'salla-modal s-modal s-modal-container s-hidden', "aria-modal": "true", role: "dialog", onKeyUp: e => this.handleKeyUp(e) }, h("div", { class: "s-modal-overlay", ref: el => this.overlay = el, onClick: () => this.closeModal("backdropClick") }), h("div", { class: "s-modal-wrapper" }, h("span", { class: 's-modal-spacer s-modal-align-' + this.position }, "\u200B"), h("div", { class: 's-modal-body ' + 's-modal-align-' + this.position + ' s-modal-' + this.getWidth() + (this.noPadding ? ' s-modal-nopadding' : ' s-modal-padding') }, h("slot", { name: "loading" }, h("salla-loading", null)), h("div", { class: "s-hidden" }, h("slot", null))))));
        }
        return (h(Host, { class: 'salla-modal s-modal s-modal-container s-hidden', "aria-modal": "true", role: "dialog" }, h("div", { class: "s-modal-overlay", ref: el => this.overlay = el, onClick: () => this.closeModal("backdropClick") }), h("div", { class: "s-modal-wrapper" }, h("span", { class: 's-modal-spacer s-modal-align-' + this.position }, "\u200B"), h("div", { class: 's-modal-body ' + 's-modal-align-' + this.position + ' s-modal-' + this.getWidth() + (this.noPadding ? ' s-modal-nopadding' : ' s-modal-padding') }, h("div", { class: { 's-modal-header': true, 's-modal-is-center': this.centered } }, this.isClosable ?
            h("button", { class: "s-modal-close", onClick: () => this.closeModal("closeButtonClick"), type: "button" }, h("span", { innerHTML: Cancel }))
            : '', this.modalTitle || this.subTitle ?
            h("div", { class: "s-modal-header-inner" }, h("slot", { name: 'icon' }, !!this.iconStyle ?
                h("div", { class: this.iconBlockClasses(), innerHTML: this.iconStyle == 'error' ? AlertEngineIcon : CheckCircle2 })
                : ''), h("div", { class: "s-modal-header-content" }, this.modalTitle ? h("div", { class: { 's-modal-title': true, 's-modal-title-below': this.subTitleFirst }, innerHTML: this.modalTitle }) : '', this.subTitle ? h("p", { class: { 's-modal-sub-title': true }, innerHTML: this.subTitle }) : ''))
            : ''), h("slot", null), h("slot", { name: "footer" })))));
    }
    //move the modal as root dom, because we need the model to be outside the forms
    componentDidLoad() {
        document.body.append(this.host);
    }
    get host() { return this; }
    static get watchers() { return {
        "visible": ["handleVisible"]
    }; }
    static get style() { return sallaModalCss; }
}, [4, "salla-modal", {
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
        "modalTitle": [32],
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
    const components = ["salla-modal", "salla-loading"];
    components.forEach(tagName => { switch (tagName) {
        case "salla-modal":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SallaModal);
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

export { SallaModal as S, defineCustomElement as d };
