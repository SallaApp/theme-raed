import BasePage from './basePage';

class Brand extends BasePage {
    onReady() {
        this.initiateForm();
        this.anime('.thanks-item', {translateX: [20, 0]});
        salla.cart.event.clearCartSummary();
    }

    registerEvents() {
        salla.document.event.onClick('.copy-btn', ({target: {dataset: {selector}}}) => this.copyToClipboard(selector));
        salla.document.event.onClick('#btn-open-order', this.btnActionOpenOrder);
    }

    initiateForm() {
        let email = document.getElementById('resend_invoice-email');
        //there is form for resend invoice email, so no need for logic, if there is no email input
        if (!email) {
            return;
        }
        let btn = document.getElementById('resend_invoice-submit');

        email.addEventListener('keyup', () => this.isValidEmail(email.value) && email.parentElement.classList.remove('error'));

        //added By data-filter-before-submit="beforeSubmit"
        window.beforeSubmit = this.verifyBeforeSubmit(email, btn);

        //added By data-on-success="onSuccess", data-on-fail="onFail"
        window.onFail = window.onSuccess = () => btn.classList.remove('btn--has-loading');
    }

    verifyBeforeSubmit(email, btn) {
        let thisClass = this;
        return function (form_data, that, event) {
            if (!thisClass.isValidEmail(email.value)) {
                email.parentElement.classList.add('error');
                throw 'Not Valid';
            }

            email && email.parentElement.classList.remove('error');
            btn.classList.add('btn--has-loading');
            btn.setAttribute('disabled', true);
            return form_data;
        };
    }

    btnActionOpenOrder(event) {
        //important for mobile apps
        salla.event.dispatch('mobile::order.placed', {order_id: event.target.dataset.orderId});
        location.href = event.target.dataset.orderUrl;
    }
}

new Brand;