import {ChangeCurrencyResponse, ListCurrenciesResponse} from "../api/currency";
import {RequestErrorEvent} from "../common";

export default interface CurrencyEvent {
    onChanged: (callback: (response: ChangeCurrencyResponse, currency: 'SAR' | string) => void) => void;
    onFetched: (callback: (response: ListCurrenciesResponse) => void) => void;
    onFailed: RequestErrorEvent;
    onFailedToFetch: RequestErrorEvent;
}