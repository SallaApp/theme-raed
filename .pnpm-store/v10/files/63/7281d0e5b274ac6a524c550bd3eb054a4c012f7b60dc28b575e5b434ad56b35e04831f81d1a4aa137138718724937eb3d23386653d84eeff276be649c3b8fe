export interface SizeGuide {
    name: string;
    description: string;
}
/**
 * @slot header - The upper section of the component.Empty by default.
 * @slot footer - The bottom section of the component.Empty by default.
 */
export declare class SallaProductSizeGuide {
    constructor();
    private modal;
    guides: Array<SizeGuide> | [];
    productId: number;
    placeholder_title: string;
    placeholder_description: string;
    modal_title: string;
    hasError: boolean;
    host: HTMLElement;
    /**
     * Show the size-guide modal window
     */
    open(product_id: number): Promise<any>;
    /**
     *
     * Hide the size-guide modal window
     */
    close(): Promise<HTMLElement>;
    private showPlaceholder;
    render(): any;
}
