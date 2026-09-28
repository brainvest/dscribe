import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddNEditPropertyComponent } from './add-n-edit-property.component';

describe('AddNEditPropertyComponent', () => {
  let component: AddNEditPropertyComponent;
  let fixture: ComponentFixture<AddNEditPropertyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNEditPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNEditPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
