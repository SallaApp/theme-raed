let initateOptions = true;
export default function () {
    salla.document.event.onChange('.visibility_condition', ({target}) => visibilityConditionCheck(target));
    //lets call event to show correct fields in cart page
    document.querySelectorAll('.visibility_condition').forEach(input => visibilityConditionCheck(input));
    initateOptions = false;
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


function toggleError(element, isHideError = true) {
    let classes = ['border', 'border-red-400'];
    let isRadioOrCheckbox = element.checked !== undefined && element.dataset.isAdvanced;
    let selector = '';
    //is checkbox or radio, toggle error to their labels
    if (!isRadioOrCheckbox) {
        isHideError ? element.classList.add(...classes) : element.classList.remove(...classes);
    }

    document.querySelectorAll(`[for="${element.name}"]`)
        .forEach(label => label.classList[isHideError ? 'add' : 'remove']('text-red-400'));
    //TODO:: add show error message.
    return isHideError;
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

//register verifyDataBeforeSend function
window.verifyDataBeforeSend = function (formData, element, event) {
    if (!element) {
        return;
    }
    let shouldPass = true;

    element.querySelectorAll('[required]:not(:disabled)').forEach(input => {
        //get the value for option, if it's empty return
        let inputValue = formData
            ? (formData instanceof FormData
                ? formData.get(input.name)
                : input.name.replace(']', '').replace('[', '.').split('.').reduce((data, key) => data[key], formData))
            : formData;
        //we may accept 0, '0'
        if (toggleError(input, inputValue === undefined || inputValue === '' || inputValue === null)) {
            return shouldPass = false;
        }
    });
    return shouldPass ? formData : false;
}