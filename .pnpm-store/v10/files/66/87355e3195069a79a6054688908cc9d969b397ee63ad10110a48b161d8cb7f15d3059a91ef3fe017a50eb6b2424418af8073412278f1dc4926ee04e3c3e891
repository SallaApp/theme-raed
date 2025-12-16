export interface UserInstance {
    id?: number;
    currency?: string;
    language?: string;
    first_name?: string;
    last_name?: string;
    phone?: Phone;
    email?: string;
    avatar?: string;
    gender?: string;
    birthday?: string;
    notifications?: number;
    loyalty_program_points?: number;
    pending_orders?: string;
    custom_fields?: CustomField[];
    country_code?: string;
}
export interface Phone {
    code?: string;
    number?: number;
    country?: string;
}
export declare enum Genders {
    Female = "female",
    Male = "male"
}
export declare enum FormFieldTypes {
    Photo = "photo",
    Text = "Text"
}
export interface PhoneNumberFieldEventData {
    number: string;
    country_code: string;
}
export interface CustomField {
    id?: number;
    label?: string;
    description?: string;
    type?: string;
    required?: boolean;
    value?: string;
}
