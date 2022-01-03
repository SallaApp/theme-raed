import BasePage from './basePage';
import Comments from './partials/comments';

class Page extends BasePage {
    onReady() {
        Comments();
    }
}

new Page;