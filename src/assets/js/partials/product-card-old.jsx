import {Component, h, Fragment} from 'preact';
import register from 'preact-custom-element';

/**
 * let's keep our card simple by target the element by css selector
 */
class ProductCardOld extends Component {
  static tagName = 'salla-product-card';
  static observedAttributes = ['product'];

  constructor() {
    super();
    this.state = {
      fit_type: salla.config.get('store.settings.product.fit_type', 'cover')
    };
  }

  imageStyle(imgUrl, fit_type) {
    return salla.helpers.url.is_placeholder(imgUrl) ? 'contain' : fit_type;
  }

  PriceRender(product) {
    if (product.is_on_sale) {
      return <>
        <div className="space-s-1">
          <h4 className="text-red-400 font-bold text-sm inline-block">{salla.helpers.money(product.sale_price)}</h4>
          <span className="text-sm text-gray-400 line-through">{salla.helpers.money(product.regular_price)}</span>
        </div>
      </>;
    }

    if (product.starting_price) {
      return <>
        {salla.lang.get('pages.products.starting_price')}
        <h4 className="text-red-400 font-bold text-sm inline-block">{salla.helpers.money(product.starting_price)}</h4>
      </>

    }

    return <>
      <h4 className="font-bold text-sm">{salla.helpers.money(product.price)}</h4>
    </>
  }

  render(props, state, context) {
    let product = props.product;
    if (typeof product === 'string') {
      product = JSON.parse(product);
    }
    // console.log(product);
    return <div id={"product-" + product.id} class={"product-entry " + (product.is_out_of_stock ? 'out-of-stock' : '')}>

      {/* Image */}
      <div className="product-entry__image">
        <a href={product.url}>
          <img
            class={"h-full w-full lazy object-" + this.imageStyle(product.image.url, state.fit_type)}
            src={salla.url.asset('images/s-empty.png')}
            data-src={product.image.url}
            alt={product.image.alt}
          />

          {product.promotion_title ? (<>
            <div
              className="product-entry__promotion_title absolute top-4 start-0 z-1 font-bold px-2.5 py-1.5 md:py-2 text-xs bg-red-400 text-white rounded-e-md">
              {product.promotion_title}
            </div>
          </>) : ''};
        </a>

        <salla-button
          shape="icon"
          fill="none"
          color="light"
          aria-label="Add or remove to wishlist"
          className="btn--wishlist animated hidden"
          // onclick={salla.wishlist.toggle(product.id)}
          data-id={product.id}>
          <i className="sicon-heart text-xl"/>
        </salla-button>
      </div>


      {/* Details */}
      <div className="product-entry__details p-3 sm:p-5 flex flex-col relative">

        {props.is_special && product.quantity ? (<>
          <div data-quantity={product.quantity}
               data-total={product.quantity > 100 ? product.quantity * 2 : 100}
               className="pie-wrapper">
                    <span>
                        <b id="staProductQty" title={salla.helpers.number(product.quantity)}
                           data-quantity={product.quantity}>
                            {salla.helpers.number(product.quantity)}
                        </b>
                      {salla.lang.get('pages.products.remained')}
                    </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -1 36 34" className="pie-svg">
              <circle cx="16" cy="16" r="15.9155" className="circle_base"/>
              <circle cx="16" cy="16" r="15.9155" className="circle_bar"/>
            </svg>
          </div>
        </>) : ''};

        <div className="product-entry__title-wrap">
          <h3 className="product-entry__title mb-2.5 leading-6 max-w-full">
            <a href={product.url}>{product.name}</a>
          </h3>

          {product.subtitle ? (<>
            <p className="text-sm text-gray-400 leading-6 mb-2.5">{product.subtitle}</p>
          </>) : ''};
        </div>

        <salla-progress-bar donation={product.donation}/>
        {product.can_donate ? (<>
          <div className="border-color mb-2.5 w-full">
            <label htmlFor="donation-amount" className="block text-sm mb-2.5">
              {salla.lang.get('pages.products.donation_amount')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              onInput={(e) => salla.helpers.inputDigitsOnly(e.target)}
              id="donation-amount"
              name="donating_amount"
              className="h-9 form-input"
              placeholder={salla.lang.get('pages.products.donation_amount')}/>
          </div>
        </>) : ''};

        <div className="product-entry__price-wrap w-full center-between mb-5">
          {this.PriceRender(product)}

          {product.rating ? (<>
            <div className="product-rating text-sm text-gray-400">
              <i className="sicon-star2 text-amber-400"/>
              <span>{salla.helpers.number(product.rating)}</span>
            </div>
          </>) : ''};
        </div>

        {/*todo :: find a better way to handel is speical*/}
        {/*{props.is_special && main_product.product.discount_ends ? (<>*/}
        {/*    <ul id="countdown_id"*/}
        {/*        className="timer countdown-timer mt-30"*/}
        {/*        data-dunixtime={main_product.product.discount_ends}></ul>*/}
        {/*</>) : ''};*/}

        <div className="product-entry__buy-wrap flex items-center mt-auto">
          <salla-add-product-button className="btn--add-to-cart" fill="outline" width="wide"
                                    product-id={product.id}
                                    product-status={product.status}
                                    product-type={product.type}>
            {product.add_to_cart_label}
          </salla-add-product-button>

          <salla-button
            shape="icon"
            fill="none"
            color="light"
            aria-label="Add or remove to wishlist"
            className="btn--wishlist animated hidden"
            // onclick="salla.wishlist.toggle({{ product.id }})"
            data-id={product.id}>
            <i className="sicon-heart text-xl"/>
          </salla-button>
        </div>
      </div>
    </div>
  }
}

salla.onReady(() => register(ProductCardOld));
// todo :: add all those css
// .product-entry--vertical .product-entry__promotion_title { apply .max-w-[calc(100%-60px)]; }
// .product-entry--vertical .product-entry__image .btn--wishlist { display: block }
// .product-entry--horizontal .product-entry__image .btn--wishlist { display: block }
// .product-entry--horizontal .product-entry__image { apply .flex-1; }
// .product-entry--horizontal .product-entry__details { apply .flex-1; }

// .product-entry--special .product-entry__title-wrap { apply .pe-24; }
// .product-entry--special .product-entry__price-wrap { apply .pe-24; }
// <salla-product-card product={json} is_special="true" class="product-entry--special product-entry--horizontal/vertical"></salla-product-card>

