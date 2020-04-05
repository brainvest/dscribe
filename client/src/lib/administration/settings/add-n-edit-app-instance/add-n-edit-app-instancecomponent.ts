import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AppInstanceModel } from '../../../common/models/app-instance-model';
import { AppTypeModel } from '../../../common/models/app-type.model';
import { DatabaseProviderModel } from '../../../common/models/database-provider.model';
import { AppManagementService } from '../../../common/services/app-management.service';
import { SnackBarService } from '../../../common/notifications/snackbar.service';
import { ConnectionStringModel } from '../../../common/models/connection-string.model';

export class AddNEditAppInstanceComponentData {
	constructor(
		public appInstance: AppInstanceModel,
		public isNew: boolean) {
	}

	get action() {
		return this.isNew ? 'Add' : 'Edit';
	}
}

@Component({
	selector: 'dscribe-host-add-n-edit-app-instance',
	templateUrl: './add-n-edit-app-instance.component.html',
	styleUrls: ['./add-n-edit-app-instance.component.css']
})
export class AddNEditAppInstanceComponent implements OnInit {


	appInstance: AppInstanceModel = new AppInstanceModel();
	appInstanceError: AppInstanceModel;
	appTypes: AppTypeModel[] = [];
	databaseProviders: DatabaseProviderModel[] = [];
	submitLoading = false;

	constructor(
		private dialogRef: MatDialogRef<AddNEditAppInstanceComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AddNEditAppInstanceComponentData,
		private appManagementService: AppManagementService,
		private snackbarService: SnackBarService) {
		this.appInstanceError = new AppInstanceModel();
	}

	ngOnInit() {
		this.appInstance = JSON.parse(JSON.stringify(this.data.appInstance));
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
		this.submitLoading = true;
		const request = (this.data.isNew) ?
			this.appManagementService.addAppInstance(this.appInstance) :
			this.appManagementService.editAppInstance(this.appInstance);
		request.subscribe((data: any) => {
			this.dialogRef.close('saved');
			this.submitLoading = false;
			this.snackbarService.open('Success');
		}, (error: HttpErrorResponse) => {
			this.appInstanceError = error.error.errors ? error.error.errors : new AppInstanceModel();
			this.snackbarService.open(error.statusText);
			this.submitLoading = false;
		});
	}

	cancel() {
		this.dialogRef.close();
	}
}
