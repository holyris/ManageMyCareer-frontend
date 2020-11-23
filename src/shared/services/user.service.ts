import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from 'src/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {

  private httpHeaders = new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Method': 'GET, POST, OPTIONS, DELETE',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With,X-HTTP-Method-Override, Content-Type, Accept, Authorization"
  });


  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(environment.apiUrl + `users/list`);
  }

  register(user: User) {
    return this.http.post<any>(environment.apiUrl + `users/create_user`, {
      username: user.username, password: user.password
    }
    );
  }

  delete(id: string) {
    return this.http.delete(environment.apiUrl + `users/` + id);

  }
}