import {Component, Input, OnInit} from '@angular/core';
import {ComparisonFilterNode} from '../../models/filter-nodes/comparison-filter-node';
import {FilterTreeManipulator} from '../../models/filter-tree-manipulator';

@Component({
	selector: 'dscribe-comparison-filter-node',
	templateUrl: './comparison-filter-node.component.html',
	styleUrls: ['../filter-node/filter-node.component.scss']
})
export class ComparisonFilterNodeComponent implements OnInit {

	@Input()
	node: ComparisonFilterNode;

	constructor(public manipulator: FilterTreeManipulator) {
	}

	ngOnInit() {
	}

}
