import {SuccessResponse} from "../common";

export interface BreadcrumbItem {
    title: string;
    url?: string;
  }

export interface BreadCrumbApiQueryParameters {
    id?: number;
    parent_id?: number;
    page: string;
}

export interface FetchBreadcrumbResponse extends SuccessResponse {
    data: Array<BreadcrumbItem>
}

export default interface NavigationApi {
    fetchBreadcrumbs: (queryParams: BreadCrumbApiQueryParameters) => Promise<FetchBreadcrumbResponse>;
}