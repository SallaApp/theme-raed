/**
 * Salla app install banner component.
 */
class AppInstall extends HTMLElement {
  connectedCallback() {
    salla.onReady(() => {
      // Early check to avoid unneeded render and api request
      // do not render the component if the device in not (tablet/mobile) or
      // if the store does not have apps or banner was dismissed by the user
      // or if the banner was disabled by the store admin
      if (
        !this.isMobileOrTabletDevice() ||
        !salla.config.get('store.apps') ||
        localStorage.getItem('bannerDismissed') === 'true' ||
        !salla.config.get('store.app_install_prompt')
      )
        return;

      // set the banner data
      this.data = salla.config.get('store.app_install_prompt');
      this.renderTheBanner();
      // TODO: replace it with deep links when they are ready
      this.cta_link =
        this.getMobileOS() === 'iOS'
          ? salla.config.get('store.apps.appstore')
          : salla.config.get('store.apps.googleplay');
    });
  }

  renderTheBanner() {
    this.render();
    setTimeout(() => {
      this.setAttribute('open', true);
    }, 3000);
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
    localStorage.setItem('bannerDismissed', true);
    if (this.position === 'top') {
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
            ${salla.lang.get('blocks.footer.download_apps')}
          </a>
        </p>
      </div>
      <button onclick="this.parentElement.closeBanner()" 
        class="s-app-install-banner-cancel-button"><i class="sicon-cancel"></i>
      </button>`;
  }
}

customElements.define('salla-app-install-banner', AppInstall);