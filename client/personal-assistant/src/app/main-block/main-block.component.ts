import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-block',
  templateUrl: './main-block.component.html',
  styleUrls: ['./main-block.component.scss']
})
export class MainBlockComponent implements OnInit {
  isSelectionCardOpen =  true;

  constructor() { }

  ngOnInit() {
  }
  closeSelectionCard(){}
}
