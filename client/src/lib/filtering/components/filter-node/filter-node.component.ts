import {Component, Input, ViewEncapsulation} from '@angular/core';
import {FilterNode} from '../../models/filter-nodes/filter-node';
import {FilterNodeType} from '../../models/filter-node-type';
import {FilterTreeManipulator} from '../../models/filter-tree-manipulator';

@Component({
	selector: 'dscribe-filter-node',
	templateUrl: './filter-node.component.html',
	styleUrls: ['./filter-node.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class FilterNodeComponent {
	@Input() node: FilterNode;

	nodeTypes = FilterNodeType;

	constructor(public manipulator: FilterTreeManipulator) {

	}
 
}
