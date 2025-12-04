import {SuccessResponse} from "../../common";

export type VerificationStatus = {
    type: 'mobile' | 'email';
    status: 'success' | 'pending' | 'failed';
}

export namespace AuthResponse {
    export interface verify extends SuccessResponse {
        data: {
            case: 'authenticated' | 'new_customer';
            redirect_url?: string;
            token?: string;
            verification?: VerificationStatus;
        }
    }

    export interface sendVerification extends SuccessResponse {
        data: VerificationStatus
    }

    export interface loginOrResendCode extends SuccessResponse {
        data: {
            resend_counter?: 2 | 3 | 4;//when resend code
        }
    }
}