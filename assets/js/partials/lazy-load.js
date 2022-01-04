let imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        preloadImg(entry.target);
        observer.unobserve(entry.target);
    });
}, {threshold: 0, trackVisibility: true, delay: 100, rootMargin: "250px 250px 250px 250px"});

salla.infiniteScroll.event.onAppend(LazyLoad);

function preloadImg(entry) {
    const src = entry.dataset.src;
    if (!src) {
        return;
    }
    // assign image source to src attribute
    try {
        entry.classList.contains('lazy-background') ? entry.style.backgroundImage = `url('${src}')` : entry.src = src;
    } catch (e) {
        salla.log(`Failed to load image (${src})!`, e.message);
    }
    entry.classList.remove('lazy-load', 'lazy-background');
    entry.classList.add('loaded');
}

export default function LazyLoad() {
    document.querySelectorAll("[data-src]").forEach(entry => imgObserver.observe(entry));
};