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
BasePage.initiateWhenReady = function (className, allowedPages = null) {
    salla.onReady(() => {
        if (allowedPages && !allowedPages.includes(salla.config.get('page.slug'))) {
            app.log(className + ' Skiped.');
            return;
        }

        window.pageClass = new this;
        pageClass.onReady();
        pageClass.registerEvents();
        app.log(`${className} Loaded🎉`);
    })
}

export default BasePage;
