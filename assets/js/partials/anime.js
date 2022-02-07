import AnimeJS from 'animejs';

window.anime = AnimeJS;

class Anime {
    constructor(selector, options) {
        this.options = {
            targets : selector,
            opacity : [0, 1],
            delay   : (el, i) => i * 100,
            duration: 2000,
        };
        this.setOptions(options);
    }

    /**
     * @param options
     * @return {Anime}
     */
    setOptions(options) {
        this.options = Object.assign(this.options, options || {});
        return this;
    }

    /**
     * @param duration
     * @return {Anime}
     */
    duration(duration) {
        return this.set('duration', duration);
    }

    /**
     * @param opacity
     * @return {Anime}
     */
    opacity(opacity) {
        return this.set('opacity', opacity);
    }

    /**
     * @param delay
     * @return {Anime}
     */
    delay(delay) {
        return this.set('delay', delay);
    }

    /**
     * @param scale
     * @return {Anime}
     */
    scale(scale) {
        return this.set('scale', scale);
    }

    /**
     * @param translateY
     * @return {Anime}
     */
    translateY(translateY) {
        return this.set('translateY', translateY);
    }

    /**
     * @param translateX
     * @return {Anime}
     */
    translateX(translateX) {
        return this.set('translateX', translateX);
    }

    /**
     * @param height
     * @return {Anime}
     */
    height(height) {
        return this.set('height', height);
    }

    /**
     * @param margin
     * @return {Anime}
     */
    margin(margin) {
        return this.set('margin', margin);
    }

    /**
     * @param easing
     * @return {Anime}
     */
    easing(easing) {
        return this.set('easing', easing);
    }

    /**
     * @param complete
     * @return {Anime}
     */
    complete(complete) {
        return this.set('complete', complete);
    }

    /**
     * @param key
     * @param value
     * @return {Anime}
     */
    set(key, value) {
        this.options[key] = value;
        return this;
    }

    /**
     * @param number
     * @return {Anime}
     */
    stagger(number) {
        this.delay = AnimeJS.stagger(number);
        return this;
    }

    /**
     * @param padding
     * @return {Anime}
     */
    paddingBottom(padding) {
        return this.set('padding-bottom', padding);
    }

    /**
     * @param padding
     * @return {Anime}
     */
    paddingTop(padding) {
        return this.set('padding-top', padding);
    }

    /**
     * @return {{}}
     */
    play() {
        return AnimeJS(this.options);
    }
}

Anime.addToCart = function (response, productId) {
    document.querySelectorAll('.cart-thumb').forEach(el => el.remove());
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

    let cartThumb = document.querySelector('.cart-thumb');
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
}

export default Anime;