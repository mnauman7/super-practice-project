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

/* tslint:disable:no-unused-variable */

/**
 * @author Vitaliy Fedoriv
 */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
// Other imports
import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import { HttpErrorHandler } from '../error.service';

import { UserService } from './user.service';
import { User } from './user';
import { Type } from '@angular/core';
import { defer } from 'rxjs';

describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let userService: UserService;
  let expectedUsers: User[];
  let httpClientSpy: { get: jasmine.Spy };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, HttpErrorHandler],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
    expectedUsers = [
      { id: 1, firstName: 'A' },
      { id: 2, firstName: 'B' },
    ] as User[];
    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    let httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject<HttpTestingController>(
      HttpTestingController as Type<HttpTestingController>
    );
    userService = TestBed.inject(UserService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should return expected users (called once)', () => {
    userService
      .getUsers()
      .subscribe(
        (users) =>
          expect(users).toEqual(
            expectedUsers,
            'should return expected users'
          ),
        fail
      );

    // UserService should have made one request to GET users from expected URL
    const req = httpTestingController.expectOne(userService.entityUrl);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock users
    req.flush(expectedUsers);
  });

  it('search the user by id', () => {
    userService.getUserById(1).subscribe((users) => {
      expect(users).toEqual(expectedUsers[0]);
    });
    const id = '1';
    const req = httpTestingController.expectOne(
      userService.entityUrl + '/' + id
    );
    expect(req.request.method).toEqual('GET');
    req.flush(expectedUsers[0]);
  });

  it('add user', () => {
    let user = {
      id: 0,
      firstName: 'Mary',
      lastName: 'John',
      address: '110 W. Church St.',
      city: 'Madison',
      telephone: '6085551023'

    };

    userService
      .addUser(user)
      .subscribe(
        (data) => expect(data).toEqual(user, 'should return new user'),
        fail
      );

    const req = httpTestingController.expectOne(userService.entityUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(user);

    //expect the server to return the user after POST
    const expectedResponse = new HttpResponse({
      status: 201,
      statusText: 'Created',
      body: user,
    });
    req.event(expectedResponse);
  });

  it('updateUser', () => {
    let user = {
      id: 1,
      firstName: 'George',
      lastName: 'Franklin',
      address: '110 W. Church St.',
      city: 'Madison',
      telephone: '6085551023'
    };

    userService
      .updateUser(user.id.toString(), user)
      .subscribe((data) => expect(data).toEqual(user, 'updated user'), fail);

    const req = httpTestingController.expectOne(userService.entityUrl + '/'+user.id);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(user);
    const expectedResponse = new HttpResponse({
      status: 204,
      statusText: 'No Content',
      body: user,
    });
    req.event(expectedResponse);
  });

  it('delete User', () => {
    console.log('Inside Delete User');
    userService.deleteUser('1').subscribe();
    const req = httpTestingController.expectOne(userService.entityUrl + '/1');
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toEqual(null);
  });

  it('search for delete User', () => {

    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404,
      statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    userService.getUserById(1).subscribe((users) => {
      fail('Should have failed with 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toContain('404 error');
      }});

      const req = httpTestingController.expectOne(
        { method: 'GET', url:userService.entityUrl + '/1' });

    });
});

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
