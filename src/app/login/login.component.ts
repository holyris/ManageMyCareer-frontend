import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { first } from 'rxjs/operators';
import { User } from 'src/shared/models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, public authenticationService: AuthenticationService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.authenticationService.login(new User(this.form.value.username, this.form.value.password))
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error)
      });
    // this.router.navigate(['/home']);

  }
}
