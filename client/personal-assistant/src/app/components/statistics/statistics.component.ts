import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartOptions2: ChartOptions = {
    responsive: true,
    defaultColor: 'blue'
  };
  public barChartLabels: Label[] = ['07/21', '08/21', '09/21', '10/21', '11/21', '12/21', '01/22'];
  public barChartLabels2: Label[] = [ ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  habbits = [
    {name:'Morning exersices', amount:33},
    {name:'Meditation & yoga (30m)', amount:43},
    {name:'Daily training', amount:21},
    {name:'Evening Vitamins', amount:13},
    {name:'English learning (1h)', amount:22},
    {name:'Eyes exercises', amount:33},
  ]

  public barChartData: ChartDataSets[] = [
    { data: [5, 13, 8, 5, 26, 15, 0], label: 'Кількість постів в місяць' },
  ];

  public barChartData2: ChartDataSets[] = [{
    data: [8], label: 'To Do'
  },
    { data: [ 13], label: 'In Progress' },
    { data: [5], label: 'Done' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

  download() {
    let data = document.getElementById('statistics');
      
      html2canvas(data).then(canvas => {
          
          let docWidth = 208;
          let docHeight = canvas.height * docWidth / canvas.width;
          
          const contentDataURL = canvas.toDataURL('image/png')
          let doc = new jsPDF('p', 'mm', 'a4');
          let position = 15;
          doc.addImage(contentDataURL, 'PNG', position, position, docWidth, docHeight)
          
          doc.save('statistics.pdf');
      });
  }
}
