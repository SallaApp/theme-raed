import {AuthResponse} from "../api/auth";
import {RequestError, SuccessResponse} from "../common";

export default interface AuthEvent {
    //Success Responses
    onCodeSent: (callback: (response: AuthResponse.loginOrResendCode, type?: 'mobile' | 'email') => void) => void;
    onVerified: (callback: (response: AuthResponse.verify, type?: 'mobile' | 'email') => void) => void;
    onRegistered: (callback: (response: AuthResponse.verify) => void) => void;
    onLoggedIn: (callback: (response: AuthResponse.verify) => void) => void;
    onLoggedOut: (callback: (response: SuccessResponse) => void) => void;
    
    //Error Responses
    onCodeNotSent: (callback: (error: RequestError | string, type?: 'mobile' | 'email') => void) => void;
    onVerificationFailed: (callback: (error: RequestError | string, type?: 'mobile' | 'email') => void) => void;
    onRegistrationFailed: (callback: (error: RequestError) => void) => void;
    onFailedLogout: (callback: (error: RequestError) => void) => void;
    onRefreshFailed: (callback: (error: RequestError) => void) => void;
    onTokenInvalid: (callback: () => void) => void;
}