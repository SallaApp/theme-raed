import {SuccessResponse} from "../../common";
import {CartRequest} from "./request";

export namespace CartResponse {
    export interface latest extends SuccessResponse {
        data: CartSummary;
    }

    export interface cartPayload {
        id: number,
        payload: CartRequest.addItem
    }

    export interface update extends SuccessResponse {
        data: CartUpdatedData;
    }

    export interface status extends SuccessResponse {
        data: {
            active: boolean;
            next_step: {
                to: 'refresh' | 'login' | 'checkout';
                url?: string;
            };
        }
    }

    export interface quickOrderSettingResponse extends SuccessResponse {
        data: QuickOrderSetting
    }

    export interface PriceQuote extends SuccessResponse {
        data: { case: 'success' | 'login' }
    }
}


export interface CartUpdatedData extends Object {
    product_id?: number;
    offer?: OfferSummary;
    googleTags: string;//json string
    cart: CartSummary;
}

export interface itemOffer {
    discount: number;
    is_free: boolean;
    names: string;
}

export interface CartItem {
    id: number;
    product_id: number;
    product_price: number;
    price: number;
    total: number;
    is_available: true;
    offer?: itemOffer;
    quantity: number;
    total_special_price: number;
    special_price: number;
}

export interface CartSummary {
    id: number;
    user_id: number | string;
    store_id: number;
    real_shipping_cost?: number;
    free_shipping_bar?: {
        minimum_amount: number;
        has_free_shipping: boolean;
        percent: number | 0 | 100;
        remaining: number;
    };
    sub_total: number;
    discount: number;
    total: number;
    count: number;
    items?: CartItem[];
}

export interface OfferSummary {
    id: number;
    product_id: number;
}

export interface QuickOrderSetting {
    title: string;
    sub_title: string;
    thanks_message: string;
    order_now_button: string;
    is_email_required: boolean;
    show_agreement: boolean;
    allowed_countries: string[];
    style: 'default' | 'white' | 'gray';
    confirm_button: string;
    agreement: string;
}