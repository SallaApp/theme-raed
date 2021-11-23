import flatpickr from "flatpickr";//TODO:: move it to another place

// filters mobile menu
var filtersMenuItem = document.getElementById('filters-menu');
if (filtersMenuItem) {
    const filtersMenu = new MmenuLight(
        document.querySelector("#filters-menu"),
        "(max-width: 1024px)", "( slidingSubmenus: false)"
    );

    const filtersDrawer = filtersMenu.offcanvas({
        position: "right"
    });

    document.querySelector("a[href='#filters-menu']")
        .addEventListener("click", (evnt) => {
            evnt.preventDefault();
            filtersDrawer.close();
            filtersDrawer.open();
        });

    document.querySelectorAll(".close-mobile-menu").forEach((elem) => {
        elem.addEventListener("click", (evnt) => {
            evnt.preventDefault();
            filtersDrawer.close();
        });
    })
}

document.querySelectorAll(".close-mobile-menu").forEach((elem) => {
    elem.addEventListener("click", (evnt) => {
        evnt.preventDefault();
        drawer.close();
    });
})

//TODO:: Move it to another place
// flatpickr
document.addEventListener('DOMContentLoaded', function () {
    flatpickr('#productCalendar', {
        "enableTime": true,
        "dateFormat": "Y-m-d H:i",
    });
});

//TODO:: Move it to another place
document.addEventListener('DOMContentLoaded', function () {
    flatpickr('#receiveTime', {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });
});

// singleProduct slider - details
document.addEventListener('DOMContentLoaded', function () {
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
