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
	@Input() isFilter: boolean;

	onModelChange(event: any) {
		event.setTime(event.getTime() - (event.getTimezoneOffset() * 60 * 1000)); // To prevent changes of date because of time zone.
		this.entity[this.overridePropertyName || this.property.Name] = event.toJSON();
		console.log(this.entity[this.overridePropertyName || this.property.Name]);
	}

	makeNull() {
		this.entity[this.overridePropertyName || this.property.Name] = null;
	}
}
