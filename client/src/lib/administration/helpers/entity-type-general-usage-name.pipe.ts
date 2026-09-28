import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	standalone: false,
	name: 'entityGeneralUsageName'
})
export class EntityTypeGeneralUsageNamePipe implements PipeTransform {

	transform(value: any, args?: any): any {
		return null;
	}

}
