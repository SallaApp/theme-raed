import {SuccessResponse} from "../common";

export interface FetchNotificationsResponse extends SuccessResponse {
    data: any[]
}


export interface NotificationsPayload {
    'per_page': number | null,
    'page': number | null
}

export default interface NotificationsApi {
    fetch: (data: NotificationsPayload) => Promise<FetchNotificationsResponse>;
}
