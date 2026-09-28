import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MetadataManagementComponent } from './metadata-management.component';

describe('MetadataManagementComponent', () => {
  let component: MetadataManagementComponent;
  let fixture: ComponentFixture<MetadataManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
