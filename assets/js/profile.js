import Flatpickr from 'flatpickr';
import BasePage from './base-page';
import TelInput from "intl-tel-input";

class Profile extends BasePage {
    onReady() {
        Flatpickr('.date-element', { "dateFormat": "Y-m-d" });
        this.initiateProfileImage();
        this.initiateVerifyOTP();
        this.appendAvtar();
        this.initTelInput();
    }

    initiateProfileImage() {
        this.avatarFilepond = new FileUploader('#profile_img', {
            labelIdle: document.querySelector('html').getAttribute('dir') === 'rtl'
                ? '<span class="avatar-placeholder flex justify-center items-center flex-col"><span class="sicon-user"></span><span class="text">اختر صورة مناسبة</span></span>'
                : '<span class="avatar-placeholder flex justify-center items-center flex-col"><span class="sicon-user"></span><span class="text">Choose your image</span></span>',
            instantUpload: false,
            multiple: false,
            imagePreviewHeight: 80,
            imageCropAspectRatio: '1:1',
            imageResizeTargetWidth: 200,
            imageResizeTargetHeight: 200,
            stylePanelLayout: 'compact circle',
            styleLoadIndicatorPosition: 'center bottom',
            styleProgressIndicatorPosition: 'center center',
            styleButtonRemoveItemPosition: 'center bottom',
            styleButtonProcessItemPosition: 'center bottom',
        });
        let btn = app.element('#update-profile-btn');
        app.onClick(btn, () => btn.classList.add('btn--is-loading', 'pointer-events-none'));

        salla.event.on("stores::profile.updated", () => btn.classList.remove('btn--is-loading', 'pointer-events-none'));
        salla.document.event.onRequestFailed(() => btn.classList.remove('btn--is-loading', 'pointer-events-none'));
    }

    // otp
    initiateVerifyOTP() {
        salla.event.on('profile::verify.mobile', () => {
            this.resendTimer();
            this.otpInputs = document.querySelectorAll('.otp-input');
            this.otpInputs[0].focus();
            app.onClick('#verify-mobile-btn', event => event.target.classList.add('btn--is-loading'));
            app.onKeyUp('.otp-input', event => {
                let key = event.keyCode || event.charCode;
                event.target.value = event.target.value.replace(/[^0-9\u0660-\u0669]/g, '');
                if (event.target.value) {
                    event.target.nextElementSibling?.focus();
                } else if (key == 8 || key == 46) {
                    event.target.previousElementSibling?.focus();
                }
                this.toggelOTPSubmit();
            });

            app.on('paste', '.otp-input', event => {
                let text = event.clipboardData.getData('text').replace(/[^0-9\u0660-\u0669]/g, '');
                this.otpInputs.forEach((input, i) => input.value = text[i] || '');
                this.toggelOTPSubmit();
                setTimeout(() => event.target.focus(), 100);
            });


            // After send code
            salla.event.on('stores::profile.updated', () => {
                window.location.reload();
            })

            salla.event.on('document::request.failed', () => {
                app.element('#verify-mobile-btn').classList.remove('btn--is-loading');
            })


        })
    }

    toggelOTPSubmit() {
        let otp = []
        var btn = app.element('#verify-mobile-btn');
        this.otpInputs.forEach(input => input.value && otp.push(input.value));

        app.element('#verify-mobile-field').value = otp.join('');

        otp.length == 4
            ? btn?.removeAttribute('disabled')
            : btn?.setAttribute('disabled', '');

        if (otp.length == 4) {
            btn.click();
        }
    }

    resendTimer() {
        app.element('#resend-message').style.display = 'block'
        app.element('#resend-link').style.display = 'none'
        let resendAfter = 30;
        let timerId = setInterval(() => {
            if (resendAfter == -1) {
                clearTimeout(timerId);
                app.element('#resend-message').style.display = 'none'
                app.element('#resend-link').style.display = 'block'
            } else {
                app.element('#resend-timer').innerHTML = `${resendAfter >= 10 ? resendAfter : '0' + resendAfter} : 00`
                resendAfter--
            }
        }, 1000);


        // TODO: @jamal - change event to suceess case
        salla.event.auth.onCodeNotSent(() => {
            this.resendTimer()
        })
    }

    appendAvtar() {
        /** @type {FileUploader} */
        let avatarFilepond = this.avatarFilepond;
        window.appendAvtar = function handleFile(formData, that, event) {
            let filepondFile = avatarFilepond.getFile();
            if (!filepondFile.file.lastModified) {
                return formData;
            }
            formData.append('image_file', filepondFile.file);
            return formData;
        };
    }

    initTelInput() {
        salla.document.event.onKeyup('.tel-input', event => salla.helpers.digitsOnly(event.target));
        document.querySelectorAll('.tel-input').forEach(intlInput => {
            salla.helpers.digitsOnly(intlInput);
            let iti = TelInput(intlInput, {
                initialCountry: intlInput.dataset.code || 'sa',
                preferredCountries: ['sa', 'ae', 'kw', 'bh', 'qa', 'iq', 'om', 'ye', 'eg', 'jo', 'sy', 'ps', 'sd', 'lb', 'dz', 'tn', 'ma', 'ly'],
                formatOnDisplay: false,
                separateDialCode: true,
                autoPlaceholder: 'aggressive',
                utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js',
            });
            intlInput.addEventListener("countrychange", () => {
                let data = iti.getSelectedCountryData();
                document.querySelectorAll('.country_code').forEach(input => input.value = data.iso2.toUpperCase());
                document.querySelectorAll('.country_key').forEach(input => {
                    input.value = ('+' + data.dialCode).replace('++', '+');
                });
            });
        });
    }
}

Profile.className = 'Profile';
Profile.allowedPages = ['store.myprofile'];
Profile.intiateWhenReady();