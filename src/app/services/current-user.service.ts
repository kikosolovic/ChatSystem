import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CurrentUserService {


  
  currentUser$ = new BehaviorSubject<{ first: string; last: string } | null>(
    null
  );


  // getStatus(logged : boolean){
  //   localStorage.setItem("status" , logged)
  // }
  setCurrentUser(firstname: string, lastname: string) {
    this.currentUser$.next({ first: firstname, last: lastname });
  }
}
