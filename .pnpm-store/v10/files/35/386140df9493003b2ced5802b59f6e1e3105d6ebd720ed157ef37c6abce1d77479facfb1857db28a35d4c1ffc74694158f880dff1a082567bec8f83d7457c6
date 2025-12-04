export type NotifyType = 'error' | 'success' | 'info' | string;
export type Notifier = (message: string, type: NotifyType, data?: object | any) => void | unknown;
export type Logger = (...data: string[]) => void | unknown;
export default interface SallaNotify {
    fire: (message: string, type: NotifyType, data?: object | any) => Notifier; //default is just `alert(message)
    setNotifier: (callback: Notifier) => void;// handy to override notifier used by salla.notify.fire(salla.success, salla.error, salla.info)
    log: Logger; //default is just `console.log(...data)`
    setLogger: (callback: Logger) => void;// handy to override logger used by salla.log()
    error: (message: string, data?: object | any) => Notifier; //an alias for fire(message, salla.notify.types.error, data)
    success: (message: string, data?: object | any) => Notifier; //an alias for fire(message, salla.notify.types.success, data)
    info: (message: string, data?: object | any) => Notifier; //an alias for fire(message, salla.notify.types.info, data)
    sallaInitiated;
    types: { error: 'error', success: 'success', info: 'info' }; //handy to be overridden, to be passed via salla.error, salla.info, salla.success second argument when calling salla.notify.fire(message, /*{type}*/, data)
}