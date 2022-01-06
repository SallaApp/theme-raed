export default function () {
    initiateCoupon();
    salla.coupon.event.onAdded(res => couponApplied(res));
    salla.coupon.event.onRemoved(res => couponRemoved(res));

    salla.coupon.event.onAddedFailed(err => showCouponError(err.response.data.error.message));
    salla.coupon.event.onRemovedFailed(err => showCouponError(err.response.data.error.message, false));
}

function initiateCoupon() {
    pageClass.watchElements({couponCode: '#coupon', couponBtn: '#btn-add-coupon', couponError: '#coupon-error'});
    pageClass.onKeyUp(pageClass.couponCode, event => {
        event.keyCode === 13 && pageClass.couponBtn.click();
        pageClass.couponError.value = '';
        pageClass.removeClass(pageClass.couponCode, 'has-error');
    });
    pageClass.onClick(pageClass.couponBtn, event => {
        event.preventDefault();
        //if it's remove coupon, will have `btn-danger` class
        if (pageClass.couponBtn.classList.contains('btn-danger')) {
            return salla.api.coupon.remove(pageClass.pageData('id'));
        }

        if (!pageClass.couponCode.value.length) {
            showCouponError('* ' + salla.lang.get('pages.checkout.enter_coupon'));
            return;
        }

        salla.api.coupon.add({id: pageClass.pageData('id'), coupon: pageClass.couponCode.value});
    });
}

function couponApplied(res) {
    pageClass.couponCode.setAttribute('disabled', true);
    pageClass.toggleElement(pageClass.couponBtn, 'btn-default', 'btn-danger', () => false)
        .hideElement(pageClass.couponBtn.querySelector('span'))
        .showElement(pageClass.couponBtn.querySelector('i'))
        .removeClass(pageClass.couponCode, 'has-error');
    pageClass.couponError.innerText = '';
    pageClass.updateCartSummary();
}

function couponRemoved(res) {
    pageClass.couponCode.removeAttribute('disabled');
    pageClass.couponCode.value = '';
    pageClass.toggleElement(pageClass.couponBtn, 'btn-default', 'btn-danger', () => true)
        .hideElement(pageClass.couponBtn.querySelector('i'))
        .showElement(pageClass.couponBtn.querySelector('span'))
        .removeClass(pageClass.couponCode, 'has-error');
    pageClass.couponError.innerText = '';
    pageClass.updateCartSummary();
}

function showCouponError(message, isApplying = true) {
    pageClass.couponError.innerText = message || salla.lang.get('pages.checkout.error_occurred');
    isApplying ? pageClass.addClass(pageClass.couponCode, 'has-error') : null;
}