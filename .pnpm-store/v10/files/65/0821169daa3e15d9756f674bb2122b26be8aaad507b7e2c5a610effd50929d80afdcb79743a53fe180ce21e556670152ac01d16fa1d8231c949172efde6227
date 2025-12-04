/**
 * 💡 Notice that you can use dotted key for setting or getting values, ex:
 *  - salla.storage.set('cart.id',1)
 *  - `salla.storage.get('cart.id')` or `salla.storage.get('cart')?.id`
 */

interface StoreJsAPI {
    readonly version: string;
    readonly enabled: boolean;
    get: (key: string, defaultValue?: unknown) => unknown;
    set: (key: string, value: unknown) => unknown;
    remove: (key: string) => void;
    each: (callback: (value: unknown, namespacedKey: string) => void) => void;
    clearAll: () => void;
    hasNamespace: (namespace: string) => boolean;
    createStore: (plugins: ((...args: unknown[]) => unknown)[] | undefined, namespace: string | undefined) => StoreJsAPI;
    addPlugin: (plugin: (...args: unknown[]) => unknown) => void;
    namespace: (namespace: string) => StoreJsAPI;
}

export interface ItemWithTTL {
    value: unknown;
    expiry: number;
}

export default interface IStorage {
    store: StoreJsAPI;
    session: StoreJsAPI;
    cookie: StoreJsAPI;
    clearableItems: string[];

    set: (key: string, value: unknown) => unknown;
    get: (key: string, defaultValue: unknown) => unknown;
    remove: (key: string) => void;
    clearAll: (force?: boolean) => void;
    setWithTTL: (key: string, value: unknown, ttlInMinutes: number, store: 'store' | 'session' | 'cookie') => unknown;
    getWithTTL: (key: string, defaultValue: unknown, store: 'store' | 'session' | 'cookie') => unknown;
}
