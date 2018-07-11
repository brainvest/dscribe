import {Component, Input} from '@angular/core';
import {PropertyMetadata} from '../metadata/property-metadata';

@Component({
	selector: 'dscribe-text-editor',
	templateUrl: './text-editor.component.html',
	styles: ['input { width: 100%; }']
})
export class TextEditorComponent {
	@Input() entity: any;
	@Input() property: PropertyMetadata;
	@Input() color: string;
	@Input() overridePropertyName: string;
}
