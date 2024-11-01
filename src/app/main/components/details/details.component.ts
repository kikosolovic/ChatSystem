import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../../models/user';
import { ApiUserService } from '../../../services/api-users.service';
import { MainComponent } from '../../main.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    public api: ApiUserService,
    private http: HttpClient,
    private main: MainComponent
  ) {}
  selectedUser: User;

  user: ApiUserService['selectedUser'];
  properties: string[] = [
    'firstName',
    'lastName',
    'username',
    'birthdate',
    'eyeColor',
    'university',
    'macAddress',
    'ip',
    'city',
    'postalCode',
  ];
  gender: string;
  country: string;
  genderString: string = 'https://api.genderize.io?name=';
  postalcodeString: string = 'https://api.zippopotam.us/us/';
  @Output() detailEmit = new EventEmitter<boolean>();

  close() {
    this.main.detail = false;
  }

  ngOnInit() {
    this.user = this.api.getSingleUser();
    console.log(this.user);
    this.http
      .get(this.genderString + this.user[this.properties[0]])
      .subscribe((res) => {
        this.gender = res['gender'];
      });
    this.http
      .get(this.postalcodeString + this.user['postalCode'])
      .subscribe((res) => {
        this.country = res['country'];
      });
    this.api.testUser.subscribe((res: ApiUserService['selectedUser']) => {
      this.user = res;
    });
  }
  details(user: User) {
    console.log(this.selectedUser);
    this.selectedUser = user;
    console.log(this.selectedUser);
  }

  // ngOnInit() {
  //   this.api.loadUsers();
  //   // this.selectedUser = this.api.getSelectedUser();
  //   console.log('user', this.selectedUser);
  // }
}
