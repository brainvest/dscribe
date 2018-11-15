import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppTypeModel } from 'src/lib/common/models/app-type.model';
import { AppManagementService } from 'src/lib/common/services/app-management.service';
import { SnackBarService } from 'src/lib/common/notifications/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'dscribe-host-add-n-edit-app-type',
	templateUrl: './add-n-edit-app-type.component.html',
	styleUrls: ['./add-n-edit-app-type.component.css']
})
export class AddNEditAppTypeComponent implements OnInit {


	appType: AppTypeModel = new AppTypeModel();
	appTypeError: AppTypeModel;
	submitLoading = false;
	constructor(
		private dialogRef: MatDialogRef<AddNEditAppTypeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AddNEditAppTypeComponentData,
		private appManagementService: AppManagementService,
		private snackbarService: SnackBarService) {
	}
	ngOnInit() {
		this.appType = JSON.parse(JSON.stringify(this.data.appType));
	}

	save() {
		this.submitLoading = true;
		const request = (this.data.isNew) ?
			this.appManagementService.addAppType(this.appType) :
			this.appManagementService.editAppType(this.appType);
		request.subscribe((data: any) => {
			this.submitLoading = false;
			this.dialogRef.close('saved');
		}, (error: HttpErrorResponse) => {
			this.appTypeError = error.error;
			this.snackbarService.open(error.statusText);
			this.submitLoading = false;
		});
	}

	cancel() {
		this.dialogRef.close();
	}

}

export class AddNEditAppTypeComponentData {
	constructor(
		public appType: AppTypeModel,
		public isNew: boolean) { }

	get action() {
		return this.isNew ? 'Add' : 'Edit';
	}
}
