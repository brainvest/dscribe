import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppManagementService } from 'src/lib/common/services/app-management.service';
import { AppInstanceInfoModel } from 'src/lib/common/models/app-instance-info-model';
import { SnackBarService } from 'src/lib/common/notifications/snackbar.service';

@Component({
	selector: 'dscribe-host-app-instance-management',
	templateUrl: './app-instance-management.component.html',
	styleUrls: ['./app-instance-management.component.css']
})
export class AppInstanceManagementComponent implements OnInit {

	displayedAppInstanceColumns = ['name', 'title', 'appTypeName', 'isEnabled', 'isProduction'];
	appInstances: AppInstanceInfoModel[] = [];
	selectedAppInstance: AppInstanceInfoModel = new AppInstanceInfoModel();
	appInstancesDataSource = new MatTableDataSource<AppInstanceInfoModel>(this.appInstances);


	@ViewChild('entitiyTypesPaginator') AppInstancePaginator: MatPaginator;


	constructor(
		private appManagementService: AppManagementService,
		private snackBarService: SnackBarService) { }

	ngOnInit() {
		this.appInstancesDataSource.paginator = this.AppInstancePaginator;
		this.getAppInstances();
	}

	getAppInstances() {
		this.appInstances = [];
		this.appManagementService.getAppInstancesInfo().subscribe(
			(res: any) => {
				this.appInstances = res;
				this.appInstancesDataSource.data = this.appInstances = res;
			}, (error: any) => {
				this.snackBarService.open(error);
			}
		);
	}

	selectAppInstance(appInstance: AppInstanceInfoModel) {
		if (appInstance === this.selectedAppInstance) {
			return;
		}
		this.selectedAppInstance = appInstance;
	}
}
