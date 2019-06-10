import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table'; 
import { Router } from '@angular/router';

import { HttpSpaceMeService } from '../http-space-me.service';


@Component({
  selector: 'app-button-render',
  templateUrl: './button-render.component.html',
  styleUrls: ['./button-render.component.css']
})
export class ButtonRenderComponent implements OnInit {

  // delete url :http://api.space.hyweb.com.tw/rest/member/admin/accounts/{uuid}

  url: string = 'http://api.space.hyweb.com.tw/rest/member/admin/accounts/';

  public renderValue;

  @Input() value;

  constructor( private router: Router, protected service:HttpSpaceMeService) { }

  ngOnInit() {
    this.renderValue = this.value;
  }

  update() {
    this.router.navigate(['/updateForm', { id: this.renderValue} ]);
  }

  delete() {
    const deleteUrl = this.url + this.renderValue;
    console.log(deleteUrl)
    if (confirm( '你確定要刪除?')) {
      this.service.httpDelete(deleteUrl).subscribe((data) =>
          console.log( 'Deleted!!'),
          (error) => console.log(error),
          () => this.router.navigate(['/smartTable']));
      window.location.reload(); // 太暴力！
      // this.router.navigate(["/smartTable"]) <--- doesn't work
    }
  }
}
