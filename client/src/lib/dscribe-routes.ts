import { NavigationComponent } from './navigation/navigation.component';
import { ListContainerComponent } from './list/list-container/list-container.component';
import { MetadataManagementComponent } from './administration/metadata-management/metadata-management.component';
import { SettingsComponent } from './administration/settings/settings.component';
import { AppInstanceManagementComponent } from './administration/settings/app-instance-management/app-instance-management.component';
import { AppTypeManagementComponent } from './administration/settings/app-type-management/app-type-management.component';

export const DSCRIBE_ROUTES = [
	{
		path: '', component: NavigationComponent,
		children: [
			{ path: 'entity/:entityTypeName', component: ListContainerComponent },
			{ path: 'entity', component: ListContainerComponent },
			{ path: 'administration', component: MetadataManagementComponent },
			{
				path: 'setting', component: SettingsComponent,
				children: [
					{ path: 'app-instance-management', component: AppInstanceManagementComponent },
					{ path: 'app-type-management', component: AppTypeManagementComponent },
				]
			},
			{ path: '', redirectTo: 'entity', pathMatch: 'full' }
		]
	},
	{ path: '**', redirectTo: 'entity' }
];
