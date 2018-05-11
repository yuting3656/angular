import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
   
  constructor( private http: HttpClient ) { }

  // 如果login 成功拿到 authToken 就回傳true
  mockAuthTokenChecker(): boolean{
   
    
    if(this.getAuthToken()!=null){
      console.log( "authToke flage: " + this.getAuthToken())
      console.log("mock token true")
      return true;
    }else{
      console.log("mock token false")
      return false; 
    }
  }

  getQueryData(inputDatas:object){
    const params = new URLSearchParams();
 
    if(!inputDatas){
      return params;
    }
 
    for ( let data in inputDatas ) {
        params.set(data,inputDatas[data]);
    }
   
    return params;
   }

   setAuthToken(authToken){
    localStorage.setItem("authToken",authToken);
   }

   getAuthToken(){
     return localStorage.getItem("authToken");
   }

}

