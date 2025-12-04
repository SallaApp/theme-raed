import { type EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot footer - The footer of modal
 */
export declare class SallaModal {
    constructor();
    /**
     * Sets the modal to be closable. Defaults to `true`
     */
    isClosable: boolean;
    /**
     * The size of the modal
     */
    width: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    /**
     * The position of the modal
     */
    position: 'top' | 'middle' | 'bottom';
    /**
     * open the modal on rendering
     */
    visible: boolean;
    /**
     * open the modal on rendering
     */
    hasSkeleton: boolean;
    /**
     * Show loading in the middle
     */
    isLoading: boolean;
    /**
     * Show subtitle before the title or not, defaults to `false` (after the title)
     */
    subTitleFirst: boolean;
    /**
     * Avoid padding in the modal body or not, defaults to `false`
     */
    noPadding: boolean;
    /**
     * Set modal sub title.
     */
    subTitle: string;
    /**
     * Align modal content to center, defaults to `false`
     */
    centered: boolean;
    /**
     * Set the style of the header icon.
     */
    iconStyle: 'error' | 'success' | 'primary' | 'normal';
    modalTitle: string;
    private overlay;
    host: HTMLElement;
    /**
     * Event emitted when the modal visibilty is changed.
     */
    modalVisibilityChanged: EventEmitter<Boolean>;
    handleVisible(newValue: boolean): void;
    handleKeyUp(ev: KeyboardEvent): void;
    /**
     * Open the modal
     */
    open(): Promise<HTMLElement>;
    /**
     * close the modal
     */
    close(): Promise<HTMLElement>;
    /**
     * Change the Modal Title
     * @param {string} modalTitle
     */
    setTitle(modalTitle: any): Promise<HTMLElement>;
    /**
     * Start loading
     */
    loading(): Promise<HTMLElement>;
    /**
     * Stop the loading
     */
    stopLoading(): Promise<HTMLElement>;
    private handleAutoFocus;
    private toggleModal;
    private closeModal;
    private iconBlockClasses;
    private getWidth;
    render(): any;
    componentDidLoad(): void;
}
