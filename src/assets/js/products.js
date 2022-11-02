import BasePage from './base-page';

class Products extends BasePage {
    onReady() {
        // Sort Products
        app.on('change','#product-filter', event =>
          window.location.href = salla.helpers.addParamToUrl('by', event.target.value)
        );
    }
}

Products.initiateWhenReady([
    'product.index',
    'product.index.latest',
    'product.index.offers', 'product.index.search',
    'product.index.tag',
]);
