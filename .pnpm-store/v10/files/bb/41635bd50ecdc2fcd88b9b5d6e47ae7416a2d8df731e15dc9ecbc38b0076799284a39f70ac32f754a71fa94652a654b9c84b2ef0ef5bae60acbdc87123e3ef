import {SuccessResponse} from "../common";

export default interface WishlistApi {
    add: (product_id: number) => Promise<SuccessResponse>;
    remove: (product_id: number) => Promise<SuccessResponse>;
    toggle: (product_id: number) => Promise<SuccessResponse>;
    updateWishlistStorage: (id: number, isAdded: boolean) => void;
}
