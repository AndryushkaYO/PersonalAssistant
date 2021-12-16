import { Component, OnInit } from '@angular/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { CdkRow } from '@angular/cdk/table';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { BalanceWheelService } from './balance-wheel.service';

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
  selector: 'app-balance-wheel',
  templateUrl: './balance-wheel.component.html',
  styleUrls: ['./balance-wheel.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class BalanceWheelComponent implements OnInit {
  startSelectedDate;
  isLoading;
  date = new FormControl(moment());
  isEditMode = false;
  public polarAreaChartType: ChartType = 'polarArea';
  legend = true;
  labels = [];
  values = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  wheels;
  id;

  constructor(private router: Router, private bws: BalanceWheelService) { }

  ngOnInit(): void {
    this.startSelectedDate = this.date.value.startOf('month').format('MM/DD/YY');
    this.isLoading = true;
    this.bws.getBalances().subscribe((el) => {
      this.isLoading = false;
      this.wheels = el.balances;
      if (this.wheels.length) {
        this.updateChart();
      }
    });
  }

  updateChart() {
    let result;
    this.wheels.forEach((item)=> {
      if (item.date == this.startSelectedDate) {
        result = item;
        this.id = item.is;
      }
    });
    this.labels = result.sectors.map(el => el.name);
    this.values = result.sectors.map(el => el.value);
  }

  openEditMode() {
    this.router.navigate(['balance/' + (this.id ?? 'add')]);
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    this.startSelectedDate = this.date.value.startOf('month').format('MM/DD/YY');
    if (this.wheels.length) {
      this.updateChart();
    }
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    this.startSelectedDate = this.date.value.startOf('month').format('MM/DD/YY');
    datepicker.close();
    if (this.wheels.length) {
      this.updateChart();
    }
  }

  changeMonth(addMonth = true) {
    const newDate = this.date.value.add(addMonth ? 1: -1, 'months');
    this.date.setValue(newDate);
    this.startSelectedDate = this.date.value.startOf('month').format('MM/DD/YY');
    if (this.wheels.length) {
      this.updateChart();
    }
  }
}
