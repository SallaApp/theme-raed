import { MenuItem, Sources } from './interfaces';
export declare class SallaMenu {
    /**
     * The source of the menu, specifying whether it is a header or footer menu.
     */
    source: Sources;
    /**
     * The source value, a stringified JSON representation of the menu content.
     */
    sourceValue?: string;
    /**
     * Boolean indicating whether the menu is a top navigation menu.
     */
    topnav: boolean;
    /**
     * Boolean indicating whether to use React Link elements for menu links.
     */
    useReactLink: boolean;
    /**
     * Limiting the number of menu items
     */
    limit: number;
    menus: MenuItem[];
    private displayAllText;
    componentWillLoad(): Promise<any>;
    private getMenuItems;
    private hasChildren;
    private hasProducts;
    /**
    * Get the classes for desktop menu
    * @param {Object} menu
    * @param {Boolean} isRootMenu
    * @returns {String}
    */
    private getDesktopClasses;
    private getAttributes;
    /**
       * Get the mobile menu
       * @param {Object} menu
       * @param {String} displayAllText
       * @returns {String}
       */
    private getMobileMenu;
    /**
       * Get the desktop menu
       * @param {Object} menu
       * @param {Boolean} isRootMenu
       * @returns {String}
       */
    private getDesktopMenu;
    /**
       * Get the footer menu
       * @param {Array} menus
       */
    private getFooterMenu;
    /**
  * Get the menus
  * @param {Array} menus
  * @returns {String}
  */
    private getHeaderMenu;
    render(): any;
}
