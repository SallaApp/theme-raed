export declare class SallaLoginModal {
    constructor();
    host: HTMLElement;
    /**
     * Does the merchant allow to login using email
     */
    isEmailAllowed: boolean;
    /**
     * Does the merchant/current location for visitor allow to login using mobile, By default outside KSA is `false`
     */
    isMobileAllowed: boolean;
    /**
     * Does the merchant require registration with email & mobile
     */
    isEmailRequired: boolean;
    /**
     * Once the api verify success, it will be login the customer in web pages
     */
    supportWebAuth: boolean;
    /**
     * Display the login inline
     */
    inline: boolean;
    /**
     * The store ID for authentication
     */
    storeId: string | number;
    /**
     * The API endpoint for authentication
     */
    api: string;
    /**
     * Custom headers to be sent with API requests
     */
    headers: {
        [key: string]: string;
    } | string;
    /**
     * Reload after a successful login
     */
    withoutReload: boolean;
    /**
     * The source of opening login modal
     */
    source: string;
    private modal;
    private iframe;
    private createPassKey;
    private htmlElement;
    messages: object[];
    isClosable: boolean;
    iframeLoaded: boolean;
    scrolling: string;
    direction: string;
    canRenderIframe: boolean;
    componentDidLoad(): void;
    /**
     * Open login component
     */
    open(_event?: any): Promise<void | HTMLElement>;
    private close;
    private handleIframeReadyAction;
    private observeDarkModeChanges;
    private handleIframeStorageAction;
    private sendMessageToIframe;
    private sendInitMessage;
    private handleGuestCheckout;
    private openModal;
    render(): any;
    private getLoginDom;
}
