import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularLib } from './angular-lib';

describe('AngularLib', () => {
  let component: AngularLib;
  let fixture: ComponentFixture<AngularLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularLib],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularLib);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
