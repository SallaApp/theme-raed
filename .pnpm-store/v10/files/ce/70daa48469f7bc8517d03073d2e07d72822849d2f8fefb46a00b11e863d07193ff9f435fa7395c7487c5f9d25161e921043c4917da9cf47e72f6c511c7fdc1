import { EventEmitter } from '../../stencil-public-runtime';
export declare class SallaMap {
    private map;
    private locationModal;
    private marker;
    private defaultLat;
    private defaultLng;
    host: HTMLElement;
    modalActivityTitle: string;
    confirmButtonTitle: string;
    locateButtonTitle: string;
    locateButtonEdit: string;
    searchPlaceholder: string;
    searchInputValue: string;
    formattedAddress: string;
    geolocationError: boolean;
    searchInput: HTMLInputElement;
    mapInput: HTMLInputElement;
    mapElement: HTMLElement;
    selectedLat: number;
    selectedLng: number;
    constructor();
    private formatAddress;
    private getLatLng;
    private getPositionAddress;
    private initGoogleMaps;
    private getCurrentLocation;
    private handleLocationError;
    componentDidLoad(): void;
    /**
     * Open location component
     */
    open(): Promise<HTMLElement>;
    /**
     * File input name for the native formData
     */
    name: string;
    /**
     * Set if the location input is required or not
     */
    required: boolean;
    /**
     * Disable or enable actions
     */
    readonly: boolean;
    /**
     * Sets the search bar visibility.
     */
    searchable: boolean;
    /**
     * Latitude coordinate, defaults to current user location
     */
    lat: number;
    /**
     * Longitude coordinate, defaults to current user location
     */
    lng: number;
    /**
     * Sets google api key value, default Merchant key
     */
    apiKey: string;
    /**
     * Modal Title
     */
    modalTitle: string;
    /**
     * Sets start map zoom.
     */
    zoom: number;
    /**
     * Sets map style.
     */
    theme: string;
    /**
     * Custom DOM event emitter when location is selected
     */
    selected: EventEmitter;
    /**
     * Custom DOM event emitter when map is clicked
     */
    mapClicked: EventEmitter;
    /**
     * Custom DOM event emitter when current location is selected
     */
    currentLocationChanged: EventEmitter;
    /**
     * Event emitted when the input is invalid.
     */
    invalidInput: EventEmitter<any>;
    private getLocationModal;
    render(): any;
}
