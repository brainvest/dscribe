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
		if (property.dataType === DataTypes.ForeignKey) {
			if (value + '' === 'Loading...') {
				return of('Loading...');
			}
			if (!value) {
				return of(value);
			}
			return this.dataHandlerService.getName(property.dataEntityTypeName, value);
		}
		if (property.dataType === DataTypes.Date) {
			if (!value) {
				return of(value);
			}
			return of(value.toString().substr(0, 10));
		}
		if (property.behaviors && property.behaviors.find(x => x.BehaviorName == 'DisplayAsDate' || x.BehaviorName == 'ShowDatePicker')) {
			if (!value) {
				return of (null);
			}
			const date = new Date(value);
			return of(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
		}
		if (property.behaviors && property.behaviors.find(x => x.BehaviorName == 'DisplayAsDateTime' || x.BehaviorName == 'ShowDateTimePicker')) {
			if (!value) {
				return of (null);
			}
			const date = new Date(value);
			return of(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
		}
		return of(value);
	}
}
