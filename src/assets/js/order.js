import BasePage from './base-page';

class Order extends BasePage {
    onReady() {
        app.onClick('salla-button#btn-reorder', ({currentTarget: btn}) => btn.load()
            .then(() => salla.order.createCartFromOrder())
            .then(() => btn.stop())
            .then(() => app.element('#reorder-modal').hide()));

        app.onClick('salla-button#confirm-cancel', ({currentTarget: btn}) => btn.load()
            .then(() => salla.order.cancel())
            .then(() => btn.stop() && app.element('#modal-order-cancel').hide())
            .then(() => window.location.reload())
            .catch(() => btn.stop() && app.element('#modal-order-cancel').hide())
        );
    }
}

Order.initiateWhenReady(['customer.orders.single']);
