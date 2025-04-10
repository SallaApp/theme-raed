/**
 * Validates product options for items in the cart.
 */
export function validateProductOptions() {
    const cartItems = document.querySelectorAll('.main-content form:not(.cart-options form)');
    if (!cartItems.length) return;
    cartItems.forEach((item) => {
        const itemId = getItemId(item);
        const productOptions = item.querySelector('salla-product-options');
        const quantityComponent = item.querySelector('salla-quantity-input');

        if (quantityComponent) {
            observeQuantityChanges(quantityComponent, itemId, item);
        }

        // Listen for product options changes
        if (productOptions) {
            productOptions.addEventListener('changed', (e) => {
                setTimeout(() => {
                    if (!item.reportValidity() || e.detail?.event?.type == 'added') return;
                    if ((Number(itemId) === Number(e.detail?.productId))) {
                        appendLoadingOverlay(e.detail?.productId);
                    }
                }, 100);
            });
        }
    });

    // Event handlers for cart updates
    salla.cart.event.onItemUpdated((_data, id) => {
        removeLoadingOverlay(id);
    });

    salla.cart.event.onItemUpdatedFailed((_data, itemId) => {
        handleCartUpdateFailure(itemId, cartItems);
    });
}

/**
 * Observes changes in quantity input for a specific cart item.
 */
function observeQuantityChanges(quantityComponent, itemId, item) {
    const observer = new MutationObserver(() => {
        const quantityInput = quantityComponent.querySelector('input[name="quantity"]');
        if (quantityInput) {
            observer.disconnect(); // Stop observing once input is found
            quantityInput.addEventListener('change', (e) => {
                if (!item.reportValidity()) return;
                if (Number(itemId) === Number(e.detail?.productId)) {
                    appendLoadingOverlay(e.detail?.productId);
                }
            });
        }
    });
    observer.observe(quantityComponent, { childList: true, subtree: true });
}

/**
 * Handles cart update failures by restoring the item state.
 */
function handleCartUpdateFailure(itemId, cartItems) {
    return salla.api.cart
        .getCurrentCartId(false, "salla-product-options")
        .then((cartId) => salla.cart.details(cartId, ['options']))
        .then(({ data: { cart: cartDetails } }) => {
            const currentProduct = cartDetails.items.find(item => Number(item.id) === Number(itemId));
            if (!currentProduct) throw new Error(`Product with ID ${itemId} not found in cart details.`);
            updateCartItemState(cartItems, currentProduct);
        })
        .then(() => removeLoadingOverlay())
        .catch(error => {
            console.error("Error restoring cart item state:", error);
            removeLoadingOverlay();
        });
}

/**
 * Updates the UI for a specific cart item based on its current state.
 */
function updateCartItemState(cartItems, currentProduct) {
    cartItems.forEach((item) => {
        const ID = getItemId(item);
        if (Number(currentProduct.id) === Number(ID)) {
            const productOptions = item.querySelector('salla-product-options');
            const quantityInput = item.querySelector('salla-quantity-input');
            if (productOptions) productOptions.setOptionsData(currentProduct.options, false);
            if (quantityInput) quantityInput.setValue(currentProduct.quantity, false);
        }
    });
}

/**
 * Appends a loading overlay to the cart item with the given ID.
 */
function appendLoadingOverlay(itemId) {
    if (!itemId) return;

    const loadingOverlay = createLoadingOverlay();
    const parentElement = document.querySelector(`#item-${itemId} .cart-item`);
    if (parentElement) {
        parentElement.appendChild(loadingOverlay);
    }
}

/**
 * Removes the loading overlay from a specific cart item or all items if no ID is provided.
 */
function removeLoadingOverlay(itemId) {
    const targetItems = itemId
        ? [document.querySelector(`.main-content form:not(.cart-options form)#item-${itemId} .cart-item`)]
        : document.querySelectorAll('.main-content form:not(.cart-options form) .cart-item');

    targetItems.forEach((item) => {
        const loadingOverlay = item?.querySelector('.loading-overlay');
        if (loadingOverlay) {
            setTimeout(() => loadingOverlay.remove(), 0);
        }
    });
}

/**
 * Creates a loading overlay element.
 */
function createLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('loading-overlay', 'absolute', 'inset-0', 'z-50', 'flex', 'justify-center', 'items-center');

    const background = document.createElement('div');
    background.classList.add('absolute', 'inset-0', 'bg-white', 'opacity-40');

    const loader = document.createElement('div');
    loader.innerHTML = '<salla-loading size="32"></salla-loading>';
    loader.classList.add('relative', 'z-10');

    overlay.appendChild(background);
    overlay.appendChild(loader);

    return overlay;
}

/**
 * Extracts the item ID from a cart item element.
 */
function getItemId(item) {
    return item.querySelector('input[type="hidden"][name="id"]')?.value;
}
