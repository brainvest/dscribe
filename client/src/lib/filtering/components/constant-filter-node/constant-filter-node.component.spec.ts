import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConstantFilterNodeComponent} from './constant-filter-node.component';

describe('ValueConditionFilterNodeComponent', () => {
	let component: ConstantFilterNodeComponent;
	let fixture: ComponentFixture<ConstantFilterNodeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ConstantFilterNodeComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ConstantFilterNodeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
