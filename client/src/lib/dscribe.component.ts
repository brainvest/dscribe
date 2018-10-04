import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DscribeService} from './dscribe.service';
import {NavigationComponent} from './navigation/navigation.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ListContainerComponent} from './list/list-container/list-container.component';
import {MetadataManagementComponent} from './administration/metadata-management/metadata-management.component';

@Component({
	selector: 'dscribe-root',
	template: `
		<router-outlet></router-outlet>
	`
})
export class DscribeComponent implements OnChanges {
	@Input() authHeaderFetcher: () => string;


	static DSCRIBE_ROUTES = [
		{
			path: '', component: NavigationComponent,
			children: [
				{path: '', redirectTo: 'main', pathMatch: 'full'},
				{path: 'main', component: HomePageComponent},
				{path: 'entity/:entity', component: ListContainerComponent},
				{path: 'administration', component: MetadataManagementComponent}
			]
		},
		{path: '**', redirectTo: 'main'}
	];

	constructor(private config: DscribeService) {
	}

	ngOnChanges(changes: SimpleChanges) {
		const fetcherChange = changes['authHeaderFetcher'];
		if (fetcherChange && fetcherChange.currentValue !== fetcherChange.previousValue) {
			this.config.authHeaderFetcher = this.authHeaderFetcher;
		}
	}

}
