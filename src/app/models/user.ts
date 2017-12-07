import { Device } from "./device";

export class AppUser {
    userId: string;
    name: string;
    email: string;
    isAdmin: boolean;
    issuedDevices: string[];
    requestedDevices: string[];

    constructor(userId: string, name: string, email: string, isAdmin: boolean,
        issuedDevices: string[], requestedDevices: string[]) {
            this.userId = userId;
            this.name = name;
            this.email = email;
            this.isAdmin = isAdmin;
            this.issuedDevices = issuedDevices;
            this.requestedDevices = requestedDevices;
    }
}