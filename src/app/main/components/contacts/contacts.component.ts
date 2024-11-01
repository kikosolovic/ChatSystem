import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CurrentUser } from '../../../models/current-user';
import { User } from '../../../models/user';
import { ApiUserService } from '../../../services/api-users.service';
import { MainComponent } from '../../main.component';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  constructor(
    public api: ApiUserService,
    public com: DetailsComponent,
    private main: MainComponent
  ) {}
  toggle: boolean[] = [];
  users: User[];
  @Output() detailEmit = new EventEmitter<boolean>();

  options(user: User) {
    console.log('clicked');
    this.com.details(user);
  }

  detail(user: ApiUserService['selectedUser']) {
    this.api.addSingleUser(user);
    // this.detailEmit.emit(true);
    this.api.detailEmit();
    this.main.detail = true;
  }

  chat(user: ApiUserService['selectedUser']) {
    this.api.beginChat(user);
  }
  initializeToggleArray(): void {
    this.api.users.forEach(() => {
      this.toggle.push(false);
    });
  }
  // checkCurrent() {
  //   let current: CurrentUser = this.api.getCurrentUser();
  //   console.log('current', current);
  //   // this.users = this.users.filter((user)=> user.lastName == current.lastName)
  //   // this.users.forEach((user,index)=>
  //   // {
  //   //   if(user.firstName==current.firstName){
  //   //     this.users.splice(index,1)
  //   //   }
  //   // })
  //   console.log(this.api.users);
  //   let i = this.api.users.findIndex(
  //     (user) => user.lastName == current.lastName
  //   );
  //   console.log(i);
  //   // delete this.api.users[i];
  //   this.api.users = this.api.users.splice(i,1)
  //   console.log(this.api.users);
  // }
  ngOnInit() {
    this.api.loadUsers();
    this.initializeToggleArray();
    // this.checkCurrent();
  }
}
