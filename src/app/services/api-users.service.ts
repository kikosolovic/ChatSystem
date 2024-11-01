import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { CurrentUser } from '../models/current-user';

class History {
  user: User;
  conversation: { messageUser: string; message: string; messageTime: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiUserService implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  currentUser: CurrentUser;
  SelectedUser: User;
  testUser: Subject<User> = new Subject<User>();
  activeChat: Subject<User> = new Subject<User>();
  historyList: History[] = [];
  lastHistory: History;
  historyListSubject: Subject<History[]> = new Subject<History[]>();
  clearRightPartChat: Subject<void> = new Subject<void>();
  historyDetails: Subject<void> = new Subject<void>();
  userChar: number = 0;
  userCharSubject: Subject<number> = new Subject<number>();
  resChar: number = 0;
  resCharSubject: Subject<number> = new Subject<number>();
  chatsStarted: number = 0;
  chatsStartedSubject: Subject<number> = new Subject<number>();
  loggedIn: Date;

  historyActiveUser: User;
  public users: User[];

  private click = new Subject<number>();
  click$ = this.click.asObservable();

  users$: Observable<User[]>;

  getUsers(): Observable<User[]> {
    return this.http.get<any>('https://dummyjson.com/users').pipe(
      map((response) => {
        this.users = response.users.map((userData: any) => ({
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          birthdate: userData.birthDate,
          image: userData.image,
          eyeColor: userData.eyeColor,
          university: userData.university,
          macAddress: userData.macAddress,
          ip: userData.ip,
          city: userData.address.city,
          mail: userData.email,
          postalCode: userData.address.postalCode,
        }));
        return this.users;
      })
    );
  }

  loadUsers() {
    this.users$ = this.getUsers();
    this.users$.subscribe((users) => {
      this.users = users.filter(
        (user) => user.firstName !== this.currentUser.firstName
      );
    });
  }
  selectedUser: User;

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }

  getSelectedUser() {
    return this.selectedUser;
  }

  ngOnInit() {
    this.getUsers().subscribe((user) => (this.users = user));
  }

  postData(text: string) {
    const body = { text: text };
    return this.http.post('https://httpbin.org/post', body);
  }

  getLoggedInTime() {
    return new Date(Date.now() - this.loggedIn.getTime() - 3600000);
  }

  addUserChar(lenght: number) {
    this.userChar = this.userChar + lenght;
    this.userCharSubject.next(this.userChar);
  }

  addResChar(lenght: number) {
    this.resChar = this.resChar + lenght;
  }

  getResChar() {
    return this.resChar;
  }

  detailEmit() {
    this.historyDetails.next();
  }

  beginChat(user: User) {
    this.activeChat.next(user);
    this.clearRightPartChat.next();
  }

  updateHistory() {
    this.historyListSubject.next(this.historyList);
  }

  historyMessage(messageUser: User, message: string) {
    if (this.historyActiveUser == messageUser && this.historyList.length) {
      this.historyList[this.historyList.length - 1].conversation.push({
        messageUser: 'vy',
        messageTime: new Date().toTimeString().split(' ')[0],
        message: message,
      });
    } else {
      this.chatsStarted++;
      this.chatsStartedSubject.next(this.chatsStarted);
      this.historyActiveUser = messageUser;
      let hist = new History();
      hist.user = messageUser;
      hist.conversation = [];

      hist.conversation.push({
        messageUser: 'vy',
        messageTime: new Date().toTimeString().split(' ')[0],
        message: message,
      });

      this.historyList.push(hist);
    }

    this.historyListSubject.next(this.historyList);

    this.postData(message).subscribe(
      (response) => {
        this.historyList[this.historyList.length - 1].conversation.push({
          messageUser: messageUser['username'],
          messageTime: new Date().toTimeString().split(' ')[0],
          message: this.getA(response['json']['text'].length).concat(
            String(response['origin'][response['origin'].length - 1])
          ),
        });
      },
      (error) => {
        this.historyList[this.historyList.length - 1].conversation.push({
          messageUser: 'error',
          messageTime: new Date().toTimeString().split(' ')[0],
          message: error['message'],
        });
        console.error(error);
      }
    );

    this.historyListSubject.next(this.historyList);
    localStorage.setItem('history', JSON.stringify(this.historyList));
  }

  getA(num: number): string {
    this.addResChar(num + 1);
    return 'A'.repeat(num);
  }

  addSingleUser(user: User) {
    this.selectedUser = user;
    this.testUser.next(user);
  }

  getSingleUser() {
    return this.selectedUser;
  }

  addUsers(user: User) {
    this.users.push(user);
  }

  getAllUsers() {
    return this.users;
  }

  deleteAllUsers() {
    this.users = [];
  }

  addCurrenttUser(user: CurrentUser) {
    this.loggedIn = user.loginTime;
    this.currentUser = user;
  }
  getCurrentUser() {
    return this.currentUser;
  }

  AddClick() {
    this.currentUser.clicks++;
  }

  getUser() {
    return this.currentUser;
  }
  // deleteCurrent(){

  //   console.log('test',this.currentUser)
  //   this.users.forEach((user,index)=>{
  //   if (user.lastName == this.currentUser.lastName)
  //     delete this.users[index]
  //   })
  //   // this.users = this.users.filter(
  //   //   (user) =>
  //   //     user.firstName == this.currentUser.firstName &&
  //   //     user.lastName == this.currentUser.lastName
  //   // );
  //   console.log('test2',this.users)
}
