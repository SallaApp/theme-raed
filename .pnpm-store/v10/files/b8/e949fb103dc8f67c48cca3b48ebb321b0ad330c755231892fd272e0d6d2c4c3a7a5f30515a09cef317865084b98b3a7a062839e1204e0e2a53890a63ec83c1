import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot footer - Replaces the footer, by default it contains: verify button, resend, and timer
 * @slot after-footer - placeholder position
 */
export declare class SallaVerify {
    constructor();
    private modal;
    private body;
    private code;
    private btn;
    private resendMessage;
    private timer;
    private resend;
    private otpInputs;
    private firstOtpInput;
    private data;
    translationLoaded: boolean;
    host: HTMLElement;
    /**
     * Should render component without modal
     */
    display: 'inline' | 'modal';
    /**
     * Verifying method
     */
    type: 'mobile' | 'email';
    /**
     * should auto reloading the page after success verification
     */
    autoReload: boolean;
    /**
     * Once the api verify success, it will be login the customer in web pages
     */
    supportWebAuth: boolean;
    /**
     * Event when success verification
     */
    verified: EventEmitter;
    title: string;
    resendAfter: number;
    hasError: boolean;
    errorMessage: string;
    /**
     * to use: `salla.api.auth.verify` or `salla.profile.verify`
     */
    isProfileVerify: boolean;
    private splitNumber;
    private modifyNext;
    private checkAllInputs;
    private handleKeyUp;
    private handlePaste;
    private handleInput;
    private resetError;
    private handleFocus;
    /**
     * Get current code
     * @return {string}
     */
    getCode(): Promise<string>;
    /**
     * Open verifying modal
     * @param data
     */
    open(data: any): Promise<void>;
    private toggleOTPSubmit;
    private reset;
    private resendTimer;
    private resendCode;
    private submit;
    render(): any;
    private myBody;
}
