import {RequestError, SuccessResponse} from "../common";
import {CreateCartFromOrderResponse, FetchOrdersResponse} from "../api/order";

export default interface OrderEvent {
    onCanceled: (callback: (response: SuccessResponse, order_id?: number) => void) => void;
    onNotCanceled: (callback: (error: RequestError, order_id?: number) => void) => void;
    onOrderCreated: (callback: (response: CreateCartFromOrderResponse, order_id?: number) => void) => void;
    onOrderCreationFailed: (callback: (error: RequestError, order_id?: number) => void) => void;
    onInvoiceSent: (callback: (response: SuccessResponse, order_id?: number) => void) => void;
    onInvoiceNotSent: (callback: (error: RequestError | 'There is no id!', order_id?: number) => void) => void;
    onOrdersFetched: (callback: (response: FetchOrdersResponse) => void) => void;
    onOrdersNotFetched:  (callback: (error: RequestError) => void) => void;
}