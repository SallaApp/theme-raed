/**
 * Salla app install banner component.
 */
class AppInstall extends HTMLElement {
  connectedCallback() {
    salla.onReady(() => {
      this.data = salla.config.get('store.app_install_prompt');
      // Early check to avoid unneeded render and api request
      // do not render the component if the device in not (tablet/mobile) or
      // if the store does not have apps or banner was dismissed by the user
      // or if the banner was disabled by the store admin
      if (
        !this.isMobileOrTabletDevice() ||
        !salla.config.get('store.apps') ||
        salla.storage.get('app_install_prompt_disabled')||
        !this.data
      )
        return;

      // TODO: replace it with deep links when they are ready
      this.cta_link = salla.config.get('store.apps')[this.getMobileOS() === 'iOS' ? 'appstore' : 'googleplay'];
      // render the banner
      this.renderTheBanner();
    });
  }

  renderTheBanner() {
    this.render();
    setTimeout(() => this.setAttribute('open', true), 3000);
  }

  /**
   * Get the OS of device (android/ios).
   * @returns {string} returns iOS/Android/Other
   */
  getMobileOS = () => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      return 'Android';
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      (/Macintosh/i.test(navigator.userAgent) && 'ontouchend' in document)
    ) {
      return 'iOS';
    }
    return 'Other';
  };

  /**
   * Check if the website opens from mobile or tablet devices only (android/ios).
   *
   * @param {number} screen the width of biggest screen to be checked
   * @returns {boolean} true if it is mobile or tablet else false
   */
  isMobileOrTabletDevice = (screen = 1024) => {
    const screenWidth = window.innerWidth <= screen;
    const userAgentCheck = /Macintosh|Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    );
    const hasTouch =
      'ontouchstart' in window ||
      'ontouchend' in document ||
      navigator.maxTouchPoints > 0;

    return userAgentCheck && screenWidth && hasTouch;
  };

  closeBanner() {
    salla.storage.set('app_install_prompt_disabled', true);
    if (this.data.position === 'top') {
      this.setAttribute('open', false);
    } else {
      // handle closing animation first, then close the banner
      this.setAttribute('closing', '');
      this.addEventListener(
        'animationend',
        () => {
          this.removeAttribute('closing');
          this.setAttribute('open', false);
        },
        { once: true }
      );
    }
  }

  render() {
    this.setAttribute('open', false);
    this.setAttribute('position', this.data.position);
    this.classList.add('s-app-install-banner');
    this.innerHTML = `
      <div>
	      <img src=${this.data.icon} width="58" height="58" alt="${salla.config.get('store.name')}">
      </div>
      <div>
        <h2 class="s-app-install-banner-title">${this.data.title}</h2>
        <p class="s-app-install-banner-sub-title">${this.data.sub_title}
          <a href="${this.cta_link}"
            target="_blank" aria-label="download app" class="s-app-install-banner-cta">
            ${salla.lang.getWithDefault('blocks.footer.download_app_now','حمله الآن')}
          </a>
        </p>
      </div>
      <button onclick="this.parentElement.closeBanner()" 
        class="s-app-install-banner-cancel-button"><i class="sicon-cancel"></i>
      </button>`;
  }
}

customElements.define('salla-app-install-banner', AppInstall);
