export declare class SallaInstallment {
    private tabbyBorderRemoved;
    private tabbyRemoveBorderTries;
    host: HTMLElement;
    /**
     * Current product price
     */
    price: string;
    /**
     * Language code
     */
    language: string;
    /**
     * Currency code
     */
    currency: string;
    /**
     * Country code
     */
    country: string;
    tabbyIsActive: boolean;
    spotiiIsActive: boolean;
    tamaraIsActive: null | {
        publicKey: string;
    };
    mispayActive: null | {
        merchantCode: string;
        publicKey: string;
    };
    emkanIsActive: boolean;
    madfuActive: boolean;
    rajehiIsActive?: {
        pointsPerRiyal: number;
    };
    installment_sheria_text: (key: string, replacement: object) => string;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): void;
    render(): any;
    renderInstallments(isUpdating?: boolean): void;
    private isValidPrice;
    loadExternalScript({ src, onLoad, position, }: {
        src: string;
        onLoad?: HTMLScriptElement['onload'];
        position: 'head' | 'body';
    }): void;
    loadTamara({ isUpdating }: {
        isUpdating: boolean;
    }): void;
    shouldShowMispay(): {
        merchantCode: string;
        publicKey: string;
    };
    /**
     * this is workaround to remove the default border and add margin
     * we will try to remove tabby border 5 times for 7.5 seconds
     */
    removeTabbyBorder(): void;
}
