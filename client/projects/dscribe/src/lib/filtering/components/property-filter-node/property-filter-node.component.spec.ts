import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PropertyFilterNodeComponent} from './property-filter-node.component';

describe('PropertyFilterNodeComponent', () => {
	let component: PropertyFilterNodeComponent;
	let fixture: ComponentFixture<PropertyFilterNodeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PropertyFilterNodeComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PropertyFilterNodeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
