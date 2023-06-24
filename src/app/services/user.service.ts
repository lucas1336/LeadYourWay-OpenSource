import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { UserModule } from '../models/user.module';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  base_Url = 'http://localhost:8080/api/leadyourway/v1';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error ocurred ${error.status},body was: ${error.error}`);
    } else {
      console.log(`Backend returned cod ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happend with request, try again');
  }

  getList(): Observable<UserModule> {
    return this.http
      .get<UserModule>(`${this.base_Url}/users`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getItem(id: string | null): Observable<UserModule> {
    return this.http
      .get<UserModule>(`${this.base_Url}/users/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateItem(Id: string, item: any): Observable<UserModule> {
    return this.http
      .put<UserModule>(`${this.base_Url}/users/${Id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  createItem(item: any): Observable<UserModule> {
    console.log(item);
    return this.http
      .post<UserModule>(`http://localhost:8080/api/leadyourway/v1/auth/register`, item)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteItem(id: string): Observable<UserModule> {
    return this.http
      .delete<UserModule>(`${this.base_Url}/users/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  login(email: string, password: string): Observable<number> {
    const body = {
      userEmail: email,
      userPassword: password,
    };

    return this.http
      .post<number>(`${this.base_Url}/login`, body)
      .pipe(retry(2), catchError(this.handleError));
  }
}
