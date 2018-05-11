import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs/Rx'; 
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { post } from 'selenium-webdriver/http';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor{
    
    constructor( private router:Router ){}

    private quthReq:HttpRequest<any>;

    getQuthReq():HttpRequest<any>{
        return this.quthReq;
    }
    setQuthReq(quthReq){
       this.quthReq= quthReq;
    }

    intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        console.log("intercepted request ... ");

        if(req.method.match('POST')){

            //現在這放 authToken 測試
            localStorage.setItem("authToken","6b39c259-ae76-4fd7-bf1f-670d293e81db")
            // Clone the request to add the new header.
            const authReq = req.clone(
                { 
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded',// 這裡可以放 authToken ! XD 'application/x-www-form-urlencoded''multipart/form-data'  
                })
                }
            )
            this.setQuthReq(authReq)
        }else{
             // Clone the request to add the new header.
             const authReq = req.clone(
                 { 
                 headers: new HttpHeaders({
                     'Content-Type': 'application/json; charset=utf-8',// 這裡可以放 authToken ! XD
                   })
                 }
             )
             this.setQuthReq(authReq)
                     
        }

        console.log("Sending request with new header now ...");

        // Send the newly created request 
        return next.handle(this.getQuthReq()).do( data=>({
           if( data ){
              console.log(data.header.get('authToken'))
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
