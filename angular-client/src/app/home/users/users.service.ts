import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService } from '../../shared';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userListSource = new BehaviorSubject<[]>([]);

  userList$ = this.userListSource.asObservable();

  constructor(private apiService: ApiService) {}

  findAll(args?: any) {
    return this.apiService
      .get('/users', args)
      .pipe(tap((data) => this.userListSource.next(data)));
  }

  findOne(id: any) {
    return this.apiService.get(`/users/${id}`);
  }

  create(user: any) {
    return this.apiService.post('/users', user);
  }

  update(user: any) {
    return this.apiService.put('/users', user);
  }

  delete(id: any) {
    return this.apiService.delete(`/users/${id}`);
  }

  disable(id: any) {
    return this.apiService.put(`/users/disable/${id}`);
  }
}
