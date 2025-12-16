import TwilightEmitter from './event';
import Api, {ApiActionName} from "./api";
import SallaActions from "./actions";

import AppHelpers from "./helpers/app-helpers";
import SallaNotify from "./lib/notify";
import SallaLang from "./lib/lang";
import SallaForm from "./lib/form";
import {TwilightConfig} from "./tiwlight-config";
import Config from "@salla.sa/base/types/config";
import SallaBase from "@salla.sa/base/types";
export default interface Salla extends SallaActions,SallaBase {
    onReady: (callback: (event: Event) => unknown) => Promise<void>; //don't relay on it, it will be available even salla object is not loaded yet

    api: Api;
    event: TwilightEmitter;

    config: Config;
    lang: SallaLang;

    notify: SallaNotify;
    success: (message: string, data?: any) => void;
    error: (message: string, data?: any) => void;

    AppHelpers: AppHelpers;
    form: SallaForm;
    isInitiated: boolean; // will be true when firing event `twilight::initiated`
    init: (config: TwilightConfig) => void; // an alias for `salla.twilight.init(config)`
    call: (action: ApiActionName | string) => any;

    onInitiated: (callback) => void; // don't relay on it because Salla may not existed yet
    status?: 'loading' | 'ready'; //will be ready after finishing salla.init
}