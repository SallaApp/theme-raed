import {
    AuthApi, CartApi, CommentApi, CurrencyApi, DocumentApi, RatingApi, OrderApi,
    ProductApi, ProfileApi, WishlistApi, LoyaltyApi,
} from "./api";
import {
    AuthEvent, CartEvent, CommentEvent, CurrencyEvent, DocumentEvent, RatingEvent,
    InfiniteScrollEvent, OrderEvent, ProductEvent, ProfileEvent, WishlistEvent, LoyaltyEvent,
} from "./event";

import Salla from "@salla.sa/base/types/index";

export default interface SallaActions extends Salla {
    cart: CartApi & { api: CartApi, event: CartEvent };
    auth: AuthApi & { api: AuthApi, event: AuthEvent };
    order: OrderApi & { api: OrderApi, event: OrderEvent };
    rating: RatingApi & { api: RatingApi, event: RatingEvent };
    comment: CommentApi & { api: CommentApi, event: CommentEvent };
    loyalty: LoyaltyApi & { api: LoyaltyApi, event: LoyaltyEvent };
    product: ProductApi & { api: ProductApi, event: ProductEvent };
    profile: ProfileApi & { api: ProfileApi, event: ProfileEvent };
    currency: CurrencyApi & { api: CurrencyApi, event: CurrencyEvent };
    document: DocumentApi & { api: DocumentApi, event: DocumentEvent };
    wishlist: WishlistApi & { api: WishlistApi, event: WishlistEvent };
    infiniteScroll: InfiniteScroll & { api: null, event: InfiniteScrollEvent };
}


/********************* Infinite Scroll *********************/
/**
 * @see https://infinite-scroll.com/options.html
 */
export interface InfiniteScrollOptions {
    path: '.infinite-scroll-btn' | string;
    history: 'push' | false;
    status: ".infinite-scroll-status" | string;
    append: ".list-block" | string;
    button: ".infinite-scroll-btn" | string;
    next_page: string;
}

/**
 * @see https://infinite-scroll.com/api.html
 */
export interface InfiniteScroll {
    //💡 when there is no need to pass options, but there is need to change append selector, just pass it as string as second argument
    initiate: (selector: string | HTMLElement, append?: string | InfiniteScrollOptions, customOptions?: InfiniteScrollOptions) => Object;
}