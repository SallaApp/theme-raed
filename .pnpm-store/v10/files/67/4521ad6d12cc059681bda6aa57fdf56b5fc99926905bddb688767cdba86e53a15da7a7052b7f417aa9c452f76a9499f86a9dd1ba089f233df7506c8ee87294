import { EventEmitter2 } from "eventemitter2";

export type event = symbol | string;
export type EventName =
  | string
  | "auth::login"
  | "auth::logout"
  | "auth::code.sent"
  | "auth::code.not-sent"
  | "auth::code.re-sent"
  | "auth::code.not.re-sent"
  | "auth::verified"
  | "auth::verification.failed"
  | "auth::logged.in"
  | "auth::registered"
  | "auth::registration.failed"
  | "auth::logged.out"
  | "auth::failed.logout"
  | "auth::token.fetched"
  | "auth::refresh.failed"
  | "cart::latest.fetched"
  | "cart::latest.failed"
  | "cart::updated"
  | "cart::item.updated"
  | "cart::item.updated.failed"
  | "cart::item.added"
  | "cart::item.added.failed"
  | "cart::item.deleted"
  | "cart::item.deleted.failed"
  | "cart::submitted"
  | "cart::submit.failed"
  | "cart::image.deleted"
  | "cart::image.not.deleted"
  | "cart::details.fetched"
  | "cart::details.not.fetched"
  | "cart::success.reset"
  | "cart::coupon.added"
  | "cart::coupon.deleted"
  | "cart::coupon.addition.failed"
  | "cart::coupon.deletion.failed"
  | "loyalty::exchange.succeeded"
  | "loyalty::exchange.failed"
  | "loyalty::program.fetched"
  | "loyalty::program.not.fetched"
  | "loyalty::reset.succeeded"
  | "loyalty::reset.failed"
  | "order::canceled"
  | "order::not.canceled"
  | "order::re.ordered"
  | "order::re.order.failed"
  | "order::invoice.sent"
  | "order::invoice.not.sent"
  | "rating::order.not.fetched"
  | "rating::order.fetched"
  | "rating::store.rated"
  | "rating::store.failed"
  | "rating::products.rated"
  | "rating::products.failed"
  | "rating::shipping.rated"
  | "rating::shipping.failed"
  | "product::price.updated"
  | "product::price.updated.failed"
  | "product::availability.subscribed"
  | "product::availability.subscribe.failed"
  | "product::search.failed"
  | "product::search.results"
  | "product::offer.existed"
  | "product::fetch.offers.failed"
  | "product::offers.fetched"
  | "product::categories.fetched"
  | "product::categories.failed"
  | "product::gift.fetched"
  | "product::gift.failed"
  | "product::gift.add-to-cart.succeeded"
  | "product::gift.add-to-cart.failed"
  | "product::gift.image-upload.succeeded"
  | "product::gift.image-upload.failed"
  | "profile::updated"
  | "profile::update.failed"
  | "profile::mobile.updated"
  | "profile::update.mobile.failed"
  | "profile::email.updated"
  | "profile::update.email.failed"
  | "profile::verified"
  | "profile::unverified"
  | "comment::added"
  | "comment::addition.failed"
  | "currency::changed"
  | "currency::failed"
  | "currency::fetched"
  | "currency::failed.to.fetch"
  | "document::click"
  | "document::change"
  | "document::submit"
  | "document::keyup"
  | "document::leaving"
  | "document::request"
  | "document::request.failed"
  | "twilight::initiated"
  | "wishlist::added"
  | "wishlist::removed"
  | "wishlist::addition.failed"
  | "wishlist::removing.failed"
  | "scope::fetched"
  | "scope::not.fetched"
  | "scope::changed"
  | "scope::not.changed"
  | "scope::product-availability.fetched"
  | "scope::product-availability.not.fetched"
  | "booking::added"
  | "booking::addition.failed";

export type typeSafeEvents = {
  [key: event]: (...args: any[]) => void
}

/**
 * @property string delimiter
 */
export default interface Emitter extends EventEmitter2 {
  delimiter: string;

  dispatchEvents: (events: { [event_name: string]: any }) => void;

  dispatch: (event_name: EventName, ...data: undefined | any) => void;

  on(event: EventName, listener: (...values: any[]) => void, options?: boolean | Object): this;

  once(event: EventName, listener: (...values: any[]) => void, options?: boolean | Object): this;

  listen(event: EventName, listener: (...values: any[]) => void, options?: boolean | Object): this;
}
