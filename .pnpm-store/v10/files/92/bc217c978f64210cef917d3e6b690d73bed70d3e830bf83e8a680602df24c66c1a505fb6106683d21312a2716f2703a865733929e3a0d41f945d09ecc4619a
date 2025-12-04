export interface Category {
    id: string;
    id_: number;
    name: string;
    url: string;
    sub_categories: Category[];
}



export interface Receiver {
    name: string;
    country_code: string;
    mobile: string;
}


export namespace ProductRequest {
    export interface addItem {
        id: number;
        quantity: 1 | number;
        options?: Array<{ [key: number]: number | string | number[] }>;
    }

    export interface search {
        query: string;
        type?: 'keyword' | 'tag';//default => 'keyword'
        sort_by?: 'ourSuggest' | 'default' | 'bestSell' | 'topRated' | 'priceFromTopToLow' | 'priceFromLowToTop'; //default => 'ourSuggest'
        per_page?: 32 | number;//max 50
        brands?: number[];
        categories?: number[];// max 5 ids
        branches?: number[];// max 5 ids
    }

    export interface availability {
        id: number;
        //💡 Following properties required for guests
        email?: string;//required when request without mobile
        country_code?: string | 'SA';//required when request without email
        phone?: string | '555555555';//required when request without email
    }

    export interface giftToCart {
        text: string;
        sender_name: string;
        receiver: Receiver;
        quantity: number;
        deliver_at: string;
        image_url: string;
        time_zone: string;
    }

    export interface FetchProductsQueryParams {
        source: 'categories' | 'latest' | 'related' | 'brands' | 'json' | 'search' | 'tags' | 'selected' | 'offers' | 'landing-page';
        source_value: number | string | object | string[];
        filters?: object;
        limit?: number;
        includes?: Array<string>;
        with?: Array<'images' | 'three_d_image'>;
    }
}
