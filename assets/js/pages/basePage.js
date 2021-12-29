class BasePage {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => this.boot());
    }

    boot() {
        this.onReady && this.onReady();
        this.registerEvents && this.registerEvents();
    }

    /**
     * @param {string} selector
     * @param {array<string>} classes1
     * @param {array<string>} classes2
     * @param callback
     */
    toggle(selector, classes1, classes2, callback) {
        document.querySelectorAll(selector).forEach(element => {
            let isClasses1 = callback(element);
            element.classList.remove(...(isClasses1 ? classes2 : classes1));
            element.classList.add(...(isClasses1 ? classes1 : classes2));
        });
    }
}

export default BasePage;