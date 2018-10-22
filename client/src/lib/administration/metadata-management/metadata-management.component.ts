import { Component, OnInit, ViewChild } from '@angular/core';
import { MetadataManagementApiClient } from '../metadata-management-api-client';
import { MetadataBasicInfoModel } from '../../metadata/metadata-basic-info-model';
import { TypeBase } from '../../metadata/entity-base';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { PropertyBase } from '../../metadata/property-base';
import { AddNEditEntityComponent, AddNEditEntityComponentData } from '../add-n-edit-entity/add-n-edit-entity.component';
import { AddNEditPropertyComponent, AddNEditPropertyComponentData } from '../add-n-edit-property/add-n-edit-property.component';
import { AddNEditPropertyMetadataModel } from '../models/add-n-edit-property-metadata-model';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';
import { PropertyInfoModel } from '../models/property-info-model';
import { ReleaseMetadataSettingsComponent } from '../release-metadata-settings/release-metadata-settings.component';
import { SnackBarService } from 'src/lib/common/notifications/snackbar.service';

@Component({
	selector: 'dscribe-metadata-management',
	templateUrl: './metadata-management.component.html',
	styleUrls: ['./metadata-management.component.css']
})
export class MetadataManagementComponent implements OnInit {

	basicInfo: MetadataBasicInfoModel;
	entities: TypeBase[] = [];
	entitiesDataSource = new MatTableDataSource<TypeBase>(this.entities);
	selectedEntity: TypeBase;
	entitiesAreLoading = false;

	properties: PropertyBase[];
	allPropertiesInfo: PropertyInfoModel[];
	propertiesDataSource = new MatTableDataSource<PropertyBase>();
	selectedProperty: PropertyBase;
	propertiesAreLoading = false;
	displayedEntityColumns = ['name', 'usage', 'singular', 'plural', 'code', 'displayName'];
	displayedPropertyColumns = ['name', 'title', 'dataType', 'nullable', 'dataTypeEntity', 'usage', 'foreignKey', 'inverse'];

	@ViewChild('entitiesPaginator') entitiesPaginator: MatPaginator;
	@ViewChild('propertiesPaginator') propertiesPaginator: MatPaginator;

	constructor(
		private apiClient: MetadataManagementApiClient,
		private dialog: MatDialog,
		private snackbarService: SnackBarService) { }

	ngOnInit() {
		this.entitiesDataSource.paginator = this.entitiesPaginator;
		this.propertiesDataSource.paginator = this.propertiesPaginator;
		this.entitiesAreLoading = true;
		this.apiClient.getBasicInfo()
			.subscribe(
				(data: any) => {
					this.basicInfo = data;
					this.refreshEntities();
				}, (errors: any) => {
					this.snackbarService.open(errors);
				});
	}

	refreshEntities() {
		this.apiClient.getTypes()
			.subscribe(entities => {
				this.entitiesDataSource.data = this.entities = entities;
				this.entitiesAreLoading = false;
			}, (errors: any) => {
				this.snackbarService.open(errors);
			});
	}

	selectEntity(entity: TypeBase) {
		if (entity === this.selectedEntity) {
			return;
		}
		this.propertiesDataSource.data = this.properties = [];
		this.selectedEntity = entity;
		if (entity) {
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
		this.apiClient.getProperties(this.selectedEntity.id)
			.subscribe(props => {
				this.propertiesDataSource.data = this.properties = props;
				this.propertiesAreLoading = false;
			}, (errors: any) => {
				this.snackbarService.open(errors);
			});
	}

	getEntityUsageName(id: number) {
		return this.basicInfo.entityGeneralUsageCategories.find(x => x.id === id)!.name;
	}

	getPropertyUsageName(id: number) {
		return this.basicInfo.propertyGeneralUsageCategories.find(x => x.id === id)!.name;
	}

	getDataTypeName(id: number) {
		return this.basicInfo.dataTypes.find(x => x.id === id)!.name;
	}

	getEntityName(id: number) {
		if (!id) {
			return null;
		}
		return this.entities.find(x => x.id === id)!.name;
	}

	getPropertyName(id: number) {
		if (!id) {
			return;
		}
		const prop = this.properties.find(x => x.id === id);
		if (prop) {
			return prop.name;
		}
		return this.allPropertiesInfo.find(x => x.id === id).name;
	}

	addEntity() {
		this.openAddNEditEntityDialog({}, true);
	}

	editEntity() {
		if (!this.selectedEntity) {
			return;
		}
		this.openAddNEditEntityDialog(this.selectedEntity, false);
	}

	deleteEntity() {
		if (!this.selectedEntity) {
			return;
		}
		ConfirmationDialogComponent.Ask(this.dialog, 'Are you sure you want to delete this entity?', 'This action cannot be undone')
			.subscribe(x => {
				if (x) {
					this.apiClient.deleteEntity(this.selectedEntity)
						.subscribe(() => {
							this.refreshEntities();
						}, (errors: any) => {
							this.snackbarService.open(errors);
						});
				}
			});
	}

	openAddNEditEntityDialog(instance: any, isNew: boolean) {
		const dialogRef = this.dialog.open(AddNEditEntityComponent, {
			width: '800px',
			data: new AddNEditEntityComponentData(instance, isNew, this.basicInfo)
		});
		dialogRef.afterClosed().subscribe(
			result => {
				if (result !== undefined) {
					this.refreshEntities();
				}
			}, (errors: any) => {
				this.snackbarService.open(errors);
			}
		);
	}

	addProperty() {
		const instance = new AddNEditPropertyMetadataModel();
		instance.ownerEntityId = this.selectedEntity.id;
		this.openAddNEditPropertyDialog(instance, true);
	}

	editProperty() {
		if (!this.selectedProperty) {
			return;
		}
		this.apiClient.getPropertyForEdit(this.selectedProperty.id)
			.subscribe(property => {
				this.openAddNEditPropertyDialog(property, false);
			}, (errors: any) => {
				this.snackbarService.open(errors);
			});
	}

	deleteProperty() {
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
			}, (errors: any) => {
				this.snackbarService.open(errors);
			});
	}

	openAddNEditPropertyDialog(instance: AddNEditPropertyMetadataModel, isNew: boolean) {
		const dialogRef = this.dialog.open(AddNEditPropertyComponent, {
			width: '800px',
			data: new AddNEditPropertyComponentData(instance, isNew, this.basicInfo, this.entities,
				this.properties, this.allPropertiesInfo)
		});
		dialogRef.afterClosed().subscribe(
			result => {
				if (result !== undefined) {
					this.refreshProperties();
				}
			},  (errors: any) => {
				this.snackbarService.open(errors);
			}
		);
	}

	openReleaseSettings() {
		this.dialog.open(ReleaseMetadataSettingsComponent, {
			width: '300px'
		});
	}

	generateCode() {
		this.apiClient.generateCode()
			.subscribe(x => {
				if (x.success) {
					alert('done');
				} else {
					alert('errors occured please see the validation errors');
				}
			},  (errors: any) => {
				this.snackbarService.open(errors);
			});
	}
}


