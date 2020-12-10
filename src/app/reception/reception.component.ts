import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationComponent } from '../authentication/authentication.component';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  constructor(
    public breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
  }

  openLoginModal(): void {
    this.dialog.open(AuthenticationComponent, {
      data: { registerComponentVisible: false },
    })
  }

  openRegisterModal(): void {
    this.dialog.open(AuthenticationComponent, {
      data: { registerComponentVisible: true },
    })
  }

  get isWeb() {
    return this.breakpointObserver.isMatched(Breakpoints.Web)
  }

}
