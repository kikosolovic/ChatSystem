
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Test } from '../models/test';
import { User } from '../models/user';
import { ApiUserService } from '../services/api-users.service';
import { AuthGuard } from '../Guard/auth.guard';

import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
// export class CurrentUser{
//   currentUser: User
// }
export class LoginComponent implements OnInit {
  users: User[] = [];
  loggedIN: boolean = false;

  first = new FormControl('');
  last = new FormControl('');

  constructor(
    private api: ApiUserService,
    private router: Router,
    private current: CurrentUserService
  ) {}

  // name: string, lastname : string
  checkCredentials() {
    // console.log(this.api.users);
    let usr = this.api.users.find(
      (user) =>
        user.firstName == this.first.value && user.lastName == this.last.value
    );
    if (usr) {
      // console.log('je tu');
      this.current.setCurrentUser(this.first.value, this.last.value);
      localStorage.setItem('loggedin', 'true');
      this.api.addCurrenttUser({
        firstName: this.first.value,
        lastName: this.last.value,
        loginTime: new Date(),
        clicks: 0,
        chars: 0,
        chats: 0,
      });
      this.router.navigate(['/main']);
    } else {
      console.log('nespravne udaje');
      // window.location.href = 'https://angular-puuty1.stackblitz.io/login';
    }
  }

  ngOnInit() {
    this.api.loadUsers();
  }
}
