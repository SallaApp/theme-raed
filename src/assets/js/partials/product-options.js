//todo:: drop this class, and the usage for filepond at all, use salla-file-upload instead
export default class ProductOptions {
    constructor() {
        let isCart = salla.url.is_page('cart');
        new FileUploader('.filepond--product-option', {
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
