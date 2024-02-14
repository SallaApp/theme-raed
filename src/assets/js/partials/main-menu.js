class NavigationMenu extends HTMLElement {
    constructor() {
        super();
        this.displayAllText = null;
        this.menus = [];
    }

    /**
    * Fetch the menus
    */
    connectedCallback() {
        salla.onReady(() => {
            salla.api.component.getMenus('header').then(({ data }) => {
                this.menus = data;
                this.displayAllText = salla.lang.get('blocks.home.display_all');
                this.render();
            }).catch(error => {
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
        return menu && menu.children && menu.children.length > 0;
    }

    /**
    * Check if the menu has products
    * @param {Object} menu
    * @returns {Boolean}
    */
    hasProducts(menu) {
        return menu && menu.products && menu.products.length > 0;
    }

    /**
    * Get the classes for the menu
    * @param {String} classes
    * @returns {String}
    */
    clx(classes) {
        return classes;
    }

    /**
    * Get the classes for desktop menu
    * @param {Object} menu
    * @param {Boolean} isRootMenu
    * @returns {String}
    */
    getDesktopClasses(menu, isRootMenu) {
        return this.clx(`!hidden lg:!block ${isRootMenu ? 'root-level lg:!inline-block' : 'relative'} ${menu.products ? ' mega-menu' : ''}
        ${this.hasChildren(menu) ? ' has-children' : ''}`);
    }

    /**
    * Get the mobile menu
    * @param {Object} menu
    * @param {String} displayAllText
    * @returns {String}
    */
    getMobileMenu(menu, displayAllText) {
        const menuImage = menu.image ? `<img src="${menu.image}" class="rounded-full" width="48" height="48" alt="${menu.title}" />` : '';

        return `
        <li class="lg:hidden text-sm font-bold">
            ${!this.hasChildren(menu) ? `
                <a href="${menu.url}" aria-label="${menu.title || 'category'}" class="${this.clx(`text-gray-500 ${menu.image ? '!py-3' : ''}`)}">
                    ${menuImage}
                    <span>${menu.title || ''}</span>
                </a>` :
            `
                <span class="${this.clx(menu.image ? '!py-3' : '')}">
                    ${menuImage}
                    ${menu.title}
                </span>
                <ul>
                    <li class="text-sm font-bold">
                        <a href="${menu.url}" class="text-gray-500">${displayAllText}</a>
                    </li>
                    ${menu.children.map(subMenu => this.getMobileMenu(subMenu, displayAllText)).join('')}
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
        <li class="${this.getDesktopClasses(menu, isRootMenu)}">
            <a href="${menu.url}" aria-label="${menu.title || 'category'}">
                <span>${menu.title || ''}</span>
            </a>
            ${this.hasChildren(menu) ? `
                <div class="${this.clx(`sub-menu ${this.hasProducts(menu) ? 'w-full left-0 flex' : 'w-56'}`)}">
                    <ul class="${this.clx(this.hasProducts(menu) ? 'w-56 shrink-0 m-8 rtl:ml-0 ltr:mr-0' : '')}">
                        ${menu.children.map(subMenu => this.getDesktopMenu(subMenu, false)).join('')}
                    </ul>
                    ${this.hasProducts(menu) ? `
                        <div class="s-menu-products-wrapper">
                            <salla-products-list
                                source="selected"
                                shadow-on-hover
                                source-value="${menu.products.map(({ id }) => id).join(',')}"
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
        return menus.map(menu => `
            ${this.getMobileMenu(menu, this.displayAllText)}
            ${this.getDesktopMenu(menu, true)}
        `).join('');
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
