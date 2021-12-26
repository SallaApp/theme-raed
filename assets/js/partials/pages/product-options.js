let initateOptions = true;
document.addEventListener('DOMContentLoaded', () => {
    salla.document.event.onChange('.visibility_condition', event => visibilityConditionCheck(event.target));
//lets call event to show correct fields in cart page
    document.querySelectorAll('.visibility_condition').forEach(input => visibilityConditionCheck(input));
    initateOptions = false;
});
window.verifyDataBeforeSend = function (formData, element, event) {
    if (!element) {
        return;
    }
    let shouldPass = true;

    element.querySelectorAll('[required]:not(:disabled)').forEach(input => {
        //get the value for option, if it's empty return
        let inputValue = getDataUsingKeyPath(formData, input.name);
        //we may accept 0, '0'
        if (toggleError(input, inputValue === undefined || inputValue === '' || inputValue === null)) {
            return shouldPass = false;
        }
    });
    return shouldPass ? formData : false;
}

function toggleError(element, isHideError = true) {
    let classes = ['border', 'border-red-400'];
    //is checkbox or radio, toggle error to their labels
    if (element.checked !== undefined) {
        element = document.querySelector(`[for="${element.name}"]`);
        classes = ['text-red-400'];
    }
    isHideError ? element.classList.add(...classes) : element.classList.remove(...classes);
    //TODO:: add show error message.
    return isHideError;
}

function getDataUsingKeyPath(objectData, keyPath) {
    if (!objectData) {
        return objectData;
    }

    return objectData instanceof FormData
        ? objectData.get(keyPath)
        : keyPath.replace(']', '')
            .replace('[', '.')
            .split('.')
            .reduce((data, key) => data[key], objectData);
}

function visibilityConditionCheck(input) {
    let isMultiple = input.type == 'checkbox';
    let option = input.dataset.option;
    document.querySelectorAll('[data-visibility-option="' + option + '"]')
        .forEach((field) => {
            let isEqual = field.dataset.visibilityOperator == '=';
            let value = field.dataset.visibilityValue;
            let condSelector = '#field_' + field.dataset.keyPrefix + '_' + option + (isMultiple ? '_' + value : '');
            let condition = document.querySelector(condSelector);
            let isSelected = isMultiple ? condition.checked : value == condition.value;

            return toggleElement(field, (isEqual && isSelected) || (!isEqual && !isSelected));
        });
}


/**
 * @param {Element} field
 * @param {boolean} showIt
 */
function toggleElement(field, showIt) {
    if (showIt) {
        field.classList.remove("hidden");
        field.querySelectorAll('[name]').forEach((input) => {
            input.removeAttribute('disabled');
            //To handle focus on hidden input error
            if (!['checkbox'].includes(input.getAttribute('type')) &&
                field.getElementsByClassName('required').length) {
                input.setAttribute('required', '');
            }
        });
        return;
    }
    field.classList.add("hidden");
    field.querySelectorAll('[name]').forEach((input) => {
        input.setAttribute('disabled', '');
        input.removeAttribute('required');

        if (['checkbox'].includes(input.getAttribute('type'))) {
            input.checked = false;
        }

        if (!initateOptions) {
            salla.document.event.fireEvent(input, 'change', {'bubbles': true});
        }
    });
}