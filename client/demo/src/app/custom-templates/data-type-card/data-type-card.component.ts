import {Component, Input} from '@angular/core';
import {DscribeListTemplate} from '../../../../../src/lib/list/list-templating/dscribe-list-template.decorator';
import {DscribeTemplateComponent} from '../../../../../src/lib/list/list-templating/dscribe-template-component';
import {Router} from '@angular/router';

@DscribeListTemplate({
	entityTypeName: 'DataTable',
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

	constructor(private router: Router) {
	}

	goToDatasources() {
		this.router.navigateByUrl('entity/DataSource');
	}
}
