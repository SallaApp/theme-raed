import { type EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot footer - The footer of drawer
 */
export declare class SallaDrawer {
    constructor();
    /**
     * Sets the drawer to be closable. Defaults to `true`
     */
    isClosable: boolean;
    /**
     * The width of the drawer
     */
    width: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    /**
     * The position of the drawer (left or right)
     */
    position: 'left' | 'right';
    /**
     * open the drawer on rendering
     */
    visible: boolean;
    /**
     * open the drawer on rendering
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
     * Avoid padding in the drawer body or not, defaults to `false`
     */
    noPadding: boolean;
    /**
     * Set drawer sub title.
     */
    subTitle: string;
    /**
     * Align drawer content to center, defaults to `false`
     */
    centered: boolean;
    /**
     * Set the style of the header icon.
     */
    iconStyle: 'error' | 'success' | 'primary' | 'normal';
    drawerTitle: string;
    private overlay;
    host: HTMLElement;
    /**
     * Event emitted when the drawer visibilty is changed.
     */
    drawerVisibilityChanged: EventEmitter<Boolean>;
    handleVisible(newValue: boolean): void;
    handleKeyUp(ev: KeyboardEvent): void;
    /**
     * Open the drawer
     */
    open(): Promise<HTMLElement>;
    /**
     * close the drawer
     */
    close(): Promise<HTMLElement>;
    /**
     * Change the Drawer Title
     * @param {string} drawerTitle
     */
    setTitle(drawerTitle: any): Promise<HTMLElement>;
    /**
     * Start loading
     */
    loading(): Promise<HTMLElement>;
    /**
     * Stop the loading
     */
    stopLoading(): Promise<HTMLElement>;
    private handleAutoFocus;
    private toggleDrawer;
    private closeDrawer;
    private iconBlockClasses;
    private getWidth;
    render(): any;
    componentDidLoad(): void;
}
