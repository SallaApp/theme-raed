import BasePage from './base-page';

class Testimonials extends BasePage {
    constructor(){
        super();
        this.onReady()
    }
    onReady() {
        // Sort Testimonials
        app.on('change','#testimonials-filter', event =>
            window.location.href = salla.helpers.addParamToUrl('sort', event.target.value)
        );
        
        let urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('sort')) {
            app.element('#testimonials-filter').value = urlParams.get('sort');
        }
    }
}

Testimonials.initiateWhenReady(['store.testimonials']);
