import 'lite-youtube-embed';
import BasePage from './base-page';
import Fslightbox from 'fslightbox';
import * as SliderHelper from "./partials/slider-helper";
import ProductOptions from './partials/product-options';

window.fslightbox = Fslightbox;

class Product extends BasePage {
    onReady() {
        this.initiateSliders();
        new ProductOptions();

        app.watchElements({
            totalPrice: '.total-price',
            beforePrice: '.before-price',
        });
    }

    registerEvents() {
        salla.product.event.onPriceUpdated((res) => {

            app.totalPrice.forEach(el => el.innerText = salla.money(res.data.price));
            // app.totalPrice.innerText = salla.money(res.data.price);

            app.anime('.total-price', { scale: [0.88, 1] });

            if (res.data.has_sale_price) {
                app.beforePrice.forEach(el => {
                    el.style.display = 'inline'
                    el.innerText = salla.money(res.data.regular_price)
                });
                // app.beforePrice.style.display = 'inline';
                // app.beforePrice.innerText = salla.money(res.data.regular_price);
                return;
            }
            app.beforePrice.length && app.beforePrice.forEach(el => el.style.display = 'none');
            // app.beforePrice && (app.beforePrice.style.display = 'none')
        });

        app.onClick('#btn-show-more', e => app.all('#more-content', div => {
            e.target.classList.add('is-expanded');
            div.style = `max-height:${div.scrollHeight}px`;
        }) || e.target.remove());
    }
    initiateSliders() {
        (async () => {
            await customElements.whenDefined('salla-slider');
            const sliders = document.querySelectorAll('salla-slider');
            sliders.forEach(slider => {
                SliderHelper.handleSliderNavigation(slider);
            });
        })();
    }
}

Product.intiateWhenReady('Product', ['product.single']);
