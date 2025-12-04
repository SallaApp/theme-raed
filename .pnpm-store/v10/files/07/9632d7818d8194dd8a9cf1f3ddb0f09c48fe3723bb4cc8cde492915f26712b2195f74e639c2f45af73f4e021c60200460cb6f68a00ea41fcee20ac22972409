export * from "./request";
export * from "./response";
import {SuccessResponse} from "../../common";
import {CartResponse} from "./response";
import {CartRequest} from "./request";

export default interface CartApi {
    latest: () => Promise<CartResponse.update>;
    details: (cartId: number | null, withItems: ['options' | 'attachments']) => Promise<CartResponse.update>;
    quickAdd: (/*product_id*/id: number, quantity: number, offerType: string | null) => Promise<CartResponse.update>;
    addItem: (data: CartRequest.addItem) => Promise<CartResponse.update>;
    deleteItem: (item_id: number) => Promise<CartResponse.update>;
    updateItem: (data: CartRequest.addItem) => Promise<CartResponse.update>;
    deleteImage: (file_id: number) => Promise<SuccessResponse>;
    status: (cartId: number) => Promise<CartResponse.status>;
    reset: () => void;
    submit: () => void;

    getCurrentCartId: () => Promise<number>;
    getCartPayload: (productIdOrObject: CartRequest.addItem) => CartResponse.cartPayload;
    normalRequest: (endpoint: string, formData?: Object, method?: string) => Promise<any>;
    priceQuote: (cartId: number) => Promise<CartResponse.PriceQuote>;

    getUploadImageEndpoint: (cartId?: number) => string;

    getQuickOrderSettings: () => Promise<CartResponse.quickOrderSettingResponse>;
    createQuickOrder: (payload: CartRequest.quickOrderPayload) => Promise<SuccessResponse>;

    //coupons
    addCoupon: (coupon: string | Object | FormData) => Promise<CartResponse.latest>;
    deleteCoupon: () => Promise<CartResponse.latest>;
}