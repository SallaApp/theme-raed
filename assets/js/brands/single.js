import BasePage from '../basePage';

class Single extends BasePage {
    onReady() {
        salla.infiniteScroll.initiate('.products-container', '.product-entry');
    }

    registerEvents() {
        salla.document.event.onClick('.grid-trigger', event => this.toggleView(event));
    }

    toggleView(event) {
        event.preventDefault();
        let type = event.target.dataset.type;//list|grid

        this.toggle('.grid-trigger', ['bg-border-color', 'text-primary'], ['text-gray-400'], e => e.dataset.type === type);
        this.toggle('.products-container', ['list', 'md:grid-cols-1'], ['md:grid-cols-auto-fill'], () => type === 'list');
        this.anime('.product-entry', {duration: 1200, translateY: [20, 0]});
    }
}

new Single;