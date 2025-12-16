import Lang from 'lang.js'

type Replacements = { [key: string]: string }

/**
 * @Example
 * salla.lang.get('pages.cart.free_shipping_alert',{amount:salla.money(100)})
 */
export default interface SallaLang extends Lang {
    translationsLoaded: boolean;
    onLoaded: (callback: Function) => void;
    get: (key: string, replacements?: Replacements, locale?: string | 'ar') => string;
    set: (key: string, message: string) => SallaLang;
}