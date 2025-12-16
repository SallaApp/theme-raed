/*!
 * Crafted with ❤ by Salla
 */
import { Host, h } from "@stencil/core";
import BookingTime from "../../assets/svg/calendar-time.svg";
import Calendar from "../../assets/svg/calendar.svg";
import TimeIcon from "../../assets/svg/time.svg";
export class SallaBookingField {
    constructor() {
        this.bookNowLabel = salla.lang.get('pages.cart.book_an_appointment', 'حجز موعد');
        this.editLabel = salla.lang.get('pages.cart.edit_an_appointment', 'تعديل الموعد');
        this.bookedLabel = salla.lang.get('pages.cart.booked_successfully', 'تمت اضافة الموعد بنجاح');
        this.selectDate = salla.lang.get('pages.cart.select_appointment_date', 'حدد تاريخ الموعد');
        this.bookingUrl = '';
        this.iframeReady = false;
        this.reservations = [];
        // Load translations
        salla.lang.onLoaded(() => this.setTranslations());
        // Register event listeners
        Salla.event.on('booking::open', (data) => this.handleBookingOpen(data));
    }
    async setTranslations() {
        const setNestedAsync = (lang, key, value) => {
            return new Promise((resolve) => {
                salla.helpers.setNested(salla.lang.messages[lang], key, value);
                resolve(true);
            });
        };
        await setNestedAsync('ar.trans', 'pages.cart.book_an_appointment', 'حجز موعد');
        await setNestedAsync('en.trans', 'pages.cart.book_an_appointment', 'Book an Appointment');
        await setNestedAsync('ar.trans', 'pages.cart.edit_an_appointment', 'تعديل الموعد');
        await setNestedAsync('en.trans', 'pages.cart.edit_an_appointment', 'Edit an Appointment');
        await setNestedAsync('ar.trans', 'pages.cart.booked_successfully', 'تمت اضافة الموعد بنجاح');
        await setNestedAsync('en.trans', 'pages.cart.booked_successfully', 'Booked Successfully');
        await setNestedAsync('ar.trans', 'pages.cart.select_appointment_date', 'حدد تاريخ الموعد');
        await setNestedAsync('en.trans', 'pages.cart.select_appointment_date', 'Select appointment date');
        this.bookNowLabel = salla.lang.get('pages.cart.book_an_appointment');
        this.editLabel = salla.lang.get('pages.cart.edit_an_appointment');
        this.bookedLabel = salla.lang.get('pages.cart.booked_successfully');
        this.selectDate = salla.lang.get('pages.cart.select_appointment_date');
    }
    openBookingModal(event, afterReload = false) {
        if (afterReload && (!event.detail || typeof event.detail !== 'number' || event.detail !== this.productId)) {
            return;
        }
        if (salla.config.isGuest()) {
            this.setAfterReloadEvent('booking::open-after-reload', this.productId);
            salla.event.dispatch('login::open');
            return;
        }
        salla.booking.add(this.productId, false)
            .then((resp) => {
            if (resp.data.redirect.to !== 'booking') {
                throw new Error('Unexpected redirect!');
            }
            salla.event.dispatch('booking::open', { url: resp.data.redirect.url, id: this.productId });
        })
            .catch((error) => {
            salla.error(salla.lang.get('common.errors.error_occurred'));
            salla.logger.error(error.response || error);
        });
    }
    handleBookingOpen(data) {
        if (data.id !== this.productId)
            return;
        this.bookingUrl = salla.url.addParamToUrl('product_id', data.id, data.url);
        this.iframeReady = true;
        setTimeout(() => {
            this.modal.setTitle(this.selectDate);
            this.modal.open();
        }, 100);
    }
    setAfterReloadEvent(event, payload) {
        salla.storage.set('afterReloadEvent', { event, payload });
    }
    emitAfterReloadEvent() {
        const eventDetails = salla.storage.get('afterReloadEvent');
        if (eventDetails && eventDetails.event) {
            const customEvent = new CustomEvent(eventDetails.event, {
                detail: eventDetails.payload
            });
            window.dispatchEvent(customEvent);
            salla.storage.remove('afterReloadEvent');
        }
    }
    componentWillLoad() {
        if (this.option && this.option.details.length) {
            this.reservations = this.option.details;
        }
    }
    componentDidLoad() {
        window.addEventListener('booking::open-after-reload', (event) => this.openBookingModal(event, true));
        this.emitAfterReloadEvent();
        window.addEventListener('message', this.handleMessageEvent.bind(this));
        this.reservationsInput.addEventListener('invalid', e => this.invalidInput.emit(e));
        this.reservationsInput.addEventListener('input', () => {
            this.reservationsInput.setCustomValidity('');
            this.reservationsInput.reportValidity();
        });
    }
    handleMessageEvent(event) {
        if (event.data.source !== 'booking')
            return;
        const action = event.data.type;
        const value = event.data.message;
        if (localStorage.getItem('debug'))
            console.log(`Received an action:${action}`, event.data);
        if (action === 'error') {
            if (value.fields?.reservation) {
                salla.notify.error(value.fields.reservation[0]);
                return;
            }
            const errorList = Object.values(value.fields || [value.message]).flat().map(error => `<li>${error}</li>`).join('');
            salla.notify.error(`<ul>${errorList}</ul>`);
        }
        if (action === 'success') {
            if (Number(value.productId) !== Number(this.productId))
                return;
            this.reservations = value.data.reservations.map(schedule => {
                if (schedule.time && schedule.time.length > 0) {
                    const timeSlot = schedule.time[0];
                    return {
                        date: schedule.date,
                        day: schedule.day,
                        from_timestamp: timeSlot.from,
                        to_timestamp: timeSlot.to,
                    };
                }
                return null;
            }).filter(item => item !== null);
            salla.notify.success(this.bookedLabel);
            this.modal?.close();
            setTimeout(() => window.location.reload());
        }
        if (action === 'height') {
            this.iframe.height = value?.height + 'px';
        }
    }
    bookingModal() {
        return (h("salla-modal", { class: "s-booking-field-modal", ref: modal => (this.modal = modal), width: "md", position: "middle", noPadding: true }, h("iframe", { ref: iframe => (this.iframe = iframe), src: this.bookingUrl, frameborder: "0" })));
    }
    renderReservationDate(reservation) {
        return (h("span", { class: reservation.from_timestamp ? 's-booking-field-reservations-has-time' : '' }, h("i", { class: "s-booking-field-reservations-icon", innerHTML: Calendar }), reservation.date));
    }
    renderReservationTime(reservation) {
        if (!reservation.from_timestamp)
            return '';
        return (h("span", { class: "s-booking-field-reservations-time" }, h("i", { class: "s-booking-field-reservations-icon", innerHTML: TimeIcon }), h("span", null, reservation.from_timestamp, " - ", reservation.to_timestamp)));
    }
    render() {
        return (h(Host, { key: '04c9e3dc3dc825bd6905221d858c260f7ca34748' }, h("div", { key: '07ec38cec1bd1798640dd7ea9592bb3b17d945c6', class: "s-booking-field-main" }, this.option.required || this.reservations.length > 0 ? h("div", { class: "s-booking-field-price" }, h("span", { innerHTML: salla.money(this.option.price) })) : '', h("salla-button", { key: '6b71889cfc0429d15c466a6f194df31549f09786', class: "s-booking-field-book-now", size: "small", loaderPosition: "center", fill: "outline", onClick: event => this.openBookingModal(event, false) }, h("span", { key: 'a16f8db6f52c7751ea605efcae04057ca0dc5b61', class: "s-booking-field-book-now-content" }, h("span", { key: '95f6086a599bcc620c87ece6c6ae9620dba15581', innerHTML: BookingTime }), this.reservations.length ? this.editLabel : this.bookNowLabel))), this.reservations.length > 0 && (h("div", { key: 'b3615100bbfff3d98d0ac99145aaf53449790c94', class: "s-booking-field-reservations" }, this.reservations.map((reservation, index) => (h("div", { key: index, class: "s-booking-field-reservations-item" }, this.renderReservationDate(reservation), this.renderReservationTime(reservation)))))), h("input", { key: '126f14f2e520b8696bc7450e209bad30b267878b', class: "s-hidden", name: this.option.name, required: this.option.required, value: JSON.stringify(this.reservations) === '[]' ? '' : JSON.stringify(this.reservations), ref: reservations => this.reservationsInput = reservations }), this.iframeReady && this.bookingModal()));
    }
    static get is() { return "salla-booking-field"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-booking-field.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-booking-field.css"]
        };
    }
    static get properties() {
        return {
            "option": {
                "type": "unknown",
                "attribute": "option",
                "mutable": false,
                "complexType": {
                    "original": "Option",
                    "resolved": "Option",
                    "references": {
                        "Option": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/salla-booking-field/interfaces.ts::Option"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The booking option configuration"
                },
                "getter": false,
                "setter": false
            },
            "productId": {
                "type": "number",
                "attribute": "product-id",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The ID of the product for which the booking is being made"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "bookNowLabel": {},
            "editLabel": {},
            "bookedLabel": {},
            "selectDate": {},
            "bookingUrl": {},
            "iframeReady": {},
            "reservations": {},
            "reservationsInput": {}
        };
    }
    static get events() {
        return [{
                "method": "invalidInput",
                "name": "invalidInput",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when the input is invalid."
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "host"; }
}
