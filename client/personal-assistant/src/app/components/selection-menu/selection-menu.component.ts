import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selection-menu',
  templateUrl: './selection-menu.component.html',
  styleUrls: ['./selection-menu.component.scss']
})
export class SelectionMenuComponent implements OnInit {
  @Input() isSelectionCardOpen = true;
  @Output() onSelectionClose = new EventEmitter()

  constructor() { }

  cards = [
    { id: '1', name: 'Habbit Tracker', checked: true },
    { id: '2', name: 'Diary', checked: false },
    { id: '3', name: 'Goals Planner', checked: true },
    { id: '4', name: 'Progress Board', checked: true },
    { id: '5', name: 'ToDo list', checked: false },
    { id: '6', name: 'Wheel Balance', checked: false },
    { id: '7', name: 'Statistics', checked: false },
    { id: '8', name: 'Calendar', checked: false },
    { id: '9', name: 'Eizenhauer Matrix', checked: false }
  ];

  ngOnInit() {
  }

  onCardClick(id) {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].id === id) {
        this.cards[i].checked = !this.cards[i].checked;
      }
    }
  }

  closeSelectionCard() {
    this.onSelectionClose.emit();
  }

  saveSelectionCard() {
    this.closeSelectionCard();
  }
}
