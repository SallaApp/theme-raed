export declare enum DisplayType {
    COLOR = "color",
    DATE = "date",
    DATETIME = "datetime",
    DONATION = "donation",
    IMAGE = "image",
    MULTIPLE_OPTIONS = "multiple-options",
    NUMBER = "number",
    SINGLE_OPTION = "single-option",
    DIGITAL_CARD_VALUE = "digital-code-value",
    COUNTRY = "country",
    SPLITTER = "splitter",
    TEXT = "text",
    TEXTAREA = "textarea",
    THUMBNAIL = "thumbnail",
    TIME = "time",
    RADIO = "radio",
    CHECKBOX = "checkbox",
    MAP = "map",
    FILE = "file",// similar to image type (file-uploader component)
    COLOR_PICKER = "color_picker",
    BOOKING = "booking"
}
export interface ProductDetail {
    id: string;
    sku: string;
    name: string;
    description: string;
    url: string;
    promotion_title: string;
    subtitle: string;
    type: string;
    status: string;
    price: number;
    sale_price: number;
    regular_price: number;
    starting_price: null;
    quantity: number;
    max_quantity: number;
    discount_ends: number;
    is_taxable: boolean;
    has_read_more: boolean;
    can_add_note: boolean;
    can_show_remained_quantity: boolean;
    can_upload_file: boolean;
    has_custom_form: boolean;
    is_on_sale: boolean;
    is_hidden_quantity: boolean;
    is_available: boolean;
    is_out_of_stock: boolean;
    weight: null;
    calories: null;
    image: SimpleImage;
    brand: Brand;
    donation?: ProductDonation;
    images: Image[];
    tags: Tag[];
    notify_availability: null;
    rating: Rating;
    options: Option[];
    sold_quantity: number;
    category: Category;
}
export interface SimpleImage {
    url: string;
    alt: string;
}
export interface Category {
    name: string;
    url: string;
    icon: string;
}
export interface ProductDonation {
    target_message?: string;
    collected_amount?: number;
    target_amount?: number;
    target_percent?: number;
    target_end_date?: string;
    can_donate: boolean;
    custom_amount_enabled: boolean;
}
export interface Image {
    id: number;
    url: string;
    main: boolean;
    three_d_image_url: string;
    alt: string;
    video_url: string;
    type: string;
    sort: number;
}
export interface Option {
    id: number;
    name: string;
    required: boolean;
    type: string;
    placeholder: string;
    option_type: string;
    not_same_day_order: boolean;
    availability_range: number;
    from_date_time: null;
    to_date_time: null;
    visibility_condition?: {
        option: number;
        operator: "=" | "!=";
        value: number;
    };
    details?: Detail[];
    condition_attributes: string;
    value?: any;
    length?: number;
    donation?: Donation;
}
export interface Donation {
    custom_amount_enabled: boolean;
    target_message?: string;
    target_date: string | "2023-04-18";
    target_end_date: string | "2023-04-18";
    target_amount: number;
    collected_amount: number;
    can_donate: boolean;
}
export interface Detail {
    id: number;
    option_id: number;
    name: string;
    additional_price: number;
    option_value: null | string;
    image: null | string;
    color: null | string;
    is_out: boolean;
    skus_availability?: {
        [sku_id: number]: boolean;
    };
    is_selected: boolean;
    is_default?: 0 | 1;
    code?: string;
    type?: string;
}
export interface Brand {
    id: string;
    url: string;
    name: string;
    logo: string;
}
export interface PreTaxPrice {
    amount: number;
    currency: Currency;
}
export declare enum Currency {
    Sar = "SAR"
}
export interface Promotion {
    title: string;
    sub_title: string;
}
export interface Rating {
    count: number;
    stars: number;
}
export interface Tag {
    name: string;
    url: string;
}
export interface OptionConfig {
    singleOption?: OptionDisplayType;
    multipleOption?: OptionDisplayType;
}
export interface OptionDisplayType {
    type: 'button' | 'default';
}
