import { Injectable } from '@angular/core';
import { DscribeService } from 'src/lib/dscribe.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppTypeModel } from '../models/app-type.model';
import { AppInstanceInfoModel } from '../models/app-instance-info-model';
import { DatabaseProviderModel } from '../models/database-provider.model';

@Injectable({
	providedIn: 'root',
})
export class AppManagementService {

	constructor(
		private http: HttpClient,
		private dscribeService: DscribeService) {
	}

	private GetAppInstancesInfoApi = this.dscribeService.url('api/AppManagement/GetAppInstancesInfo');
	private GetDatabaseProvidersApi = this.dscribeService.url('api/AppManagement/GetDatabaseProviders');
	private AddAppInstanceApi = this.dscribeService.url('api/AppManagement/AddAppInstance');
	private EditAppInstanceApi = this.dscribeService.url('api/AppManagement/EditAppInstance');
	private DeleteAppInstanceApi = this.dscribeService.url('api/AppManagement/DeleteAppInstance');
	private GetAppTypesApi = this.dscribeService.url('api/AppManagement/GetAppTypes');
	private AddAppTypeApi = this.dscribeService.url('api/AppManagement/AddAppType');
	private EditAppTypeApi = this.dscribeService.url('api/AppManagement/EditAppType');
	private DeleteAppTypeApi = this.dscribeService.url('api/AppManagement/DeleteAppType');

	deleteAppType(appType: AppTypeModel): Observable<any> {
		return this.http.post<AppTypeModel>(this.DeleteAppTypeApi, appType);
	}

	editAppType(appType: AppTypeModel): Observable<any> {
		return this.http.post<AppTypeModel>(this.EditAppTypeApi, appType);
	}

	addAppType(appType: AppTypeModel): Observable<any> {
		return this.http.post<AppTypeModel>(this.AddAppTypeApi, appType);
	}

	getAppTypes(): Observable<AppTypeModel[]> {
		return this.http.get<AppTypeModel[]>(this.GetAppTypesApi);
	}

	deleteAppInstance(appInstance: AppInstanceInfoModel): Observable<any> {
		return this.http.post<AppInstanceInfoModel>(this.DeleteAppInstanceApi, appInstance);
	}

	getAppInstancesInfo(): Observable<AppInstanceInfoModel[]> {
		return this.http.post<AppInstanceInfoModel[]>(this.GetAppInstancesInfoApi, null);
	}

	getDatabaseProviders(): Observable<DatabaseProviderModel[]> {
		return this.http.get<DatabaseProviderModel[]>(this.GetDatabaseProvidersApi);
	}

	addAppInstance(appInstance: AppInstanceInfoModel): Observable<AppInstanceInfoModel> {
		return this.http.post<AppInstanceInfoModel>(this.AddAppInstanceApi, appInstance);
	}

	editAppInstance(appInstance: AppInstanceInfoModel): Observable<any> {
		return this.http.post<AppInstanceInfoModel>(this.EditAppInstanceApi, appInstance);
	}
}
