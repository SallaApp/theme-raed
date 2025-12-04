/*!
 * Crafted with ❤ by Salla
 */
import { h, Host } from "@stencil/core";
import CancelIcon from "../../assets/svg/cancel.svg";
import AlertEngineIcon from "../../assets/svg/alert-engine.svg";
import CheckCircleIcon from "../../assets/svg/check-circle2.svg";
import Helper from "../../Helpers/Helper";
/**
 * @slot footer - The footer of drawer
 */
export class SallaDrawer {
    constructor() {
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
            h("button", { class: "s-drawer-close", onClick: () => this.closeDrawer("closeButtonClick"), type: "button" }, h("span", { innerHTML: CancelIcon }))
            : '', this.drawerTitle || this.subTitle ?
            h("div", { class: "s-drawer-header-inner" }, h("slot", { name: 'icon' }, !!this.iconStyle ?
                h("div", { class: this.iconBlockClasses(), innerHTML: this.iconStyle == 'error' ? AlertEngineIcon : CheckCircleIcon })
                : ''), h("div", { class: "s-drawer-header-content" }, this.drawerTitle ? h("div", { class: { 's-drawer-title': true, 's-drawer-title-below': this.subTitleFirst }, innerHTML: this.drawerTitle }) : '', this.subTitle ? h("p", { class: { 's-drawer-sub-title': true }, innerHTML: this.subTitle }) : ''))
            : ''), h("slot", null), h("slot", { name: "footer" })))));
    }
    //move the drawer as root dom, because we need the drawer to be outside the forms
    componentDidLoad() {
        document.body.append(this.host);
    }
    static get is() { return "salla-drawer"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-drawer.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-drawer.css"]
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
                    "text": "Sets the drawer to be closable. Defaults to `true`"
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
                    "text": "The width of the drawer"
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
                    "original": "'left' | 'right'",
                    "resolved": "\"left\" | \"right\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The position of the drawer (left or right)"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'right'"
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
                    "text": "open the drawer on rendering"
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
                    "text": "open the drawer on rendering"
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
                    "text": "Avoid padding in the drawer body or not, defaults to `false`"
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
                    "text": "Set drawer sub title."
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
                    "text": "Align drawer content to center, defaults to `false`"
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
            "drawerTitle": {}
        };
    }
    static get events() {
        return [{
                "method": "drawerVisibilityChanged",
                "name": "drawerVisibilityChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when the drawer visibilty is changed."
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
                    "text": "Open the drawer",
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
                    "text": "close the drawer",
                    "tags": []
                }
            },
            "setTitle": {
                "complexType": {
                    "signature": "(drawerTitle: any) => Promise<HTMLElement>",
                    "parameters": [{
                            "name": "drawerTitle",
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
                    "text": "Change the Drawer Title",
                    "tags": [{
                            "name": "param",
                            "text": "drawerTitle"
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
