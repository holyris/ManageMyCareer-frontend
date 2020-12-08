import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {
  registerComponentVisible: boolean = false;

  constructor(private router: Router, public authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/files']);
    }
  }

  ngOnInit(): void {
  }

}
