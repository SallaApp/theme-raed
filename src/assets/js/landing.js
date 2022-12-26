import "lite-youtube-embed";
import initCountdown from "./partials/count-down";
import BasePage from "./base-page";
import Lightbox from "fslightbox";
window.fslightbox = Lightbox;

class Landing extends BasePage {
    onReady() {
        initCountdown();
    }
}

Landing.initiateWhenReady(['landing-page']);