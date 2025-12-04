import { orderItem } from './interfaces';
export declare class SallaOrderSummary {
    copyCodeButtonTimeout: NodeJS.Timeout;
    /**
     * The order ID to fetch items from
     */
    orderId?: number;
    codeCopied: string | null;
    noItemFound: boolean;
    order_items: orderItem[];
    private codes_text;
    private copy_text;
    private files_text;
    private download_text;
    private isDigitalCard;
    private isDigitalProduct;
    componentWillLoad(): Promise<void>;
    private copyToClipboardHandler;
    private getOrderItems;
    disconnectedCallback(): void;
    render(): any;
}
