import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'homepage';

  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
}
