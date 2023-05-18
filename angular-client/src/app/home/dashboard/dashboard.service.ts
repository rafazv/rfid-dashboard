import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService } from '../../shared';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private dashboardSource = new BehaviorSubject<[]>([]);

  dashboard$ = this.dashboardSource.asObservable();

  constructor(private apiService: ApiService) {}

  getData(args?: any) {
    return this.apiService
      .get('/dashboard', args)
      .pipe(tap((data) => this.dashboardSource.next(data)));
  }
}
