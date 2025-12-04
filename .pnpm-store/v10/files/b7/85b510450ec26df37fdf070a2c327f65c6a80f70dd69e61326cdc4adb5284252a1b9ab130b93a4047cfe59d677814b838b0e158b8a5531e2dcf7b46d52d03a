import { RequestErrorEvent } from "../common";
import { ScopeApiResponse } from '../api/scope'

export default interface ScopeEvents {
    onFetched: (callback: (response: ScopeApiResponse.scopeList) => void) => void;
    onNotFetched: RequestErrorEvent;
    
    // POST
    onChangeSucceeded: (callback: (response: ScopeApiResponse.scopeAddition) => void) => void;
    onChangeFailed: RequestErrorEvent;

    // Availability
    onProductAvailabilityFetched: (callback: (response: ScopeApiResponse.availability, product_id: number) => void) => void;
    onProductAvailabilityNotFetched: RequestErrorEvent;
}