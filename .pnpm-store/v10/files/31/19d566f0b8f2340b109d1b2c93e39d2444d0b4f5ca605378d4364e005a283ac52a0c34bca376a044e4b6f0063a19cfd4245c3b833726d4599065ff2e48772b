import {SuccessResponse} from "../common";

export interface AddCommentResponse extends SuccessResponse {
    data: {
        case: 'success' | 'error';
        message: string;
    }
}

export interface FetchCommentsResponse extends SuccessResponse {
    data: any[]
}

export interface AddCommentPayload {
    id: number;
    comment: string;
    type: 'product' | 'page';
}

export interface CommentPayload {
    id: number;
    comment: string;
    type: 'product' | 'page';
    'per_page': number | null,
    'page': number | null
}

export default interface CommentApi {
    add: (data: AddCommentPayload) => Promise<AddCommentResponse>;
    getCommentPayload: (data: AddCommentPayload) => CommentPayload;
    fetchComments: (data: AddCommentPayload) => Promise<FetchCommentsResponse>;
    getPageComments: (pageId: number, page: number, per_page: number) => Promise<FetchCommentsResponse>;
    getProductComments: (productId: number, page: number, per_page: number) => Promise<FetchCommentsResponse>;
}
