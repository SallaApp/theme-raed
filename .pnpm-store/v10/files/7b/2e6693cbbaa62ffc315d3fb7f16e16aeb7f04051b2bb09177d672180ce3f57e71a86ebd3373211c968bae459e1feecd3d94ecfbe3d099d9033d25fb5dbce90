export default interface Cookie {
    get: (key: string) => string;
    set: (key: string, value: string | number | Array<string | number> | '', days?: number) => Cookie;
    remove: (key: string) => Cookie;
    clearAll: (force?: boolean) => void;
}
