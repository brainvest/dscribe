import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppInstanceManagementComponent } from './app-instance-management.component';

describe('AppInstanceManagementComponent', () => {
  let component: AppInstanceManagementComponent;
  let fixture: ComponentFixture<AppInstanceManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppInstanceManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInstanceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
