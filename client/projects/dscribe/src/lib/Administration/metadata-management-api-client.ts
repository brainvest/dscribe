import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PropertyBase} from '../metadata/property-base';
import {LocalFacetsModel} from '../metadata/facets/local-facet-model';
import {TypeBase} from '../metadata/entity-base';
import {MetadataBasicInfoModel} from '../metadata/metadata-basic-info-model';
import {HasIdName} from '../common/models/has-id-name';
import {AddNEditPropertyMetadataModel} from './models/add-n-edit-property-metadata-model';

@Injectable({
	providedIn: 'root'
})
export class MetadataManagementApiClient {
	private managementAPI = 'api/ManageMetadata/';

	private getTypesAPI = this.managementAPI + 'getTypes';
	private getPropertiesAPI = this.managementAPI + 'getProperties';
	private getBasicInfoAPI = this.managementAPI + 'getBasicInfo';
	private getTypeFacetsAPI = this.managementAPI + 'getTypeFacets';
	private getPropertyFacetsAPI = this.managementAPI + 'getPropertyFacets';
	private getAllPropertyNamesAPI = this.managementAPI + 'getAllPropertyNames';
	private addEntityAPI = this.managementAPI + 'addEntity';
	private editEntityAPI = this.managementAPI + 'editEntity';
	private addPropertyAPI = this.managementAPI + 'addProperty';
	private editPropertyAPI = this.managementAPI + 'editProperty';

	constructor(private http: HttpClient) {
	}

	addEntity(entity: TypeBase) {
		return this.http.post<null>(this.addEntityAPI, entity);
	}

	editEntity(entity: TypeBase) {
		return this.http.post<null>(this.editEntityAPI, entity);
	}

	deleteEntity(entity: TypeBase): Observable<void> {
		return this.http.post<void>(this.managementAPI + 'deleteEntity', entity);
	}

	addProperty(property: AddNEditPropertyMetadataModel) {
		return this.http.post<null>(this.addPropertyAPI, property);
	}

	editProperty(property: AddNEditPropertyMetadataModel) {
		return this.http.post<null>(this.editPropertyAPI, property);
	}

	getBasicInfo(): Observable<MetadataBasicInfoModel> {
		return this.http.post<MetadataBasicInfoModel>(this.getBasicInfoAPI, {});
	}

	getTypes(): Observable<TypeBase[]> {
		return this.http.post<TypeBase[]>(this.getTypesAPI, {});
	}

	manageTypes(action: string, type: TypeBase): Observable<void> {
		return this.http.post<void>(this.managementAPI + action + 'Type', type);
	}

	getTypeFacets(): Observable<LocalFacetsModel> {
		return this.http.post<LocalFacetsModel>(this.getTypeFacetsAPI, {});
	}

	getProperties(entityId: number): Observable<PropertyBase[]> {
		return this.http.post<PropertyBase[]>(this.getPropertiesAPI, {entityId: entityId});
	}

	manageProperty(action: string, property: PropertyBase): Observable<void> {
		return this.http.post<void>(this.managementAPI + action + 'Property', property);
	}

	deleteProperty(property: PropertyBase): Observable<void> {
		return this.http.post<void>(this.managementAPI + 'deleteProperty', property);
	}

	getPropertyFacets(typeName: string): Observable<LocalFacetsModel> {
		return this.http.post<LocalFacetsModel>(this.getPropertyFacetsAPI, {typeName: typeName});
	}

	getAllPropertyNames(): Observable<HasIdName[]> {
		return this.http.post<HasIdName[]>(this.getAllPropertyNamesAPI, {});
	}
}
