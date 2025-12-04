import type { Product } from "@salla.sa/twilight/types/common";
export declare enum DiscountType {
    PERCENTAGE = "percentage",
    FIXED = "fixed",
    FREE_PRODUCT = "free_product"
}
export declare enum OfferType {
    PRODUCT_COUNT = "products_count",
    PRODUCT_PURCHASE = "order_amount"
}
export interface Discount {
    type?: DiscountType;
    value?: number;
    min_spend?: number;
    max_discount?: number;
}
export interface OfferDetails {
    based_on?: OfferType;
    ends_at?: number;
    start_value?: number;
    end_value?: number;
    current_value?: number;
    discounts?: Discount[];
}
export interface Offer {
    id?: number;
    type?: string;
    title?: string;
    description?: string;
    details?: OfferDetails | null;
}
export interface ProductDetail {
    id?: number;
    sku?: string;
    name?: string;
    description?: string;
    url?: string;
    promotion_title?: null;
    subtitle?: null;
    type?: string;
    status?: string;
    price?: number;
    base_currency_price?: BaseCurrencyPrice;
    sale_price?: number;
    regular_price?: number;
    starting_price?: null;
    quantity?: null;
    max_quantity?: number;
    discount_ends?: null;
    is_taxable?: boolean;
    has_read_more?: boolean;
    can_add_note?: boolean;
    can_show_remained_quantity?: boolean;
    can_upload_file?: boolean;
    has_custom_form?: boolean;
    has_metadata?: boolean;
    is_on_sale?: boolean;
    is_hidden_quantity?: boolean;
    is_available?: boolean;
    is_out_of_stock?: boolean;
    is_require_shipping?: boolean;
    weight?: null;
    calories?: null;
    image?: Image;
    currency?: string;
}
export interface BaseCurrencyPrice {
    currency?: string;
    amount?: number;
}
export interface Image {
    url?: string;
    alt?: string;
}
export interface UpdatedCart {
    items: Array<Product>;
    sub_total: number;
}
