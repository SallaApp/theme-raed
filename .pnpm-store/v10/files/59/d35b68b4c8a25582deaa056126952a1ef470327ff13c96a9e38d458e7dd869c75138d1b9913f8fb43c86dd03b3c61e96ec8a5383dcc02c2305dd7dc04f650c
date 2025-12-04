/*!
 * Crafted with ❤ by Salla
 */
import { Host, h } from "@stencil/core";
export class SallaMetadata {
    constructor() {
        /**
         * The entity type.
         */
        this.entity = 'product';
        this.specs = [];
        this.download = salla.lang.get('pages.thank_you.download');
        if (this.entityId) {
            try {
                this.entityId = Array.isArray(this.entityId)
                    ? this.entityId
                    : JSON.parse(this.entityId);
                return;
            }
            catch (e) {
                salla.log('Bad json passed via entityId prop');
            }
        }
    }
    getValue(field) {
        if (field.type === 'file') {
            return `<a href="${field.value}" class="text-primary" target="_blank"><span class="sicon-download"></span> ${this.download}</a>`;
        }
        if (field.type === 'url') {
            return `<a href="${field.value}" class="text-blue-700 underline" target="_blank">${field.value}</a>`; // classes will be moved to the utilities.json file
        }
        if (field.type === 'date') {
            const date = new Date(field.value);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            return formattedDate;
        }
        return field.value;
    }
    async componentWillLoad() {
        await salla.onReady();
        if (!salla.config.get('store.features')?.includes('custom-fields')) {
            return salla.logger.error('feature custom-fields is not activated');
        }
        //todo:: remove `product.showNewUrls` after changing it from BE
        if (!this.entityId && (salla.url.is_page('product.single') || salla.url.is_page("product.showNewUrls"))) {
            this.entityId = salla.config.get('page.id');
        }
        if (!this.entityId) {
            return salla.logger.error("can't render salla-metadata without enity-id prop!");
        }
        await salla.lang.onLoaded();
        this.download = salla.lang.get('pages.thank_you.download');
        const response = await Salla.api.metadata.fetchValues(this.entity, this.entityId);
        this.specs = response.data[0]?.sections;
    }
    render() {
        if (!this.specs.length) {
            return;
        }
        return (h(Host, { class: "s-metadata-wrapper" }, this.specs.map((item) => {
            return (h("div", { class: "s-metadata-box" }, h("div", { class: "s-metadata-box-header" }, h("i", { class: "sicon-list" }), item.name), item.fields.map((field) => {
                return (h("div", { class: "s-metadata-row" }, h("p", { class: "s-metadata-row-name" }, field.name), h("p", { class: "s-metadata-row-value", innerHTML: this.getValue(field) })));
            })));
        })));
    }
    static get is() { return "salla-metadata"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-metadata.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-metadata.css"]
        };
    }
    static get properties() {
        return {
            "entity": {
                "type": "string",
                "attribute": "entity",
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
                    "text": "The entity type."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'product'"
            },
            "entityId": {
                "type": "any",
                "attribute": "entity-id",
                "mutable": false,
                "complexType": {
                    "original": "number | number[] | string",
                    "resolved": "number | number[] | string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The id of the product/the endity to which the specs are going to be fetched for."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "specs": {},
            "download": {}
        };
    }
    static get elementRef() { return "host"; }
}
