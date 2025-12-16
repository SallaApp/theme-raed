/*!
 * Crafted with ❤ by Salla
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const sallaMetadataCss = "";

const SallaMetadata$1 = /*@__PURE__*/ proxyCustomElement(class SallaMetadata extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
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
    get host() { return this; }
    static get style() { return sallaMetadataCss; }
}, [0, "salla-metadata", {
        "entity": [1],
        "entityId": [8, "entity-id"],
        "specs": [32],
        "download": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["salla-metadata"];
    components.forEach(tagName => { switch (tagName) {
        case "salla-metadata":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SallaMetadata$1);
            }
            break;
    } });
}
defineCustomElement$1();

const SallaMetadata = SallaMetadata$1;
const defineCustomElement = defineCustomElement$1;

export { SallaMetadata, defineCustomElement };
