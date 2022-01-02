import 'lite-youtube-embed';
import BasePage from './basePage';
import Fslightbox from 'fslightbox';
import Slider from './partials/slider'
import ProductOptions from './partials/product-options';
import Comments from './partials/comments';

window.fslightbox = Fslightbox;

class Product extends BasePage {
    onBoot() {
        window.initProductDetails = this.initProductDetails;
    }

    onReady() {
        this.initSliders();
        ProductOptions();
        Comments();
    }

    initSliders() {
        let thumbSlider = Slider(document.querySelector('.thumbs-slider'), {
            spaceBetween       : 10,
            slidesPerView      : 3,
            freeMode           : true,
            watchSlidesProgress: true,
        });
        let productImages = Slider(document.querySelector('.details-slider'), {
            slidesPerView : 1,
            centeredSlides: true,
            spaceBetween  : 30,
            thumbs        : {swiper: thumbSlider},
        });

        document.querySelectorAll('.go-to-slide')
            .forEach(item => {
                let slideIndex = document.querySelector(`[data-img-id *= "${item.dataset.imgId}"]`).dataset.slidIndex;
                item.addEventListener('click', e => productImages.slideTo(slideIndex, 0));
            });

        //usage in (similar-products.twig)
        Slider('.similar-products-slider', {spaceBetween: 30, breakpoints: {980: {slidesPerView: 4}}});
    }

    //TODO:: enhance it
    initProductDetails(productId, inFavorite, showReadMore, quantity, total, productOptions) {
        let that = this;
        window.productId = productId;
        return {
            reminderModal    : false,
            inFavorite       : inFavorite,
            showReadMore     : showReadMore,
            showShareMenu    : false,
            itemQty          : quantity,
            itemTotal        : total,
            productOptions   : productOptions,
            toggleFavorite   : function () {
                this.inFavorite
                    ? salla.api.wishlist.remove(productId)
                    : salla.api.wishlist.add(productId);
                this.inFavorite = !this.inFavorite;
                that.anime('.anime-favorite', {duration: 800, scale: [0.6, 1]});
            },
            addQty           : function () {
                this.itemQty++;
                this.itemTotal = '...';
                if (!this.productOptions.length) {
                    salla.api.product.getPrice({id: productId, quantity: this.itemQty, options: this.productOptions})
                        .then(res => {
                            this.updatePrice(res);
                        });
                }
            },
            subQty           : function () {
                if (this.itemQty <= 1) {
                    return;
                }
                this.itemQty--;
                this.itemTotal = '...';
                salla.api.product.getPrice({id: productId, quantity: this.itemQty, options: this.productOptions})
                    .then(res => {
                        this.updatePrice(res);
                    });
            },
            updatePrice      : function (res) {
                this.itemTotal = res.data.after;
            },
            openReminderModal: function () {
                this.reminderModal = true;
                that.anime('.common-anime-r', {translateY: [40, 0]});
            },

            closeReminderModal: function () {
                this.reminderModal = false;
            },

            submitReminderModal: function () {
                let product_id = document.querySelector('#notify_product_id').value,
                    email_input = document.querySelector('#notify-email'),
                    //country_code_input = document.querySelector('.iti__selected-dial-code'),
                    country_code_input = document.querySelector('#country_code'),
                    mobile_input = !document.querySelector('#notify-mobile');

                salla.product.api
                    .availabilitySubscribe({
                        id    : product_id,
                        email : email_input ? email_input.value : null,
                        mobile: mobile_input ? mobile_input.value : null,
                        //country_code:country_code_input ? country_code_input.innerText : null
                        country_code: country_code_input ? country_code_input.value : null
                    })
                    .then(res => {
                        this.reminderModal = false;
                    });
            },

            toggleShareMenu() {
                if (!(this.showShareMenu = !this.showShareMenu)) {
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
            },

        }
    }
}

new Product;