/*!
 * Crafted with ❤ by Salla
 */
import { forceUpdate } from "@stencil/core";
export function TrackedPromise(fn, options = {}) {
    options = Object.assign({ initialData: undefined, initialStatus: 'idle' }, options);
    return (target, propertyKey) => {
        const trackedPromise = Object.assign(function (...args) {
            const update = (newState) => {
                Object.assign(this[propertyKey], newState);
                forceUpdate(this);
            };
            update({ status: 'pending', error: undefined });
            return fn.call(this, ...args).then((data) => {
                update({ status: 'success', data, error: undefined });
                return data;
            }, (error) => {
                update({ status: 'error', error });
                return Promise.reject(error);
            });
        }, { status: options.initialStatus, data: options.initialData, error: undefined });
        Object.defineProperty(target, propertyKey, {
            value: trackedPromise,
        });
    };
}
