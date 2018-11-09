import { Component, OnInit, Inject } from '@angular/core';
import { AppInstanceInfoModel } from 'src/lib/common/models/app-instance-info-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppManagementService } from 'src/lib/common/services/app-management.service';
import { SnackBarService } from 'src/lib/common/notifications/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppTypeModel } from 'src/lib/common/models/app-type.model';
import { DatabaseProviderModel } from 'src/lib/common/models/database-provider.model';
import { ConnectionStringModel } from 'src/lib/common/models/connection-string.model';

@Component({
	selector: 'dscribe-host-add-n-edit-app-instance',
	templateUrl: './add-n-edit-app-instance.component.html',
	styleUrls: ['./add-n-edit-app-instance.component.css']
})
export class AddNEditAppInstanceComponent implements OnInit {


	appInstance: AppInstanceInfoModel = new AppInstanceInfoModel();
	appInstanceError: AppInstanceInfoModel;
	appTypes: AppTypeModel[] = [];
	databaseProviders: DatabaseProviderModel[] = [];

	constructor(
		private dialogRef: MatDialogRef<AddNEditAppInstanceComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AddNEditAppInstanceComponentData,
		private appManagementService: AppManagementService,
		private snackbarService: SnackBarService) {
		this.appInstanceError = new AppInstanceInfoModel();
		this.appInstanceError.dataConnectionString = new ConnectionStringModel();
	}
	ngOnInit() {
		this.appInstance = JSON.parse(JSON.stringify(this.data.appInstance));
		if (!this.appInstance.dataConnectionString) {
			this.appInstance.dataConnectionString = new ConnectionStringModel();
		}

		this.getAppTypes();
		this.getDatabaseProvider();
	}

	getAppTypes() {
		this.appTypes = [];
		this.appManagementService.getAppTypes().subscribe(
			(res: AppTypeModel[]) => {
				this.appTypes = res;
			}, (error: HttpErrorResponse) => {
				this.snackbarService.open(error.error);
			}
		);
	}

	getDatabaseProvider() {
		this.databaseProviders = [];
		this.appManagementService.getDatabaseProviders().subscribe(
			(res: DatabaseProviderModel[]) => {
				this.databaseProviders = res;
			}, (error: HttpErrorResponse) => {
				this.snackbarService.open(error.error);
			}
		);
	}

	save() {
		const request = (this.data.isNew) ?
			this.appManagementService.addAppInstance(this.appInstance) :
			this.appManagementService.editAppInstance(this.appInstance);
		request.subscribe((data: any) => {
			this.dialogRef.close('saved');
		}, (error: HttpErrorResponse) => {
			this.appInstanceError = error.error;
			this.snackbarService.open(error.statusText);
		});
	}

	cancel() {
		this.dialogRef.close();
	}

}

export class AddNEditAppInstanceComponentData {
	constructor(
		public appInstance: AppInstanceInfoModel,
		public isNew: boolean) { }

	get action() {
		return this.isNew ? 'Add' : 'Edit';
	}
}
