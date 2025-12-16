import {OrderDetailsResponse, RatingStorePayload, RatingProductsPayload, RatingShippingPayload} from "../api/rating";
import {RequestErrorEventWithData, SuccessResponse} from "../common";

export default interface RatingEvent {
    onOrderFetched: (callback: (response: OrderDetailsResponse, order_id: number) => void) => void;
    onOrderNotFetched: RequestErrorEventWithData</*order_id*/number>;
    onStoreRated: (callback: (response: SuccessResponse, data: RatingStorePayload) => void) => void;
    onStoreFailed: RequestErrorEventWithData</*data*/RatingStorePayload>;
    onProductRated: (callback: (response: SuccessResponse, data: RatingProductsPayload) => void) => void;
    onProductFailed: RequestErrorEventWithData</*data*/RatingProductsPayload>;
    onShippingRated: (callback: (response: SuccessResponse, data: RatingShippingPayload) => void) => void;
    onShippingFailed: RequestErrorEventWithData</*data*/RatingShippingPayload>;
}