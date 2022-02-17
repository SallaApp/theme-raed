import Flatpickr from 'flatpickr';
import BasePage from './base-page';
// import TelInput from "intl-tel-input";

class Profile extends BasePage {
    onReady() {
        Flatpickr('.date-element', {"dateFormat": "Y-m-d"});
        this.initiateProfileImage();
        this.appendAvtar();
        // this.initTelInput();
    }

    initiateProfileImage() {
        this.avatarFilepond = new FileUploader('#profile-img', {
            labelIdle                     : document.querySelector('html').getAttribute('dir') === 'rtl'
                ? '<span class="avatar-placeholder flex justify-center items-center flex-col"><span class="sicon-user"></span><span class="text">اختر صورة مناسبة</span></span>'
                : '<span class="avatar-placeholder flex justify-center items-center flex-col"><span class="sicon-user"></span><span class="text">Choose your image</span></span>',
            instantUpload                 : false,
            multiple                      : false,
            imagePreviewHeight            : 80,
            imageCropAspectRatio          : '1:1',
            imageResizeTargetWidth        : 200,
            imageResizeTargetHeight       : 200,
            stylePanelLayout              : 'compact circle',
            styleLoadIndicatorPosition    : 'center bottom',
            styleProgressIndicatorPosition: 'center center',
            styleButtonRemoveItemPosition : 'center bottom',
            styleButtonProcessItemPosition: 'center bottom',
        });
        let btn = app.element('#update-profile-btn');

        salla.event.on("stores::profile.updated", () => btn.classList.remove('btn--is-loading', 'pointer-events-none'));
        salla.document.event.onRequestFailed(() => btn.classList.remove('btn--is-loading', 'pointer-events-none'));
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
}

Profile.className = 'Profile';
Profile.allowedPages = ['customer.profile'];
Profile.intiateWhenReady();