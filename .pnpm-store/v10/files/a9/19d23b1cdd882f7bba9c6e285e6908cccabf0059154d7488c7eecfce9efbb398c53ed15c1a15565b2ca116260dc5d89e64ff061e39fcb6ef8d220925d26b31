import CartApi from "./cart";
import AuthApi from "./auth";
import OrderApi from "./order";
import RatingApi from "./rating";
import CommentApi from "./comment";
import LoyaltyApi from "./loyalty";
import ProductApi from "./product";
import ProfileApi from "./profile";
import CurrencyApi from "./currency";
import DocumentApi from "./document";
import WishlistApi from "./wishlist";
import ScopeApi from "./scope";
import LandingApi from "./landing";
import BookingApi from "./booking";
import NavigationApi from "./navigation"
import MetadataApi from "./metadata"
import {AxiosInstance} from "axios";
import {ErrorResponse, SuccessResponse} from "@salla.sa/base/types/common";

export {
	CartApi,
	AuthApi,
	OrderApi,
	RatingApi,
	CommentApi,
	LoyaltyApi,
	ProductApi,
	ProfileApi,
	CurrencyApi,
	DocumentApi,
	WishlistApi,
	ScopeApi,
	BookingApi,
	LandingApi,
    NavigationApi,
};
export type ApiActionName =
    'auth.login'
    | 'auth.resend'
    | 'auth.verify'
    | 'auth.register'
    | 'auth.logout'
    | 'auth.refresh'
    | 'cart.latest'
    | 'cart.details'
    | 'cart.summary'
    | 'cart.quickAdd'
    | 'cart.addItem'
    | 'cart.deleteItem'
    | 'cart.updateItem'
    | 'cart.deleteImage'
    | 'cart.status'
    | 'cart.addCoupon'
    | 'cart.deleteCoupon'
    | 'cart.quickOrder'
    | 'cart.createQuickOrder'
    | 'loyalty.exchange'
    | 'loyalty.getProgram'
    | 'loyalty.reset'
    | 'order.cancel'
    | 'order.reOrder'
    | 'order.send'
    | 'order.fetch'
    | 'product.getPrice'
    | 'product.availabilitySubscribe'
    | 'product.purchaseNow'
    | 'product.search'
    | 'product.categories'
    | 'product.offers'
    | 'product.getDetails'
    | 'product.getSizeGuides'
    | 'product.getGiftDetails'
    | 'product.addGiftToCart'
    | 'product.uploadGiftImage'
    | 'product.fetch'
    | 'product.fetchOptions'
    | 'product.fetchImages'
    | 'profile.update'
    | 'profile.info'
    | 'profile.updateContacts'
    | 'profile.verify'
    | 'profile.updateSettings'
    | 'profile.delete'
    | 'comment.add'
    | 'comment.getCommentPayload'
    | 'comment.fetchComments'
    | 'comment.getPageComments'
    | 'comment.getProductComments'
    | 'currency.change'
    | 'currency.list'
    | 'rating.store'
    | 'rating.products'
    | 'rating.shipping'
    | 'rating.order'
    | 'wishlist.add'
    | 'wishlist.remove'
    | 'scope.get'
    | 'scope.change'
    | 'scope.getProductAvailability'
    | 'withoutNotifier'
    | 'booking.add'
    | 'navigation.fetchBreadcrumbs'
    | 'metadata.fetchValues';

export default interface Api {
	cart: CartApi;
	auth: AuthApi;
	order: OrderApi;
	rating: RatingApi;
	comment: CommentApi;
	loyalty: LoyaltyApi;
	product: ProductApi;
	profile: ProfileApi;
	currency: CurrencyApi;
	document: DocumentApi;
	wishlist: WishlistApi;
	scope: ScopeApi;
	booking: BookingApi;
	landing: LandingApi;
    navigation: NavigationApi;
    metadata: MetadataApi;

	axios: AxiosInstance;
	withoutNotifier: (callback: Function) => Promise<void>;
	getHeaders: () => {
		Accept: string | 'application/json, text/plain, */*',
		"X-Requested-With": 'XMLHttpRequest',
		"S-SOURCE": 'twilight',
		"Store-Identifier"?: number,
		currency?: string | 'SAR',
		"accept-language"?: string | 'ar',
		Authorization?: string
	}

	request(endPoint: string, formData?: object, method?: string | 'get' | 'post' | 'put', options?: object): Promise<any>

	handleAfterResponseActions(response: SuccessResponse | ErrorResponse | any): void;

	fireEventsForResponse(response: SuccessResponse | ErrorResponse | any): void;

	showAlert(response: SuccessResponse | ErrorResponse | any): void;

	handleErrorResponse(error: object): void;

	handleInvalidFields(error: object): void;

	errorPromise(data: any): Promise<any>;

	successPromise(data: any): Promise<any>;

	isFastRequestsAllowed(): boolean;
}
