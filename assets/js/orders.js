import BasePage from './basePage';

class Orders extends BasePage {
    onReady() {
        this.initiateLoadingMore();
    }

    initiateLoadingMore() {
        salla.infiniteScroll.initiate('.orders-container', '.order-row', {
            history        : false,
            scrollThreshold: false
        });
    }
}

new Orders;