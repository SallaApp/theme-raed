import { google } from './types';
export declare interface LoaderOptions {
    version?: string;
    client?: string;
    channel?: string;
    language?: string;
    region?: string;
    libraries?: Array<string>;
}
export declare class Loader {
    private apiKey;
    private options;
    private static CALLBACK_NAME;
    private loader;
    private resolve;
    private reject;
    private api;
    constructor(apiKey?: string, options?: LoaderOptions);
    load(): Promise<google>;
    private createUrl;
}
