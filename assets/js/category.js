import BasePage from './basePage';

class Category extends BasePage {
    onReady() {
        salla.infiniteScroll.initiate('.products-container', '.product-entry');
    }

    registerEvents() {
        salla.document.event.onChange('#productFilter', event => this.sortAction(event));
        salla.document.event.onClick('.grid-trigger', event => this.toggleView(event));
    }

    sortAction(event) {
        var regex = new RegExp("([?;&])by[^&;]*[;&]?");
        let url = window.location.href.replace(regex, "$1").replace(/&$/, '');
        url = (url.includes('?') ? url + "&" : "?") + (event.target.value ? "by=" + event.target.value : '');

        window.location.href = url.replace(/&$|\?$/, '');
    }

    sortAction(event) {
        var regex = new RegExp("([?;&])by[^&;]*[;&]?");
        let url = window.location.href.replace(regex, "$1").replace(/&$/, '');
        url = (url.includes('?') ? url + "&" : "?") + (event.target.value ? "by=" + event.target.value : '');

        window.location.href = url.replace(/&$|\?$/, '');
    }

    toggleView(event) {
        event.preventDefault();
        let type = event.target.dataset.type;//list|grid

        this.toggle('.grid-trigger', ['bg-border-color', 'text-primary'], ['text-gray-400'], e => e.dataset.type === type);
        this.toggle('.products-container', ['list', 'md:grid-cols-1'], ['md:grid-cols-auto-fill'], () => type === 'list');

        anime({
            targets   : '.product-entry',
            opacity   : [0, 1],
            duration  : 1200,
            translateY: [20, 0],
            delay     : (el, i) => i * 100,
        });
    }
}

new Category;