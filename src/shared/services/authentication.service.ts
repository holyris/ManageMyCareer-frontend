import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/shared/models/user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = 'http://localhost:8080/';  // URL to web api

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(public http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user: User) {
    const req = this.http.post<any>(this.url + `login`, { username: user.username, password: user.password }, {withCredentials: true})
      .pipe(map(response => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    
      )
    return req;
    // var user = new User;
    // user.username = username;
    // user.password = password;
    // localStorage.setItem('currentUser', JSON.stringify(user));
    // this.currentUserSubject.next(user);
    // return user;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
