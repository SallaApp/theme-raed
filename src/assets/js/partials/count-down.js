export default function countDown() {
  app.all('.countdown-timer', countdownElem => {
    let countDownDate = countdownElem.dataset.dunixtime;
    countDownDate = new Date(countDownDate.replace(/\s/, 'T'));
    countDownDate.setHours(23, 59, 59, 999); // end of day
    const x = setInterval(function () {
      let now = new Date().getTime(),
        distance = countDownDate - now,
        days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000),
        dys = days < 10 ? '0' + days : days,
        hrs = hours < 10 ? '0' + hours : hours,
        min = minutes < 10 ? '0' + minutes : minutes,
        sec = seconds < 10 ? '0' + seconds : seconds,
        secWord = salla.lang.get('pages.checkout.second'),
        minWord = salla.lang.get('pages.checkout.minute'),
        hourWord = salla.lang.get('pages.checkout.hour'),
        dayWord = salla.lang.get('pages.checkout.day');

      countdownElem.innerHTML = `
              <li>${salla.helpers.number(sec)}<span>${salla.helpers.number(secWord)}</span></li>
              <li>${salla.helpers.number(min)}<span>${salla.helpers.number(minWord)}</span></li>
              <li>${salla.helpers.number(hrs)}<span>${salla.helpers.number(hourWord)}</span></li>
              <li>${salla.helpers.number(dys)}<span>${salla.helpers.number(dayWord)}</span></li>`;

      if (distance < 0) {
        clearInterval(x);
        let offer_finished = salla.lang.get('pages.offer.offer_finished');
        countdownElem.innerHTML = `<h2 class="title title--small wide center">${offer_finished}</h2>`;
      }
    }, 1000);
  })
};

