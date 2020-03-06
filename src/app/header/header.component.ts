import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: String;
  password: String;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  connect(){
    this.userService.connect(this.username, this.password);

  }
}
