import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EntityTypeBase } from '../../metadata/entity-type-base';
import { MetadataBasicInfoModel } from '../../metadata/metadata-basic-info-model';
import { MetadataManagementApiClient } from '../metadata-management-api-client';
import { SnackBarService } from '../../common/notifications/snackbar.service';
import {FacetDefinitionModel} from '../../metadata/facets/facet-definition-model';

@Component({
	selector: 'dscribe-add-n-edit-entity-type',
	templateUrl: './add-n-edit-entity-type.component.html',
	styleUrls: ['./add-n-edit-entity-type.component.css']
})
export class AddNEditEntityTypeComponent implements OnInit {

	entityType: EntityTypeBase = new EntityTypeBase();
	entityTypeError: EntityTypeBase;
	submitLoading = false;
	basicInfo: MetadataBasicInfoModel;

	constructor(
		private dialogRef: MatDialogRef<AddNEditEntityTypeComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AddNEditEntityTypeComponentData,
		private apiClient: MetadataManagementApiClient,
		private snackbarService: SnackBarService) {
		this.entityType = this.data.entityType;
		this.basicInfo = data.basicInfo;
		if (!this.data.isNew) {
			this.data.basicInfo.EntityTypeFacetDefinitions = [];
			this.setDefaultFacetValues();
		}
	}

	ngOnInit() {
	}

	setDefaultFacetValues() {
		const currentGeneralUsageCategory = this.data.basicInfo.EntityTypeGeneralUsageCategories
			.find(x => x.Id === this.data.entityType.EntityTypeGeneralUsageCategoryId);
		this.basicInfo.EntityTypeFacetDefinitions.forEach((x: FacetDefinitionModel) => {
			if (this.data.basicInfo.DefaultEntityTypeFacetValues[currentGeneralUsageCategory.Name]) {
				x.Default = this.data.basicInfo.DefaultEntityTypeFacetValues[currentGeneralUsageCategory.Name][x.Name];
			}
		});
		this.setEntityTypeFacetDefinitions();
	}

	setFacetCheckIcon(facetType: FacetDefinitionModel) {
		if (this.data.entityType.LocalFacets) {
			const localFacet = this.data.entityType.LocalFacets.find(x => x.FacetName === facetType.Name);
			if (localFacet) {
				if (localFacet.Value.toLowerCase() === 'false') {
					return 'check_box_outline_blank';
				} else if (localFacet.Value.toLowerCase() === 'true') {
					return 'check_box';
				}
			}
		}
		if (facetType.Default) {
			if (facetType.Default.toLowerCase() === 'false') {
				return 'check_box_outline_blank';
			} else if (facetType.Default.toLowerCase() === 'true') {
				return 'check_box';
			}
		}
		if (facetType.Default === undefined) {
			return 'check_box_outline_blank';
		}
	}

	getFacetName(facetType: FacetDefinitionModel) {
		if (!this.data.entityType.LocalFacets) {
			this.data.entityType.LocalFacets = [];
		}
		const localFacet = this.data.entityType.LocalFacets.find(x => x.FacetName === facetType.Name);
		if (localFacet) {
			if (localFacet.FacetName === facetType.Name) {
				return facetType.Name;
			}
		}
		return facetType.Name + ' ( Default )';
	}

	changeFacetValue(facetType: FacetDefinitionModel) {
		const localFacet = this.data.entityType.LocalFacets.find(x => x.FacetName === facetType.Name);
		if (!localFacet) {
			this.data.entityType.LocalFacets.push({
				FacetName: facetType.Name,
				Value: 'False'
			});
		} else {
			if (localFacet) {
				if (localFacet.Value.toLowerCase() === 'false') {
					localFacet.Value = 'True';
				} else if (localFacet.Value.toLowerCase() === 'true') {
					const index = this.data.entityType.LocalFacets.indexOf(localFacet);
					this.data.entityType.LocalFacets.splice(index, 1);
				}
			}
		}
	}

	setEntityTypeFacetDefinitions() {
		this.basicInfo.EntityTypeFacetDefinitions = [];
		const generalUsageCategory =
			this.basicInfo.EntityTypeGeneralUsageCategories.find(x => x.Id === this.entityType.EntityTypeGeneralUsageCategoryId);

		if (generalUsageCategory) {
			for (const g in this.basicInfo.DefaultEntityTypeFacetValues[generalUsageCategory.Name]) {
				if (generalUsageCategory) {
					let id = 0;
					this.basicInfo.EntityTypeFacetDefinitions.push({
						Id: ++id,
						Default: this.basicInfo.DefaultEntityTypeFacetValues[generalUsageCategory.Name][g],
						Name: g,
						DataType: ''
					});
				}
			}
		}
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
