import { RequestErrorEvent } from "../common";
import { ComponentApiResponse } from "../api/component";


export default interface ComponentEvent {
    onMenuFetched: (callback: (response: ComponentApiResponse.menus) => void) => void;
    onMenuFetchFailed: RequestErrorEvent;

    // Reviews
    onReviewsFetched: (callback: (response: ComponentApiResponse.reviews) => void) => void;
    onReviewsFetchFailed: RequestErrorEvent;
}