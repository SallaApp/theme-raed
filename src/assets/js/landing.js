import "lite-youtube-embed";
import BasePage from "./base-page";
import Lightbox from "fslightbox";
window.fslightbox = Lightbox;

class Landing extends BasePage {
    onReady() {
        let buyAllBtn = app.element(".buy-all-btn")
        buyAllBtn.addEventListener('click', () => {
            buyAllBtn.load()
            .then(() => buyAllBtn.disable())
            .then(() => salla.landing.createCartFromPage(buyAllBtn.dataset.landingId))
            .finally(()=> setTimeout(() => { buyAllBtn.stop() && buyAllBtn.enable() }, 1000))
        })
    }
    
}

Landing.initiateWhenReady(['landing-page']);