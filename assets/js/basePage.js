import '@salla.sa/twilight';
import '@salla.sa/twilight/components';

import AlpineJS from 'alpinejs';
import Notify from './partials/notify';
import Helpers from './partials/helpers';
import LazyLoad from './partials/lazy-load';
import MobileMenu from './partials/mobile-menu';
import StickyMenu from './partials/sticky-menu';
import MobileInputs from './partials/mobile-inputs';
import CartListeners from './partials/cart-listeners';
import WishlistButtons from './partials/wishlist-buttons';
import Advertisement from './partials/advertisement';
import Dropdwons from './partials/dropdwons';

class BasePage extends Helpers {
    constructor() {
        super();
        this.boot();
        document.addEventListener('DOMContentLoaded', () => this.load());
    }

    boot() {
        this.onBoot && this.onBoot();
        this.registerWindowProperties();
    }

    load() {
        this.initiatePlugins();
        this.initiateCommons();

        this.onReady && this.onReady();
        this.registerEvents && this.registerEvents();
    }

    registerWindowProperties() {
        window.copyToClipboard = this.copyToClipboard;
        window.Alpine = AlpineJS;
        window.LazyLoad = LazyLoad;
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
        Advertisement();
        Dropdwons();
    }

    initiateCommons() {
        salla.currency.event.onChanged(() => window.location.reload());
        salla.document.event.onClick('.btn--has-loading', ({target}) => target.classList.add('btn--is-loading'));

        this.anime('.anime-count', {scale: [0.5, 1]});
    }
}

export default BasePage;