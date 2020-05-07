import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { UserService } from 'src/shared/services/user.service';
import { User } from 'src/shared/models/user';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  passwordChecker: string;
  form: FormGroup;
  loading: Boolean = false;
  alertMsg: any = "";
  isAlerting: Boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, public authenticationService: AuthenticationService, public userService: UserService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordChecker: ['', [Validators.required]],
    }, { validator: this.passwordMatcher });
  }

  onSubmit() {
    this.loading = true;
    this.resetAlert();
    const user = new User(this.form.value.username, this.form.value.password);
    this.userService.register(user)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/account-creation-confirmation']);
        },
        error => {
          console.log(error)
          error = "Cet utilisateur existe déjà";
          this.alert(error)
          this.loading = false;
        });

  }

  alert(error){
    this.alertMsg = error;
    this.isAlerting = true;
  }

  resetAlert(){
    this.alertMsg = "";
    this.isAlerting = false;
  }

  passwordMatcher(form: FormGroup) {
    let pass = form.get('password').value;
    let passwordChecker = form.get('passwordChecker').value;
    return pass === passwordChecker ? null : { notSame: true }
  }
}

