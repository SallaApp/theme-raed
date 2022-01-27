import 'lite-youtube-embed';
import BasePage from './base-page';
import Fslightbox from 'fslightbox';
import Slider from './partials/slider'
import ProductOptions from './partials/product-options';

window.fslightbox = Fslightbox;

class Product extends BasePage {
    onReady() {
        this.initSliders();
        this.initShareAndFavoriteBtns();
        new ProductOptions();
        app.watchElements({
            quantityInput: '#product-quantity',
            totalPrice   : '#total-price',
            beforePrice  : '#before-price',
        });
        salla.event.on('comment::added', () => document.location.reload());
    }

    registerEvents() {
        //Workaround to fire data-on-change="product::get.price"
        let qunatityChanged = () => salla.document.event.fireEvent(app.quantityInput, 'change', {'bubbles': true});
        app.onClick('#btn-increase', () => app.quantityInput.value++ && qunatityChanged());
        app.onClick('#btn-decrease', () => app.quantityInput.value <= 1 || (app.quantityInput.value-- && qunatityChanged()));
        app.onClick('#btn-show-more', e => app.all('#moreContent', div => div.style = `max-height:${div.scrollHeight}px`) || e.target.remove());
        salla.product.event.onPriceUpdated(res => {
            app.totalPrice.innerText = res.data.after;
            app.anime('#total-price', {scale: [0.88, 1]});
            if (res.data.before) {
                app.beforePrice.style.display = 'inline';
                app.beforePrice.innerText = res.data.before;
                return;
            }
            app.beforePrice && (app.beforePrice.style.display = 'none')
        });
    }

    initSliders() {
        let mini = new Slider('.mini', {spaceBetween: 10, slidesPerView: 3, freeMode: true, watchSlidesProgress: true});
        let main = new Slider('.details-slider', {
            slidesPerView : 1,
            centeredSlides: true,
            spaceBetween  : 30,
            thumbs        : {swiper: mini.getSlider()},
        });

        //when clicking product option form type image, move slider to same image
        app.onClick('.go-to-slide', e => main.slideTo(app.element(`[data-img-id*="${e.target.dataset.imgId}"]`).dataset.slidIndex, 0));

        //used in (similar-products.twig)
        new Slider('.similar-products-slider', {spaceBetween: 30, breakpoints: {980: {slidesPerView: 4}}});

        //used in (components/product/offer.twig)
        new Slider('#offer-slider', {breakpoints: {640: {slidesPerView: 2, slidesPerGroup: 2}}});
    }


    initShareAndFavoriteBtns() {
        app.onClick('#btn-favorite', ({target: btn}) => {
            if (!app.isUser()) {
                return salla.error(salla.lang.get('common.messages.must_login'));
            }
            let addToFavorite = !btn.classList.contains('favorited');
            addToFavorite ? salla.api.wishlist.add(salla.config.get('page.id')) : salla.api.wishlist.remove(salla.config.get('page.id'));
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
}

Product.className = 'Product';
Product.allowedPages = ['product.single'];
Product.intiateWhenReady();


class Products extends BasePage {
    onReady() {
        //Used in: [random-testimonials.twig]
        new Slider('.testimonials-slider', {
            loop          : true,
            centeredSlides: true,
            spaceBetween  : 15,
            breakpoints   : {1024: {slidesPerView: 2, spaceBetween: 30}}
        });
    }
}
Products.className = 'Products';
Products.allowedPages = ['product.index'];
Products.intiateWhenReady();