export interface OrderProduct {
    id: number | string;
    name: string;
    url: string;
    quantity?: number;
    price?: number | string;
    sale_price?: number | string;
    regular_price?: number | string;
    is_on_sale?: boolean;
    image?: ProductImage | string;
    options?: ProductOption[];
    sub_products?: OrderProduct[];
}
export interface SubProduct {
    id: number | string;
    name: string;
    quantity?: number;
    price?: number | string;
    image?: ProductImage;
    options?: ProductOption[];
    regular_price?: number | string;
    sale_price?: number | string;
    is_on_sale?: boolean;
    url?: string;
}
export interface ProductImage {
    url: string;
    alt?: string;
}
export interface ProductOption {
    id: number | string;
    name: string;
    value: string | number;
    display_value?: string;
    price?: number | string;
    type?: string;
    is_image?: boolean;
    is_file?: boolean;
    is_color_picker?: boolean;
    is_map?: boolean;
    color?: string;
    latitude?: number | string;
    longitude?: number | string;
}
export interface OrderDetailsProps {
    product: OrderProduct;
    accordionId?: string;
    accordionKey?: string | number;
    accordionSize?: 'sm' | 'md' | 'lg';
    options?: ProductOption[];
    collapsible?: boolean;
    collapsed?: boolean;
    bordered?: boolean;
    placeholderImage?: string;
}
