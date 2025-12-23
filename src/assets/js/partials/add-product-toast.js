class AddToCartToast extends HTMLElement {
  constructor() {
    super();
    this.isVisible = false;
    this.isAnimating = false;
    this.progressInterval = null;
    this.remainingTime = 0;
    this.isPaused = false;
    this.duration = 5000; // 5 seconds
    this.maxVisibleOptions = 3;
    this.showAllOptions = false;
  }

  connectedCallback() {
    if (window.app?.status === "ready") {
      this.onReady();
    } else {
      document.addEventListener("theme::ready", () => this.onReady());
    }
  }

  disconnectedCallback() {
    this.clearTimers();
  }

  onReady() {
    salla.lang.onLoaded(() => {
      salla.lang.addBulk({
        "pages.cart.added_to_cart": {
          ar: "تمت الإضافة إلي سلة التسوق",
          en: "Added to Cart",
        },
        "pages.cart.view_cart": { ar: "عرض السلة", en: "View Cart" },
      });
      this.successMessage = salla.lang.get("pages.cart.added_to_cart");
      this.viewCartText = salla.lang.get("pages.cart.view_cart");
      this.checkoutText = salla.lang.get("pages.cart.complete_order");
      this.showMoreText = salla.lang.get("pages.checkout.show_more");
    });

    this.cartUrl = salla.url.get("cart");
    this.checkoutUrl = salla.url.get("checkout");
    this.isRtl = salla.config.get("theme.is_rtl", true);
    this.checkIconUrl = salla.url.asset("images/check.svg");

    // Listen to 'Product Added' analytics event
    salla.event.on("Product Added", (data) => {
      this.handleProductAdded(data);
    });

    this.render();
  }

  async handleProductAdded(analyticsData) {
    try {
      // Extract cart_item_id from analytics data
      const items = analyticsData || [];
      if (items.length === 0) {
        salla.log("No items in analytics data");
        return;
      }

      const addedItem = items[0];
      const cartItemId = addedItem.cart_item_id;

      if (!cartItemId) {
        salla.log("No cart_item_id found in analytics data");
        return;
      }

      // Fetch cart details with options
      const cartResponse = await salla.cart.api.details(null, ["options"]);

      if (!cartResponse?.data?.cart?.items) {
        salla.log("No cart items found");
        return;
      }

      // Find the added item by cart_item_id
      const cartItem = cartResponse.data.cart.items.find(
        (item) => item.id === cartItemId
      );

      if (!cartItem) {
        salla.log("Cart item not found with id:", cartItemId);
        return;
      }

      // Extract and format product data
      const productData = {
        id: cartItem.product_id,
        name: cartItem.product_name,
        image: cartItem.product_image,
        price: cartItem.price, // Discounted price per unit
        originalPrice: cartItem.original_price, // Original price per unit
        hasDiscount: cartItem.has_discount,
        isOnSale: cartItem.is_on_sale,
        quantity: cartItem.quantity,
        url: cartItem.url,
        options: this.extractOptionsFromCart(cartItem.options),
        offer: cartItem.offer,
      };

      this.open(productData);
    } catch (error) {
      salla.log("Error processing product added event:", error);
    }
  }

  extractOptionsFromCart(options) {
    if (!options || !Array.isArray(options) || options.length === 0) {
      return [];
    }

    const extractedOptions = [];

    options.forEach((option) => {
      // Skip splitter type as it's just a visual separator
      if (option.type === "splitter") {
        return;
      }

      // For options with details (color, thumbnail, single-option, multiple-options)
      if (option.details && option.details.length > 0) {
        if (option.type === "multiple-options") {
          // Handle multiple selections
          const selectedDetails = option.details.filter(
            (detail) => detail.is_selected
          );
          if (selectedDetails.length > 0) {
            const values = selectedDetails
              .map((detail) => detail.name)
              .join(", ");
            extractedOptions.push({
              name: option.name,
              value: values,
            });
          }
        } else {
          // Handle single selection (color, thumbnail, single-option)
          const selectedDetail = option.details.find(
            (detail) => detail.is_selected
          );
          if (selectedDetail) {
            extractedOptions.push({
              name: option.name,
              value: selectedDetail.name,
            });
          }
        }
      } else if (option.value !== null && option.value !== "") {
        // For options without details (text, textarea, number, datetime, image, file, map)
        // For image/file/map types, show only the field name without the value
        if (
          option.type === "image" ||
          option.type === "file" ||
          option.type === "map"
        ) {
          extractedOptions.push({
            name: option.name,
            value: "",
            hideValue: true,
          });
        } else {
          extractedOptions.push({
            name: option.name,
            value: option.value,
          });
        }
      }
    });

    return extractedOptions;
  }

  open(productData) {
    this.product = productData;
    this.progressPercent = 100;
    this.isVisible = true;
    this.isAnimating = false;

    // Add positioning classes to host element
    this.classList.add(
      this.isRtl ? "s-add-product-toast-rtl" : "s-add-product-toast-ltr"
    );

    // Render the DOM first without animation
    this.updateDOM();

    // Small delay to trigger CSS transition animation
    setTimeout(() => {
      this.isAnimating = true;
      this.classList.add("s-add-product-toast-visible");
      this.updateDOM();
    }, 50);

    this.startAutoHideTimer();
  }

  close() {
    this.clearTimers();
    this.isAnimating = false;
    this.classList.remove("s-add-product-toast-visible");

    // Wait for animation to complete before hiding
    setTimeout(() => {
      this.isVisible = false;
      this.product = null;
      this.classList.remove(
        "s-add-product-toast-rtl",
        "s-add-product-toast-ltr"
      );
      this.updateDOM();
    }, 300);
  }

  startAutoHideTimer() {
    this.clearTimers();
    this.isPaused = false;
    this.remainingTime = this.duration;
    this.progressPercent = 100;

    const updateInterval = 50;

    // Update progress bar every 50ms
    this.progressInterval = setInterval(() => {
      if (this.isPaused) return;

      this.remainingTime = Math.max(0, this.remainingTime - updateInterval);
      this.progressPercent = (this.remainingTime / this.duration) * 100;

      // Update progress bar
      const progressBar = this.querySelector(
        ".s-add-product-toast-progress-bar"
      );
      if (progressBar) {
        progressBar.style.width = `${this.progressPercent}%`;
      }

      if (this.remainingTime <= 0) {
        this.close();
      }
    }, updateInterval);
  }

  clearTimers() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  pauseTimer() {
    this.isPaused = true;
  }

  resumeTimer() {
    this.isPaused = false;
  }

  handleMouseEnter() {
    this.pauseTimer();
  }

  handleMouseLeave() {
    this.resumeTimer();
  }

  formatPrice(price) {
    return salla.money(price);
  }

  getVisibleOptions() {
    if (!this.product?.options) return [];
    return this.product.options.slice(0, this.maxVisibleOptions);
  }

  hasMoreOptions() {
    return (this.product?.options?.length || 0) > this.maxVisibleOptions;
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

    const visibleOptions = this.getVisibleOptions();
    const hasMore = this.hasMoreOptions();

    this.innerHTML = `
      <div class="s-add-product-toast-wrapper">
        <!-- Progress bar -->
        <div class="s-add-product-toast-progress">
          <div class="s-add-product-toast-progress-bar" style="width: ${
            this.progressPercent
          }%"></div>
        </div>

        <!-- Header -->
        <div class="s-add-product-toast-header">
        <div class="s-add-product-toast-header-content">
        <span class="s-add-product-toast-icon">
          <img src="${
            this.checkIconUrl
          }" alt="Success" width="16" height="16" />
        </span>
          <span class="s-add-product-toast-title">${this.successMessage}</span>
        </div>
          <button type="button" class="s-add-product-toast-close" aria-label="Close">
            <i class="sicon-cancel"></i>
          </button>
        </div>

        <!-- Divider -->
        <div class="s-add-product-toast-divider"></div>

        <!-- Product info -->
        <div class="s-add-product-toast-body">
          <div class="s-add-product-toast-product">
         
    <!-- Product image -->
            <a href="${
              this.product.url
            }" class="s-add-product-toast-image-link">
              <img 
                src="${this.product.image}" 
                alt="${this.escapeHTML(this.product.name)}"
                class="s-add-product-toast-image"
                loading="lazy"
              />
            </a>
            <!-- Product details -->
            <div class="s-add-product-toast-details">
              <a href="${
                this.product.cartUrl
              }" class="s-add-product-toast-name">${this.escapeHTML(
      this.product.name
    )}</a>

              <!-- Options -->
              ${
                visibleOptions.length > 0
                  ? `
                <div class="s-add-product-toast-options">
                  ${visibleOptions
                    .map((option) =>
                      option.hideValue
                        ? `<span class="s-add-product-toast-option">${option.name}</span>`
                        : `<span class="s-add-product-toast-option">${option.name}: ${option.value}</span>`
                    )
                    .join("")}
                  ${
                    hasMore
                      ? `
                    <a href="${this.cartUrl}" class="s-add-product-toast-show-more">
                      ${this.showMoreText}
                    </a>
                  `
                      : ""
                  }
                </div>
              `
                  : ""
              }
            </div>

           <!-- Price -->
            <div class="s-add-product-toast-price-wrapper">
              ${
                this.product.hasDiscount || this.product.isOnSale
                  ? `
                <div class="s-add-product-toast-price-sale">
                  <div class="s-add-product-toast-price sale">${this.formatPrice(
                    this.product.price
                  )}</div>
                  <div class="s-add-product-toast-price-original">${this.formatPrice(
                    this.product.originalPrice
                  )}</div>
                </div>
                `
                  : `<div class="s-add-product-toast-price">${this.formatPrice(
                      this.product.price
                    )}</div>`
              }
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="s-add-product-toast-actions">
        <salla-button id="toast-cart-submit" loader-position="center" width="wide" color="primary" fill="solid">
        <span>${this.checkoutText}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 16H11.5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.5 16L18 16" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 9H22" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
           
          </salla-button>
          <salla-button href="${this.cartUrl}" fill="outline" width="wide" color="gray">
          <span>${this.viewCartText}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.06164 14.4413L3.42688 12.2985C3.85856 9.76583 4.0744 8.49951 4.92914 7.74975C5.78389 7 7.01171 7 9.46734 7H14.5327C16.9883 7 18.2161 7 19.0709 7.74975C19.9256 8.49951 20.1414 9.76583 20.5731 12.2985L20.9384 14.4413C21.5357 17.946 21.8344 19.6983 20.9147 20.8491C19.995 22 18.2959 22 14.8979 22H9.1021C5.70406 22 4.00504 22 3.08533 20.8491C2.16562 19.6983 2.4643 17.946 3.06164 14.4413Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M7.5 9L7.71501 5.98983C7.87559 3.74176 9.7462 2 12 2C14.2538 2 16.1244 3.74176 16.285 5.98983L16.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            
          </salla-button>
        </div>
      </div>
    `;

    // Attach event listeners
    const closeBtn = this.querySelector(".s-add-product-toast-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    const submitBtn = this.querySelector("#toast-cart-submit");
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        salla.cart.submit();
        this.close();
      });
    }

  }

  render() {
    // Initial empty render
    this.innerHTML = "";
  }
}

customElements.define("salla-add-product-toast", AddToCartToast);
