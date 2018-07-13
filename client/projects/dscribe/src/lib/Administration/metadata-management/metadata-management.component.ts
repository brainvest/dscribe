import {Component, OnInit, ViewChild} from '@angular/core';
import {ListColumn} from '../../list/models/list-column';
import {MetadataManagementApiClient} from '../metadata-management-api-client';
import {MetadataBasicInfoModel} from '../../metadata/metadata-basic-info-model';
import {TypeBase} from '../../metadata/entity-base';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {PropertyBase} from '../../metadata/property-base';

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
	propertiesDataSource = new MatTableDataSource<PropertyBase>();
	selectedProperty: PropertyBase;
	propertiesAreLoading = false;

	displayedEntityColumns = ['name', 'usage', 'singular', 'plural', 'code', 'displayName'];
	entityColumns = [
		new ListColumn('name', 'Name', 'name'),
		new ListColumn('usage', 'Usage', 'entityGeneralUsageCategoryId'),
		new ListColumn('singular', 'Singular', 'singularTitle'),
		new ListColumn('plural', 'Plural', 'pluralTitle'),
		new ListColumn('code', 'Code', 'codePath'),
		new ListColumn('displayName', 'Display Name', 'displayNamePath')
	];

	displayedPropertyColumns = ['name', 'title', 'dataType', 'nullable', 'dataTypeEntity', 'usage', 'foreignKey', 'inverse'];
	propertyColumns = [
		new ListColumn('name', 'Name', 'name'),
		new ListColumn('title', 'Title', 'title'),
		new ListColumn('dataType', 'Data Type', 'dataTypeId'),
		new ListColumn('nullable', 'Nullable', 'isNullable'),
		new ListColumn('dataTypeEntity', 'Data Type Entity', 'dataTypeEntityId'),
		new ListColumn('usage', 'Usage', 'propertyGeneralUsageCategoryId'),
		new ListColumn('foreignKey', 'Foreign Key', 'foreignKeyPropertyId'),
		new ListColumn('inverse', 'Inverse', 'inversePropertyId')
	];

	@ViewChild(MatPaginator) entitiesPaginator: MatPaginator;
	@ViewChild(MatPaginator) propertiesPaginator: MatPaginator;

	constructor(private apiClient: MetadataManagementApiClient) {
	}

	ngOnInit() {
		this.entitiesDataSource.paginator = this.entitiesPaginator;
		this.propertiesDataSource.paginator = this.propertiesPaginator;
		this.entitiesAreLoading = true;
		this.apiClient.getBasicInfo()
			.subscribe(data => {
				this.basicInfo = data;
				this.apiClient.getTypes()
					.subscribe(entities => {
						this.entitiesDataSource.data = this.entities = entities;
						this.entitiesAreLoading = false;
					});
			});
	}

	selectRow(entity: TypeBase) {
		if (entity == this.selectedEntity) {
			return;
		}
		this.propertiesDataSource.data = this.properties = [];
		this.selectedEntity = entity;
		if (entity) {
			this.propertiesAreLoading = true;
			this.apiClient.getProperties(entity.id)
				.subscribe(props => {
					this.propertiesDataSource.data = this.properties = props;
					this.propertiesAreLoading = false;
				});
		}
	}


}
