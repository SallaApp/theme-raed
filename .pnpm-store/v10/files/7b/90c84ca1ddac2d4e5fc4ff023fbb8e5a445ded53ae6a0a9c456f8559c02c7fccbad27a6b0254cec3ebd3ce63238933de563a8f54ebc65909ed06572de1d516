import { ProfileResponse } from "../api/profile";
import { RequestErrorEvent, SuccessResponse } from "../common";

export default interface ProfileEvent {
    onUpdated: (callback: (response: ProfileResponse) => void) => void;
    onVerified: (callback: (response: SuccessResponse) => void) => void;
    onVerificationCodeSent: (callback: (response: ProfileResponse) => void) => void; //should trigger action to fill verify code, then calling salla.profile.verify(...)

    //errors
    onUpdateFailed: RequestErrorEvent;
    onUnverified: RequestErrorEvent;
    onUpdateContactsFailed: RequestErrorEvent;

    onSettingsUpdated: (callback: (response: SuccessResponse) => void) => void;
    onUpdateSettingsFailed: RequestErrorEvent;

    onDeleted: (callback: (response: SuccessResponse) => void) => void;
    onNotDeleted: RequestErrorEvent;
}