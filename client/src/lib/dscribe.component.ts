import {Component, Input, Output, EventEmitter} from '@angular/core';
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

	@Input()
	set username(value: string) {
		this.config.username = value;
	}

	@Output()
	public loggedOut = new EventEmitter<void>();

	constructor(private config: DscribeService) {
		config.loggedOut.subscribe(() => {
			this.loggedOut.next();
		});
	}

}
