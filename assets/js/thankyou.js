import BasePage from './base-page';

class ThankYou extends BasePage {
    onReady() {
        this.initiateForm();
        app.anime('.thanks-item', {translateX: [20, 0]});
        salla.cart.event.clearCartSummary();
    }

    registerEvents() {
        app.onClick('.copy-btn', e => app.copyToClipboard(e.target.dataset.selector));
        app.onClick('#btn-open-order', event => {
            //important for mobile apps
            salla.event.dispatch('mobile::order.placed', {order_id: event.target.dataset.orderId});
            location.href = event.target.dataset.orderUrl;
        });
    }

    initiateForm() {
        let email = document.getElementById('resend_invoice-email');
        //there is form for resend invoice email, so no need for logic, if there is no email input
        if (!email) {
            return;
        }
        let btn = document.getElementById('resend_invoice-submit');

        email.addEventListener('keyup', () => this.isValidEmail(email.value) && email.parentElement.classList.remove('error'));

        //added By data-on-success="onSuccess", data-on-fail="onFail"
        window.onFail = window.onSuccess = () => btn.classList.remove('btn--has-loading');

        //added By data-filter-before-submit="beforeSubmit"
        window.beforeSubmit = (form_data, that, event) => {
            if (!app.isValidEmail(email.value)) {
                email.parentElement.classList.add('error');
                throw 'Not Valid';
            }

            email.parentElement.classList.remove('error');
            btn.classList.add('btn--has-loading');
            btn.setAttribute('disabled', true);
            return form_data;
        };
    }
}

ThankYou.className = 'ThankYou';
ThankYou.allowedPages = ['thank-you'];
ThankYou.intiateWhenReady();