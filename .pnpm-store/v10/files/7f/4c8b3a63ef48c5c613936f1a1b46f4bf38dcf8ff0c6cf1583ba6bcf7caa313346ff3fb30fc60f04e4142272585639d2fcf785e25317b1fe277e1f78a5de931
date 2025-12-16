/*!
 * Crafted with ❤ by Salla
 */
import { Host, h } from "@stencil/core";
import AndroidPhoneIcon from "../../assets/svg/android-phone.svg";
import MailIcon from "../../assets/svg/mail.svg";
/**
 * @slot footer - Replaces the footer, by default it contains: verify button, resend, and timer
 * @slot after-footer - placeholder position
 */
export class SallaVerify {
    constructor() {
        this.translationLoaded = false;
        /**
         * Should render component without modal
         */
        this.display = 'modal';
        /**
         * Verifying method
         */
        this.type = 'mobile';
        /**
         * should auto reloading the page after success verification
         */
        this.autoReload = true;
        /**
         * Once the api verify success, it will be login the customer in web pages
         */
        this.supportWebAuth = true;
        this.resendAfter = 30;
        /**
         * to use: `salla.api.auth.verify` or `salla.profile.verify`
         */
        this.isProfileVerify = false;
        salla.lang.onLoaded(() => {
            this.translationLoaded = true;
            this.title = salla.lang.get('pages.profile.verify_title') + salla.lang.get('common.elements.' + this.type);
            this.modal?.setTitle(this.title);
        });
        if (this.display == 'inline') {
            this.modal = { open: () => '', close: () => '', setTitle: () => '' };
            return;
        }
        //todo:: change this way, now we fire the event from the backend, we should listen to salla.profile.event.onUpdated
        salla.event.on('profile::verification', data => {
            let payload = Array.isArray(data) ? data[0] : data;
            this.isProfileVerify = true;
            this.open(payload);
            this.title = salla.lang.get('pages.profile.verify_title') + salla.lang.get('common.elements.' + payload.type);
            this.modal?.setTitle(this.title);
        });
        salla.event.on('modalClosed', () => {
            this.resendAfter = 0;
            this.timer.innerHTML = '30 : 00';
        });
    }
    splitNumber(e) {
        this.resetError();
        let data = e.data || e.target.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
        if (!data)
            return; // Shouldn't happen, just in case.
        if (data.length === 1)
            return; // Here is a normal behavior, not a paste action.
        this.modifyNext(e.target, data);
    }
    modifyNext(el, data) {
        el.value = data[0]; // Apply first item to first input
        data = data.substring(1); // remove the first char.
        if (el.nextElementSibling && data.length) {
            // Do the same with the next element and next data
            this.modifyNext(el.nextElementSibling, data);
        }
        else if (!el.nextElementSibling && data.length === 0) {
            el.focus();
        }
        else if (el.nextElementSibling && data.length === 0) {
            el.nextElementSibling.focus();
        }
    }
    checkAllInputs() {
        let allFilled = true;
        for (let i = 0; i < this.otpInputs.length; i++) {
            if (this.otpInputs[i].value === '') {
                allFilled = false;
            }
        }
        return allFilled;
    }
    handleKeyUp(ev) {
        this.resetError();
        if (['Alt', 'Shift', 'Control', 'AltGraph', 'Ctrl'].includes(ev.key)) {
            return;
        }
        let key = ev.keyCode || ev.charCode;
        if (ev.target.value) {
            ev.target.nextElementSibling?.focus();
            ev.target.nextElementSibling?.select();
        }
        else if ([8, 46].includes(key)) {
            ev.target.previousElementSibling?.focus();
            ev.target.previousElementSibling?.select();
        }
        // If the target is populated to quickly, value length can be > 1
        if (ev.target.value.length > 1) {
            this.splitNumber(ev);
        }
    }
    handlePaste(ev) {
        this.resetError();
        const clipboardText = salla.helpers.number(ev.clipboardData.getData('text')) || '';
        let text = clipboardText.replace(/[^0-9]/g, '');
        text = text.substring(0, this.otpInputs.length);
        this.otpInputs.forEach(input => input.value = '');
        this.modifyNext(this.otpInputs[0], text);
    }
    handleInput(ev) {
        this.resetError();
        salla.helpers.inputDigitsOnly(ev.target);
        // check if all otpInputs has values then send the request
        if (this.checkAllInputs()) {
            setTimeout(() => {
                this.toggleOTPSubmit();
            }, 100);
        }
    }
    resetError() {
        this.hasError = false;
        this.errorMessage = '';
    }
    handleFocus(ev) {
        // If the focus element is the first one, do nothing
        if (ev.target === this.firstOtpInput)
            return;
        // If value of input 1 is empty, focus it.
        if (this.firstOtpInput?.value == '') {
            this.firstOtpInput.focus();
        }
        // If value of a previous input is empty, focus it.
        // To remove if you don't wanna force user respecting the fields order.
        if (ev.target.previousElementSibling.value == '') {
            ev.target.previousElementSibling.focus();
        }
    }
    /**
     * Get current code
     * @return {string}
     */
    async getCode() {
        return this.code.value;
    }
    /**
     * Open verifying modal
     * @param data
     */
    async open(data) {
        this.data = data;
        this.data.type = this.data.type || this.type;
        this.type = this.data.type;
        this.resendTimer();
        this.otpInputs = this.body.querySelectorAll('.s-verify-input');
        this.firstOtpInput = this.body.querySelector('#otp-1');
        this.reset();
        this.resetError();
        this.display == 'modal' && this.modal?.setTitle(this.title);
        this.modal.open();
        this.firstOtpInput?.addEventListener('input', e => this.splitNumber(e));
        // focus the first input after opening the modal
        setTimeout(() => this.otpInputs[0].focus(), 100);
    }
    toggleOTPSubmit() {
        let otp = [];
        this.otpInputs.forEach(input => input.value && otp.push(input.value));
        this.code.value = otp.join('');
        if (otp.length === 4) {
            this.btn.disable();
            this.btn.click();
            return;
        }
        this.btn.enable();
    }
    reset() {
        this.otpInputs.forEach((input) => input.value = '');
        this.code.value = '';
        this.otpInputs[0].focus();
    }
    resendTimer() {
        this.resendMessage.style.display = 'block';
        this.resend.style.display = 'none';
        this.resendAfter = 30;
        let timerId = setInterval(() => {
            if (this.resendAfter <= 0) {
                clearInterval(timerId);
                this.resend.style.display = 'block';
                this.resendMessage.style.display = 'none';
            }
            else {
                this.timer.innerHTML = `${this.resendAfter >= 10 ? this.resendAfter : '0' + this.resendAfter} : 00`;
                this.resendAfter--;
            }
        }, 1000);
    }
    resendCode() {
        return this.btn.stop()
            .then(() => this.btn.disable())
            .then(() => {
            this.otpInputs.forEach(input => input.value = '');
            this.otpInputs[0].focus();
        })
            .then(() => salla.api.auth.resend(this.data))
            .finally(() => this.resendTimer());
    }
    submit() {
        //if code not 4 digits, focus on the after filled input,
        if (this.code.value.length < 4) {
            this.otpInputs[this.code.value.length].focus();
            salla.log('Trying to submit without 4 digits!');
            return;
        }
        let data = { code: this.code.value, ...this.data };
        return this.btn.load()
            .then(() => this.btn.disable())
            .then(() => this.isProfileVerify ? salla.profile.verify(data) : salla.auth.verify(data, this.supportWebAuth))
            .then(response => this.verified.emit(response))
            .then(() => this.btn.stop() && this.btn.disable())
            .then(() => this.modal.close())
            .then(() => this.autoReload && window.location.reload())
            .catch((error) => {
            this.hasError = true;
            this.errorMessage = error.response?.data?.error?.message || salla.lang.get('common.errors.error_occurred');
            if (!error.response) {
                console.log('Unexpected error', error);
            }
            else {
                salla.logger.error(error);
            }
            this.btn.stop() && this.btn.enable() && this.reset();
        });
    }
    render() {
        return this.display == 'inline' ? h(Host, null, this.myBody()) :
            h("salla-modal", { width: "xs", class: "s-verify", ref: modal => this.modal = modal, "modal-title": this.title }, h("span", { slot: 'icon', class: "s-verify-header-icon", innerHTML: this.type == "mobile" ? AndroidPhoneIcon : MailIcon }), this.myBody());
    }
    myBody() {
        return (h("div", { class: "s-verify-body", ref: body => this.body = body }, h("div", { class: "s-verify-message", innerHTML: salla.lang.get('pages.profile.verify_message') }), h("slot", { name: "mobile" }), h("slot", { name: "email" }), h("input", { type: "hidden", name: "code", maxlength: "4", required: true, ref: code => this.code = code }), h("div", { class: { "s-verify-codes": true, "has-error": this.hasError }, dir: "ltr" }, [1, 2, 3, 4].map((i) => h("input", { type: "number", autocomplete: "one-time-code", pattern: "[0-9]*", inputmode: "numeric", maxlength: "1", value: "", id: `otp-${i}`, class: { "s-verify-input": true, "s-has-error": this.hasError }, onInput: e => this.handleInput(e), onPaste: e => this.handlePaste(e), onKeyUp: e => this.handleKeyUp(e), onFocus: e => this.handleFocus(e), required: true }))), this.hasError && this.errorMessage ? h("span", { class: "s-verify-error-message" }, this.errorMessage) : '', h("div", { slot: "footer", class: "s-verify-footer" }, h("salla-button", { class: "s-verify-submit", "loader-position": 'center', disabled: true, onClick: () => this.submit(), ref: b => this.btn = b }, salla.lang.get('pages.profile.verify')), h("p", { class: "s-verify-resend-message", ref: el => this.resendMessage = el }, salla.lang.get('blocks.header.resend_after'), h("b", { class: "s-verify-timer", ref: el => this.timer = el })), h("a", { href: "#", class: "s-verify-resend", onClick: () => this.resendCode(), ref: el => this.resend = el }, salla.lang.get('blocks.comments.submit'))), h("slot", { name: "after-footer" })));
    }
    static get is() { return "salla-verify"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-verify.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-verify.css"]
        };
    }
    static get properties() {
        return {
            "display": {
                "type": "string",
                "attribute": "display",
                "mutable": false,
                "complexType": {
                    "original": "'inline' | 'modal'",
                    "resolved": "\"inline\" | \"modal\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Should render component without modal"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'modal'"
            },
            "type": {
                "type": "string",
                "attribute": "type",
                "mutable": true,
                "complexType": {
                    "original": "'mobile' | 'email'",
                    "resolved": "\"email\" | \"mobile\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Verifying method"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'mobile'"
            },
            "autoReload": {
                "type": "boolean",
                "attribute": "auto-reload",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "should auto reloading the page after success verification"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "supportWebAuth": {
                "type": "boolean",
                "attribute": "support-web-auth",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Once the api verify success, it will be login the customer in web pages"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            }
        };
    }
    static get states() {
        return {
            "translationLoaded": {},
            "title": {},
            "resendAfter": {},
            "hasError": {},
            "errorMessage": {},
            "isProfileVerify": {}
        };
    }
    static get events() {
        return [{
                "method": "verified",
                "name": "verified",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event when success verification"
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "getCode": {
                "complexType": {
                    "signature": "() => Promise<string>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<string>"
                },
                "docs": {
                    "text": "Get current code",
                    "tags": [{
                            "name": "return",
                            "text": undefined
                        }]
                }
            },
            "open": {
                "complexType": {
                    "signature": "(data: any) => Promise<void>",
                    "parameters": [{
                            "name": "data",
                            "type": "any",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Open verifying modal",
                    "tags": [{
                            "name": "param",
                            "text": "data"
                        }]
                }
            }
        };
    }
    static get elementRef() { return "host"; }
}
