import {SuccessResponse} from "../common";

export interface CreateCartFromOrderResponse extends SuccessResponse {
    data: {
        cart_id: number;
        url: string;
    };
}

export interface ShowOrderPayload {
    order_id: number,
    url: string
}

export interface SendInvoicePayload {
    id: number
}

export interface OrderRequestParameters {
    branch?: Array<number>;
    city?: string;
    country?: number;
    coupon?: string;
    customer_id?: number;
    expanded?: boolean;
    from_date?: string;
    keyword?: string;
    page?: number;
    payment_method?: Array<string>;
    product?: string;
    reference_id?: number;
    shipping_app_id?: Array<number>;
    source?: Array<'store' | 'landing' | 'forgotten_basket' | 'abandoned-cart' | 'campaign' | 'dashboard' | 'buy_as_gift' | 'mahly-app' | 'buy_now' | 'one-click' | 'complete_order'>;
    status?: Array<number>;
    tags?: Array<number>;
    to_date?: string;
}

export interface OrderResponse {
    id?:                      number;
    reference_id?:            number;
    source?:                  string;
    url?:                     string;
    created_at?:              string;
    total?:                   Total;
    date?:                    DateClass;
    status?:                  Status;
    can_cancel?:              boolean;
    can_reorder?:             boolean;
    is_pending_payment?:      boolean;
    pending_payment_ends_at?: number;
    items?:                   Item[];
}

export interface DateClass {
    date?:          Date;
    timezone_type?: number;
    timezone?:      string;
}

export interface Item {
    name?:     string;
    quantity?: number;
}

export interface Status {
    id?:         number;
    name?:       string;
    slug?:       string;
    color?:      string;
    customized?: Customized;
}

export interface Customized {
    id?:   number;
    name?: string;
}

export interface Total {
    amount?:   number;
    currency?: string;
}


export interface FetchOrdersResponse extends SuccessResponse {
    data: Array<OrderResponse>;
}


export default interface OrderApi {
    createCartFromOrder: (order_id?: number) => Promise<CreateCartFromOrderResponse>;
    cancel: (order_id?: number) => Promise<SuccessResponse>;
    sendInvoice: (payload: SendInvoicePayload) => Promise<SuccessResponse>;
    show: (payload: ShowOrderPayload) => Promise<void>; //should be called from thank you page to trigger native order details page in apps
    fetch: (payload: OrderRequestParameters) => Promise<FetchOrdersResponse>;
}