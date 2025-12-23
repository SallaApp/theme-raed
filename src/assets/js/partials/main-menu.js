class NavigationMenu extends HTMLElement {
    connectedCallback() {
        salla.onReady()
            .then(() => salla.lang.onLoaded())
            .then(() => {
                this.menus = [];
                this.displayAllText = salla.lang.get('blocks.home.display_all');
                this.moreText = salla.lang.get('common.titles.more');
                this.visibleMenus = [];
                this.overflowMenus = [];

                return salla.api.component.getMenus()
                .then(({ data }) => {
                    this.menus = data;
                    return this.render()
                }).then(() => {
                    this.initializeResponsiveMenu();
                }).catch((error) => salla.logger.error('salla-menu::Error fetching menus', error));
            });
    }

    /** 
    * Check if the menu has children
    * @param {Object} menu
    * @returns {Boolean}
    */
    hasChildren(menu) {
        return menu?.children?.length > 0;
    }

    /**
    * Check if the menu has products
    * @param {Object} menu
    * @returns {Boolean}
    */
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
        ${this.hasChildren(menu) ? ' has-children' : ''}`
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
        <li class="lg:hidden text-sm font-bold" ${menu.attrs}>
            ${!this.hasChildren(menu) ? `
                <a href="${menu.url}" aria-label="${menu.title || 'category'}" class="text-gray-500 ${menu.image ? '!py-3' : ''}" ${menu.link_attrs}>
                    ${menuImage}
                    <span>${menu.title || ''}</span>
                </a>` :
                `
                <span class="${menu.image ? '!py-3' : ''}">
                    ${menuImage}
                    ${menu.title}
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
    * @param {String} additionalClasses
    * @returns {String}
    */
    getDesktopMenu(menu, isRootMenu, additionalClasses = '') {
        return `
        <li class="${this.getDesktopClasses(menu, isRootMenu)} ${additionalClasses}" ${menu.attrs} data-menu-item>
            <a href="${menu.url}" aria-label="${menu.title || 'category'}" ${menu.link_attrs}>
                <span>${menu.title}</span>
            </a>
            ${this.hasChildren(menu) ? `
                <div class="sub-menu ${this.hasProducts(menu) ? 'w-full left-0 flex' : 'w-56'}">
                    <ul class="${this.hasProducts(menu) ? 'w-56 shrink-0 m-8 rtl:ml-0 ltr:mr-0' : ''}">
                        ${menu.children.map((subMenu) => this.getDesktopMenu(subMenu, false)).join('\n')}
                    </ul>
                    ${this.hasProducts(menu) ? `
                    <salla-products-list
                    source="selected"
                    shadow-on-hover
                    source-value="[${menu.products}]" />` : ''}
                </div>` : ''}
        </li>`;
    }

    /**
    * Get the menus
    * @returns {String}
    */
    getMenus() {
        return this.menus.map((menu) => `
            ${this.getMobileMenu(menu, this.displayAllText)}
            ${this.getDesktopMenu(menu, true)}
        `).join('\n');
    }

    /**
    * Create More dropdown menu
    * @returns {String}
    */
    createMoreDropdown() {
        if (this.overflowMenus.length === 0) return '';

        return `
        <li class="!hidden lg:!block root-level lg:!inline-block has-children relative" id="more-menu-dropdown">
            <a href="#" aria-label="${this.moreText}">
                <span>${this.moreText}</span>
            </a>
            <div class="sub-menu w-56">
                <ul>
                    ${this.overflowMenus.map((menu) => this.getDesktopMenu(menu, false)).join('\n')}
                </ul>
            </div>
        </li>`;
    }

    /*
    * Initialize responsive menu functionality
    */
    initializeResponsiveMenu() {
        if (window.innerWidth < 1024) return; // Only for desktop

        const mainMenu = this.querySelector('.main-menu');
        if (!mainMenu) return;

        // Check if more menu is enabled from global window variable set in master.twig
        const isMoreMenuEnabled = window.enable_more_menu;
        if (!isMoreMenuEnabled) {
            // If disabled, keep the menu behavior as original (no More dropdown / overflow handling)
            return;
        }

        this.checkMenuOverflow();

        // Re-check on window resize
        const resizeHandler = this.debounce(() => {
            this.checkMenuOverflow();
        }, 250);

        window.addEventListener('resize', resizeHandler);
    }

    /**
    * Check if menu items overflow and move them to More dropdown
    */
    checkMenuOverflow() {
        const mainMenu = this.querySelector('.main-menu');
        if (!mainMenu) return;

        const container = mainMenu.closest('.container');
        if (!container) return;

        // Reset menus
        this.visibleMenus = [...this.menus];
        this.overflowMenus = [];

        // Remove existing more dropdown
        const existingMore = mainMenu.querySelector('#more-menu-dropdown');
        if (existingMore) {
            existingMore.remove();
        }

        // Show all menu items first
        const menuItems = mainMenu.querySelectorAll('.root-level[data-menu-item]');
        menuItems.forEach(item => {
            item.style.display = '';
        });

        // Calculate available width
        const containerWidth = container.offsetWidth;
        const otherElements = container.querySelector('.flex').children;
        let usedWidth = 0;

        // Calculate width used by logo and other elements
        Array.from(otherElements).forEach(element => {
            if (!element.contains(mainMenu)) {
                usedWidth += element.offsetWidth;
            }
        });

        const availableWidth = containerWidth - usedWidth - 300; // 300px buffer for More dropdown
        let currentWidth = 0;
        let visibleCount = 0;

        // Check each menu item
        menuItems.forEach((item, index) => {
            const itemWidth = item.offsetWidth;

            if (currentWidth + itemWidth <= availableWidth && index < this.menus.length) {
                currentWidth += itemWidth;
                visibleCount++;
            } else {
                // Hide overflow items
                item.style.setProperty('display', 'none', 'important');
                if (index < this.menus.length) {
                    this.overflowMenus.push(this.menus[index]);
                }
            }
        });

        // Update visible menus
        this.visibleMenus = this.menus.slice(0, visibleCount);

        // Add More dropdown if needed
        if (this.overflowMenus.length > 0) {
            mainMenu.insertAdjacentHTML('beforeend', this.createMoreDropdown());
        }
    }

    /**
    * Debounce function to limit resize event calls
    * @param {Function} func
    * @param {Number} wait
    * @returns {Function}
    */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
    * Render the header menu
    */
    render() {
        this.innerHTML =  `
        <nav id="mobile-menu" class="mobile-menu">
            <ul class="main-menu">${this.getMenus()}</ul>
            <button class="btn--close close-mobile-menu sicon-cancel lg:hidden"></button>
        </nav>
        <button class="btn--close-sm close-mobile-menu sicon-cancel hidden"></button>`;
    }
}

customElements.define('custom-main-menu', NavigationMenu);
