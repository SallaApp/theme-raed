import BasePage from './base-page';

class GuestWishlist extends BasePage {

    onReady() {
        this.emptyEl = document.getElementById('guest-wishlist-empty');
        this.itemsEl = document.getElementById('guest-wishlist-items');
        this.loadingEl = document.getElementById('guest-wishlist-loading');

        this.loadGuestWishlist();
    }

    registerEvents() {
        salla.wishlist.event.onRemoved((response, id) => {
            let item = document.querySelector('#guest-wishlist-product-' + id);
            if (! item) {
                return;
            }

            item.style.height = item.offsetHeight + 'px';
            void item.offsetWidth;
            item.classList.add('fade-out-collapse');

            item.addEventListener('transitionend', (e) => {
                if (e.propertyName === 'opacity') {
                    item.remove();
                    // If no items left, show empty state
                    if (! this.itemsEl.querySelector('.product-entry')) {
                        this.showEmpty();
                    }
                }
            });
        });
    }

    async loadGuestWishlist() {
        let guestItems = salla.storage.getWithTTL('salla::guest-wishlist', []);

        if (! guestItems.length) {
            this.showEmpty();
            return;
        }

        try {
            // Fetch product details for the stored IDs via the public products API
            let response = await salla.product.api.fetch({
                source: 'selected',
                source_value: guestItems,
            });

            let products = response?.data || [];

            if (! products.length) {
                this.showEmpty();
                return;
            }

            this.renderProducts(products);
        } catch (e) {
            salla.logger.warn('guest-wishlist: failed to fetch products', e);
            this.showEmpty();
        }
    }

    escapeHTML(str = '') {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    renderProducts(products) {
        this.loadingEl.classList.add('hidden');
        this.itemsEl.classList.remove('hidden');

        products.forEach(product => {
            let card = this.createProductCard(product);
            this.itemsEl.appendChild(card);
        });
    }

    createProductCard(product) {
        let card = document.createElement('div');
        card.id = 'guest-wishlist-product-' + product.id;
        card.classList.add('product-entry', 'product-entry--wishlist');

        // Image
        let imageLink = document.createElement('a');
        imageLink.href = product.url;
        imageLink.classList.add('product-entry__image');
        let img = document.createElement('img');
        img.classList.add('object-cover', 'w-full', 'h-full');
        img.src = product.image?.url || '';
        img.alt = this.escapeHTML(product.image?.alt || product.name);
        img.loading = 'lazy';
        imageLink.appendChild(img);

        // Product info
        let infoDiv = document.createElement('div');
        infoDiv.classList.add('flex-1', 'rtl:pr-5', 'ltr:pl-5');

        let nameH3 = document.createElement('h3');
        nameH3.classList.add('text-sm', 'text-gray-800', 'leading-6', 'mb-1.5', 'rtl:pl-5', 'ltr:pr-5', 'rtl:md:pl-8', 'ltr:md:pr-8', 'line-clamp-1');
        let nameLink = document.createElement('a');
        nameLink.href = product.url;
        nameLink.textContent = product.name;
        nameH3.appendChild(nameLink);
        infoDiv.appendChild(nameH3);

        let priceWrapper = document.createElement('div');
        priceWrapper.classList.add('w-full', 'center-between');
        if (product.is_on_sale) {
            let saleContainer = document.createElement('div');
            saleContainer.classList.add('space-x-1', 'rtl:space-x-reverse');
            let salePrice = document.createElement('h4');
            salePrice.classList.add('inline-block', 'text-sm', 'font-bold', 'text-red-400');
            salePrice.textContent = salla.money(product.sale_price);
            let regularPrice = document.createElement('span');
            regularPrice.classList.add('text-sm', 'text-gray-500', 'line-through');
            regularPrice.textContent = salla.money(product.regular_price);
            saleContainer.appendChild(salePrice);
            saleContainer.appendChild(regularPrice);
            priceWrapper.appendChild(saleContainer);
        } else {
            let price = document.createElement('h4');
            price.classList.add('text-sm', 'font-bold');
            price.textContent = salla.money(product.price);
            priceWrapper.appendChild(price);
        }
        infoDiv.appendChild(priceWrapper);

        // Left section (image + info)
        let leftSection = document.createElement('div');
        leftSection.classList.add('flex', 'items-center', 'mb-4', 'sm:mb-0');
        leftSection.appendChild(imageLink);
        leftSection.appendChild(infoDiv);

        // Actions section
        let actionsDiv = document.createElement('div');
        actionsDiv.classList.add('flex', 'items-center', 'space-x-4', 'rtl:space-x-reverse');

        let addToCartBtn = document.createElement('salla-add-product-button');
        addToCartBtn.setAttribute('product-status', product.status);
        addToCartBtn.setAttribute('product-id', product.id);
        addToCartBtn.setAttribute('product-type', product.type);
        addToCartBtn.setAttribute('loader-position', 'center');
        addToCartBtn.setAttribute('fill', 'outline');
        addToCartBtn.classList.add('flex-grow', 'w-full', 'sm:grow-0', 'md:w-40');
        actionsDiv.appendChild(addToCartBtn);

        let removeBtn = document.createElement('salla-button');
        removeBtn.setAttribute('loader-position', 'center');
        removeBtn.setAttribute('shape', 'icon');
        removeBtn.setAttribute('size', 'small');
        removeBtn.setAttribute('color', 'danger');
        removeBtn.classList.add('btn--delete');
        removeBtn.addEventListener('click', () => salla.wishlist.remove(product.id));
        let removeIcon = document.createElement('i');
        removeIcon.classList.add('sicon-cancel');
        removeBtn.appendChild(removeIcon);
        actionsDiv.appendChild(removeBtn);

        card.appendChild(leftSection);
        card.appendChild(actionsDiv);

        return card;
    }

    showEmpty() {
        this.loadingEl.classList.add('hidden');
        this.itemsEl.classList.add('hidden');
        this.emptyEl.classList.remove('hidden');
    }
}

GuestWishlist.initiateWhenReady();
