import {SuccessResponse} from "../common";

export interface Scope {
    id: number;
    name: string;
    selected: boolean;
}

export interface ProductAvailability {
    name: string;
    selected: boolean;
    availability: Availability;
}

export interface Availability {
    label: string;
    key: string;
    color: string;
}


export namespace ScopeApiResponse {

    export interface scopeList extends SuccessResponse {
        data: Scope[];
    }

    export interface scopeAddition extends SuccessResponse {
        data: Scope
    }

    export interface availability extends SuccessResponse {
        data: ProductAvailability[];
    }
}


export default interface ScopeApi {
    get: () => Promise<ScopeApiResponse.scopeList>
    change: (payload: Object) => Promise<SuccessResponse>
    getProductAvailability: (product_id: number) => Promise<ScopeApiResponse.availability>
}