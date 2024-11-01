import { Component, Input, OnInit } from '@angular/core';
import { ApiUserService } from '../services/api-users.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CurrentUser } from '../models/current-user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(public api: ApiUserService, private router: Router) {}
  detail: boolean = false;
  currentUser = this.api.getCurrentUser();
  charCount: number;
  chatCount: number;
  show(): void {
    console.log(this.api.users);
  }
  logout() {
    this.router.navigate(['sessionend']);
  }
  ngOnInit() {
    this.api.loadUsers();
    this.api.userCharSubject.subscribe((res: number) => {
      this.charCount = res;
    });
    this.api.chatsStartedSubject.subscribe((res: number) => {
      this.chatCount = res;
    });
  }
}
