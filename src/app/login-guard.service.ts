import { Component, OnInit, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { LoginService } from './login.service';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor( protected service: LoginService, private router: Router ) { }

  canActivate() {
    if ( this.service.mockAuthTokenChecker()) {
      return true;
    } else {
      window.alert('請先登入');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
