/*!
 * Crafted with ❤ by Salla
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { R as Rate } from './star2.js';
import { d as defineCustomElement$2 } from './salla-progress-bar2.js';
import { d as defineCustomElement$1 } from './salla-rating-stars2.js';

const sallaReviewsSummaryCss = ":host{display:block}";

const SallaReviewsSummary = /*@__PURE__*/ proxyCustomElement(class SallaReviewsSummary extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.canRender = false;
        this.showRatingSummary = false;
        this.recommendationOnly = false;
        this.showRecommendation = false;
    }
    async componentWillLoad() {
        try {
            await salla.onReady();
            this.initializeLanguages();
            this.loadConfig();
            // Only load data if component should be displayed
            if (this.showRatingSummary || this.showRecommendation) {
                await this.loadSummary();
            }
        }
        catch (error) {
            console.error('Failed to initialize reviews summary component:', error);
        }
    }
    async loadConfig() {
        this.showRatingSummary = salla.config.get('store.settings.rating.show_rating_summary');
        this.showRecommendation = salla.config.get('store.settings.rating.show_recommendation');
        this.recommendationOnly = this.showRecommendation && !this.showRatingSummary;
    }
    initializeLanguages() {
        return Salla.lang.onLoaded(() => {
            Salla.lang.addBulk({
                "blocks.comments.based_on": { ar: "بناءً على", en: "Based on" },
                "blocks.comments.recommended": { ar: "أوصوا بالمنتج", en: "Recommended" }
            });
            this.basedOnLabel = salla.lang.get('blocks.comments.based_on');
            this.recommendedLabel = salla.lang.get('blocks.comments.recommended');
        });
    }
    async loadSummary() {
        if (!this.itemId) {
            console.error('Error loading reviews summary: itemId is not defined');
            return this.canRender = false;
        }
        try {
            const response = (await salla.api.request(`rating/summary/${this.itemId}`));
            if (!response?.data || (Array.isArray(response.data.reviews) && !response.data.reviews.length)) {
                this.canRender = false;
                this.data = null;
                return;
            }
            this.data = response.data;
            this.canRender = true;
        }
        catch (error) {
            this.canRender = false;
            this.data = null;
            console.error('Error loading reviews summary:', error);
        }
    }
    renderRecommendation() {
        if (!this.showRecommendation || !this.data?.recommendation) {
            return null;
        }
        const classes = {
            base: 's-reviews-summary-header-section',
            standalone: this.recommendationOnly ? 's-reviews-summary-recommendation-only' : ''
        };
        return (h("div", { class: `${classes.base} ${classes.standalone}`.trim() }, h("h4", { class: "s-reviews-summary-recommendation-percentage" }, "%", this.data?.recommendation), h("p", { class: "s-reviews-summary-count" }, this.recommendedLabel)));
    }
    render() {
        if (!this.canRender)
            return null;
        if (this.recommendationOnly)
            return this.renderRecommendation();
        const ratings = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            ...this.data.reviews
        };
        const reviewElements = Object.keys(ratings).reverse().map((rating) => {
            const percentage = ratings[rating];
            return (h("div", { key: rating, class: "s-reviews-summary-row" }, h("div", { class: "s-reviews-summary-row-rate" }, rating, " ", h("span", { innerHTML: Rate })), h("salla-progress-bar", { class: "s-reviews-summary-progress", value: percentage, target: 100, hideUnits: true, height: '16px' }), h("span", { class: "s-reviews-summary-percentage" }, percentage, "%")));
        });
        return (h(Host, { class: "s-reviews-summary-wrapper" }, h("div", { class: "s-reviews-summary-header" }, h("div", { class: "s-reviews-summary-header-section" }, h("h3", { class: "s-reviews-summary-average" }, this.data.rating), h("div", null, h("salla-rating-stars", { size: 'large', value: this.data.rating }), h("p", { class: "s-reviews-summary-count" }, this.basedOnLabel, " ", salla.helpers.number(salla.lang.choice('pages.rating.reviews', this.data.count))))), this.renderRecommendation()), h("div", { class: "s-reviews-summary-rows" }, reviewElements)));
    }
    static get style() { return sallaReviewsSummaryCss; }
}, [0, "salla-reviews-summary", {
        "itemId": [2, "item-id"],
        "data": [32],
        "canRender": [32],
        "basedOnLabel": [32],
        "recommendedLabel": [32],
        "showRatingSummary": [32],
        "recommendationOnly": [32],
        "showRecommendation": [32]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["salla-reviews-summary", "salla-progress-bar", "salla-rating-stars"];
    components.forEach(tagName => { switch (tagName) {
        case "salla-reviews-summary":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SallaReviewsSummary);
            }
            break;
        case "salla-progress-bar":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "salla-rating-stars":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { SallaReviewsSummary as S, defineCustomElement as d };
