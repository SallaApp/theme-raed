import { RequestErrorEvent } from "../common";
import { MetadataApiResponse } from "../api/metadata";

export default interface MetadataEvent {
    onValueFetched: (callback: (response: MetadataApiResponse.value) => void) => void;
    onValueNotFetched: RequestErrorEvent;
}