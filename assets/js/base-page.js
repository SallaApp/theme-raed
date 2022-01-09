class BasePage {
    constructor() {
        window.page = this;
        document.addEventListener('DOMContentLoaded', () => this.loadApp().then(() => this.onReady() || this.registerEvents() || app.log('Page Class Loaded🎉')));
    }

    loadApp() {
        let tries = 0, inerval;
        //check if theme app is initiated each 0.1 sec for one sec otherwise don't load current page class
        return new Promise((resolve, reject) =>
            inerval = setInterval(function () {
                if (window.app && window.app.isThemeApp) {
                    app.log('Loading Page Class...');
                    resolve(true);
                    clearInterval(inerval);
                }
                if (tries > 10) {
                    reject('Failed to Find `window.app`😢');
                    clearInterval(inerval);
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