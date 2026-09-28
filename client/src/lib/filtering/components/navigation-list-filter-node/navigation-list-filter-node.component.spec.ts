import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {NavigationListFilterNodeComponent} from './navigation-list-filter-node.component';

describe('NavigationListFilterNodeComponent', () => {
	let component: NavigationListFilterNodeComponent;
	let fixture: ComponentFixture<NavigationListFilterNodeComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [NavigationListFilterNodeComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NavigationListFilterNodeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
