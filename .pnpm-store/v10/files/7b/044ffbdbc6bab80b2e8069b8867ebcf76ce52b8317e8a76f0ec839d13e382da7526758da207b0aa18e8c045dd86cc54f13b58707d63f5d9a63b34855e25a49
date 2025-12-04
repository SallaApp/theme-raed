import {RequestError} from "../common";

export interface requestPayload {
    namespace: string | 'cart';
    action: string | 'latest';
    hook: string | 'latest';
    url: string | 'cart/latest';
    payload: {} | { params: {} };
    method: 'get' | 'post' | 'put' | 'delete';
    headers?: {};
}


export default interface DocumentEvent {
    onClick: (selector: string | ((event) => void), callback?: (event) => void) => void;
    onChange: (selector: string | ((event) => void), callback?: (event) => void) => void;
    onSubmit: (selector: string | ((event) => void), callback?: (event) => void) => void;
    onKeyup: (selector: string | ((event) => void), callback?: (event) => void) => void;
    onLeaving: (event: BeforeUnloadEvent) => boolean; //return false to show alert 'Changes you made may not be saved.'
    onRequest: (payload: requestPayload) => void; //💡handy when there is need to prevent request by throwing an error `throw 'stop the request';`.
    onRequestFailed: (payload: requestPayload, error?: RequestError) => void;
    /**
     * Helper method to fake firing event on element, for
     * @example someInput.addEventListener("change",()=>{...});
     * we want to fire this event programmatically, we can do that by:
     * @example salla.document.event.fireEvent(someInput, 'change', {'bubbles': true})
     */
    fireEvent: (element: HTMLElement, eventName: 'click' | 'change' | string, payload: undefined | Object) => void;
}