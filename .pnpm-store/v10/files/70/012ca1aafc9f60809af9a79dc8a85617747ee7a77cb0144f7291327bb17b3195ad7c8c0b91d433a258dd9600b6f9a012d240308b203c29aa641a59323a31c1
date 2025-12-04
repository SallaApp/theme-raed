import { Advertisement } from './interfaces';
/**
 * @name SallaAdvertisement
 * @description A StencilJS component for handling and displaying advertisements in different pages of salla applications.
 * @tag salla-advertisement
 */
/**
 * @slot adv - Replaces the entire advertisement, has replaceable props `{icon}`, `{url}`, `{target}`, `{description}`, `{bg_color}`, `{text_color}`.
 * */
export declare class SallaAdvertisement {
    /**
    * Constructor for initializing the component.
    */
    constructor();
    private readonly advSlot;
    position: string;
    advertisements: Advertisement[];
    advertIcon: string;
    currentSlug: string;
    private host;
    /**
     * Checks whether an advertisement is marked as not visible/dismissed.
     * @param advert - The advertisement to check.
     * @returns True if the advertisement is not visible, false otherwise.
     */
    private isNotVisible;
    /**
     * Sets a flag to control the visibility of an advertisement and triggers an animation when hiding it.
     * @param advert - The advertisement to update.
     * @param flag - The flag indicating whether to display or hide the advertisement.
     */
    private setCanDisplayFlag;
    /**
     * Renders the advertisements based on the fetched data and visibility status.
     * @returns JSX for rendering advertisements.
     */
    render(): any[];
    /**
    * Lifecycle method that fetches advertisements before the component is loaded.
    */
    componentWillLoad(): Promise<Advertisement[]>;
    componentDidRender(): void;
}
