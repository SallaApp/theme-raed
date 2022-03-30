import Flatpickr from 'flatpickr';

export default class ProductOptions {
    constructor() {
        new FileUploader();
        Flatpickr('.date-element', {"dateFormat": "Y-m-d H:i"});
        Flatpickr('.date-time-element', {"enableTime": true, "dateFormat": "Y-m-d H:i",});
        Flatpickr('.time-element', {enableTime: true, noCalendar: true, dateFormat: "H:i",});

        // Digits Only field
        app.on('input', '[data-digits]', e => salla.helpers.inputDigitsOnly(e.target));
    }
}
