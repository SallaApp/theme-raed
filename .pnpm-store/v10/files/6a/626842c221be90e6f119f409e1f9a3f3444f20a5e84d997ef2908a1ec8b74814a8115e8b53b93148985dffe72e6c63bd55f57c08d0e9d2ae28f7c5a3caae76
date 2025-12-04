import { CartResponse, CartSummary } from "../api/cart";
import { ErrorResponse, RequestError, SuccessResponse } from "../common";

export default interface CartEvent {
    // listeners
    onUpdated: (callback: (cart_summary: CartSummary) => void) => void;
    onItemAdded: (callback: (response: CartResponse.update, product_id: number) => void) => void;
    onItemUpdated: (callback: (response: CartResponse.update, product_id: number) => void) => void;
    onItemDeleted: (callback: (response: CartResponse.update, product_id: number) => void) => void;
    onLatestFetched: (callback: (response: CartResponse.update) => void) => void;
    onSubmitted: (callback: (response: CartResponse.status) => void) => void;
    onImageDeleted: (callback: (response: SuccessResponse, file_id: number) => void) => void;
    onDetailsFetched: (callback: (response: CartResponse.status) => void) => void;
    onSuccessReset: (callback: () => void) => void;

    //errors
    onLatestFailed: (callback: (error: RequestError) => void) => void;
    onItemUpdatedFailed: (callback: (error: RequestError | 'There is no "id"!', item_id?: number) => void) => void;
    onItemAddedFailed: (callback: (error: RequestError | 'There is no product "id"!', product_id?: number) => void) => void;
    onItemDeletedFailed: (callback: (error: RequestError | 'There is no "id"!', item_id?: number) => void) => void;
    onSubmitFailed: (callback: (error: RequestError | "Can't find next_step );") => void) => void;
    onImageNotDeleted: (callback: (error: RequestError | 'There is no "id"!', file_id?: number) => void) => void;
    onDetailsNotFetched: (callback: (error: RequestError) => void) => void;

    //coupons
    onCouponAdded: (callback: (response: CartResponse.update, cart_id: number) => void) => void;
    onCouponDeleted: (callback: (response: CartResponse.update, cart_id: number) => void) => void;
    onCouponAdditionFailed: (callback: (error: RequestError, cart_id?: number) => void) => void;
    onCouponDeletionFailed: (callback: (error: RequestError, cart_id?: number) => void) => void;

    // Checkout
    onQuickOrderSettingFetched: (callback: (response: CartResponse.quickOrderSettingResponse) => void) => void;
    onQuickOrderSettingFailed: (callback: (error: ErrorResponse) => void) => void;

    onQuickOrderSucceeded: (callback: () => void) => void;
    onQuickOrderFailed: (callback: (error: RequestError) => void) => void;
    // Price Quote
    onPriceQuoteSucceeded: (callback: (response: CartResponse.PriceQuote) => {}) => void;
    onPriceQuoteFailed: (callback: (error: RequestError) => void) => void;
}