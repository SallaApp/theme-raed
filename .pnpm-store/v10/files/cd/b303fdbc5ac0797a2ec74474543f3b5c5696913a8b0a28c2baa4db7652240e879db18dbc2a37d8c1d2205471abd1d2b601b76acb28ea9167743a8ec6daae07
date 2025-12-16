import {RequestErrorEventWithData} from "../common";
import {AddCommentResponse} from "../api/comment";

export default interface CommentEvent {
    onAdded: (callback: (response: AddCommentResponse) => void, /*product/page id*/ id:number) => void;
    onAdditionFailed: RequestErrorEventWithData</*product/page id*/number>;
}