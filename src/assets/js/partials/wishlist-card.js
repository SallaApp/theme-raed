
class WishlistCard extends HTMLElement {

    connectedCallback() {

        if (!this.product) {
            return salla.logger.warn('custom-wishlist-card:: product does not exist!');
        }
        salla.onReady(() => this.render())

    }

    render() {
        this.setAttribute('id', `wishlist-product-${this.product.id}`)
        this.classList.add('product-entry', 'product-entry--wishlist')

        this.innerHTML = `
        <div class="flex items-center mb-4 sm:mb-0">
          <a href="${this.product.url}" class="product-entry__image">
            <img class="object-cover w-full h-full lazy" data-src="${this.product.image.url}" alt="${this.product.image.alt}" />
          </a>
          <div class="flex-1 rtl:pr-5 ltr:pl-5">
            <h3 class="text-sm text-gray-800 leading-6 mb-1.5 rtl:pl-5 ltr:pr-5 rtl:md:pl-8 ltr:md:pr-8 line-clamp-1">
              <a href="${this.product.url}">${this.product.name}</a>
            </h3>
            <div class="w-full center-between">
              ${this.product.is_on_sale ? `
                <div class="space-x-1 rtl:space-x-reverse">
                  <h4 class="inline-block text-sm font-bold text-red-400">${salla.money(this.product.sale_price)}</h4>
                  <span class="text-sm text-gray-500 line-through">${salla.money(this.product.regular_price)}</span>
                </div>
              ` : `
                <h4 class="text-sm font-bold">${salla.money(this.product.price)}</h4>
              `}
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <salla-add-product-button product-status="${this.product.status}" product-id="${this.product.id}" product-type="${this.product.type}" loader-position="center" fill="outline" class="flex-grow w-full sm:grow-0 md:w-40">
          </salla-add-product-button>
          <salla-button loader-position="center" shape="icon" size="small" color="danger" class="btn--delete" onclick="salla.wishlist.remove(${this.product.id})">
            <i class="sicon-cancel"></i>
          </salla-button>
        </div>
  `
        document.lazyLoadInstance?.update(this.querySelectorAll('.lazy'));

    }
}

customElements.define('custom-wishlist-card', WishlistCard);
