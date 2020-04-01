import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username: String;
  password: String;
  passwordChecker: String;
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
      passwordChecker: ['', [Validators.required]],
    }, { validator: this.passwordMatcher });
  }

  onSubmit() {
    this.authenticationService.login(this.username, this.password);
    this.router.navigate(['/']);

  }

  passwordMatcher(form: FormGroup) {

    let pass = form.get('password').value;
    let passwordChecker = form.get('passwordChecker').value;
    return pass === passwordChecker ? null : { notSame: true }

    // return (control: AbstractControl): { [key: string]: any } | null => {
    //   console.log(form.get('password').value);
    //   let passwordChecker = control.value;
    //   if (passwordChecker !== "3") {
    //     return {
    //       'Ne correspond pas': { value: control.value }
    //     }
    //   }
    //   return null
    // };

  }
}

