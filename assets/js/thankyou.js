import BasePage from './base-page';

class ThankYou extends BasePage {
    onReady() {
        //added By data-on-success="onSuccess", data-on-fail="onFail"
        window.onFail = window.onSuccess = () => document.getElementById('resend-invoice-submit').classList.remove('btn--has-loading');
        app.anime('.thanks-item', {translateX: [20, 0]});
        app.onClick('.btn--copy', event => app.copyLinkToClipboard(event.target.id));
    }
}

ThankYou.intiateWhenReady('ThankYou', ['thank-you']);