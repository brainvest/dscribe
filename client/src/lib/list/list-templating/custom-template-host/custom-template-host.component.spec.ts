import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomTemplateHostComponent } from './custom-template-host.component';

describe('CustomTemplateHostComponent', () => {
  let component: CustomTemplateHostComponent;
  let fixture: ComponentFixture<CustomTemplateHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTemplateHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTemplateHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
