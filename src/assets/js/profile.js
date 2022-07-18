import Flatpickr from 'flatpickr';
import BasePage from './base-page';

class Profile extends BasePage {
    onReady() {
        Flatpickr('.date-element', {"dateFormat": "Y-m-d"});
        let label = salla.config.get('theme.is_rtl') ? 'اختر صورة مناسبة' : 'Choose your image';

        this.avatarFilepond = new FileUploader('#profile-img', {
            name                          : 'avatar',
            labelIdle                     : `<span class="avatar-placeholder flex justify-center items-center flex-col"><span class="sicon-user"></span><span class="text">${label}</span></span>`,
            maxFileSize                   : '3MB',
            instantUpload                 : true,
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

        // enable submit button with  form change
         const inputs = document.querySelectorAll(" input, select");
         for (const el of inputs) {
             el.oldValue = el.value + el.checked;
         }
 
         // Declares function and call it directly
        var setEnabled;
        (setEnabled = function () {
             var e = true;
             for (const el of inputs) {
                 if (el.oldValue !== (el.value + el.checked)) {
                     e = false;
                     break;
                 }
             }
             document.querySelector("salla-button").disabled = e;
        })();
 
        document.oninput = setEnabled;
        document.onchange = setEnabled;
    }
}

Profile.intiateWhenReady('Profile', ['customer.profile']);
