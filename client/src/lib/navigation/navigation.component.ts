import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppInstanceInfoModel} from '../common/models/app-instance-info-model';
import {DscribeService} from '../dscribe.service';

@Component({
	selector: 'dscribe-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
	appInstances: AppInstanceInfoModel[] = [];
	selectedAppInstance: AppInstanceInfoModel;

	constructor(private router: Router, private httpClient: HttpClient, private config: DscribeService) {

	}

	ngOnInit() {
		this.httpClient.post<AppInstanceInfoModel[]>(this.config.url('api/AppManagement/getAppInstancesInfo'), null)
			.subscribe(apps => {
				this.appInstances = apps;
				this.appInstanceSelected(apps[0]);
			});
	}

	appInstanceSelected(appInstance: AppInstanceInfoModel) {
		this.config.appInstance = appInstance;
		this.selectedAppInstance = appInstance;
	}
}
