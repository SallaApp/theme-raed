import BasePage from '../base-page';
class ProductCard extends HTMLElement {
  constructor(){
    super()
  }
  
  connectedCallback(){
    // Parse product data
    this.product = this.product || JSON.parse(this.getAttribute('product')); 

    if (window.app?.status === 'ready') {
      this.onReady();
    } else {
      document.addEventListener('theme::ready', () => this.onReady() )
    }
  }

  onReady(){
      this.placeholder = salla.url.asset(salla.config.get('theme.settings.placeholder'));
      this.render()
  }


  render(){
    this.classList.add('s-product-card-entry'); 
    this.setAttribute('id', this.product.id);
    !this.horizontal && !this.fullImage && !this.minimal? this.classList.add('s-product-card-vertical') : '';
    this.horizontal && !this.fullImage && !this.minimal? this.classList.add('s-product-card-horizontal') : '';
    this.product?.is_out_of_stock?  this.classList.add('s-product-card-out-of-stock') : '';
    this.isInWishlist = !salla.config.isGuest() && salla.storage.get('salla::wishlist', []).includes(this.product.id);
    this.innerHTML = `
        <a href="${this.product?.url}" class="inline-block">
          <img class="s-product-card-image-cover w-16 h-16 rounded-full lazy border-2 border-white transition-all duration-300 hover:border-primary hover:scale-105"
            src=${this.placeholder}
            alt=${this.product?.image?.alt}
            data-src=${this.product?.image?.url || this.product?.thumbnail}
          />
        </a>
      `
      document.lazyLoadInstance?.update(this.querySelectorAll('.lazy'));
    }
}

customElements.define('similar-product-card', ProductCard);