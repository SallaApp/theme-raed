import { Source, Review, ReviewType, SortingOption } from "./interfaces";
export declare class SallaReviews {
    constructor();
    /**
     * Controls the visibility of a link to the reviews page.
     *
     * When set to `true`, a link will be displayed allowing users to navigate to the full reviews section.
     *
     * @type {boolean}
     */
    displayAllLink: boolean;
    /**
     * Specifies the data source for reviews.
     *
     * Valid options include:
     *  - 'categories': Retrieves reviews for specific product categories.
     *  - 'products': Retrieves reviews for individual products.
     *  - 'json': Retrieves reviews from a custom JSON payload provided in `sourceValue`.
     *
     * When using 'json' as the source, a valid payload must be provided in `sourceValue`.
     *
     * @type {Source}
     * @default "store"
     */
    source?: Source;
    /**
     * Provides data specific to the chosen source.
     *
     * Required when using 'categories', 'products', or 'json' as the source:
     *   - 'categories': An array of category IDs.
     *   - 'products': An array of product IDs.
     *   - 'json': A custom JSON object containing review data.
     *
     * @type {string | object | Array<number>}
     */
    sourceValue?: string | object | Array<number>;
    /**
     * Defines the maximum number of reviews to retrieve from the API.
     *
     * @type {number}
     * @default 5
     */
    limit: number;
    /**
     * Specifies the type of reviews to fetch.
     * Available options:
     * - "all": Fetches reviews from all sources.
     * - "store": Fetches reviews specific to the store.
     * - "products": Fetches reviews specific to products.
     *
     * @type {ReviewType}
     * @default store
     */
    type: ReviewType;
    /**
     * Specifies the sorting criteria for the fetched reviews.
     * Available options:
     * - "top_rating": Sorts reviews based on top ratings.
     * - "random": Sorts reviews randomly.
     * - "latest": Sorts reviews based on the latest ones (default).
     *
     * @type {SortingOption}
     * @default latest
     */
    sort: SortingOption;
    /**
     * Specifies whether to hide customer information in the component.
     * When set to true, customer information will be hidden.
     * Defaults to false, meaning customer information will be displayed.
     */
    hideCustomerInfo: boolean;
    reviews: Array<Review>;
    isRTL: boolean;
    showReviews: boolean;
    testimonialText: string;
    displayAllLinkText: string;
    private displayAllURL;
    fetchReviews(): any;
    componentWillLoad(): Promise<void>;
    render(): any;
}
