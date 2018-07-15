import {Component, Input} from '@angular/core';
import {PropertyMetadata} from '../metadata/property-metadata';

@Component({
	selector: 'dscribe-date-editor',
	templateUrl: './date-editor.component.html'
})
export class DateEditorComponent {
	@Input() entity: any;
	@Input() property: PropertyMetadata;
	@Input() color: string;
	@Input() overridePropertyName: string;

	onModelChange(event: any) {
		this.entity[this.overridePropertyName || this.property.jsName] = event.toISOString();
	}
}
