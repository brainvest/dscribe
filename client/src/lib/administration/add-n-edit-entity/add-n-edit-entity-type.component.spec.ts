import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddNEditEntityTypeComponent } from './add-n-edit-entity-type.component';

describe('AddNEditEntityTypeComponent', () => {
  let component: AddNEditEntityTypeComponent;
  let fixture: ComponentFixture<AddNEditEntityTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNEditEntityTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNEditEntityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
