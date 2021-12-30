import 'lite-youtube-embed';
import BasePage from './basePage';
import Flatpickr from 'flatpickr';
import Fslightbox from 'fslightbox';
import Slider from './partials/slider'
import ProductOptions from './partials/product-options';


import './partials/filepond';

window.fslightbox = Fslightbox;

class Product extends BasePage {
    onBoot() {
        window.initProductDetails = this.initProductDetails;
    }

    onReady() {
        this.initSliders();
        this.initDateTimeInputes();
        ProductOptions();
    }

    registerEvents() {
        salla.infiniteScroll.initiate('.comments-container', '.comment-block', {
            history        : false,
            scrollThreshold: false
        });
    }

    initDateTimeInputes() {
        Flatpickr('.date-element', {"dateFormat": "Y-m-d H:i"});
        Flatpickr('.date-time-element', {"enableTime": true, "dateFormat": "Y-m-d H:i",});
        Flatpickr('.time-element', {enableTime: true, noCalendar: true, dateFormat: "H:i",});
    }

    //TODO:: enhance it
    initSliders() {
        let thumbSlider = Slider(document.querySelector('.thumbs-slider'), {
            spaceBetween       : 10,
            slidesPerView      : 3,
            freeMode           : true,
            watchSlidesProgress: true,
        });
        document.querySelectorAll('.details-slider')
            .forEach(slider => {
                let swiper2 = Slider(slider, {
                    slidesPerView : 1,
                    centeredSlides: true,
                    spaceBetween  : 30,
                    navigation    : {
                        nextEl: slider.querySelector('.swiper-button-next'),
                        prevEl: slider.querySelector('.swiper-button-prev'),
                    },
                    thumbs        : {swiper: thumbSlider,},
                });

                document.querySelectorAll('.go-to-slide')
                    .forEach(item => {
                        let slideIndex = document.querySelector(`[data-img-id *= "${item.dataset.dataImgId}"]`);
                        item.addEventListener('click', e => swiper2.slideTo(slideIndex.dataset.slidIndex, 0));
                    })
            });
    }

    //TODO:: enhance it
    initProductDetails(productId, inFavorite, showReadMore, quantity, total, productOptions) {
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
                anime({
                    targets : '.anime-favorite',
                    opacity : [0, 1],
                    duration: 800,
                    scale   : [0.6, 1],
                });
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
                this.reminderModal = true
                this.animateCommonItems();
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

            animateCommonItems: function () {
                let that = this;
                anime({
                    targets   : '.common-anime-r',
                    opacity   : [0, 1],
                    translateY: [40, 0],

                    delay: function (el, i) {
                        return i * 100;
                    },
                    begin: function () {
                        //that.$refs['userPhone'].focus();
                    }
                })
            },

            toggleShareMenu() {
                this.showShareMenu = !this.showShareMenu
                if (this.showShareMenu) {
                    this.animateShareList();
                }
            },

            animateShareList: function () {
                const shareListAnime = new anime.timeline();
                shareListAnime.add({
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

        }
    }
}

new Product;