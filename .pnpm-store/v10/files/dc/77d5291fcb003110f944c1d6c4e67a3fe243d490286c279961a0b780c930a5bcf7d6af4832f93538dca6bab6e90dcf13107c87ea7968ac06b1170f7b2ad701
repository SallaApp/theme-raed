export type ConfigKey =
    'maintenance'
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
    | 'languages.ar'
    | 'languages.en'
    | '`languages.${string}`'
    | 'currencies.SAR'
    | 'currencies.USD'
    | '`currencies.${string}`'
    | 'page.title'
    | 'page.slug'
    | 'page.id';

export default interface Config {
    merge: (config: any) => Config;
    set: (key: ConfigKey | string, value: string | any) => Config;
    get: (key: ConfigKey | string, default_?: any) => any;
    all: () => any;
    isDebug: () => boolean; // you can make it debug in all requests using salla.storage.set('debug',true)
}