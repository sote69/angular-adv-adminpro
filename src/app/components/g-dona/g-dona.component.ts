import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-g-dona',
  templateUrl: './g-dona.component.html',
  styles: [
  ]
})
export class GDonaComponent implements OnInit {

  @Input() titulo :string = 'Grafica';
  @Input() colors :string[] = ['#6857E6','#009FEE','#F02059'];
  @Input() doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales', ];
  @Input() doughnutChartValues: number[] = [350, 450, 100];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [''],
    datasets: [
      { data: [100], backgroundColor: [''] },
    ],
  };

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: this.doughnutChartValues, backgroundColor: this.colors },
      ],
    }
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}
