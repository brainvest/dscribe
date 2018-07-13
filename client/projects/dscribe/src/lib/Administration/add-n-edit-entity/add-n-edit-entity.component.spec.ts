import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNEditEntityComponent } from './add-n-edit-entity.component';

describe('AddNEditEntityComponent', () => {
  let component: AddNEditEntityComponent;
  let fixture: ComponentFixture<AddNEditEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNEditEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNEditEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
