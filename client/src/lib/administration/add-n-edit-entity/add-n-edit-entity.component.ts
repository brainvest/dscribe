import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TypeBase } from '../../metadata/entity-base';
import { MetadataBasicInfoModel } from '../../metadata/metadata-basic-info-model';
import { MetadataManagementApiClient } from '../metadata-management-api-client';
import { SnackBarService } from '../../common/notifications/snackbar.service';

@Component({
	selector: 'dscribe-add-n-edit-entity',
	templateUrl: './add-n-edit-entity.component.html',
	styleUrls: ['./add-n-edit-entity.component.css']
})
export class AddNEditEntityComponent implements OnInit {

	entity: TypeBase = new TypeBase();

	constructor(
		private dialogRef: MatDialogRef<AddNEditEntityComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AddNEditEntityComponentData,
		private apiClient: MetadataManagementApiClient,
		private snackbarService: SnackBarService) {
	}

	ngOnInit() {
		this.entity = this.data.entity;
	}

	save() {
		const request = (this.data.isNew) ?
			this.apiClient.addEntity(this.entity) :
			this.apiClient.editEntity(this.entity);
		request.subscribe((data: any) => {
			this.dialogRef.close('saved');
		}, (errors: any) => {
			this.snackbarService.open(errors);
		});
	}

	cancel() {
		this.dialogRef.close();
	}

}

export class AddNEditEntityComponentData {
	constructor(
		public entity: TypeBase,
		public isNew: boolean,
		public basicInfo: MetadataBasicInfoModel) {}

	get action() {
		return this.isNew ? 'Add' : 'Edit';
	}

}
