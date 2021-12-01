import { Component, Input, OnInit } from '@angular/core';
import { Habbit } from '../habbit';
import { HabbitsTrackerService } from '../habbits-tracker.service';

@Component({
  selector: 'app-edit-habbits-tracker',
  templateUrl: './edit-habbits-tracker.component.html',
  styleUrls: ['./edit-habbits-tracker.component.scss']
})
export class EditHabbitsTrackerComponent implements OnInit {
  @Input() habbits: Array<Habbit>;
  limit = 8;
  isLoading: boolean = false;

  constructor(private habbitsService: HabbitsTrackerService) { }

  ngOnInit() {
  }

  changeVisibility(id: string){
    for (let i = 0; i < this.habbits.length; i ++) {
      if (this.habbits[i].id === id) {
        this.habbits[i].visible = !this.habbits[i].visible;
        this.habbitsService.updateHabbit(this.habbits[i]);
      }
    }
  }

  deleteHabbit(id: string) {
    this.habbits = this.habbits.filter(el => el.id !== id);
    this.habbitsService.deletePost(id);
  }

  addNewHabbit(habbit) {
    if (this.habbits.length >= this.limit) {
      return;
    }
    this.isLoading = true;
    const newHabbit: Habbit = {
      visible: true,
      name: habbit.value,
      markedDates: []
    };
    this.habbitsService.addHabbit(newHabbit)
      .subscribe(responseData => {
        this.isLoading = false;
        this.habbits.push({ ...newHabbit, id: responseData.habbit.id });
        habbit.value = '';
      });
  }

}
