import Offer from "./offer-schema";
/**
 * @slot header - The top of the popup, has replaceable props `{name}`, `{message}`.
 * @slot product - Replaces product card, has replaceable props `{name}`, `{url}`, `{image}`, `{price}`.
 * @slot category - Replaces Category badge, has replaceable props `{name}`, `{url}`.
 */
export declare class SallaOfferModal {
    private categorySlot;
    private modal;
    host: HTMLElement;
    offer: null | Offer;
    offer_name: string;
    offer_message: string;
    hasError: boolean;
    errorMessage: string;
    productID: number;
    offer_type: string;
    constructor();
    translationLoaded: boolean;
    addToCartLabel: string;
    /**
 * Emits a promotion viewed event for analytics tracking
 * @param offer - The offer being viewed in the modal
 */
    private emitPromotionViewed;
    /**
     * Emits a promotion clicked event for analytics tracking
     * @param offer - The offer being clicked in the modal
     */
    private emitPromotionClicked;
    /**
     * Show the available offers for the product
     * @param product_id
     */
    open(product_id: number): Promise<any>;
    /**
     * Show offer details
     * @param {Offer} offer
     */
    showOffer(offer: any): Promise<void>;
    private rememberMe;
    private addToCart;
    private getOfferContent;
    render(): any;
}
