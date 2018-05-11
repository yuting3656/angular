import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service'; 

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(protected service: LoginService,) { }

  ngOnInit(){
    this.showingNav();
  }
  
  showingNav(): boolean{
    return this.service.mockAuthTokenChecker();
  }

}
