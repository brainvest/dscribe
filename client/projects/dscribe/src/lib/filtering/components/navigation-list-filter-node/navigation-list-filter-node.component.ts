import {Component, Input, OnInit} from '@angular/core';
import {NavigationListFilterNode} from '../../models/filter-nodes/navigation-list-filter-node';

@Component({
	selector: 'dscribe-navigation-list-filter-node',
	templateUrl: './navigation-list-filter-node.component.html',
	styleUrls: ['../filter-node/filter-node.component.scss']
})
export class NavigationListFilterNodeComponent implements OnInit {

	@Input()
	node: NavigationListFilterNode;

	constructor() {
	}

	ngOnInit() {
	}

}
