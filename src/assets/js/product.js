import 'lite-youtube-embed';
import BasePage from './base-page';
import Fslightbox from 'fslightbox';
window.fslightbox = Fslightbox;
import { zoom } from './partials/image-zoom';

class Product extends BasePage {
    onReady() {
        app.watchElements({
            totalPrice: '.total-price',
            productWeight: '.product-weight',
            beforePrice: '.before-price',
            startingPriceTitle: '.starting-price-title',
        });

        this.initProductOptionValidations();

        if(imageZoom){
            // call the function when the page is ready
            this.initImagesZooming();
            // listen to screen resizing
            window.addEventListener('resize', () => this.initImagesZooming());
        }

        // Set alt for existing images immediately
        this.setDescriptionImagesAlt();
        this.observeDescriptionImages();
        
        // Use setInterval to check for description block and images
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds (50 * 100ms)
        const intervalId = setInterval(() => {
            attempts++;
            
            const description = document.querySelector('.product__description');
            
            // Stop if description block doesn't exist after 5 seconds
            if (!description && attempts >= maxAttempts) {
                clearInterval(intervalId);
                return;
            }
            
            // If description exists, check and update images
            if (description) {
                this.setDescriptionImagesAlt();
                
                // Stop if we've been running for 5 seconds (safety timeout)
                if (attempts >= maxAttempts) {
                    clearInterval(intervalId);
                }
            }
        }, 100); // Check every 100ms
    }

    setDescriptionImagesAlt() {
      const description = document.querySelector('.product__description');
      if (!description) return;

      const fallbackAlt =
        description.dataset.productName || document.title || 'Product image';

      // Find all images in description, including nested ones in article.article--main
      const images = description.querySelectorAll('img');
      images.forEach((img) => {
        // Check if alt is missing or empty (including whitespace-only)
        const currentAlt = img.getAttribute('alt');
        if (!currentAlt || currentAlt.trim() === '') {
          img.setAttribute('alt', fallbackAlt);
          // Force attribute update
          img.alt = fallbackAlt;
        }
      });
    }

    observeDescriptionImages() {
      const description = document.querySelector('.product__description');
      if (!description) return;

      const fallbackAlt =
        description.dataset.productName || document.title || 'Product image';

      // Helper function to set alt if missing
      const setAltIfMissing = (img) => {
        if (!img.getAttribute('alt')?.trim()) {
          img.setAttribute('alt', fallbackAlt);
        }
      };

      // Watch for new images added to the description
      const observer = new MutationObserver(() => {
        description.querySelectorAll('img').forEach(setAltIfMissing);
      });

      observer.observe(description, {
        childList: true,
        subtree: true
      });
    }

    initProductOptionValidations() {
      document.querySelector('.product-form')?.addEventListener('change', function(){
        this.reportValidity() && salla.product.getPrice(new FormData(this));
      });
    }

    initImagesZooming() {
      // skip if the screen is not desktop or if glass magnifier
      // is already crated for the image before
      const imageZoom = document.querySelector('.image-slider .magnify-wrapper.swiper-slide-active .img-magnifier-glass');
      if (window.innerWidth  < 1024 || imageZoom) return;
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
              if (window.innerWidth  < 1024 || imageZoom) return;
              const image = document.querySelector('.image-slider .magnify-wrapper.swiper-slide-active img');
              zoom(image?.id, 2);
          }, 250)
      })
    }

    registerEvents() {
      salla.event.on('product::price.updated.failed',()=>{
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

        app.productWeight.forEach((el) => {el.innerHTML = data.weight || ''});
        app.totalPrice.forEach((el) => {el.innerHTML = salla.money(data.price)});
        app.beforePrice.forEach((el) => {el.innerHTML = salla.money(data.regular_price)});

        app.toggleClassIf('.price_is_on_sale','showed','hidden', ()=> is_on_sale)
        app.toggleClassIf('.starting-or-normal-price','hidden','showed', ()=> is_on_sale)

        app.anime('.total-price, .product-weight', { scale: [0.88, 1] });
      });

      app.onClick('#btn-show-more', e => app.all('#more-content', div => {
        e.target.classList.add('is-expanded');
        div.style = `max-height:${div.scrollHeight}px`;
      }) || e.target.remove());
    }
}

Product.initiateWhenReady(['product.single']);
