import { RequestErrorEvent } from "../common";
import { BookingApiResponse } from "../api/booking";

export default interface BookingEvent {
    onAdded: (callback: (response: BookingApiResponse.add) => void) => void;
    onAdditionFailed: RequestErrorEvent;
}