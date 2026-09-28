import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListAddNEditDialogComponent } from './list-add-n-edit-dialog.component';

describe('ListAddNEditDialogComponent', () => {
  let component: ListAddNEditDialogComponent;
  let fixture: ComponentFixture<ListAddNEditDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAddNEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAddNEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
