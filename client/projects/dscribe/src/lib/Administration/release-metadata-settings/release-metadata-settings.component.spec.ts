import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseMetadataSettingsComponent } from './release-metadata-settings.component';

describe('ReleaseMetadataSettingsComponent', () => {
  let component: ReleaseMetadataSettingsComponent;
  let fixture: ComponentFixture<ReleaseMetadataSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseMetadataSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseMetadataSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
