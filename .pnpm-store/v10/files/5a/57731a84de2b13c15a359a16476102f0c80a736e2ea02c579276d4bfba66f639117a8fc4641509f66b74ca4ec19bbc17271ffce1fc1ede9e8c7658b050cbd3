import { type EventEmitter } from '../../stencil-public-runtime';
import type { FilePondFile } from './interfaces';
import type { FilePond as FilePondType, FilePondErrorDescription } from 'filepond/types/index';
export declare class SallaFileUpload {
    private filePondLoaded;
    private FilePond;
    /**
     * Lazy load FilePond and all plugins
     * This reduces initial bundle size by ~200-250KB
     */
    private loadFilePond;
    constructor();
    private fileUploader;
    private hiddenInput;
    filepond: FilePondType;
    host: HTMLElement;
    max_images_count: (count: number) => string;
    max_count_hint: (count: number) => string;
    uploadedFiles: any[];
    isListScrollerListenerAdded: boolean;
    showMaxCountHint: boolean;
    /**
     * The uploaded image link or URL
     */
    value: any;
    /**
     * The uploaded files as json `[{url:"...", id:123}]` for delete possibility
     */
    files: string;
    /**
     * The original height of the uploader, will be used to reset the height after the image is removed.
     */
    height: string;
    /**
     *  to prepare the upload url automatically pass this prop, ex to upload attach file in cart Item.
     */
    cartItemId?: string;
    /**
     * Set the component to be profile image uploader with a preview and a circular shape
     */
    profileImage: boolean;
    /**
     * File input name for the native formData
     */
    name?: string;
    /**
     * File input name in the request payload
     */
    payloadName: string;
    /**
     * Allow to pass extra params to be sent with the upload request
     */
    payloadParams?: Record<string, unknown>;
    /**
     * Type to be sent to backend
     */
    type: string;
    /**
     * Accepted file types
     */
    accept: string;
    /**
     * If current file has id, pass it here, to be passed back in the `removed` event
     */
    fileId?: number;
    /**
     * The url to submit the image into.
     */
    url: string;
    /**
     * The submit request method.
     */
    method: string;
    /**
     * json formData to be injected in the submit request
     */
    formData: string;
    /**
     * Sets the required attribute to the output field
     */
    required: boolean;
    /**
     * The maximum size of a file, for instance 2MB or 750KB
     */
    maxFileSize: `${number}MB` | `${number}KB}`;
    /**
     * Sets the disabled attribute to the output field
     */
    disabled: boolean;
    /**
     * Enable or disable drag n' drop
     */
    allowDrop: boolean;
    /**
     * Enable or disable file browser
     */
    allowBrowse: boolean;
    /**
     * Enable or disable pasting of files. Pasting files is not supported on all browesrs.
     */
    allowPaste: boolean;
    /**
     * Enable or disable adding multiple files
     */
    allowMultiple: boolean;
    /**
     * Allow drop to replace a file, only works when allowMultiple is false
     */
    allowReplace: boolean;
    /**
     * Enable or disable the revert processing button
     */
    allowRevert: boolean;
    /**
     * When set to false the remove button is hidden and disabled
     */
    allowRemove: boolean;
    /**
     * Enable or disable the process button
     */
    allowProcess: boolean;
    /**
     * Allow users to reorder files with drag and drop interaction.
     * Note that this only works in single column mode.
     * It also only works on browsers that support pointer events.
     */
    allowReorder: boolean;
    /**
     * Enable or disable preview mode
     */
    allowImagePreview: boolean;
    /**
     * Fixed image preview height, overrides min and max preview height
     */
    imagePreviewHeight: number;
    /**
     * Fixed image poster height, overrides min and max preview height
     */
    filePosterHeight: number;
    /**
     * Tells FilePond to store files in hidden file input elements so they can be posted along with normal form post.
     * This only works if the browser supports the DataTransfer constructor (https://caniuse.com/mdn-api_datatransfer_datatransfer),
     * this is the case on Firefox, Chrome, Chromium powered browsers and Safari version 14.1 and higher.
     */
    storeAsFile: boolean;
    /**
     * Set to true to require the file to be successfully reverted before continuing.
     */
    forceRevert: boolean;
    /**
     * The maximum number of files that the pond can handle
     */
    maxFilesCount: number;
    /**
     * The maxmimum number of files that can be uploaded in parallel
     */
    maxParallelUploads: number;
    /**
     * Set to true to enable custom validity messages.
     * FilePond will throw an error when a parent form is submitted and it contains invalid files.
     */
    checkValidity: boolean;
    /**
     * Set to 'after' to add files to end of list (when dropped at the top of the list or added using browse or paste),
     * set to 'before' to add files at start of list.
     * Set to a compare function to automatically sort items when added
     */
    itemInsertLocation: 'before' | 'after' | ((a: FilePondFile, b: FilePondFile) => number);
    /**
     * The interval to use before showing each item being added to the list
     */
    itemInsertInterval: number;
    /**
     * Show credits at the bottom of the upload element.
     * Structure is like [{label,url}]
     */
    credits: false;
    /**
     * FilePond will catch all files dropped on the webpage
     */
    dropOnPage: boolean;
    /**
     * Require drop on the FilePond element itself to catch the file.
     */
    dropOnElement: boolean;
    /**
     * When enabled, files are validated before they are dropped. A file is not added when it's invalid.
     */
    dropValidation: boolean;
    /**
     * Ignored file names when handling dropped directories. Dropping directories is not supported on all browsers.
     */
    ignoredFiles: Array<any>;
    /**
     * Immediately upload new files to the server
     */
    instantUpload: boolean;
    /**
     * Enable chunked uploads, when enabled will automatically cut up files in chunkSize chunks before upload.
     */
    chunkUploads: boolean;
    /**
     * Force chunks even for files smaller than the set chunkSize
     */
    chunkForce: boolean;
    /**
     * The size of a chunk in bytes
     */
    chunkSize: number;
    /**
     * Amount of times, and delayes, between retried uploading of a chunk
     */
    chunkRetryDelays: Array<number>;
    /**
     * The decimal separator used to render numbers. By default this is determined automatically.
     */
    labelDecimalSeparator: string;
    /**
     * The thousdands separator used to render numbers. By default this is determined automatically.
     */
    labelThousandsSeparator: string;
    /**
     * Default label shown to indicate this is a drop area.
     * FilePond will automatically bind browse file events to the element with CSS class .filepond--label-action
     * @default `${salla.lang.get('common.uploader.drag_and_drop')}<span class="filepond--label-action"> ${salla.lang.get('common.uploader.browse')} </span>`
     */
    labelIdle: string;
    /**
     * The icon used for remove actions
     */
    iconRemove: string;
    /**
     * The icon used for process actions
     */
    iconProcess: string;
    /**
     * The icon used for retry actions
     */
    iconRetry: string;
    /**
     * The icon used for undo actions
     */
    iconUndo: string;
    /**
     * Event emitted when the file has been added
     */
    added: EventEmitter<{
        error: FilePondErrorDescription | null;
        file: FilePondFile;
    }>;
    /**
     * Event emitted when the input is invalid
     */
    invalidInput: EventEmitter<any>;
    addedHandler(error: FilePondErrorDescription | null, file: FilePondFile): void;
    /**
     * Event emitted when the file has been uploaded and link to the file has been recieved from the server. Returns string value.
     */
    uploaded: EventEmitter<string>;
    uploadedHandler(): CustomEvent<string>;
    /**
     * Event emitted when the file is about to be removed. Returns boolean value.
     */
    removed: EventEmitter<FilePondFile>;
    removedHandler(deletedFile: FilePondFile): CustomEvent<FilePondFile>;
    /**
     *  Method to set option for filepond
     * */
    setOption(key: string, value: string | number): Promise<void>;
    private getLabel;
    /**
     *
     * This method will fire head request to get the file size, it's head request,so it will be too fast.
     */
    private getFileSize;
    private getFormDataFileInput;
    private openFileBrowser;
    private getFiles;
    componentWillLoad(): Promise<void>;
    render(): any;
    componentDidLoad(): void;
}
