import {Component, OnInit} from '@angular/core';
import {MetadataService} from '../common/services/metadata.service';
import {EntityMetadata} from '../metadata/entity-metadata';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppInstanceInfoModel} from '../common/models/app-instance-info-model';
import {DscribeService} from '../dscribe.service';

@Component({
	selector: 'dscribe-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
	entities: EntityMetadata[];
	mainUrls = ['entity', 'administration'];
	sideNavOpen = true;
	appInstances: AppInstanceInfoModel[] = [];
	selectedAppInstance: AppInstanceInfoModel;

	constructor(private metadata: MetadataService, private router: Router, private httpClient: HttpClient,
							private metaData: MetadataService, private config: DscribeService) {
	}

	ngOnInit() {
		this.navigate(this.mainUrls[0]);

		this.httpClient.post<AppInstanceInfoModel[]>(this.config.url('api/AppManagement/getAppInstancesInfo'), null)
			.subscribe(apps => {
				this.appInstances = apps;
				this.appInstanceSelected(apps[0]);
			});
	}

	navigate(url: string) {
		this.router.navigateByUrl(url);
	}

	appInstanceSelected(appInstance: AppInstanceInfoModel) {
		this.config.appInstance = appInstance;
		this.selectedAppInstance = appInstance;
		this.metadata.clearMetadata();
		this.metadata.getMetadata().getAllTypes()
			.subscribe(entities => {
				this.entities = entities;
				if (this.entities && this.entities.length) {
					this.mainUrls[0] = 'entity/' + this.entities[0].name;
					this.router.navigateByUrl(this.mainUrls[0]);
				}
			});
	}
}
