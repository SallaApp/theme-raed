import BasePage from '../basePage';

class Notifications extends BasePage {
    onReady() {
        this.initiateLoadingMore();
    }

    initiateLoadingMore() {
        salla.infiniteScroll.initiate('.notification-container', '.notification-item', {
            history        : false,
            scrollThreshold: false
        });
    }
}

new Notifications;