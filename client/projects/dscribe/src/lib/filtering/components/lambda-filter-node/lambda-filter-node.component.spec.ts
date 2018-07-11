import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LambdaFilterNodeComponent} from './lambda-filter-node.component';

describe('LambdaFilterNodeComponent', () => {
	let component: LambdaFilterNodeComponent;
	let fixture: ComponentFixture<LambdaFilterNodeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LambdaFilterNodeComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LambdaFilterNodeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
