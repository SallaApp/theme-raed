import BasePage from './base-page';

class ThankYou extends BasePage {
    onReady() {
        app.anime('.thanks-item', {translateX: [20, 0]});
    }
}

ThankYou.intiateWhenReady('ThankYou', ['thank-you']);
