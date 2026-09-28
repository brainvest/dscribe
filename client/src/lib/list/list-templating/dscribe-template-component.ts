import {EventEmitter} from '@angular/core';

export interface DscribeTemplateComponent {
	data: any;
	select: boolean;
	selectChange: EventEmitter<boolean>;
}
