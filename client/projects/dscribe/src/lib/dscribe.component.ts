import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DscribeInterceptor} from './common/dscribe-interceptor';

@Component({
	selector: 'dscribe-root',
	template: `
		<router-outlet></router-outlet>
	`
})
export class DscribeComponent implements OnChanges {
	@Input() authHeaderFetcher: Function;

	constructor() {
	}

	ngOnChanges(changes: SimpleChanges) {
		const fetcherChange = changes['authHeaderFetcher'];
		if (fetcherChange && fetcherChange.currentValue !== fetcherChange.previousValue) {
			DscribeInterceptor.authHeaderFetcher = this.authHeaderFetcher;
		}
	}

}
