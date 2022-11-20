import Flatpickr from 'flatpickr';
import BasePage from './base-page';

class Profile extends BasePage {
  onReady() {
    Flatpickr('.date-element', {"dateFormat": "Y-m-d"});
    let label = salla.config.get('theme.is_rtl') ? 'اختر صورة مناسبة' : 'Choose your image';

    new FileUploader('#profile-img', {
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

    app.all('salla-file-upload', function (uploader) {
      uploader.nextElementSibling?.type === 'hidden'
      && uploader.addEventListener('uploaded', event => uploader.nextElementSibling.value = event.detail);
    });
  }
}

Profile.initiateWhenReady(['customer.profile']);
