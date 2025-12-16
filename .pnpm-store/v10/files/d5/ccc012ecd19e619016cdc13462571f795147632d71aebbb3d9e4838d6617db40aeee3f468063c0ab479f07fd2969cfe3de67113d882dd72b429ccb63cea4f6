/*!
 * Crafted with ❤ by Salla
 */
import { h } from "@stencil/core";
import Helper from "../../Helpers/Helper";
export class SallaNotifications {
    constructor() {
        /**
         * Number of notifications to load per request.
         */
        this.itemPerPage = 10;
        this.no_notifications_trans = salla.lang.get('blocks.header.no_notifications');
        this.load_more_text_trans = salla.lang.get('common.elements.load_more');
        salla.lang.onLoaded(() => {
            this.no_notifications_trans = salla.lang.get('blocks.header.no_notifications');
            this.load_more_text_trans = salla.lang.get('common.elements.load_more');
        });
    }
    // Show/hide loading
    loading(isLoading = true) {
        let btnText = this.status?.querySelector('.s-button-text');
        if (btnText) {
            Helper.toggleElementClassIf(btnText, 's-button-hide', 's-button-show', () => isLoading);
            this.btnLoader.style.display = isLoading ? 'inherit' : 'none';
        }
    }
    getNotificationCard(notification) {
        const notificationItem = document.createElement('salla-notification-item');
        notificationItem.notification = notification;
        notificationItem.classList.add('s-block');
        return notificationItem;
    }
    render() {
        if (this.showPlaceholder) {
            return h("div", { class: "s-notifications-no-content" }, h("salla-placeholder", { alignment: 'center' }, h("span", { slot: 'title' }, this.no_notifications_trans)));
        }
        return h("div", { class: "s-notifications-wrapper" }, h("div", { class: "s-notifications-container", ref: wrapper => this.wrapper = wrapper }), this.nextPage && (h("div", { class: "s-infinite-scroll-wrapper", ref: status => this.status = status }, h("button", { onClick: () => this.loadMore(), class: "s-infinite-scroll-btn s-button-btn s-button-primary" }, h("span", { class: "s-button-text s-infinite-scroll-btn-text" }, this.loadMoreText ?? this.load_more_text_trans), h("span", { class: "s-button-loader s-button-loader-center s-infinite-scroll-btn-loader", ref: btnLoader => this.btnLoader = btnLoader, style: { "display": "none" } })))));
    }
    handleResponse(notificationsList) {
        return notificationsList.map(notification => this.getNotificationCard(notification));
    }
    initiateInfiniteScroll() {
        if (!this.wrapper) {
            salla.logger.error('Wrapper is undefined. Cannot initiate infinite scroll.');
            return;
        }
        this.infiniteScroll = salla.infiniteScroll.initiate(this.wrapper, this.wrapper, {
            path: () => this.nextPage,
            history: true,
            nextPage: this.nextPage,
            scrollThreshold: false,
        }, true);
        this.infiniteScroll?.on('request', _response => {
            this.loading();
        });
        this.infiniteScroll?.on('load', response => {
            this.loading(false);
            this.pagination = response.pagination;
            this.nextPage = response.pagination.links?.next || null;
            this.handleResponse(response.data).forEach(data => this.wrapper.append(data));
            let items = this.host.querySelectorAll('salla-notification-item:not(.animated)');
            Helper.animateItems(items);
        });
        this.infiniteScroll?.on('error', (e) => {
            salla.logger.error('Error loading more comments:', e);
        });
    }
    async loadInitialData() {
        await salla.api.notifications.fetch({ "per_page": this.itemPerPage })
            .then(resp => {
            this.pagination = resp.pagination;
            this.total = resp.pagination.total;
            this.nextPage = resp.pagination.links?.next || null;
            // if (!this.notifications.length) {
            //   this.showPlaceholder = true;
            //   return this.loading(false);
            // }
            setTimeout(() => {
                if (!resp.data.length) {
                    return this.showPlaceholder = true;
                }
                this.handleResponse(resp.data).forEach(data => this.wrapper.append(data));
                this.initiateInfiniteScroll();
                let items = this.wrapper.querySelectorAll('salla-notification-item:not(.animated)');
                Helper.animateItems(items);
            }, 100);
        })
            .catch(error => {
            salla.logger.error(error);
            this.showPlaceholder = true;
            this.loading(false);
        });
    }
    // Get next page
    async loadMore() {
        this.infiniteScroll?.loadNextPage();
    }
    async componentWillLoad() {
        await this.loadInitialData();
    }
    static get is() { return "salla-notifications"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-notifications.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-notifications.css"]
        };
    }
    static get properties() {
        return {
            "loadMoreText": {
                "type": "string",
                "attribute": "load-more-text",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Load more text"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "itemPerPage": {
                "type": "number",
                "attribute": "item-per-page",
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
                    "text": "Number of notifications to load per request."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "10"
            }
        };
    }
    static get states() {
        return {
            "pagination": {},
            "total": {},
            "showPlaceholder": {},
            "nextPage": {},
            "no_notifications_trans": {},
            "load_more_text_trans": {}
        };
    }
    static get elementRef() { return "host"; }
}
