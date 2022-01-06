/**
 * @return {number[]}
 */
function getWishlist() {
    return JSON.parse(localStorage.getItem("salla-wishlist") || '[]');
}

/**
 * Wishlist
 * save items in localstorage
 */
export default function () {
    pageClass.onClick('.wishlist-btn', event => event.target.classList.add('is--loading'));
    getWishlist().forEach(id => toggalFavorites(id, true));

    salla.wishlist.event.onAdded((event, id) => updateWishlist(id, true));
    salla.wishlist.event.onRemoved((event, id) => updateWishlist(id, false));
}

function updateWishlist(id, isAdded) {
    let wishlist = getWishlist();
    isAdded ? wishlist.push(id) : wishlist.splice(wishlist.indexOf(id), 1);
    localStorage.setItem('salla-wishlist', JSON.stringify(wishlist));
    toggalFavorites(id, isAdded);
}

function toggalFavorites(id, isAdded) {
    document.querySelectorAll('.wishlist-btn[data-id="' + id + '"]')
        .forEach(btn => {
            pageClass.toggleElement(btn.querySelector('i'), 'sicon-heart-off', 'sicon-heart', () => isAdded);
            pageClass.toggleElement(btn, ['text-primary', 'pulse'], 'un-favorited', () => isAdded);
            btn.dataset.onClick = isAdded ? 'wishlist::remove' : 'wishlist::add';
            btn.classList.remove('is--loading');
        });
}