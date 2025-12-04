import { ProductDetail } from "@salla.sa/twilight/types/api/product";
type Nullable<T> = T | undefined | null | '';
type Price = {
    amount: string;
    currency: string;
};
type ProductType = 'product' | 'service' | 'group_products' | 'codes' | 'digital' | 'food' | 'donating';
export interface Product {
    id: number;
    name: string;
    type: ProductType;
    promotion: {
        title: Nullable<string>;
        sub_title: Nullable<string>;
    };
    price: Price;
    sale_price: Nullable<Price>;
    regular_price: Price;
    has_special_price: boolean;
    status: 'sale' | 'out';
    is_available: boolean;
    sku: Nullable<string>;
    currency: string | 'SAR';
    url: string;
    thumbnail: string;
    calories: Nullable<number>;
}
type SortOption = {
    id: "ourSuggest" | "bestSell" | "topRated" | "priceFromTopToLow" | "priceFromLowToTop";
    name: string;
};
export default interface SearchProductsResponse {
    data: ProductDetail[];
    cursor: {
        current: number;
        previous: Nullable<string>;
        next: Nullable<string>;
        count: number;
    };
    features?: {
        sorting?: true;
    };
    sort_options: SortOption[];
}
export {};
