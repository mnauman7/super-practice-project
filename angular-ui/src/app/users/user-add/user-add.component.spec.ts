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

import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserAddComponent } from './user-add.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterStub } from '../../testing/router-stubs';
import { User } from '../user';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { UsersRoutingModule } from '../user-routing.module';
import { UserListComponent } from '../user-list/user-list.component';

class OwnserServiceStub {
  addUser(user: User): Observable<User> {
    return of(user);
  }
}

describe('UserAddComponent', () => {
  let component: UserAddComponent;
  let fixture: ComponentFixture<UserAddComponent>;
  let router: Router;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserAddComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [FormsModule, RouterTestingModule],
        providers: [
          { provide: UserService, useClass: OwnserServiceStub },
          { provide: Router, useClass: RouterStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserAddComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [FormsModule, RouterTestingModule],
        providers: [
          { provide: UserService, useClass: OwnserServiceStub },
          { provide: Router, useClass: RouterStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router=TestBed.get(Router);
    spyOn(router,'navigate');
  });

  it('should create UserAddComponent', () => {
    expect(component).toBeTruthy();
  });

  

  it('back button routing', async() => {
    let buttons = fixture.debugElement.queryAll(By.css('button'));
    let backbutton = buttons[0];
    backbutton.triggerEventHandler('click', null);
    spyOn(component, 'gotoUsersList').and.callThrough();
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

 
  it('add user', async(() => {
    let buttons = fixture.debugElement.queryAll(By.css('button'));
    let addUserButton = buttons[1].nativeElement;
    spyOn(component, 'onSubmit');
    addUserButton.click();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

});
