import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsersAndRolesManagementComponent } from './users-and-roles-management.component';

describe('UsersAndRolesManagementComponent', () => {
  let component: UsersAndRolesManagementComponent;
  let fixture: ComponentFixture<UsersAndRolesManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAndRolesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAndRolesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
