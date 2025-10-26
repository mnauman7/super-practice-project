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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';
import { UserDetailComponent } from './user-detail.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../testing/router-stubs';
import { User } from '../user';
import { Observable, of } from 'rxjs';

class UserServiceStub {
  getUserById(): Observable<User> {
    return of({ id: 1, firstName: 'James', lastName: 'Franklin'  } as User);
  }
}

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userService = new UserServiceStub();
  let de: DebugElement;
  let el: HTMLElement;
  let router: Router;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserDetailComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [FormsModule, RouterTestingModule],
        providers: [
          { provide: UserService, useClass: UserServiceStub },
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        ],
      }).compileComponents();
    })
  );
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserDetailComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [FormsModule, RouterTestingModule],
        providers: [
          { provide: UserService, useValue: userService },
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        ],
      }).compileComponents();
    })
  );

  const user: User = {
    id: 10,
    firstName: 'James',
    lastName: 'Franklin',
    address: '110 W. Liberty St.',
    city: 'Madison',
    telephone: '6085551023'
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create UserDetailComponent', () => {
    expect(component).toBeTruthy();
  });

  it('find user using userId', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // wait for async getUsers
      fixture.detectChanges(); // update view with name
      de = fixture.debugElement.query(By.css('.userFullName'));
      el = de.nativeElement;
      expect(el.innerText).toBe(
        user.firstName.toString() + ' ' + user.lastName.toString()
      );
    });
  });

  it('routing to users page on click of editUser,addPet,gotoUsersList', () => {
    spyOn(router, 'navigate');
    let buttons = fixture.debugElement.queryAll(By.css('button'));

    let usersListButton = buttons[0].nativeElement;
    usersListButton.click();
    spyOn(component, 'gotoUsersList').and.callThrough();
    expect(router.navigate).toHaveBeenCalledWith(['/users']);

    let editUserButton = buttons[1].nativeElement;
    editUserButton.click();
    spyOn(component, 'editUser').and.callThrough();
    expect(router.navigate).toHaveBeenCalledWith(['/users']);

    let addNewPetButton = buttons[2].nativeElement;
    addNewPetButton.click();
    spyOn(component, 'addPet').and.callThrough();
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

});
