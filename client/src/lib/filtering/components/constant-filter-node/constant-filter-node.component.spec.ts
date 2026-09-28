import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ConstantFilterNodeComponent} from './constant-filter-node.component';

describe('ValueConditionFilterNodeComponent', () => {
	let component: ConstantFilterNodeComponent;
	let fixture: ComponentFixture<ConstantFilterNodeComponent>;

	beforeEach(waitForAsync(() => {
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
