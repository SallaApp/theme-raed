/**
 * Wishlist
 * save items in localstorage
 */
export default function () {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (event) => btn.classList.add('is--loading'))
    })

    JSON.parse(localStorage.getItem("salla-wishlist") || '[]')?.forEach(id => toggalFavorites(id))

    salla.event.on("wishlist::added", (event, id) => {
        const storeWishlist = JSON.parse(localStorage.getItem("salla-wishlist") || "[]");
        storeWishlist.push(id);
        localStorage.setItem('salla-wishlist', JSON.stringify(storeWishlist));
        toggalFavorites(id, true);
    })

    salla.event.on("wishlist::removed", (event, id) => {
        const storeWishlist = JSON.parse(localStorage.getItem("salla-wishlist") || "[]");
        const index = storeWishlist.indexOf(id);
        storeWishlist.splice(index, 1);
        localStorage.setItem('salla-wishlist', JSON.stringify(storeWishlist));
        toggalFavorites(id);
    })
};

function toggalFavorites(id, isAdded) {
    let classes = isAdded
        ? {add: 'sicon-heart-off', remove: 'sicon-heart', action: 'wishlist::remove'}
        : {add: 'sicon-heart-off', remove: 'sicon-heart', action: 'wishlist::add'};
    document.querySelectorAll('.wishlist-btn[data-id="' + id + '"]')
        .forEach(btn => {
            const icon = btn.querySelector('i');
            btn.classList[isAdded ? 'add' : 'remove'](['text-primary', 'pulse']);
            icon.classList.add(classes.add);
            icon.classList.remove(classes.remove);
            btn.dataset.onClick = classes.action;
            btn.classList.remove('is--loading');
        });
}