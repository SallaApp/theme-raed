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

    initiate(allowedPages) {
        if (allowedPages && !allowedPages.includes(salla.config.get('page.slug'))) {
            return app.log(className + ' Skiped.');
        }

        this.onReady();
        this.registerEvents();
        app.log(`${this.constructor.name} Loaded🎉`);
    };
}

/**
 * Because we merged multi classes into one file, there is no need to initiate all of them
 */
BasePage.initiateWhenReady = function (allowedPages = null) {
    document.addEventListener('theme::ready', () => (new this).initiate(allowedPages))
}

export default BasePage;
