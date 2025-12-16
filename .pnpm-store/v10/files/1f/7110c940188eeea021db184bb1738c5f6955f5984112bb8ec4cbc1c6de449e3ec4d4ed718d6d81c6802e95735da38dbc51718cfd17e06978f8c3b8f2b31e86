type ProductType = 'product' | 'service' | 'group_products' | 'codes' | 'digital' | 'food' | 'donating';
type Rating = 1 | 2 | 3 | 4 | 5;
type RequestError = Error & { response: any }
type RequestErrorEvent = (callback: (error: RequestError | string) => void) => void;
type RequestErrorEventWithData<data> = (callback: (error: RequestError | string, data) => void) => void;

export interface Price {
    amount: string;
    currency: string;
}

export interface Pagination {
    count?: number;
    total?: number;
    perPage?: number;
    currentPage?: number;
    totalPages?: number;
    links?: Array<string>;
}

export interface SuccessResponse {
    status: 200;
    success: true;
    data: {
        message?: string;
        events?: { [event_name: string]: any };
        [key: string]: any;
    };
    pagination?: Pagination
}

export interface ErrorResponse {
    status: 422 | 404;
    success: false;
    error: {
        message?: string | 'alert.invalid_fields';
        code?: any;
        case?: string | 'resend_counter' | 'invalid_code';
        events?: { [event_name: string]: any };
        fields?: { [field_name: string]: Array<string> };
        [key: string]: any;
    }
}

export interface Currency {
    code: string | 'SAR';
    name: string;
    symbol: string;
    amount?: number;
    country_code?: string;
}

export interface Product {
    id?:                         number|string;//it's coming string sometimes🌚
    name?:                       string;
    sku?:                        null | string;
    subtitle?:                   null | string;
    url?:                        string;
    promotion_title?:            null | string;
    status?:                     string;
    type?:                       string;
    description?:                string;
    quantity?:                   number | any;
    max_quantity?:               number;
    sold_quantity?:              any;
    price?:                      any[];
    regular_price?:              any[];
    sale_price?:                 any[];
    starting_price?:             any;
    discount_ends?:              any;
    discount_percentage?:        string;
    image?:                      MainImage;
    calories?:                   any;
    weight?:                     any;
    base_currency_price?:        any[];
    currency?:                   string;
    donation?:                   any;
    images?:                     ImageElement[];
    rating?:                     {count:number, stars:1|2|3|4|5};
    options?:                    any[];
    tags?:                       any[];
    brand?:                      Brand | any;
    notify_availability?:        any;
    category?:                   any;
    can_add_note?:               boolean;
    can_donate?:                 boolean;
    can_upload_file?:            boolean;
    can_show_sold?:              boolean;
    can_show_remained_quantity?: boolean;
    has_3d_image?:               boolean;
    has_custom_form?:            boolean;
    has_options?:                boolean;
    has_read_more?:              boolean;
    has_size_guide?:             boolean;
    is_available?:               boolean;
    is_hidden_quantity?:         boolean;
    is_in_wishlist?:             boolean;
    is_on_sale?:                 boolean;
    is_out_of_stock?:            boolean;
    is_require_shipping?:        boolean;
    is_taxable?:                 boolean;
    is_giftable?:                boolean;
    is_donation?:                boolean;
    is_booking?:                 boolean;
    brand_id?:                   number | any;
    target_donating_enable?:     boolean;
    price_as_float?:             number;
    price_as_float_for_payment?: number;
    currency_for_payment?:       string;
    sale_end?:                   any;
    customized_sku_quantity?:    any;
    auto_include_tax?:           any;
    with_tax?:                   boolean;
    enabled_image_upload?:       any;
    max_quantity_per_order?:     any;
    source?:                     any;
    available?:                  any;
    notes?:                      any;
    attachments?:                any;
    add_to_cart_label?:          string;
    show_availability?:          boolean;
    metadata?:                   any;
}

export interface MainImage {
    url?: string;
    alt?: string;
}

export interface Brand {
    id: string;
    url: string;
    name: string;
    logo: string;
}

export interface ImageElement {
    id?:                number;
    url?:               string;
    main?:              boolean;
    three_d_image_url?: string;
    alt?:               string;
    video_url?:         string;
    type?:              Type;
    sort?:              number;
}

export enum Type {
    Image = "image",
}


export interface Category {
    id: number;
    name: string;
    url: string;
}

export interface RequestInfo {
    endPoint: string;
    method: string;
    payload: any,
    options: {},
}

export interface UserInstance {
    id?:                     number;
    currency?:               string;
    language?:               string;
    first_name?:             string;
    last_name?:              string;
    phone?:                  Phone;
    email?:                  string;
    avatar?:                 string;
    gender?:                 string;
    birthday?:               string;
    notifications?:          number;
    loyalty_program_points?: number;
    pending_orders?:         string;
}

export interface Phone {
    code?:    string;
    number?:  number;
    country?: string;
}

export enum Genders {
    Female = 'female',
    Male = 'male',
}

export interface ProductMetadata {
    entity_id?: number;
    sections?: Section[];
}

export interface Section {
    id?: string;
    name?: string;
    fields?: Field[];
}

export interface Field {
    id?: string;
    name?: string;
    type?: string;
    value?: string;
}