import { RequestErrorEvent, SuccessResponse } from "../common";
import { LoyaltyApiResponse } from '../api/loyalty'

export default interface LoyaltyEvent {

    onProgramFetched: (callback: (response: LoyaltyApiResponse.program, prod_id: number) => void) => void;
    onProgramNotFetched: RequestErrorEvent;
    // Point
    onExchangeSucceeded: (callback: (response: LoyaltyApiResponse.point, prod_id: number) => void) => void;
    onExchangeFailed: RequestErrorEvent;
    // Reset Exchange
    onResetSucceeded: (callback: (response: SuccessResponse) => void) => void;
    onResetFailed: RequestErrorEvent
}