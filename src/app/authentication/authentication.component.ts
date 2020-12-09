import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  registerComponentVisible: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
    private router: Router, public authenticationService: AuthenticationService,
    public breakpointObserver: BreakpointObserver,
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/files']);
    }

    if(this.injectedData) this.registerComponentVisible = this.injectedData.registerComponentVisible
  }

  ngOnInit(): void {
  }

  get isWeb() {
    return this.breakpointObserver.isMatched(Breakpoints.Web)
  }

}
