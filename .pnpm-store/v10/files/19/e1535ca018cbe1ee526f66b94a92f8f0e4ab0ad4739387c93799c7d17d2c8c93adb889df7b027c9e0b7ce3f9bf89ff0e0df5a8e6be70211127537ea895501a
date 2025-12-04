/*!
 * Crafted with ❤ by Salla
 */
import { Host, h } from "@stencil/core";
export class SallaInstallment {
    constructor() {
        this.tabbyBorderRemoved = false;
        this.tabbyRemoveBorderTries = 0;
        /**
         * Language code
         */
        this.language = salla.config.get('user.language_code');
        /**
         * Currency code
         */
        this.currency = salla.config.get('user.currency_code');
        /**
         * Country code
         */
        this.country = salla.config.get('user.country_code');
        this.installment_sheria_text = (key, replacement) => salla.lang.get(key, replacement);
    }
    async componentWillLoad() {
        await salla.onReady();
        await salla.lang.onLoaded();
        this.currency = salla.config.get('user.currency_code') || 'SAR';
        this.language = salla.config.get('user.language_code') || 'ar';
        this.country = salla.config.get('user.country_code') || 'SA';
        const installmentOptions = [
            { key: 'pages.products.installments', installments: 3 },
            { key: 'pages.products.installments_emkan', installments: 5 },
        ];
        installmentOptions.forEach(option => {
            this.installment_sheria_text(option.key, {
                payment: salla.money(parseFloat(this.price)),
                amount: salla.money((parseFloat(this.price) / option.installments).toFixed(2)).replace(/\.00$/, ''),
                installments: option.installments,
            });
        });
        const installment = salla.config.get('store.settings.installments');
        if (installment) {
            this.tamaraIsActive = installment.tamara;
            this.tabbyIsActive = installment.tabby;
            this.spotiiIsActive = installment.spotii;
            this.mispayActive = installment.mispay;
            this.emkanIsActive = installment.emkan;
            this.madfuActive = installment.madfu;
            this.rajehiIsActive = installment.mokafaa_alrajhi;
        }
        salla.event.on('product::price.updated', ({ data }) => {
            if (!data.price || data.price == this.price) {
                return;
            }
            this.price = data.price;
            this.renderInstallments(true);
        });
    }
    componentDidLoad() {
        this.renderInstallments();
    }
    render() {
        const isSAR = this.currency === 'SAR';
        if (!this.isValidPrice(this.price)) {
            return '';
        }
        return (h(Host, null, this.tamaraIsActive &&
            (this.tamaraIsActive?.publicKey ? (
            // Tamara widget v2
            h("div", { class: "mb-5" }, h("tamara-widget", { type: "tamara-summary", "inline-type": "2", amount: this.price }))) : (
            // Tamara widget v1 fallback
            h("div", { class: "tamara-product-widget", "data-price": this.price, "data-currency": this.currency, "data-lang": this.language, "data-payment-type": "installment" }))), this.tabbyIsActive ? (h("div", { id: "tabbyPromoWrapper" }, h("div", { id: "tabbyPromo" }))) : (''), this.spotiiIsActive ? (h("div", { class: "spotii-wrapper" }, h("div", { class: "spotii-promo" }))) : (''), this.shouldShowMispay() &&
            (this.mispayActive.publicKey ? (h("div", { class: "mb-5" }, h("mispay-widget", { amount: this.price, lang: this.language }))) : (h("div", { class: "s-installment-mispay-wrapper" }, h("div", { class: "s-installment-mispay-content" }, h("img", { src: salla.url.cdn('images/payment/png/mispay.png'), alt: "mispay" }), h("span", { class: "s-installment-mispay-content-text", innerHTML: this.installment_sheria_text('pages.products.installments', {
                    payment: salla.money(parseFloat(this.price)),
                    amount: salla.money((parseFloat(this.price) / 4).toFixed(2)),
                    installments: 4,
                }) }))))), this.emkanIsActive && this.currency === "SAR" ? (h("div", { class: "s-installment-emkan-wrapper" }, h("div", { class: "s-installment-emkan-content" }, h("img", { src: salla.url.cdn('images/payment/png/emkan.png'), alt: "emkan" }), h("span", { class: "s-installment-emkan-content-text", innerHTML: this.installment_sheria_text('pages.products.installments_emkan', {
                payment: salla.money(parseFloat(this.price)),
                installments: 5,
            }) })))) : (''), this.madfuActive && this.currency === "SAR" ? (h("div", { class: "s-installment-madfu-wrapper" }, h("div", { class: "s-installment-madfu-content" }, h("img", { src: salla.url.cdn('images/payment/png/madfu.png'), alt: "madfu" }), h("span", { class: "s-installment-madfu-content-text" }, salla.lang.get('pages.products.installments_madfu'))))) : (''), (isSAR && this.rajehiIsActive) ?
            h("div", { class: "s-installment-rajehi-wrapper" }, h("div", { class: "s-installment-rajehi-content" }, h("img", { src: salla.url.cdn('images/payment/png/mokafaa_alrajhi_loyalty.png'), alt: "mokafaa_alrajhi_loyalty" }), h("span", { class: "s-installment-rajehi-content-text" }, salla.lang.get("pages.products.rajahi_earn_points", { points: Math.floor(+this.price * this.rajehiIsActive.pointsPerRiyal) }))))
            : ''));
    }
    renderInstallments(isUpdating = false) {
        if (!this.isValidPrice(this.price)) {
            return;
        }
        // Tamara
        if (this.tamaraIsActive) {
            this.loadTamara({ isUpdating });
        }
        // tabby
        if (this.tabbyIsActive) {
            if (isUpdating) {
                // remove #tabbyPromoWrapper and re append it
                var oldTabbyWrapper = this.host.querySelector('#tabbyPromoWrapper');
                if (oldTabbyWrapper) {
                    oldTabbyWrapper.remove();
                }
                var tabbyPromoWrapper = document.createElement('div');
                tabbyPromoWrapper.setAttribute('id', 'tabbyPromoWrapper');
                var tabbyPromo = document.createElement('div');
                tabbyPromo.setAttribute('id', 'tabbyPromo');
                tabbyPromoWrapper.appendChild(tabbyPromo);
                this.host.appendChild(tabbyPromoWrapper);
                var oldTabbyScript = document.querySelector('script[src="https://checkout.tabby.ai/tabby-promo.js"]');
                if (oldTabbyScript) {
                    oldTabbyScript.remove();
                }
            }
            var tabbyScript = document.createElement('script');
            tabbyScript.setAttribute('src', 'https://checkout.tabby.ai/tabby-promo.js');
            document.head.appendChild(tabbyScript);
            tabbyScript.onload = () => {
                const TabbyPromo = window.TabbyPromo;
                new TabbyPromo({
                    selector: '#tabbyPromo',
                    currency: this.currency,
                    price: this.price,
                    lang: this.language,
                    publicKey: salla.config.get('store.settings.installments.tabby.publicKey'),
                    merchantCode: salla.config.get('store.settings.installments.tabby.merchantCode'),
                });
                document.querySelectorAll('.tabby-promo-snippet__logo').forEach(function (element) {
                    element.setAttribute('aria-label', 'Tabby Logo');
                });
            };
            // this is a workaround to remove the default border and add margin
            this.removeTabbyBorder();
        }
        // Spotii
        if (this.spotiiIsActive) {
            if (isUpdating) {
                var oldSpotiiWrapper = this.host.querySelector('.spotii-wrapper');
                if (oldSpotiiWrapper) {
                    oldSpotiiWrapper.remove();
                }
                var spotiiPromoWrapper = document.createElement('div');
                spotiiPromoWrapper.classList.add('spotii-wrapper');
                var spotiiPromo = document.createElement('div');
                spotiiPromo.classList.add('spotii-promo');
                spotiiPromoWrapper.appendChild(spotiiPromo);
                this.host.appendChild(spotiiPromoWrapper);
                var oldSpotiiScript = document.querySelector('script[src="' + salla.url.cdn('js/price-widget-ar-salla.js') + '"]');
                if (oldSpotiiScript) {
                    oldSpotiiScript.remove();
                }
            }
            let amount = salla.money((Number(this.price) / 3).toFixed(2), false);
            let isRTL = salla.config.get('theme.is_rtl', true);
            window.spotiiConfig = {
                targetXPath: ['.spotii-wrapper'],
                renderToPath: ['.spotii-promo'],
                numberOfPayment: 3,
                currency: this.currency,
                templateLine: '${textOne} ${number} ${textTwo} ' + amount + '${logo} ${info}',
                //todo:: translate these
                textOne: isRTL ? 'جزء الدفع على' : 'Split it into',
                textTwo: isRTL ? 'أقساط متساوية بدون تكاليف اضافية بقيمة' : 'payments of',
                textThree: 'مع',
                price: this.price,
                // forcedShow: false,
                // merchantID: null,
            };
            var spotiiScript = document.createElement('script');
            spotiiScript.setAttribute('src', salla.url.cdn('js/price-widget-ar-salla.js'));
            document.head.appendChild(spotiiScript);
            // spotiiScript.onload = () => {
            //   // setTimeout()
            // }
        }
        // Mispay
        if (this.shouldShowMispay() && this.mispayActive.publicKey) {
            this.loadExternalScript({
                position: 'head',
                src: `https://widget.mispay.co/v1/sdk.js?authorize=${this.mispayActive.publicKey}`,
            });
        }
    }
    isValidPrice(price) {
        const pricePattern = /^\d+(\.\d{1,2})?$/;
        const isValid = pricePattern.test(price);
        const isGreaterThanZero = parseFloat(price) > 0;
        return isValid && isGreaterThanZero;
    }
    loadExternalScript({ src, onLoad, position, }) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = onLoad;
        document[position].appendChild(script);
    }
    loadTamara({ isUpdating }) {
        const isV2Enabled = !!this.tamaraIsActive?.publicKey;
        if (isUpdating) {
            setTimeout(() => {
                if (isV2Enabled) {
                    return window.TamaraWidgetV2?.refresh();
                }
                // v1 fallback widget refresh
                window.TamaraProductWidget?.render();
            }, 300);
        }
        else {
            if (isV2Enabled) {
                const language_code = salla.config.get('user.language_code');
                const lang = ['ar', 'en'].includes(language_code) ? language_code : 'ar';
                // this used in case user change the currency to get the country code
                const countryCodeByCurrency = this.currency?.slice(0, -1);
                const country = ['SA', 'AE', 'KW', 'BH', 'OM', 'QA'].includes(countryCodeByCurrency)
                    ? countryCodeByCurrency
                    : null;
                if (!country) {
                    console.error('Tamara: Country code is not supported', countryCodeByCurrency);
                }
                else {
                    window.tamaraWidgetConfig = {
                        lang,
                        country,
                        publicKey: this.tamaraIsActive.publicKey,
                        style: {
                            fontSize: '14px',
                        },
                    };
                    this.loadExternalScript({
                        position: 'head',
                        src: 'https://cdn.tamara.co/widget-v2/tamara-widget.js',
                    });
                }
            }
            else {
                // v1 fallback widget
                this.loadExternalScript({
                    position: 'head',
                    src: 'https://cdn.tamara.co/widget/product-widget.min.js',
                    onLoad: () => {
                        window.TamaraProductWidget.init({ lang: this.language });
                        setTimeout(() => {
                            window.TamaraProductWidget.render();
                        }, 300);
                    },
                });
            }
        }
    }
    shouldShowMispay() {
        return this.currency === 'SAR' && this.mispayActive;
    }
    /**
     * this is workaround to remove the default border and add margin
     * we will try to remove tabby border 5 times for 7.5 seconds
     */
    removeTabbyBorder() {
        if (this.tabbyBorderRemoved || this.tabbyRemoveBorderTries > 5) {
            return;
        }
        this.tabbyRemoveBorderTries++;
        setTimeout(() => {
            let promo = document.querySelector('#tabbyPromo>div>div');
            promo = promo && promo.shadowRoot
                ? promo.shadowRoot.querySelector('div[class^="styles__tabby-promo-snippet--"]')
                : null;
            if (promo) {
                promo.style = 'border: none; margin: 15px 0!important;';
                this.tabbyBorderRemoved = true;
            }
            else {
                this.removeTabbyBorder();
            }
        }, this.tabbyRemoveBorderTries * 500);
    }
    static get is() { return "salla-installment"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-installment.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-installment.css"]
        };
    }
    static get properties() {
        return {
            "price": {
                "type": "string",
                "attribute": "price",
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
                    "text": "Current product price"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "language": {
                "type": "string",
                "attribute": "language",
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
                    "text": "Language code"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "salla.config.get('user.language_code')"
            },
            "currency": {
                "type": "string",
                "attribute": "currency",
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
                    "text": "Currency code"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "salla.config.get('user.currency_code')"
            },
            "country": {
                "type": "string",
                "attribute": "country",
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
                    "text": "Country code"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "salla.config.get('user.country_code')"
            }
        };
    }
    static get states() {
        return {
            "tabbyIsActive": {},
            "spotiiIsActive": {},
            "tamaraIsActive": {},
            "mispayActive": {},
            "emkanIsActive": {},
            "madfuActive": {},
            "rajehiIsActive": {},
            "installment_sheria_text": {}
        };
    }
    static get elementRef() { return "host"; }
}
