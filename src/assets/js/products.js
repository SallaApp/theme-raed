import BasePage from './base-page';
import MobileMenu from 'mmenu-light';
class Products extends BasePage {
    onReady() {
        let productsList = app.element('salla-products-list'),
            urlParams = new URLSearchParams(window.location.search)


        // Set Sort
        if (urlParams.has('sort')) {
            app.element('#product-filter').value = urlParams.get('sort');
        }


        // Sort Products
        app.on('change', '#product-filter', event => {
            let url = new URL(window.location.href);
            url.searchParams.set('sort', event.currentTarget.value);
            window.history.pushState({}, '', url);
            productsList.sortBy = event.currentTarget.value;
        });

        salla.event.once('salla-products-list::products.fetched', res=>{
            res.title && (app.element('#page-main-title').innerHTML = res.title);
        });


        this.initiateMobileMenu()
    }

    initiateMobileMenu() {
        let filters = app.element("#filters-menu"),
            trigger = app.element("a[href='#filters-menu']"),
            close = app.element("button.close-filters");

        if (!filters) {
            return;
        }
        filters = new MobileMenu(filters, "(max-width: 1024px)", "( slidingSubmenus: false)");
        const drawer = filters.offcanvas({ position: salla.config.get('theme.is_rtl') ? "right" : 'left' });
        trigger.addEventListener('click', event => {
            document.body.classList.add('filters-opened');
            event.preventDefault() || drawer.close() || drawer.open()
        });
        close.addEventListener('click', event => {
            document.body.classList.remove('filters-opened');
            event.preventDefault() || drawer.close()
        });
        salla.event.on('salla-filters::changed', filters => {
            if (!Object.entries(filters).length) {
                return
            }
            document.body.classList.remove('filters-opened');
            drawer.close()
        })
    }
}

Products.initiateWhenReady([
    'product.index',
    'product.index.latest',
    'product.index.offers', 'product.index.search',
    'product.index.tag',
]);
