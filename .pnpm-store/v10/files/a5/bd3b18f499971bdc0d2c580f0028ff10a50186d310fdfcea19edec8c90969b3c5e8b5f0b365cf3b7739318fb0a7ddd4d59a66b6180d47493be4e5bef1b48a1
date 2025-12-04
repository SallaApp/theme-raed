type RequestError = Error & { response: any }
type RequestErrorEvent = (callback: (error: RequestError | string) => void) => void;
type RequestErrorEventWithData<data> = (callback: (error: RequestError | string, data) => void) => void;

export interface Price {
    amount: string;
    currency: string;
}

export interface BaseResponse<TData = any, TError = any> {
    status: number;
    success: boolean;
    data?: TData;
    error?: TError;
}

export interface SuccessResponse extends BaseResponse<{
    message?: string;
    events?: { [event_name: string]: any };
}> { }

export interface ErrorResponse extends BaseResponse<void, {
    message?: string | 'alert.invalid_fields';
    code?: any;
    case?: 'resend_counter' | 'invalid_code' | string;
    events?: { [event_name: string]: any };
    fields?: { [field_name: string]: Array<string> };
}> { }

export interface Currency {
    code: string | 'SAR';
    name: string;
    symbol: string;
    amount?: number;
    country_code?: string;
}