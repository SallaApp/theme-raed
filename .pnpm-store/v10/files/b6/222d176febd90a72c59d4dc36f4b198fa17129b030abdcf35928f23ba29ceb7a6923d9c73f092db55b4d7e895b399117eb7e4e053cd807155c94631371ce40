export default interface OrderFeedbackResponse {
    id: number;
    store: {
        feedback: {
            content: string;
            rating: number;
        };
    };
    shipping: {
        feedback: {
            content: string;
            rating: number;
        };
        company: {
            id: number;
            name: string;
            logo: string;
        };
    };
    products: ProductFeedback[];
    testimonials_enabled: boolean;
    shipping_enabled: boolean;
    products_enabled: boolean;
    thanks_message: string;
    allowed_ratings: {
        products_enabled: boolean;
        shipping_enabled: boolean;
        testimonials_enabled: boolean;
    };
}
export interface ProductFeedback {
    feedback: {
        content: string;
        rating: number;
        status: string;
    };
    product: {
        id: number;
        type: string;
        promotion: {
            title?: string;
            sub_title?: string;
        };
        status: string;
        is_available: boolean;
        sku: string;
        name: string;
        price: Price;
        sale_price: Price;
        currency: string;
        url: string;
        thumbnail: string;
        has_special_price: boolean;
        regular_price: Price;
        favorite: any;
    };
}
interface Price {
    amount: number;
    currency: string;
}
export {};
