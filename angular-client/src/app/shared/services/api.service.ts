import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token!: string;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) {
    this.token = this.localStorage.retrieve('token');

    this.localStorage.observe('token').subscribe((token) => {
      this.token = token;
    });
  }

  private setHeaders(header?: Map<string, string>): HttpHeaders {
    const headersConfig: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (!!this.token) {
      headersConfig.Authorization = 'Bearer ' + this.token;
    }

    if (header) {
      header.forEach((value, key) => {
        headersConfig[key] = value;
      });
    }

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    return throwError(() => error);
  }

  get(
    path: string,
    options?: HttpParams,
    header?: Map<string, string>,
  ): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}${path}`, {
        headers: this.setHeaders(header),
        params: options,
      })
      .pipe(catchError(this.formatErrors));
  }

  put(
    path: string,
    body: object = {},
    header?: Map<string, string>,
  ): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(header),
      })
      .pipe(catchError(this.formatErrors));
  }

  post(
    path: string,
    body: object = {},
    header?: Map<string, string>,
    withCredentials = false,
  ): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(header),
        withCredentials,
      })
      .pipe(catchError(this.formatErrors));
  }

  postFormData(path: string, body: object = {}): Observable<any> {
    const headerToken = {
      Authorization: 'Bearer ' + this.localStorage.retrieve('token'),
    };

    const req = new HttpRequest('POST', `${environment.apiUrl}${path}`, body, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders(headerToken),
    });

    return this.http.request(req).pipe(catchError(this.formatErrors));
  }

  delete(path: string, header?: Map<string, string>): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}${path}`, {
        headers: this.setHeaders(header),
      })
      .pipe(catchError(this.formatErrors));
  }
}
