import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DscribeService} from './dscribe.service';

@Component({
	selector: 'dscribe-root',
	template: `
		<router-outlet></router-outlet>
	`
})
export class DscribeComponent implements OnChanges {
	@Input() authHeaderFetcher: () => string;

	constructor(private config: DscribeService) {
	}

	ngOnChanges(changes: SimpleChanges) {
		const fetcherChange = changes['authHeaderFetcher'];
		if (fetcherChange && fetcherChange.currentValue !== fetcherChange.previousValue) {
			this.config.authHeaderFetcher = this.authHeaderFetcher;
		}
	}

}
