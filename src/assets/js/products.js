import BasePage from './base-page';

class Products extends BasePage {
    onReady() {
        let urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('sort')) {
            app.element('#product-filter').value = urlParams.get('sort');
        }
        // Sort Products
        app.on('change','#product-filter', event =>{
            window.history.replaceState(null, null, "?sort=" + event.currentTarget.value);
            //todo:: use it like this: app.element('salla-products-list').sortBy=event.currentTarget.value;
            app.element('salla-products-list').setAttribute('filters', `{"sort": "${event.currentTarget.value}"}`)
        });
    }
}

Products.initiateWhenReady([
    'product.index',
    'product.index.latest',
    'product.index.offers', 'product.index.search',
    'product.index.tag',
]);
