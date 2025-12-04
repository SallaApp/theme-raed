/*!
 * Crafted with ❤ by Salla
 */
import { Host, h } from "@stencil/core";
/**
 * @slot icon - An icon to display before the title.
 * @slot title - The primary content of the list tile.
 * @slot subtitle - Additional content displayed below the title.
 * @slot action - An element to display after the title.
 */
export class SallaListTile {
    constructor() {
        /**
         * Designates the component as anchor and applies the `href` attribute.
         */
        this.href = undefined;
        /**
         * Designates the target attribute. This should only be applied when using the `href` prop.
         */
        this.target = "_self";
    }
    generateClass() {
        return {
            "s-list-tile-item": true,
            "s-list-tile-item-href": !!this.href
        };
    }
    render() {
        return (h(Host, { key: 'b1b2a6bf65c40643d59f392e91cc76acaea5e89e' }, h("a", { key: '4b2026fd739b243a41bfc37fcb55bc07a1a54636', class: this.generateClass(), href: this.href || "#", target: this.target, "aria-label": "List Tile Link" }, h("div", { key: 'bbc7a7133da0e471ad92a5466e9ec0481d74cdd7', class: "s-list-tile-item-icon" }, h("slot", { key: 'e4e338854bfc7e6843c4b87f419c9aa59970c77b', name: 'icon' })), h("div", { key: '1b7b2e0a65193be521cdf6cccc314c83f853216d', class: "s-list-tile-item-content" }, h("div", { key: '4e6a178d219827b1feef394ea5564769bf11ded2', class: "s-list-tile-item-title" }, h("slot", { key: '75b036812aca3e00162fc8c40459b67d4db2cc6f', name: 'title' })), h("div", { key: 'ab0959a43214ae0eb4cf092ea3738c71ed987709', class: "s-list-tile-item-subtitle" }, h("slot", { key: 'e13f66fb2a0e1c5ab2a9081c808973c9f9ecca45', name: "subtitle" }))), h("div", { key: '78c7542367a41a1f8bc74bca73d2581f5c0b7bfd', class: "s-list-tile-item-action" }, h("slot", { key: '14c8c0f31d29855d743b52f82d52a3bed300b25f', name: 'action' })))));
    }
    static get is() { return "salla-list-tile"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-list-tile.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-list-tile.css"]
        };
    }
    static get properties() {
        return {
            "href": {
                "type": "string",
                "attribute": "href",
                "mutable": false,
                "complexType": {
                    "original": "string | undefined",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Designates the component as anchor and applies the `href` attribute."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "undefined"
            },
            "target": {
                "type": "string",
                "attribute": "target",
                "mutable": false,
                "complexType": {
                    "original": "\"_blank\" | \"_self\" | \"_parent\" | \"_top\" | \"framename\"",
                    "resolved": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\" | \"framename\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Designates the target attribute. This should only be applied when using the `href` prop."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "\"_self\""
            }
        };
    }
}
