type ElementOrSelector = string | HTMLElement;
type EventTypes = 'click' | 'keyup' | 'input' | 'change' | string;
export default interface AppHelpers {
    toggleClassIf: (selector: string, classes1: string | Array<string>, classes2: string | Array<string>, callback: (element: HTMLElement) => boolean) => AppHelpers;
    toggleElementClassIf: (element: HTMLElement, classes1: string | Array<string>, classes2: string | Array<string>, callback: (element: HTMLElement) => boolean) => AppHelpers;

    isValidEmail: (email: string) => boolean;

    element: (selector: ElementOrSelector) => HTMLElement | undefined;
    watchElement: (name: string, selector: ElementOrSelector) => AppHelpers;
    watchElements: (elements: { [key: string]: [value: ElementOrSelector] }) => AppHelpers;
    hideElement: (element: ElementOrSelector) => AppHelpers;
    showElement: (element: ElementOrSelector) => AppHelpers;
    //💡 you can pass one or multi classes: this.removeClass(element, 'class_1', 'class_2', ...)
    removeClass: (element: ElementOrSelector, ...className: string[]) => AppHelpers;
    addClass: (element: ElementOrSelector, ...className: string[]) => AppHelpers;
    //💡instead of: `document.querySelectorAll('.test').forEach(element=>{...})`
    // you can use: `this.all('.test', element=>{...})`
    all: (element: ElementOrSelector, callback: (element: HTMLElement) => void) => AppHelpers;

    //💡instead of: `document.querySelectorAll('.test').forEach(el => el.addEventListener('keyup', callback));`
    // you can use: `this.on('.test', 'keyup', callback)`
    // or can use: `this.onKeyUp('.test', callback)`
    on: (eventType: EventTypes, element: ElementOrSelector, callback: EventListener, options?: AddEventListenerOptions) => AppHelpers;
    onClick: (element: ElementOrSelector, callback: EventListener) => AppHelpers;
    onKeyUp: (element: ElementOrSelector, callback: EventListener) => AppHelpers;
    onEnter: (element: ElementOrSelector, callback: EventListener) => AppHelpers;
    debounce: (callback: () => unknown) => (...data: any | undefined) => Promise<unknown>
}
