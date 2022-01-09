import BasePage from './base-page';

class Wishlist extends BasePage {
    registerEvents() {
        app.onClick('.btn-remove', ({target}) => {
            target.querySelector('.sicon-cancel').style.display = 'none';
            target.querySelector('.spinner-loader').removeAttribute('style');
        });

        salla.wishlist.event.onRemoved((response, prodId) => {
            let item = document.querySelector('#product_' + prodId);
            app.anime(item, false)
                .height(0)// -> from 'height' to '0',
                .paddingBottom(0)
                .paddingTop(0)
                .easing('easeInOutQuad')
                .duration(300)
                .complete(() => item.remove() || (document.querySelector('#wishlist>*') || window.location.reload()))
                .play();
        });
    }
}

new Wishlist;