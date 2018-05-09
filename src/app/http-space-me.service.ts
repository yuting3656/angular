import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpSpaceMeService {

    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http:HttpClient) { }

  //GET 
  httpGet(url:string){
    return this.http.get(url);
  }

  //POST
  httpPost(url:string, body: object){
    return this.http.post(url,body);
  }

  //UPDATE
  httpPut(url:string, body: object){
    return this.http.put(url, body);
  }

  //DELETE
  httpDelete(url:string){
    return this.http.delete(url);
  }




}
