import BasePage from '../base-page';
class AppInstall extends HTMLElement {
	connectedCallback(){
	  if (window.app?.status === 'ready') {
		this.onReady();
	  } else {
		document.addEventListener('theme::ready', () => this.onReady() )
	  }
	}
  
	onReady(){
		this.logo = salla.config.get('store.logo');
		this.name = salla.config.get('store.name');
		this.position = false ? 'top-0' : 'bottom-0';
		this.title = 'جربت تطبيق سلة ؟';
		this.sub_title = 'قم بتحميل التطبيق وأحصل على خصومات وعروض تصل لـ 70%';
		this.cta_text = ' حمله الان';
		
		this.render()
	}
  
	render(){
	  this.innerHTML = `<div class="flex flex-row items-center fixed ${this.position} left-0 right-0 w-[95%] my-4 mx-auto bg-[#ffe4cc] z-[999] rounded-md p-3 gap-3">
	  <div>
	    <img src=${this.logo} width="58" height="58" alt="${this.name}">
	  </div>
	  <div>
	    <h2 class="text-base font-bold text-primary">${this.title}</h2>
		<span class="text-sm font-normal">${this.sub_title}<u class="text-primary">${this.cta_text}</u></span>
	  </div>
	  <span class="absolute top-2 left-3"><i class="sicon-cancel"></i></span>
	  </div>`
		
	}
  }
  
  customElements.define('salla-app-install-banner', AppInstall);