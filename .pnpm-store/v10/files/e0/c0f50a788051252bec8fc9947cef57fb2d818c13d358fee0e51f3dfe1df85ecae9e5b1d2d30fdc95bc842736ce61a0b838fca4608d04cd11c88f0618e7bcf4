import { SuccessResponse } from '../common';

export interface MetadataValue {
    entity_id?: number;
    sections?: Section[];
}

export interface Section {
    id?: string;
    name?: string;
    fields?: Field[];
}

export interface Field {
    id?: string;
    name?: string;
    type?: string;
    value?: string;
}

export interface Metadata {
    values: MetadataValue[];
}

export namespace MetadataApiResponse {
    export interface value extends SuccessResponse {
        data: Metadata;
    }
}

export default interface MetadataApi {
    fetchValues: (entity: string, entityIds: number[] | number) => Promise<MetadataApiResponse.value>;
}
