import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PropertyBase} from '../metadata/property-base';
import {LocalFacetsModel} from '../metadata/facets/local-facet-model';
import {EntityTypeBase} from '../metadata/entity-type-base';
import {MetadataBasicInfoModel} from '../metadata/metadata-basic-info-model';
import {AddNEditPropertyMetadataModel} from './models/add-n-edit-property-metadata-model';
import {PropertyInfoModel} from './models/property-info-model';
import {ReleaseMetadataRequest} from './models/release-metadata-request';
import {MetadataValidationResponse} from './models/metadata-validation-response';
import {DscribeService} from '../dscribe.service';
import {DscribeHttpClient} from '../common/services/dscribe-http-client';

@Injectable({
	providedIn: 'root'
})
export class MetadataManagementApiClient {
	private managementAPI = this.dscribeService.url('api/ManageMetadata/');
	private releaseAPI = this.dscribeService.url('api/ReleaseMetadata/');

	private getEntityTypesAPI = this.managementAPI + 'getEntityTypes';
	private getPropertiesAPI = this.managementAPI + 'getProperties';
	private getBasicInfoAPI = this.managementAPI + 'getBasicInfo';
	private getEntityTypeFacetsAPI = this.managementAPI + 'getEntityTypeFacets';
	private getPropertyFacetsAPI = this.managementAPI + 'getPropertyFacets';
	private getAllPropertyNamesAPI = this.managementAPI + 'getAllPropertyNames';
	private addEntityTypeAPI = this.managementAPI + 'addEntityType';
	private editEntityTypeAPI = this.managementAPI + 'editEntityType';
	private addPropertyAPI = this.managementAPI + 'addProperty';
	private editPropertyAPI = this.managementAPI + 'editProperty';
	private getPropertyForEditAPI = this.managementAPI + 'getPropertyForEdit';

	private releaseMetadataAPI = this.releaseAPI + 'releaseMetadata';
	private generateCodeAPI = this.releaseAPI + 'generateCode';


	constructor(private http: DscribeHttpClient, private dscribeService: DscribeService) {
	}

	addEntityType(entityType: EntityTypeBase) {
		return this.http.post<null>(this.addEntityTypeAPI, entityType);
	}

	editEntityType(entityType: EntityTypeBase) {
		return this.http.post<null>(this.editEntityTypeAPI, entityType);
	}

	deleteEntityType(entityType: EntityTypeBase): Observable<void> {
		return this.http.post<void>(this.managementAPI + 'deleteEntityType', entityType);
	}

	addProperty(property: AddNEditPropertyMetadataModel) {
		return this.http.post<null>(this.addPropertyAPI, property);
	}

	getPropertyForEdit(propertyId: number): Observable<AddNEditPropertyMetadataModel> {
		return this.http.post<AddNEditPropertyMetadataModel>(this.getPropertyForEditAPI, {propertyId: propertyId})
			;
	}

	editProperty(property: AddNEditPropertyMetadataModel) {
		return this.http.post<null>(this.editPropertyAPI, property);
	}

	getBasicInfo(): Observable<MetadataBasicInfoModel> {
		return this.http.post<MetadataBasicInfoModel>(this.getBasicInfoAPI, {});
	}

	getEntityTypes(): Observable<EntityTypeBase[]> {
		return this.http.post<EntityTypeBase[]>(this.getEntityTypesAPI, {});
	}

	manageEntityTypes(action: string, type: EntityTypeBase): Observable<void> {
		return this.http.post<void>(this.managementAPI + action + 'Type', type);
	}

	getEntityTypeFacets(): Observable<LocalFacetsModel> {
		return this.http.post<LocalFacetsModel>(this.getEntityTypeFacetsAPI, {});
	}

	getProperties(entityTypeId: number): Observable<PropertyBase[]> {
		return this.http.post<PropertyBase[]>(this.getPropertiesAPI, {entityTypeId: entityTypeId});
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

	getAllPropertiesInfo(): Observable<PropertyInfoModel[]> {
		return this.http.post<PropertyInfoModel[]>(this.getAllPropertyNamesAPI, {});
	}

	releaseMetadata(request: ReleaseMetadataRequest): Observable<null> {
		return this.http.post<null>(this.releaseMetadataAPI, request);
	}

	generateCode(): Observable<MetadataValidationResponse> {
		return this.http.post<MetadataValidationResponse>(this.generateCodeAPI, null);
	}
}
