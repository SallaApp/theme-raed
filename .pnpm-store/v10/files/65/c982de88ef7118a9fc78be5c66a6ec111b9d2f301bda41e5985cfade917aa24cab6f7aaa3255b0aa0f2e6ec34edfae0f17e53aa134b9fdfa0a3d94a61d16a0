import {Language, TwilightConfig} from "../tiwlight-config";
import {Currency, Price} from "../common";
import {default as SallaConfig} from "@salla.sa/base/types/config";

export default interface Config extends SallaConfig {
    merge: (config: TwilightConfig) => Config;
    isRTL: () => boolean;
    money: (money: number | Price) => string;
    isUser: () => boolean;
    isGuest: () => boolean;
    currency: (code?: string | 'SAR') => Currency;
    currencies: () => Promise<{ SAR: Currency, [iso_code: string]: Currency }>;
    languages: () => Promise<Language[]>;
}