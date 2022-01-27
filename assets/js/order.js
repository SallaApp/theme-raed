import BasePage from './base-page';

class Order extends BasePage {
    onReady() {
        this.initiateOrderCancelation();
    }

    initiateOrderCancelation() {
        app.onClick('salla-button#btn-reorder', e => e.target.load()
            .then(sallaBtn => salla.twilight.api.request(sallaBtn.dataset.url, {}, 'get'))
            .then(() => e.target.stop())
            .then(() => app.element('#reorder-modal').hide()));

        app.onClick('#confirm-cancel', e => e.target.load()
            .then(() => salla.order.api.cancel(salla.config.get('page.id')))
            .then(() => e.target.stop() && app.element('#modal-cancel').hide())
            .then(() => window.location.reload())
            .catch(() => e.target.stop() && app.element('#modal-cancel').hide())
        );
    }
}

Order.className = 'Order';
Order.allowedPages = ['customer.orders.single'];
Order.intiateWhenReady();