class BasePage {
    constructor() {
        window.page = this;
        document.addEventListener('DOMContentLoaded', () => this.loadApp().then(() => this.onReady() || this.registerEvents()));
    }

    loadApp() {
        let tries = 0;
        //check if theme app is initiated each 0.1 sec for one sec otherwise don't load current page class
        return new Promise((resolve, reject) =>
            setInterval(function () {
                if (window.app && window.app.isThemeApp) {
                    resolve(true);
                    clearInterval(this);
                }
                if (tries > 10) {
                    reject('Failed to Find `window.app`😢');
                    clearInterval(this);
                }
                tries++;
            }, 100)
        );
    }

    /**
     * For Overriding
     */
    onReady() {
    }

    /**
     * For Overriding
     */
    registerEvents() {
    }
}

export default BasePage;