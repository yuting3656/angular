import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpSpaceMeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient ) { }

  // GET
  // GETHttpHeaders
  httpGet(url: string, options?: any): Observable<any> {
    return this.http.get(url);
  }

  // POST
  httpPost(url: string, body: object, options?: any): Observable<any> {
    return this.http.post(url, body);
  }

  // UPDATE
  httpPut(url: string, body: object, options?: HttpHeaders): Observable<any> {
    return this.http.put(url, body);
  }

  // DELETE
  httpDelete(url: string, options?: any): Observable<any> {
    return this.http.delete(url);
  }
}
