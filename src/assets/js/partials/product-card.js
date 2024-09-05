import BasePage from '../base-page';
class ProductCard extends HTMLElement {
  constructor(){
    super();
    this.isfired = false;
  }
  
  connectedCallback(){
    // Parse product data
    this.product = this.product || JSON.parse(this.getAttribute('product')); 

    this.product.images = [
      'https://cdn.salla.sa/mQgZlG/9f98b50b-e9cd-4495-9d58-001746481dc2-500x500-IBuNZoBCb9g3TwvL1ZQP2VVSwJekjhskynz0sdzS.jpg',
      'https://cdn.salla.sa/mQgZlG/FaWuBveWH22EqE2qUX9gbUVfG3dVO7vzTyNPBaGf.jpg'
    ]
    
    if (window.app?.status === 'ready') {
      this.onReady();
    } else {
      document.addEventListener('theme::ready', () => this.onReady() )
    }
  }

  onReady(){
      this.fitImageHeight = salla.config.get('store.settings.product.fit_type');
      this.placeholder = salla.url.asset(salla.config.get('theme.settings.placeholder'));
      this.getProps()

	  this.source = salla.config.get("page.slug");
      // If the card is in the landing page, hide the add button and show the quantity
	  if (this.source == "landing-page") {
	  	this.hideAddBtn = true;
	  	this.showQuantity = window.showQuantity;
	  }

    salla.lang.onLoaded(() => {
      // Language
      this.remained = salla.lang.get('pages.products.remained');
      this.donationAmount = salla.lang.get('pages.products.donation_amount');
      this.startingPrice = salla.lang.get('pages.products.starting_price');
      this.addToCart = salla.lang.get('pages.cart.add_to_cart');
      this.outOfStock = salla.lang.get('pages.products.out_of_stock');

      // re-render to update translations
      this.render();
    })
    
    this.render()
  }
 
  renderImages(images){
    this.querySelector('.product-slider').innerHTML = 
      `<salla-slider
          id="product-slider-${this.product.id}-${this.getRandomInt(1, 10000)}"
          show-controls="false" 
          pagination
          auto-play=${productcard_autoplay ? 'true' : 'false'}
          >
          <div slot="items">
            ${images?.map((item) => (
              `<img data-src=${item} src=${this.placeholder} alt=${this.product?.image?.alt} class="lazy"/>`  
            ))}
          </div>
        </salla-slider>`
  }

  renderOptions(options){
    this.querySelector('.product-options').innerHTML = `
      <salla-product-options options="${JSON.stringify(options)}" product-id="${this.product.id}"></salla-product-options>
    `

    this.querySelector('salla-product-options').addEventListener('changed', () => {

      salla.event.once('product::price.updated.failed',(res, product_id)=>{
        if(product_id == this.product.id){
          let outOfStock = this.querySelector('.out-of-stock'),
              wrapper = this.querySelector('.price-wrapper');
 
          wrapper.classList.add('hidden');
          outOfStock.classList.remove('hidden')
          
          app.anime(outOfStock, { scale: [0.88, 1] });
          }
      })

      salla.event.once('product::price.updated',(event, product_id)=>{     
        if(product_id == this.product.id){
          this.updateInnerPrice(event);
        }
      })

    })
  }

  updateInnerPrice = (res) => {
    let totalPrice = this.querySelectorAll('.total-price'),
        beforePrice = this.querySelector('.before-price'),
        salePrice = this.querySelector('.price_is_on_sale'),
        startingOrNormalPrice = this.querySelector('.starting-or-normal-price');

    this.querySelector('.out-of-stock').classList.add('hidden')
    this.querySelector('.price-wrapper').classList.remove('hidden')
    this.querySelector('.starting-price-title')?.classList.add('hidden');

    let data = res.data,
        is_on_sale = data.has_sale_price && data.regular_price > data.price;

    totalPrice.forEach(item=> item.innerHTML = this.getPriceFormat(data.price))
    beforePrice.innerHTML = this.getPriceFormat(data.regular_price);

    // console.log("🚀 ~ ProductCard ~ data:", totalPrice, this.getPriceFormat(data.price) )
    
    app.toggleElementClassIf(salePrice ,'showed','hidden', ()=> is_on_sale)
    app.toggleElementClassIf(startingOrNormalPrice ,'hidden','showed', ()=> is_on_sale)

    app.anime(totalPrice, { scale: [0.88, 1] });
  }

  initCircleBar() {
    let qty = this.product.quantity,
      total = this.product.quantity > 100 ? this.product.quantity * 2 : 100,
      roundPercent = (qty / total) * 100,
      bar = this.querySelector('.s-product-card-content-pie-svg-bar'),
      strokeDashOffsetValue = 100 - roundPercent;
    bar.style.strokeDashoffset = strokeDashOffsetValue;
  }

  formatDate(date) {
    let d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  } 

  getProductBadge() {
    if (this.product.promotion_title) {
      return `<div class="s-product-card-promotion-title">${this.product.promotion_title}</div>`
    }
    if (this.showQuantity && this.product?.quantity) {
      return `<div
        class="s-product-card-quantity">${this.remained} ${salla.helpers.number(this.product?.quantity)}</div>`
    }
    if (this.showQuantity && this.product?.is_out_of_stock) {
      return `<div class="s-product-card-out-badge">${this.outOfStock}</div>`
    }
    return '';
  }

  getPriceFormat(price) {
    if (!price || price == 0) {
      return salla.config.get('store.settings.product.show_price_as_dash')?'-':'';
    }

    return salla.money(price);
  }

  getProductPrice() {
    let price = '';
    price = `
      <div class="flex whitespace-nowrap price-wrapper gap-4 items-center">
        <div class="${ this.product.is_on_sale ? '' : 'hidden' } price_is_on_sale space-x-2 rtl:space-x-reverse whitespace-nowrap">
            <h4 class="total-price text-red-800 font-bold text-xl inline-block">${this.getPriceFormat(this.product.sale_price)}</h4>
            <span class="before-price text-gray-500 line-through">${this.getPriceFormat(this.product.regular_price)}</span>
        </div>
        <div class="starting-or-normal-price gap-4 ${ this.product.is_on_sale ? 'hidden' : 'flex' }">
            ${this.product.starting_price ? `<span class="starting-price-title">${this.startingPrice}</span>`: ``}
            <h2 class="total-price font-bold text-xl inline-block"> ${this.getPriceFormat(this.product.starting_price ? this.product.starting_price : this.product.price)}</h2>
        </div>
      </div>
      <div class="out-of-stock min-h-7 leading-7 hidden text-base text-red-600 !opacity-50 font-bold">${this.outOfStock}</div>
    `
    return price;
  }

  getAddButtonLabel() {
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

  getProps(){

    /**
     *  Horizontal card.
     */
    this.horizontal = this.hasAttribute('horizontal');
  
    /**
     *  Support shadow on hover.
     */
    this.shadowOnHover = this.hasAttribute('shadowOnHover');
  
    /**
     *  Hide add to cart button.
     */
    this.hideAddBtn = this.hasAttribute('hideAddBtn');
  
    /**
     *  Full image card.
     */
    this.fullImage = this.hasAttribute('fullImage');
  
    /**
     *  Minimal card.
     */
    this.minimal = this.hasAttribute('minimal');
  
    /**
     *  Special card.
     */
    this.isSpecial = this.hasAttribute('isSpecial');
  
    /**
     *  Show quantity.
     */
    this.showQuantity = this.hasAttribute('showQuantity');
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  render(){
    this.classList.add('s-product-card-entry'); 
    this.setAttribute('id', this.product.id);
    !this.horizontal && !this.fullImage && !this.minimal? this.classList.add('s-product-card-vertical') : '';
    this.horizontal && !this.fullImage && !this.minimal? this.classList.add('s-product-card-horizontal') : '';
    this.fitImageHeight && !this.isSpecial && !this.fullImage && !this.minimal? this.classList.add('s-product-card-fit-height') : '';
    this.isSpecial? this.classList.add('s-product-card-special') : '';
    this.fullImage? this.classList.add('s-product-card-full-image') : '';
    this.minimal? this.classList.add('s-product-card-minimal') : '';
    this.product?.donation?  this.classList.add('s-product-card-donation') : '';
    this.shadowOnHover?  this.classList.add('s-product-card-shadow') : '';
    this.product?.is_out_of_stock?  this.classList.add('s-product-card-out-of-stock') : '';
    this.isInWishlist = !salla.config.isGuest() && salla.storage.get('salla::wishlist', []).includes(this.product.id);

    this.innerHTML = `
        <div class="${!this.fullImage ? 's-product-card-image' : 's-product-card-image-full'}">
          <a href="${this.product?.url}">
            ${productcard_images && this.product.images?.length > 1 ? 
              `<div class="product-slider"></div>` :
              `<img class="s-product-card-image-${salla.url.is_placeholder(this.product?.image?.url)
                ? 'contain'
                : this.fitImageHeight
                  ? this.fitImageHeight
                  : 'cover'} lazy"
                src=${this.placeholder}
                alt=${this.product?.image?.alt}
                data-src=${this.product?.image?.url || this.product?.thumbnail}
              /> `
            }
              
            ${!this.fullImage && !this.minimal ? this.getProductBadge() : ''}
            ${this.product.has_3d_image || productcard_show_3d_icon ? '<span class="sicon-d-rotate s-product-card-3d-icon"></span>' : ''}
          </a>
          ${this.fullImage ? `<a href="${this.product?.url}" aria-label=${this.product.name} class="s-product-card-overlay"></a>`:''}
          ${!this.horizontal && !this.fullImage ?
            `<salla-button
              shape="icon"
              fill="outline"
              color="light"
              name="product-name-${this.product.id}"
              aria-label="Add or remove to wishlist"
              class="s-product-card-wishlist-btn z-1 animated ${this.isInWishlist ? 's-product-card-wishlist-added pulse-anime' : 'not-added un-favorited'}"
              onclick="salla.wishlist.toggle(${this.product.id})"
              data-id="${this.product.id}">
              <i class="sicon-heart"></i>
            </salla-button>` : ``
          }
        </div>


         <form class="content-wrap donating-wrap form product-form" 
            enctype="multipart/form-data" 
            method="post" 
            onchange="salla.product.getPrice(new FormData(event.currentTarget))"
            onsubmit="return salla.form.onSubmit('cart.addItem', event)"
            >
          <input type="hidden" name="id" value="${this.product.id}">
          <input type="hidden" name="quantity" value="1">

          <div class="s-product-card-content">
            ${this.isSpecial && this.product?.quantity ?
              `<div class="s-product-card-content-pie">
                <span>
                  <b>${salla.helpers.number(this.product?.quantity)}</b>
                  ${this.remained}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -1 36 34" class="s-product-card-content-pie-svg">
                  <circle cx="16" cy="16" r="15.9155" class="s-product-card-content-pie-svg-base" />
                  <circle cx="16" cy="16" r="15.9155" class="s-product-card-content-pie-svg-bar" />
                </svg>
              </div>`
              : ``}

            <div class="s-product-card-content-main ${this.isSpecial ? 's-product-card-content-extra-padding' : ''}">
              <h3 class="s-product-card-content-title">
                <a href="${this.product?.url}">${this.product?.name}</a>
              </h3>

              ${this.product?.subtitle && !this.minimal ?
                `<p class="s-product-card-content-subtitle opacity-80">${this.product?.subtitle}</p>`
                : ``}
            </div>
            ${this.product?.donation && !this.minimal && !this.fullImage ?
            `<salla-progress-bar donation=${JSON.stringify(this.product?.donation)}></salla-progress-bar>
            <div class="s-product-card-donation-input">
              ${this.product?.donation?.can_donate ?
                `<label for="donation-amount-${this.product.id}">${this.donationAmount} <span>*</span></label>
                <input
                  type="text"
                  onInput="${e => {
                    salla.helpers.inputDigitsOnly(e.target);
                    this.addBtn.donatingAmount = (e.target).value;
                  }}"
                  id="donation-amount-${this.product.id}"
                  name="donating_amount"
                  class="s-form-control"
                  placeholder="${this.donationAmount}" />`
                : ``}
            </div>`
              : ''}
            <div class="s-product-card-content-sub ${this.isSpecial ? 's-product-card-content-extra-padding' : ''}">
              ${this.product?.donation?.can_donate ? '' : this.getProductPrice()}
              ${this.product?.rating?.stars && !this.minimal ?
                `<div class="s-product-card-rating">
                  <i class="sicon-star2 before:text-orange-300"></i>
                  <span>${this.product.rating.stars}</span>
                </div>`
                : ``}
            </div>

            <div class="product-options"></div>

            ${this.isSpecial && this.product.discount_ends
              ? `<salla-count-down date="${this.formatDate(this.product.discount_ends)}" end-of-day=${true} boxed=${true}
                labeled=${true} />`
              : ``}


            ${!this.hideAddBtn ?
              `<div class="s-product-card-content-footer gap-2">
                <salla-add-product-button 
                  fill="outline" 
                  width="wide"
                  quick-buy
                  type="submit"
                  product-id="${this.product.id}"
                  product-status="${this.product.status}"
                  product-type="${this.product.type}">
                  ${this.product.status == 'sale' ? 
                      `<i class="text-base sicon-${ this.product.type == 'booking' ? 'calendar-time' : 'shopping-bag'}"></i>` : ``
                    }
                  <span>${this.product.add_to_cart_label ? this.product.add_to_cart_label : this.getAddButtonLabel() }</span>
                </salla-add-product-button>

                ${this.horizontal || this.fullImage ?
                  `<salla-button 
                    shape="icon" 
                    fill="outline" 
                    color="light" 
                    id="card-wishlist-btn-${this.product.id}-horizontal"
                    aria-label="Add or remove to wishlist"
                    class="s-product-card-wishlist-btn z-1 animated ${this.isInWishlist ? 's-product-card-wishlist-added pulse-anime' : 'not-added un-favorited'}"
                    onclick="salla.wishlist.toggle(${this.product.id})"
                    data-id="${this.product.id}">
                    <i class="sicon-heart"></i> 
                  </salla-button>`
                  : ``}
              </div>`
              : ``}
          </div>
        </form>
      `

    this.querySelectorAll('[name="donating_amount"]').forEach((element)=>{
      element.addEventListener('input', (e) => {
        e.target
          .closest(".s-product-card-content")
          .querySelector("salla-add-product-button")
          .setAttribute("donating-amount", e.target.value); 
      });
    })

    document.lazyLoadInstance?.update(this.querySelectorAll('.lazy'));

    if (this.product?.quantity && this.isSpecial) {
      this.initCircleBar();
    }
 

    if(productcard_images && this.product.images.length > 1 && this.querySelector('.product-slider')){
      this.renderImages(this.product.images)
    }

    if(productcard_options && this.product.options && this.querySelector('.product-options')){
      this.renderOptions(this.product.options)
    }
 

  }
}

customElements.define('custom-salla-product-card', ProductCard);