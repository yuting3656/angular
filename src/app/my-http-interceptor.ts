import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs/Rx'; 
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor{
    
    constructor( private router:Router ){}

    intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        console.log("intercepted request ... ");
        
        // Clone the request to add the new header.
        const authReq = req.clone(
            { 
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'authToken':'fa1ac963-5dd5-476d-b8cd-1dad6a7159e7',// 這裡可以放 authToken ! XD
                  })
            }
        )

        console.log("Sending request with new header now ...");

        // Send the newly created request 
        return next.handle(authReq)
           .catch((error, caught)=>{
            // Intercept the respons error and dissplace it to the console 
            console.log("Error Occurred");
            console.log(error);
            // return the error to the method that called it 
             return Observable.throw(error);
           }) as any; 


    }
}
