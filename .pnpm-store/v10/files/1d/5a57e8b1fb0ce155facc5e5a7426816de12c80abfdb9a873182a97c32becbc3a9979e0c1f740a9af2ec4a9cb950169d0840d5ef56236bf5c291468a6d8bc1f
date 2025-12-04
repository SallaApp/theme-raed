import { Donation } from "../salla-product-options/interfaces";
export declare class SallaProgressBar {
    constructor();
    /**
     * You can just pass the donation as json string ex: `{"target_message":null,"target_date":"2023-04-18","target_end_date":"2023-04-18","target_amount":400,"collected_amount":380,"can_donate":true}`
     */
    donation: string | Donation;
    /**
     * The goal of the progress bar
     */
    target: number;
    /**
     * The progress so far as of the goal.
     */
    value: number;
    /**
     * Set height for the wrapper.
     */
    height: string;
    /**
     * Big Title, before the progress bar.
     */
    header: string;
    /**
     * Stripped effect for tje progress bar.
     */
    stripped: boolean;
    /**
     * Subtitle under the progress bar or instead of it if the target not being set.
     */
    message: string;
    /**
     * The unite to be added after the numbers, defaults to: `salla.config.currency().symbol`
     */
    unit: string;
    /**
     * Progress bar color, defaults to: `salla.config.get('theme.color.primary', "#ffd5c4")`
     */
    color: string;
    /**
     * Hide units above the progress bar
     */
    hideUnits: boolean;
    private getPercentage;
    render(): any;
    private getProgressBar;
}
