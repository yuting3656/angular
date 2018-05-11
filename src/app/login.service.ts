import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor( private http: HttpClient ) { }

  // 如果login 成功拿到 authToken 就回傳true
  mockAuthTokenChecker(): boolean{
    return false; // 改這邊就可以擋大家看的東西　true -> access resources , false-> cannot access resources
  }
}
