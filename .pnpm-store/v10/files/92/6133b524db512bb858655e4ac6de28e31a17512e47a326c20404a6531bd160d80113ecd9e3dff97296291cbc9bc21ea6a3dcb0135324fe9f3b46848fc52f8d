/**
 * @typedef {{
 *  campaign: string,
 *  referrer?: string,
 * } & DomainObject & Object.<string, any>} ReferrerObject
 */
/**
 * Checks a given url and parses referrer data
 * @param  {String} [referrer] - (optional) referring URL
 * @param  {String} [currentUrl] - (optional) the current url
 * @return {ReferrerObject}     [description]
 */
export function parseReferrer(referrer?: string | undefined, currentUrl?: string | undefined): ReferrerObject;
export type ReferrerObject = {
    campaign: string;
    referrer?: string;
} & DomainObject & {
    [x: string]: any;
};
export type DomainObject = {
    source: string;
    medium: string;
    term?: string;
};
