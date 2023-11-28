/**
 * Salla app install banner component.
 */
import BasePage from '../base-page';
// simplify the imports from one place
import {
	getSessionCount,
	updateUserSessionCount,
	isMobileOrTabletDevice,
} from '../utils';

class AppInstall extends HTMLElement {
	connectedCallback() {
		if (window.app?.status === 'ready') {
			this.onReady();
		} else {
			document.addEventListener('theme::ready', () => this.onReady());
		}
	}

	onReady() {
		// fetch the banner data
		this.fetchTheAppMarketingData();
		// set the
		this.logo = salla.config.get('store.logo');
		this.name = salla.config.get('store.name');
		this.is_app_installed = false;
		/**NOTE: */
		// suggestion to be come from the BE
		// this.is_app_installed = salla.config.get('user.is_app_installed');
		this.cta_text = ' حمله الان';
		this.cta_link =
			this.getMobileOS() === 'iOS'
				? salla.config.get('store.apps.appstore')
				: salla.config.get('store.apps.googleplay');
	}

	renderTheBanner() {
		// check for user session and dismiss state
		if (!this.shouldShowTheBanner()) return;
		this.render();
		setTimeout(() => {
			this.setAttribute('open', true);
		}, 2000);
	}

	setData(data) {
		this.position = data.position === 'top' ? 'top' : 'bottom';
		this.title = data.title;
		this.sub_title = data.sub_title;
	}

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

	fetchTheAppMarketingData() {
		salla.api.request('http://localhost:3000/data', 'get').then((res) => {
			if (res) {
				this.setData(res);
				// do not render the banner if the device in not (tablet/mobile) or
				// if the user already have the app in his mobile or the banner is disabled,
				// or the store does not have apps
				if (
					!isMobileOrTabletDevice() ||
					this.is_app_installed ||
					!res.is_enabled ||
					!salla.config.get('store.apps')
				)
					return;
				this.renderTheBanner();
			}
		});
	}

	closeBanner(resetTheSession = true) {
		// handle closing animation first, then close the banner
		this.setAttribute('closing', '');
		localStorage.setItem('bannerDismissed', true);
		this.addEventListener(
			'animationend',
			() => {
				this.removeAttribute('closing');
				this.setAttribute('open', false);
			},
			{ once: true }
		);

		if (resetTheSession) updateUserSessionCount(1);
	}

	shouldShowTheBanner() {
		// if the user dismissed the banner check the session count
		if (localStorage.getItem('bannerDismissed') === 'true') {
			if (getSessionCount() === 3) {
				localStorage.setItem('bannerDismissed', false);
				return true;
			}
			return false;
		}
		return true;
	}

	render() {
		this.setAttribute('open', false);
		this.setAttribute('position', this.position);
		this.classList.add('s-app-install-banner');
		this.innerHTML = `
	    <div>
	      <img src=${this.logo} width="58" height="58" alt="${this.name}">
	    </div>
	    <div>
	      <h2 class="s-app-install-banner-title">${this.title}</h2>
		  <span class="s-app-install-banner-sub-title">${this.sub_title}
		    <a href="${this.cta_link}" target="_blank" aria-label="download app" class="s-app-install-banner-cta">
			${this.cta_text}
			</a>
		  </span>
	    </div>
	    <button onclick="this.parentElement.closeBanner()" 
	      class="s-app-install-banner-cancel-button"><i class="sicon-cancel"></i>
	    </button>`;
	}
}

customElements.define('salla-app-install-banner', AppInstall);
