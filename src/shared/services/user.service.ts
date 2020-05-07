import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from 'src/shared/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  private url = 'http://localhost:8080/';  // URL to web api
  private httpHeaders = new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Method': 'GET, POST, OPTIONS, DELETE',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With,X-HTTP-Method-Override, Content-Type, Accept, Authorization"
  });


  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(this.url + `users/list`);
  }

  register(user: User) {
    return this.http.post<any>(this.url + `users/create_user`, {
      username: user.username, password: user.password
    }
    );
  }

  delete(id: string) {
    return this.http.delete(this.url + `users/` + id);

  }
}