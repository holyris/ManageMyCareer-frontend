import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public sidenavVisible: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => this.sidenavVisible = false);
  }
}
