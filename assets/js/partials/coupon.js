export default function () {
    initiateCoupon();
    salla.coupon.event.onAdded(res => couponApplied(res));
    salla.coupon.event.onRemoved(res => couponRemoved(res));

    salla.coupon.event.onAddedFailed(err => showCouponError(err.response.data.error.message));
    salla.coupon.event.onRemovedFailed(err => showCouponError(err.response.data.error.message, false));
}

function initiateCoupon() {
    app.watchElements({couponCode: '#coupon', couponBtn: '#btn-add-coupon', couponError: '#coupon-error'});
    app.onKeyUp(app.couponCode, event => {
        event.keyCode === 13 && app.couponBtn.click();
        app.couponError.value = '';
        app.removeClass(app.couponCode, 'has-error');
    });
    app.onClick(app.couponBtn, event => {
        event.preventDefault();
        //if it's remove coupon, will have `btn-danger` class
        if (app.couponBtn.classList.contains('btn-danger')) {
            return salla.api.coupon.remove(app.pageData('id'));
        }

        if (!app.couponCode.value.length) {
            showCouponError('* ' + salla.lang.get('pages.checkout.enter_coupon'));
            return;
        }

        salla.api.coupon.add({id: app.pageData('id'), coupon: app.couponCode.value});
    });
}

function couponApplied(res) {
    app.couponCode.setAttribute('disabled', true);
    app.toggleElement(app.couponBtn, 'btn-default', 'btn-danger', () => false)
        .hideElement(app.couponBtn.querySelector('span'))
        .showElement(app.couponBtn.querySelector('i'))
        .removeClass(app.couponCode, 'has-error');
    app.couponError.innerText = '';
    app.updateCartSummary();
}

function couponRemoved(res) {
    app.couponCode.removeAttribute('disabled');
    app.couponCode.value = '';
    app.toggleElement(app.couponBtn, 'btn-default', 'btn-danger', () => true)
        .hideElement(app.couponBtn.querySelector('i'))
        .showElement(app.couponBtn.querySelector('span'))
        .removeClass(app.couponCode, 'has-error');
    app.couponError.innerText = '';
    app.updateCartSummary();
}

function showCouponError(message, isApplying = true) {
    app.couponError.innerText = message || salla.lang.get('pages.checkout.error_occurred');
    isApplying ? app.addClass(app.couponCode, 'has-error') : null;
}