import BasePage from './base-page';

class ThankYou extends BasePage {
    onReady() {
        document.querySelectorAll('.thanks-item').forEach((item, i) => {
            item.style.animationDelay = `${i * 100}ms`;
            item.classList.add('slide-in-start');
        });
        let form = document.querySelector('#invoice-form');
        salla.order.event.onInvoiceSent(res =>{
            form.innerHTML = res.data.message;
            form.classList.add('sent');
        });
    }
}

ThankYou.initiateWhenReady(['thank-you']);
