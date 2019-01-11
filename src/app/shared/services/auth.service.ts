import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMapTo } from 'rxjs/operators';
import { Jsona } from 'jsona/lib';

import { TokenService } from './token.service';
import { User } from './../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  jsona: Jsona;
  constructor(private http: HttpClient, public tokenService: TokenService) {
    this.jsona = new Jsona();
  }

  createNewUser(user: User): Observable<any> {
    const newUser = this.jsona.serialize({
      stuff: { ...user, type: 'user' }
    });
    return this.http
      .post<any>(`${environment.apiUrl}/api/auth/sign_up`, newUser)
      .pipe(
        map(token => {
          this.tokenService.setToken(token.auth_token);
        }),
        switchMapTo(this.getProfile()),
        catchError(err => {
          console.log(err);
          return throwError('Something bad happened; please try again later.');
        })
      );
  }

  logInUser(formData: User): Observable<any> {
    const newJson = this.jsona.serialize({
      stuff: { ...formData, type: 'user' }
    });
    return this.http
      .post<any>(`${environment.apiUrl}/api/auth/sign_in`, newJson)
      .pipe(
        map(token => {
          this.tokenService.setToken(token.auth_token);
        }),
        switchMapTo(this.getProfile()),
        catchError(err => {
          return throwError('Something bad happened; please try again later.');
        })
      );
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/profile`).pipe(
      map(data => {
        if (this.tokenService.getToken()) {
          this.tokenService.profileSubject.next(data);
        }
        return data;
      })
    );
  }

  editAvatar(file: File): Observable<any> {
    console.log(file);
    const newImg = new FormData();
    newImg.append('avatar', file);
    return this.http.put<any>(
      `${environment.apiUrl}/api/profile/avatar`,
      newImg
    );
  }
}
