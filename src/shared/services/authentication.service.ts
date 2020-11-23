import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/shared/models/user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(public http: HttpClient, private router: Router, private dialog: MatDialog,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user: User) {
    const req = this.http.post<any>(environment.apiUrl + `login`, { username: user.username, password: user.password }, { withCredentials: true })
      .pipe(map(response => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.router.navigate(['/home']);
        return user;
      })

      )
    return req;
  }

  logout() {
    this.dialog.closeAll();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['']);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
