import BasePage from './base-page';

class Wishlist extends BasePage {

    onReady() {
        // init wishlist icons in product cards
        salla.storage.get('salla::wishlist', []).forEach(id => this.toggleFavoriteIcon(id));
    }

    registerEvents() {

        salla.wishlist.event.onAdded((event, id) => this.toggleFavoriteIcon(id));

        salla.wishlist.event.onRemoved((response, id) => {

            this.toggleFavoriteIcon(id, false);

            // just an animation when the item removed from wishlist page
            let item = document.querySelector('#wishlist-product-' + id);

            if(!item){
                return;
            }

            app.anime(item, false)
                .height(0)// -> from 'height' to '0',
                .opacity(0)
                .easing('easeInOutQuad')
                .duration(300)
                .complete(() => item.remove() || (document.querySelector('#wishlist>*') || window.location.reload()))
                .play();
        });
    }

    toggleFavoriteIcon(id, isAdded = true) {
        document.querySelectorAll('.btn--wishlist[data-id="' + id + '"]')
            .forEach(btn => {
                app.toggleElementClassIf(btn, 'is-added', 'not-added', () => isAdded);
                // app.toggleElementClassIf(btn, 'pulse', 'un-favorited', () => isAdded);
            });
    }
}

Wishlist.initiateWhenReady();
