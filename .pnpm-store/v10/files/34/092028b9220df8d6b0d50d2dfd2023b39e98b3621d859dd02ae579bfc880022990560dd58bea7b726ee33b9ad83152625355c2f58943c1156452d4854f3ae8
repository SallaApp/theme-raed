/*!
 * Crafted with ❤ by Salla
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const sallaTrustBadgesCss = "";

const SallaTrustBadges$1 = /*@__PURE__*/ proxyCustomElement(class SallaTrustBadges extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        /**
         * For dark footers, show white version of icons.
         */
        this.dark = false;
        this.commercialRegisterLabel = '';
        this.freelanceLabel = '';
    }
    componentWillLoad() {
        this.initializeTranslations();
    }
    initializeTranslations() {
        salla.lang.onLoaded(() => {
            // Set translations synchronously
            const setTranslation = (lang, key, value) => {
                salla.helpers.setNested(salla.lang.messages[lang], key, value);
            };
            // Add missing translations
            setTranslation('ar.trans', 'blocks.footer.commercial_register', 'السجل التجاري');
            setTranslation('en.trans', 'blocks.footer.commercial_register', 'Commercial Register');
            setTranslation('ar.trans', 'blocks.footer.freelance', 'وثيقة العمل الحر');
            setTranslation('en.trans', 'blocks.footer.freelance', 'Freelance Certificate');
            // Update state with translations
            this.commercialRegisterLabel = salla.lang.getWithDefault('blocks.footer.commercial_register', 'السجل التجاري');
            this.freelanceLabel = salla.lang.getWithDefault('blocks.footer.freelance', 'وثيقة العمل الحر');
        });
    }
    getBadgeData() {
        const CRNumber = salla.config.get('store.settings.commercial_number');
        const FLNumber = salla.config.get('store.settings.freelance_number');
        // Prioritize Commercial Register over Freelance
        if (CRNumber) {
            return {
                number: CRNumber,
                label: this.commercialRegisterLabel || 'السجل التجاري',
                imageUrl: salla.url.cdn('images/commercial-register.png', 70, 70),
                type: 'commercial',
            };
        }
        if (FLNumber) {
            return {
                number: FLNumber,
                label: this.freelanceLabel || 'وثيقة العمل الحر',
                imageUrl: this.dark
                    ? salla.url.cdn('images/freelance-white.png')
                    : salla.url.cdn('images/freelance.png'),
                type: 'freelance',
            };
        }
        return null;
    }
    render() {
        const badgeData = this.getBadgeData();
        if (!badgeData) {
            return null;
        }
        return (h(Host, { class: `s-trust-badges-wrapper ${this.dark ? 'dark' : ''}` }, h("img", { class: "s-trust-badges-image", width: "55", height: "55", src: badgeData.imageUrl, alt: badgeData.label }), h("div", { class: "s-trust-badges-content" }, h("p", { class: "s-trust-badges-label" }, badgeData.label), h("b", { class: "s-trust-badges-number" }, badgeData.number))));
    }
    static get style() { return sallaTrustBadgesCss; }
}, [0, "salla-trust-badges", {
        "dark": [4],
        "commercialRegisterLabel": [32],
        "freelanceLabel": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["salla-trust-badges"];
    components.forEach(tagName => { switch (tagName) {
        case "salla-trust-badges":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SallaTrustBadges$1);
            }
            break;
    } });
}
defineCustomElement$1();

const SallaTrustBadges = SallaTrustBadges$1;
const defineCustomElement = defineCustomElement$1;

export { SallaTrustBadges, defineCustomElement };
