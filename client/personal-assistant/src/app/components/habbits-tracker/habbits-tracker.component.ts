import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Habbit } from './habbit';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { HabbitsTrackerService } from './habbits-tracker.service';
import { CdkRow } from '@angular/cdk/table';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-habbits-tracker',
  templateUrl: './habbits-tracker.component.html',
  styleUrls: ['./habbits-tracker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class HabbitsTrackerComponent implements OnInit {
  startSelectedDate;
  endSelectedDate;
  date = new FormControl(moment());
  sortedData: Array<Habbit>;
  isEditMode = false;

  allDates = [];
  habbits = [];

  // habbits = [
  //   {visible: true, id:'1', name: 'Morning exersices', markedDates: ['11/14/21', '11/17/21', '11/19/21', '11/20/21','11/21/21','11/25/21']},
  //   {visible: true, id:'2', name: 'Glass of water', markedDates: ['11/14/21', '11/17/21', '11/21/21','11/25/21']},
  //   {visible: false, id:'6', name: 'Programming (30m)', markedDates: ['11/14/21', '11/17/21','11/25/21']},
  //   {visible: true, id:'3', name: 'Daily training', markedDates: [, '11/19/21', '11/20/21','11/21/21','11/25/21']},
  //   {visible: true, id:'4', name: 'Reading (1h)', markedDates: ['11/14/21', '11/17/21', '11/19/21', '11/20/21','11/21/21','11/25/21']},
  //   {visible: true, id:'5', name: 'Meditation & yoga (30m)', markedDates: ['11/14/21', '11/17/21','11/25/21']},
  //   {visible: false, id:'7', name: 'Eyes exercises', markedDates: ['11/14/21', '11/17/21','11/25/21']},
  // ];

  constructor(private habbitService: HabbitsTrackerService) { }

  ngOnInit() {
    this.startSelectedDate = this.date.value.startOf('month').format('MM/DD/YY');
    this.endSelectedDate = this.date.value.endOf('month').format('MM/DD/YY');
    this.calcDates();
    
    this.habbitService.getHabbits()
      .subscribe((habbitsData: any) => {
        this.habbits = habbitsData.habbits;
        this.sortedData = [...this.habbits];
      });
  }

  updateHabbitsTracker() {
    this.isEditMode = !this.isEditMode;
    this.habbitService.getHabbits()
      .subscribe((habbitsData: any) => {
        this.habbits = habbitsData.habbits;
        this.sortedData = [...this.habbits];
      });
  }

  checkHabbit(date, id) { // fix this function
    this.sortedData.forEach((el, index) => {
      if (el.id === id) {
        let markedDates =  el.markedDates;
        if (markedDates.includes(date)) {
          markedDates = markedDates.filter(item => item.toString() !== date.toString());
        } else {
          markedDates.push(date);
        }
        this.habbitService.updateHabbit({ ...el, markedDates });
        this.sortedData[index].markedDates = markedDates;
      }
    });
  }

  calcDates() {
    for(
      var arr=[], dt=new Date(this.startSelectedDate);
      dt<=new Date(this.endSelectedDate);
      dt.setDate(dt.getDate()+1)) {
      arr.push(new Date(dt));
    }

    this.allDates = [...arr];
  }

  sortData(sort: Sort) {
    const data = this.habbits.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return compare(a.name, b.name, isAsc);
    });
  }

  isChecked(habbit: Habbit, date: Date) {
    const isSameDate = (dateA, dateB) => {
      return dateA.toISOString() === dateB.toISOString();
    }
    const result = habbit.markedDates.filter((el) => isSameDate(date, el));

    return result.length === 1;
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    console.log(this.date.value.endOf('month').format('MM/DD/YY'))
    this.startSelectedDate = this.date.value.startOf('month').format('MM/DD/YY');
    this.endSelectedDate = this.date.value.endOf('month').format('MM/DD/YY');
    this.calcDates();
    datepicker.close();
  }

  changeMonth(addMonth = true) {
    const newDate = this.date.value.add(addMonth ? 1: -1, 'months');
    this.date.setValue(newDate);
    this.startSelectedDate = this.date.value.startOf('month').format('MM/DD/YY');
    this.endSelectedDate = this.date.value.endOf('month').format('MM/DD/YY');
    this.calcDates();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}