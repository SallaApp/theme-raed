import '../partials/filepond';
import Flatpickr from 'flatpickr';
import BasePage from '../basePage';
import Filepond from '../partials/filepond';

class Profile extends BasePage {
    onReady() {
        Flatpickr('.date-element', { "dateFormat": "Y-m-d" });
        this.initiateProfileImage();
        this.initiateVerifyMobile();
        this.appendAvtar();
    }

    getProfileLabel() {
        return document.querySelector('html').getAttribute('dir') === 'rtl'
            ? '<span class="avatar-placeholder flex justify-center items-center flex-col"><span class="sicon-user"></span><span class="text">اختر صورة مناسبة</span></span>'
            : '<span class="avatar-placeholder flex justify-center items-center flex-col"><span class="sicon-user"></span><span class="text">Choose your image</span></span>';
    }

    initiateProfileImage() {

        this.avatarFilepond = Filepond('#profile_img', {
            labelIdle: this.getProfileLabel(),
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
        const btn = document.getElementById('update-profile-btn');
        let toggleClasses = ['btn--is-loading', 'pointer-events-none'];
        btn.addEventListener('click', () => btn.classList.add(...toggleClasses));
        let removeLoading = () => btn.classList.remove(...toggleClasses);

        salla.event.on("stores::profile.updated", removeLoading)
        salla.document.event.onRequestFailed(removeLoading);
    }

    // otp
    initiateVerifyMobile() {
        salla.event.on('profile::verify.mobile', ()=> { 
            const btn = document.getElementById('verify-mobile-btn');
            btn.addEventListener('click', () => btn.classList.add('btn--is-loading'));
            // let removeLoading = () => btn.classList.remove('btn--is-loading');
            
            let otpInputs = document.querySelectorAll('.otp-input');
            this.handleInput(otpInputs);
            this.handlePaste(otpInputs);
        }) 
    }

    handleInput(otpInputs) {
        otpInputs[0].focus();
        otpInputs.forEach(otpInput => {
            otpInput.addEventListener("keyup", (event) => {
                let key = event.keyCode || event.charCode;
                otpInput.value = this.digitValidate(otpInput.value);
                if (otpInput.value) { 
                    otpInput.nextElementSibling?.focus();
                }
                else if( key == 8 || key == 46 ){ otpInput.previousElementSibling?.focus(); }
                this.hanleSubmitBtn(otpInputs)
            })
        })
    }

    handlePaste(otpInputs) {
        otpInputs.forEach(otpInput => {
            otpInput.addEventListener("paste", (event) => {
                const paste = event.clipboardData.getData('text');
                const inputs = Array.from(Array(4));
                inputs.forEach((element, i) => {
                    otpInputs[i].value = this.digitValidate(paste[i] || '');
                    this.hanleSubmitBtn(otpInputs)
                });
                setTimeout(() => otpInput.focus(), 100);
            })
        })
    }

    hanleSubmitBtn(otpInputs){
        let otpValue=[]
        var btn = document.querySelector('#verify-mobile-btn');
        var otpField = document.querySelector('#verify-mobile-field');

        otpInputs.forEach((optInput) => {
            if(optInput.value){
                otpValue.push(optInput.value)
            }
        })

        otpField.value = otpValue.join('');
        
        if (otpValue.length == 4) {
            btn?.removeAttribute('disabled');
        } else {
            btn?.setAttribute('disabled', '');
        }
    }

    digitValidate(value) {        
       return value.replace(/[^0-9\u0660-\u0669]/g, '');
    }

    // end otp


    appendAvtar() {
        /** @type {FilePond} */
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
}

new Profile;