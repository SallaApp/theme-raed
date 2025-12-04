/**
 * @see https://infinite-scroll.com/events.html
 */
export default interface InfiniteScrollEvent {
    onScrollThreshold: (callback: (event: Event) => void) => void;
    onRequest: (callback: (event: Event, path: string, fetchPromise: Promise<any>) => void) => void;
    onLoad: (callback: (event: Event, body: Body, path: string, response: Response) => void) => void;
    onAppend: (callback: (event: Event, body: Body, path: string, items: NodeList, response: Response) => void) => void;
    onError: (callback: (event: Event, error: Error, path: string, response: Response) => void) => void;
    onLast: (callback: (event: Event, body: Body, path: string) => void) => void;
    onHistory: (callback: (event: Event, title: string, path: string) => void) => void;
}
