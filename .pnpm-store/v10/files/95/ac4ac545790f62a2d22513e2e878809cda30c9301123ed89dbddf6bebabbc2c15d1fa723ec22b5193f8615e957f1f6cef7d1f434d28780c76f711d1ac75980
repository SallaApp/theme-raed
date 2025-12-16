export declare enum DiscountType {
    PERCENTAGE = "percentage",
    FIXED = "fixed"
}
export interface Discount {
    name?: string;
    type?: DiscountType;
    value?: number;
    min_spend?: number;
}
export interface TieredOfferDetails {
    based_on?: string;
    ends_at?: number;
    start_value?: number;
    end_value?: number;
    current_value?: number;
    discounts?: Discount[];
    with_current_cart?: boolean;
    applied_with_coupon?: boolean;
}
export interface Offer {
    id?: number;
    type?: string;
    title?: string;
    description?: string;
    details?: TieredOfferDetails | null;
}
export interface TieredOfferTier {
    name: string;
    tier_name: string;
    discount: string;
    icon: string;
    threshold: number;
    text_color?: string;
    index: number;
}
export interface TieredOfferData {
    current_tier: string;
    tiers: TieredOfferTier[];
}
export interface TieredOfferConfig {
    staticIcons: string[];
    staticColors: string[];
}
