import {SuccessResponse} from "../../common";

export * from "./request";
export * from "./response";
import {AuthRequest} from "./request";
import {AuthResponse} from "./response";
import {ApiActionName} from "../index";

export default interface AuthApi {
    canRedirect: () => boolean; //change it to false when you don't want page to reload or redirect automatically after logged in, use `salla.auth.event.onLoggedIn(response=>{...})`
    login: (data: AuthRequest.loginByMobile | AuthRequest.loginByEmail | object | FormData) => Promise<AuthResponse.loginOrResendCode | AuthResponse.sendVerification>;
    logout: () => Promise<SuccessResponse>;
    verify: (data: AuthRequest.verifyByMobile | AuthRequest.verifyByEmail, supportWebAuth: boolean) => Promise<AuthResponse.verify>;
    resend: (data: AuthRequest.resend) => Promise<AuthResponse.loginOrResendCode>;
    register: (data: AuthRequest.register) => Promise<AuthResponse.verify>;
    refresh: () => Promise<AuthResponse.verify>;
    // Voids
    setAfterLoginEvent: (event: ApiActionName, payload: any) => void;
    setCanRedirect: (canRedirect: boolean) => void;
    afterUserLogin: () => void;
}
