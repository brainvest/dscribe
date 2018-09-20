import {Component, Input, OnInit} from '@angular/core';
import {ConstantFilterNode} from '../../models/filter-nodes/constant-filter-node';
import {FilterTreeManipulator} from '../../models/filter-tree-manipulator';

@Component({
	selector: 'dscribe-constant-filter-node',
	templateUrl: './constant-filter-node.component.html',
	styleUrls: ['../filter-node/filter-node.component.scss']
})
export class ConstantFilterNodeComponent implements OnInit {

	@Input()
	node: ConstantFilterNode;

	constructor(public manipulator: FilterTreeManipulator) {
	}

	ngOnInit() {
	}

}
