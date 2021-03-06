import { EDeviceStatus } from "./devicestatus.enum";
import { EDeviceCardButtonVisible } from "./card.device.button.visible.enum";

export class Device {
    deviceAssetId: string;
    deviceName: string;
    deviceDescription: string;
    deviceOs: string = "";
    deviceOsName: string;
    deviceOsVersion: string;
    deviceSize: string;
    deviceStatus: EDeviceStatus = EDeviceStatus.Default;
    deviceColor: string;
    deviceUrl: string;
    deviceInventoryId: string = "";
    userId: string;
    timestamp: string;

    constructor() {
        // initialize the property
        this.deviceOs = "";
        this.deviceStatus = EDeviceStatus.Default;
        this.deviceInventoryId = "";
        this.userId = null;
        this.deviceUrl = "https://c1.staticflickr.com/6/5578/13444981375_28c754e5d8_b.jpg";
    }

    public isDeviceAvailable = () => {
        if (this.deviceStatus == EDeviceStatus.Available
            || this.deviceStatus == EDeviceStatus.Default) {
            return true;
        }
        return false;
    }

    public isDeviceIssued(): boolean {
        if (this.deviceStatus == EDeviceStatus.Issued) {
            return true;
        }
        return false;
    }

    public isDeviceRequested(): boolean {
        if (this.deviceStatus == EDeviceStatus.Requested) {
            return true;
        }
        return false;
    }

    public isDeviceReturnRequested(): boolean {
        if (this.deviceStatus == EDeviceStatus.Return_Requested) {
            return true;
        }
        return false;
    }

    public getDeviceStatus() {
        return this.deviceStatus;
    }

    private getCardButton(loggedInUserId: string) {
        console.log(this.deviceName, this.deviceStatus);
        if (this.deviceStatus === EDeviceStatus.Available
            || this.deviceStatus === EDeviceStatus.Default) {
            return EDeviceCardButtonVisible.REQUEST_BUTTON;
        }

        // you cannot do anything if it is in requested or issued state and
        // no user id present -- button disable
        if (!this.userId || this.userId != loggedInUserId) {
            return EDeviceCardButtonVisible.NO_BUTTON;
        }

        if (this.deviceStatus === EDeviceStatus.Requested) {
            return EDeviceCardButtonVisible.CANCEL_BUTTON;
        }
        if (this.deviceStatus === EDeviceStatus.Issued) {
            return EDeviceCardButtonVisible.RETURN_BUTTON;
        }
    }
}