import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'; 

import { HttpSpaceMeService } from '../http-space-me.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  url="http://api.space.hyweb.com.tw/rest/auth/admin/authentication";

  constructor( 
    protected service: HttpSpaceMeService, 
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

  loginSubmit(foromValue){
    console.log("Here i'm in loginSubmit") 
    this.service.httpPost(this.url,foromValue).subscribe(data=>console.log(data),(error)=>{
        console.log(error),
        this.router.navigate(["/wrongPage"])         
    },()=>{})
  }

}
