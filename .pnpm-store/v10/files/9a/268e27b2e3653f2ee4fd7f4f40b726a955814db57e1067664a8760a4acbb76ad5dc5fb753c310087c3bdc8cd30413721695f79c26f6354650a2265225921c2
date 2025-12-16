import { OfferSummary } from "../api/cart";
import { ProductResponse } from "../api/product";
import { RequestError, RequestErrorEvent, RequestErrorEventWithData, SuccessResponse } from "../common";

export default interface ProductEvent {
    onPriceUpdated: (callback: (response: ProductResponse.getPrice, product_id: number) => void) => void;
    onPriceUpdateFailed: RequestErrorEventWithData</*product_id*/ number>;
    onAvailabilitySubscribed: (callback: (response: SuccessResponse, product_id: number) => void) => void;
    onAvailabilitySubscribeFailed: RequestErrorEventWithData</*product_id*/ number>;
    onCategoriesFetched: (callback: (response: ProductResponse.categories) => void) => void;
    onCategoriesFailed: RequestError;
    onSearchResults: (callback: (response: ProductResponse.search, query?: string) => void) => void;
    onSearchFailed: RequestErrorEventWithData</*query*/string | undefined>;

    onOfferExisted: (callback: (offer: OfferSummary) => void) => void;
    onOffersFetched: (callback: (response: ProductResponse.offers) => void) => void;
    onFetchOffersFailed: RequestErrorEvent;

    onSizeGuideFetched: (callback: (response: ProductResponse.sizeGuides, prod_id: number) => void) => void;
    onSizeGuideFetchFailed: RequestErrorEvent;

    onGiftFetched: (callback: (response: ProductResponse.giftResponse, product_id: number) => void) => void;
    onGiftFetchFailed: RequestErrorEvent;

    onDetailFetched: (callback: (response: ProductResponse.detail, product_id: number) => void) => void;
    onDetailFetchFailed: RequestErrorEvent;

    onAddGiftToCartSucceeded: (callback: (response: ProductResponse.giftToCart, product_id: number) => void) => void;
    onAddGiftToCartFailed: RequestErrorEvent;

    onGiftImageUploadSucceeded: (callback: (response: ProductResponse.giftImageUpload) => void) => void;
    onGiftImageUploadFailed: RequestErrorEvent;

    onProductListFetchSucceeded: (callback: (response: ProductResponse.lists) => void) => void;
    onProductListFetchFailed: RequestErrorEvent;

    onProductOptionsFetched: (callback: (response: ProductResponse.options) => void) => void;
    onProductOptionsNotFetched: RequestErrorEvent;
}
