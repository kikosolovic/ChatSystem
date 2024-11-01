import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../../../services/api-users.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history: ApiUserService['historyList'];
  lastKnownHistory: ApiUserService['historyList'];

  constructor(private userService: ApiUserService) {}

  ngOnInit() {
    const savedHistory = localStorage.getItem('history');
    if (savedHistory) {
      this.lastKnownHistory = JSON.parse(savedHistory);
    }

    this.userService.historyListSubject.subscribe(
      (res: ApiUserService['historyList']) => {
        this.history = res;
        this.saveHistoryToLocalStorage();
      }
    );
    this.userService.updateHistory();
  }

  saveHistoryToLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this.history));
  }
}