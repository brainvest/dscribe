import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LogicalFilterNodeComponent} from './logical-filter-node.component';

describe('LogicalFilterNodeComponent', () => {
	let component: LogicalFilterNodeComponent;
	let fixture: ComponentFixture<LogicalFilterNodeComponent>;

	beforeEach(async(() => {
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
