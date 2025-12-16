import {RequestErrorEventWithData, SuccessResponse} from "../common";

export default interface WishlistEvent {
    onAdded: (callback: (response: SuccessResponse, product_id: number) => void) => void;
    onRemoved: (callback: (response: SuccessResponse, product_id: number) => void) => void;
    onAdditionFailed: RequestErrorEventWithData</*product_id*/number>;
    onRemovingFailed: RequestErrorEventWithData</*product_id*/number>;
}