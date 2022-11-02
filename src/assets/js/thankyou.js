import BasePage from './base-page';

class ThankYou extends BasePage {
    onReady() {
        app.anime('.thanks-item', {translateX: [20, 0]});
        let form = document.querySelector('#invoice-form');
        salla.order.event.onInvoiceSent(res =>{
            form.innerHTML = res.data.message;
            form.classList.add('sent');
        });
    }
}

ThankYou.initiateWhenReady(['thank-you']);
