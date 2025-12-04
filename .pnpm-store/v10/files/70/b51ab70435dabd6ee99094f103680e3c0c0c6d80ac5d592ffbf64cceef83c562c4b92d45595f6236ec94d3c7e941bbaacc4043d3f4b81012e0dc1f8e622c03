export interface LoyaltyProgram {
    loyalty_program_id: number;
    name: string;
    description: string;
    image: string;
    status: boolean;
    points_validity_by: null;
    points_validity_value: null;
    prize_promotion_title: string;
    prize_promotion_description: string;
    prize_promotion_logo: string;
    customer: null;
    points: Point[];
    prizes: Prize[];
}
export interface Point {
    id: number;
    key: string;
    name: string;
    description: string;
    status: boolean;
    points: number;
    icon: number;
    color: number;
    is_completed: boolean;
    target_url: string;
    share_store_url: string;
    conditions: Condition[];
}
export interface Condition {
    key: string;
    points: number;
    condition: null | string;
    value: null;
    op: string;
}
export interface Prize {
    type: string;
    title: string;
    items: Item[];
}
export interface Item {
    id: number;
    key: string;
    name: string;
    description: string;
    image: string;
    status: number;
    cost_points: number;
    coupon_type: null | string;
    coupon_amount: string;
    coupon_maximum_amount: string;
    included_category_ids: number[];
    order_minimum_amount: string;
    product_id: number | null;
    use_product_image: number;
    free_shipping_maximum_amount: string;
    free_shipping_terms_apply: boolean;
    prize_url: string;
}
export declare enum LoyaltyTypes {
    freeShipping = "FREE_SHIPPING",
    couponDiscount = "COUPON_DISCOUNT",
    freeProduct = "FREE_PRODUCT"
}
