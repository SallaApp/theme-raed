import { EventEmitter } from '../../stencil-public-runtime';
export declare class SallaQuickOrder {
    host: HTMLElement;
    private agreementModal;
    private nameInput;
    private emailInput;
    private phoneInput;
    private termsInput;
    private submitBtn;
    /**
     * quick order title
     */
    quickOrderTitle: string;
    /**
     * quick order sub title
     */
    subTitle: string;
    /**
     * quick order pay button text
     */
    payButtonTitle: string;
    /**
     * quick order confirm pay button text
     */
    confirmPayButtonTitle: string;
    /**
     * agreement text from server or from props
     */
    agreementText: string;
    /**
     * is email required
     */
    isEmailRequired: boolean;
    /**
     * product id local or from page
     */
    productId: string;
    /**
     * product id local or from page
     */
    thanksMessage: string;
    /**
     * Quick Order Style
     */
    quickOrderStyle: 'gray' | 'white' | 'default';
    user: any;
    isAvailable: boolean;
    oneClick: boolean;
    expanded: boolean;
    isTermsRequired: boolean;
    countryCode: string;
    submitSucess: boolean;
    placeHolderEmail: string;
    emailOptional: string;
    agreementShowText: string;
    agreementModalHead: string;
    userNameLabel: string;
    termsChecked: boolean;
    /**
     * Custome DOM event emitter when order gets submitted successfully.
     */
    quickOrderSubmited: EventEmitter;
    constructor();
    private getBtnColor;
    private getErrorMessage;
    private handleInvalidInput;
    private setWrapperHeight;
    private getDarkOrLight;
    private getStyleColor;
    submit(e: any, checkOneClick?: boolean): Promise<void | HTMLElement>;
    private getPayload;
    formatAgreementText(agreement_text: any, length?: number): any;
    private loadQuickOrderSettings;
    private initComponentData;
    componentWillLoad(): Promise<unknown>;
    render(): any;
    componentDidLoad(): void;
}
