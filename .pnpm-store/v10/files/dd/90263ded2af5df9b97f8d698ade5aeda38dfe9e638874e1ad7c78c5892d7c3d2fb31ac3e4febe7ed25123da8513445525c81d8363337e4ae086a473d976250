import {RequestErrorEvent} from "../common";
import { FetchBreadcrumbResponse } from '../api/navigation';

export default interface NavigationEvent {
    onBreadcrumbFetched: (callback: (response: FetchBreadcrumbResponse) => void) => void;
    onBreadcrumbFetchFailed: RequestErrorEvent
}