import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../shared/service/Authenticator.service';
import { first } from 'rxjs';
import { FixChangeDetection } from '../shared/directive/FixChangeDetection';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FixChangeDetection implements OnInit {

  validForm: boolean = false;
  error: string = '';
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authenticatorService: AuthenticatorService
  ) { super(); }

  ngOnInit(): void {
    this.authenticatorService.isLoginCallWithReroute("/home");
  }

  login() {
    this.authenticatorService.login({ username: this.username, password: this.password }).pipe(first()).subscribe(
      async res => {
        await this.authenticatorService.autoUpdateUserWithJwt(res.jwt!);
        this.router.navigate(['home'])
      },
      error => {
        this.error = error.error.message;
      }
    );
  }

  healthCheck(): void {
    this.authenticatorService.healthCheck().pipe(first()).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
