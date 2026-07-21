/**
 * Validates product options for items in the cart.
 *
 * Shows a loading overlay while cart.updateItem runs. Overlay must always be
 * cleared — including when IDs exceed Number.MAX_SAFE_INTEGER (snowflake cart
 * item ids) and when FilePond restores existing attachments on page load.
 */
const OVERLAY_TIMEOUT_MS = 15000;

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
                    if (!item.reportValidity() || isNonUserOptionEvent(e)) return;
                    // Compare as strings — Number() corrupts snowflake cart item ids.
                    if (!idsEqual(itemId, e.detail?.productId)) return;
                    // Form onchange uses checkValidity(); if it would skip the API
                    // call, never pin the overlay (otherwise it sticks forever).
                    if (!item.checkValidity()) return;
                    appendLoadingOverlay(itemId);
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

    // Fallback: any cart summary refresh should clear stray overlays (SP-21412).
    salla.event.cart.onUpdated(() => removeLoadingOverlay());
}

/**
 * FilePond / picker events that are not a user-driven cart-item edit.
 */
function isNonUserOptionEvent(e) {
    const type = e.detail?.event?.type;
    return type === 'added' || type === 'selected' || type === 'picked';
}

function idsEqual(a, b) {
    if (a == null || b == null) return false;
    return String(a) === String(b);
}

/**
 * Observes changes in quantity input for a specific cart item.
 */
function observeQuantityChanges(quantityComponent, itemId, item) {
    const observer = new MutationObserver(() => {
        const quantityInput = quantityComponent.querySelector('input[name="quantity"]');
        if (quantityInput) {
            observer.disconnect(); // Stop observing once input is found
            quantityInput.addEventListener('change', () => {
                if (!item.reportValidity() || !item.checkValidity()) return;
                appendLoadingOverlay(itemId);
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
            const currentProduct = cartDetails.items.find(item => idsEqual(item.id, itemId));
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
        if (idsEqual(currentProduct.id, ID)) {
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
    if (itemId == null || itemId === '') return;

    const id = String(itemId);
    const parentElement = document.querySelector(`#item-${CSS.escape(id)} .cart-item`);
    if (parentElement) {
        // Remove any existing overlay first to prevent stacking
        const existingOverlay = parentElement.querySelector('.loading-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        const loadingOverlay = createLoadingOverlay();
        parentElement.appendChild(loadingOverlay);

        // Safety net: never leave the veil forever if update events are missed.
        if (parentElement._sallaOverlayTimeout) {
            clearTimeout(parentElement._sallaOverlayTimeout);
        }
        parentElement._sallaOverlayTimeout = setTimeout(() => {
            parentElement.querySelector('.loading-overlay')?.remove();
            parentElement._sallaOverlayTimeout = undefined;
        }, OVERLAY_TIMEOUT_MS);
    }
}

/**
 * Removes the loading overlay from a specific cart item or all items if no ID is provided.
 */
function removeLoadingOverlay(itemId) {
    const targetItems = itemId != null && itemId !== ''
        ? [document.querySelector(`.main-content form:not(.cart-options form)#item-${CSS.escape(String(itemId))} .cart-item`)]
        : document.querySelectorAll('.main-content form:not(.cart-options form) .cart-item');

    targetItems.forEach((item) => {
        if (!item) return;
        if (item._sallaOverlayTimeout) {
            clearTimeout(item._sallaOverlayTimeout);
            item._sallaOverlayTimeout = undefined;
        }
        const loadingOverlay = item.querySelector('.loading-overlay');
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
