import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {LogicalFilterNodeComponent} from './logical-filter-node.component';

describe('LogicalFilterNodeComponent', () => {
	let component: LogicalFilterNodeComponent;
	let fixture: ComponentFixture<LogicalFilterNodeComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [LogicalFilterNodeComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LogicalFilterNodeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
