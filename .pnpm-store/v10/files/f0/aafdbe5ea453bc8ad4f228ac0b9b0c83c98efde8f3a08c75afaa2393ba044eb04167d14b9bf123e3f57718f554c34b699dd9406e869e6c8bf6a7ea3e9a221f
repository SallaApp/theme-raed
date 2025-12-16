import {RequestError, SuccessResponse} from "../common";

export default interface CommentEvent {
    onFetched: (callback: (response: SuccessResponse) => void) => void;
    onFetchFailed:  (callback: (error: RequestError) => void) => void;
}