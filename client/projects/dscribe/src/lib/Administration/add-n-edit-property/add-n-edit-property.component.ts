import {Component, Inject, OnInit} from '@angular/core';
import {AddNEditPropertyMetadataModel, RelatedPropertyAction} from '../models/add-n-edit-property-metadata-model';
import {MetadataBasicInfoModel} from '../../metadata/metadata-basic-info-model';
import {TypeBase} from '../../metadata/entity-base';
import {DataTypeModel} from '../../metadata/data-type-model';
import {PropertyBase} from '../../metadata/property-base';
import {AddNEditEntityComponent} from '../add-n-edit-entity/add-n-edit-entity.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MetadataManagementApiClient} from '../metadata-management-api-client';
import {PropertyInfoModel} from '../models/property-info-model';

@Component({
	selector: 'dscribe-add-n-edit-property',
	templateUrl: './add-n-edit-property.component.html',
	styleUrls: ['./add-n-edit-property.component.css']
})
export class AddNEditPropertyComponent implements OnInit {

	property: AddNEditPropertyMetadataModel;
	basicInfo: MetadataBasicInfoModel;
	entities: TypeBase[];
	actions = RelatedPropertyAction;
	thisTypeProperties: PropertyBase[];
	allProperties: PropertyInfoModel[];

	constructor(
		private dialogRef: MatDialogRef<AddNEditEntityComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AddNEditPropertyComponentData,
		private apiClient: MetadataManagementApiClient) {
		this.property = data.property;
		this.basicInfo = data.basicInfo;
		this.entities = data.entities;
		this.thisTypeProperties = data.thisTypeProperties;
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
			x.dataTypeEntityId === this.property.dataTypeEntityId
		);
	}

	get compatibleInverseProperties() {
		if (this.property.dataTypeId ===  DataTypeModel.NavigationalDataTypeIds.navigationProperty) {
			return this.allProperties.filter(x =>
				x.ownerEntityId === this.property.dataTypeEntityId &&
				x.dataTypeId === DataTypeModel.NavigationalDataTypeIds.navigationList &&
				x.dataTypeEntityId === this.property.ownerEntityId);
		}
		return this.allProperties.filter(x =>
			x.ownerEntityId === this.property.dataTypeEntityId &&
			x.dataTypeId === DataTypeModel.NavigationalDataTypeIds.navigationProperty &&
			x.dataTypeEntityId === this.property.ownerEntityId);
	}

	ngOnInit() {
	}

	save() {
		const request = this.data.isNew ?
			this.apiClient.addProperty(this.property) :
			this.apiClient.editProperty(this.property);
		request.subscribe(result => this.dialogRef.close('saved'));
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
		public entities: TypeBase[],
		public thisTypeProperties: PropertyBase[],
		public allProperties: PropertyInfoModel[]) {
	}
}
