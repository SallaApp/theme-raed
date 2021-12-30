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
        classes1 = Array.isArray(classes1) ? classes1 : classes1.split(' ');
        classes2 = Array.isArray(classes2) ? classes2 : classes2.split(' ');
        document.querySelectorAll(selector).forEach(element => {
            let isClasses1 = callback(element);
            element.classList.remove(...(isClasses1 ? classes2 : classes1));
            element.classList.add(...(isClasses1 ? classes1 : classes2));
        });
    }
}