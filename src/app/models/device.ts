export class Device {
    deviceAssetId: string;
    deviceName: string;
    deviceDescription: string;
    deviceOs: string = "";
    deviceOsName: string;
    deviceOsVersion: string;
    deviceSize: string;
    deviceStatus: string = "";
    deviceColor: string;
    deviceUrl: string;
    deviceInventoryId: string = "";

    constructor() {
        // initialize the property
        this.deviceOs = "";
        this.deviceStatus = "";
        this.deviceInventoryId = "";

        this.deviceUrl= "https://c1.staticflickr.com/6/5578/13444981375_28c754e5d8_b.jpg";
    }
}