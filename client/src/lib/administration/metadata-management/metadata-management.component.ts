import { Component, OnInit, ViewChild } from '@angular/core';
import { MetadataManagementApiClient } from '../metadata-management-api-client';
import { MetadataBasicInfoModel } from '../../metadata/metadata-basic-info-model';
import { EntityTypeBase } from '../../metadata/entity-type-base';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { PropertyBase } from '../../metadata/property-base';
import { AddNEditEntityTypeComponent, AddNEditEntityTypeComponentData } from '../add-n-edit-entity/add-n-edit-entity-type.component';
import { AddNEditPropertyComponent, AddNEditPropertyComponentData } from '../add-n-edit-property/add-n-edit-property.component';
import { AddNEditPropertyMetadataModel } from '../models/add-n-edit-property-metadata-model';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';
import { PropertyInfoModel } from '../models/property-info-model';
import { ReleaseMetadataSettingsComponent } from '../release-metadata-settings/release-metadata-settings.component';
import { DscribeService } from '../../dscribe.service';
import { SnackBarService } from '../../common/notifications/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'dscribe-metadata-management',
	templateUrl: './metadata-management.component.html',
	styleUrls: ['./metadata-management.component.css']
})
export class MetadataManagementComponent implements OnInit {

	basicInfo: MetadataBasicInfoModel;
	entityTypes: EntityTypeBase[] = [];
	entityTypesDataSource = new MatTableDataSource<EntityTypeBase>(this.entityTypes);
	selectedEntityType: EntityTypeBase;
	entityTypesAreLoading = false;
	generateCodeLoading = false;
	deleteEntityLoading = false;
	deletePropertyLoading = false;
	properties: PropertyBase[];
	allPropertiesInfo: PropertyInfoModel[];
	propertiesDataSource = new MatTableDataSource<PropertyBase>();
	selectedProperty: PropertyBase;
	propertiesAreLoading = false;
	displayedEntityTypeColumns = ['name', 'usage', 'singular', 'plural', 'code', 'displayName'];
	displayedPropertyColumns = ['Name', 'title', 'dataType', 'nullable', 'dataEntityType', 'usage', 'foreignKey', 'inverse'];

	@ViewChild('entityTypesPaginator') entityTypesPaginator: MatPaginator;
	@ViewChild('propertiesPaginator') propertiesPaginator: MatPaginator;

	constructor(
		private apiClient: MetadataManagementApiClient,
		private dialog: MatDialog,
		private snackbarService: SnackBarService,
		private dscribeService: DscribeService) { }

	ngOnInit() {
		this.entityTypesDataSource.paginator = this.entityTypesPaginator;
		this.propertiesDataSource.paginator = this.propertiesPaginator;
		this.entityTypesAreLoading = true;
		this.dscribeService.appInstance$.subscribe(() =>
			this.apiClient.getBasicInfo().subscribe(data => {
				this.basicInfo = data;
				this.refreshEntityTypes();
			}, (errors: any) => {
				this.snackbarService.open(errors);
			}));
	}

	refreshEntityTypes() {
		this.apiClient.getEntityTypes()
			.subscribe(entityTypes => {
				this.entityTypesDataSource.data = this.entityTypes = entityTypes;
				this.entityTypesAreLoading = false;
			}, (errors: any) => {
				this.snackbarService.open(errors);
			});
	}

	selectEntityType(entityType: EntityTypeBase) {
		if (entityType === this.selectedEntityType) {
			return;
		}
		this.propertiesDataSource.data = this.properties = [];
		this.selectedEntityType = entityType;
		if (entityType) {
			this.refreshProperties();
		}
	}

	selectProperty(property: PropertyBase) {
		this.selectedProperty = property;
	}

	refreshProperties() {
		this.propertiesAreLoading = true;
		this.apiClient.getAllPropertiesInfo()
			.subscribe(info => this.allPropertiesInfo = info);
		this.apiClient.getProperties(this.selectedEntityType.Id)
			.subscribe(props => {
				this.propertiesDataSource.data = this.properties = props;
				this.propertiesAreLoading = false;
			});
	}

	getEntityTypeUsageName(id: number) {
		return this.basicInfo.EntityTypeGeneralUsageCategories.find(x => x.Id === id)!.Name;
	}

	getPropertyUsageName(id: number) {
		return this.basicInfo.PropertyGeneralUsageCategories.find(x => x.Id === id)!.Name;
	}

	getDataTypeName(id: number) {
		return this.basicInfo.DataTypes.find(x => x.Id === id)!.Name;
	}

	getEntityTypeName(id: number) {
		if (!id) {
			return null;
		}
		return this.entityTypes.find(x => x.Id === id)!.Name;
	}

	getPropertyName(id: number) {
		if (!id) {
			return;
		}
		const prop = this.properties.find(x => x.Id === id);
		if (prop) {
			return prop.Name;
		}
		return this.allPropertiesInfo!.find(x => x.id === id).name;
	}

	addEntityType() {
		this.openAddNEditEntityTypeDialog({}, true);
	}

	editEntityType() {
		if (!this.selectedEntityType) {
			return;
		}
		this.openAddNEditEntityTypeDialog(this.selectedEntityType, false);
	}

	deleteEntityType() {
		this.deleteEntityLoading = true;
		if (!this.selectedEntityType) {
			return;
		}
		ConfirmationDialogComponent.Ask(this.dialog, 'Are you sure you want to delete this entity type?', 'This action cannot be undone')
			.subscribe(x => {
				if (x) {
					this.apiClient.deleteEntityType(this.selectedEntityType)
						.subscribe(() => {
							this.refreshEntityTypes();
							this.deleteEntityLoading = false;
						}, (error: HttpErrorResponse) => {
							this.snackbarService.open(error.error);
							this.deleteEntityLoading = false;
						});
				} else {
					this.deleteEntityLoading = false;
				}
			});
	}

	openAddNEditEntityTypeDialog(instance: any, isNew: boolean) {
		const dialogRef = this.dialog.open(AddNEditEntityTypeComponent, {
			width: '800px',
			disableClose: true,
			data: new AddNEditEntityTypeComponentData(instance, isNew, this.basicInfo)
		});
		dialogRef.afterClosed().subscribe(
			result => {
				if (result !== undefined) {
					this.refreshEntityTypes();
				}
			}, (errors: any) => {
				this.snackbarService.open(errors);
			}
		);
	}

	addProperty() {
		const instance = new AddNEditPropertyMetadataModel();
		instance.OwnerEntityTypeId = this.selectedEntityType.Id;
		this.openAddNEditPropertyDialog(instance, true);
	}

	editProperty() {
		if (!this.selectedProperty) {
			return;
		}
		this.apiClient.getPropertyForEdit(this.selectedProperty.Id)
			.subscribe(property => {
				this.openAddNEditPropertyDialog(property, false);
			}, (errors: any) => {
				this.snackbarService.open(errors);
			});
	}

	deleteProperty() {
		this.deletePropertyLoading = true;
		if (!this.selectedProperty) {
			return;
		}
		ConfirmationDialogComponent.Ask(this.dialog, 'Are you sure you want to delete this property?', 'This action cannot be undone.')
			.subscribe(x => {
				if (x) {
					this.apiClient.deleteProperty(this.selectedProperty).subscribe(
						() => {
							this.refreshProperties();
						},
						(errors: any) => {
							this.snackbarService.open(errors);
						});
				} else {
					this.deletePropertyLoading = false;
				}
			}, (errors: any) => {
				this.snackbarService.open(errors);
				this.deletePropertyLoading = false;
			});
	}

	openAddNEditPropertyDialog(instance: AddNEditPropertyMetadataModel, isNew: boolean) {
		const dialogRef = this.dialog.open(AddNEditPropertyComponent, {
			width: '800px',
			disableClose: true,
			data: new AddNEditPropertyComponentData(instance, isNew, this.basicInfo, this.entityTypes,
				this.properties, this.allPropertiesInfo)
		});
		dialogRef.afterClosed().subscribe(
			result => {
				if (result !== undefined) {
					this.refreshProperties();
				}
			}, (errors: any) => {
				this.snackbarService.open(errors);
			}
		);
	}

	openReleaseSettings() {
		this.dialog.open(ReleaseMetadataSettingsComponent, {
			width: '300px',
			disableClose: true,
		});
	}

	generateCode() {
		this.generateCodeLoading = true;
		this.apiClient.generateCode()
			.subscribe((x: any) => {
				this.generateCodeLoading = false;
				if (x.Success) {
					this.snackbarService.open('Code has generated successful.');
				} else {
					this.snackbarService.open('errors occured please see the validation errors');
				}
			}, (errors: any) => {
				this.generateCodeLoading = false;
				this.snackbarService.open(errors);
			});
	}
}


