import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/shared/models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject : BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username, password) {
    var user = new User;
    user.username=username;
    user.password=password;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return user;
  }

  logout() {
    localStorage.removeItem('currentUser');  
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}
}
