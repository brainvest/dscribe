import {Component, OnInit} from '@angular/core';
import {MetadataService} from '../../../../src/lib/common/services/metadata.service';
import {EntityTypeMetadata} from '../../../../src/lib/metadata/entity-type-metadata';
import {DscribeService} from '../../../../src/lib/dscribe.service';
import {environment} from '../../environments/environment';
import {AppInstanceInformation} from '../../../../src/lib/common/models/app-instance-information';
import {HttpClient} from '@angular/common/http';

@Component({
	selector: 'dscribe-host-sample-list',
	templateUrl: './sample-list.component.html',
	styleUrls: ['./sample-list.component.css']
})
export class SampleListComponent implements OnInit {

	constructor(
		private metadata: MetadataService,
		private dscribeService: DscribeService,
		private httpClient: HttpClient) {
		this.httpClient.post<AppInstanceInformation[]>(this.dscribeService.url('api/AppManagement/GetAppInstancesInfoForHome'), null)
			.subscribe(apps => {
				this.dscribeService.appInstance = apps[0];
			});
		this.dscribeService.setServerRoot(environment.apiServerRoot);
	}

	entityType: EntityTypeMetadata;

	ngOnInit() {
		this.metadata.getEntityTypeByName('Address')
			.subscribe(x => this.entityType = x);
	}

}
