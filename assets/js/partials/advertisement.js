export default function () {
    let ad = document.getElementById("s-theme_ad");

    if (!ad) {
        return;
    }
    const adId = ad.getAttribute('data-id'),
        closeBtn = ad.querySelector('.ad-close'),
        dismissed = localStorage.getItem('statusAd-' + adId);

    if (!dismissed) {
        ad.classList.remove('hidden');
    }

    closeBtn.addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.setItem('statusAd-' + adId, 'dismissed');

        anime({
            targets : '#s-theme_ad',
            opacity : [1, 0],
            duration: 300,
            height  : [ad.clientHeight, 0],
            easing  : 'easeInOutQuad',
        });
    });
}
