import TelInput from 'intl-tel-input';

export default function initTelInput() {
    salla.document.event.onKeyup('.tel-input', event => salla.helpers.digitsOnly(event.target.id));
    document.querySelectorAll('.tel-input').forEach(intlInput => {
        salla.helpers.digitsOnly(intlInput.id);
        let iti = TelInput(intlInput, {
            initialCountry    : intlInput.dataset.code || 'sa',
            preferredCountries: ['sa', 'ae', 'kw', 'bh', 'qa', 'iq', 'om', 'ye', 'eg', 'jo', 'sy', 'ps', 'sd', 'lb', 'dz', 'tn', 'ma', 'ly'],
            formatOnDisplay   : false,
            separateDialCode  : true,
            autoPlaceholder   : 'aggressive',
            utilsScript       : 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js',
        });
        intlInput.addEventListener("countrychange", () => {
            let data = iti.getSelectedCountryData();
            document.querySelectorAll('.country_code').forEach(input => input.value = data.iso2.toUpperCase());
            document.querySelectorAll('.country_key').forEach(input => {
                input.value = ('+' + data.dialCode).replace('++', '+');
            });
        });
    });
}