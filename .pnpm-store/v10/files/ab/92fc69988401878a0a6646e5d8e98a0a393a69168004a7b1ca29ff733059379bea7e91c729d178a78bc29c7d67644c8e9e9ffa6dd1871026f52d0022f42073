import SallaType from "./index";

declare const Salla: any;
declare const salla: any;
declare global {
    interface Window {
      dataLayer?: Array<any>;
      webkit?: any;
      Android?: any;
      flutter_inappwebview?: any;
      salla: SallaType|any;
      Salla: SallaType|any;
      ApplePaySession?: typeof ApplePaySession;
    }
    interface String {
      toStudlyCase(): string;
      toDatasetName(): string;
      toSelector(): string;
      replaceArray(find:string, replace:string): string;
      rtrim(s?:string): string;
      ltrim(s?:string): string;
      digitsOnly(): string;
    }
    let salla: SallaType|any;
    let Salla: SallaType|any;
  }