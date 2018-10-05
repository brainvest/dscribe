import {Component, Input} from '@angular/core';
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
export class DscribeComponent {
	@Input()
	set authHeaderFetcher(value: () => string) {
		this.config.authHeaderFetcher = value;
	}

	static DSCRIBE_ROUTES = [
		{
			path: '', component: NavigationComponent,
			children: [
				{path: 'main', component: HomePageComponent},
				{path: 'entity/:entity', component: ListContainerComponent},
				{path: 'administration', component: MetadataManagementComponent},
				{path: '', redirectTo: 'main', pathMatch: 'full'}
			]
		},
		{path: '**', redirectTo: 'main'}
	];


	constructor(private config: DscribeService) {
	}

}
