import { catchError } from 'rxjs/operators';
import { HttpStatusProxy } from './../helpers/http-status-proxy';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {PropertyBase} from '../metadata/property-base';
import {LocalFacetsModel} from '../metadata/facets/local-facet-model';
import {TypeBase} from '../metadata/entity-base';
import {MetadataBasicInfoModel} from '../metadata/metadata-basic-info-model';
import {AddNEditPropertyMetadataModel} from './models/add-n-edit-property-metadata-model';
import {PropertyInfoModel} from './models/property-info-model';
import {ReleaseMetadataRequest} from './models/release-metadata-request';
import {MetadataValidationResponse} from './models/metadata-validation-response';

@Injectable({
	providedIn: 'root'
})
export class MetadataManagementApiClient {
	private managementAPI = 'api/ManageMetadata/';
	private releaseAPI = 'api/ReleaseMetadata/';

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
	private getPropertyForEditAPI = this.managementAPI + 'getPropertyForEdit';

	private releaseMetadataAPI = this.releaseAPI + 'releaseMetadata';
	private generateCodeAPI = this.releaseAPI + 'generateCode';

	constructor(
		private http: HttpClient,
		private httpStatusProxy: HttpStatusProxy) {
	}

	addEntity(entity: TypeBase) {
		return this.http.post<null>(this.addEntityAPI, entity).pipe(catchError(this.handleError.bind(this)));
	}

	editEntity(entity: TypeBase) {
		return this.http.post<null>(this.editEntityAPI, entity).pipe(catchError(this.handleError.bind(this)));
	}

	deleteEntity(entity: TypeBase): Observable<void> {
		return this.http.post<void>(this.managementAPI + 'deleteEntity', entity).pipe(catchError(this.handleError.bind(this)));
	}

	addProperty(property: AddNEditPropertyMetadataModel) {
		return this.http.post<null>(this.addPropertyAPI, property).pipe(catchError(this.handleError.bind(this)));
	}

	getPropertyForEdit(propertyId: number): Observable<AddNEditPropertyMetadataModel> {
		return this.http.post<AddNEditPropertyMetadataModel>(this.getPropertyForEditAPI, {propertyId: propertyId})
			.pipe(catchError(this.handleError.bind(this)));
	}

	editProperty(property: AddNEditPropertyMetadataModel) {
		return this.http.post<null>(this.editPropertyAPI, property).pipe(catchError(this.handleError.bind(this)));
	}

	getBasicInfo(): Observable<MetadataBasicInfoModel> {
		return this.http.post<MetadataBasicInfoModel>(this.getBasicInfoAPI, {}).pipe(catchError(this.handleError.bind(this)));
	}

	getTypes(): Observable<TypeBase[]> {
		return this.http.post<TypeBase[]>(this.getTypesAPI, {}).pipe(catchError(this.handleError.bind(this)));
	}

	manageTypes(action: string, type: TypeBase): Observable<void> {
		return this.http.post<void>(this.managementAPI + action + 'Type', type).pipe(catchError(this.handleError.bind(this)));
	}

	getTypeFacets(): Observable<LocalFacetsModel> {
		return this.http.post<LocalFacetsModel>(this.getTypeFacetsAPI, {}).pipe(catchError(this.handleError.bind(this)));
	}

	getProperties(entityId: number): Observable<PropertyBase[]> {
		return this.http.post<PropertyBase[]>(this.getPropertiesAPI, {entityId: entityId}).pipe(catchError(this.handleError.bind(this)));
	}

	manageProperty(action: string, property: PropertyBase): Observable<void> {
		return this.http.post<void>(this.managementAPI + action + 'Property', property).pipe(catchError(this.handleError.bind(this)));
	}

	deleteProperty(property: PropertyBase): Observable<void> {
		return this.http.post<void>(this.managementAPI + 'deleteProperty', property).pipe(catchError(this.handleError.bind(this)));
	}

	getPropertyFacets(typeName: string): Observable<LocalFacetsModel> {
		return this.http.post<LocalFacetsModel>(this.getPropertyFacetsAPI, {typeName: typeName}).pipe(catchError(this.handleError.bind(this)));
	}

	getAllPropertiesInfo(): Observable<PropertyInfoModel[]> {
		return this.http.post<PropertyInfoModel[]>(this.getAllPropertyNamesAPI, {}).pipe(catchError(this.handleError.bind(this)));
	}

	releaseMetadata(request: ReleaseMetadataRequest): Observable<null> {
		return this.http.post<null>(this.releaseMetadataAPI, request).pipe(catchError(this.handleError.bind(this)));
	}

	generateCode(): Observable<MetadataValidationResponse> {
		return this.http.post<MetadataValidationResponse>(this.generateCodeAPI, null).pipe(catchError(this.handleError.bind(this)));
	}

	private handleError(error: any) {
		return throwError(this.httpStatusProxy.translateError(error));
	}
}
