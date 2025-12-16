import Request from "../product/request";

export namespace CartRequest {
    export interface addItem extends Request.ProductRequest.addItem {
        notes?: string;
        file?: BinaryType | string;
    }

    export interface quickOrderPayload {
        email: string;
        phone: string;
        country_code: string;
        name: string;
        product_ids: string[];
        agreement: boolean;
    }

}
