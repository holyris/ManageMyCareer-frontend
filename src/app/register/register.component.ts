import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: String;
  password: String;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  register(){
    this.userService.register(this.username, this.password);
  }

}
