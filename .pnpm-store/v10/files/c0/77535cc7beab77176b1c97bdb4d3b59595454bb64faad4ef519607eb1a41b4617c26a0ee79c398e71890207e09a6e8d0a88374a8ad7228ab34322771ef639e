// @ts-ignore
import { FilePondOptions } from "filepond";

declare module "filepond" {
  export interface FilePondOptions {
    /** Enable or disable file size validation. */
    allowFileSizeValidation?: boolean;
    /** The minimum size of a file, for instance 5MB or 750KB. */
    minFileSize?: string | null;
    /** Message shown when a small file is dropped. */
    labelMinFileSizeExceeded?: string;
    /** Message shown when the file size is lower than the {filesize}. {filesize} is replaced with the value of the minFileSize property */
    labelMinFileSize?: string;
    /** The maximum size of a file, for instance 5MB or 750KB. */
    maxFileSize?: string | null;
    /** Maximum size of all files in list, same format as maxFileSize. */
    maxTotalFileSize?: string | null;
    /** Message shown when a large file is dropped. */
    labelMaxFileSizeExceeded?: string;
    /** Message shown when max file size was exceeded. {filesize} is replaced with the value of the maxFileSize property. */
    labelMaxFileSize?: string;
    /** Message shown when total file size exceeds maximum. */
    labelMaxTotalFileSizeExceeded?: string;
    /** Message shown then total file size exceeds maximum. */
    labelMaxTotalFileSize?: string;
  }
}
