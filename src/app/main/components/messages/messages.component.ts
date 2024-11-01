import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiUserService } from '../../../services/api-users.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  text: string;
  user: ApiUserService['selectedUser'];
  history: ApiUserService['historyList'];
  lastHistory: ApiUserService['lastHistory'];
  private subscription: Subscription;
  clear: boolean = false;

  constructor(
    private router: Router,
    private api: ApiUserService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.subscription = this.api.activeChat.subscribe(
      (res: ApiUserService['selectedUser']) => {
        this.user = res;
      }
    );

    this.api.clearRightPartChat.subscribe(() => {
      this.clearChat();
      // this.child.clearChat();
    });

    this.api.historyListSubject.subscribe(
      (res: ApiUserService['historyList']) => {
        this.history = res;
        this.lastHistory = this.history[res.length - 1];
      }
    );
  }

  clearChat() {
    this.clear = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  formSubmit() {
    this.clear = false;
    this.api.addUserChar(this.text.length)
    this.api.historyMessage(this.user, this.text);
  }

}