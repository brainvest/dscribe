import {Pipe, PipeTransform} from '@angular/core';
import {DataHandlerService} from './services/data-handler.service';
import {Observable, of} from 'rxjs';
import {ListColumn} from '../list/models/list-column';
import {DataTypes} from '../metadata/data-types';

@Pipe({
	name: 'displayValue'
})
export class DisplayValuePipe implements PipeTransform {

	constructor(private dataHandlerService: DataHandlerService) {
	}

	transform(value: any, property: ListColumn): Observable<string> {
		if (property.dataType !== DataTypes.ForeignKey) {
			return of(value);
		}
		if (value + '' === 'Loading...') {
			return of('Loading...');
		}
		const id = parseInt(value);
		if (isNaN(id)) {
			return of(value);
		}
		return this.dataHandlerService.getName(property.dataTypeEntity, id);
	}
}
