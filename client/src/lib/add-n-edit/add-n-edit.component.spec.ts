import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddNEditComponent } from './add-n-edit.component';

describe('AddNEditComponent', () => {
  let component: AddNEditComponent;
  let fixture: ComponentFixture<AddNEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
