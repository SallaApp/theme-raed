import { CommentType, type UserComments, type Pagination } from './interfaces';
export declare class SallaComments {
    constructor();
    /**
     * Page or product ID
     */
    itemId: number;
    /**
       * Load more text
       */
    loadMoreText: string;
    /**
       * Load more text
       */
    hideForm: boolean;
    /**
       * Block Title
       */
    blockTitle: string;
    /**
       * Hide Title
       */
    hideTitle: boolean;
    /**
     * Comment Type
     */
    type: CommentType.PAGE | CommentType.PRODUCT | CommentType.BLOG;
    /**
     * Show or hide avatar
     */
    showFormAvatar: boolean;
    /**
   * Hide Bought
   */
    hideBought: boolean;
    /**
     * Sort comments
     */
    sort: string | 'latest' | 'oldest' | 'bottom_rating' | 'top_rating';
    /**
     * Determines if the comments are testimonials
     */
    testimonials: boolean;
    comments: UserComments[];
    pagination: Pagination;
    total: number;
    showPlaceholder: boolean;
    nextPage: string;
    mostHelpfulLabel: string;
    private status;
    private btnLoader;
    private infiniteScroll;
    private wrapper;
    host: HTMLElement;
    noComments: string;
    comment_title: any;
    comment_name: any;
    placeholder_text: string;
    showRatingSummary: boolean;
    allowLikes: any;
    private pluralize;
    private wrapConsoleError;
    private initiateInfiniteScroll;
    private loading;
    private animateItems;
    /**
     * Reloads the comments data from the server
     */
    reload(): Promise<void>;
    private getCommentHTML;
    private handleResponse;
    componentWillLoad(): any;
    private loadInitialData;
    loadMore(): Promise<void>;
    render(): any;
}
