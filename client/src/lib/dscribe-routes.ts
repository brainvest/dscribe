import {NavigationComponent} from './navigation/navigation.component';
import {ListContainerComponent} from './list/list-container/list-container.component';
import {MetadataManagementComponent} from './administration/metadata-management/metadata-management.component';

export const DSCRIBE_ROUTES = [
	{
		path: '', component: NavigationComponent,
		children: [
			{path: 'entity/:entity', component: ListContainerComponent},
			{path: 'entity', component: ListContainerComponent},
			{path: 'administration', component: MetadataManagementComponent},
			{path: '', redirectTo: 'entity', pathMatch: 'full'}
		]
	},
	{path: '**', redirectTo: 'entity'}
];
