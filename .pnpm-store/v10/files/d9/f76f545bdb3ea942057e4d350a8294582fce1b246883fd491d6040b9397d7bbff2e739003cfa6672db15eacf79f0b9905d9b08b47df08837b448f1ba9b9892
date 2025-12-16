import { PersistentStorage, JitsuOptions, RuntimeFacade, AnalyticsInterface } from '@jitsu/protocols/analytics';
export { AnalyticsInterface, Callback, DispatchedEvent, DynamicJitsuOptions, ID, JSONObject, JitsuOptions, Options, PersistentStorage, RuntimeFacade } from '@jitsu/protocols/analytics';
import { AnalyticsPlugin } from 'analytics';

declare const parseQuery: (qs?: string) => Record<string, string>;
type StorageFactory = (cookieDomain: string, key2Cookie: (key: string) => string) => PersistentStorage;
declare function windowRuntime(opts: JitsuOptions): RuntimeFacade;
declare function createInMemoryStorage(debug?: boolean): PersistentStorage;
declare const emptyRuntime: (config: JitsuOptions) => RuntimeFacade;
declare function isInBrowser(): boolean;
type DestinationDescriptor = {
    id: string;
    destinationType: string;
    credentials: any;
    options: any;
    newEvents?: any[];
    deviceOptions: DeviceOptions;
};
type AnalyticsPluginDescriptor = {
    type: "analytics-plugin";
    packageCdn: string;
    moduleVarName: string;
};
type InternalPluginDescriptor = {
    type: "internal-plugin";
    name: string;
};
type DeviceOptions = AnalyticsPluginDescriptor | InternalPluginDescriptor;
declare const jitsuAnalyticsPlugin: (jitsuOptions: JitsuOptions, storage: PersistentStorage) => AnalyticsPlugin;
declare function randomId(hashString?: string | undefined): string;
declare function uuid(): string;

declare function parse(input: any): any;
declare const emptyAnalytics: AnalyticsInterface;
declare function jitsuAnalytics(_opts: JitsuOptions): AnalyticsInterface;

export { createInMemoryStorage, parse as default, emptyAnalytics, emptyRuntime, isInBrowser, jitsuAnalytics, jitsuAnalyticsPlugin, parseQuery, randomId, uuid, windowRuntime };
export type { AnalyticsPluginDescriptor, DestinationDescriptor, DeviceOptions, InternalPluginDescriptor, StorageFactory };
