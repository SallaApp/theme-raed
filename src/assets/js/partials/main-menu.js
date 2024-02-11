
class NavigationMenu extends HTMLElement {

    constructor() {
        super();
    }

    #displayAllText = null
    #menus = []

    connectedCallback() {
        salla.onReady(() => {
            salla.api.component.getMenus('header').then(({ data }) => {
                return this.#menus = data
            }).then(
                () => {
                    this.#displayAllText = salla.lang.get('blocks.home.display_all')
                    this.render()
                })
        })
    }


     #hasChildren(menu = { children: [] })
     {
        return menu?.children?.length > 0
     }

    #hasProducts(menu = { products: [] })
    {
        return menu?.products?.length > 0
    }

    #clx(classes)
    {
     return `"${classes}"`
    }



    #getDesktopClasses(menu, isRootMenu){
        return this.#clx(`!hidden lg:!block ${isRootMenu ? 'root-level lg:!inline-block' : 'relative'} ${menu.products ? ' mega-menu' : ''}
        ${this.#hasChildren(menu) ? ' has-children' : ''}`)
    }


    #getMobileMenu(menu = { children: [] }, displayAllText = '') {
        const menuImage = menu.image ? /*html*/`<img src=${menu.image} class="rounded-full" width="48" height="48" alt=${menu.title} /> ` : ''

        return /*html*/`
        <li class="lg:hidden text-sm font-bold" ${menu.attrs}>
             ${!this.#hasChildren(menu) ? /*html*/`
             <a  ${menu.link_attrs} aria-label=${menu.title ? menu.title : 'category'} href=${menu.url} class=${this.#clx(`text-gray-500 ${menu.image ? '!py-3' : ''}`)}>
                    ${menuImage}
             <span>${menu.title || ''}</span>
             </a>`
                :
            /*html*/`
            <span class=${this.#clx(menu.image ? '!py-3' : '')}>
            ${menuImage}
            ${menu.title}
             </span>
             <ul>
             <li class="text-sm font-bold"><a ${menu.link_attrs} href=${menu.url} class="text-gray-500">${displayAllText}</a></li>
                ${menu.children.map(subMenu => this.#getMobileMenu(subMenu, displayAllText)).join(' ')}
            </ul>
            `
            }   
        </li>
        `
    }

    #getDesktopMenu(menu = { products: [], children: [] }, isRootMenu = false) {
        return (/*html*/`

    <li class=${this.#getDesktopClasses(menu, isRootMenu)} ${menu.attrs}>
        <a ${menu.link_attrs} href=${menu.url} aria-label=${menu.title ? menu.title : 'category'}>
            <span>${menu.title}</span>
        </a>

        ${this.#hasChildren(menu) ? /*html*/`
        <div class=${this.#clx(`sub-menu ${this.#hasProducts(menu) ? 'w-full left-0 flex' : 'w-56'}`)}>
                <ul class=${this.#clx(this.#hasProducts(menu) ? 'w-56 shrink-0 m-8 rtl:ml-0 ltr:mr-0' : '')}>
                ${menu.children.map(subMenu => this.#getDesktopMenu(subMenu, false)).join(' ')}
                </ul>
                ${this.#hasProducts(menu) ?  /*html*/`
                <div class="s-menu-products-wrapper">
                <salla-products-list
                source="selected"
                shadow-on-hover
                source-value=${`[${menu.products.map(({ id }) => id).join(',')}]`}
                />
            </div>
                `: ''}
        `: ''

            }
    </li>

    `)
    }

    #getMenus(menus = []) {
        return menus.map((menu => /*html*/`
        ${this.#getMobileMenu(menu, this.#displayAllText)}
        ${this.#getDesktopMenu(menu, true)}
    `)).join(' ')
    }

    #getHeaderMenu(menus = []) {

        return /*html*/ `
    <nav id="mobile-menu" class="mobile-menu">
        <ul class="main-menu">
    ${this.#getMenus(menus)}
        </ul>
        <button class="btn--close close-mobile-menu sicon-cancel lg:hidden"></button>
    </nav>
    <button class="btn--close-sm close-mobile-menu sicon-cancel hidden"></button>
    `
    }


    render() {
        this.innerHTML = this.#getHeaderMenu(this.#menus)
    }
}

customElements.define('custom-main-menu', NavigationMenu);
