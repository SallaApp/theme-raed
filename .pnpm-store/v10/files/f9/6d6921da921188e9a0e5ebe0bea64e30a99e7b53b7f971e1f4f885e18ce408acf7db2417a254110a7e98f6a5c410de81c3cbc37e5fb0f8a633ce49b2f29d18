import {SuccessResponse, Product} from '../common'

export interface AdvertisementColor {
    bg: string;
    text: string;
}

export interface HeaderBreadcrumb {
    title: string;
    url: string;
}

export interface HeaderAdvertisement {
    id: number;
    icon: string;
    title: string;
    description: string;
    url?: string;
    close_url: string;
    target: string;
    colors: AdvertisementColor[];
}

export interface HeaderMenuItem {
    has_children?: boolean;
    url?: string;
    title?: string;
    attrs?: string;
    link_attrs?: string;
    products?: Product[];
    children?: Header[];
}

export interface Header {
    menu: HeaderMenuItem[];
    advertisement?: HeaderAdvertisement[];
    breadcrumbs: HeaderBreadcrumb[];
}

// Footer
export interface FooterMenu {
    id?: number;
    title?: string;
    url?: string;
    target?: string;
}

export interface FooterContact {
    name?: string;
    type?: string;
    icon?: string;
    url?: string;
    value?: string;
}

export interface FooterMobileApp {
    name?: string;
    url?: string;
    // TODO?: ask @jamal to add this field to the DTO,
    // otherwise there is no way to get the image of the mobile app. 
    // (i.e. for the sake of simplicity)
    icon?: string; 
}

export interface FooterPaymentMethod {
    payment_methods
}

export interface FooterSocialLink {
    name?: string;
    type?: string;
    icon?: string;
    url?: string;
}

export interface Footer {
    contacts?: FooterContact[];
    apps?: FooterMobileApp[];
    items?: FooterMenu[];
    payment_methods?: string[];
    links?: FooterSocialLink[]
}

// Review types
export interface Review {
    rating?:      number;
    content?:     string;
    status?:      string;
    created_at?:  CreatedAt;
    replies?:     any[];
    text?:        string;
    type?:        string;
    avatar?:      string;
    name?:        string;
    stars?:       number;
    is_pending?:  boolean;
    has_order?:   boolean;
    kind?:        string;
    session_id?:  string;
    customer_id?: number;
    city?:        string;
    date?:        string;
}

export interface CreatedAt {
    date?:          string;
    timezone_type?: number;
    timezone?:      string;
}

export interface ReviewQueryParams {
    limit?: number;
    source: 'all' | 'store' | 'categories' | 'products' | 'json';
    source_value: number | string | object | Array<string | number>;
}

export namespace ComponentApiResponse {
    export interface menus extends SuccessResponse {
        data: HeaderMenuItem[] | FooterMenu[] | []
    }

    export interface reviews extends SuccessResponse {
        data: Array<Review> | []
    }
}

export default interface ComponentApi {
    menus?: (component: string) => Promise<ComponentApiResponse.menus>,
    getReviews?: (queryParams: ReviewQueryParams) => Promise<ComponentApiResponse.reviews>
}