import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUserService } from '../services/api-users.service';

@Component({
  selector: 'app-session-end',
  templateUrl: './session-end.component.html',
  styleUrls: ['./session-end.component.css'],
})
export class SessionEndComponent implements OnInit {
  chars: number;
  time: string;

  constructor(private router: Router, private api: ApiUserService) {}

  close() {
    // this.router.navigate(['login']);
    localStorage.setItem('loggedin', 'false');
    window.location.href = 'https://angular-puuty1.stackblitz.io/login';
  }
  ngOnInit() {
    this.time = this.api.getLoggedInTime().toTimeString().split(' ')[0];
    this.chars = this.api.getResChar();
  }
}
