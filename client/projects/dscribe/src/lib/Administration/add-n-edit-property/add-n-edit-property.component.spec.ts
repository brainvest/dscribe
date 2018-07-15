import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNEditPropertyComponent } from './add-n-edit-property.component';

describe('AddNEditPropertyComponent', () => {
  let component: AddNEditPropertyComponent;
  let fixture: ComponentFixture<AddNEditPropertyComponent>;

  beforeEach(async(() => {
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
