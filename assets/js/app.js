import '@salla.sa/twilight';
//todo:: use import "@salla.sa/twilight-components" or import {component1, component2} from "@salla.sa/twilight-components"
import '@salla.sa/twilight-components/dist/twilight-components/twilight-components.esm';
import MobileMenu from 'mmenu-light';
import Swal from "sweetalert2";
import Anime from './partials/anime';

class App extends salla.AppHelpers {
    constructor() {
        super();
        this.isThemeApp = true;//to make sure that window.app, is this class
        window.app = this;
        salla.onReady(() => this.loadTheApp());
    }

    //remove it
    isUser() {
        return salla.config.isUser();
    }

    loadTheApp() {
        this.initiateNotifier();
        this.initiateLazyLoad();
        this.initiateMobileMenu();
        this.initiateStickyMenu();
        this.initAddToCart();
        this.initiateWishlistButtons();
        this.initiateAdAlert();
        this.initiateDropdowns();
        this.initiateModals();
        this.initiateCollabse();
        this.initiateComments();
        this.initiateInfiniteScroll();

        this.onClick('.btn--has-loading', event => event.target.classList.add('btn--is-loading', 'pointer-events-none'));
        salla.event.on('infiniteScroll::load', () => this.removeClass('#next-page-btn', 'btn--is-loading').hideElement('.loading-status-wrapper .loader-status'))
        this.anime('.anime-count', {scale: [0.5, 1]});
        this.onClick('#productFilter', event => {
            let url = window.location.href.replace(/([?;&])by[^&;]*[;&]?/g, "$1").replace(/&$/, '');
            url += (url.includes('?') ? "&" : "?") + (event.target.value ? "by=" + event.target.value : '');

            window.location.href = url.replace(/&$|\?$/, '');
        });

        // this.onClick('.grid-trigger', event => {
        //     event.preventDefault();
        //     let type = event.target.dataset.type;//list|grid
        //
        //     this.toggle('.grid-trigger', 'bg-border-color text-primary', 'text-gray-400', e => e.dataset.type === type)
        //         .toggle('.products-container', 'list md:grid-cols-1', 'md:grid-cols-auto-fill', () => type === 'list');
        //     this.anime('.product-entry', {duration: 1200, translateY: [20, 0]});
        // });

        this.log('App Loaded 🎉');
    }

    log(message) {
        salla.log(`ThemeApp(${salla.config.get('theme.name')})::${message}`);
        return this;
    }

    initiateNotifier() {
        salla.notify.setNotifier(function (message, type, data) {
            if (typeof message == 'object') {
                return Swal.fire(message).then(type);
            }
            return Swal.mixin({
                toast            : true,
                position         : salla.config.isRTL() ? 'top-start' : 'top-end',
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
        const drawer = menu.offcanvas({position: salla.config.isRTL() ? "right" : 'left'});

        this.onClick("a[href='#mobile-menu']", event => event.preventDefault() || drawer.close() || drawer.open());
        this.onClick(".close-mobile-menu", event => event.preventDefault() || drawer.close());
    }

    initiateLazyLoad() {
        let imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                let src;
                if (!entry.isIntersecting || !(src = entry.target.dataset.src)) {
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
                app.toggleElement(entry.target, 'loaded', 'lazy-load lazy-background', () => true);
                observer.unobserve(entry.target);
            });
        }, {threshold: 0, trackVisibility: true, delay: 100, rootMargin: "250px 250px 250px 250px"});
        window.LazyLoad = () => document.querySelectorAll(".lazy-load, .lazy-background").forEach(entry => imgObserver.observe(entry));
        LazyLoad(); //fire it for the first time;
        salla.infiniteScroll.event.onAppend(LazyLoad); //fire it after each load more request;
    }

    initiateStickyMenu() {
        let header = this.element('#site-header-outer');
        let height = this.element('.site-header').clientHeight;
        header.style.height = height + 'px';

        window.addEventListener('scroll', () => {
            window.scrollY >= header.offsetTop + height ? header.classList.add('fixed-pinned', 'animated') : header.classList.remove('fixed-pinned');
            window.scrollY >= 200 ? header.classList.add('fixed-header') : header.classList.remove('fixed-header', 'animated');
        }, {passive: true});
    }

    initiateAdAlert() {
        let ad = this.element("#s-theme_ad");

        if (!ad) {
            return;
        }

        if (!localStorage.getItem('statusAd-' + ad.dataset.id)) {
            ad.classList.remove('hidden');
        }

        this.onClick('.ad-close', function (event) {
            event.preventDefault();
            localStorage.setItem('statusAd-' + ad.dataset.id, 'dismissed');

            anime({
                targets : '#s-theme_ad',
                opacity : [1, 0],
                duration: 300,
                height  : [ad.clientHeight, 0],
                easing  : 'easeInOutQuad',
            });
        });
    }

    initiateDropdowns() {
        this.onClick('.dropdown__trigger', ({target: btn}) => {
            btn.parentElement.classList.toggle('is-opened');
            document.body.classList.toggle('dropdown--is-opened');
            // Click Outside || Click on close btn
            window.addEventListener('click', ({target: element}) => {
                if (!element.closest('.dropdown__menu') && element !== btn || element.classList.contains('dropdown__close')) {
                    btn.parentElement.classList.remove('is-opened');
                    document.body.classList.remove('dropdown--is-opened');
                }
            });
        });
    }

    initiateModals() {
        this.onClick('[data-modal-trigger]', e => {
            let id = '#' + e.target.dataset.modalTrigger;
            this.removeClass(id, 'hidden');
            setTimeout(() => this.toggleModal(id, true)); //small amont of time to running toggle After adding hidden
        });
        salla.event.document.onClick("[data-close-modal]", e => this.toggleModal('#' + e.target.dataset.closeModal, false));
    }

    toggleModal(id, isOpen) {
        this.toggle(`${id} .s-salla-modal-overlay`, 'ease-out duration-300 opacity-100', 'opacity-0', () => isOpen)
            .toggle(`${id} .s-salla-modal-body`,
                'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100', //add these classes
                'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95', //remove these classes
                () => isOpen)
            .toggleElement(document.body, 'modal-is-open', 'modal-is-closed', () => isOpen);
        if (!isOpen) {
            setTimeout(() => this.addClass(id, 'hidden'), 350);
        }
    }

    initiateCollabse() {
        const collapseButtons = document.querySelectorAll('.btn--collapse');
        collapseButtons.forEach((trigger) => {
            const content = document.querySelector('#' + trigger.dataset.show);
            this.makeCollapsible(trigger, content, 'easeOutQuart')
        })
    }

    makeCollapsible(trigger, content, easing, duration = 225) {
        const state = {isOpen: false}

        const onOpen = () => {
            const height = content.scrollHeight
            anime({
                targets : content,
                duration: duration,
                height  : height,
                opacity : [0, 1],
                easing  : easing,
            })
        }

        const onClose = () => {
            anime({
                targets : content,
                duration: duration,
                height  : 0,
                opacity : [1, 0],
                easing  : easing,
            })
        }

        const toggleState = (isOpen) => {
            state.isOpen = !isOpen
            this.toggleElement(content, 'is-closed', 'is-opened', () => isOpen);
        }

        trigger.addEventListener('click', () => {
            const {isOpen} = state
            toggleState(isOpen)
            isOpen ? onClose() : onOpen();
        })
    }


    /**
     * Workaround for seeking to simplify & clean, There are three ways to use this method:
     * 1- direct call: `this.anime('.my-selector')` - will use default values
     * 2- direct call with overriding defaults: `this.anime('.my-selector', {duration:3000})`
     * 3- return object to play it leter: `this.anime('.my-selector', false).duration(3000).play()` - will not play animation unless calling play method.
     * @param {string} selector
     * @param {object|undefined|null|null} options - in case there is need to set attributes one by one set it `false`;
     * @return {Anime|*}
     */
    anime(selector, options = null) {
        let anime = new Anime(selector, options);
        return options === false ? anime : anime.play();
    }


    // ======================= Wishlist Icons in Product Cards ======================= //
    initiateWishlistButtons() {
        app.onClick('.wishlist-btn', event => event.target.classList.add('is--loading'));
        salla.localStore.get("salla-wishlist", []).forEach(id => this.toggalFavorites(id, true));

        salla.wishlist.event.onAdded((event, id) => this.updateWishlist(id, true));
        salla.wishlist.event.onRemoved((event, id) => this.updateWishlist(id, false));
    }

    updateWishlist(id, isAdded) {
        let wishlist = salla.localStore.get("salla-wishlist", []);
        isAdded ? wishlist.push(id) : wishlist.splice(wishlist.indexOf(id), 1);
        salla.localStore.set("salla-wishlist", wishlist);
        this.toggalFavorites(id, isAdded);
    }

    toggalFavorites(id, isAdded) {
        document.querySelectorAll('.wishlist-btn[data-id="' + id + '"]')
            .forEach(btn => {
                app.toggleElement(btn.querySelector('i'), 'sicon-heart-off', 'sicon-heart', () => isAdded);
                app.toggleElement(btn, ['text-primary', 'pulse'], 'un-favorited', () => isAdded);
                btn.dataset.onClick = isAdded ? 'wishlist::remove' : 'wishlist::add';
                btn.classList.remove('is--loading');
            });
    }

    /**
     * These actions are responsable for pressing "add to cart" button,
     * they can be from any page, espacially when megamenu is enabled
     */
    initAddToCart() {
        salla.cart.event.onUpdated(summary => {
            document.querySelectorAll('[data-cart-total]').forEach(el => el.innerText = summary.final_total || summary.total);
            document.querySelectorAll('[data-cart-badge]').forEach(el => el.innerText = summary.count);
        });
        salla.cart.event.onItemAdded((response, prodId) => {
            Anime.addToCart(response, prodId);
            this.removeLoading();
        });

        salla.cart.event.onItemAddedFailed(() => this.removeLoading())
    }

    removeLoading() {
        document.querySelectorAll('.btn--is-loading').forEach(btn => btn.classList.remove('btn--is-loading', 'pointer-events-none'))
    }

    initiateComments() {
        //Add Loading when adding new comment
        let btn = document.getElementById('add-new-comment-btn');
        if (!btn) {
            return;
        }
        let input = this.element('textarea[name="ask_textarea"]');
        this.onClick(btn, () => input.value.length >= 3 ? btn.classList.add('btn--has-loading', 'pointer-events-none') : input.classList.add('!border-red-400'));
        this.onKeyUp(input, () => input.classList.remove('!border-red-400'));
        salla.comment.event.onAdded(() => btn.classList.remove('btn--is-loading', 'pointer-events-none'))
        salla.comment.event.onAdditionFailed(() => btn.classList.remove('btn--is-loading', 'pointer-events-none'))
    }

    initiateInfiniteScroll() {
        let container = this.element('.list-container');
        if (!container) {
            return;
        }
        let options = ['', 'true'].includes(container.dataset.autoLoad) ? {} : {history: false, scrollThreshold: false};
        salla.infiniteScroll.initiate('.list-container', '.list-block', options);
    }
}


new App;