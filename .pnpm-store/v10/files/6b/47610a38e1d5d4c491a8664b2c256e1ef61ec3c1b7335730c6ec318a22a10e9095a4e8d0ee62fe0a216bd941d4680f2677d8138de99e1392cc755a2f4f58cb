// @ts-ignore
import { FilePondOptions } from "filepond";

declare module "filepond" {
  export interface FilePondOptions {
    /** Enable or disable file poster */
    allowFilePoster?: boolean;

    /** Fixed poster height */
    filePosterHeight?: number;

    /** Min poster height */
    filePosterMinHeight?: number;

    /** Max poster height */
    filePosterMaxHeight?: number;

    /** filters file items to determine which are shown as poster */
    filePosterFilterItem?: () => true;

    /** Enables or disables reading average image color */
    filePosterCalculateAverageImageColor?: boolean;

    /** Allows setting the value of the CORS attribute (null is don't set attribute) */
    filePosterCrossOriginAttributeValue?: string;

    /** Allows setting the shadow overlay color expects three numbers between 0 and 255 */
    filePosterItemOverlayShadowColor?: number[];

    /** Allows setting the error overlay color expects three numbers between 0 and 255 */
    filePosterItemOverlayErrorColor?: number[];

    /** Allows setting the success overlay color expects three numbers between 0 and 255 */
    filePosterItemOverlaySuccessColor?: number[];
  }
}
