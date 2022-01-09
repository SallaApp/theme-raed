import 'lite-youtube-embed';
import BasePage from './base-page';
import Fslightbox from 'fslightbox';
import Slider from './partials/slider'
import ProductOptions from './partials/product-options';

window.fslightbox = Fslightbox;

class Product extends BasePage {
    onBoot() {
        window.initProductDetails = this.initProductDetails;
    }

    onReady() {
        this.initSliders();
        this.initShareAndFavoriteBtns();
        ProductOptions();
        app.watchElements({
            quantityInput: '#product-quantity',
            totalPrice   : '#total-price',
            beforePrice  : '#before-price',
        });
    }

    registerEvents() {
        app.onClick('#btn-show-more', ({target: btn}) => document.querySelectorAll('#moreContent').forEach(div => div.style = `max-height:${div.scrollHeight}px`) && btn.remove());
        app.onClick('#btn-increase', () => app.quantityInput.value++ && this.qunatityChanged());
        app.onClick('#btn-decrease', () => app.quantityInput.value <= 1 || (app.quantityInput.value-- && this.qunatityChanged()));

        salla.product.event.onPriceUpdated(res => {
            app.totalPrice.innerText = res.data.after;
            if (res.data.before) {
                app.beforePrice.style.display = 'inline';
                app.beforePrice.innerText = res.data.before;
                return;
            }
            app.beforePrice.style.display = 'none';
        });
    }

    initSliders() {
        let thumbSlider = new Slider('.thumbs-slider', {
            spaceBetween       : 10,
            slidesPerView      : 3,
            freeMode           : true,
            watchSlidesProgress: true,
        });
        let productImages = new Slider('.details-slider', {
            slidesPerView : 1,
            centeredSlides: true,
            spaceBetween  : 30,
            thumbs        : {swiper: thumbSlider.getSlider()},
        });

        //when clicking product option form type image, move slider to same image
        app.onClick('.go-to-slide', ({target: item}) => productImages.slideTo(app.element(`[data-img-id *= "${item.dataset.imgId}"]`).dataset.slidIndex, 0));

        //usage in (similar-products.twig)
        new Slider('.similar-products-slider', {spaceBetween: 30, breakpoints: {980: {slidesPerView: 4}}});
    }


    initShareAndFavoriteBtns() {
        app.onClick('#btn-favorite', ({target: btn}) => {
            if (!app.isUser()) {
                return salla.error(salla.lang.get('common.messages.must_login'));
            }
            let addToFavorite = !btn.classList.contains('favorited');
            addToFavorite ? salla.api.wishlist.add(app.pageData('id')) : salla.api.wishlist.remove(app.pageData('id'));
            app.toggleElement(btn, 'text-white bg-primary favorited', 'bg-white text-theme-red', () => addToFavorite)
                .toggleElement(btn.querySelector('i'), 'sicon-heart-off', 'sicon-heart', () => addToFavorite)
            app.anime('.btn-favorite', {duration: 800, scale: [0.6, 1]});
        });

        //Toggale share menu
        app.onClick('.btn--share', ({target: btn}) => {
            let showShareMenu = !btn.classList.contains('opened');
            app.toggleElement(btn, 'opened', 'closed', () => showShareMenu)
                .toggleElement(btn.querySelector('i'), 'sicon-cancel', 'sicon-share-alt', () => showShareMenu)
                .toggleElement(btn.nextElementSibling, 'h-auto', 'h-0 opacity-0', () => showShareMenu);

            if (!showShareMenu) {
                return;
            }

            (new anime.timeline())
                .add({
                    targets   : '.share-btns-list',
                    translateY: [-50, 0],
                    opacity   : [0, 1],
                    duration  : 300,
                    podding   : '0',
                    easing    : 'easeInOutSine'
                })
                .add({
                    targets   : '.share-btns-list li',
                    translateZ: 0,
                    translateY: [-30, 0],
                    scaleY    : [0, 1],
                    opacity   : [0, 1],
                    duration  : 1200,
                    delay     : anime.stagger(100)
                }, '-=200');
        });
    }

    /**
     * Workaround to fire data-on-change="product::get.price"
     */
    qunatityChanged() {
        salla.document.event.fireEvent(app.quantityInput, 'change', {'bubbles': true});
    }
}

new Product;