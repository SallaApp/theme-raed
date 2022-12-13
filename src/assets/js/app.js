import MobileMenu from 'mmenu-light';
import Swal from 'sweetalert2';
import Anime from './partials/anime';
import initTootTip from './partials/tooltip';
import AppHelpers from "./app-helpers";

class App extends AppHelpers {
  constructor() {
    super();
    window.app = this;
  }

  loadTheApp() {
    this.initiateNotifier();
    this.initiateMobileMenu();
    this.initiateStickyMenu();
    this.initAddToCart();
    this.initiateAdAlert();
    this.initiateDropdowns();
    this.initiateModals();
    this.initiateCollapse();
    this.initCircleBar();
    this.initDonating();
    initTootTip();

    salla.comment.event.onAdded(() => window.location.reload());

    this.status = 'ready';
    document.dispatchEvent(new CustomEvent('theme::ready'));
    this.log('Theme Loaded 🎉');
  }

  log(message) {
    salla.log(`ThemeApp(${salla.config.get('theme.name')})::${message}`);
    return this;
  }

  copyToClipboard(event) {
    event.preventDefault();
    let aux = document.createElement("input"),
      btn = event.currentTarget;
    aux.setAttribute("value", btn.dataset.content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    this.toggleElementClassIf(btn, 'copied', 'code-to-copy', () => true);
    setTimeout(() => {
      this.toggleElementClassIf(btn, 'code-to-copy', 'copied', () => true)
    }, 1000);
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
    salla.lang.onLoaded(() => {
      menu.navigation({title: salla.lang.get('blocks.header.main_menu')});
    });
    const drawer = menu.offcanvas({position: salla.config.get('theme.is_rtl') ? "right" : 'left'});

    this.onClick("a[href='#mobile-menu']", event => event.preventDefault() || drawer.close() || drawer.open());
    this.onClick(".close-mobile-menu", event => event.preventDefault() || drawer.close());
  }

  initiateStickyMenu() {
    let header = this.element('#mainnav'),
      height = this.element('#mainnav .inner').clientHeight;

    window.addEventListener('load', () => setTimeout(() => this.setHeaderHeight(), 500))
    window.addEventListener('resize', () => this.setHeaderHeight())

    window.addEventListener('scroll', () => {
      window.scrollY >= header.offsetTop + height ? header.classList.add('fixed-pinned', 'animated') : header.classList.remove('fixed-pinned');
      window.scrollY >= 200 ? header.classList.add('fixed-header') : header.classList.remove('fixed-header', 'animated');
    }, {passive: true});
  }

  setHeaderHeight() {
    let height = this.element('#mainnav .inner').clientHeight,
      header = this.element('#mainnav');
    header.style.height = height + 'px';
  }

  /**
   * Because salla caches the response, it's important to keep the alert disabled if the visitor closed it.
   * by store the status of the ad in local storage `salla.storage.set(...)`
   */
  initiateAdAlert() {
    let ad = this.element(".salla-advertisement");

    if (!ad) {
      return;
    }

    if (!salla.storage.get('statusAd-' + ad.dataset.id)) {
      ad.classList.remove('hidden');
    }

    this.onClick('.ad-close', function (event) {
      event.preventDefault();
      salla.storage.set('statusAd-' + ad.dataset.id, 'dismissed');

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
    this.toggleClassIf(`${id} .s-salla-modal-overlay`, 'ease-out duration-300 opacity-100', 'opacity-0', () => isOpen)
      .toggleClassIf(`${id} .s-salla-modal-body`,
        'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100', //add these classes
        'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95', //remove these classes
        () => isOpen)
      .toggleElementClassIf(document.body, 'modal-is-open', 'modal-is-closed', () => isOpen);
    if (!isOpen) {
      setTimeout(() => this.addClass(id, 'hidden'), 350);
    }
  }

  initiateCollapse() {
    document.querySelectorAll('.btn--collapse')
      .forEach((trigger) => {
        const content = document.querySelector('#' + trigger.dataset.show);
        const state = {isOpen: false}

        const onOpen = () => anime({
          targets : content,
          duration: 225,
          height  : content.scrollHeight,
          opacity : [0, 1],
          easing  : 'easeOutQuart',
        });

        const onClose = () => anime({
          targets : content,
          duration: 225,
          height  : 0,
          opacity : [1, 0],
          easing  : 'easeOutQuart',
        })

        const toggleState = (isOpen) => {
          state.isOpen = !isOpen
          this.toggleElementClassIf(content, 'is-closed', 'is-opened', () => isOpen);
        }

        trigger.addEventListener('click', () => {
          const {isOpen} = state
          toggleState(isOpen)
          isOpen ? onClose() : onOpen();
        })
      });
  }


  /**
   * Workaround for seeking to simplify & clean, There are three ways to use this method:
   * 1- direct call: `this.anime('.my-selector')` - will use default values
   * 2- direct call with overriding defaults: `this.anime('.my-selector', {duration:3000})`
   * 3- return object to play it letter: `this.anime('.my-selector', false).duration(3000).play()` - will not play animation unless calling play method.
   * @param {string|HTMLElement} selector
   * @param {object|undefined|null|null} options - in case there is need to set attributes one by one set it `false`;
   * @return {Anime|*}
   */
  anime(selector, options = null) {
    let anime = new Anime(selector, options);
    return options === false ? anime : anime.play();
  }

  /**
   * These actions are responsible for pressing "add to cart" button,
   * they can be from any page, especially when mega-menu is enabled
   */
  initAddToCart() {
    salla.cart.event.onUpdated(summary => {
      document.querySelectorAll('[data-cart-total]').forEach(el => el.innerText = salla.money(summary.total));
      document.querySelectorAll('[data-cart-count]').forEach(el => el.innerText = salla.helpers.number(summary.count));
    });

    salla.cart.event.onItemAdded((response, prodId) => {
      app.element('salla-cart-summary').animateToCart(app.element(`#product-${prodId} img`));
    });
  }

  initCircleBar() {
    // Special offer Block ---
    document.querySelectorAll('.pie-wrapper').forEach(elem => {
      let qty = elem.dataset.quantity,
        total = elem.dataset.total,
        roundPercent = (qty / total) * 100,
        $circle = elem.querySelector('.circle_bar'),
        strokeDashOffsetValue = 100 - roundPercent;
      $circle.style.strokeDashoffset = strokeDashOffsetValue;
    })
  }

  /**
   * Donation field
   */
  initDonating() {
    // Digits Only field all over the theme
    app.on('input', '[data-digits]', e => salla.helpers.inputDigitsOnly(e.target));

    //add donating amount attr to salla-add-product-buton
    app.on('input', '#donation-amount', e => {
      e.target.closest('.donating-wrap').querySelector('salla-add-product-button').setAttribute('donating-amount', e.target.value);
    });
  }
}

salla.onReady(()=>(new App).loadTheApp());
