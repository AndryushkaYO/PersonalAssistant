import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(private router: Router) { }

  todos = [
    {name: 'Create wish list for Cristmass', deadline: '12/27/21', created: '12/15/21', status: 'In Progress'},
    {name: 'Log time to calendar', deadline: '12/30/21', created: '12/05/21', status: 'To Do'},
    {name: 'Buy New Year gifts', deadline: '01/02/22', created: '12/11/21', status: 'In Progress'},
    {name: 'Select Christmass tree', deadline: '12/28/21', created: '11/01/21', status: 'To Do'},
    {name: 'Add new ToDo list point', deadline: '12/29/21', created: '11/25/21', status: 'To Do'},
  ]

  selected = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  selectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  matcher = new MyErrorStateMatcher();


  ngOnInit(): void {
  }

  add(){
    this.router.navigate(['/todo/new']);
  }

}
