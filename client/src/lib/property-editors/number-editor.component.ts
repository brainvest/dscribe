import {Component, Input} from '@angular/core';
import {PropertyMetadata} from '../metadata/property-metadata';

@Component({
	standalone: false,
	selector: 'dscribe-number-editor',
	templateUrl: './number-editor.component.html'
})
export class NumberEditorComponent {
	@Input() entity: any;
	@Input() property: PropertyMetadata;
	@Input() color: string;
	@Input() overridePropertyName: string;
	@Input() isFilter: boolean;
}

