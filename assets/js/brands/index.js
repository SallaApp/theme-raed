import AlpineJS from 'alpinejs';
import BasePage from '../basePage';

class Index extends BasePage {
    onReady() {
        AlpineJS.start();
    }
}

new Index;