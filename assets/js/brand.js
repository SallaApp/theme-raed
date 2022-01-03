import AlpineJS from 'alpinejs';
import BasePage from './basePage';

class Brand extends BasePage {
    onReady() {
        AlpineJS.start();
    }
}

new Brand;