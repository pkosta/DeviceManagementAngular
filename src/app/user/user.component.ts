import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users$: Observable<{}>;

  constructor(private userService: UserService) {
    this.users$ = this.userService.getAllUsers$();
    this.users$.subscribe(users => {
      console.log("User Subscription");
    });
  }

}
