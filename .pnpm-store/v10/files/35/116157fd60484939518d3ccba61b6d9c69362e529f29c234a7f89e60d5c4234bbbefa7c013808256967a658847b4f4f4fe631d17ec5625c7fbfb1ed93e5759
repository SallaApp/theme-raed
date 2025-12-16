import {Price} from "./common";

export type UrlHelper = (path: string) => string; //add any path to current url, ex: `salla.url('cart?anything=data')` output => `https://store_domain.com/cart?anything=data`
export type PageName = 'blog.index'
    | 'blog.index.author'
    | 'blog.index.category'
    | 'blog.index.tag'
    | 'brands.index'
    | 'cart'
    | 'customer.orders.index'
    | 'customer.orders.index.pending'
    | 'customer.orders.single'
    | 'customer.profile'
    | 'customer.notifications'
    | 'customer.wishlist'
    | 'index'
    | 'page-single'
    | 'product.index'
    | 'product.index.latest'
    | 'product.index.offers'
    | 'product.index.search'
    | 'product.index.tag'
    | 'product.single'
    | 'thank-you';

export interface UrlHelpers {
    asset: UrlHelper;
    base: UrlHelper;
    get: UrlHelper;
    cdn: UrlHelper;
    api: UrlHelper;
    is_page: (pageName: PageName) => boolean;
}

export default interface SallaHelpers {
    //Numbers helpers
    digitsOnly: (num: string | number) => number;
    inputDigitsOnly: (input: string | HTMLInputElement) => number;
    number: (num: String|number, forceEnglish?: boolean) => number | string;
    money: (num: number | Price, useSarSymbolIfEnabled?: boolean) => string;

    //Nested objects helpers
    setNested: (object: Object, key: `${string}.${string}` | string, value: any) => Object;
    getNested: (object: Object, key: `${string}.${string}` | string, default_?: any) => any;
    /**
     * @example
     * 1- initial data:         `let data={items:{total:100,...}};`
     * 2- input:                `<input name="items[total]" value="new-value">`
     * 3- getData as Object:    `salla.helpers.inputData('items[total]', 'new-value', data)`
     * 4- output:               `{name: items: value:{total:[100, 'new-value'],...}}`
     */
    inputData: (inputName: `${string}[${null | string | number}]`, inputValue: any, data?: Object) => { name: string, value: string | number | Object | string[] | number[] };

    //Url helpers
    url: UrlHelpers;
    addParamToUrl: (key: string, value: string | number) => string, //`salla.helpers.addParamToUrl('lang','ar')` => `https://store_domain.com/cart?lang=ar`

    //for advance usage:
    debounce: (callback: Function, delay: number) => (...[]) => Promise<unknown>;
}