import { EventEmitter } from '../../stencil-public-runtime';
import { Option, Reservation } from './interfaces';
export declare class SallaBookingField {
    /**
     * The booking option configuration
     */
    option: Option;
    /**
     * The ID of the product for which the booking is being made
     */
    productId: number;
    host: HTMLElement;
    bookNowLabel: string;
    editLabel: string;
    bookedLabel: string;
    selectDate: string;
    bookingUrl: string;
    iframeReady: boolean;
    reservations: Reservation[];
    reservationsInput: HTMLInputElement;
    /**
     * Event emitted when the input is invalid.
     */
    invalidInput: EventEmitter<any>;
    private modal;
    private iframe;
    constructor();
    private setTranslations;
    private openBookingModal;
    private handleBookingOpen;
    private setAfterReloadEvent;
    private emitAfterReloadEvent;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private handleMessageEvent;
    private bookingModal;
    renderReservationDate(reservation: Reservation): any;
    renderReservationTime(reservation: Reservation): any;
    render(): any;
}
