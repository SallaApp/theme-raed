require('@salla.sa/twilight');
// require('./product');
// require('./helpers');
require('mmenu-light');
const TelInput = require('intl-tel-input');
window.anime = require('animejs').default;
window.Alpine = require('alpinejs').default;
Alpine.start();
salla.init();

salla.notify.setNotifier((...data) => salla.log(...data));
// mobile menu
const menu = new MmenuLight(
    document.querySelector("#mobile-menu"),
    "(max-width: 1024px)", "( slidingSubmenus: false)"
);

const navigator = menu.navigation({title: "التصنيفات"});
const drawer = menu.offcanvas({
    position: "right"
});

document.querySelector("a[href='#mobile-menu']")
    .addEventListener("click", (evnt) => {
        evnt.preventDefault();
        drawer.close();
        drawer.open();
    });


/**
 * Sticky Menu  ---------------------------------
 */
var headerWrapper = document.getElementById('site-header-outer'),
    headerContent = document.querySelector('.site-header');
var headerHeight = headerContent.clientHeight;
headerWrapper.style.height = headerHeight + 'px';

// window.addEventListener('resize', function () {
//     headerHeight = headerContent.clientHeight;
//     headerWrapper.style.height = headerHeight + 'px';
// });

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

// initTelInput
//assign to all fields with .tel-input
function initTelInput() {
    const intlInputs = document.querySelectorAll('.tel-input');
    if (intlInputs.length) {
        intlInputs.forEach(intlInput => {
            let iti = TelInput(intlInput, {
                initialCountry    : intlInput.dataset.code || 'sa',
                preferredCountries: ['sa', 'ae', 'kw', 'bh', 'qa', 'iq', 'om', 'ye', 'eg', 'jo', 'sy', 'ps', 'sd', 'lb', 'dz', 'tn', 'ma', 'ly'],
                formatOnDisplay   : false,
                separateDialCode  : true,
                autoPlaceholder   : 'aggressive',
                utilsScript       : 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js',
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