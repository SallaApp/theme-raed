import { Order, OrderQueryParameters } from './interface';
import { Pagination } from "../../interfaces";
export declare class SallaOrder {
    constructor();
    /**
     * Query Parameter to send along with the fetch request
     */
    params: OrderQueryParameters;
    /**
     * Load more text
     */
    loadMoreText: string;
    orderNumberText: string;
    totalOrderText: string;
    orderDateText: string;
    orderStatusText: string;
    noOrderText: string;
    load_more_text_trans: any;
    languageCode: string;
    orders: Array<Order>;
    pagination: Pagination;
    hasInfiniteScroll: boolean;
    total: number;
    nextPage: string;
    showPlaceholder: boolean;
    private status;
    private btnLoader;
    private infiniteScroll;
    private wrapper;
    host: HTMLElement;
    private loading;
    private initiateInfiniteScroll;
    loadMore(): Promise<void>;
    private handleResponse;
    private loadInitialData;
    private getSingleOrderItem;
    render(): any;
    componentWillLoad(): any;
}
