import {RequestError, SuccessResponse} from "../common";

export default interface LandingEvent {
    orderCreationFailed: (error: RequestError, page_id?: number) => void;
    orderCreated: (response: SuccessResponse, page_id?: number) => Promise<void>;
    onOrderCreated: (callback: (response: SuccessResponse, page_id?: number) => void) => void;
    onOrderCreationFailed: (callback: (error: RequestError, page_id?: number) => void) => void;
}