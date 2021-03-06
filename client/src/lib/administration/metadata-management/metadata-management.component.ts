import { Component, OnInit, ViewChild } from '@angular/core';
import { MetadataManagementApiClient } from '../metadata-management-api-client';
import { MetadataBasicInfoModel } from '../../metadata/metadata-basic-info-model';
import { EntityTypeBase } from '../../metadata/entity-type-base';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyBase } from '../../metadata/property-base';
import {AddNEditEntityTypeComponentData} from "../add-n-edit-entity/add-n-edit-entity-type-component-data";
import { AddNEditPropertyComponent } from '../add-n-edit-property/add-n-edit-property.component';
import { AddNEditPropertyComponentData } from '../add-n-edit-property/add-n-edit-property-component-data';
import { AddNEditPropertyMetadataModel } from '../models/add-n-edit-property-metadata-model';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';
import { PropertyInfoModel } from '../models/property-info-model';
import { ReleaseMetadataSettingsComponent } from '../release-metadata-settings/release-metadata-settings.component';
import { DscribeService } from '../../dscribe.service';
import { SnackBarService } from '../../common/notifications/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EntityHistoryComponent } from '../history/entity-history/entity-history.component';
import { EntityTypeHistoryModel } from '../models/history/entity-type-history-model';
import { PropertyHistoryModel } from '../models/history/property-type-history-model';
import { PropertyHistoryComponent } from '../history/property-history/property-history.component';
import { HistoryType } from '../models/history/history-type';
import {AddNEditEntityTypeComponent} from '../add-n-edit-entity/add-n-edit-entity-type.component';

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

	@ViewChild('entityTypesPaginator', { static: true }) entityTypesPaginator: MatPaginator;
	@ViewChild('propertiesPaginator', { static: true }) propertiesPaginator: MatPaginator;

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
		return this.allPropertiesInfo!.find(x => x.Id === id).Name;
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

	showEntityHistory() {
		const data = new EntityTypeHistoryModel();
		data.EntityType.Id = this.selectedEntityType.Id;
		data.EntityType.Name = this.selectedEntityType.Name;
		data.basicInfo = this.basicInfo;
		data.historyType = HistoryType.addEdit;
		const dialogRef = this.dialog.open(EntityHistoryComponent, {
			width: '90%',
			data: data
		});
		dialogRef.afterClosed().subscribe(
			(res => {

			})
		);
	}

	showDeletedEntityTypeHistory() {
		const data = new EntityTypeHistoryModel();
		data.basicInfo = this.basicInfo;
		data.historyType = HistoryType.deleted;
		const dialogRef = this.dialog.open(EntityHistoryComponent, {
			width: '90%',
			data: data
		});
		dialogRef.afterClosed().subscribe(
			(res => {

			})
		);
	}

	showPropertyHistory() {
		const data = new PropertyHistoryModel();
		data.Property.Id = this.selectedProperty.Id;
		data.Property.Name = this.selectedProperty.Name;
		data.basicInfo = this.basicInfo;
		data.entityTypes = this.entityTypes;
		data.properties = this.properties;
		data.allPropertiesInfo = this.allPropertiesInfo;
		data.historyType = HistoryType.addEdit;

		const dialogRef = this.dialog.open(PropertyHistoryComponent, {
			width: '90%',
			data: data
		});
		dialogRef.afterClosed().subscribe(
			(res => {

			})
		);
	}

	showDeletedPropertiesTypeHistory() {
		const data = new PropertyHistoryModel();
		data.properties = this.properties;
		data.basicInfo = this.basicInfo;
		data.entityTypes = this.entityTypes;
		data.properties = this.properties;
		data.allPropertiesInfo = this.allPropertiesInfo;
		data.historyType = HistoryType.deleted;

		const dialogRef = this.dialog.open(PropertyHistoryComponent, {
			width: '90%',
			data: data
		});
		dialogRef.afterClosed().subscribe(
			(res => {

			})
		);
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
				}
				this.deletePropertyLoading = false;
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
