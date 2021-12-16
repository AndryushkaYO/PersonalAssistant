import { Component, OnInit } from '@angular/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { CdkRow } from '@angular/cdk/table';
import { FormControl } from '@angular/forms';
import { BalanceWheelService } from '../balance-wheel.service';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-balance-wheel-edit',
  templateUrl: './balance-wheel-edit.component.html',
  styleUrls: ['./balance-wheel-edit.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class BalanceWheelEditComponent implements OnInit {
  isLoading = false;
  startSelectedDate;
  date = new FormControl(moment());
  wheels;
  id;
  sectors = [];
  limit = 10;

  constructor(private bws: BalanceWheelService, public route: ActivatedRoute) { }

  deleteSector(name) {
    this.sectors = this.sectors.filter(el => el.name != name);

  }

  addNewSector(name) {
    this.sectors.push({
      name,
      value: 0
    })
  }

  onSaveBalanceWheel() {
    this.isLoading = true;

    let result = {
      date: this.wheels.find(el => el.id === this.id).date,
      id: this.id,
      sectors: this.sectors,
    }

    if (this.id) {
      this.bws.updateBalance(result).subscribe(() => {
        this.isLoading = false;
      });
    }
    else {
      this.bws.addBalance(result).subscribe(() => {
        this.isLoading = false;
      });
    }
  }

  ngOnInit(): void {
    this.startSelectedDate = this.date.value.startOf('month').format('MM/DD/YY');
    this.isLoading = true;
    this.bws.getBalances().subscribe((el) => {
      this.isLoading = false;
      this.wheels = el.balances;

      this.wheels.forEach((item)=> {
        if (item.date == this.startSelectedDate) {
          this.sectors = item.sectors;
          this.id = item.id;
        }
      });
    });
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
    this.startSelectedDate = this.date.value.startOf('month').format('MM/DD/YY');
    datepicker.close();
  }

  changeMonth(addMonth = true) {
    const newDate = this.date.value.add(addMonth ? 1: -1, 'months');
    this.date.setValue(newDate);
    this.startSelectedDate = this.date.value.startOf('month').format('MM/DD/YY');
  }
}
