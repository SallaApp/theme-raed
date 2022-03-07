import BasePage from './base-page';
class Brands extends BasePage {
    onReady() {
        // set initial height;
        const nav = document.querySelector('#brands-nav'),
              navWrap = document.querySelector('.brands-nav-wrap');
        navWrap.style.height = nav.clientHeight + 'px';

        app.onClick('.brands-nav__item', ({target:btn}) => {
            app.all('.brands-nav__item', el => app.toggleElement(el, 'is-selected', 'unselected', () => el == btn));
        });

        window.addEventListener('scroll', () => {
            let scrolAtTop = window.pageYOffset <= 200;
            app.toggle('#brands-nav', 'is-not-sticky', 'is-sticky', () => scrolAtTop);
        });
    }
}

Brands.intiateWhenReady('Brands',['brands.index']);