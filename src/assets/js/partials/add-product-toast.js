class AddToCartToast extends HTMLElement {
  constructor() {
    super();
    this.classList.add("s-add-product-toast");
    this.isVisible = false;
    this.progressInterval = null;
    this.remainingTime = 0;
    this.isPaused = false;
    this.duration = 5000;
  }

  connectedCallback() {
    if (window.app?.status === "ready") {
      this.init();
    } else {
      document.addEventListener("theme::ready", () => this.init());
    }
  }

  disconnectedCallback() {
    this.clearTimers();
  }

  init() {
    salla.lang.onLoaded(() => {
      salla.lang.addBulk({
        "pages.cart.added_to_cart": { ar: "تمت الإضافة إلى سلة التسوق", en: "Added to Cart" },
        "pages.cart.view_cart": { ar: "عرض السلة", en: "View Cart" }
      });
      this.successMessage = salla.lang.get("pages.cart.added_to_cart");
      this.viewCartText = salla.lang.get("pages.cart.view_cart");
      this.checkoutText = salla.lang.get("pages.cart.complete_order");
      this.showMoreText = salla.lang.get("pages.checkout.show_more");
    });

    this.cartUrl = salla.url.get("cart");
    this.checkIconUrl = salla.url.asset("images/check.svg");

    salla.event.on("Product Added", (data) => this.handleProductAdded(data));
    this.render();
  }

  async handleProductAdded(analyticsData) {
    try {
      const items = analyticsData || [];
      if (!items.length) return;

      const cartItemId = items[0].cart_item_id;
      if (!cartItemId) return;

      const cartResponse = await salla.cart.api.details(null, ["options"]);
      if (!cartResponse?.data?.cart?.items) return;

      const cartItem = cartResponse.data.cart.items.find(item => item.id === cartItemId);
      if (!cartItem) return;

      this.open({
        id: cartItem.product_id,
        name: cartItem.product_name,
        image: cartItem.product_image,
        price: cartItem.total,
        originalPrice: cartItem.original_price * cartItem.quantity,
        hasDiscount: cartItem.has_discount,
        isOnSale: cartItem.is_on_sale,
        quantity: cartItem.quantity,
        url: cartItem.url,
        options: this.extractOptions(cartItem.options)
      });
    } catch (error) {
      salla.log("Error processing product added event:", error);
    }
  }

  extractOptions(options) {
    if (!options?.length) return [];

    return options.reduce((result, option) => {
      if (option.type === "splitter") return result;

      if (option.details?.length) {
        const selected = option.type === "multiple-options"
          ? option.details.filter(d => d.is_selected)
          : [option.details.find(d => d.is_selected)];

        if (selected[0]) {
          result.push({
            name: option.name,
            value: selected.map(d => d.name).join(", ")
          });
        }
      } else if (option.value) {
        const hideValue = ["image", "file", "map"].includes(option.type);
        result.push({ name: option.name, value: option.value, hideValue });
      }

      return result;
    }, []);
  }

  open(productData) {
    this.product = productData;
    this.progressPercent = 100;
    this.isVisible = true;

    this.updateDOM();

    requestAnimationFrame(() => {
      this.classList.add("s-add-product-toast--visible");
    });

    this.startAutoHideTimer();
  }

  close() {
    this.clearTimers();
    this.classList.remove("s-add-product-toast--visible");

    setTimeout(() => {
      this.isVisible = false;
      this.product = null;
      this.updateDOM();
    }, 300);
  }

  startAutoHideTimer() {
    this.clearTimers();
    this.isPaused = false;
    this.remainingTime = this.duration;
    this.progressPercent = 100;

    const updateInterval = 50;
    this.progressInterval = setInterval(() => {
      if (this.isPaused) return;

      this.remainingTime = Math.max(0, this.remainingTime - updateInterval);
      this.progressPercent = (this.remainingTime / this.duration) * 100;

      const progressBar = this.querySelector(".s-add-product-toast__progress-bar");
      if (progressBar) progressBar.style.width = `${this.progressPercent}%`;

      if (this.remainingTime <= 0) this.close();
    }, updateInterval);
  }

  clearTimers() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }


  escapeHTML(str = "") {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  updateDOM() {
    if (!this.isVisible || !this.product) {
      this.innerHTML = "";
      return;
    }

    const options = this.product.options || [];
    const visibleOptions = options.slice(0, 3);
    const showMoreButton = options.length > 3;
    const price = salla.money(this.product.price);
    const originalPrice = salla.money(this.product.originalPrice);

    this.setAttribute("onmouseenter", "this.isPaused=true");
    this.setAttribute("onmouseleave", "this.isPaused=false");

    this.innerHTML = `
      <div class="s-add-product-toast__progress">
        <div class="s-add-product-toast__progress-bar" style="width:${this.progressPercent}%"></div>
      </div>
      <div class="s-add-product-toast__header">
        <div class="s-add-product-toast__header-content">
          <img src="${this.checkIconUrl}" alt="Success" width="16" height="16" class="s-add-product-toast__icon" />
          <span class="s-add-product-toast__title">${this.successMessage}</span>
        </div>
        <button type="button" class="s-add-product-toast__close" aria-label="Close"><i class="sicon-cancel"></i></button>
      </div>
      <div class="s-add-product-toast__divider"></div>
      <div class="s-add-product-toast__body">
        <a href="${this.product.url}" class="s-add-product-toast__image">
          <img src="${this.product.image}" alt="${this.escapeHTML(this.product.name)}" loading="lazy" />
        </a>
        <div class="s-add-product-toast__details">
          <a href="${this.product.url}" class="s-add-product-toast__name">${this.escapeHTML(this.product.name)}</a>
          ${visibleOptions.length ? `
            <div class="s-add-product-toast__options">
              ${visibleOptions.map(opt => 
                opt.hideValue ? `<span>${opt.name}</span>` : `<span>${opt.name}: ${opt.value}</span>`
              ).join("")}
              ${showMoreButton ? `<a href="${this.cartUrl}" class="s-add-product-toast__show-more">${this.showMoreText}</a>` : ""}
            </div>
          ` : ""}
        </div>
        <div class="s-add-product-toast__price">
          ${this.product.hasDiscount || this.product.isOnSale
            ? `<div class="s-add-product-toast__price-sale">${price}</div><div class="s-add-product-toast__price-original">${originalPrice}</div>`
            : `<div>${price}</div>`
          }
        </div>
      </div>
      <div class="s-add-product-toast__actions">
        <salla-button id="toast-submit" loader-position="center" width="wide" color="primary" fill="solid">
          <span>${this.checkoutText}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 16H11.5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.5 16L18 16" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 9H22" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        </salla-button>
        <salla-button href="${this.cartUrl}" fill="outline" width="wide" color="gray">
          <span>${this.viewCartText}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3.06164 14.4413L3.42688 12.2985C3.85856 9.76583 4.0744 8.49951 4.92914 7.74975C5.78389 7 7.01171 7 9.46734 7H14.5327C16.9883 7 18.2161 7 19.0709 7.74975C19.9256 8.49951 20.1414 9.76583 20.5731 12.2985L20.9384 14.4413C21.5357 17.946 21.8344 19.6983 20.9147 20.8491C19.995 22 18.2959 22 14.8979 22H9.1021C5.70406 22 4.00504 22 3.08533 20.8491C2.16562 19.6983 2.4643 17.946 3.06164 14.4413Z" stroke="currentColor" stroke-width="1.5"/><path d="M7.5 9L7.71501 5.98983C7.87559 3.74176 9.7462 2 12 2C14.2538 2 16.1244 3.74176 16.285 5.98983L16.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </salla-button>
      </div>
    `;

    this.querySelector(".s-add-product-toast__close").addEventListener("click", () => this.close());
    this.querySelector("#toast-submit").addEventListener("click", () => {
      salla.cart.submit();
      this.close();
    });
  }

  render() {
    this.innerHTML = "";
  }
}

customElements.define("salla-add-product-toast", AddToCartToast);
