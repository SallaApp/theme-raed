import { EventEmitter } from '../../stencil-public-runtime';
import { Phone } from './interfaces';
export declare class SallaTelInput {
    private TelInput;
    /**
     * Lazy load intl-tel-input library
     * This reduces initial bundle size by ~80-90KB
     */
    private loadTelInput;
    constructor();
    /**
     * Current mobile number
     */
    phone: string;
    /**
   * Automatically focus telephone input
   */
    autofocus: boolean;
    /**
     * input name
     */
    name: string;
    /**
     * input name
     */
    disabled: boolean;
    /**
     * Current country_code
     */
    countryCode: string;
    /**
     * Event emmitted when user enters a phone number.
     */
    phoneEntered: EventEmitter<Phone>;
    host: HTMLElement;
    mobileRequired: string;
    countryCodeLabel: string;
    mobileLabel: string;
    tooShort: string;
    tooLong: string;
    invalidCountryCode: string;
    invalidNumber: string;
    errorMap: string[];
    private phoneInput;
    private countryCodeInput;
    private errorMsg;
    private iti;
    /**
     * Get current values
     * @return {{mobile:number,countryCode:'SA'|string}}
     */
    getValues(): Promise<{
        [x: string]: any;
        countryCode: string;
        countryKey: any;
    }>;
    /**
     * Is current data valid or not
     * @return {boolean}
     */
    isValid(): Promise<boolean>;
    private initTelInput;
    private reset;
    private handleCountryInput;
    render(): any;
    componentDidLoad(): void;
}
