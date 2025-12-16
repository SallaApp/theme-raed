export interface ProductOptionDetail {
    id: number;
    name: string;
    option_value?: string;
    value?: number;
    color?: string;
    is_default?: boolean | number;
    is_selected?: boolean;
    price?: number;
    quantity?: number;
    image?: {
        url: string;
        alt: string;
    };
    sort?: number;
    code?: string;
    additional_price?: number;
    option_id?: number | string;
    is_out?: boolean;
    skus_availability?: {
        [sku: string]: boolean;
    };
    [key: string]: any;
}
export interface ProductOption {
    id: number | string;
    name: string;
    required?: boolean;
    type: string;
    placeholder?: string;
    details: ProductOptionDetail[];
    not_same_day_order?: boolean;
    availability_range?: number;
    from_date_time?: string | null;
    to_date_time?: string | null;
    visibility_condition?: any;
    condition_attributes?: string;
    value?: any;
    donation?: any;
    is_advance?: boolean;
    [key: string]: any;
}
export interface Image {
    id?: number;
    url?: string;
    main?: boolean;
    three_d_image_url?: string;
    alt?: string;
    video_url?: string;
    type?: string;
    sort?: number;
}
export interface BundleProduct {
    id: string | number;
    name: string;
    image: Image;
    images?: Image[];
    price: number | {
        amount: number;
        currency: string;
    };
    sale_price?: number;
    quantity: number;
    unlimited_quantity: boolean;
    sku: string;
    type: string;
    weight?: string;
    options?: ProductOption[];
    quantity_in_group?: number;
    pivot?: {
        sort_order: number;
        sub_product_quantity: number;
    };
    [key: string]: any;
}
export interface BundleSection {
    id: string | number;
    name: string;
    sort: number;
    obligatory_products?: number;
    status?: boolean;
    products?: BundleProduct[];
    [key: string]: any;
}
export interface BundleData {
    id?: string | number;
    name?: string;
    type?: string;
    has_bundle_products?: boolean;
    bundle?: {
        sections: BundleSection[];
        discount_percentage?: number;
    };
    [key: string]: any;
}
export interface SelectedOption {
    id: number;
    option_id: number | string;
    name: string;
    [key: string]: any;
}
