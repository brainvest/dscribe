import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ComparisonFilterNodeComponent} from './comparison-filter-node.component';

describe('ValueConditionFilterNodeComponent', () => {
	let component: ComparisonFilterNodeComponent;
	let fixture: ComponentFixture<ComparisonFilterNodeComponent>;

	beforeEach(waitForAsync(() => {
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
