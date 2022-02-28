import BasePage from './base-page';

class Order extends BasePage {
    onReady() {
        this.initiateOrderCancelation();
    }

    initiateOrderCancelation() {
        app.onClick('.copy-btn', e => app.copyLinkToClipboard(e.target.dataset.selector));

        app.onClick('salla-button#btn-reorder', ({currentTarget: btn}) => btn.load()
            .then(sallaBtn => salla.twilight.api.request(sallaBtn.dataset.url, {}, 'get'))
            .then(() => btn.stop())
            .then(() => app.element('#reorder-modal').hide()));

        app.onClick('salla-button#confirm-cancel', ({currentTarget: btn}) => btn.load()
            .then(() => salla.order.api.cancel(salla.config.get('page.id')))
            .then(() => btn.stop() && app.element('#modal-cancel').hide())
            .then(() => window.location.reload())
            .catch(() => btn.stop() && app.element('#modal-cancel').hide())
        );
    }
}

Order.className = 'Order';
Order.allowedPages = ['customer.orders.single'];
Order.intiateWhenReady();