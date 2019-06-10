import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { HttpSpaceMeService } from './http-space-me.service';

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient,
    protected service: HttpSpaceMeService
  ) { }

  // 如果login 成功拿到 authToken 就回傳true
  mockAuthTokenChecker(): boolean {
    if ( this.getAuthToken() != null) {
      console.log( 'authToke flage: ' + this.getAuthToken() );
      console.log( 'mock token true' );
      return true;
    } else {
      console.log('mock token false');
      return false;
    }
  }

  setAuthToken( authToken ) {
   localStorage.setItem( 'authToken', authToken );
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  loginChecker(account: string, pwd: string): Observable<any> {
    const url = 'https://spaceadmin.hyweb.com.tw/rest/auth/admin/authentication';
    const loginQuery: {} = `account=${account}&password=${pwd}`;
    return this.service.httpPost(url, loginQuery);
  }

}

