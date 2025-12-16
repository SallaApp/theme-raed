import {SuccessResponse} from "../../common";
import {ProductResponse} from "./response";
import {ProductRequest} from "./request";

export * from "./request";
export * from "./response";


export default interface ProductApi {
    getPrice: (data: /*product_id*/number | ProductRequest.addItem) => Promise<ProductResponse.getPrice>;
    availabilitySubscribe: (product_id: number | ProductRequest.availability) => Promise<SuccessResponse>;
    search: (keyword: string | ProductRequest.search) => Promise<ProductResponse.search>;
    categories: (categoryId?: number) => Promise<ProductResponse.categories>; //get all categories or sub_categories
    offers: (product_id: number) => Promise<ProductResponse.offers>; //get all categories or sub_categories
    getGiftDetails: (product_id: number) => Promise<ProductResponse.giftResponse>;
    addGiftToCart: (product_id: number, payload: Object, withRedirect: boolean) => Promise<ProductResponse.giftToCart>;
    uploadGiftImage: (multiPartData: FormData) => Promise<ProductResponse.giftImageUpload>;
    getDetails: (product_id: number, withItems: Array<'images' | 'brand' | 'tags' | 'notify_availability' | 'rating' | 'donation' | 'options' | 'sold_quantity' | 'category'>) => Promise<ProductResponse.detail>;
    getSizeGuides: (product_id: number) => Promise<ProductResponse.sizeGuides>;
    fetch: (queryParam: ProductRequest.FetchProductsQueryParams) => Promise<ProductResponse.lists>
    fetchOptions: (productIds: Array<number>) => Promise<ProductResponse.options>
}