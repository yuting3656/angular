import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-wrong-page',
  templateUrl: './wrong-page.component.html',
  styleUrls: ['./wrong-page.component.css']
})
export class WrongPageComponent implements OnInit {

  constructor( private location: Location) { }

  ngOnInit() {
  }

  back(){
    this.location.back();
  }

}
