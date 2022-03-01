import {
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

import { DashboardService } from './dashboard.service';

export type ChartOptionsPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type ChartOptionsBar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  // providers: [DashboardService],
})
export class DashboardComponent
  implements AfterViewInit, AfterContentInit, AfterViewInit, DoCheck, OnChanges
{
  @ViewChild('chart') chartPie: ChartComponent | any;
  public chartOptionsPie: Partial<ChartOptionsPie> | any;

  @ViewChild('chart') chartBar: ChartComponent | any;
  public chartOptionsBar: Partial<ChartOptionsBar> | any;

  tasks!: number;
  isLoading = true;

  constructor(
    private dashboardService: DashboardService,
    private _snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {}

  ngAfterContentInit() {}

  ngDoCheck() {}

  ngOnChanges() {}

  ngOnInit(): void {
    this.getChartPie(0, 0);
    this.getChartBar(0, 0);
    this.isLoading = true;

    this.dashboardService.dashboard().subscribe(
      (response) => {
        this.tasks = response.length;
        const tasksCompleted = response.filter(
          (item) => item.completed == true
        );
        const tasksPending = response.filter((item) => item.completed == false);

        this.getChartPie(tasksCompleted.length, tasksPending.length);
        this.getChartBar(tasksCompleted.length, tasksPending.length);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this._snackBar.open('Erro, tente novamente mais tarde', '', {
          duration: 2500,
          panelClass: ['red-snackbar'],
        });
      }
    );
  }

  getChartPie(completed: number, pending: number) {
    this.chartOptionsPie = {
      series: [completed, pending],
      chart: {
        // width: '80%',
        height: "310px",
        type: 'pie',
      },
      labels: [`Concluidas`, `Pendentes`],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '110%',
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  getChartBar(completed: number, pending: number) {
    this.chartOptionsBar = {
      series: [
        {
          name: 'basic',
          data: [completed, pending],
        },
      ],
      chart: {
        type: 'bar',
        height: '280px',
      },
      plotOptions: {
        bar: {
          horizonvtal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Concluidas', 'Pendentes'],
      },
    };
  }
}
