import { Filter, FilterValue } from "../salla-filters/interfaces";
export declare class SallaPriceRange {
    /**
     * Minimum price threshold value
     */
    minPrice: any;
    /**
     * Maximum price threshold value
     */
    maxPrice: any;
    /**
     * Product price range filter option object instance
     */
    option: Filter;
    /**
     * Currently selected price filter data
     */
    filtersData: any;
    min: number;
    max: number;
    priceOptions: any;
    moreThanLabel: string;
    lessThanLabel: string;
    toLabel: string;
    fromLabel: string;
    typing: boolean;
    isMin: boolean;
    isRTL: Boolean;
    /**
     * Custome event emitted when there is a change in price input.
     */
    changed: any;
    isReady: Boolean;
    minInput: HTMLInputElement;
    maxInput: HTMLInputElement;
    filterValues: Array<FilterValue>;
    connectedCallback(): void;
    /**
     * reset the price range inputs
     */
    reset(): Promise<void>;
    private getPriceLabel;
    minInputValidation(value: number): void;
    maxInputValidation(value: any): void;
    private changedEventHandler;
    private handleMinMaxPrice;
    private isChecked;
    private handleMinPrice;
    private handleMaxPrice;
    render(): any;
    componentDidLoad(): void;
}
