import BasePage from './base-page';

class Wishlist extends BasePage {
    registerEvents() {
        // just a animation when the item removed
        salla.wishlist.event.onRemoved((response, prodId) => {            
            let item = document.querySelector('#wishlist-product-' + prodId);
            app.anime(item, false)
                .height(0) // -> from 'height' to '0',
                .opacity(0)
                .easing('easeInOutQuad')
                .duration(300)
                .complete(() => {
                  item.remove() || (document.querySelector('#wishlist>*') || window.location.reload())
                })
                .play();
        });
    }
}

Wishlist.intiateWhenReady('Wishlist',['customer.wishlist']);
