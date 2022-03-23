import Flatpickr from 'flatpickr';
import BasePage from './base-page';

class Profile extends BasePage {
    onReady() {
        Flatpickr('.date-element', {"dateFormat": "Y-m-d"});

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
    }
}

Profile.intiateWhenReady('Profile',['customer.profile']);
