import '@salla.sa/twilight';
import '@salla.sa/twilight/components';

import AnimeJS from 'animejs';
import AlpineJS from 'alpinejs';
import Notify from './partials/notify';
import Helpers from './partials/helpers';
import LazyLoad from './partials/lazy-load';
import MobileMenu from './partials/mobile-menu';
import StickyMenu from './partials/sticky-menu';
import MobileInputs from './partials/mobile-inputs';
import CartListeners from './partials/cart-listeners';
import WishlistButtons from './partials/wishlist-buttons';

class BasePage extends Helpers {
    constructor() {
        super();
        document.addEventListener('DOMContentLoaded', () => this.boot());
    }

    boot() {
        this.registerWindowProperties();
        this.initiatePlugins();
        this.initiateCommons();

        this.onReady && this.onReady();
        this.registerEvents && this.registerEvents();
    }

    registerWindowProperties() {
        window.copyToClipboard = this.copyToClipboard;
        window.anime = AnimeJS;
        window.Alpine = AlpineJS;
    }

    initiatePlugins() {
        Notify();
        LazyLoad();
        MobileMenu();
        StickyMenu();
        MobileInputs();
        CartListeners();
        AlpineJS.start();
        WishlistButtons();
    }

    initiateCommons() {
        salla.currency.event.onChanged(() => window.location.reload());
        salla.document.event.onClick('.btn--has-loading', ({target}) => target.classList.add('btn--is-loading'));

        //TODO:: enhance this part:
        salla.onReady(() => {
            anime({
                targets : '.anime-count',
                opacity : [0, 1],
                duration: 2000,
                scale   : [0.5, 1],
                delay   : (el, i) => i * 100,
            });
        });
    }
}

export default BasePage;