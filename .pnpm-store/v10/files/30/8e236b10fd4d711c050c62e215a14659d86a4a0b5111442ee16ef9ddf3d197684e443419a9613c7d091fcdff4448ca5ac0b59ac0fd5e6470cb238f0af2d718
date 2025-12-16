import { type UserInstance } from './interfaces';
/**
 * The SallaUserProfile is a versatile user profile form
 * generator within the Salla platform, offering localization support,
 * customizable fields, and seamless integration with the Salla API.
 * It dynamically fetches translated strings for labels and messages from the
 * Salla localization object, allowing for a multilingual user interface. Users
 * retrieval from the Salla configuration and includes fields for first name,
 * last name, birthday, gender, email, mobile, and custom additions. Form
 * validation and submission are handled through various event handlers, ensuring
 * proper field handling and user input validation. The component supports file
 * uploads for photo fields and includes a dedicated phone number input field.
 * The componentWillLoad lifecycle method fetches additional user profile
 * information from the API during initialization. Overall, this component
 * provides an efficient and adaptable solution for creating user profiles with a
 * rich set of features and customization options.
 */
export declare class SallaUserProfile {
    constructor();
    /**
     * The minimum allowed age for a user. Users with a birthdate indicating an age less than this value will be considered invalid.
     * Defaults to 10.
     */
    minAge: number;
    userData: UserInstance;
    isEditable: boolean;
    disableAction: boolean;
    isLoading: boolean;
    first_name_trans: any;
    last_name_trans: any;
    birthday_trans: any;
    birthday_placeholder_trans: any;
    gender_trans: any;
    gender_placeholder_trans: any;
    male_trans: any;
    female_trans: any;
    email_trans: any;
    mobile_trans: any;
    save_btn_trans: any;
    drag_and_drop_trans: any;
    browse_trans: any;
    email_required_trans: any;
    invalid_email_trans: any;
    private phoneNumberFieldEventHandler;
    private handleFieldChange;
    private handleEmailInput;
    private submitForm;
    private getBirthDateRestriction;
    private fetchData;
    private renderLoadingSection;
    componentWillLoad(): void;
    render(): any;
}
