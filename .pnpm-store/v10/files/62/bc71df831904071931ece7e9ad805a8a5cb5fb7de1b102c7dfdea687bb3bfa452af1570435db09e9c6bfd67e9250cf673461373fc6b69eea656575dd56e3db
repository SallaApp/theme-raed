import { ISallaTabContentData, ISallaTabHeaderData, ISallaTabGroup } from './interfaces';
/**
 * @slot header - The tab header section. `salla-tab-header` component is used for this purpose.
 * @slot content - The active tab content section. `salla-tab-content` component is used for this purpose.
 */
export declare class SallaTabs {
    tabsHeader: ISallaTabHeaderData[];
    tabsContent: ISallaTabContentData[];
    tabGroup: ISallaTabGroup[];
    /**
     * Background color
     */
    backgroundColor: string;
    /**
     * Align tabs vertically.
     */
    vertical: boolean;
    host: HTMLElement;
    componentWillLoad(): void;
    onSelectedTab(event: CustomEvent): void;
    createGroup(): Promise<void>;
    selectGroup(group: ISallaTabGroup): void;
    render(): any[];
}
