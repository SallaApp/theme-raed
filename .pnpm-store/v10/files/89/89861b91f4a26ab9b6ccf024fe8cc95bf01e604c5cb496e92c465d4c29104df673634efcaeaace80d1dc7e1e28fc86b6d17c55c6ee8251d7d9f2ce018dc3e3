import {Currency} from "./common";

export interface Language {
    name: string;
    code: string;
    url: string;
    is_rtl: boolean;
    country_code: string;
}

type Installment = 'tabby_installment' | 'tamara_installment' | 'spotii_pay';
type PaymentName = Installment | 'mada' | 'credit_card' | 'paypal' | 'bank' | 'stc_pay' | 'apple_pay' | 'knet';
export type TwilightConfigName = 'maintenance'
    | 'debug'
    | 'events'
    | 'sdk'
    | 'sdk.notifier_handler_disabled'
    | 'store'
    | 'store.url'
    | 'store.id'
    | 'store.logo'
    | 'store.name'
    | 'store.api'
    | 'store.settings'
    | 'store.settings.auth'
    | 'store.settings.auth.email_allowed'
    | 'store.settings.auth.mobile_allowed'
    | 'store.settings.auth.is_email_required'
    | 'store.arabic_numbers_enabled'
    | 'store.payments'
    | 'store.installments'
    | 'user.type'
    | 'user.id'
    | 'user.email'
    | 'user.mobile'
    | 'user.language_code'
    | 'user.currency_code'
    | 'user.country_code'
    | 'theme.name'
    | 'theme.mode'
    | 'theme.translations_hash'
    | 'theme.color'
    | 'theme.color.primary'
    | 'theme.color.text'
    | 'theme.color.is_dark'
    | 'theme.color.reverse_primary'
    | 'theme.color.reverse_text'
    | 'languages'
    | 'currencies'
    | '`currencies.${string}`'
    | 'page.title'
    | 'page.slug'
    | 'page.id';

export interface TwilightConfigClass {
    merge(config: TwilightConfig): TwilightConfigClass;

    set(key: TwilightConfigName, value: any): TwilightConfigClass;

    get(key: TwilightConfigName, default_?: any): any;

    all(): TwilightConfig;
}

export interface TwilightConfig {
    /**
     * @deprecated
     */
    _token?: string;

    maintenance?: boolean;
    debug?: boolean;
    events?: { [event_name: string]: any };
    sdk?: {
        notifier_handler_disabled: boolean
    },
    store: {
        url: string;
        id: number;
        logo?: string;
        name?: string;
        api?: string;
        settings?: {
            auth: {
                email_allowed: boolean;
                mobile_allowed: boolean;
                is_email_required: boolean;
            };
            arabic_numbers_enabled: boolean;
            payments: PaymentName[];
            installments: Installment[];
        };
    };
    user?: {
        type?: 'user' | 'guest';
        id?: string | number;
        email?: any;
        mobile?: any;
        language_code?: string;
        currency_code?: string;
        country_code?: string;
    };
    theme?: {
        name?: string;
        mode?: string;
        translations_hash?: string;
        color?: {
            primary: string | '#5cd5c4';
            text: string | '#ffffff';
            is_dark: boolean;
            reverse_primary: string | '#5cd5c4';
            reverse_text: string | '#005544';
        }
    };
    languages?: Language[];
    currencies?: {
        SAR?: Currency;
        [key: string]: Currency;
    };
    page?: {
        title?: string;
        slug?: string;
        id?: number;//available in product.single, customer.orders.single, cart, thank-you, page-single
    };
}