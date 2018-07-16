import {Component, Input} from '@angular/core';
import {PropertyMetadata} from '../metadata/property-metadata';

@Component({
	selector: 'dscribe-entity-select',
	templateUrl: './entity-select.component.html'
})
export class EntitySelectComponent {
	@Input() entity: any;
	@Input() property: PropertyMetadata;
	@Input() color: string;
	@Input() list: any[];
	@Input() overridePropertyName: string;
	@Input() isFilter: boolean;
}
