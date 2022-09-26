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

/**
 * Because we merged multi classes into one file, there is no need to initiate all of them
 */
BasePage.intiateWhenReady = function (className, allowedPages = null) {
    salla.onReady(() => {
        let tries = 0, inerval;
        //check if theme app is initiated each 0.1 sec for one sec otherwise don't load current page class
        (new Promise((resolve, reject) =>
            inerval = setInterval(function () {
                if (window.app?.isThemeAppReady()) {
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
            if (allowedPages && !allowedPages.includes(salla.config.get('page.slug'))) {
                app.log(className + ' Skiped.');
                return;
            }
            window.pageClass = new this;
            pageClass.onReady();
            pageClass.registerEvents();
            app.log(`${className} Loaded🎉`);
        });
    });
}

export default BasePage;
