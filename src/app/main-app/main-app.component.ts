import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/shared/services/app-state.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {

  constructor(
    public breakpointObserver: BreakpointObserver,
    public appStateService: AppStateService
  ) { }

  ngOnInit(): void {
  }

  get isWeb() {
    return this.breakpointObserver.isMatched(Breakpoints.Web)
  }

}
