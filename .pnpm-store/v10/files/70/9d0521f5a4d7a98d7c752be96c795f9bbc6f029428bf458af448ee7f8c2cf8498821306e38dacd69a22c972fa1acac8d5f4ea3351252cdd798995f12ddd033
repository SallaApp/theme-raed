/*!
 * Crafted with ❤ by Salla
 */
import { h } from "@stencil/core";
import { Genders } from "./interfaces";
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
export class SallaUserProfile {
    // Constructor
    constructor() {
        /**
         * The minimum allowed age for a user. Users with a birthdate indicating an age less than this value will be considered invalid.
         * Defaults to 10.
         */
        this.minAge = 10;
        this.isEditable = true;
        this.disableAction = false;
        this.isLoading = true;
        // Translated Strings State
        this.first_name_trans = salla.lang.get('pages.profile.first_name');
        this.last_name_trans = salla.lang.get('pages.profile.last_name');
        this.birthday_trans = salla.lang.get('pages.profile.birthday');
        this.birthday_placeholder_trans = salla.lang.get('pages.profile.birthday_placeholder');
        this.gender_trans = salla.lang.get('pages.profile.gender');
        this.gender_placeholder_trans = salla.lang.get('pages.profile.gender_placeholder');
        this.male_trans = salla.lang.get('pages.profile.male');
        this.female_trans = salla.lang.get('pages.profile.female');
        this.email_trans = salla.lang.get('common.elements.email');
        this.mobile_trans = salla.lang.get('common.elements.mobile');
        this.save_btn_trans = salla.lang.get('common.elements.save');
        this.drag_and_drop_trans = salla.lang.get('common.uploader.drag_and_drop');
        this.browse_trans = salla.lang.get('common.uploader.browse');
        this.email_required_trans = salla.lang.get('pages.checkout.email_required');
        this.invalid_email_trans = salla.lang.get('pages.error.invalid_value', {
            attribute: 'email',
        });
        // Localization setup when the language is loaded
        salla.lang.onLoaded(() => {
            // Assigning translated strings to state properties
            // These translations are fetched from the localization object
            this.first_name_trans = salla.lang.get('pages.profile.first_name');
            this.last_name_trans = salla.lang.get('pages.profile.last_name');
            this.birthday_trans = salla.lang.get('pages.profile.birthday');
            this.birthday_placeholder_trans = salla.lang.get('pages.profile.birthday_placeholder');
            this.gender_trans = salla.lang.get('pages.profile.gender');
            this.gender_placeholder_trans = salla.lang.get('pages.profile.gender_placeholder');
            this.male_trans = salla.lang.get('pages.profile.male');
            this.female_trans = salla.lang.get('pages.profile.female');
            this.email_trans = salla.lang.get('common.elements.email');
            this.mobile_trans = salla.lang.get('common.elements.mobile');
            this.save_btn_trans = salla.lang.get('common.elements.save');
            this.drag_and_drop_trans = salla.lang.get('common.uploader.drag_and_drop');
            this.browse_trans = salla.lang.get('common.uploader.browse');
            this.email_required_trans = salla.lang.get('pages.checkout.email_required');
            this.invalid_email_trans = salla.lang.get('pages.error.invalid_value', {
                attribute: 'email',
            });
        });
    }
    // Event handler for phone number field changes
    phoneNumberFieldEventHandler(data) {
        if (!data.detail.number) {
            this.disableAction = true;
            return;
        }
        this.userData.phone.number = Number.parseInt(data.detail.number);
        this.userData.phone.country = data.detail.country_code;
        this.disableAction = false;
    }
    // Event handler for generic field changes
    handleFieldChange(key, event, required = false) {
        if (event.target.value) {
            this.userData[key] = event.target.value;
            this.disableAction = false;
        }
        else {
            if (required) {
                this.disableAction = true;
            }
        }
    }
    // Event handler for email input changes
    handleEmailInput(key, event) {
        const emailErrorDisplaySection = document.getElementById('email-error');
        const email = event.target.value;
        if (!email) {
            this.disableAction = true;
            emailErrorDisplaySection.textContent = this.email_required_trans;
            return;
        }
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailPattern.test(email)) {
            this.disableAction = true;
            emailErrorDisplaySection.textContent = this.invalid_email_trans;
        }
        emailErrorDisplaySection.textContent = '';
        this.userData[key] = email;
        this.disableAction = false;
    }
    // Submit form method
    submitForm(event) {
        event.preventDefault();
        this.disableAction = true;
        const payload = Object.assign({}, this.userData);
        payload.phone = undefined;
        //@ts-ignore
        payload.phone = this.userData.phone.number;
        payload.country_code = this.userData.phone.country;
        salla.api.profile.update(payload).finally(() => { this.disableAction = false; });
    }
    getBirthDateRestriction() {
        const now = new Date();
        const pastYear = now.getFullYear() - this.minAge;
        now.setFullYear(pastYear);
        return now;
    }
    fetchData() {
        return salla.api.profile
            .info()
            .then(resp => { this.userData = resp.data; })
            .finally(() => {
            this.isLoading = false;
            this.isEditable = !Salla.config.get('store.features').includes('sso-login');
        });
    }
    renderLoadingSection() {
        return (h("div", { class: "s-user-profile-skeleton-wrapper" }, Array.from({ length: 6 }, (_, i) => (h("salla-skeleton", { class: "skeleton-item", width: "100%", height: "50px", key: i })))));
    }
    componentWillLoad() {
        Salla.onReady().then(() => this.fetchData());
    }
    render() {
        if (this.isLoading) {
            return this.renderLoadingSection();
        }
        return (h("form", { onSubmit: event => this.submitForm(event) }, h("div", { class: "s-user-profile-wrapper" }, h("div", { class: "s-user-profile-field" }, h("label", { htmlFor: "first-name", class: "s-user-profile-field-label" }, this.first_name_trans), h("input", { disabled: !this.isEditable, type: "text", name: "first_name", value: this.userData.first_name, id: "first-name", required: true, autocomplete: "first_name", class: "form-input", onChange: event => this.handleFieldChange('first_name', event) })), h("div", { class: "s-user-profile-field" }, h("label", { htmlFor: "last-name", class: "s-user-profile-field-label" }, this.last_name_trans), h("input", { disabled: !this.isEditable, type: "text", name: "last_name", value: this.userData.last_name, id: "last-name", required: true, autocomplete: "last_name", class: "form-input", onChange: event => this.handleFieldChange('last_name', event) })), h("div", { class: "s-user-profile-field" }, h("label", { htmlFor: "birthday", class: "s-user-profile-field-label" }, this.birthday_trans), h("salla-datetime-picker", { disabled: !this.isEditable, dateFormat: "Y-m-d", value: this.userData.birthday, placeholder: this.birthday_placeholder_trans, required: true, maxDate: this.getBirthDateRestriction(), name: "birthday", onPicked: event => this.handleFieldChange('birthday', event) })), h("div", { class: "s-user-profile-field" }, h("label", { htmlFor: "gender", class: "s-user-profile-field-label" }, this.gender_trans), h("select", { disabled: !this.isEditable, class: "form-input", name: "gender", required: true, onChange: event => this.handleFieldChange('gender', event) }, h("option", { value: "" }, this.gender_placeholder_trans), h("option", { value: Genders.Male, selected: this.userData.gender === Genders.Male }, this.male_trans), h("option", { value: Genders.Female, selected: this.userData.gender === Genders.Female }, this.female_trans))), h("div", { class: "s-user-profile-field" }, h("label", { htmlFor: "email", class: "s-user-profile-field-label" }, this.email_trans), h("input", { disabled: !this.isEditable, type: "email", name: "email", value: this.userData.email, id: "email", class: "form-input", required: true, onInput: event => this.handleEmailInput('email', event) }), h("p", { id: "email-error", class: "s-user-profile-field-error" })), h("div", { class: "s-user-profile-field" }, h("label", { htmlFor: "international-mobile", class: "s-user-profile-field-label" }, this.mobile_trans), h("salla-tel-input", { disabled: !this.isEditable, name: "international-mobile", "country-code": this.userData.phone.country, phone: `${this.userData.phone.number}`, onPhoneEntered: data => this.phoneNumberFieldEventHandler(data) }))), h("salla-button", { type: "submit", loading: this.disableAction, disabled: this.disableAction || !this.isEditable, "loader-position": "end", class: "s-user-profile-submit" }, this.save_btn_trans)));
    }
    static get is() { return "salla-user-profile"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-user-profile.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-user-profile.css"]
        };
    }
    static get properties() {
        return {
            "minAge": {
                "type": "number",
                "attribute": "min-age",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The minimum allowed age for a user. Users with a birthdate indicating an age less than this value will be considered invalid.\nDefaults to 10."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "10"
            }
        };
    }
    static get states() {
        return {
            "userData": {},
            "isEditable": {},
            "disableAction": {},
            "isLoading": {},
            "first_name_trans": {},
            "last_name_trans": {},
            "birthday_trans": {},
            "birthday_placeholder_trans": {},
            "gender_trans": {},
            "gender_placeholder_trans": {},
            "male_trans": {},
            "female_trans": {},
            "email_trans": {},
            "mobile_trans": {},
            "save_btn_trans": {},
            "drag_and_drop_trans": {},
            "browse_trans": {},
            "email_required_trans": {},
            "invalid_email_trans": {}
        };
    }
}
