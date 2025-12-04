import axios from 'axios'

export default {
    request(method, url, data, successCb = null, errorCb = null) {
        return axios
            .request({url, data, method: method.toLowerCase(), responseType: 'json'})
            .then(successCb)
            .catch(errorCb);
    },

    get(url, successCb = null, errorCb = null, data) {
        // return this.request('get', url, data, successCb, errorCb);
        return axios
            .get(url, {params: data})
            .then(successCb)
            .catch(errorCb);
    },

    post(url, data, successCb = null, errorCb = null) {
        return this.request('post', url, data, successCb, errorCb);
    },

    put(url, data, successCb = null, errorCb = null) {
        return this.request('put', url, data, successCb, errorCb);
    },

    delete(url, data, successCb = null, errorCb = null) {
        return this.request('delete', url, data, successCb, errorCb);
    },

    requestWithSupportAjax(url, payload, method = 'post') {
        return new Promise((resolve, reject) => {
            if (!window?.isLegacyTheme) {
                return this.request(method, url, payload, ({data}) => {
                    return resolve(data);
                }, ({response}) => {
                    return reject(response);
                })
            }

            /**
             * @deprecated to support legacy themes
             */
            $.ajax({
                url: url,
                method: method.toUpperCase(),
                data: payload,
                async: false,
                success: function ({data}) {
                    return resolve(data);
                },
                error: function ({response}) {
                    return reject(response);
                }
            });
        })
    }
};
