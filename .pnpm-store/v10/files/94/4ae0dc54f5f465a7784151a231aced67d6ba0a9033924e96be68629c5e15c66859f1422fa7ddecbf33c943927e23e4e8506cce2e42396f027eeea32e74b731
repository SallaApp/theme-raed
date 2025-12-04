export type TrackedPromiseState<T = any, K extends any[] = any> = ((...args: K) => Promise<T>) & {
    status: 'idle' | 'pending' | 'success' | 'error';
    data: undefined | T;
    error: any;
};
type TOptions = {
    initialData: any;
    initialStatus: 'idle' | 'pending' | 'success' | 'error';
};
export declare function TrackedPromise(fn: (...args: any[]) => Promise<any>, options?: Partial<TOptions>): (target: any, propertyKey: string) => void;
export {};
