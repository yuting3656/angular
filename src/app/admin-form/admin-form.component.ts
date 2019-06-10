import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';

import { HttpSpaceMeService } from '../http-space-me.service';


import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {
  aGoodForm: FormGroup;

  // baseUrl + queryString + pagerString
  baseUrl = 'http://api.space.hyweb.com.tw/rest/member/admin/accounts';
  queryString = '?queryString=%7B%22account%22%3A%22%22%2C%22cardNo%22%3A%22%22%2C%22name%22%3A%22%22%2C%22email%22%3A%22%22%7D';
  pagerString = '&pagerString=%7B%22currentPage%22%3A1%2C%22pageSize%22%3A10%2C%22maxPage%22%3A1%2C%22totalCount%22%3A1%2C%22resultList%22%3A%5B%5D%7D';

  constructor (
    protected service: HttpSpaceMeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.aGoodForm = new FormGroup({
      account: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[\\w\\-\\/]+') // 可以是任何大小寫字母,數字,_,- ,斜線
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[^\\s]+') // 不能有空格
      ])),
      status: new FormControl('Y'),
      email: new FormControl('', Validators.email, // Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
      ),
      contactMobileTel: new FormControl(''),
      cardNo: new FormControl(''),
    });
  }
  onSubmit(formValue) {
    this.service.httpPost(this.baseUrl, formValue).subscribe((data) => {
       console.log(data),
       this.router.navigate(['/smartTable']);
      }, (err) => {
         console.log('Error Occured (from admin-form):' + err);
        for (const e in err) {
          if (e) {
          console.log(e);
          this.router.navigate(['/wrongPage']);
          }
        }
      }, () => this.router.navigate(['/smartTable'])
    );
    console.log(formValue);
  }

}
