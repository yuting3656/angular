import { Component, OnInit,Input,Output } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

import { HttpSpaceMeService } from '../http-space-me.service';

import { ButtonRenderComponent } from '../button-render/button-render.component'


@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.css']
})
export class SmartTableComponent implements OnInit {

  pageNumber:number;
  queryAccount:string;
  queryCardNo:string;
  queryName:string;
  queryEmail:string;
  

  url:string ="http://api.space.hyweb.com.tw/rest/member/admin/accounts/pager?pagerString=%7B%22pageSize%22%3A%22-1%22%7D";

  // baseUrl + queryString + pagerString 
  baseUrl="http://api.space.hyweb.com.tw/rest/member/admin/accounts/pager";
  queryString="?queryString=%7B%22account%22%3A%22%22%2C%22cardNo%22%3A%22%22%2C%22name%22%3A%22%22%2C%22email%22%3A%22%22%7D";
  pagerString="&pagerString=%7B%22currentPage%22%3A1%2C%22pageSize%22%3A10%2C%22maxPage%22%3A1%2C%22totalCount%22%3A1%2C%22resultList%22%3A%5B%5D%7D";
 

  tableSource: LocalDataSource;

  constructor( protected service: HttpSpaceMeService, private router:Router) { 
    this.tableSource = new LocalDataSource;
  }

  ngOnInit() {
       /*一載入業面後 smart table 讀取 defalut url */
    this.service.httpGet(this.url)
    .subscribe( (data) => {
      this.tableSource.load(data["resultList"])
    })
  }

  /* 點級 查詢筆數 觸發的funtion*/
  changePage(page){
    this.pageNumber=page.value;
    let urlChangePage = this.baseUrl + this.queryString + `&pagerString=%7B%22pageSize%22%3A%22${this.pageNumber}%22%7D`; 
    this.service.httpGet(urlChangePage).subscribe((data)=> this.tableSource.load(data["resultList"]))
 }


  /* 點擊 query-from 的 querySubmit() 觸發的function */
  querySubmitCliked(items){
    // 將 query-form 的form值帶入
    this.queryAccount = items.account;
    this.queryCardNo = items.cardNo;
    this.queryName = items.name;
    this.queryEmail = items.email;

    this.queryString = `?queryString=%7B%22account%22%3A%22${this.queryAccount}%22%2C%22cardNo%22%3A%22${this.queryCardNo}%22%2C%22name%22%3A%22${this.queryName}%22%2C%22email%22%3A%22${this.queryEmail}%22%7D`;
    let urlQueryString = this.baseUrl + this.queryString;
    this.service.httpGet(urlQueryString).subscribe((data)=> this.tableSource.load(data["resultList"]));

  }

  /*Smart Table 的設定: column 的標題 */

  settings={
    actions:false,
    columns:{
     account:{
       title:'帳號',
       filter:false,
     },
     name:{
      title:'姓名',
      filter:false,
    },
    cardNo:{
      title:'卡號',
      filter:false,
    },
     email:{
       title:'Email',       
       filter:false,
     },
     status:{
       title:'狀態',
       filter:false,
     },
     uuid:{
       filter:false,
       type:'custom',
       renderComponent: ButtonRenderComponent,
       defalutValue: 'Test',
     },
    },
   };



 /*  settings={

    columns:{
     domain:{
       title:'domain',
      },
      uuid:{
       title:'uuid',
     },
     account:{
       title:'帳號',
     },
     createDate:{
       title:'createDate',
     },
     creatorId:{
       title:'creatorId',
     },
     email:{
       title:'Email',
     },
     cardNo:{
       title:'cardNO',
     },
     creatorName:{
       title:'creatorName',
     },
 
     lastModifyDate:{
       title:'lastModifyDate',
     },
 
     modifierId:{
       title:'modifierId',
     },
 
     modifierName:{
       title:'modifierName',
     },
 
     name:{
       title:'name',
     },
 
     status:{
       title:'status',
     },
 
     type:{
       title:'type',
     },
 
    },
   }; */



}
