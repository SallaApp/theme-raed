import {SuccessResponse} from '../common'


export interface Loyalty {
    id: number;
    name: string;
    description: string;
    image: string;
    points_validity_by: null;
    points_validity_value: null;
    prize_promotion_title: string;
    prize_promotion_description: string;
    prize_promotion_logo: string;
    customer: Customer;
    points: Point[];
    prizes: Prize[];
}

export interface Customer {
    id: number;
    currency: string;
    language: string;
    first_name: string;
    last_name: string;
    phone: Phone;
    email: string;
    avatar: string;
    gender: string;
    birthday: Date;
    loyalty_program_points: number;
}

export interface Phone {
    code: string;
    number: number;
    country: string;
}

export interface Point {
    id: number;
    key: string;
    name: string;
    description: string;
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
    value?: 'fixed_amount' | 'total_order';
    op: string;
}

export interface Prize {
    type: string | 'free_shipping' | 'free_product' | 'coupon';
    title: string;
    items: Item[];
}

export interface Item {
    id: number;
    key: string;
    name: string;
    description: string;
    image: string;
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

/**
 * Loyalty exchange Points
 */
export interface ExchangePoint {
    message: string;
    cart: Cart;
}

export interface Cart {
    items: ExchangeItem[];
    require_shipping: boolean;
    cart_total: CartTotal;
    total_before_discount: CartTotal;
    coupon: null;
    free_shipping: FreeShipping;
    loyalty_program: LoyaltyProgram;
}

export interface CartTotal {
    amount: number;
    currency: Currency;
}

export enum Currency {
    Sar = "SAR",
}

export interface FreeShipping {
    remaining_to_free_shipping: null;
    has_free_shipping: boolean;
}

export interface ExchangeItem {
    id: number;
    url: string;
    quantity: number;
    product_id: number;
    notes: null | string;
    name: string;
    price: CartTotal;
    sale_price: CartTotal;
    has_special_price: boolean;
    regular_price: CartTotal;
    image: string;
    type: string;
    hide_quantity: boolean;
    features: Features;
    discount_details: DiscountDetails | null;
    max_items_per_user: number;
    active_advance: boolean;
    weight_label: string;
    uploaded_files: any[];
    options: Option[];
    selected_options: SelectedOption[];
    skus: any[];
}

export interface DiscountDetails {
    discount: number;
    item_total_price: CartTotal;
    offer_type: null;
    has_free_items: boolean;
    offer_items_count: number;
    special_price: CartTotal;
    is_free: boolean;
    name: string;
}

export interface Features {
    upload_file: boolean;
    note: boolean;
}

export interface Option {
    id: number;
    name: string;
    description: string;
    type: string;
    required: boolean;
    associated_with_order_time: number;
    availability_range: boolean;
    not_same_day_order: boolean;
    choose_date_time: null;
    from_date_time: null;
    to_date_time: null;
    sort: number;
    advance: boolean;
    display_type: null;
    visibility: string;
    translations: Object;
    values: ValueElement[];
}

export interface ValueElement {
    id: number;
    name: string;
    price: CartTotal;
    display_value: null;
    advance: boolean;
    option_id: number;
    image_url: null;
    hashed_display_value: null;
    translations: Object;
}

export interface SelectedOption {
    id: number;
    value: string[] | number;
}

export interface LoyaltyProgram {
    points: number;
    prize: ExchangePrize;
}

export interface ExchangePrize {
    id: number;
    name: string;
    discount_amount: number;
    points: number;
}

export interface PrizeObject {
    'id': number | null,
    'loyalty_prize_id': number | null,
    'prize_id': number | null
}


export namespace LoyaltyApiResponse {

    export interface program extends SuccessResponse {
        data: Loyalty
    }


    export interface point extends SuccessResponse {
        data: ExchangePoint
    }
}


export default interface LoyaltyApi {
    getProgram: () => Promise<LoyaltyApiResponse.program>
    exchange: (prize_id: number | PrizeObject, cart_id?: number) => Promise<LoyaltyApiResponse.point>
    reset: (cart_id?: number) => Promise<SuccessResponse>
}