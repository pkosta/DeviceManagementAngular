import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { UserService } from './user.service';
import { DeviceService } from './device.service';
import { EDeviceStatus } from './models/devicestatus.enum';
import { RequestType } from './models/requesttype.enum';
import { Device } from './models/device';
import { AppUser } from './models/user';
import { error } from 'util';
/**
 * Responsibility: Manage the flow of the application...will be gone through this
 * service.
 * 
 * Flow 1: User request the device
 * 1. Add worklist to admin user
 * 2. Add requestDevice to acting user
 * 3. Add userId attribute to requested device
 * 4. Change the device status to Requested
 * 
 * Flow 2: Admin accept the device request
 * 1. Remove from worklist of admin
 * 2. Remove the device from request list of acting user
 * 3. Add device to device list of acting user
 * 4. (Keep the user id in the device) - No implementation needed
 * 5. Change the device status to Issued
 * 
 * Flow 3: Admin rejects the device request
 * 1. Remove from worklist of admin
 * 2. Remove the device from request list of acting user
 * 3. Remove the user id from the device
 * 4. Change the device status to Available
 * 
 * Flow 4: User withdraw the request of device
 * 1. Remove from worklist of admin
 * 2. Remove the device from request list of acting user
 * 3. Remove userId attribute from requested device
 * 4. Change the device status to Available
 * 
 * Flow 5: User initiate the return request
 * 1. Add item to worklist of admin for return request
 * 2. Change the device status to Return Requested
 * 
 * Flow 6: Admin accept the return request
 * 1. Remove from worklist of admin
 * 2. Remove the device from request list of acting user
 * 3. Remove userId attribute from requested device
 * 4. Change the device status to Available
 */
@Injectable()
export class WorkflowService {

  private adminUserId: string = "OVUwnileCmen7mYdv8igaqCwQ5c2";

  constructor(
    private deviceService: DeviceService,
    private userService: UserService) { }

  /**
   * Flow 1: User request the device
   * @param deviceId 
   * @param userId 
   */
  public requestDeviceForId(device: Device, appUser: AppUser): Promise<any> {
    let deviceId = device.deviceAssetId;
    let userId = appUser.userId;
    // TODO:- Need to do inside the transaction
    // Add worklist to admin user
    let worklistPromise = this.addDeviceToWorklist(deviceId,
      userId, RequestType.REQUEST_DEVICE, device.deviceName, appUser.name);
    // Add requestDevice to acting user
    let requestListPromise = this.addDeviceToRequestList(userId, deviceId);
    // Add user id attribute to requested device
    let userIdPromise = this.addUserIdToDevice(userId, deviceId);
    // Change the device status
    let changeStatusPromise =
      this.changeDeviceStatus(deviceId, EDeviceStatus.Requested)

    return Promise.all([worklistPromise, requestListPromise,
      userIdPromise, changeStatusPromise]);
  }

  /**
   * Flow 2: Admin accept the device request
   * @param deviceId 
   * @param userId 
   */
  // admin
  public acceptDeviceRequestForId(deviceId: string, userId: string): Promise<any> {
    // Remove from the worklist
    let workListPromise = this.removeDeviceFromWorklist(deviceId);
    // Add device to acting user
    let deviceListPromise = this.addDeviceToDeviceList(userId, deviceId);
    // Remove the device from user
    let removeDevicePromise = this.removeDeviceFromRequestList(userId, deviceId);
    // Change the device status
    let changeStatusPromise = this.changeDeviceStatus(deviceId, EDeviceStatus.Issued);

    return Promise.all([workListPromise, deviceListPromise,
      removeDevicePromise, changeStatusPromise]);
  }

  /**
   * Flow 3: Admin rejects the device request
   * @param deviceId 
   * @param userId 
   */
  // admin
  public rejectDeviceRequestForId(deviceId: string, userId: string): Promise<any> {
    // Remove from the worklist
    let workListPromise = this.removeDeviceFromWorklist(deviceId);
    // Remove the device from user
    let removeDevicePromise = this.removeDeviceFromRequestList(userId, deviceId);
    // Remove user id from the device
    let userIdPromise = this.removeUserIdFromDevice(userId, deviceId);
    // Change the device status
    let changeStatusPromise = this.changeDeviceStatus(deviceId, EDeviceStatus.Available)

    return Promise.all([workListPromise, removeDevicePromise,
      userIdPromise, changeStatusPromise]);
  }

  /**
   * Flow 4: User withdraw the request of device
   * @param deviceId 
   * @param userId 
   */
  public withdrawDeviceRequestForId(deviceId: string, userId: string): Promise<any> {
    // Remove from the worklist
    let workListPromise = this.removeDeviceFromWorklist(deviceId);
    // Remove the device from user
    let requestListPromise = this.removeDeviceFromRequestList(userId, deviceId);
    // Remove userId attribute from requested device
    let userIdPromise = this.removeUserIdFromDevice(userId, deviceId);
    // Change the device status to Available
    let changeStatusPromise = this.changeDeviceStatus(deviceId, EDeviceStatus.Available)

    return Promise.all([workListPromise, requestListPromise,
      userIdPromise, changeStatusPromise]);
  }

  /**
   * Flow 5: User initiate the device return request
   * @param deviceId 
   * @param userId 
   */
  public returnRequestForId(device: Device, appUser: AppUser): Promise<any> {
    let deviceId = device.deviceAssetId;
    let userId = appUser.userId;
    // Add the item into the worklist
    let workListPromise = this.addDeviceToWorklist(deviceId, userId,
      RequestType.RETURN_DEVICE, device.deviceName, appUser.name);
    // change the status to available
    let changeStatusPromise = this.changeDeviceStatus(deviceId,
      EDeviceStatus.Return_Requested);

    return Promise.all([workListPromise, changeStatusPromise]);
  }

  /**
   * Flow 6: Admin accept the return request
   * @param deviceId 
   * @param userId 
   */
  public acceptReturnRequestForId(deviceId: string, userId: string): Promise<any> {
    // Remove from the worklist
    let workListPromise = this.removeDeviceFromWorklist(deviceId);
    // Remove the device from user
    let requestListPromise = this.removeDeviceFromDeviceList(userId, deviceId);
    // Remove userId attribute from requested device
    let userIdPromise = this.removeUserIdFromDevice(userId, deviceId);
    // Change the device status to Available
    let changeStatusPromise = this.changeDeviceStatus(deviceId, EDeviceStatus.Available)

    return Promise.all([workListPromise, requestListPromise,
      userIdPromise, changeStatusPromise]);
  }

  /**
   * Private Methods --- Implementation Details
   */
  private addDeviceToWorklist(
    deviceId: string,
    userId: string,
    requestType: RequestType,
    deviceName: string,
    userName: string) {
    this.userService.addDeviceToWorklist(
      this.adminUserId, userId, deviceId,
      requestType, deviceName, userName);
  }

  private removeDeviceFromWorklist(deviceId: string) {
    this.userService.removeDeviceFromWorklist(this.adminUserId, deviceId);
  }

  private addDeviceToRequestList(userId: string, deviceId: string) {
    return this.userService.addDeviceToRequestList(userId, deviceId);
  }

  private removeDeviceFromRequestList(userId: string, deviceId: string) {
    return this.userService.removeDeviceFromRequestList(userId, deviceId);
  }

  private addDeviceToDeviceList(userId: string, deviceId: string) {
    return this.userService.addDeviceToDeviceList(userId, deviceId);
  }

  private removeDeviceFromDeviceList(userId: string, deviceId: string) {
    return this.userService.removeDeviceFromDeviceList(userId, deviceId);
  }

  private addUserIdToDevice(userId: string, deviceId: string) {
    return this.deviceService.addUserIdToDevice(deviceId, userId);
  }

  private removeUserIdFromDevice(userId: string, deviceId: string) {
    return this.deviceService.removeUserIdFromDevice(deviceId, userId);
  }

  private changeDeviceStatus(deviceId: string, status: EDeviceStatus) {
    return this.deviceService.updateDeviceStatus(deviceId, status);
  }

}
