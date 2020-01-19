import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DscribeService} from '../dscribe.service';
import {AppInstanceInformation} from '../common/models/app-instance-information';

@Component({
	selector: 'dscribe-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
	appInstances: AppInstanceInformation[] = [];
	selectedAppInstance: AppInstanceInformation;
	clientRoot: string;

	constructor(private router: Router, private httpClient: HttpClient, private config: DscribeService) {
		this.clientRoot = config.getClientRoot();
	}

	ngOnInit() {
		this.httpClient.post<AppInstanceInformation[]>(this.config.url('api/AppManagement/GetAppInstancesInfoForHome'), null)
			.subscribe(apps => {
				this.appInstances = apps;
				this.appInstanceSelected(apps[0]);
			});
	}

	appInstanceSelected(appInstance: AppInstanceInformation) {
		this.config.appInstance = appInstance;
		this.selectedAppInstance = appInstance;
	}
}
