import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppManagementService } from 'src/lib/common/services/app-management.service';
import { SnackBarService } from 'src/lib/common/notifications/snackbar.service';
import { AppTypeModel } from 'src/lib/common/models/app-type.model';

@Component({
	selector: 'dscribe-host-app-type-management',
	templateUrl: './app-type-management.component.html',
	styleUrls: ['./app-type-management.component.css']
})
export class AppTypeManagementComponent implements OnInit {

	displayedAppTypeColumns = ['name', 'title', 'appTypeName', 'isEnabled', 'isProduction'];
	appTypes: AppTypeModel[] = [];
	selectedAppType: AppTypeModel = new AppTypeModel();
	appTypesDataSource = new MatTableDataSource<AppTypeModel>(this.appTypes);


	@ViewChild('entitiyTypesPaginator') AppTypePaginator: MatPaginator;


	constructor(
		private appManagementService: AppManagementService,
		private snackBarService: SnackBarService) { }

	ngOnInit() {
		this.appTypesDataSource.paginator = this.AppTypePaginator;
		this.getAppTypes();
	}

	getAppTypes() {
		this.appTypes = [];
		this.appManagementService.getAppTypes().subscribe(
			(res: any) => {
				this.appTypes = res;
				this.appTypesDataSource.data = this.appTypes = res;
			}, (error: any) => {
				this.snackBarService.open(error);
			}
		);
	}

	selectAppType(appType: AppTypeModel) {
		if (appType === this.selectedAppType) {
			return;
		}
		this.selectedAppType = appType;
	}
}
