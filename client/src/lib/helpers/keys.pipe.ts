import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
	transform(value): any {
		const keys = [];
		for (const enumMember in value) {
			if (!value.hasOwnProperty(enumMember)) {
				continue;
			}
			const val = parseInt(enumMember, 10);
			if (!isNaN(val)) {
				keys.push({key: val, value: value[enumMember]});
			}
		}
		return keys;
	}
}
