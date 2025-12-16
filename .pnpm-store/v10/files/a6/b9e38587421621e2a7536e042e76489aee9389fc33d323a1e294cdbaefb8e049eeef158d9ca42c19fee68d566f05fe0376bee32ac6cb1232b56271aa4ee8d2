import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @salla/ui-components
 * The `salla-accordion-head` component represents the header of an accordion.
 *
 * Available slots:
 * - `title`: The main title content
 * - `progress`: Progress indicator content
 * - `html`: Raw HTML content (optional)
 * - `note`: Note content displayed at the end
 */
export declare class SallaAccordionHead {
    host: HTMLElement;
    /** Should the accordion be collapsible or not. */
    collapsible: boolean;
    /** Current collapsed state */
    collapsed: boolean;
    /**
     * Emitted when the accordion head is clicked and the collapsed state changes.
     * Only emitted when the component is collapsible.
     *
     * @event accordionToggle
     * @type {Object}
     * @property {Object} detail.payload - The event payload
     * @property {boolean} detail.payload.collapsed - The new collapsed state
     */
    accordionToggle: EventEmitter<Object>;
    private emitCollapsePanel;
    private toggleCollapse;
    render(): any;
}
