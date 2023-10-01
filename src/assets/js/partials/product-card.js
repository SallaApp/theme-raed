class ProductCard extends HTMLElement {
    connectedCallback() {
      // Handle landing page
      this.source = salla.config.get('page.slug');
      if (this.source == 'landing-page') {
        this.hideAddBtn = true;
        this.showQuantity = true;
      }
  
      // Append host classes and id
      this.classList.add('product-block');
      this.id = `product_${this.product.id}`
      if (this.product.is_out_of_stock) {
        this.classList.add('is-out');
      }
  
      // Add fit type class
      let fitType = salla.config.get('store.settings.product.fit_type')
      if (!!fitType) {
        this.classList.add(`${fitType}`)
      }
  
      salla.lang.onLoaded(() => {
        this.render()
      })
  
      // Props
      this.horizontal = this.getAttribute('horizontal') === 'true';
      this.showWishlist = this.getAttribute('show-wishlist') === 'true';
  
      this.render()
    }
  
    getLabel() {
      if (this.product.status === 'sale' && this.product.type === 'booking') {
        return salla.lang.get('pages.cart.book_now'); 
      }
  
      if (this.product.status === 'sale') {
        return salla.lang.get('pages.cart.add_to_cart');
      }
  
      if (this.product.type !== 'donating') {
        return salla.lang.get('pages.products.out_of_stock');
      }
  
      // donating
      return salla.lang.get('pages.products.donation_exceed');
    }
  
    render() { 
  
      // Translations
      const remained = salla.lang.get('pages.products.remained');
      const startingPrice = salla.lang.get('pages.products.starting_price');
      const donationPH = salla.lang.get('pages.products.donation_placeholder');
      const donationTarget = salla.lang.get('pages.products.target');
      const donationTargetDate = salla.lang.get('pages.products.donation_target_date');
      const fitType = salla.config.get('store.settings.product.fit_type');
  
      let hasNumber = /\d/,
      promotionClasse = hasNumber.test(this.product.promotion_title) ? 'has-discount' : '';
  
      this.innerHTML = `
      <div id="product-${this.product.id}" class='product-entry
        ${ this.horizontal ? 'product-entry--horizontal' : 'product-entry--vertical' }
        ${ this.hideAddBtn ? 'pb-5' : '' }
        ${ this.product.is_out_of_stock ? 'out-of-stock' : '' }' 
        ${ fitType ? 'product-entry--fit-type' : '' }>
  
        <div class="product-entry__image relative'">
          <a href="${this.product.url}" aria-label="${this.product.name}">
            <img class="h-full w-full transition-opacity hover:opacity-90 lazy object-${salla.url.is_placeholder(this.product.image.url)
              ? 'contain'
              : fitType
                ? fitType
                : 'cover'}"
              src="${'images/img_loader.png'}"
              alt="${this.product.image.alt}" 
              data-src="${this.product.image.url|| this.product.thumbnail}"
            />
          </a>
  
          ${this.product.promotion_title
            ? `<div class="promotion-badge-wrap"><div class="promotion-badge ${promotionClasse}">${this.product.promotion_title}</div></div>`
            : this.showQuantity && this.product.quantity
            ? `<div class="promotion-badge-wrap"><div class="promotion-badge">${remained} ${this.product.quantity}</div></div>`
            : this.showQuantity && this.product.is_out_of_stock
            ? `<div class="promotion-badge-wrap"><div class="promotion-badge"></div></div>`
            : ''
          }
        </div>
  
        <div class="content-wrap donating-wrap">
          <div class="product-entry__content">
  
            ${this.product.rating?.stars > 0 ? 
            `<salla-rating-stars size="small" value="${this.product.rating.stars}"></salla-rating-stars>`
            : ''}
  
            <div class="price-wrapper">
              ${this.product.is_on_sale ?
              `<div class="product-entry__price flex items-center space-x-2 rtl:space-x-reverse whitespace-nowrap">
                <h4 class="sale-price">${salla.money(this.product.sale_price)}</h4>
                <span class=" regular-price">${salla.money(this.product.regular_price)}</span>
              </div>`:
              this.product.starting_price ?
                `${startingPrice} <h4 class="text-red-400 font-bold text-sm inline-block"> ${salla.money(this.product.starting_price)}</h4>` :
                `<h4 class="text-gray-800 font-bold text-lg">${salla.money(this.product.price)}</h4>`
              }
            </div>
  
            <div class="flex flex-col gap-1">
              <a class="product-entry__title mt-0" href="${this.product.url}">${this.product.name}</a>
              ${!!this.product.subtitle ?
                `<p class="product-entry__subtitle text-sm text-gray-500 leading-6">${this.product.subtitle}</p>` 
              : ''}
            </div>
  
  
            ${this.product.type == 'donating' ?
            `${!salla.url.is_page('cart') && this.product?.donation?.target_amount ? 
              `<div class="w-full">
                ${!this.product?.donation?.target_message ? 
                  `<h2 class="text-sm text-gray-500 mb-1.5">${donationTarget}</h2>`
                : ''}
  
                <div class="flex justify-between text-sm mb-2.5">
                    <span>${salla.money(this.product?.donation?.collected_amount)}</span>
                    ${!this.product?.donation?.target_message ? 
                      `<span>${salla.money(this.product?.donation?.target_amount)}</span>`
                    : ''}
                </div>
  
                <div class="bg-gray-100 rounded-full mb-1.5">
                    <div class="progress-bg transition-all duration-500 opacity0 h-4 bg-primary relative rounded-full flex justify-end min-w-[16px]" style="width: ${this.product?.donation?.target_message ? 100 : this.product?.donation?.target_percent}%">
                    </div>
                </div>
  
                ${this.product?.donation?.can_donate ? 
                  this.product?.donation?.target_end_date ? `
                    <small class="block text-xs text-red-400">
                      ${donationTargetDate} ${this.product?.donation?.target_end_date}
                    </small>
                  ` : ''
                :
                  `<h4 class="text-sm text-red-400">
                    ${this.product?.donation?.target_message }
                  </h4>`
                }`
              : ''}
              </div>
  
                ${!this.product?.donation?.target_message ? 
                `<div class="mb-2.5 text-gray-600 w-full">
                  <input 
                    type="text"
                    data-digits
                    data-digits-with-decimal
                    id="donation-amount-${this.product.id}"
                    name="donating_amount"
                    class="h-9 form-input" 
                    placeholder="${donationPH}"
                    value="${salla.url.is_page('cart') ? this.product.price : ''}"
                    ${!this.product?.donation?.can_donate ? 'disabled' : ''}">
                </div>` : ''}
              `
            : ''}
  
  
          ${!this.hideAddBtn ?
            `
            <div class="add-to-cart-conatiner flex items-center mt-auto min-h-[50px] text-gray-600 gap-2.5 lg:gap-4 w-full">
              <salla-add-product-button 
                  class="btn--add-to-cart"
                  fill="outline" 
                  width="wide" 
                  product-id="${this.product.id}"
                  product-status="${this.product.status}"
                  product-type="${this.product.type}"> 
                    ${this.product.status == 'sale' ? 
                      `<i class="text-[16px] sicon-${ this.product.type == 'booking' ? 'calendar-time' : 'shopping-bag'}"></i>` : ``
                    }
                    ${this.product.add_to_cart_label ? this.product.add_to_cart_label : this.getLabel() }
              </salla-add-product-button>
  
              <salla-button 
                shape="icon" 
                fill="outline" 
                color="light" 
                aria-label="Add or remove to wishlist"
                class="btn--wishlist heart-next-add-button animated"
                onclick="salla.wishlist.toggle(${this.product.id})"
                data-id="${this.product.id}">
                <i class="sicon-heart"></i> 
              </salla-button>
            </div>`
            : ''
          }
        </div>`
  
      document.lazyLoadInstance?.update(
          document.querySelectorAll('.product-entry__image .lazy')
      );
  
      document.querySelectorAll('[name="donating_amount"]').forEach((element)=>{
        themeApp.on("input", element, (e) => {
          e.target
            .closest(".donating-wrap")
            .querySelector("salla-add-product-button")
            .setAttribute("donating-amount", e.target.value);
        });
      })
    }
  }
  
  customElements.define('custom-salla-product-card', ProductCard);