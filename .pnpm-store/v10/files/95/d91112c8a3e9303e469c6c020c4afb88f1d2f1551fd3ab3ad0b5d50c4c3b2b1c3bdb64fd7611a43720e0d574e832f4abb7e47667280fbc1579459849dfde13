import '@salla.sa/twilight'
import LazyLoad from "vanilla-lazyload";

export default function () {
  // Only initialize it one time for the entire application
  if (!document.lazyLoadInstance) {
    document.lazyLoadInstance = new LazyLoad({
      use_native: true,//native not support lazyLoad backgrounds
      // restore_on_error: true,
      // Your custom settings go here
      // callback_finish: () => document.lazyLoadBackgrounds.update(document.querySelectorAll('.lazy[data-bg]:not(.loaded)'))
    });
    document.lazyLoadBackgrounds = new LazyLoad({
        elements_selector: '.lazy[data-bg]:not(.loaded)',
    });
    //native way doesn't load backgrounds
    // document.lazyLoadBackgrounds = new LazyLoad();
  }
  //make sure that lazyLoad will be fired after loading the page too.
  if (document.readyState !== 'complete') {
    document.addEventListener("DOMContentLoaded", () => document.lazyLoadInstance.update());
    document.addEventListener("DOMContentLoaded", () => document.lazyLoadBackgrounds.update());
  }

  // fire it after each load more request;
  // @ts-ignore
  salla.infiniteScroll.event.onAppend(() => {
            document.lazyLoadInstance.update();
            document.lazyLoadBackgrounds.update();
        }
    );
}
