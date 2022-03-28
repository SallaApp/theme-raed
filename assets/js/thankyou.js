import BasePage from './base-page';

class ThankYou extends BasePage {
    onReady() {
        app.anime('.thanks-item', {translateX: [20, 0]});
        let form = document.querySelector('#invoice-form');
        salla.order.event.onSent(res =>{
            form.innerHTML = res.message;
            form.classList.add('sent');
        });
    }
}

ThankYou.intiateWhenReady('ThankYou', ['thank-you']);
