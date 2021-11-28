
import * as FilePond from 'filepond';

window.FilePondPluginImagePreview = require('filepond-plugin-image-preview');
window.FilePondPluginImageExifOrientation = require('filepond-plugin-image-exif-orientation');
window.FilePondPluginFileValidateType = require('filepond-plugin-file-validate-type');
window.FilePondPluginFilePoster = require('filepond-plugin-file-poster');
// window.FilePondPluginFileEncode = require('filepond-plugin-file-encode');
window.FilePond = FilePond;
let isRTL = document.querySelector('html').getAttribute('dir') === 'rtl',
    uploadLabel = isRTL
        ? `اسحب او افلت الصورة هنا <span class="filepond--label-action"> او تصفح من جهازك </span>`
        : `Drag and drop the image here <span class="filepond--label-action"> or browse your device </span>`;

FilePond.registerPlugin(
    // encodes the file as base64 data
    //FilePondPluginFileEncode,

    // validates the size of the file
    FilePondPluginFileValidateType,

    // corrects mobile image orientation
    FilePondPluginImageExifOrientation,

    // previews dropped images
    FilePondPluginImagePreview,

    FilePondPluginFilePoster
);

// Select the file input and use create() to turn it into a pond
document.querySelectorAll('.filepond')
    .forEach((fileInput) => {
        if(fileInput.disabled){
            fileInput.removeAttribute('disabled');
            if(fileInput.hasAttribute('required')){
                fileInput.removeAttribute('required');
            }
        }
        let defaultFiles = [];
        //in case there is need to one file, without needing to delete endpoint, pass default image via: data-default
        if (fileInput.dataset.default) {
            let fileIndex = 1;
            fileInput.dataset
                .default
                .split(',')
                .forEach(file => {
                    let metadata = {
                        poster: file,
                        id    : file,
                    };
                    defaultFiles.push({
                        source : metadata.id,
                        options: {
                            type    : 'local',
                            file    : {
                                name: metadata.id,
                                size: 3000000,
                            },
                            metadata: metadata,
                        },
                    });
                });
            //in case there is need for deleteing file, we must pass files metadata: [{id:?,url:?,name:?},...]
        } else if (fileInput.dataset.files) {
            try {
                JSON.parse(fileInput.dataset.files)
                    .forEach(file => {
                        let metadata = file;
                        metadata['poster'] = file.url;
                        defaultFiles.push({
                            source : metadata.id,
                            options: {
                                type    : 'local',
                                file    : {
                                    name: metadata.name || metadata.id,
                                    size: 3000000,
                                },
                                metadata: metadata,
                            },
                        });
                    });
            } catch (e) {
                salla.log('failed To get files from: ' + fileInput.dataset.files);
            }
        }

        let options = {
            labelIdle       : uploadLabel,
            instantUpload   : fileInput.dataset.hasOwnProperty('instantUpload'),
            files           : defaultFiles,
            beforeRemoveFile: function (file) {
                let fileId = file.getMetadata('id');
                if (fileId) {
                    return salla.cart.api.deleteFile(fileId);
                }
                salla.log('Failed To Get File Id!!', file.getMetadata());
            },
        };
        if (fileInput.dataset.url) {
            options['server'] = {
                url    : fileInput.dataset.url,
                process: {
                    ondata : function ondata(formData) {
                        formData.append('_token', salla.config.token);
                        if (fileInput.dataset.itemId) {
                            formData.append('cart_item_id', fileInput.dataset.itemId);
                        }
                        if (fileInput.dataset.productId) {
                            formData.append('product_id', fileInput.dataset.productId);
                        }
                        return formData;
                    },
                    onload : (response) => {
                        return JSON.parse(response).data.filePath;
                    },
                    onerror: function (response) {
                        var error_message = salla.lang.get('common.errors.error_occurred');
                        response = JSON.parse(response);
                        if (response.error.fields.image_file[0]) {
                            error_message = response.error.fields.image_file[0];
                        }
                        return error_message;
                    },
                }
            };
        }
        let filePond = FilePond.create(fileInput,
            fileInput.matches('.profile-img')
                ? {
                    labelIdle                     : isRTL ? 'اختر صورة مناسبة للعرض' : 'Choose a proper image',
                    instantUpload                 : false,
                    files                         : defaultFiles,
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
                }
                : options
        );
        if (fileInput.id) {
            window.fileponds = window.fileponds || {};
            window.fileponds[fileInput.id] = filePond;
        }
    });
