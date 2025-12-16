import {ApiActionName} from "../api";

export default interface SallaForm {
    submit: (action: ApiActionName|string, eventOrData: Event | Object) => Promise<any>;
    onSubmit: (action: ApiActionName|string, eventOrData: Event | Object) => false;
    onChange: (action: ApiActionName|string, eventOrData: Event | Object) => false;
    getPossibleValue(formData: object|FormData, possibleNames: Array<string>, objectable?: boolean): object | FormData | string | undefined;
}