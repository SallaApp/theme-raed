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
function initTelInput() {
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
window.copyToClipboard = function (elementId) {
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

    copyIcon.classList.remove('sicon-swap-stroke');
    copyIcon.classList.add('sicon-check');

    setTimeout(() => {
        copyIcon.classList.add('sicon-swap-stroke');
        copyIcon.classList.remove('sicon-check');
    }, 1000);
}

// tabs animation
window.animateTabsItems = (ItemClass) => {
    let elements = document.querySelectorAll(ItemClass);
    elements.forEach(element => {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
    })

    anime({
        targets: `${ItemClass}`,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: anime.stagger(70),
    });

}