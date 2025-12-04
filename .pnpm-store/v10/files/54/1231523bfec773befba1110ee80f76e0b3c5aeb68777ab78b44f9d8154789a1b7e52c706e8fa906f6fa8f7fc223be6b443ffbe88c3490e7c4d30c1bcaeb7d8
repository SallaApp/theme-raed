import { OrderProduct } from '../salla-order-details/interfaces';
import { Total } from '../salla-orders/interface';
export interface OrderSummaryOption {
    [key: string]: any;
}
export interface Discount {
    name: string;
    discount: number;
}
export interface OrderSummary {
    sub_total?: Total;
    options?: OrderProduct[];
    options_total?: Total;
    discounts?: Discount[];
    cod_cost?: Total;
    shipping_cost?: Total;
    paid_amount?: Total;
    remaining_amount?: Total;
    refund_amount?: Total;
    tax?: {
        percent: number;
        amount: Total;
    };
    total?: Total;
}
