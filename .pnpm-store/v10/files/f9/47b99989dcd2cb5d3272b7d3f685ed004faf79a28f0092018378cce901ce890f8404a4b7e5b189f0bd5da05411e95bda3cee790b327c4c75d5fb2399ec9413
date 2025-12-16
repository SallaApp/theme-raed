import { EventEmitter } from '../../stencil-public-runtime';
import { DateOption, LocaleKey, DateLimit } from './interfaces';
export declare class SallaDatetimePicker {
    private flatpickr;
    /**
     * Lazy load flatpickr library
     * This reduces initial bundle size by ~35-40KB
     */
    private loadFlatpickr;
    dateInput: HTMLInputElement;
    /**
     * Two way data binding to retrieve the selected date[time] value
     */
    value: string;
    /**
     * Whether this input i required or not
     */
    required: boolean;
    /**
     * the name for the input
     */
    name: string;
    /**
     * Placeholder text to show on the input element
     */
    placeholder: string;
    /**
     * Allows the user to enter a date directly into the input field. By default, direct entry is disabled.
     */
    allowInput: boolean;
    /**
     * Allows the preloading of an invalid date. When disabled, the field will be cleared if the provided date is invalid
     */
    allowInvalidPreload: boolean;
    /**
     * Exactly the same as date format, but for the altInput field.
     */
    altFormat: string;
    /**
     * Show the user a readable date (as per altFormat), but return something totally different to the server.
     */
    altInput: boolean;
    /**
     * This class will be added to the input element created by the altInput option.
     * Note that altInput already inherits classes from the original input.
     */
    altInputClass: string;
    /**
     * Instead of body, appends the calendar to the specified node instead.
     */
    appendTo: HTMLElement;
    /**
     * Defines how the date will be formatted in the aria-label for calendar days,
     * using the same tokens as dateFormat. If you change this, you should choose a
     * value that will make sense if a screen reader reads it out loud.
     */
    ariaDateFormat: string;
    /**
     * Whether the default time should be auto-filled when the input is empty and gains or loses focus.
     */
    autoFillDefaultTime: boolean;
    /**
     * Whether clicking on the input should open the picker.
     * Set it to false if you only want to open the calendar programmatically with [open()]
     */
    clickOpens: boolean;
    /**
     * Whether calendar should close after date selection or not
     */
    closeOnSelect: boolean;
    /**
     * When in "multiple" mode, conjunction is used to separate dates in the entry field.
     */
    conjunction?: string;
    /**
     * A string of characters which are used to define how the date will be displayed in the input box.
     * The supported characters are defined in the table below.
     */
    dateFormat: string;
    /**
     * Sets the initial selected date(s). If you're using mode: "multiple" or a range calendar supply an
     * Array of Date objects or an Array of date strings which follow your dateFormat. Otherwise, you can supply
     * a single Date object or a date string.
     */
    defaultDate: DateOption | DateOption[];
    /**
     * Initial value of the hour element, when no date is selected
     */
    defaultHour: number;
    /**
     * Initial value of the minute element, when no date is selected
     */
    defaultMinute: number;
    /**
     * Initial value of the seconds element, when no date is selected
     */
    defaultSeconds: number;
    /**
     * Disables certain dates, preventing them from being selected.
     * See https://chmln.github.io/flatpickr/examples/#disabling-specific-dates
     */
    disable: DateLimit<DateOption>[];
    /**
     * Set this to true to always use the non-native picker on mobile devices.
     * By default, Flatpickr utilizes native datetime widgets unless certain options (e.g. disable) are used.
     */
    disableMobile: boolean;
    /**
     * Disables all dates except these specified. See https://chmln.github.io/flatpickr/examples/#disabling-all-dates-except-select-few
     */
    enable: DateLimit<DateOption>[];
    /**
     * Enables seconds selection in the time picker.
     */
    enableSeconds: boolean;
    /**
     * Enables the time picker
     */
    enableTime: boolean;
    /**
     * Allows using a custom date formatting function instead of the built-in handling for date formats using dateFormat, altFormat, etc.
     */
    formatDate: (date: Date, format: string, locale: Object) => string;
    /**
     * Adjusts the step for the hour input (incl. scrolling)
     */
    hourIncrement: number;
    /**
     * Displays the calendar inline
     */
    inline: boolean;
    /**
     * The locale, either as a string (e.g. "ar", "en") or as an object.
     * See https://chmln.github.io/flatpickr/localization/
     */
    locale: LocaleKey;
    /**
     * The maximum date that a user can pick to (inclusive).
     */
    maxDate: DateOption;
    /**
     * The minimum date that a user can start picking from (inclusive).
     */
    maxTime: DateOption;
    /**
     * The minimum date that a user can start picking from (inclusive).
     */
    minDate: DateOption;
    /**
     * The minimum time that a user can start picking from (inclusive).
     */
    minTime: DateOption;
    /**
     * Adjusts the step for the minute input (incl. scrolling) Defaults to 5
     */
    minuteIncrement: number;
    /**
     * Date selection mode, defaults to "single"
     */
    mode: "single" | "multiple" | "range" | "time";
    /**
     * How the month should be displayed in the header of the calendar.
     * If showMonths has a value greater than 1, the month is always shown as static.
     */
    monthSelectorType: "dropdown" | "static";
    /**
     * HTML for the arrow icon, used to switch months.
     */
    nextArrow: string;
    /**
     * Hides the day selection in calendar. Use it along with enableTime to create a time picker.
     */
    noCalendar: boolean;
    /**
     * A custom datestring parser
     */
    dateParser: (date: string, format: string) => Date;
    /**
     * How the calendar should be positioned with regards to the input. Defaults to "auto"
     */
    position: "auto" | "above" | "below" | "auto left" | "auto center" | "auto right" | "above left" | "above center" | "above right" | "below left" | "below center" | "below right" | ((self: any, customElement: HTMLElement | undefined) => void);
    /**
     *  The element off of which the calendar will be positioned. Defaults to the date input
     */
    positionElement: HTMLElement;
    /**
     * HTML for the left arrow icon, used to switch months.
     */
    prevArrow: string;
    /**
     * Whether to display the current month name in shorthand mode, e.g. "Sep" instead "September"
     */
    shorthandCurrentMonth: boolean;
    /**
     * Position the calendar inside the wrapper and next to the input element*.
     */
    static: boolean;
    /**
     * The number of months to be shown at the same time when displaying the calendar.
     */
    showMonths: number;
    /**
     * Displays time picker in 24 hour mode without AM/PM selection when enabled.
     */
    time_24hr: boolean;
    /**
     * Enables display of week numbers in calendar.
     */
    weekNumbers: boolean;
    /**
     * See https://chmln.github.io/flatpickr/examples/#flatpickr-external-elements
     */
    wrap: boolean;
    /**
     * Whether the input is disabled
     */
    disabled: boolean;
    /**
     * Event emitted when the date input gets changed by the user when selecting file(s).
     */
    picked: EventEmitter<any>;
    /**
     * Event emitted when the input is invalid.
     */
    invalidInput: EventEmitter<any>;
    render(): any;
    componentDidLoad(): Promise<void>;
}
