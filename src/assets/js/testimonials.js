import BasePage from './base-page';

class Testimonials extends BasePage {
    onReady() {
        let commentsList = app.element('salla-comments');


        let urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('sort')) {
            app.element('#testimonials-filter').value = urlParams.get('sort');
        }

        app.on('change', '#testimonials-filter', async (event) => {
            window.history.replaceState(null, null, salla.helpers.addParamToUrl('sort', event.currentTarget.value));
            commentsList.sort = event.currentTarget.value;
            await commentsList.reload();
            commentsList.setAttribute('sort', event.currentTarget.value)
        });
    }
}

Testimonials.initiateWhenReady(['testimonials']);
