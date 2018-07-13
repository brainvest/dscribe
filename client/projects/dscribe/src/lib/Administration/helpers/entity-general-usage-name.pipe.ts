import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'entityGeneralUsageName'
})
export class EntityGeneralUsageNamePipe implements PipeTransform {

	transform(value: any, args?: any): any {
		return null;
	}

}
