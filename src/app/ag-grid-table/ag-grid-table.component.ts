import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ag-grid-table',
  templateUrl: './ag-grid-table.component.html',
  styleUrls: ['./ag-grid-table.component.css']
})
export class AgGridTableComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigatorYAYA(){
    this.router.navigate(['/smartTable'])
  }

}
