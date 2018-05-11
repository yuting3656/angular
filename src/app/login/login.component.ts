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

  loginForm:FormGroup;

  url="https://spaceadmin.hyweb.com.tw/rest/auth/admin/authentication";

  constructor( 
    protected service: HttpSpaceMeService, 
    protected loginService: LoginService,
    private fb: FormBuilder, 
    private router:Router,
  ) { }

  ngOnInit() {
     this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      account:["",Validators.required],
      password:["",Validators.required]
    });
  }

  loginSubmit(formValue){
    console.log("Here i'm in loginSubmit") 
    
    // 自己改成querystring !
    let account = formValue.account;
    let password = formValue.password;
    let formValueString:{} = `account=${account}&password=${password}`;

     // console.log( "querydata: " + this.loginService.getQueryData(formValue)); doesn't work lol... 
    
    this.service.httpPost(this.url, formValueString).subscribe((data:any) =>{
      console.log(data),
      console.log("aythToken: " + data.authToken),
      this.router.navigate(["/smartTable"]),
      this.loginService.setAuthToken(data.authToken)
    },(error)=>{
        console.log(error),
        window.alert("帳密錯誤喔！")      
    },()=>{})
  }

 
}
