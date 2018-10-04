import {NavigationComponent} from './navigation/navigation.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ListContainerComponent} from './list/list-container/list-container.component';
import {MetadataManagementComponent} from './administration/metadata-management/metadata-management.component';

export const DSCRIBE_ROUTES = [
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
