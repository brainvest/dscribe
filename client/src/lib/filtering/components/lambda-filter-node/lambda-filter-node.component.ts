import {Component, Input} from '@angular/core';
import {LambdaFilterNode} from '../../models/filter-nodes/lambda-filter-node';

@Component({
	standalone: false,
	selector: 'dscribe-lambda-filter-node',
	templateUrl: './lambda-filter-node.component.html',
	styleUrls: ['../filter-node/filter-node.component.scss']
})
export class LambdaFilterNodeComponent {

	@Input()
	node: LambdaFilterNode;

	constructor() {
	}
}
