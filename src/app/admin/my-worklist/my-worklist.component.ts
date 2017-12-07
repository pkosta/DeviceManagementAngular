import { Component, OnInit } from '@angular/core';
import { UserWorklist } from '../../models/worklist';
import { UserService } from '../../user.service';
import { AuthService } from '../../auth.service';
import { WorkflowService } from '../../workflow.service';
import { RequestType } from '../../models/requesttype.enum';

@Component({
  selector: 'app-my-worklist',
  templateUrl: './my-worklist.component.html',
  styleUrls: ['./my-worklist.component.css']
})
export class MyWorklistComponent implements OnInit {

  userWorklist: UserWorklist[] = [];

  constructor(
    private workflowService: WorkflowService,
    private authService: AuthService,
    private userService: UserService) {

    this.authService.getLoggedInUser(loggedInUser => {
      this.userService.getWorklistForUserId(loggedInUser.userId, worklist => {
        this.userWorklist = worklist;
      });
    })
  }

  ngOnInit() {
  }

  public onAcceptRequest(userWorklist: UserWorklist) {
    switch (userWorklist.requestType) {
      case RequestType.REQUEST_DEVICE:
        this.workflowService.acceptDeviceRequestForId(userWorklist.deviceAssetId,
          userWorklist.userId);
        break;
      case RequestType.RETURN_DEVICE:
        this.workflowService.acceptReturnRequestForId(userWorklist.deviceAssetId,
          userWorklist.userId);
        break;
    }
  }

  public onRejectRequest(userWorklist: UserWorklist) {
    switch (userWorklist.requestType) {
      case RequestType.REQUEST_DEVICE:
        this.workflowService.rejectDeviceRequestForId(userWorklist.deviceAssetId,
          userWorklist.userId);
        break;
      // case RequestType.RETURN_DEVICE:
      //   this.workflowService.rejectDeviceRequestForId(userWorklist.deviceAssetId,
      //     userWorklist.userId);
      //   break;
    }
  }

  isReturnRequest(userWorklist: UserWorklist) {
    if (userWorklist.requestType == RequestType.RETURN_DEVICE) {
      return true;
    } else {
      return false;
    }
  }

}
