import {Currency, SuccessResponse} from "../common";

export interface ChangeCurrencyResponse extends SuccessResponse {
    data: {
        code: 'SAR' | string;
        symbol: string;
    }
}

export interface ListCurrenciesResponse extends SuccessResponse {
    data: Array<Currency>
}

export interface CurrencyPayload {
    currency: string | null;
    code: string | null;
}

export default interface CurrencyApi {
    change: (currency_code: CurrencyPayload | string) => Promise<ChangeCurrencyResponse>;
    list: () => Promise<ListCurrenciesResponse>;
}