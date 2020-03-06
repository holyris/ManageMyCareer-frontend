import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [];
  loggedUser;
  constructor() { }

  public register(username: String, password: String) {
    if (!this.connected()) {
      const user = { username: username, password: password };

      this.users.push(user);
      this.loggedUser = user;
    }
  }

  public connect(username: String, password: String){
    for(const user of this.users){
      if(user.username === username && user.password === password){
        console.log("ehp")
        this.loggedUser = user;
      }
    }
  }

  public disconnect() {
    const index = this.users.indexOf(this.loggedUser);
    this.loggedUser = null;
  }

  public getLoggedUser() {
    return this.loggedUser;
  }

  public connected() {
    return this.loggedUser != null;
  }


}
