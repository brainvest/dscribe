import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTypeManagementComponent } from './app-type-management.component';


describe('AppTypeManagementComponent', () => {
	let component: AppTypeManagementComponent;
	let fixture: ComponentFixture<AppTypeManagementComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppTypeManagementComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppTypeManagementComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
