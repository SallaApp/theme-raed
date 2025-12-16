import {Category as ShortCategory, Product, SuccessResponse} from "../../common";
import {Category} from "./request";

type offerType = 'buy_x_get_y' | 'percentage' | 'fixed_amount';
type paymentMethod = {
    id: number;
    slug: 'bank';
    name: 'BankTransfer';
};

export interface SizeGuide {
    name: string;
    description: string;
}

export interface Offer {
    id: number;
    name: string;
    message: string;
    expiry_date: string | '2022-02-22 00:00:00';
    formatted_date: string;
    offer_type: offerType;
    applied_to: 'order' | 'category' | 'product' | 'paymentMethod';
    buy: {
        type: 'product' | 'category';
        quantity: number;
        products?: Product[];
        categories?: ShortCategory[];
        min_amount?: number; //when offer_type != 'buy_x_get_y'
        min_items?: number; //when offer_type != 'buy_x_get_y'
        payment_methods: paymentMethod[];
    };
    get: {
        products?: Product[];
        categories?: ShortCategory[];
        type: 'product' | 'category';
        discount_type: 'free-product' | 'percentage';
        quantity?: number;//when discount_type == 'percentage'
        discount_amount?: number; //when offer_type != 'buy_x_get_y' or get.discount_type !='free-product'
    }
}

/**
 * Gifting System
 */
export interface Gift {
    quantity: number;
    product: Product;
    sender_name: string;
    images: GiftImage[];
    texts: GiftText[];
}

export interface GiftImage {
    id: number;
    url: string;
}

export interface GiftText {
    id: number;
    text: string;
}

export interface ProductDetail {
    id: number;
    name: string;
    description: string;
    url: string;
    promotion_title: string;
    subtitle: string;
    type: string;
    status: string;
    weight?: string;
    calories?: number;
    sku?: string;
    rating?: Rating;
    price: number;
    sale_price: number;
    regular_price: number;
    starting_price?: number;
    quantity?: number;
    sold_quantity: number;
    max_quantity: number;
    discount_ends?: Date;
    is_taxable: boolean;
    category?: ShortCategory;
    image: ProductMainImage;
    images: Image[];
    brand?: Brand;
    tags?: Tag[];
    options: ProductOption[];
    notify_availability?: ProductNotifyVisibility;
    donation?: ProductDonation;
    has_read_more: boolean;
    can_add_note: boolean;
    can_show_remained_quantity: boolean;
    can_show_sold: boolean;
    can_upload_file: boolean;
    has_custom_form: boolean;
    has_options: boolean;
    is_on_sale: boolean;
    is_hidden_quantity: boolean;
    is_available: boolean;
    is_in_wishlist: boolean;
    is_out_of_stock: boolean;
    is_require_shipping: boolean;
    base_currency_price: number;
    discount_percentage?: string;
    has_3d_image: boolean;
    has_size_guide: boolean;
    is_giftable: boolean;
    add_to_cart_label: string;
    currency: string;
}

export interface ProductDonation {
    target_message?: string;
    collected_amount: number;
    target_amount: number;
    target_percent: number;
    target_end_date?: Date;
    can_donate: boolean;
}

export interface ProductNotifyVisibility {
    channels: string[];
    subscribed: boolean;
}

export interface ProductMainImage {
    url: string;
    alt: string;
}

export interface Image {
    id: number;
    url: string;
    alt: string;
    video_url: string;
    type: string;
    main: boolean;
    three_d_image_url: string;
    sort: number;
}

export interface Brand {
    id: number;
    url: string;
    name: string;
    logo: string;
}

export interface Tag {
    name: string;
    url: string;
}

export interface ProductOption {
    id: number;
    name: string;
    type: string;
    required: boolean;
    availability_range: boolean;
    not_same_day_order: boolean;
    from_date_time: null;
    to_date_time: null;
    placeholder?: string;
    visibility_condition?: ProductOptionVisibilityCondition,
    condition_attributes?: string;
    element: string;
    details: ProductOptionDetail[]
}

export interface ProductOptionVisibilityCondition {
    option: number;
    operator: string;
    value: number;
}

export interface ProductOptionDetail {
    id: number;
    name: string;
    full_name: string;
    additional_price: number;
    option_value: string;
    image: string;
    color: string;
    is_selected: boolean;
    is_out: boolean;
}

export interface Rating {
    total: number;//double check if it still used
    count: number;
    rate: number;//double check if it still used
    starts:number;
}

export namespace ProductResponse {
    export interface search extends SuccessResponse {
        data: Product[];
        cursor: {
            current: number;
            previous?: string;
            next?: string;
            count: number;
        };
    }

    export interface getPrice extends SuccessResponse {
        data: {
            price: number;
            regular_price: number;
            has_sale_price: boolean;
        }
    }

    export interface categories extends SuccessResponse {
        data: Category | Category[]; //single category when getting subCategories by passing categoryId
    }

    export interface offers extends SuccessResponse {
        data: Offer[] | [];
    }

    export interface sizeGuides extends SuccessResponse {
        data: Array<SizeGuide>;
    }

    export interface giftResponse extends SuccessResponse {
        data: Gift
    }

    export interface giftToCart extends SuccessResponse {
        data: { redirect: string }
    }

    export interface giftImageUpload extends SuccessResponse {
        data: { url: string }
    }

    export interface detail extends SuccessResponse {
        data: ProductDetail
    }

    export interface lists extends SuccessResponse {
        data: Array<ProductDetail>
    }

    export interface options extends SuccessResponse {
        data: Array<ProductDetail>
    }
}