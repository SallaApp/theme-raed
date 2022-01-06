import '@salla.sa/twilight';
import '@salla.sa/twilight-components';

import Helpers from './partials/helpers';
import StickyMenu from './partials/sticky-menu';
import MobileInputs from './partials/mobile-inputs';
import CartListeners from './partials/cart-listeners';
import WishlistButtons from './partials/wishlist-buttons';
import Advertisement from './partials/advertisement';
import Dropdwons from './partials/dropdwons';
import Modals from './partials/modals';
import MobileMenu from 'mmenu-light';
import Swal from "sweetalert2";

class App extends Helpers {
    constructor() {
        super();
        this.isThemeApp = true;//to make sure that window.app, is this class
        this.registerWindowProperties();
        document.addEventListener('DOMContentLoaded', () => this.initiatePlugins() || this.initiateCommons());

    }

    /**
     * @param key
     * @return {*}
     */
    pageData(key) {
        let data = salla.config.page || {};
        return key ? data[key] : data;
    }

    isUser() {
        return salla.config.is_user;
    }

    registerWindowProperties() {
        window.app = this;
        window.copyToClipboard = this.copyToClipboard;
    }

    initiatePlugins() {
        this.initiateNotifier();
        this.initiateLazyLoad();
        this.initiateMobileMenu();
        StickyMenu();
        MobileInputs();
        CartListeners();
        WishlistButtons();
        Advertisement();
        Dropdwons();
        Modals();
    }

    initiateCommons() {
        salla.currency.event.onChanged(() => window.location.reload());
        document.querySelectorAll('.btn--has-loading').forEach(btn => {
            btn.addEventListener('click', () => btn.classList.add('btn--is-loading'));
        });

        const nextPageBtn = document.getElementById('next-page-btn');

        // salla.event.on('infiniteScroll::request', function () {
        //     //document.querySelector('.loading-status-wrapper .spinner-loader-wrap').classList.remove('hidden');
        // })

        salla.event.on('infiniteScroll::load', function () {
            nextPageBtn.classList.remove('btn--is-loading');
            document.querySelector('.loading-status-wrapper .loader-status').style.display = 'none';
        })

        this.anime('.anime-count', {scale: [0.5, 1]});
    }

    initiateNotifier() {
        salla.notify.setNotifier(function (message, type, data) {
            if (typeof message == 'object') {
                return Swal.fire(message).then(type);
            }
            return Swal.mixin({
                toast            : true,
                position         : window.is_rtl ? 'top-start' : 'top-end',
                showConfirmButton: false,
                timer            : 3500,
                didOpen          : (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            }).fire({
                icon            : type,
                title           : message,
                showCloseButton : true,
                timerProgressBar: true
            })
        });
    }

    initiateMobileMenu() {
        const menu = new MobileMenu(this.element("#mobile-menu"), "(max-width: 1024px)", "( slidingSubmenus: false)");
        menu.navigation({title: salla.lang.get('blocks.header.main_menu')});
        const drawer = menu.offcanvas({position: salla.config.is_rtl ? "right" : 'left'});

        this.onClick("a[href='#mobile-menu']", event => event.preventDefault() || drawer.close() || drawer.open());
        this.onClick(".close-mobile-menu", event => event.preventDefault() || drawer.close());
    }

    initiateLazyLoad() {
        let imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                let src;
                if (!entry.isIntersecting && !(src = entry.target.dataset.src)) {
                    return;
                }
                // assign image source to src attribute
                try {
                    entry.target.classList.contains('lazy-background')
                        ? entry.target.style.backgroundImage = `url('${src}')`
                        : entry.target.src = src;
                } catch (e) {
                    salla.log(`Failed to load image (${src})!`, e.message);
                }
                this.toggleElement(entry.target, 'loaded', 'lazy-load lazy-background', () => true);
                observer.unobserve(entry.target);
            });
        }, {threshold: 0, trackVisibility: true, delay: 100, rootMargin: "250px 250px 250px 250px"});
        window.LazyLoad = () => document.querySelectorAll(".lazy-load, .lazy-background").forEach(entry => imgObserver.observe(entry));
        LazyLoad(); //fire it for the first time;
        salla.infiniteScroll.event.onAppend(LazyLoad);  //fire it after each load more request;

    }
}

new App;