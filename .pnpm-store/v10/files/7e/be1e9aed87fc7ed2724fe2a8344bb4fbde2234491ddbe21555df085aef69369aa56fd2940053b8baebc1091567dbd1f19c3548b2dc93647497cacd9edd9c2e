import AuthEvent from "./auth";
import CartEvent from "./cart";
import OrderEvent from "./order";
import RatingEvent from "./rating";
import CommentEvent from "./comment";
import LoyaltyEvent from "./loyalty";
import ProductEvent from "./product";
import ProfileEvent from "./profile";
import CurrencyEvent from "./currency";
import DocumentEvent from "./document";
import WishlistEvent from "./wishlist";
import InfiniteScrollEvent from "./infiniteScroll";
import ScopeEvents from "./scope";
import BookingEvent from "./booking";
import LandingEvent from "./landing";
import NavigationEvent from "./navigation";
import MetadataEvent from "./metadata";

import Emitter from "@salla.sa/base/types/event";

export type event = (symbol | string);

export {
    AuthEvent,
    CartEvent,
    OrderEvent,
    RatingEvent,
    CommentEvent,
    LoyaltyEvent,
    ProductEvent,
    ProfileEvent,
    CurrencyEvent,
    DocumentEvent,
    WishlistEvent,
    InfiniteScrollEvent,
    ScopeEvents,
    BookingEvent,
    LandingEvent,
    NavigationEvent,
    MetadataEvent,
}

export default interface TwilightEmitter extends Emitter {
    auth: AuthEvent;
    cart: CartEvent;
    order: OrderEvent;
    rating: RatingEvent;
    comment: CommentEvent;
    loyalty: LoyaltyEvent;
    product: ProductEvent;
    profile: ProfileEvent;
    currency: CurrencyEvent;
    document: DocumentEvent;
    wishlist: WishlistEvent;
    scope: ScopeEvents;
    landing: LandingEvent;
    booking: BookingEvent;
    infiniteScroll: InfiniteScrollEvent;
    navigation: NavigationEvent;
    metadata: MetadataEvent;
}
