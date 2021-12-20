window.Swiper = require('swiper/bundle').default;
window.copyToClipboard = function (elementId) {
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


/********** Start LazyLoad **********/
const preloadImg = (entry) => {
    const entrySrc = entry.getAttribute('data-src');
    if (!entrySrc) {
        return;
    }

    // assign image source to src attribute
    entry.classList.contains('lazy-background') ? entry.style.backgroundImage = "url('" + entrySrc + "')" : entry.src = entrySrc;
    entry.classList.remove('lazy-load', 'lazy-background');
    entry.classList.add('loaded');
}

const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        preloadImg(entry.target);
        observer.unobserve(entry.target);
    });
}, {
    threshold: 0,
    trackVisibility: true,
    delay: 100,
    rootMargin: "250px 250px 250px 250px"
});

function lazyLoadFunction() {
    const lazyLoadImages = document.querySelectorAll("[data-src]");
    lazyLoadImages.forEach(entry => {
        imgObserver.observe(entry);
    })
    salla.infiniteScroll.event.onAppend(()=>lazyLoadFunction());
}
document.addEventListener("DOMContentLoaded", lazyLoadFunction);

/*export default function lazyLoadFunction() {
 et lazyloadImages = document.querySelectorAll(".lazy-load,.lazy-background");
 if ("IntersectionObserver" in window) {
     let imageObserver = new IntersectionObserver(function (entries, observer) {
         entries.forEach(function (entry) {
             if (entry.isIntersecting) {
                 let image = entry.target;
                 if (image.matches('.lazy-background')) {
                     image.style.backgroundImage = 'url(' + image.dataset.src + ')';
                     image.classList.remove("lazy-background");
                 } else {
                     image.src = image.dataset.src;
                     image.classList.remove("lazy-load");
                 }
                 imageObserver.unobserve(image);
             }
         });
     });
     lazyloadImages.forEach(function (image) {
         imageObserver.observe(image);
     });
 } else {
     let lazyloadThrottleTimeout;

     function lazyload() {
         if (lazyloadThrottleTimeout) {
             clearTimeout(lazyloadThrottleTimeout);
         }
         lazyloadThrottleTimeout = setTimeout(function () {
             let scrollTop = window.pageYOffset;
             lazyloadImages.forEach(function (img) {
                 if (img.offsetTop < (window.innerHeight + scrollTop)) {
                     if (img.matches('.lazy-background')) {
                         img.style.backgroundImage = 'url(' + img.dataset.src + ')';
                         img.classList.remove('lazy-background');
                         return;
                     }
                     img.src = img.dataset.src;
                     img.classList.remove('lazy-load');
                 }
             });
             if (lazyloadImages.length == 0) {
                 document.removeEventListener("scroll", lazyload);
                 window.removeEventListener("resize", lazyload);
                 window.removeEventListener("orientationChange", lazyload);
             }
         }, 20);
     }
     /!*document.addEventListener("scroll", lazyload);
     window.addEventListener("resize", lazyload);
     window.addEventListener("orientationChange", lazyload);*!/
 }
 salla.infiniteScroll.event.onAppend(()=>lazyLoadFunction());
}*/

//document.addEventListener("DOMContentLoaded", lazyLoadFunction);
/********** End LazyLoad **********/
