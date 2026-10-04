import BasePage from './base-page';

class ThankYou extends BasePage {
    onReady() {
        const date = document.querySelector('[data-thankyou-date]');
        if (date) {
            const value = new Date(date.dateTime);
            if (!Number.isNaN(value.getTime())) {
                date.textContent = new Intl.DateTimeFormat(document.documentElement.lang || 'ar', {
                    calendar: 'gregory', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit',
                }).format(value);
            }
        }

        document.querySelector('[data-copy-order]')?.addEventListener('click', async event => {
            try {
                await navigator.clipboard.writeText(event.currentTarget.dataset.copyOrder);
                salla.notify.success(salla.lang.get('common.elements.copied'));
            } catch {
                // Keep the order number selectable when clipboard access is unavailable.
            }
        });

        document.querySelectorAll('.thanks-item').forEach((item, i) => {
            item.style.animationDelay = `${i * 100}ms`;
            item.classList.add('slide-in-start');
        });
    }
}

ThankYou.initiateWhenReady(['thank-you']);
