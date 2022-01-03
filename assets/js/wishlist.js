import BasePage from './basePage';

class Wishlist extends BasePage {
    registerEvents() {
        salla.document.event.onClick('.btn-remove', this.removingAnimation);
        salla.wishlist.event.onRemoved((response, prodId) => this.removeItem(response, prodId));
    }

    removingAnimation({target}) {
        target.querySelector('.sicon-cancel').style.display = 'none';
        target.querySelector('.spinner-loader').removeAttribute('style');
    }

    removeItem(response, prodId) {
        let item = document.querySelector('#product_' + prodId);
        this.anime(item, false)
            .height(0)// -> from 'height' to '0',
            .paddingBottom(0)
            .paddingTop(0)
            .easing('easeInOutQuad')
            .duration(300)
            .complete(() => item.remove() || (document.querySelector('#wishlist>*') || window.location.reload()))
            .play();
    }
}

new Wishlist;