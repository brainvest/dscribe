import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HasTypeInfo} from '../metadata/property-metadata';
import {DataTypes} from '../metadata/data-types';

@Component({
	selector: 'dscribe-property-editor',
	templateUrl: './property-editor.component.html'
})
export class PropertyEditorComponent implements OnChanges {
	@Input() property: HasTypeInfo;
	@Input() entity: any;
	@Input() color: string;

	@Input() selectionList?: any[];
	@Input() dataType?: string;
	@Input() overridePropertyName: string;
	@Input() width: string;
	@Input() isFilter: boolean;

	inputType: string;

	ngOnChanges(changes: SimpleChanges) {
		if (changes['property'] && changes['property'].currentValue !== changes['property'].previousValue) {
			switch (this.property && this.property.DataType) {
				case DataTypes.bool:
					this.inputType = 'checkbox';
					break;
				case DataTypes.Date:
					this.inputType = 'date';
					break;
				case DataTypes.DateTime:
					this.inputType = 'datetime';
					break;
				case DataTypes.int:
				case DataTypes.decimal:
					this.inputType = 'Number';
					break;
				case DataTypes.ForeignKey:
					this.inputType = 'entitySelector';
					break;
				case DataTypes.NavigationList:
					this.inputType = 'entityListEditor';
					break;
				default:
					this.inputType = 'Text';
			}
		}
	}
}
