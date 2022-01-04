// @ts-ignore
import CartItem from "./cartItem";
type Nullable<T> = T | undefined | null;
interface Data {
    items: CartItem[];
    count: number;
    total: string;
    total_before_discount?: any;
    coupon_discount: number;
    total_discount: number;
    sub_total: string;
    final_total: string;
    shipping_cost: number;
}

interface Sections {
    ['free-shipping-bar']: Nullable<string>;
}

export interface UpdateCartItemResponse {
    status: number;
    success: boolean;
    data: Data;
    message: string;
    message_code: string;
    sections: Sections;
    events: string;
}

