import flatpickr from "flatpickr";
import fslightbox from 'fslightbox';

window.fslightbox = fslightbox;

// window.Swiper = Swiper;
window.initProductDetails = function (productId, inFavorite, showReadMore) {
    window.productId = productId;
    return {
        reminderModal : false,
        inFavorite    : inFavorite,
        showReadMore  : showReadMore,
        showShareMenu : false,
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
        addQty: function () {
            salla.api.product.getPrice({ id: this.itemId, quantity: this.itemQty + 1 })
                .then(res => {
                    updateCartPageInfo(res);
                    this.itemQty++;
                });
        },
        subQty: function () {
            if (this.itemQty <= 1) {
                return;
            }
            salla.cart.api
                .updateItem({ id: this.itemId, quantity: this.itemQty - 1 })
                .then(res => {
                    this.itemQty--;
                    updateCartPageInfo(res);
                });
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
                    id: product_id,
                    email: email_input ? email_input.value : null,
                    mobile: mobile_input ? mobile_input.value : null,
                    //country_code:country_code_input ? country_code_input.innerText : null
                    country_code:country_code_input ? country_code_input.value : null
                })
                .then(res => {
                    this.reminderModal = false;
                });
        },

        animateCommonItems: function () {
            let that = this;
            anime({
                targets: '.common-anime-r',
                opacity: [0, 1],
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

window.append_image = function (form_data, that, event) {
    let fileInput = window.fileponds ? window.fileponds["attached_file_" + window.productId] : undefined;
    if (!fileInput) {
        return form_data;
    }
    fileInput.getFiles().forEach(filepond => form_data.append('file[]', filepond.file))
    return form_data;
};

document.addEventListener('DOMContentLoaded', function () {
    salla.infiniteScroll.initiate('.comments-container', '.comment-block', {
        history        : false,
        scrollThreshold: false
    })

    flatpickr('#productCalendar', {
        "enableTime": true,
        "dateFormat": "Y-m-d H:i",
    });
    flatpickr('#receiveTime', {
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
            let slideindex = item.dataset.slideindex;
            item.addEventListener('click', function (e) {
                swiper2.slideTo(slideindex, 0);
            });
        })
    });


});
