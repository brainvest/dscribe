import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypeCardComponent } from './data-type-card.component';

describe('DataTypeCardComponent', () => {
  let component: DataTypeCardComponent;
  let fixture: ComponentFixture<DataTypeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTypeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
