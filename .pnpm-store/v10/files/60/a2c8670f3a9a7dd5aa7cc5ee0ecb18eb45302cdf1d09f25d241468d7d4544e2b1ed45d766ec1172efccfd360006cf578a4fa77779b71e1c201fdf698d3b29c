export default interface Offer {
    id: number;
    name: string;
    message: string;
    expiry_date: string | null;
    formatted_date: string | null;
    offer_type: string;
    status: string;
    buy: {
        type: string;
        quantity: number;
        products: any[];
    };
    get: {
        categories: null | Array<any>;
        discounts_table: null | Array<any>;
        products: null | Array<{
            id: number;
            type: string;
            status: string;
            is_available: boolean;
            sku: string;
            name: string;
            price: {
                amount: number;
                currency: string;
            };
            promotion: {
                title: string;
                sub_title: string;
            };
            sale_price: {
                amount: number;
                currency: string;
            };
            regular_price: {
                amount: number;
                currency: string;
            };
            currency: string;
            url: string;
            thumbnail: string;
            has_special_price: boolean;
            favorite?: any;
        }>;
        type: string;
        discount_type: string;
    };
}
