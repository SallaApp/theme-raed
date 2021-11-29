import flatpickr from "flatpickr";

window.initProductDetails = function (productId, inFavorite, showMore) {
    window.productId = productId;
    return {
        reminderModal : false,
        inFavorite    : inFavorite,
        showMore      : showMore,
        showShareMenu : false,
        toggleFavorite: function () {
            this.inFavorite = !this.inFavorite;
            anime({
                targets : '.anime-favorite',
                opacity : [0, 1],
                duration: 800,
                scale   : [0.6, 1],
            });
        },

        openReminderModal: function () {
            this.reminderModal = true
            this.animateCommonItems();
        },

        closeReminderModal: function () {
            this.reminderModal = false;
        },

        animateCommonItems: function () {
            let that = this;
            anime({
                targets   : '.common-anime',
                opacity   : [0, 1],
                translateY: [20, 0],
                duration  : 600,
                delay     : function (el, i) {
                    return i * 100;
                },
                begin     : function () {
                    that.$refs['userPhone'].focus();
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
    var isDetailsSlider = document.getElementsByClassName('details-slider');
    if (!isDetailsSlider.length) {
        return;
    }
    var swiper = new Swiper(".thumbs-slider", {
        spaceBetween : 10,
        slidesPerView: 3,
        // loop: true,
        freeMode           : true,
        watchSlidesProgress: true,
        // centeredSlides: true,
    });

    var swiper2 = new Swiper('.details-slider', {
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
            swiper: swiper,
        },
    });

    let Items = document.querySelectorAll('.go-to-slide')
    Items.forEach(item => {
        let slideindex = item.dataset.slideindex
        item.addEventListener('click', function (e) {
            swiper2.slideTo(slideindex, 0);
        });
    })
});
