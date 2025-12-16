import { Item, LoyaltyProgram } from './loyalty-schema';
/**
 * @slot widget - When used, will activate the component and needs to emit `loyalty::open` event to open the modal. If not provided the default value will be used.
 * @slot points-applied-widget -  Widget to show information about the already exchanged points. It should have it's own resetting action and call the `resetExchange` method. If not provided, it will use the default value.
 */
export declare class SallaLoyalty {
    constructor();
    private modal;
    private confirmationModal;
    loyaltyProgram: LoyaltyProgram;
    buttonLoading: boolean;
    selectedItem: Item | undefined;
    askConfirmation: boolean;
    is_loggedin: boolean;
    hasError: boolean;
    errorMessage: string;
    translationLoaded: boolean;
    /**
     * The exchanged prize point
     */
    prizePoints: string | number;
    /**
     * Available customer points with which they can exchange.
     */
    customerPoints: number;
    /**
     * The prize title
     */
    prizeTitle: string;
    /**
     * Does the merchant allow to login using email
     */
    allowEmail: boolean;
    /**
     * Does the merchant/current location for visitor allow to login using mobile, By default outside KSA is `false`
     */
    allowMobile: boolean;
    /**
     * Does the merchant require registration with email & mobile
     */
    requireEmail: boolean;
    /**
     * Message to show for guest users.
     */
    guestMessage: string;
    private setSelectedPrizeItem;
    private handleLongText;
    private prizeItem;
    private getConfirmationModal;
    private getAfterExchangeUI;
    /**
     * Show loyalty modal
     */
    open(): Promise<any>;
    /**
     *
     * Hide loyalty modal
     */
    close(): Promise<HTMLElement>;
    /**
     *
     * Cancel Exchanged prizes
     */
    resetExchange(): Promise<any>;
    /**
     * Open Confirmation modal
     */
    private openConfirmation;
    /**
     * Cancel process
     */
    private cancelProcess;
    /**
     * Exchange loyalty points with the selected prize item
     * @param {number} loyalty_prize_id
     *
     */
    exchangeLoyaltyPoint(): Promise<any>;
    render(): any;
}
