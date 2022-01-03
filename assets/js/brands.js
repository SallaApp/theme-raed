import AlpineJS from 'alpinejs';
import BasePage from './basePage';

class Brands extends BasePage {
    onReady() {
        AlpineJS.start();
    }
}

new Brands;