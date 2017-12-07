import { Device } from "./device";

export class AppUser {
    userId: string;
    name: string;
    email: string;
    isAdmin: boolean;
    issuedDevices: string[];
    requestedDevices: string[];
    imageUrl: string;

    constructor(userId: string, name: string, email: string, isAdmin: boolean,
        issuedDevices: string[], requestedDevices: string[], imageUrl: string) {
            this.userId = userId;
            this.name = name;
            this.email = email;
            this.isAdmin = isAdmin;
            this.issuedDevices = issuedDevices;
            this.requestedDevices = requestedDevices;
            this.imageUrl = imageUrl;
    }
}