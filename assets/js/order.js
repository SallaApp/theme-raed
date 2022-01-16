import BasePage from './base-page';

class Order extends BasePage {
    onReady() {
        this.initiateOrderCancelation();
    }

    initiateOrderCancelation() {
        app.onClick('#confirm-cancel', () => salla.order.api.cancel(app.pageData('id'))
            .then(() => window.location.reload())
            .catch(() => app.toggleModal('#modal-cancel', false))
        );
    }
}

Order.className = 'Order';
Order.allowedPages = ['store.my_order'];
Order.intiateWhenReady();