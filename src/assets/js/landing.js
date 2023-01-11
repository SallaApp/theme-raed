import "lite-youtube-embed";
import BasePage from "./base-page";
import Lightbox from "fslightbox";
window.fslightbox = Lightbox;

class Landing extends BasePage {
    onReady() {
    }
}

Landing.initiateWhenReady(['landing-page']);