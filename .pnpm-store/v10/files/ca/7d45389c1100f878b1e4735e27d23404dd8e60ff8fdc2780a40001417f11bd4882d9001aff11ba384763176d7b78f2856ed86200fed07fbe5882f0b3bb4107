/*!
 * Crafted with ❤ by Salla
 */
import { Fragment, h } from "@stencil/core";
export class SallaMenu {
    constructor() {
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
    static get is() { return "salla-menu"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-menu.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-menu.css"]
        };
    }
    static get properties() {
        return {
            "source": {
                "type": "string",
                "attribute": "source",
                "mutable": false,
                "complexType": {
                    "original": "Sources",
                    "resolved": "\"footer\" | \"header\" | \"json\"",
                    "references": {
                        "Sources": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/salla-menu/interfaces.ts::Sources"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The source of the menu, specifying whether it is a header or footer menu."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "\"header\""
            },
            "sourceValue": {
                "type": "string",
                "attribute": "source-value",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The source value, a stringified JSON representation of the menu content."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "topnav": {
                "type": "boolean",
                "attribute": "topnav",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Boolean indicating whether the menu is a top navigation menu."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "useReactLink": {
                "type": "boolean",
                "attribute": "use-react-link",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Boolean indicating whether to use React Link elements for menu links."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "limit": {
                "type": "number",
                "attribute": "limit",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Limiting the number of menu items"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "menus": {}
        };
    }
}
