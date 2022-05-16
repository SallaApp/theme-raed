import Flatpickr from 'flatpickr';

export default class ProductOptions {
    constructor() {
        Flatpickr('.date-element', {"dateFormat": "Y-m-d H:i"});
        Flatpickr('.date-time-element', {"enableTime": true, "dateFormat": "Y-m-d H:i",});
        Flatpickr('.time-element', {enableTime: true, noCalendar: true, dateFormat: "H:i",});
        let isCart = salla.url.is_page('cart');
        let filepond = new FileUploader('.filepond', {
            name         : 'file',
            maxFileSize  : '3MB',
            instantUpload: isCart,
            url          : isCart ? salla.cart.getUploadImageEndpoint(salla.config.get('page.id')) : undefined,
            onaddfile    : isCart ? undefined : this.addFile,
            onremovefile : isCart ? undefined : this.removeFile,
        });
    }

    /**
     * Attach filepond file into normal input
     * @param error
     * @param {FilePondFile} file
     */
    addFile(error, file) {
        if (error) {
            return;
        }
        let container = new DataTransfer;
        container.items.add(file.file);
        app.element('[type="file"][name="file"]').files = container.files;
    }

    /**
     * remove normal file input
     * @param error
     * @param {FilePondFile} file
     */
    removeFile(error, file) {
        let fileInput = app.element('[type="file"][name="file"]');
        fileInput.type = "text";
        fileInput.type = "file";
        fileInput.value = '';
    }
}
