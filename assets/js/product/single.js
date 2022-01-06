import 'lite-youtube-embed';
import BasePage from '../basePage';
import Fslightbox from 'fslightbox';
import Slider from '../partials/slider'
import Comments from '../partials/comments';
import ProductOptions from '../partials/product-options';

window.fslightbox = Fslightbox;

class Single extends BasePage {
    onBoot() {
        window.initProductDetails = this.initProductDetails;
    }

    onReady() {
        this.initSliders();
        ProductOptions();
        Comments();
        this.quantityInput = document.querySelector('#product-quantity');
        this.totalPrice = document.querySelector('#total-price');
        this.beforePrice = document.querySelector('#before-price');
    }

    registerEvents() {
        salla.document.event.onClick('.btn--share', event => this.toggleShareMenu(event.target));
        salla.document.event.onClick('#btn-favorite', event => this.toggleFavorite(event.target));
        salla.document.event.onClick('#btn-show-more', event => this.showMore(event.target));
        salla.document.event.onClick('#btn-increase', () => this.addQty());
        salla.document.event.onClick('#btn-decrease', () => this.subQty());
        salla.product.event.onPriceUpdated(res => this.updatePrice(res));
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

        document.querySelectorAll('.go-to-slide')
            .forEach(item => {
                let slideIndex = document.querySelector(`[data-img-id *= "${item.dataset.imgId}"]`).dataset.slidIndex;
                item.addEventListener('click', e => productImages.slideTo(slideIndex, 0));
            });

        //usage in (similar-products.twig)
        new Slider('.similar-products-slider', {spaceBetween: 30, breakpoints: {980: {slidesPerView: 4}}});
    }

    /**
     * @param {HTMLElement} btn
     */
    toggleFavorite(btn) {
        if (!app.isUser()) {
            return salla.error(salla.lang.get('common.messages.must_login'));
        }
        let addToFavorite = !btn.classList.contains('favorited');
        addToFavorite ? salla.api.wishlist.add(app.pageData('id')) : salla.api.wishlist.remove(app.pageData('id'));
        app.toggleElement(btn, 'text-white bg-primary favorited', 'bg-white text-theme-red', () => addToFavorite)
            .toggleElement(btn.querySelector('i'), 'sicon-heart-off', 'sicon-heart', () => addToFavorite)
        app.anime('.btn-favorite', {duration: 800, scale: [0.6, 1]});
    }

    /**
     * @param {HTMLElement} btn
     */
    toggleShareMenu(btn) {
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
            }).add({
            targets   : '.share-btns-list li',
            translateZ: 0,
            translateY: [-30, 0],
            scaleY    : [0, 1],
            opacity   : [0, 1],
            duration  : 1200,
            delay     : anime.stagger(100),
        }, '-=200');
    }

    showMore(btn) {
        document.querySelectorAll('#moreContent').forEach(div => div.style = `max-height:${div.scrollHeight}px`);
        btn.remove();
    }

    addQty() {
        this.quantityInput.value++;
        this.qunatityChanged();
    }

    subQty() {
        if (this.quantityInput.value <= 1) {
            return;
        }
        this.quantityInput.value--;
        this.qunatityChanged();
    }

    /**
     * Workaround to fire data-on-change="product::get.price"
     */
    qunatityChanged() {
        salla.document.event.fireEvent(this.quantityInput, 'change', {'bubbles': true});
    }

    updatePrice(res) {
        this.totalPrice.innerText = res.data.after;
        if (res.data.before) {
            this.beforePrice.style.display = 'inline';
            this.beforePrice.innerText = res.data.before;
            return;
        }
        this.beforePrice.style.display = 'none';
    }
}

new Single;