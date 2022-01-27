class BasePage {
    constructor() {
        //
    }

    onReady() {
        //
    }

    registerEvents() {
        //
    }
}

BasePage.allowedPages = [];//override it on the class;
BasePage.className = 'BasePage';//override it on the class;

/**
 * Because we merged multi classes into one file, there is no need to initiate all of them
 */
BasePage.intiateWhenReady = function () {
    document.addEventListener('DOMContentLoaded', () => {
        let tries = 0, inerval;
        //check if theme app is initiated each 0.1 sec for one sec otherwise don't load current page class
        (new Promise((resolve, reject) =>
            inerval = setInterval(function () {
                if (window.app && window.app.isThemeApp) {
                    resolve(true);
                    clearInterval(inerval);
                }
                if (tries > 10) {
                    reject('Failed to Find `window.app`😢');
                    clearInterval(inerval);
                }
                tries++;
            }, 100)
        )).then(() => {
            if (!this.allowedPages.includes(salla.config.get('page.slug'))) {
                app.log(this.className + ' Skiped.');
                return;
            }
            window.pageClass = new this;
            pageClass.onReady();
            pageClass.registerEvents();
            app.log(`${this.className} Loaded🎉`);
        });
    });
}

export default BasePage;