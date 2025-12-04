export interface Order {
    id?: number;
    reference_id?: number;
    source?: string;
    url?: string;
    total?: Total;
    created_at?: DateClass;
    status?: Status;
    is_rated?: boolean;
    can_cancel?: boolean;
    can_reorder?: boolean;
    is_pending_payment?: boolean;
    pending_payment_ends_at?: number;
    items?: Item[];
}
export interface DateClass {
    date?: string;
    timezone_type?: number;
    timezone?: string;
}
export interface Item {
    name?: string;
    quantity?: number;
}
export interface Status {
    id?: number;
    name?: string;
    icon?: string;
    slug?: string;
    color?: string;
}
export interface Customized {
    id?: number;
    name?: string;
}
export interface Total {
    amount?: number;
    currency?: string;
}
export interface OrderQueryParameters {
    branch?: Array<number>;
    city?: string;
    country?: number;
    coupon?: string;
    customer_id?: number;
    expanded?: boolean;
    from_date?: string;
    keyword?: string;
    page?: number;
    per_page?: number;
    payment_method?: Array<string>;
    product?: string;
    reference_id?: number;
    shipping_app_id?: Array<number>;
    source?: Array<'store' | 'landing' | 'forgotten_basket' | 'abandoned-cart' | 'campaign' | 'dashboard' | 'buy_as_gift' | 'mahly-app' | 'buy_now' | 'one-click' | 'complete_order'>;
    status?: Array<number>;
    tags?: Array<number>;
    to_date?: string;
    types?: Array<any>;
}
