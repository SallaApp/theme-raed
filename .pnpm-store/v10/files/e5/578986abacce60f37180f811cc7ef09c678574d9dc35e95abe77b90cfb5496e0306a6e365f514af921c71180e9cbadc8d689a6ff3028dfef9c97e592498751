import { Order } from '../salla-orders/interface';
import { OrderSummary } from './interfaces';
export declare class SallaOrderTotalsCard {
    /**
     * Order summary object. Accepts a JSON string or object containing the order totals.
     */
    order?: string | Order;
    summary?: OrderSummary;
    protected handleOrderChange(newValue?: string | OrderSummary): void;
    componentWillLoad(): Promise<void>;
    private setSummaryFromProp;
    private renderTotalRow;
    private renderDiscountRow;
    private renderRefundRow;
    render(): any;
}
