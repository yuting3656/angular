import { Injectable, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs/Rx'; 
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

import { post } from 'selenium-webdriver/http';

import { LoginService } from './login.service';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor, OnInit {
    
    
    constructor( private router:Router, protected loginAuthService:LoginService ){
    }

    ngOnInit(){
    }

    private quthReq:HttpRequest<any>;

    getQuthReq():HttpRequest<any>{
        return this.quthReq;
    }
    setQuthReq(quthReq){
       this.quthReq= quthReq;
    }


    intercept( req:HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>>{

        console.log("intercepted request ... ");
        
        /*
           在登入時要確定沒ｔｏｋｅｎ　和ＰＯＳＴ方法　會這樣判斷是因為　新增的ＡＰＩ　ＰＯＳＴ方法　沒有　吃　'Content-Type': 'application/x-www-form-urlencoded
           還有判斷 authtoken 時不要把它宣告成變數出來　會造成混亂！！！　用service去拿　因為ｌｏｇｏｕｔ後　ａｕｔｈＴｋｅｎ　會移除　這樣判斷才會正確！！！
        */  
        if( this.loginAuthService.getAuthToken() == null && req.method =="POST"){
             // Clone the request to add the new header.
            const authReq = req.clone(
                { 
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded',// 這裡可以放 authToken ! XD
                  })
                }
            )
            this.setQuthReq(authReq)
        }else{

            console.log("from interceptor: "+ this.loginAuthService.getAuthToken())

            const authReq = req.clone(
                { 
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',// 這裡可以放 authToken ! XD
                    'authToken':this.loginAuthService.getAuthToken(), 
                })
                }
            )
            this.setQuthReq(authReq)
        }     


        console.log("Sending request with new header now ...");

        // Send the newly created request 
        return next.handle(this.getQuthReq()).do( data=>({
           if( data ){
              //console.log(data.header.get('authToken'))
           }
          })
        ).catch((error, caught)=>{
            // Intercept the respons error and dissplace it to the console 
            console.log("Error Occurred");
            console.log(error);
            // return the error to the method that called it 
             return Observable.throw(error);
           }) as any; 


    }
}
