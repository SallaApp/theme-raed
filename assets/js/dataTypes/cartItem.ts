export interface OptionsData {
    [key: number]: number;
}

export interface Money {
    amount: string;
    currency: string;
}

export default interface Offer {
    discount: Money;
    price_after_discount: string;
    is_free: boolean;
    names: string;
}
export default interface CartItem {
    id: number;
    url: string;
    quantity: number;
    isAvailable: boolean;
    onSale: boolean;
    options_data: OptionsData;
    notes: string;
    product_id: number;
    product_name: string;
    product_currency: string;
    isCustomized: boolean;
    product_image: string;
    product_quantity: number;
    product_maximum_quantity_per_order?: any;
    product_available_quantity: number;
    uploaded_files?: any;
    currency: string;
    enable_upload_image: boolean;
    enable_note: boolean;
    has_options: boolean;
    offer?: Offer;
    has_special_price: boolean;
    selectedOptions: number[];
    active_advance: number;
    type: string;
    source?: any;
    hide_quantity: boolean;
    total_special_price: Money;
    special_price: Money;
    product_price: Money;
    product_price_formatted: string;
    price: Money;
    formated_price: string;
    total_product_price: Money;
    total_product_price_formatted: string;
    total: number;
    special_price_formatted: string;
    total_special_price_formatted: string;
    display_total_price: string;
    display_price: string;
    _product_price: number;
    _total_product_price: number;
}