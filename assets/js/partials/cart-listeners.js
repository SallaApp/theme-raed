/**
 * @typedef {{  total               : string,
 *              shipping_cost       : number,
 *              final_total         : string,
 *              sub_total           : string,
 *              count               : number,
 *              total_discounted    : string,
 *              hasOffer            : boolean}} CartSummary
 */
salla.cart.event.onUpdated(function (cartSummary) {
    /** @type CartSummary cartSummary*/
    document.querySelectorAll('[data-cart-total]').forEach(el => el.innerText = cartSummary.final_total);
    document.querySelectorAll('[data-cart-badge]').forEach(el => el.innerText = cartSummary.count);
});
salla.cart.event.onItemAdded(function (response, productId) {
    // remove .cart-thumb el from body ---
    document.querySelectorAll('.cart-thumb').forEach(el => el.remove());

    /********** Start product addtion to cart animation **********/
    let
        cartBtn = document.querySelector('#main-cart-btn .cart-icon'),
        btnOffset = cartBtn.getBoundingClientRect(),
        btnTop = btnOffset.top + window.scrollY,
        btnLeft = btnOffset.left + window.scrollX;

    // get thumb position ---
    let
        productBlock = document.getElementById('product_' + productId),
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
        targets     : cartThumb,
        width       : [150, 30],
        height      : [150, 30],
        top         : [top, isFixedHeader ? -20 : window.scrollY > 0 ? btnTop - window.scrollY - 40 : btnTop - 40],
        left        : [left, btnLeft],
        borderRadius: ['20%', '50%'],
        easing      : 'easeOutExpo',
        duration    : 1200,
    }, '+=200')
        .add({
            targets: cartThumb,
            width  : [30, 0],
            height : [30, 0],
            opacity: [1, 0],
            easing : 'easeOutExpo',
            top    : [isFixedHeader ? -20 : window.scrollY > 0 ? btnTop - window.scrollY - 40 : btnTop - 40,
                      isFixedHeader ? 30 : window.scrollY > 0 ? btnTop - window.scrollY + 10 : btnTop + 10],
            left   : [btnLeft, btnLeft + 10],
        }, '-=500')
        .add({
            complete: function () {
                cartBtn.classList.add('animated', 'rubberBand');
                cartThumb.remove();
            },
        }, '-=1700');


    // remove loading class
    document.querySelectorAll('.add-to-cart-btn.btn--is-loading').forEach(btn => btn.classList.remove('btn--is-loading'));
})

salla.cart.event.onItemAddedFailed(function (response, productId) {
    document.querySelectorAll('.add-to-cart-btn.btn--is-loading').forEach(btn => btn.classList.remove('btn--is-loading'));
})