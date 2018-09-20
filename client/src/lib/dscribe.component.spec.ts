import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DscribeComponent } from './dscribe.component';

describe('DscribeComponent', () => {
  let component: DscribeComponent;
  let fixture: ComponentFixture<DscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
