import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpSpaceMeService } from '../http-space-me.service';
import { LoginService } from '../login.service';

import { getQueryValue } from '@angular/core/src/view/query';
import { QueryBindingType } from '@angular/compiler/src/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    protected service: HttpSpaceMeService,
    protected loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
     this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      account: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginSubmit(formValue) {
    // 自己改成querystring !
    const account = formValue.account;
    const password = formValue.password;

     // console.log( "querydata: " + this.loginService.getQueryData(formValue)); doesn't work lol...
    this.loginService.loginChecker(account, password).subscribe ( ( data: any ) => {
      console.log(data),
      console.log('a new one from service'),
      console.log('aythToken: ' + data.authToken),
      this.router.navigate(['/smartTable']),
      this.loginService.setAuthToken(data.authToken);
    }, (error) => {
        console.log(error),
        window.alert('帳密錯誤喔！');
    }, () => {} );
  }
}
