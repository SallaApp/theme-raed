/*!
 * Crafted with ❤ by Salla
 */
import { Host, h } from "@stencil/core";
import plusIcon from "../../assets/svg/add.svg";
import minusIcon from "../../assets/svg/minus.svg";
/**
 * @salla/ui-components
 * The `salla-accordion-head` component represents the header of an accordion.
 *
 * Available slots:
 * - `title`: The main title content
 * - `progress`: Progress indicator content
 * - `html`: Raw HTML content (optional)
 * - `note`: Note content displayed at the end
 */
export class SallaAccordionHead {
    constructor() {
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
            } }, h("span", { key: '3b24faf71dcd332663a354310b2ce09f7879eddc', class: "s-accordion-head-wrapper-toggle-icon", innerHTML: this.collapsed ? plusIcon : minusIcon })))))));
    }
    static get is() { return "salla-accordion-head"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-accordion-head.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-accordion-head.css"]
        };
    }
    static get properties() {
        return {
            "collapsible": {
                "type": "boolean",
                "attribute": "collapsible",
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
                    "text": "Should the accordion be collapsible or not."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "collapsed": {
                "type": "boolean",
                "attribute": "collapsed",
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
                    "text": "Current collapsed state"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "true"
            }
        };
    }
    static get events() {
        return [{
                "method": "accordionToggle",
                "name": "accordionToggle",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "event",
                            "text": "accordionToggle"
                        }, {
                            "name": "type",
                            "text": "{Object}"
                        }, {
                            "name": "property",
                            "text": "{Object} detail.payload - The event payload"
                        }, {
                            "name": "property",
                            "text": "{boolean} detail.payload.collapsed - The new collapsed state"
                        }],
                    "text": "Emitted when the accordion head is clicked and the collapsed state changes.\nOnly emitted when the component is collapsible."
                },
                "complexType": {
                    "original": "Object",
                    "resolved": "Object",
                    "references": {
                        "Object": {
                            "location": "global",
                            "id": "global::Object"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "host"; }
}
