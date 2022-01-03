import * as FilePond from 'filepond';

FilePond.registerPlugin(
    require('filepond-plugin-image-preview'),
    require('filepond-plugin-image-exif-orientation'),
    require('filepond-plugin-file-validate-type'),
    require('filepond-plugin-file-poster')
);

/**
 * 💡 There are two senarios for old files:
 * 1- without delete endpoint, pass default images via: `data-default="fileUrl1,fileUrl2"`
 * 2- with delete endpoint, pass files metadata via: `data-files="[{id:*,url:*,name:*},...]"`
 *
 * 💡 You can set `data-instant-upload` for instant upload
 * @param {HTMLInputElement|string} input
 * @param options
 * @return {FilePond}
 */
export default function (input = '.filepond', options = {}) {
    if (typeof input == 'object') {
        return initFilepond(input, options);
    }
    if (input.startsWith('#')) {
        return initFilepond(document.querySelector(input), options);
    }
    //return latest filepond instance
    let filepond;
    document.querySelectorAll(input).forEach(input => filePond = initFilepond(input, options));
    return filePond;
}

/**
 * @param {HTMLInputElement} input
 * @return {FilePond}
 */
function initFilepond(input, options) {
    //todo:: expline why this
    if (input.disabled) {
        input.removeAttribute('disabled');
        if (input.hasAttribute('required')) {
            input.removeAttribute('required');
        }
    }

    let filePond = FilePond.create(input, Object.assign({
        allowBrowse     : true,
        allowDrop       : true,
        labelIdle       : getLabel(),
        instantUpload   : input.dataset.hasOwnProperty('instantUpload'),
        files           : getFilesFromInput(input),
        beforeRemoveFile: deleteFile,
        server          : getServerProperty(input)
    }, options));

    //incase there is need to get filepond instance from any place;
    if (input.id) {
        window.fileponds = window.fileponds || {};
        window.fileponds[input.id] = filePond;
    }
    return filePond;
}

/**
 * @param {HTMLInputElement} input
 */
function getFilesFromInput(input) {
    if (!input.dataset.files && !input.dataset.default) {
        return [];
    }
    try {
        /**
         * @type {[{id:number, url:string, name:string}]}
         */
        let files = input.dataset.default ? input.dataset.default.split(',') : JSON.parse(input.dataset.files);
        return files.map(file => {
            let metadata = typeof file == 'string'
                ? {poster: file, name: file}
                : {poster: file.url, id: file.id, name: file.name};

            return {
                source : metadata.id,
                options: {
                    type: 'local',
                    //todo:: remove default size
                    file    : {name: metadata.name || metadata.id, size: 3000000},
                    metadata: metadata,
                },
            };
        });
    } catch (e) {
        salla.log('failed To get files from: ' + (input.dataset.files || input.dataset.default));
    }
    return [];
}

function deleteFile(file) {
    let fileId = file.getMetadata('id');
    if (fileId) {
        return salla.cart.api.deleteFile(fileId);
    }
    salla.log('Failed To Get File Id!!', file.getMetadata());
}

function getLabel() {
    return document.querySelector('html').getAttribute('dir') === 'rtl'
        ? `<i class="sicon-camera block !text-2xl opacity-75"></i> <span class="block">اسحب او افلت الصورة هنا</span><span class="filepond--label-action"> او تصفح من جهازك </span>`
        : `<i class="sicon-camera block !text-2xl opacity-75"></i><span class="block">Drag and drop the image here </span><span class="filepond--label-action"> or browse your device </span>`;
}

/**
 *
 * @param {HTMLInputElement} input
 * @return {{process: {onerror: (function(*=)), onload: (function(*=): *), ondata: (function(*): *)}, url}|null}
 */
function getServerProperty(input) {
    return input.dataset.url ? {
        url    : input.dataset.url,
        process: {
            onload : response => JSON.parse(response).data.filePath,
            onerror: response => JSON.parse(response).error.fields.image_file[0] || salla.lang.get('common.errors.error_occurred'),
            ondata : function (formData) {
                formData.append('_token', salla.config.token);
                if (input.dataset.itemId) {
                    formData.append('cart_item_id', input.dataset.itemId);
                }
                if (input.dataset.productId) {
                    formData.append('product_id', input.dataset.productId);
                }
                return formData;
            },
        }
    } : null;
}