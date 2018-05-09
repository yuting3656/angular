import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms'; 
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { HttpSpaceMeService } from '../http-space-me.service';
import { Admin } from '../admin';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {
  @Input() admin: Admin;

  /*
  * baseUrl/{uuid}  << member/admin/accounrs/{uuid} ==> GET , PUT >>
  * 
  */ 
  baseUrl="http://api.space.hyweb.com.tw/rest/member/admin/accounts"; 
  updateForm: FormGroup;

  //Infor from API through uuid
  updatedAccount;
  updatedName;
  updatedCardNo;
  updatedEmail;
  updatedStatus;
  updatedContactMobileTel;
  updatedCreateDate;
  updatedLastModifyDate;

  constructor( 
    private route: ActivatedRoute, 
    protected service: HttpSpaceMeService, 
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
  ) { 
    this.createUpdateForm()
  }

  ngOnInit(): void {
    this.getUpdatedData();
  }

  getUuid(){
    const uuid = this.route.snapshot.paramMap.get('id');
    return uuid
  }

  // baseUrl/{uuid} ==> GET 用在　getUpdatedData() 從 smart table 帶入uuid  
  getUpdatedData(){
    const uuid = this.getUuid();
    this.service.httpGet(this.baseUrl+"/"+uuid).subscribe((data) => {
      this.getUpdateDetail(data),
      this.createUpdateForm()
    }, (error)=> console.log(error), ()=>{})
  }

  // 用 FormBuilder 建造 form  
  createUpdateForm(){
    this.updateForm = this.fb.group({
     account:[this.updatedAccount],
     name:[this.updatedName,Validators.compose([
      Validators.required, Validators.pattern('[^\\s]+') 
     ])],
     cardNo:[""],
     email:[this.updatedEmail, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)],
     status:[this.updatedStatus],
     contactMobileTel:[this.updatedContactMobileTel],
     createDate:[this.updatedCreateDate],
     lastModifyDate:[this.updatedLastModifyDate],
     uuid:[this.getUuid()] // hidden !! 
    })
  }

  getUpdateDetail(data){
    console.log("im here in getupdateddetail")
    this.admin = data;
    this.updatedAccount = this.admin["account"];
    this.updatedName = this.admin["name"];
    this.updatedEmail = this.admin["email"];
    this.updatedStatus = this.admin["status"];
    this.updatedContactMobileTel = this.admin["contactMobileTel"];
    this.updatedCreateDate = this.admin["createDate"];
    this.updatedLastModifyDate = this.admin["lastModifyDate"];
  }

  // baseUrl/{uuid} ==> PUT 
  onSubmit(fromValue){
    const uuid = this.getUuid();
    this.service.httpPut(this.baseUrl +"/"+ uuid,fromValue).subscribe((data)=> {
      console.log("updated Good!:" + data)
      this.router.navigate(["/smartTable"])
    },(error)=> {
      console.log("出包搂~" +error)
      this.router.navigate(["/wrongPage"])
    }, ()=>{
      ()=>this.router.navigate(["/smartTable"])
    });
  }
  
  deny(){
   this.location.back();
  }
}
