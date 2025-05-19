import 'lite-youtube-embed';
import BasePage from './base-page';
import Fslightbox from 'fslightbox';
window.fslightbox = Fslightbox;
import { zoom } from './partials/image-zoom';

class Product extends BasePage {
  constructor() {
    super();
    // Store original slides
    this.originalMainSlides = [];
    this.originalThumbSlides = [];
  }

  onReady() {
    app.watchElements({
      totalPrice: '.total-price',
      beforePrice: '.before-price',
      startingPriceTitle: '.starting-price-title',
    });

    this.initProductOptionValidations();
    this.grouping_slider_images();

    if (imageZoom) {
      // call the function when the page is ready
      this.initImagesZooming();
      // listen to screen resizing
      window.addEventListener('resize', () => this.initImagesZooming());
    }
  }

  grouping_slider_images() {
    if (!this.sliderGroupedEventInitialized) {
      this.sliderGroupedEventInitialized = true; // Prevent multiple listeners

      let slider = document.querySelector(`.details-slider`);

      if (!slider) {
        console.error("Slider not found");
        return;
      }

      salla.event.on("product-options::change", async (event) => {
        try {
          let type = event.option.type,
            optionText = event.detail ? event.detail.name : '';

          if (type === 'thumbnail') {
            const slides = await slider.getSlides();
            const thumbsSlider = await slider.thumbsSliderInstance();
            const thumbsSlides = await slider.getThumbsSlides();

            // Store original slides if not already stored
            if (this.originalMainSlides.length === 0) {
              this.originalMainSlides = Array.from(slides);
            }
            if (this.originalThumbSlides.length === 0) {
              this.originalThumbSlides = Array.from(thumbsSlides);
            }

            if (slides.length) {
              this.filterSlides('main', slider, thumbsSlider, slides, optionText);
            }

            if (thumbsSlides.length) {
              this.filterSlides('thumbs', slider, thumbsSlider, thumbsSlides, optionText);
            }

            // Recalculate height for the main slider
            this.ensureSwiperHeight(slider);
          }
        } catch (error) {
          console.error("Error handling product options change:", error);
        }
      });
    }
  }

  // Function to filter slides by data-caption
  async filterSlides(type, slider, thumbsSlider, slides, value) {
    // Get the parent container of the slider
    const sliderContainer = document.querySelector('.details-slider .s-slider-container .s-slider-swiper-wrapper');
    const thumbsContainer = document.querySelector('.s-slider-thumbs-container .s-slider-swiper-wrapper');
    
    // Use stored original slides
    const originalSlides = type === 'main' ? this.originalMainSlides : this.originalThumbSlides;
    
    // Filter slides based on the `data-caption` attribute
    const filteredSlides = originalSlides.filter(slide => slide.getAttribute('data-caption') === value);
    
    // Remove all slides from the container
    Array.from(slides).forEach(slide => slide.remove());
    
    // Add only the filtered slides back
    filteredSlides.forEach(slide => {
      if (type === 'main') {
        sliderContainer.appendChild(slide);
      } else if (thumbsContainer) {
        thumbsContainer.appendChild(slide);
      }
    });

    // Reinitialize the slider
    if (type === 'main') {
      // Reinitialize the slider
      setTimeout(() => {
        slider.update();
      }, 100);
    } else if (thumbsContainer) {
      // Reinitialize the thumbs slider
      setTimeout(() => {
        thumbsSlider.update();
      }, 100);
    }
  }

  // Function to ensure Swiper height is recalculated
  ensureSwiperHeight(swiper) {
    requestAnimationFrame(() => {
      swiper.slideTo(0); // Reset to the current active slide
    });
  }


  initProductOptionValidations() {
    document.querySelector('.product-form')?.addEventListener('change', function () {
      this.reportValidity() && salla.product.getPrice(new FormData(this));
    });
  }

  initImagesZooming() {
    // skip if the screen is not desktop or if glass magnifier
    // is already crated for the image before
    const imageZoom = document.querySelector('.image-slider .magnify-wrapper.swiper-slide-active .img-magnifier-glass');
    if (window.innerWidth < 1024 || imageZoom) return;
    setTimeout(() => {
      // set delay after the resizing is done, start creating the glass
      // to create the glass in the proper position
      const image = document.querySelector('.image-slider .swiper-slide-active img');
      zoom(image?.id, 2);
    }, 250);


    document.querySelector('salla-slider.details-slider').addEventListener('slideChange', (e) => {
      // set delay till the active class is ready
      setTimeout(() => {
        const imageZoom = document.querySelector('.image-slider .swiper-slide-active .img-magnifier-glass');

        // if the zoom glass is already created skip
        if (window.innerWidth < 1024 || imageZoom) return;
        const image = document.querySelector('.image-slider .magnify-wrapper.swiper-slide-active img');
        zoom(image?.id, 2);
      }, 250)
    })
  }

  registerEvents() {
    salla.event.on('product::price.updated.failed', () => {
      app.element('.price-wrapper').classList.add('hidden');
      app.element('.out-of-stock').classList.remove('hidden')
      app.anime('.out-of-stock', { scale: [0.88, 1] });
    })
    salla.product.event.onPriceUpdated((res) => {

      app.element('.out-of-stock').classList.add('hidden')
      app.element('.price-wrapper').classList.remove('hidden')

      let data = res.data,
        is_on_sale = data.has_sale_price && data.regular_price > data.price;

      app.startingPriceTitle?.classList.add('hidden');

      app.totalPrice.forEach((el) => { el.innerHTML = salla.money(data.price) });
      app.beforePrice.forEach((el) => { el.innerHTML = salla.money(data.regular_price) });

      app.toggleClassIf('.price_is_on_sale', 'showed', 'hidden', () => is_on_sale)
      app.toggleClassIf('.starting-or-normal-price', 'hidden', 'showed', () => is_on_sale)

      app.anime('.total-price', { scale: [0.88, 1] });
    });

    app.onClick('#btn-show-more', e => app.all('#more-content', div => {
      e.target.classList.add('is-expanded');
      div.style = `max-height:${div.scrollHeight}px`;
    }) || e.target.remove());
  }
}

Product.initiateWhenReady(['product.single']);
