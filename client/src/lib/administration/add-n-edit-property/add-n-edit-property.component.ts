import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AddNEditPropertyMetadataModel, RelatedPropertyAction } from '../models/add-n-edit-property-metadata-model';
import { MetadataBasicInfoModel } from '../../metadata/metadata-basic-info-model';
import { EntityTypeBase } from '../../metadata/entity-type-base';
import { DataTypeModel } from '../../metadata/data-type-model';
import { PropertyBase } from '../../metadata/property-base';
import { AddNEditEntityTypeComponent } from '../add-n-edit-entity/add-n-edit-entity-type.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MetadataManagementApiClient } from '../metadata-management-api-client';
import { PropertyInfoModel } from '../models/property-info-model';
import { SnackBarService } from '../../common/notifications/snackbar.service';

@Component({
	selector: 'dscribe-add-n-edit-property',
	templateUrl: './add-n-edit-property.component.html',
	styleUrls: ['./add-n-edit-property.component.css']
})
export class AddNEditPropertyComponent implements OnInit {

	property: AddNEditPropertyMetadataModel;
	propertyError: AddNEditPropertyMetadataModel;
	basicInfo: MetadataBasicInfoModel;
	entityTypes: EntityTypeBase[];
	actions = RelatedPropertyAction;
	thisTypeProperties: PropertyBase[];
	allProperties: PropertyInfoModel[];

	constructor(
		private dialogRef: MatDialogRef<AddNEditEntityTypeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AddNEditPropertyComponentData,
		private apiClient: MetadataManagementApiClient,
		private snackbarService: SnackBarService) {
		this.property = data.property;
		this.basicInfo = data.basicInfo;
		this.entityTypes = data.entityTypes;
		this.thisTypeProperties = data.thisEntityTypeProperties;
		this.allProperties = data.allProperties;
	}

	get isNavigation() {
		return this.property.dataTypeId === DataTypeModel.NavigationalDataTypeIds.foreignKey ||
			this.property.dataTypeId === DataTypeModel.NavigationalDataTypeIds.navigationProperty ||
			this.property.dataTypeId === DataTypeModel.NavigationalDataTypeIds.navigationList;
	}

	get isNavigationProperty() {
		return this.property.dataTypeId === DataTypeModel.NavigationalDataTypeIds.navigationProperty;
	}

	get hasInverseProperty() {
		return this.property.dataTypeId === DataTypeModel.NavigationalDataTypeIds.navigationProperty ||
			this.property.dataTypeId === DataTypeModel.NavigationalDataTypeIds.navigationList;
	}

	get compatibleForeignKeys() {
		return this.thisTypeProperties.filter(x =>
			x.dataTypeId === DataTypeModel.NavigationalDataTypeIds.foreignKey &&
			x.dataEntityTypeId === this.property.dataEntityTypeId
		);
	}

	get compatibleInverseProperties() {
		if (this.property.dataTypeId === DataTypeModel.NavigationalDataTypeIds.navigationProperty) {
			return this.allProperties.filter(x =>
				x.ownerEntityTypeId === this.property.dataEntityTypeId &&
				x.dataTypeId === DataTypeModel.NavigationalDataTypeIds.navigationList &&
				x.dataEntityTypeId === this.property.ownerEntityTypeId);
		}
		return this.allProperties.filter(x =>
			x.ownerEntityTypeId === this.property.dataEntityTypeId &&
			x.dataTypeId === DataTypeModel.NavigationalDataTypeIds.navigationProperty &&
			x.dataEntityTypeId === this.property.ownerEntityTypeId);
	}

	ngOnInit() {
	}

	save() {
		const request = this.data.isNew ?
			this.apiClient.addProperty(this.property) :
			this.apiClient.editProperty(this.property);
		request.subscribe((result: any) => {
			this.dialogRef.close('saved');
		}, (error: HttpErrorResponse) => {
			this.propertyError = error.error;
			this.snackbarService.open(error.statusText);
		});
	}

	cancel() {
		this.dialogRef.close();
	}

}

export class AddNEditPropertyComponentData {
	constructor(
		public property: AddNEditPropertyMetadataModel,
		public isNew,
		public basicInfo: MetadataBasicInfoModel,
		public entityTypes: EntityTypeBase[],
		public thisEntityTypeProperties: PropertyBase[],
		public allProperties: PropertyInfoModel[]) {
	}
}
