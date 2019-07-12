import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAndRolesManagementComponent } from './users-and-roles-management.component';

describe('UsersAndRolesManagementComponent', () => {
  let component: UsersAndRolesManagementComponent;
  let fixture: ComponentFixture<UsersAndRolesManagementComponent>;

  beforeEach(async(() => {
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
