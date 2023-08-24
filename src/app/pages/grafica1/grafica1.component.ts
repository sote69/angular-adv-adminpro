import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public titulo1 :string = 'Grafica 1';
  public colors1 :string[] = ['#6857E6','#009FEE','#F02059'];
  public doughnutChartLabels1: string[] = [ 'Download Sales 1', 'In-Store Sales 1', 'Mail-Order Sales 1', ];
  public doughnutChartValues1: number[] = [100, 100, 800];

  public titulo2 :string = 'Grafica 2';
  public colors2 :string[] = ['#685777','#009AAA','#F02AAA'];
  public doughnutChartLabels2: string[] = [ 'Download Sales 2', 'In-Store Sales 2', 'Mail-Order Sales 2', ];
  public doughnutChartValues2: number[] = [200, 200, 600];

  public titulo3 :string = 'Grafica 3';
  public colors3 :string[] = ['#6857E6','#009FEE','#F02059'];
  public doughnutChartLabels3: string[] = [ 'Download Sales 3', 'In-Store Sales 3', 'Mail-Order Sales 3', ];
  public doughnutChartValues3: number[] = [300, 300, 400];

  public titulo4 :string = 'Grafica 4';
  public colors4 :string[] = ['#666666','#00DDDD','#FFF000'];
  public doughnutChartLabels4: string[] = [ 'Download Sales 4', 'In-Store Sales 4', 'Mail-Order Sales 4', ];
  public doughnutChartValues4: number[] = [400, 400, 200];
}
