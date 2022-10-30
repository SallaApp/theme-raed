import "lite-youtube-embed";
import BasePage from "./base-page";
import Slider from "./partials/slider"
import Lightbox from "fslightbox";

window.fslightbox = Lightbox;

class Home extends BasePage {
    onReady() {
        this.initiateSliders();
        this.initFeaturedTabs();
        this.initCountdown();
    }

    initiateSliders() {
        // Used in: [products_slider.twig, featured_products_style2.twig, slider_products_with_header.twig]
        new Slider(".product-slider", {draggable: true});

        //Used in: [photos_slider.twig]
        new Slider(".photos-slider", {
            loop          : true,
            lazy          : true,
            autoplay      : true,
            centeredSlides: true
        });

        /*
          used in:
            1- similar-products.twig
            2- best offer home block (called again in home.js)
            3- product offer products slider/ cats slider / discount slider
        */
        new Slider('.default-slider');

        /* Testimonials Slider */
        let testimonials = new Slider('.testimonials-slider', {
            draggable     : true,
            centeredSlides: true,
            slidesPerView : 1,
            breakpoints   : {1024: {slidesPerView: 2}}
        });
        //begin from slide 2 to always dispaly prev & next
        if(window.innerWidth > 1024)  testimonials.slideTo(1, false,false);  


        //Used in: [enhanced-slider.twig]
        (new Slider('.main-slider', {
          speed: 750,
          parallax: true,
          loop:     true,
          lazy:     true,
          autoplay: {
            delay: 5000,
          },
        }));
    }

    /**
     * used in views/components/home/featured-products-style*.twig
     */
    initFeaturedTabs() {
        app.all('.tab-trigger', el => {
          el.addEventListener('click', ({currentTarget: btn})=>{
            let id = btn.dataset.componentId;
            // btn.setAttribute('fill', 'solid');
            app.toggleClassIf(`#${id} .tabs-wrapper>div`, 'is-active opacity-0 translate-y-3', 'inactive', tab => tab.id == btn.dataset.target)
                .toggleClassIf(`#${id} .tab-trigger`, 'is-active', 'inactive', tabBtn => tabBtn == btn);

            // fadeIn active tabe
            setTimeout(() => app.toggleClassIf(`#${id} .tabs-wrapper>div`, 'opacity-100 translate-y-0', 'opacity-0 translate-y-3', tab => tab.id == btn.dataset.target), 100);
          })
        });
        document.querySelectorAll('.s-block-tabs').forEach(block => block.classList.add('tabs-initialized'));
    }

    initCountdown = () => {
      let countdownElments = document.querySelectorAll('.countdown-timer');
      if (!countdownElments.length) {
          return;
      }
  
      countdownElments.forEach(countdownElem => {
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
              <li>${sec}<span>${secWord}</span></li> 
              <li>${min}<span>${minWord}</span></li>
              <li>${hrs}<span>${hourWord}</span></li>
              <li>${dys}<span>${dayWord}</span></li>`;
  
              if (distance < 0) {
                  clearInterval(x);
                  let offer_finished = salla.lang.get('pages.offer.offer_finished');
                  countdownElm.innerHTML = `<h2 class="title title--small wide center">${offer_finished}</h2>`;
              }
          }, 1000);
      })
  };
}

Home.initiateWhenReady(['index']);
