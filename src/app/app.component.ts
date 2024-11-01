import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber, Subscription, of, from, Subject } from 'rxjs';
import { subscribeToArray } from 'rxjs/internal/util/subscribeToArray';
import { ApiUserService } from './services/api-users.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router,private api:ApiUserService) {}
  ngOnInit(): void {
    localStorage.setItem('loggedin', 'false');
    localStorage.setItem('detail', 'false');
    localStorage.removeItem('history');
  }
  @HostListener('document:click', ['$event'])
  onGlobalClick(event: MouseEvent) {
    this.api.AddClick();
  }
}
