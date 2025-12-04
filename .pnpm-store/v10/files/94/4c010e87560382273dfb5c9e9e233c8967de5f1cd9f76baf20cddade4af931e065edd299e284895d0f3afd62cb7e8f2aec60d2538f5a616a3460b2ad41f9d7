export namespace AuthRequest {
    export interface loginByMobile {
        phone: string;
        type: 'mobile';
        country_code: string | 'SA';
    }

    export interface loginByEmail {
        email: string;
        type: 'email';
    }

    export interface verifyByEmail {
        type: 'email';
        code: string;
        email: string;
    }

    export interface verifyByMobile {
        type: 'mobile';
        code: string;
        phone: string;
        country_code: string | "SA";
    }

    export interface register {
        first_name: string;
        last_name: string;
        phone: string;
        country_code: string | 'SA';
        verified_by: 'email' | 'phone';
        email?: string;
        code: number;
    }

    export interface resend {
        type: 'mobile' | 'email';
        phone?: string;
        country_code?: string | "SA";
        email?: string;
    }
}