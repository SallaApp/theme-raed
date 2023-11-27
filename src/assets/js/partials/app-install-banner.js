/**
 * Salla app install banner component.
 */
import BasePage from '../base-page';
import { getSessionCount, updateUserSession } from '../utils/getUserSessionCount';
import { isMobileOrTabletDevice } from '../utils/isMobileOrTabletDevice';

class AppInstall extends HTMLElement {
	connectedCallback() {
		if (window.app?.status === 'ready') {
			this.onReady();
		} else {
			document.addEventListener('theme::ready', () => this.onReady());
		}
	}

	onReady() {
		this.notMobile = false;
		this.logo = salla.config.get('store.logo');
		this.name = salla.config.get('store.name');
		this.position = true ? 'top-0' : 'bottom-0';
		this.title = 'جربت تطبيق سلة ؟';
		this.sub_title = 'قم بتحميل التطبيق وأحصل على خصومات وعروض تصل لـ 70%';
		this.cta_text = ' حمله الان';

		if (!isMobileOrTabletDevice || getSessionCount() % 10 !== 0) return;
		setTimeout(() => {
			this.render();
		}, 2000);
	}

	closeBanner() {
		this.setAttribute('open', false);
		updateUserSession(1)
	}

	render() {
		this.setAttribute('open', true);
		this.classList.add('s-app-install-banner', this.position);
		this.innerHTML = `
	    <div>
	      <img src=${this.logo} width="58" height="58" alt="${this.name}">
	    </div>
	    <div>
	      <h2 class="s-app-install-banner-title">${this.title}</h2>
		  <span class="s-app-install-banner-sub-title">${this.sub_title}
		    <u class="s-app-install-banner-cta">${this.cta_text}</u>
		  </span>
	    </div>
	    <button onclick="this.parentElement.closeBanner()" 
	      class="s-app-install-banner-cancel-button"><i class="sicon-cancel"></i>
	    </button>`;
	}
}

customElements.define('salla-app-install-banner', AppInstall);
