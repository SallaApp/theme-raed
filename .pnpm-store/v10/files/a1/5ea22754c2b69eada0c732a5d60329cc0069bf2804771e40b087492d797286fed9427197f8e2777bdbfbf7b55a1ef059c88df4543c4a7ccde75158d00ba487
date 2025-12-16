import { RequestErrorEvent } from "../common";
import { AdvertisementApiResponse } from "../api/advertisement";

export default interface AdvertisementEvent {
    onFetched: (callback: (response: AdvertisementApiResponse.fetch) => void) => void;
    onFetchFailed: RequestErrorEvent;
}