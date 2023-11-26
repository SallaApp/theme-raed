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
		
		this.render()
	}
  
	render(){
	  this.innerHTML = `<h1>Hello I ma the app install banner :)</h1>`
		
	}
  }
  
  customElements.define('salla-app-install-banner', AppInstall);