import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpSpaceMeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  //GET 
  //GETHttpHeaders
  httpGet(url:string, options?:any){
    return this.http.get(url);
  }

  //POST
  httpPost(url:string, body: object, options?:any){
    return this.http.post(url,body);
  }

  //UPDATE
  httpPut(url:string, body: object, options?:HttpHeaders){
    return this.http.put(url, body);
  }

  //DELETE
  httpDelete(url:string, options?:any){
    return this.http.delete(url);
  }

  getDataFormContentTpe(){
    const authReq = 
      { 
      headers: new HttpHeaders({
         'Content-Type': 'application/x-www-form-urlencoded',// 這裡可以放 'application/x-www-form-urlencoded''multipart/form-data'  
          })
      }
    return authReq;   
  }
}
