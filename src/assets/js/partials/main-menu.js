class NavigationMenu extends HTMLElement {
    constructor() {
        super();
        this.displayAllText = null;
        this.brandsText = null
        this.menus = [];
    }

    /**
    * Fetch the menus
    */
    connectedCallback() {
        salla.onReady(() => {
            const lang = salla.lang.locale
            const menusKey = `menus_${lang}`

            /**
            * Avoid saving the menu to localStorage (default) when in the development environment
            * or when modifying the theme in the dashboard
            */
            const shouldSkipCaching = process.env.NODE_ENV === "development" || window.self !== window.top

            const cachedMenus = salla.storage.getWithTTL(menusKey, [])

            this.displayAllText = salla.lang.get('blocks.home.display_all');
            this.brandsText = salla.lang.get('common.titles.brands')

            if (cachedMenus.length > 0 && !shouldSkipCaching) {
                this.menus = cachedMenus
                return this.render();
            }

            salla.api.component.getMenus('header').then(({ data }) => {
                this.menus = data;
                salla.storage.setWithTTL(menusKey, this.menus)
                this.render();

            }).catch((error) => {
                console.error('Error fetching menus:', error);
            });

        });
    }

    /** 
    * Check if the menu has children
    * @param {Object} menu
    * @returns {Boolean}
    */
    hasChildren(menu) {
        return menu?.children && menu.children.length > 0;
    }

    /**
    * Check if the menu has products
    * @param {Object} menu
    * @returns {Boolean}
    */
    hasProducts(menu) {
        return menu?.products && menu.products.length > 0;
    }


    /** could be removed in the future
    * this is a fallback in case brands title is not set in the brands settings in merchant dashboard
    * @param {Object} menu
    * @returns {string}
    */
    getMenuTitle(menu) {
        if (menu.title) { return menu.title }
        if (menu.id === 'brands') { return this.brandsText }
    }

    /**
    * Get the classes for desktop menu
    * @param {Object} menu
    * @param {Boolean} isRootMenu
    * @returns {String}
    */
    getDesktopClasses(menu, isRootMenu) {
        return `!hidden lg:!block ${isRootMenu ? 'root-level lg:!inline-block' : 'relative'} ${menu.products ? ' mega-menu' : ''}
        ${this.hasChildren(menu) ? ' has-children' : ''}`
    }

    /**
    * Get the mobile menu
    * @param {Object} menu
    * @param {String} displayAllText
    * @returns {String}
    */
    getMobileMenu(menu, displayAllText) {
        const menuImage = menu.image ? `<img src="${menu.image}" class="rounded-full" width="48" height="48" alt="${this.getMenuTitle(menu)}" />` : '';

        return `
        <li class="lg:hidden text-sm font-bold" ${menu.attrs}>
            ${!this.hasChildren(menu) ? `
                <a href="${menu.url}" aria-label="${this.getMenuTitle(menu) || 'category'}" class="text-gray-500 ${menu.image ? '!py-3' : ''}" ${menu.link_attrs}>
                    ${menuImage}
                    <span>${this.getMenuTitle(menu) || ''}</span>
                </a>` :
                `
                <span class="${menu.image ? '!py-3' : ''}">
                    ${menuImage}
                    ${this.getMenuTitle(menu)}
                </span>
                <ul>
                    <li class="text-sm font-bold">
                        <a href="${menu.url}" class="text-gray-500">${displayAllText}</a>
                    </li>
                    ${menu.children.map((subMenu) => this.getMobileMenu(subMenu, displayAllText)).join('')}
                </ul>
            `}
        </li>`;
    }

    /**
    * Get the desktop menu
    * @param {Object} menu
    * @param {Boolean} isRootMenu
    * @returns {String}
    */
    getDesktopMenu(menu, isRootMenu) {
        return `
        <li class="${this.getDesktopClasses(menu, isRootMenu)}" ${menu.attrs}>
            <a href="${menu.url}" aria-label="${this.getMenuTitle(menu) || 'category'}" ${menu.link_attrs}>
                <span>${this.getMenuTitle(menu)}</span>
            </a>
            ${this.hasChildren(menu) ? `
                <div class="sub-menu ${this.hasProducts(menu) ? 'w-full left-0 flex' : 'w-56'}">
                    <ul class="${this.hasProducts(menu) ? 'w-56 shrink-0 m-8 rtl:ml-0 ltr:mr-0' : ''}">
                        ${menu.children.map((subMenu) => this.getDesktopMenu(subMenu, false)).join('\n')}
                    </ul>
                    ${this.hasProducts(menu) ? `
                        <div class="s-menu-products-wrapper">
                            <salla-products-list
                                source="selected"
                                shadow-on-hover
                                source-value="[${menu.products}]"
                            />
                        </div>` : ''}
                </div>` : ''}
        </li>`;
    }

    /**
    * Get the menus
    * @param {Array} menus
    * @returns {String}
    */
    getMenus(menus) {
        return menus.map((menu) => `
            ${this.getMobileMenu(menu, this.displayAllText)}
            ${this.getDesktopMenu(menu, true)}
        `).join('\n');
    }

    /**
    * Get the header menu
    * @param {Array} menus
    * @returns {String}
    */
    getHeaderMenu(menus) {
        return `
        <nav id="mobile-menu" class="mobile-menu">
            <ul class="main-menu">
                ${this.getMenus(menus)}
            </ul>
            <button class="btn--close close-mobile-menu sicon-cancel lg:hidden"></button>
        </nav>
        <button class="btn--close-sm close-mobile-menu sicon-cancel hidden"></button>`;
    }

    /**
    * Render the header menu
    */
    render() {
        this.innerHTML = this.getHeaderMenu(this.menus);
    }
}

customElements.define('custom-main-menu', NavigationMenu);
