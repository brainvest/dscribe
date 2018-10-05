import {Component, Input} from '@angular/core';
import {DscribeService} from './dscribe.service';

@Component({
	selector: 'dscribe-root',
	template: `
		<router-outlet></router-outlet>
	`
})
export class DscribeComponent {
	@Input()
	set authHeaderFetcher(value: () => string) {
		this.config.authHeaderFetcher = value;
	}

	constructor(private config: DscribeService) {
	}

}
