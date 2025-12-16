/*!
 * Crafted with ❤ by Salla
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const sallaOrderTotalsCardCss = ":host{display:block}";

const SallaOrderTotalsCard$1 = /*@__PURE__*/ proxyCustomElement(class SallaOrderTotalsCard extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
    }
    handleOrderChange(newValue) {
        if (newValue) {
            this.setSummaryFromProp(newValue);
        }
        else {
            this.summary = undefined;
        }
    }
    async componentWillLoad() {
        await Salla.onReady();
        if (this.order) {
            this.setSummaryFromProp(this.order);
        }
    }
    setSummaryFromProp(value) {
        try {
            const parsedValue = typeof value === 'string' ? JSON.parse(value) : value;
            this.summary = parsedValue;
        }
        catch (error) {
            salla.logger.error('Failed to parse order summary data', error);
            this.summary = undefined;
        }
    }
    renderTotalRow(label, amount, labelClass, valueClass, isBold) {
        return (h("div", { class: "s-order-totals-card-row" }, h("div", { class: "s-order-totals-card-row-inner" }, h("dt", { class: labelClass || 's-order-totals-card-label' }, label), h("dd", { class: valueClass || 's-order-totals-card-value' }, isBold ? (h("b", { innerHTML: salla.money(amount) })) : (h("span", { innerHTML: salla.money(amount) }))))));
    }
    renderDiscountRow() {
        return this.summary?.discounts?.map(discount => (h("div", { class: "s-order-totals-card-row", key: discount.name }, h("div", { class: "s-order-totals-card-row-inner" }, h("dt", { class: "s-order-totals-card-discount" }, discount.name), h("dd", { class: "s-order-totals-card-value" }, discount.discount)))));
    }
    renderRefundRow(amount) {
        return (h("div", { class: "s-order-totals-card-row" }, h("div", { class: "s-order-totals-card-row-inner" }, h("dt", { class: "s-order-totals-card-refund-label" }, h("span", { class: "s-order-totals-card-refund-icon" }, h("i", { class: "sicon-info" })), h("span", null, " ", salla.lang.get('pages.orders.refund_amount'))), h("dd", { class: "s-order-totals-card-refund-value" }, h("b", { innerHTML: salla.money(amount) })))));
    }
    render() {
        if (!this.summary) {
            return h(Host, { class: "s-order-totals-card-wrapper" });
        }
        const { summary } = this;
        const hasOptions = Array.isArray(summary.options) ? summary.options.length > 0 : false;
        return (h(Host, { class: "s-order-totals-card-wrapper" }, h("div", { class: "s-order-totals-card-panel" }, h("h2", { id: "summary-heading", class: "s-order-totals-card-heading" }, salla.lang.get('pages.orders.summary')), h("div", { class: "s-order-totals-card-flow" }, h("dl", { class: "s-order-totals-card-list" }, this.renderTotalRow(salla.lang.get('pages.cart.items_total'), summary.sub_total), hasOptions &&
            this.renderTotalRow(salla.lang.get('pages.cart.order_options_total'), summary.options_total), summary.discounts && this.renderDiscountRow(), summary.cod_cost &&
            this.renderTotalRow(salla.lang.get('pages.orders.cod_cost'), summary.cod_cost, ''), summary.shipping_cost &&
            this.renderTotalRow(salla.lang.get('pages.orders.shipping_cost'), summary.shipping_cost, 's-order-totals-card-shipping'), summary.tax &&
            this.renderTotalRow(`${salla.lang.get('pages.cart.tax')} ${summary.tax.percent}%`, summary.tax.amount, ''), summary.paid_amount
            ? this.renderTotalRow(salla.lang.get('pages.orders.partially_paid'), summary.paid_amount, '')
            : null, summary.remaining_amount
            ? this.renderTotalRow(salla.lang.get('pages.orders.remaining_amount'), summary.remaining_amount, '')
            : null, h("div", { class: "s-order-totals-card-total" }, this.renderTotalRow(salla.lang.get('pages.orders.final_total'), summary.total, 's-order-totals-card-total-label', 's-order-totals-card-total-value', true)), summary.refund_amount ? (h("div", { class: "s-order-totals-card-refund" }, this.renderRefundRow(summary.refund_amount))) : null)))));
    }
    static get watchers() { return {
        "order": ["handleOrderChange"]
    }; }
    static get style() { return sallaOrderTotalsCardCss; }
}, [0, "salla-order-totals-card", {
        "order": [1],
        "summary": [32]
    }, undefined, {
        "order": ["handleOrderChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["salla-order-totals-card"];
    components.forEach(tagName => { switch (tagName) {
        case "salla-order-totals-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SallaOrderTotalsCard$1);
            }
            break;
    } });
}
defineCustomElement$1();

const SallaOrderTotalsCard = SallaOrderTotalsCard$1;
const defineCustomElement = defineCustomElement$1;

export { SallaOrderTotalsCard, defineCustomElement };
