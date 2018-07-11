import {Component, Input, OnInit} from '@angular/core';
import {ArithmeticFilterNode} from '../../models/filter-nodes/arithmetic-filter-node';
import {FilterTreeManipulator} from '../../models/filter-tree-manipulator';

@Component({
	selector: 'dscribe-arithmetic-filter-node',
	templateUrl: './arithmetic-filter-node.component.html',
	styleUrls: ['../filter-node/filter-node.component.scss']
})
export class ArithmeticFilterNodeComponent implements OnInit {

	@Input()
	node: ArithmeticFilterNode;

	constructor(public manipulator: FilterTreeManipulator) {
	}

	ngOnInit() {
	}

}
