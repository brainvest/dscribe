import {Component, Input} from '@angular/core';
import {HasTypeInfo} from '../metadata/property-metadata';

@Component({
	selector: 'dscribe-number-editor',
	templateUrl: './number-editor.component.html',
	styles: ['input { width: 100%; }']
})
export class NumberEditorComponent {
	@Input() entity: any;
	@Input() property: HasTypeInfo;
	@Input() color: string;
	@Input() overridePropertyName: string;
}
