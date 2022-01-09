import AlpineJS from 'alpinejs';
import BasePage from './base-page';

class Brands extends BasePage {
    onReady() {
        AlpineJS.start();
    }
}

new Brands;

class Single extends BasePage {
    onReady() {
        salla.document.event.onClick('.grid-trigger', event => {
            event.preventDefault();
            let type = event.target.dataset.type;//list|grid

            this.toggle('.grid-trigger', ['bg-border-color', 'text-primary'], ['text-gray-400'], e => e.dataset.type === type);
            this.toggle('.products-container', ['list', 'md:grid-cols-1'], ['md:grid-cols-auto-fill'], () => type === 'list');
            app.anime('.product-entry', {duration: 1200, translateY: [20, 0]});
        });
    }
}

new Single;