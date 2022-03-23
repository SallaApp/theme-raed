import BasePage from './base-page';

class ThankYou extends BasePage {
    onReady() {
        app.anime('.thanks-item', {translateX: [20, 0]});
        salla.order.event.onSent(res => document.querySelector('#invoice-form').innerHTML = res.message);
    }
}

ThankYou.intiateWhenReady('ThankYou', ['thank-you']);
