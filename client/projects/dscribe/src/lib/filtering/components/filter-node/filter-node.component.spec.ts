import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterNodeComponent} from './filter-node.component';

describe('FilterNodeComponent', () => {
	let component: FilterNodeComponent;
	let fixture: ComponentFixture<FilterNodeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FilterNodeComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FilterNodeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
