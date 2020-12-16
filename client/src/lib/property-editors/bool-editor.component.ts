import {Component, Input} from '@angular/core';
import {MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS} from '@angular/material/checkbox';
import {PropertyMetadata} from '../metadata/property-metadata';

@Component({
	selector: 'dscribe-bool-editor',
	templateUrl: './bool-editor.component.html',
	providers: [
		{provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions }
	  ]
})
export class BoolEditorComponent {
	@Input() entity: any;
	@Input() property: PropertyMetadata;
	@Input() color: string;
	@Input() overridePropertyName: string;
	@Input() isFilter: boolean;

	next() {
		const val = this.entity[this.overridePropertyName || this.property.Name];
		let nextVal: boolean;
		if (!this.property.IsNullable) {
			nextVal = !val;
		} else {
			nextVal = val == null ? true : val ? false : null;
		}
		this.entity[this.overridePropertyName || this.property.Name] = nextVal;
	}
}
