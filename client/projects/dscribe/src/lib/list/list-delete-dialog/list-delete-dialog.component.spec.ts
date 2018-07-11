import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeleteDialogComponent } from './list-delete-dialog.component';

describe('ListDeleteDialogComponent', () => {
  let component: ListDeleteDialogComponent;
  let fixture: ComponentFixture<ListDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
