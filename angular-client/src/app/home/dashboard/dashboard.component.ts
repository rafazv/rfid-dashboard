import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { LoadService } from 'src/app/shared';
import { DashboardService } from './dashboard.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private ngUnsubscribe$ = new Subject();

  date = {
    start: '',
    end: '',
  };
  startDate!: Date | null;
  endDate!: Date | null;

  lineChartData!: ChartConfiguration['data'];
  lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
    },
  };

  dataSource: any = [];

  constructor(
    private loadService: LoadService,
    private dashboardService: DashboardService
  ) {
    Chart.register();
  }

  ngOnInit(): void {
    this.dashboardService.dashboard$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => {
        this.initDashData(data);
      });
  }

  ngAfterViewInit() {
    this.getDashData();
  }

  initDashData(data: any) {
    this.dataSource = data.result;
    const datasets = [];
    let dataItem;

    if (this.dataSource) {
      this.dataSource.forEach((item: any) => {
        dataItem = {
          data: [], // amount
          label: item.user.name,
          fill: 'origin',
          backgroundColor: '',
          borderColor: '',
          pointBackgroundColor: '',
        };
        datasets.push(dataItem);
      });
    }

    this.lineChartData = {
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 55, 40],
          label: 'Series A',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          fill: 'origin',
        },
      ],
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // datetime
    };
  }

  filterByDate() {
    if (this.startDate && this.endDate) {
      this.date.start = this.startDate.toDateString();
      this.endDate.setHours(23, 59, 59, 9999999);
      this.date.end = this.endDate.toDateString();
    } else {
      this.startDate = null;
      this.endDate = null;
    }
  }

  getDashData() {
    this.loadService.emitLoadEvent(true);

    this.dashboardService
      .findAll({
        // page: 0,
        // size: 5,
        ...(this.date.start && {
          dateStart: new Date(this.date.start).toISOString(),
        }),
        ...(this.date.end && {
          dateEnd: new Date(this.date.end).toDateString(),
        }),
      })
      .subscribe({
        next: () => this.loadService.emitLoadEvent(false),
        error: () => {
          // this.dialog.openErrorDialog(
          //   ErrorUtil.translateError('', 'user.list-error'),
          // ),
        },
      });
  }
}
