import BasePage from './base-page';

class Order extends BasePage {
    onReady() {
        app.onClick('salla-button#btn-reorder', ({currentTarget: btn}) => btn.load()
            // todo :: move it to salla.order.reorder(btn.dataset.order)
            .then(sallaBtn => salla.twilight.request(sallaBtn.dataset.url, {}, 'get'))
            .then(() => btn.stop())
            .then(() => app.element('#reorder-modal').hide()));

        app.onClick('salla-button#confirm-cancel', ({currentTarget: btn}) => btn.load()
            .then(() => salla.order.cancel(btn.dataset.order))
            .then(() => btn.stop() && app.element('#modal-order-cancel').hide())
            .then(() => window.location.reload())
            .catch(() => btn.stop() && app.element('#modal-order-cancel').hide())
        );
    }
}

Order.intiateWhenReady('Order',['customer.orders.single']);
