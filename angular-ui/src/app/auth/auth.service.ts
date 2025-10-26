/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../error.service';
import { LoginCreds } from './login/login-creds';

@Injectable()
export class AuthService {
  entityUrl = environment.REST_API_URL + 'auth';

  isAuthenticated: Boolean = false;

  private readonly handlerError: HandleError;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.handlerError = httpErrorHandler.createHandleError('AuthService');
  }

  loginUser(loginCreds: LoginCreds): Observable<any> {
    return this.http
      .post<any>(this.entityUrl + '/login', loginCreds)
      .pipe(catchError(this.handlerError('loginUser', loginCreds)));
  }

  // updateUserActiveStatus(userId: string, isActive: boolean): Observable<{}> {
  //   return this.http
  //     .put<User>(this.entityUrl + '/' + userId + '/active?isActive=' + isActive, null)
  //     .pipe(catchError(this.handlerError('updateUserActiveStatus')));
  // }

}
