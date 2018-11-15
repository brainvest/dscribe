import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EntityTypeBase } from '../../metadata/entity-type-base';
import { MetadataBasicInfoModel } from '../../metadata/metadata-basic-info-model';
import { MetadataManagementApiClient } from '../metadata-management-api-client';
import { SnackBarService } from '../../common/notifications/snackbar.service';

@Component({
	selector: 'dscribe-add-n-edit-entity-type',
	templateUrl: './add-n-edit-entity-type.component.html',
	styleUrls: ['./add-n-edit-entity-type.component.css']
})
export class AddNEditEntityTypeComponent implements OnInit {

	entityType: EntityTypeBase = new EntityTypeBase();
	entityTypeError: EntityTypeBase;
	submitLoading = false;

	constructor(
		private dialogRef: MatDialogRef<AddNEditEntityTypeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AddNEditEntityTypeComponentData,
		private apiClient: MetadataManagementApiClient,
		private snackbarService: SnackBarService) {
	}

	ngOnInit() {
		this.entityType = this.data.entityType;
	}

	save() {
		this.submitLoading = true;
		const request = (this.data.isNew) ?
			this.apiClient.addEntityType(this.entityType) :
			this.apiClient.editEntityType(this.entityType);
		request.subscribe((data: any) => {
			this.dialogRef.close('saved');
			this.submitLoading = false;
		}, (error: HttpErrorResponse) => {
			this.entityTypeError = error.error;
			this.snackbarService.open(error.statusText);
			this.submitLoading = false;
		});
	}

	cancel() {
		this.dialogRef.close();
	}

}

export class AddNEditEntityTypeComponentData {
	constructor(
		public entityType: EntityTypeBase,
		public isNew: boolean,
		public basicInfo: MetadataBasicInfoModel) { }

	get action() {
		return this.isNew ? 'Add' : 'Edit';
	}

}
