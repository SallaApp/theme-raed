import BasePage from './base-page';

class ThankYou extends BasePage {
    onReady() {
        document.querySelectorAll('.thanks-item').forEach((item, i) => {
            item.style.animationDelay = `${i * 100}ms`;
            item.classList.add('slide-in-start');
        });
    }
}

ThankYou.initiateWhenReady(['thank-you']);
