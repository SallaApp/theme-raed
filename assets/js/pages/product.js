import flatpickr from "flatpickr";
import fslightbox from 'fslightbox';

require('../../dist/filepond.js');
require('../partials/pages/product-options');

window.fslightbox = fslightbox;

// window.Swiper = Swiper;
window.initProductDetails = function (productId, inFavorite, showReadMore, quantity, total, productOptions) {
    window.productId = productId;
    return {
        reminderModal : false,
        inFavorite    : inFavorite,
        showReadMore  : showReadMore,
        showShareMenu : false,
        itemQty       : quantity,
        itemTotal     : total,
        productOptions: productOptions,
        toggleFavorite: function () {
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
        addQty        : function () {
            if (! this.productOptions) {
                salla.api.product.getPrice({prodId: this.productId, quantity: this.itemQty + 1, options: this.productOptions})
                    .then(res => {
                        this.updatePrice(res);
                        this.itemQty++;
                    });
            }
        },
        subQty        : function () {
            if (this.itemQty <= 1) {
                return;
            }
            salla.api.product.getPrice({prodId: this.productId, quantity: this.itemQty - 1, options: this.productOptions})
                .then(res => {
                    this.itemQty--;
                    this.updatePrice(res);
                });
        },
        updatePrice: function (res) {
            this.itemTotal = res.data.msg;
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

window.append_image = function (formData, element, event) {
    let fileInput = window.fileponds ? window.fileponds["attached_file_" + window.productId] : undefined;
    if (fileInput) {
        fileInput.getFiles().forEach(filepond => formData.append('file[]', filepond.file))
    }
    return window.verifyDataBeforeSend(formData, element, event);
};

document.addEventListener('DOMContentLoaded', function () {
    salla.infiniteScroll.initiate('.comments-container', '.comment-block', {
        history        : false,
        scrollThreshold: false
    })

    flatpickr('.date-element', {
        // "enableTime": true,
        "dateFormat": "Y-m-d H:i",
    });
    flatpickr('.date-time-element', {
        "enableTime": true,
        "dateFormat": "Y-m-d H:i",
    });
    flatpickr('.time-element', {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });

    let thumbSwiper = !document.querySelector('.thumbs-slider')
        ? null
        : new Swiper(".thumbs-slider", {
            spaceBetween : 10,
            slidesPerView: 3,
            // loop: true,
            freeMode           : true,
            watchSlidesProgress: true,
            // centeredSlides: true,
        });
    document.querySelectorAll('.details-slider').forEach(slider => {
        let swiper2 = new Swiper('.details-slider', {
            // Optional parameters
            // loop: true,
            centeredSlides: true,
            spaceBetween  : 30,

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            thumbs: {
                swiper: thumbSwiper,
            },
        });

        let Items = document.querySelectorAll('.go-to-slide')
        Items.forEach(item => {
            let imageId = item?.dataset.dataImgId
            let slideIndex = document.querySelector(`[data-img-id *= "${imageId}"]`).dataset.slidIndex;
            item.addEventListener('click', function (e) {
                swiper2.slideTo(slideIndex, 0);
            });
        })
    });


});
