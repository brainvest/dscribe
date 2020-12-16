import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DscribeComponent } from './dscribe.component';

describe('DscribeComponent', () => {
  let component: DscribeComponent;
  let fixture: ComponentFixture<DscribeComponent>;

  beforeEach(waitForAsync(() => {
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
