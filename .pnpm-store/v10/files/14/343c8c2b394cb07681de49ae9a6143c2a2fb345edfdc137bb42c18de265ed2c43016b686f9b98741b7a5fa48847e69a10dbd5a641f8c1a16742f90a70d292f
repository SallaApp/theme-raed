/*!
 * Crafted with ❤ by Salla
 */
import { Host, h } from "@stencil/core";
export class SallaTrustBadges {
    constructor() {
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
    static get is() { return "salla-trust-badges"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-trust-badges.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-trust-badges.css"]
        };
    }
    static get properties() {
        return {
            "dark": {
                "type": "boolean",
                "attribute": "dark",
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
                    "text": "For dark footers, show white version of icons."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "commercialRegisterLabel": {},
            "freelanceLabel": {}
        };
    }
}
