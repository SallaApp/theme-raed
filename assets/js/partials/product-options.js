import Flatpickr from 'flatpickr';

export default class ProductOptions {
    constructor() {
        Flatpickr('.date-element', {"dateFormat": "Y-m-d H:i"});
        Flatpickr('.date-time-element', {"enableTime": true, "dateFormat": "Y-m-d H:i",});
        Flatpickr('.time-element', {enableTime: true, noCalendar: true, dateFormat: "H:i",});
        let isCart = salla.url.is_page('cart');
        new FileUploader('.filepond', {
            name         : 'file',
            maxFileSize  : '3MB',
            instantUpload: isCart,
            url          : isCart ? 'api/v1/' : '',
        });
    }
}
