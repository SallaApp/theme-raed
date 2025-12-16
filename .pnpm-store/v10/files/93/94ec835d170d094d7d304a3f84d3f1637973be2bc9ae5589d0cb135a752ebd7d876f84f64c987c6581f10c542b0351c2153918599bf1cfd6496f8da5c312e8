import {Product, Rating, SuccessResponse} from "../common";

export interface OrderDetailsResponse extends SuccessResponse {
    data: {
        id: number;
        store?: { feedback: RatingContent };
        shipping?: {
            feedback: RatingContent;
            company: {
                id: number;
                name: string;
                logo?: string;
            }
        };
        products: Array<{ feedback: RatingContent; product: Product; }>;
        testimonials_enabled: boolean;
        shipping_enabled: boolean;
        products_enabled: boolean;
        thanks_message: string;
    }
}

export interface OrderDetailPayload {
    id: number,
    order_id: number
}

export interface RatingContent {
    content: string;
    rating: Rating;
    status?: 'approved' | 'pending';
}

export interface RatingStorePayload {
    comment: string;
    order_id: number;
    rating: Rating;
}

export interface RatingProductsPayload {
    products: Array<{ product_id: number; comment: string; rating: Rating; }>
    order_id: number;
}

export interface RatingShippingPayload extends RatingStorePayload {
    shipping_company_id: number;
}

export default interface RatingApi {
    order: (order_id: number | OrderDetailPayload) => Promise<OrderDetailsResponse>;
    store: (data: RatingStorePayload) => Promise<SuccessResponse>;
    products: (data: RatingProductsPayload) => Promise<SuccessResponse>;
    shipping: (data: RatingShippingPayload) => Promise<SuccessResponse>;
}