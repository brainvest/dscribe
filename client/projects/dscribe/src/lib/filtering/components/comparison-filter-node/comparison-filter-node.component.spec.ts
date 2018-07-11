import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ComparisonFilterNodeComponent} from './comparison-filter-node.component';

describe('ValueConditionFilterNodeComponent', () => {
	let component: ComparisonFilterNodeComponent;
	let fixture: ComponentFixture<ComparisonFilterNodeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ComparisonFilterNodeComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ComparisonFilterNodeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
