import TelInput from "intl-tel-input";
import flatpickr from "flatpickr";//TODO:: move it to another place
// mobile menu
const menu = new MmenuLight(
    document.querySelector("#mobile-menu"),
    "(max-width: 1024px)", "( slidingSubmenus: false)"
);

const navigator = menu.navigation({ title: "التصنيفات" });
const drawer = menu.offcanvas({
    position: "right"
});

document.querySelector("a[href='#mobile-menu']")
    .addEventListener("click", (evnt) => {
        evnt.preventDefault();
        drawer.close();
        drawer.open();
    });


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

/**
 * Sticky Menu  ---------------------------------
 */

var headerWrapper = document.getElementById('site-header-outer'),
    headerContent = document.querySelector('.site-header');
var headerHeight = headerContent.clientHeight; 
headerWrapper.style.height = headerHeight + 'px';

window.addEventListener('resize', function () {
    headerHeight = headerContent.clientHeight;
    headerWrapper.style.height = headerHeight + 'px';
});

window.addEventListener('scroll', function () {
    var headerOffsetTop = headerWrapper.offsetTop;
    var scrollY = window.scrollY;

    if (scrollY >= headerOffsetTop + headerHeight) {
        headerWrapper.classList.add('fixed-pinned', 'animated');
    } else {
        headerWrapper.classList.remove('fixed-pinned');
    }

    if (scrollY >= 200) {
        headerWrapper.classList.add('fixed-header');
    } else {
        headerWrapper.classList.remove('fixed-header', 'animated');
    }
}, {
    passive: true
});


// flatpickr
document.addEventListener('DOMContentLoaded', function () {
    flatpickr('#productCalendar', {
        "enableTime": true,
        "dateFormat": "Y-m-d H:i",
    });
});

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
    if (isDetailsSlider.length > 0) {
        var swiper = new Swiper(".thumbs-slider", {
            spaceBetween: 10,
            slidesPerView: 3,
            // loop: true,
            freeMode: true,
            watchSlidesProgress: true,
            // centeredSlides: true,
        });

        var swiper2 = new Swiper('.details-slider', {
            // Optional parameters
            // loop: true,
            centeredSlides: true,
            spaceBetween: 30,

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            thumbs: {
                swiper: swiper,
            },
        });
    }

    let Items = document.querySelectorAll('.go-to-slide')
    Items.forEach(item => {
        let slideindex = item.dataset.slideindex
        item.addEventListener('click', function (e) {
            swiper2.slideTo(slideindex, 0);
        });
    })

});

// initTelInput
//assign to all fields with .tel-input
function initTelInput(){
    const intlInputs = document.querySelectorAll('.tel-input');
    if (intlInputs.length) {
        intlInputs.forEach(intlInput => {
            let iti = TelInput(intlInput, {
                initialCountry: intlInput.dataset.code || 'sa',
                preferredCountries: ['sa', 'ae', 'kw', 'bh', 'qa', 'iq', 'om', 'ye', 'eg', 'jo', 'sy', 'ps', 'sd', 'lb', 'dz', 'tn', 'ma', 'ly'],
                formatOnDisplay: false,
                separateDialCode: true,
                autoPlaceholder: 'aggressive',
                utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js',
            });
            intlInput.addEventListener("countrychange", () => {
                let data = iti.getSelectedCountryData();
                document.querySelectorAll('.country_code').forEach(input => input.value = data.iso2.toUpperCase());
                document.querySelectorAll('.country_key').forEach(input => {
                    input.value = ('+' + data.dialCode).replace('++', '+');
                });
            });
        });
    }
}
initTelInput();

// globals
window.copyToClipboard = function(elementId) {
    debugger;
    // icon
    let copyIcon = document.querySelector('.copy-icon');
    // Create an auxiliary hidden input
    var aux = document.createElement("input");
    // Get the text from the element passed into the input
    aux.setAttribute("value", document.getElementById(elementId).innerHTML);
    // Append the aux input to the body
    document.body.appendChild(aux);
    // Highlight the content
    aux.select();
    // Execute the copy command
    document.execCommand("copy");
    // Remove the input from the body
    document.body.removeChild(aux);

    copyIcon.classList.remove('sicon-copy');
    copyIcon.classList.add('sicon-check');

    setTimeout(() => {
        copyIcon.classList.add('sicon-copy');
        copyIcon.classList.remove('sicon-check');
    }, 1000);
}


// add to cart animation
window.addTocartAnimation = (productID) => {

    // remove .cart-thumb el from body ---
    if (document.querySelectorAll('.cart-thumb').length) {
        document.querySelectorAll('.cart-thumb').forEach(el => {
            el.remove();
        });
    }

    /*let parentNode = findAncestor(event.target, '.product-block');
    console.log(parentNode);*/

    let
        cartBtn = document.querySelector('#main-cart-btn .cart-icon'),
        btnOffset = cartBtn.getBoundingClientRect(),
        btnTop = btnOffset.top + window.scrollY,
        btnLeft = btnOffset.left + window.scrollX;

    // get thumb position ---
    let
        productBlock = document.getElementById('product_' + productID),
        productImg = productBlock.getElementsByTagName('img')[0],
        position = productImg.getBoundingClientRect(),
        width = productImg.offsetWidth + 'px',
        height = productImg.offsetHeight + 'px',
        top = position.top,
        left = position.left,
        isFixedHeader = document.getElementById('site-header-outer').classList.contains('fixed-header');

    // create thumb img element ---
    let img = document.createElement("img");
    img.src = productImg.getAttribute('src');
    img.className = "cart-thumb";
    img.style = "object-fit:cover; width:" + width + '; height:' + height + '; top:' + top + 'px; left:' + left + 'px;';
    document.body.append(img);

    const cartThumb = document.querySelector('.cart-thumb');
    cartBtn.classList.remove('animated', 'rubberBand');

    // start timeline ---
    let cartThumbAnime = new anime.timeline();
    cartThumbAnime.add({
        targets: cartThumb,
        width: [150, 30],
        height: [150, 30],
        top: [top, isFixedHeader ? -20 : window.scrollY > 0 ? btnTop - window.scrollY - 40 : btnTop - 40],
        left: [left, btnLeft],
        borderRadius: ['20%', '50%'],
        easing: 'easeOutExpo',
        duration: 1200,
    }, '+=200')
        .add({
            targets: cartThumb,
            width: [30, 0],
            height: [30, 0],
            opacity: [1, 0],
            easing: 'easeOutExpo',
            top: [isFixedHeader ? -20 : window.scrollY > 0 ? btnTop - window.scrollY - 40 : btnTop - 40,
            isFixedHeader ? 30 : window.scrollY > 0 ? btnTop - window.scrollY + 10 : btnTop + 10],
            left: [btnLeft, btnLeft + 10],
        }, '-=500')
        .add({
            complete: function () {
                cartBtn.classList.add('animated', 'rubberBand');
                cartThumb.remove();
            },
        }, '-=1700')
}
