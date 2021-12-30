export default function initateLazyLoad() {
    let imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            preloadImg(entry.target);
            observer.unobserve(entry.target);
        });
    }, {threshold: 0, trackVisibility: true, delay: 100, rootMargin: "250px 250px 250px 250px"});
    let lazyLoad = () => document.querySelectorAll("[data-src]").forEach(entry => imgObserver.observe(entry));
    salla.infiniteScroll.event.onAppend(lazyLoad);
    lazyLoad();
}

function  preloadImg(entry) {
    const entrySrc = entry.getAttribute('data-src');
    if (!entrySrc) {
        return;
    }
    // assign image source to src attribute
    entry.classList.contains('lazy-background') ? entry.style.backgroundImage = "url('" + entrySrc + "')" : entry.src = entrySrc;
    entry.classList.remove('lazy-load', 'lazy-background');
    entry.classList.add('loaded');
}