import { Component, OnInit, ViewChild } from '@angular/core';
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
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chartPie: ChartComponent | any;
  public chartOptionsPie: Partial<ChartOptionsPie> | any;

  @ViewChild('chart') chartBar: ChartComponent | any;
  public chartOptionsBar: Partial<ChartOptionsBar> | any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.dashboard().subscribe((response) => {
      const tasksCompleted = response.filter((item) => item.completed == true);
      const tasksPending = response.filter((item) => item.completed == false);

      this.getChartPie(tasksCompleted.length, tasksPending.length);
      this.getChartBar(tasksCompleted.length, tasksPending.length);
    });
  }

  getChartPie(completed: number, pending: number) {
    this.chartOptionsPie = {
      series: [completed, pending],
      chart: {
        width: '100%',
        type: 'pie',
      },

      labels: [`Concluidas`, `Pendentes`],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
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
        height: 310,
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
