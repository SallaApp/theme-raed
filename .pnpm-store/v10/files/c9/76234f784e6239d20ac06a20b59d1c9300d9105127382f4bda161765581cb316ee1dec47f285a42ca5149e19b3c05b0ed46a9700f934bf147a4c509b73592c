import {SuccessResponse, Genders} from "../common";
import {AuthRequest, VerificationStatus} from "./auth";

export interface ProfileUpdatePayload {
    first_name: string;
    last_name: string;
    birthday?: string;
    gender?: Genders.Male | Genders.Female;
    avatar?: BinaryType;
}

export interface ProfileUpdateCustomFields {
	id:number,
    fields: { [key: string]: unknown };
}

export interface ProfileUpdateContactPayload {
    phone?: string | number; //required if there is no email
    country_code?: string | 'SA'; //required if there is phone
    email?: string; //required if there is no phone
}

export interface ProfileResponse extends SuccessResponse {
    data: {
        id: number;
        first_name: string;
        last_name: string;
        currency: string | 'SAR';
        language: string | 'ar';
        phone: {
            code: string | "+966";
            number: string | number;
            country: string | "SA";
        };
        email: string;
        avatar: string;
        gender?: 'male' | 'female';
        birthday: string | '2022-02-22';
        verification?: VerificationStatus; //exists when trying to update email/phone
        pending_orders: number;
        notifications: number;
    };
}

export interface VerifyContactResponse extends SuccessResponse {
    data: {
        message: string;
        verification: VerificationStatus;
    }
}

export interface NotificationSettingPayload {
    check: Number
}

export interface AccountDeletionPayload {
    user_id: Number
}

export default interface ProfileApi {
    info: () => Promise<ProfileResponse>;
    update: (data: ProfileUpdatePayload) => Promise<ProfileResponse>;
    verify: (data: AuthRequest.verifyByMobile | AuthRequest.verifyByEmail) => Promise<VerifyContactResponse>;
    updateContacts: (data: ProfileUpdateContactPayload) => Promise<ProfileResponse>;//need to verify after success event
    setNotification: (data: NotificationSettingPayload) => Promise<SuccessResponse>;
    delete: () => Promise<SuccessResponse>;
    updateSettings: (data: NotificationSettingPayload) => Promise<SuccessResponse>;
}