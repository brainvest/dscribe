import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddNEditAppTypeComponent } from './add-n-edit-app-type.component';

describe('AddNEditAppTypeComponent', () => {
  let component: AddNEditAppTypeComponent;
  let fixture: ComponentFixture<AddNEditAppTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNEditAppTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNEditAppTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
