import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css']
})
export class QueryFormComponent implements OnInit {

  queryForm: FormGroup;

  @Output() querySubmitCliked: EventEmitter<Object> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.queryForm = this.fb.group({
      account: [''],
      name: [''],
      cardNo: [''],
      email: ['']
    });
  }

  ngOnInit() {
  }

  querySubmit(value) {
    this.querySubmitCliked.emit(value);
    console.log(value);
  }
}
