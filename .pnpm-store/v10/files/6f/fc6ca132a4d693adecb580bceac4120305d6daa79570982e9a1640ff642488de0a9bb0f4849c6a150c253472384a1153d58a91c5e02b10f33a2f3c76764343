import { EventEmitter } from '../../stencil-public-runtime';
import { Filter } from "./interfaces";
export declare class SallaFilters {
    constructor();
    componentWillLoad(): Promise<void>;
    host: HTMLElement;
    /**
     * Array of filter options
     */
    filters?: Filter[];
    private isReady;
    isSidebarOpen: boolean;
    filtersData: object | any;
    apply: string;
    reset: string;
    /**
     * Custom event fired when the selected filters are changed.
     */
    changed: EventEmitter;
    /**
     * Method to get filter data.
     */
    getFilters(): Promise<any>;
    /**
     * Apply filter action.
     */
    applyFilters(): Promise<void>;
    private encodeFilters;
    /**
     * Reset selected filters.
     */
    resetFilters(): Promise<void>;
    private removeFiltersQueryParams;
    /**
     * @param {{target:HTMLInputElement}} event
     * @param option
     * @param value
     * @private
     */
    private handleOptionChange;
    render(): any;
    componentDidLoad(): void;
}
