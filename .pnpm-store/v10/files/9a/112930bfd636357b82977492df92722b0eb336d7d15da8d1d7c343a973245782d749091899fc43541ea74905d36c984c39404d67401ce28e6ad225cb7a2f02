export interface Option {
    id: number;
    name: string;
    required: boolean;
    type: string;
    placeholder: string;
    option_type: string;
    not_same_day_order: boolean;
    availability_range: number;
    from_date_time: null;
    to_date_time: null;
    details: Reservation[];
    condition_attributes: string;
    value?: any;
    length?: number;
    price?: number;
}
export interface Reservation {
    date: Date;
    day: number;
    time: Time[];
    from_timestamp?: number;
    to_timestamp?: number;
}
export interface Time {
    from?: string;
    to?: string;
}
