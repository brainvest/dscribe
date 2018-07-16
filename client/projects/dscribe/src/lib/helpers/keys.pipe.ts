import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
	transform(value, args: string[]): any {
		let keys = [];
		for (const enumMember in value) {
			const val = parseInt(enumMember, 10);
			if (!isNaN(val)) {
				keys.push({key: val, value: value[enumMember]});
			}
		}
		return keys;
	}
}
