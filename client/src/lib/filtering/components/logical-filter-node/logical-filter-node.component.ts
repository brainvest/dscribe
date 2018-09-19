import {Component, Input} from '@angular/core';
import {LogicalFilterNode} from '../../models/filter-nodes/logical-filter-node';
import {FilterTreeManipulator} from '../../models/filter-tree-manipulator';

@Component({
	selector: 'dscribe-logical-filter-node',
	templateUrl: './logical-filter-node.component.html',
	styleUrls: ['../filter-node/filter-node.component.scss']
})
export class LogicalFilterNodeComponent {

	@Input()
	node: LogicalFilterNode;

	constructor(public manipulator: FilterTreeManipulator) {
	}

}
