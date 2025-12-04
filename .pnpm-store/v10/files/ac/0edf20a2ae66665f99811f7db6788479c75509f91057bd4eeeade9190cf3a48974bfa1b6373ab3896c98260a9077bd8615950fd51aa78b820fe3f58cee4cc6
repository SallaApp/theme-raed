import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot The default slot.
 */
export declare class SallaTabHeader {
    id: string;
    /**
     * Header identifier name to sync with the content.
     */
    name: string;
    /**
   * The class applied to the currently active(selected) tab
   */
    activeClass: string;
    /**
     * Set the height of the tab bar
     */
    height: number | string;
    /**
     * Center tab items in the given flex.
     */
    centered: boolean;
    /**
     * Emits event object when clicked or selected.
     */
    tabSelected: EventEmitter;
    isSelected: boolean;
    /**
     * Expose self for the parent.
     */
    getChild(): Promise<{
        selected: any;
        unselect: any;
        name: string;
        id: string;
    }>;
    unselect(): void;
    selected(): void;
    onClick(): void;
    render(): any[];
}
