import '@salla.sa/twilight'
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

        this.onClick('.btn--add-to-cart', ({currentTarget: btn}) => {
          btn.load()
          salla.cart.event.onItemAdded(() => btn.stop())
          salla.cart.event.onItemAddedFailed(() => btn.stop())
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

    copyLinkToClipboard(elementId) {
        let btn = document.getElementById(elementId);
        var aux = document.createElement("input");
        aux.setAttribute("value", btn.dataset.code);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        this.toggleElement(btn, 'copied', 'code-to-copy', () => true);
        setTimeout(() => this.toggleElement(btn, 'code-to-copy', 'copied', () => true), 1000);
    }

    initiateNotifier() {
        salla.notify.setNotifier(function (message, type, data) {
            if (typeof message == 'object') {
                return Swal.fire(message).then(type);
            }
            return Swal.mixin({
                toast            : true,
                position         : salla.config.get('theme.is_rtl') ? 'top-start' : 'top-end',
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
        const drawer = menu.offcanvas({position: salla.config.get('theme.is_rtl') ? "right" : 'left'});

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
        let header = this.element('#mainnav');
        let logo = header.querySelector('.navbar-brand img')
        let height = this.element('#mainnav .inner').clientHeight;
        logo.addEventListener( 'load', () => {
            height = this.element('#mainnav .inner').clientHeight;
            header.style.height = height + 'px';
        })

        window.addEventListener('resize', () => {
            let height = this.element('#mainnav .inner').clientHeight;
            header.style.height = height + 'px';
        })

        window.addEventListener('scroll', () => {
            window.scrollY >= header.offsetTop + height ? header.classList.add('fixed-pinned', 'animated') : header.classList.remove('fixed-pinned');
            window.scrollY >= 200 ? header.classList.add('fixed-header') : header.classList.remove('fixed-header', 'animated');
        }, {passive: true});
    }

    initiateAdAlert() {
        // todo :: test it after change the element id
        let ad = this.element(".salla-advertisement");

        if (!ad) {
            return;
        }

        // todo :: change to salla.storage
        if (!localStorage.getItem('statusAd-' + ad.dataset.id)) {
            ad.classList.remove('hidden');
        }

        this.onClick('.ad-close', function (event) {
            event.preventDefault();
            localStorage.setItem('statusAd-' + ad.dataset.id, 'dismissed');

            anime({
                targets : '.salla-advertisement',
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
        app.onClick('.btn--wishlist', event => event.target.classList.add('is--loading'));
        salla.storage.get("salla-wishlist", []).forEach(id => this.toggalFavorites(id, true));

        salla.wishlist.event.onAdded((event, id) => this.updateWishlist(id, true));
        salla.wishlist.event.onRemoved((event, id) => this.updateWishlist(id, false));
    }

    updateWishlist(id, isAdded) {
        let wishlist = salla.storage.get("salla-wishlist", []);
        isAdded ? wishlist.push(id) : wishlist.splice(wishlist.indexOf(id), 1);
        salla.storage.set("salla-wishlist", wishlist);
        this.toggalFavorites(id, isAdded);
    }

    toggalFavorites(id, isAdded) {
        document.querySelectorAll('.btn--wishlist[data-id="' + id + '"]')
            .forEach(btn => {
                app.toggleElement(btn.querySelector('i'), 'sicon-heart-off', 'sicon-heart', () => isAdded);
                app.toggleElement(btn, 'pulse', 'un-favorited', () => isAdded);
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
            document.querySelectorAll('[data-cart-total]').forEach(el => el.innerText = summary.final_total || summary.total || salla.money(0));
            document.querySelectorAll('[data-cart-badge]').forEach(el => el.innerText = summary.items_count || summary.count || 0);
        });
        salla.cart.event.onItemAdded((response, prodId) => {
            Anime.addToCart(response, prodId);
        });
    }

    initiateComments() {
        let btn = document.getElementById('add-new-comment-btn');
        if (!btn) return;
        let input = this.element('textarea[name="comment"]');
        this.onKeyUp(input, () => input.classList.remove('!border-red-400'));

        this.onClick('#add-new-comment-btn', ({currentTarget: btn}) => {
          input.value.length >= 3 ? btn.load() : input.classList.add('!border-red-400');
          salla.comment.event.onAdded(() => window.location.reload())
          salla.comment.event.onAdditionFailed(() => btn.stop())
        });
    }
}


new App;
