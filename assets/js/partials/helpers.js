import Anime from "./anime";

export default class Helpers {
    copyToClipboard(elementId) {
        let copyIcon = document.querySelector('.copy-icon');
        var aux = document.createElement("input");
        aux.setAttribute("value", document.getElementById(elementId).innerHTML);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        let icon1 = 'sicon-swap-stroke', icon2 = 'sicon-check';
        copyIcon.classList.remove(icon1);
        copyIcon.classList.add(icon2);

        setTimeout(() => copyIcon.classList.add(icon1) || copyIcon.classList.remove(icon2), 1000);
    }

    /**
     * @param {string} selector
     * @param {array<string>} classes1
     * @param {array<string>} classes2
     * @param callback
     */
    toggle(selector, classes1, classes2, callback) {
        document.querySelectorAll(selector).forEach(element => this.toggleElement(element, classes1, classes2, callback));
        return this;
    }

    toggleElement(element, classes1, classes2, callback) {
        classes1 = Array.isArray(classes1) ? classes1 : classes1.split(' ');
        classes2 = Array.isArray(classes2) ? classes2 : classes2.split(' ');
        let isClasses1 = callback(element);
        element.classList.remove(...(isClasses1 ? classes2 : classes1));
        element.classList.add(...(isClasses1 ? classes1 : classes2));
        return this;
    }

    /**
     * Workaround for seeking to simplify & clean, There are three ways to use this method:
     * 1- direct call: `this.anime('.my-selector')` - will use default values
     * 2- direct call with overriding defaults: `this.anime('.my-selector', {duration:3000})`
     * 3- return object to play it leter: `this.anime('.my-selector', false).duration(3000).play()` - will not play animation unless calling play method.
     * @param {string} selector
     * @param {object|undefined|null|null} options - in case there is need to set attributes one by one set it `false`;
     * @return {Anime|*}
     */
    anime(selector, options = null) {
        let anime = new Anime(selector, options);
        return options === false ? anime : anime.play();
    }

    /**
     * @param {string} email
     * @return {boolean}
     */
    isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}