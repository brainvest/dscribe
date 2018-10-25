import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DscribeListTemplate} from '../../../../../src/lib/list/list-templating/dscribe-list-template.decorator';
import {DscribeTemplateComponent} from '../../../../../src/lib/list/list-templating/dscribe-template-component';
import {Router} from '@angular/router';

@DscribeListTemplate({
	entityTypeName: 'Product',
	options: {
		perRow: 4
	}
})
@Component({
	selector: 'dscribe-host-data-type-card',
	templateUrl: './data-type-card.component.html',
	styleUrls: ['./data-type-card.component.css']
})
export class DataTypeCardComponent implements DscribeTemplateComponent {
	@Input() data: any;
	@Input() select: boolean;
	@Output() selectChange = new EventEmitter<boolean>();

	constructor() {
	}
}
