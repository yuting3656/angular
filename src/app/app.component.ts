import { Component } from '@angular/core';
import { LoginService } from './login.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fridayProject = 'Yuting FridayProject';

  constructor( private service: LoginService ){

  }

  showingToken:boolean = this.service.mockAuthTokenChecker();

}
