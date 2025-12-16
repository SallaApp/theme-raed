/*!
 * Crafted with ❤ by Salla
 */
import { proxyCustomElement, HTMLElement, h, Fragment } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './salla-products-list2.js';

const sallaMenuCss = ":host{display:block}";

const SallaMenu$1 = /*@__PURE__*/ proxyCustomElement(class SallaMenu extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        /**
         * The source of the menu, specifying whether it is a header or footer menu.
         */
        this.source = "header";
        /**
         * Boolean indicating whether to use React Link elements for menu links.
         */
        this.useReactLink = false;
        this.menus = [];
    }
    async componentWillLoad() {
        return salla.onReady(() => {
            this.displayAllText = salla.lang.get('blocks.home.display_all');
            if (this.sourceValue && this.source === 'json') {
                this.menus = typeof this.sourceValue === 'string' ? JSON.parse(this.sourceValue) : this.sourceValue || [];
            }
            else {
                return this.getMenuItems();
            }
        });
    }
    getMenuItems() {
        /**
          * Avoid saving the menu to localStorage (default) when in the development environment
          * or when modifying the theme in the dashboard
          */
        // const isPreview = salla.config.isDebug() || salla.helpers.isPreview()
        // const cacheKey = `${this.source}_menus_${salla.lang.locale}`
        // const cachedMenus = salla.storage.getWithTTL(cacheKey, [])
        // if (cachedMenus.length > 0 && !isPreview) {
        //   this.menus = cachedMenus
        //   return;
        // }
        return salla.api.component.getMenus(this.source).then(({ data }) => {
            this.menus = data;
            // !isPreview && salla.storage.setWithTTL(cacheKey, this.menus)
        }).catch((error) => {
            salla.logger.error('salla-menu::Error fetching menus', error);
        });
    }
    hasChildren(menu) {
        return menu?.children?.length > 0;
    }
    hasProducts(menu) {
        return menu?.products?.length > 0;
    }
    /**
    * Get the classes for desktop menu
    * @param {Object} menu
    * @param {Boolean} isRootMenu
    * @returns {String}
    */
    getDesktopClasses(menu, isRootMenu) {
        return `!hidden lg:!block ${isRootMenu ? 'root-level lg:!inline-block' : 'relative'} ${menu.products ? ' mega-menu' : ''}
    ${this.hasChildren(menu) ? 'has-children' : ''}`;
    }
    getAttributes(attrs) {
        return attrs.trim().split(' ').reduce((result, attr) => {
            let [key, value] = attr.split('=');
            result[key] = value.replace(/"/g, '');
            return result;
        }, {});
    }
    /**
       * Get the mobile menu
       * @param {Object} menu
       * @param {String} displayAllText
       * @returns {String}
       */
    getMobileMenu(menu, displayAllText) {
        const menuImage = menu.image ? h("img", { src: menu.image, class: "rounded-full", width: "48", height: "48", alt: menu.title }) : null;
        return (h("li", { class: "lg:hidden text-sm font-bold", ...this.getAttributes(menu.attrs) }, !this.hasChildren(menu) ?
            h("a", { href: menu.url, "aria-label": menu.title || 'category', class: `text-gray-500 ${menu.image ? '!py-3' : ''}`, ...this.getAttributes(menu.link_attrs) }, menuImage, h("span", null, menu.title || ''))
            :
                h(Fragment, null, h("span", { class: menu.image ? '!py-3' : '' }, menuImage, menu.title), h("ul", null, h("li", { class: "text-sm font-bold" }, h("a", { href: menu.url, class: "text-gray-500" }, displayAllText)), menu.children.map((subMenu) => this.getMobileMenu(subMenu, displayAllText))))));
    }
    /**
       * Get the desktop menu
       * @param {Object} menu
       * @param {Boolean} isRootMenu
       * @returns {String}
       */
    getDesktopMenu(menu, isRootMenu) {
        return h("li", { class: this.getDesktopClasses(menu, isRootMenu), ...this.getAttributes(menu.attrs) }, h("a", { href: menu.url, "aria-label": menu.title || 'category', ...this.getAttributes(menu.link_attrs) }, h("span", null, menu.title)), this.hasChildren(menu) ?
            h("div", { class: `sub-menu shadow-default ${this.hasProducts(menu) ? 'w-full left-0 flex' : 'w-56'}` }, h("ul", { class: this.hasProducts(menu) ? 'w-56 shrink-0 m-8 rtl:ml-0 ltr:mr-0' : '' }, menu.children.map((subMenu) => this.getDesktopMenu(subMenu, false))), this.hasProducts(menu) ?
                h("salla-products-list", { source: "selected", "shadow-on-hover": true, "source-value": `[${menu.products}]` }) : null) : null);
    }
    /**
       * Get the footer menu
       * @param {Array} menus
       */
    getFooterMenu(menus) {
        const Menuitems = (this.topnav || this.limit) ? menus.slice(0, this.limit || 3) : menus;
        return h("div", null, h("div", { class: {
                "s-menu-footer-list": !this.topnav,
                "s-menu-topnav-list": this.topnav
            } }, Menuitems.map((menu) => {
            return h("a", { key: menu.id, href: menu.url, target: menu.target, class: {
                    "s-menu-footer-item": !this.topnav,
                    "s-menu-topnav-item topnav-link-item right-side": this.topnav
                } }, menu.title);
        })));
    }
    /**
  * Get the menus
  * @param {Array} menus
  * @returns {String}
  */
    getHeaderMenu(menus) {
        return menus.map((menu) => [
            this.getMobileMenu(menu, this.displayAllText),
            this.getDesktopMenu(menu, true)
        ]);
    }
    render() {
        return this.source === "footer" ?
            this.getFooterMenu(this.menus)
            :
                [
                    h("nav", { key: "main-nav", id: "mobile-menu", class: "mobile-menu" }, h("ul", { class: "main-menu" }, this.getHeaderMenu(this.menus)), h("button", { class: "btn--close close-mobile-menu sicon-cancel lg:hidden" })),
                    h("button", { key: "close-btn", class: "btn--close-sm close-mobile-menu sicon-cancel hidden" })
                ];
    }
    static get style() { return sallaMenuCss; }
}, [0, "salla-menu", {
        "source": [1],
        "sourceValue": [1, "source-value"],
        "topnav": [4],
        "useReactLink": [4, "use-react-link"],
        "limit": [2],
        "menus": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["salla-menu", "salla-products-list"];
    components.forEach(tagName => { switch (tagName) {
        case "salla-menu":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SallaMenu$1);
            }
            break;
        case "salla-products-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const SallaMenu = SallaMenu$1;
const defineCustomElement = defineCustomElement$1;

export { SallaMenu, defineCustomElement };
