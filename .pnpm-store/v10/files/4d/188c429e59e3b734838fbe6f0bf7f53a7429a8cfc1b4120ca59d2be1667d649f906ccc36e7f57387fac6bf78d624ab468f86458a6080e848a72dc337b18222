import {SuccessResponse} from '../common'


export interface RedirectPayload {
    to: 'login' | 'booking',
    url: null | string
}

export interface Booking {
    redirect: RedirectPayload
}

export namespace BookingApiResponse {
    export interface add extends SuccessResponse {
        data: Booking
    }
}

export default interface BookingApi {
    add: (productId: number, withRedirect: boolean) => Promise<BookingApiResponse.add>
}