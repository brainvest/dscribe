import { FacetDefinitionModel } from './../../metadata/facets/facet-definition-model';
import { element } from 'protractor';
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
	submitLoading = false;

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

		if (!this.data.isNew) {
			this.setDefaultFacetValues();
		}
	}

	setDefaultFacetValues() {
		const currentGeneralUsageCategory = this.data.basicInfo.PropertyGeneralUsageCategories
			.find(x => x.Id === this.data.property.PropertyGeneralUsageCategoryId);
		this.basicInfo.PropertyFacetDefinitions.forEach((x: FacetDefinitionModel) => {
			x.Default = this.data.basicInfo.DefaultPropertyFacetValues[currentGeneralUsageCategory.Name][x.Name];
		});
	}

	changeFacetValue(facetType: FacetDefinitionModel) {
		const localFacet = this.data.property.LocalFacets.find(x => x.FacetName === facetType.Name);
		if (!localFacet) {
			this.data.property.LocalFacets.push({
				FacetName: facetType.Name,
				Value: 'False'
			});
		} else {
			if (localFacet) {
				if (localFacet.Value.toLowerCase() === 'false') {
					localFacet.Value = 'True';
				} else if (localFacet.Value.toLowerCase() === 'true') {
					const index = this.data.property.LocalFacets.indexOf(localFacet);
					this.data.property.LocalFacets.splice(index, 1);
				}
			}
		}
	}

	getFacetName(facetType: FacetDefinitionModel) {
		const localFacet = this.data.property.LocalFacets.find(x => x.FacetName === facetType.Name);
		if (localFacet) {
			if (localFacet.FacetName === facetType.Name) {
				return facetType.Name;
			}
		}
		return facetType.Name + ' ( Default )';
	}

	setFacetCheckIcon(facetType: FacetDefinitionModel) {
		const localFacet = this.data.property.LocalFacets.find(x => x.FacetName === facetType.Name);
		if (localFacet) {
			if (localFacet.Value.toLowerCase() === 'false') {
				return 'check_box_outline_blank';
			} else if (localFacet.Value.toLowerCase() === 'true') {
				return 'check_box';
			}
		}
		if (facetType.Default.toLowerCase() === 'false') {
			return 'check_box_outline_blank';
		} else if (facetType.Default.toLowerCase() === 'true') {
			return 'check_box';
		}
	}

	get isNavigation() {
		return this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.ForeignKey ||
			this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationProperty ||
			this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationList;
	}

	get isNavigationProperty() {
		return this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationProperty;
	}

	get hasInverseProperty() {
		return this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationProperty ||
			this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationList;
	}

	get compatibleForeignKeys() {
		return this.thisTypeProperties.filter(x =>
			x.DataTypeId === DataTypeModel.NavigationalDataTypeIds.ForeignKey &&
			x.DataEntityTypeId === this.property.DataEntityTypeId
		);
	}

	get compatibleInverseProperties() {
		if (this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationProperty) {
			return this.allProperties.filter(x =>
				x.OwnerEntityTypeId === this.property.DataEntityTypeId &&
				x.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationList &&
				x.DataEntityTypeId === this.property.OwnerEntityTypeId);
		}
		return this.allProperties.filter(x =>
			x.OwnerEntityTypeId === this.property.DataEntityTypeId &&
			x.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationProperty &&
			x.DataEntityTypeId === this.property.OwnerEntityTypeId);
	}

	ngOnInit() {
	}

	save() {
		this.submitLoading = true;
		const request = this.data.isNew ?
			this.apiClient.addProperty(this.property) :
			this.apiClient.editProperty(this.property);
		request.subscribe((result: any) => {
			this.dialogRef.close('saved');
			this.submitLoading = false;
		}, (error: HttpErrorResponse) => {
			this.propertyError = error.error;
			this.snackbarService.open(error.statusText);
			this.submitLoading = false;
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
