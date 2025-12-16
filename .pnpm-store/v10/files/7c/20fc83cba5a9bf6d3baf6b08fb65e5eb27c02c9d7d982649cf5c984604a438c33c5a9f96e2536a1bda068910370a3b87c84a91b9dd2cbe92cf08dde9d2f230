export declare class SallaCommentForm {
    constructor();
    /**
     * Type of entity the comment is being submitted for. Defaults to `salla.url.is_page('page-single') ? 'page' : 'product'`
     */
    type: 'product' | 'page' | 'blog';
    /**
     * To show the avatar or not in the comment form
     */
    showAvatar: boolean;
    /**
     * The ID of the item(as defined in the type), where the comment is for. defaults to `salla.config.get('page.id')`
     */
    itemId?: string | number;
    placeholder: string;
    submitText: string;
    canComment: boolean;
    private commentField;
    private submitBtn;
    private commentForm;
    private submit;
    render(): any;
}
