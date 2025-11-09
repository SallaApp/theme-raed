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

export default Anime;
