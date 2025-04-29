// offers.js

/**
 * Render the offers for a cart item.
 * @param {Object} item The cart item object.
 */
export function renderOffers(item) {
    const offers = item.detailed_offers;
    const visibleCount = 3;
    const container = document.getElementById(`offers_list_${item.id}`);
    
    if (!container || !offers.length) {
        container.innerHTML = '';
        return;
    }
    
    const collapsedId = `offers_${item.id}`;
    const visibleOffers = offers.slice(0, visibleCount);
    const restOffers = offers.slice(visibleCount);
  
    let html = '';
  
    // visable offers 
    visibleOffers.forEach((offer) => {
      html += renderOfferItem(offer, item);
    });
  
    // Show more toggle
    if (restOffers.length) {
      html += `
        <div class="mt-4">
          <button class="group btn--collapse text-sm !bg-transparent !px-0 !justify-start hover:text-dark"
                  type="button"
                  data-show="${collapsedId}">
            <i class="sicon-discount is-opened rtl:ml-1.5 ltr:mr-1.5"></i>
            <span class="flex items-center">
              +${restOffers.length} ${salla.lang.get('pages.checkout.show_more_offers')} 
              <i class="transition-transform duration-300 group-[.is-opened]:-rotate-180 mx-0.5 sicon-keyboard_arrow_down"></i>
            </span>
          </button>
        </div>
        <div class="h-0 overflow-hidden opacity-0 is-closed" id="${collapsedId}">
          ${restOffers.map(this.renderOfferItem(offer, item)).join('')}
        </div>
      `;
    }
  
    container.innerHTML = html;
    window.app.initiateCollapse();
}

/**
 * Render a single offer item.
 * @param {Object} offer The offer object.
 * @param {Object} item The cart item.
 */
function renderOfferItem(offer, item) {
  return `
    ${renderOfferBreakdown(offer, item)} 
    <div class="mt-4 text-green-600 flex items-start gap-2.5">
      <i class="${offer.discount_icon} font-bold -translate-y-0.5 text-lg"></i>
      <div>
        <p class="text-sm font-medium">
          ${salla.lang.get('pages.checkout.received_offer', {'offer': offer.offer_name})}
        </p>
        <p class="text-xs text-gray-400 font-small">   
          ${offer.offer_message}
        </p>
        <p class="text-xs mt-1 text-gray-400">
          ${salla.lang.get('pages.checkout.discount_amount', {'amount': salla.money(offer.discount_amount)})}
        </p>
      </div>
    </div> 
  `;
}

/**
 * Render the quantity breakdown (free/paid items ) of a single offer.
 * @param {Object} offer The offer object.
 * @param {Object} item The cart item.
 */
function renderOfferBreakdown(offer, item) {
  const quantity = item.quantity || 0; 
  const freeQty = offer.free_quantity || 0;
  const paidQty = quantity - freeQty;

  if (freeQty <= 0 || paidQty <= 0) return '';

  const itemPrice = salla.money(item.product_price); 

  return `
    <div class="font-medium mb-2 space-y-1 text-gray-700">
      <!-- Paid items -->
      <div class="text-start">
        ${salla.helpers.number(paidQty)} × ${itemPrice}
      </div>

      <!-- Free items -->
      <div class="text-start">
        ${salla.helpers.number(freeQty)} × 
        <span class="text-sm text-gray-500 line-through item-regular-price">
          ${itemPrice}
        </span>
        <span class="mx-2 text-sm text-red-800">
          ${salla.lang.get('common.elements.freeExclam')}
        </span>
      </div>
    </div>
  `;
}
