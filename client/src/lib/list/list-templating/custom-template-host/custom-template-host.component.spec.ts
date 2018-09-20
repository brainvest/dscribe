import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTemplateHostComponent } from './custom-template-host.component';

describe('CustomTemplateHostComponent', () => {
  let component: CustomTemplateHostComponent;
  let fixture: ComponentFixture<CustomTemplateHostComponent>;

  beforeEach(async(() => {
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
