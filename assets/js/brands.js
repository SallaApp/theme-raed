import AlpineJS from 'alpinejs';
import BasePage from './base-page';

class Brands extends BasePage {
    onReady() {
        AlpineJS.start();
    }
}

Brands.className = 'Brands';
Brands.allowedPages = ['store.brands'];
Brands.intiateWhenReady();