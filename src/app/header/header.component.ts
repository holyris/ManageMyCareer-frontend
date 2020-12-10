import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { User } from 'src/shared/models/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AppStateService } from 'src/shared/services/app-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor(
    public authenticationService: AuthenticationService,
    public breakpointObserver: BreakpointObserver,
    public appStateService: AppStateService 
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x
    }
    );
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }

  get isWeb() {
    return this.breakpointObserver.isMatched(Breakpoints.Web)
  }

}
