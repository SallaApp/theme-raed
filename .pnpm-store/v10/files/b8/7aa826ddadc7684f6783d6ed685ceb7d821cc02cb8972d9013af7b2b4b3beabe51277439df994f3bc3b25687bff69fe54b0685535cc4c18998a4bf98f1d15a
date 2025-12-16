import Emitter from "./event";
import Config from "./config";
import { Price } from "./common";
import Helpers, { UrlHelpers } from "./helpers";
import Logger from "./logger";
import IStorage from "./storage";
import Cookie from "./cookie";

export default interface Salla {
  event: Emitter;
  config: Config | any;
  storage: IStorage;
  cookie: Cookie;
  logger: Logger;
  log: (message: string, data?: any) => void;
  helpers: Helpers;
  money: (money: number | Price) => string;
  url: UrlHelpers;
}