class ProductCard extends HTMLElement {

  static observedAttributes = ['product'];

  constructor() {
    super();
    try {
      this.product = JSON.parse(this.getAttribute('product'));
    } catch (e) {
      salla.log('invalid json passed to salla-product-card');
    }
    this.isSpecial = this.hasAttribute('is-special');
    this.countDownDate = this.getAttribute('count-down-date');
    this.fit_type = salla.helpers.url.is_placeholder(this.product?.image?.url)
      ? 'contain'
      : salla.config.get('store.settings.product.fit_type', 'cover');
  }

  connectedCallback() {
    if (!this.product) {
      //do nothing
      return;
    }
    this.id = "product-" + this.product.id;
    this.classList.add('product-entry');
    this.product.is_out_of_stock && this.classList.add('out-of-stock');
    this.innerHTML = this.imageSlot() + this.detailsSlot();
  }

  imageSlot() {
    return `<div class="product-entry__image">
      <a href=${this.product.url}>
        <img class="h-full w-full lazy object-${this.fit_type}"
          src="${salla.url.asset('images/s-empty.png')}"
          data-src="${this.product.image.url}"
          alt="${this.product.image.alt}"
        />
        ${this.imagePromotionSlot()}
      </a>

      <salla-button
        shape="icon"
        fill="none"
        color="light"
        aria-label="Add or remove to wishlist"
        class="btn--wishlist animated hidden"
        onclick="salla.wishlist.toggle(${this.product.id})"
        data-id="${this.product.id}">
        <i class="sicon-heart text-xl"></i>
      </salla-button>
    </div>`;
  }

  imagePromotionSlot() {
    return this.product.promotion_title
      ? `<div class="product-entry__promotion_title absolute top-4 start-0 z-1 font-bold px-2.5 py-1.5 md:py-2 text-xs bg-red-400 text-white rounded-e-md">
            ${this.product.promotion_title.promotion_title}
          </div>`
      : '';
  }


  detailsSlot() {
    return `<div class="product-entry__details p-3 sm:p-5 flex flex-col relative">
              ${this.remainingQuantitySlot()}
              <div class="product-entry__title-wrap">
                <h3 class="product-entry__title mb-2.5 leading-6 max-w-full">
                  <a href="${this.product.url}">${this.product.name}</a>
                </h3>
                ${this.subTitleSlot()}
              </div>
              ${this.donationSlot()}
              <div class="product-entry__price-wrap w-full center-between mb-5">
                ${this.priceSlot()}
                ${this.ratingSlot()}
              </div>
              ${this.countDownSlot()}
              ${this.addToCartButton()}
            </div>`
  }

  remainingQuantitySlot() {
    let quantity = this.product.quantity;
    return (this.isSpecial && quantity)
      ? `<div data-quantity="${quantity}" data-total="${quantity > 100 ? quantity * 2 : 100}" class="pie-wrapper">
          <span>
              <b id="staProductQty" title="${salla.helpers.number(quantity)}"
                 data-quantity="${quantity}">
                  ${salla.helpers.number(quantity)}
              </b>
            ${salla.lang.get('pages.products.remained')}
          </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -1 36 34" class="pie-svg">
          <circle cx="16" cy="16" r="15.9155" class="circle_base"/>
          <circle cx="16" cy="16" r="15.9155" class="circle_bar"/>
        </svg>
      </div>`
      : '';
  }

  subTitleSlot() {
    return this.product.subtitle
      ? `<p class="text-sm text-gray-400 leading-6 mb-2.5">${this.product.subtitle}</p>`
      : '';
  }

  donationSlot() {
    if (this.product.type !== 'donation') {
      return '';
    }
    return `<salla-progress-bar donation="${this.product.donation}"/>`
      + (this.product.can_donate
          ? `<div class="border-color mb-2.5 w-full">
                <label for="donation-amount" class="block text-sm mb-2.5">
                  ${salla.lang.get('pages.products.donation_amount')} <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  onInput="function(e){salla.helpers.inputDigitsOnly(e.target)}"
                  id="donation-amount"
                  name="donating_amount"
                  class="h-9 form-input"
                  placeholder="${salla.lang.get('pages.products.donation_amount')}"/>
            </div>`
          : ''
      );
  }


  priceSlot() {
    if (this.product.is_on_sale) {
      return `<div class="space-s-1">
          <h4 class="text-red-400 font-bold text-sm inline-block">${salla.helpers.money(this.product.sale_price)}</h4>
          <span class="text-sm text-gray-400 line-through">${salla.helpers.money(this.product.regular_price)}</span>
        </div>`;
    }

    if (this.product.starting_price) {
      return salla.lang.get('pages.products.starting_price')
        + `<h4 class="text-red-400 font-bold text-sm inline-block">${salla.helpers.money(this.product.starting_price)}</h4>`
    }

    return `<h4 class="font-bold text-sm">${salla.helpers.money(this.product.price)}</h4>`;
  }

  ratingSlot() {
    return this.product.rating
      ? `<div class="product-rating text-sm text-gray-400">
        <i class="sicon-star2 text-amber-400"/>
        <span>"${salla.helpers.number(this.product.rating)}"</span>
      </div>`
      : '';
  }

  countDownSlot() {
    return this.countDownDate
      ? `<salla-count-down date="${this.countDownDate}" boxed labeled></salla-count-down>`
      : '';
  }

  addToCartButton() {
    return `<div class="product-entry__buy-wrap flex items-center mt-auto">
              <salla-add-product-button class="btn--add-to-cart" fill="outline" width="wide"
                                        product-id="${this.product.id}"
                                        product-status="${this.product.status}"
                                        product-type="${this.product.type}">
                ${this.product.add_to_cart_label}
              </salla-add-product-button>
              <salla-button
                shape="icon"
                fill="none"
                color="light"
                aria-label="Add or remove to wishlist"
                class="btn--wishlist animated hidden"
                onclick="salla.wishlist.toggle(${this.product.id})"
                data-id="${this.product.id}">
                <i class="sicon-heart text-xl"/>
              </salla-button>
            </div>`;
  }
}

salla.onReady(() => window.customElements.define('salla-product-card', ProductCard));