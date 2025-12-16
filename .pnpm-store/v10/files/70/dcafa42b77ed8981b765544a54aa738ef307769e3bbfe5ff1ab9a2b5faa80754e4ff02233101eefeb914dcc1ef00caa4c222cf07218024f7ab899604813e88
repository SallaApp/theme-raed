import type OrderFeedbackResponse from "./order-feedback-response";
export declare class SallaRatingModal {
    constructor();
    order: OrderFeedbackResponse | undefined;
    hasError: boolean;
    showContactWidget: boolean;
    errorMessage: string;
    images: any[];
    productImages: Record<number, Array<any>>;
    editItemImages: Array<any>;
    contact_body: (store: string, id: number, customer: string) => string;
    editMode: boolean;
    defaultMode: boolean;
    deleteMode: boolean;
    shouldOpenDeleteModal: boolean;
    editType: 'product' | 'store' | 'shipping';
    editFeedbackId: number;
    deleteFeedbackId: number;
    editItem: any;
    private dragAndDropFilesLabel;
    private contactSubjectLabel;
    private editReviewLabel;
    private allowedImagesTypesLabel;
    private addImagesLabel;
    private editImagesLabel;
    private threeImagesMax;
    private areYouSureLabel;
    private confirmDeletionLabel;
    private cancelLabel;
    private confirmDeleteBtn;
    private updatedSuccessfullyLabel;
    private deletedSuccessfullyLabel;
    private contactUsLabel;
    private allowAttachImages;
    private allowContactSupport;
    private contentRefs;
    private hiddenInputs;
    private isOpen;
    private stepsCount;
    private nextBtn;
    private backBtn;
    private modal;
    private editModal;
    private deleteModal;
    private currentIndex;
    private currentTab;
    private thanksTab;
    private body;
    private thanksTime;
    private steps;
    private dots;
    private submitted;
    private MAX_UPLOAD_LIMIT;
    /**
     * The order id, to rate on its products & shipping
     */
    orderId: number;
    host: HTMLElement;
    /**
     * Show the rating modal
     */
    open(): Promise<unknown>;
    openEditModal(params: {
        type: 'product' | 'store' | 'shipping';
        feedback_id: number;
    }): Promise<void>;
    fetchEditItem(feedbackId: number): Promise<void>;
    private editReview;
    openDeleteModal(params: any): Promise<unknown>;
    deleteReview(): Promise<void>;
    /**
     * Show the rating modal
     */
    close(): Promise<HTMLElement>;
    private handleWizard;
    private showActiveStep;
    private previousTab;
    private submit;
    private submittedBefore;
    private validate;
    private sendFeedback;
    private showThankYou;
    private getFilepondPlaceholder;
    private onOpen;
    private onClose;
    private toggleUploader;
    private getCustomerName;
    private handleSendEmail;
    private handleSendWhatsApp;
    private resetData;
    private getDeleteModal;
    private renderUploadedImagesCount;
    private getEditModal;
    render(): any;
    componentWillLoad(): void;
    componentDidLoad(): void;
}
