import './partials/filepond';
import BasePage from './basePage';
import Flatpickr from "flatpickr";
import Filepond from "./partials/filepond";

class Profile extends BasePage {
    onReady() {
        Flatpickr('.date-element', {"dateFormat": "Y-m-d"});
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
            labelIdle                     : this.getProfileLabel(),
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
        const btn = document.getElementById('update-profile-btn');
        let toggleClasses = ['btn--is-loading', 'pointer-events-none'];
        btn.addEventListener('click', () => btn.classList.add(...toggleClasses));
        let removeLoading = () => btn.classList.remove(...toggleClasses);

        salla.event.on("stores::profile.updated", removeLoading)
        salla.document.event.onRequestFailed(removeLoading);
    }

    initiateVerifyMobile() {
        salla.document.event.onKeyup('#verify-mobile-field', function (event) {
            var btn = document.querySelector('#verify-mobile-btn');
            if (!btn) {
                return;
            }
            if (event.target.value.length == 4) {
                btn.removeAttribute('disabled');
            } else {
                btn.setAttribute('disabled', '');
            }
        });
    }

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