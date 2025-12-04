import { BreadcrumbItem } from './interfaces';
/**
 * @name SallaBreadcrumb
 * @description A StencilJS component for rendering breadcrumb navigation.
 * @tag salla-breadcrumb
 *
 * @slot item - Replaces breadcrumb item, has replaceable props `{url}`, `{title}`.
 * @slot icon - Replaces breadcrumb arrow icon.
 */
export declare class SallaBreadcrumb {
    host: HTMLElement;
    private readonly itemSlot;
    private readonly iconSlot;
    private sessionStorageKey;
    breadcrumbs: BreadcrumbItem[];
    constructor();
    componentWillLoad(): Promise<void | BreadcrumbItem[]>;
    private getSessionBreadcrumbs;
    /**
   * Helper function to determine if we're navigating to a new page that requires updating the session storage.
   */
    private isNewPage;
    private setBreadcrumbsFromArray;
    /**
     * Sanitizes the breadcrumb title by splitting it on the `|` character and returning
     * the part based on `preferedIndex`. If no separator is found, returns the trimmed title.
     *
     * @param {string} title - The title to sanitize.
     * @param {number} [preferedIndex=1] - Index of the part to return (0 for first, 1 for second).
     * @returns {string} - The sanitized title.
     */
    private sanitizeBreadcrumbTitle;
    private generateBreadcrumbs;
    private storeBreadcrumbSnapshot;
    render(): any;
    private getArrowDomForItem;
    /**
     * Lifecycle method called after the component is rendered.
     * - Reduces the number of elements in the DOM.
     * - Removes unnecessary slots parent elements.
     * - Replaces the last anchor tag in the breadcrumb with its content.
     */
    componentDidRender(): void;
}
