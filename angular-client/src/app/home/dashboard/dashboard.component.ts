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
  };
  startDate!: Date | null;

  chartData!: any;
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  constructor(
    private loadService: LoadService,
    private dashboardService: DashboardService
  ) {
    Chart.register();
  }

  ngOnInit(): void {
    this.dashboardService.dashboard$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => (this.chartData = data));
  }

  ngAfterViewInit() {
    this.getDashData();
  }

  filterByDate() {
    if (this.startDate) {
      this.date.start = this.startDate.toDateString();
      this.getDashData();
    } else {
      this.startDate = null;
    }
  }

  clearDateFilter() {
    this.date.start = '';
    this.getDashData();
  }

  getDashData() {
    this.loadService.emitLoadEvent(true);

    this.dashboardService
      .getData({
        ...(this.date.start && {
          date: new Date(this.date.start).toISOString(),
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
