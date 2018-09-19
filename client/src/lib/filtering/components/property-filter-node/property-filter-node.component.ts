import {Component, Input, OnInit} from '@angular/core';
import {PropertyFilterNode} from '../../models/filter-nodes/property-filter-node';
import {FilterNodeType} from '../../models/filter-node-type';
import {FilterTreeManipulator} from '../../models/filter-tree-manipulator';

@Component({
	selector: 'dscribe-property-filter-node',
	templateUrl: './property-filter-node.component.html',
	styleUrls: ['../filter-node/filter-node.component.scss'],
})
export class PropertyFilterNodeComponent implements OnInit {

	@Input()
	node: PropertyFilterNode;
	nodeTypes = FilterNodeType;

	constructor(public manipulator: FilterTreeManipulator) {
	}

	ngOnInit() {
	}
}
