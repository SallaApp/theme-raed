/*!
 * Crafted with ❤ by Salla
 */
import { h, Host } from "@stencil/core";
import CancelIcon from "../../assets/svg/cancel.svg";
import AlertEngineIcon from "../../assets/svg/alert-engine.svg";
import CheckCircleIcon from "../../assets/svg/check-circle2.svg";
import Helper from "../../Helpers/Helper";
/**
 * @slot footer - The footer of modal
 */
export class SallaModal {
    constructor() {
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
            h("button", { class: "s-modal-close", onClick: () => this.closeModal("closeButtonClick"), type: "button" }, h("span", { innerHTML: CancelIcon }))
            : '', this.modalTitle || this.subTitle ?
            h("div", { class: "s-modal-header-inner" }, h("slot", { name: 'icon' }, !!this.iconStyle ?
                h("div", { class: this.iconBlockClasses(), innerHTML: this.iconStyle == 'error' ? AlertEngineIcon : CheckCircleIcon })
                : ''), h("div", { class: "s-modal-header-content" }, this.modalTitle ? h("div", { class: { 's-modal-title': true, 's-modal-title-below': this.subTitleFirst }, innerHTML: this.modalTitle }) : '', this.subTitle ? h("p", { class: { 's-modal-sub-title': true }, innerHTML: this.subTitle }) : ''))
            : ''), h("slot", null), h("slot", { name: "footer" })))));
    }
    //move the modal as root dom, because we need the model to be outside the forms
    componentDidLoad() {
        document.body.append(this.host);
    }
    static get is() { return "salla-modal"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-modal.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-modal.css"]
        };
    }
    static get properties() {
        return {
            "isClosable": {
                "type": "boolean",
                "attribute": "is-closable",
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
                    "text": "Sets the modal to be closable. Defaults to `true`"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "width": {
                "type": "string",
                "attribute": "width",
                "mutable": false,
                "complexType": {
                    "original": "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
                    "resolved": "\"full\" | \"lg\" | \"md\" | \"sm\" | \"xl\" | \"xs\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The size of the modal"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'md'"
            },
            "position": {
                "type": "string",
                "attribute": "position",
                "mutable": false,
                "complexType": {
                    "original": "'top' | 'middle' | 'bottom'",
                    "resolved": "\"bottom\" | \"middle\" | \"top\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The position of the modal"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'middle'"
            },
            "visible": {
                "type": "boolean",
                "attribute": "visible",
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
                    "text": "open the modal on rendering"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "hasSkeleton": {
                "type": "boolean",
                "attribute": "has-skeleton",
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
                    "text": "open the modal on rendering"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "isLoading": {
                "type": "boolean",
                "attribute": "is-loading",
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
                    "text": "Show loading in the middle"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "subTitleFirst": {
                "type": "boolean",
                "attribute": "sub-title-first",
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
                    "text": "Show subtitle before the title or not, defaults to `false` (after the title)"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "noPadding": {
                "type": "boolean",
                "attribute": "no-padding",
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
                    "text": "Avoid padding in the modal body or not, defaults to `false`"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "subTitle": {
                "type": "string",
                "attribute": "sub-title",
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
                    "text": "Set modal sub title."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
            "centered": {
                "type": "boolean",
                "attribute": "centered",
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
                    "text": "Align modal content to center, defaults to `false`"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "iconStyle": {
                "type": "string",
                "attribute": "icon-style",
                "mutable": false,
                "complexType": {
                    "original": "'error' | 'success' | 'primary' | 'normal'",
                    "resolved": "\"error\" | \"normal\" | \"primary\" | \"success\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Set the style of the header icon."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "undefined"
            }
        };
    }
    static get states() {
        return {
            "modalTitle": {}
        };
    }
    static get events() {
        return [{
                "method": "modalVisibilityChanged",
                "name": "modalVisibilityChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when the modal visibilty is changed."
                },
                "complexType": {
                    "original": "Boolean",
                    "resolved": "Boolean",
                    "references": {
                        "Boolean": {
                            "location": "global",
                            "id": "global::Boolean"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "open": {
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
                    "text": "Open the modal",
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
                    "text": "close the modal",
                    "tags": []
                }
            },
            "setTitle": {
                "complexType": {
                    "signature": "(modalTitle: any) => Promise<HTMLElement>",
                    "parameters": [{
                            "name": "modalTitle",
                            "type": "any",
                            "docs": ""
                        }],
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
                    "text": "Change the Modal Title",
                    "tags": [{
                            "name": "param",
                            "text": "modalTitle"
                        }]
                }
            },
            "loading": {
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
                    "text": "Start loading",
                    "tags": []
                }
            },
            "stopLoading": {
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
                    "text": "Stop the loading",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "host"; }
    static get watchers() {
        return [{
                "propName": "visible",
                "methodName": "handleVisible"
            }];
    }
    static get listeners() {
        return [{
                "name": "keyup",
                "method": "handleKeyUp",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
