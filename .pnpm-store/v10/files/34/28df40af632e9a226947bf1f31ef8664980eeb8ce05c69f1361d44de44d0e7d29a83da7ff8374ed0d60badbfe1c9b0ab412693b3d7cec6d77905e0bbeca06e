export interface Review {
    id: number;
    replies: Record<string, unknown>[];
    content: string;
    type: string;
    avatar: string;
    name: string;
    stars: number;
    is_pending: boolean;
    has_order: boolean;
    likes_count: number | null;
    customer_id: number;
    city: string;
    date: number;
    images: string[];
    text: string;
    can_update: boolean;
    product: Product;
    shipping: unknown;
    created_at: CreatedAt;
}
export interface Product {
    id: number;
    name: string;
    sku: number | string | null;
    subtitle: string | null;
    url: string;
    promotion_title: string | null;
    status: string;
    type: string;
    description: string;
    quantity: number;
    max_quantity: number;
    sold_quantity: number;
    price: number;
    regular_price: number;
    sale_price: number;
    starting_price: number | null;
    discount_ends: string | null;
    discount_percentage: string;
    image: Image;
    calories: number | null;
    weight: string | null;
    base_currency_price: number;
    currency: string;
    donation: unknown;
    images: Image[];
    rating: number | null;
    options: unknown[];
    tags: unknown[];
    brand: Brand;
    notify_availability: boolean | null;
    category: Category;
    can_add_note: boolean;
    can_donate: boolean;
    can_upload_file: boolean;
    can_show_sold: boolean;
    can_show_remained_quantity: boolean;
    has_3d_image: boolean;
    has_custom_form: boolean;
    has_options: boolean;
    has_read_more: boolean;
    has_size_guide: boolean;
    has_metadata: boolean;
    is_available: boolean;
    is_hidden_quantity: boolean;
    is_in_wishlist: boolean;
    is_on_sale: boolean;
    is_out_of_stock: boolean;
    is_require_shipping: boolean;
    is_taxable: boolean;
    is_giftable: boolean;
    is_donation: boolean;
    is_booking: boolean;
    brand_id: number;
    target_donating_enable: boolean;
    price_as_float: number;
    price_as_float_for_payment: number;
    currency_for_payment: string;
    sale_end: string | null;
    customized_sku_quantity: number;
    auto_include_tax: boolean | null;
    with_tax: boolean;
    enabled_image_upload: boolean | null;
    max_quantity_per_order: number | null;
    source: string | null;
    available: boolean | null;
    notes: unknown[] | null;
    attachments: unknown;
    add_to_cart_label: string;
    show_availability: boolean;
}
export interface Image {
    url: string;
    alt: string;
}
export interface Image {
    id?: number;
    url: string;
    main?: boolean;
    three_d_image_url?: string;
    alt: string;
    video_url?: string;
    type?: string;
    sort?: number;
}
export interface Brand {
    id?: number;
}
export interface Category {
    id: number;
    name: string;
    url: string;
    image: Image;
}
export interface CreatedAt {
    date: string;
    timezone_type: number;
    timezone: string;
}
