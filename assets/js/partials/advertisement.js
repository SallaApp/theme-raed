export default function () {
  let ad = document.getElementById("s-theme_ad");

  if(typeof(ad) != 'undefined' && ad != null){
    const adId = ad.getAttribute('data-id'),
          closeBtn = ad.querySelector('.ad-close'),
          dismissed = localStorage.getItem('statusAdId-'+adId);

    if(!dismissed) {
      ad.classList.remove('hidden');
    }

    closeBtn.addEventListener('click', function (event) {
      event.preventDefault();
      localStorage.setItem( 'statusAdId-' + adId , 'dismissed');

      const adAnime = anime.timeline();
      adAnime.add({
        targets: '#s-theme_ad h2, #s-theme_ad a',
        opacity: [1,0],
        translateY: [0, -20],
        delay: anime.stagger(100),
      })
      .add({
        targets: '#s-theme_ad',
        opacity: [1,0],
        duration: 300,
        height: [ad.clientHeight, 0],
        easing: 'easeInOutQuad',
      }, '-=700');
    });
  }
}
