import {SuccessResponse} from '../common'


export interface Advertisement {
    id?:          number;
    title?:       string;
    description?: string;
    type?:        Type;
    style?:       Style;
    expire_date?: ExpireDate;
    pages?:       string[];
}

export interface ExpireDate {
    date?:          Date;
    timezone_type?: number;
    timezone?:      string;
}

export interface Style {
    icon?:             string;
    font_color?:       string;
    background_color?: string;
}

export interface Type {
    id?:   number;
    name?: string;
    link?: string;
    url?:  string;
}


export namespace AdvertisementApiResponse {
    export interface fetch extends SuccessResponse {
        data: Advertisement
    }
}

export default interface AdvertisementApi {
    fetch: (productId: number, withRedirect: boolean) => Promise<AdvertisementApiResponse.fetch>
}