import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppTypeModel} from '../models/app-type.model';
import {AppInstanceModel} from '../models/app-instance-model';
import {DatabaseProviderModel} from '../models/database-provider.model';
import {DscribeService} from '../../dscribe.service';

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

	deleteAppInstance(appInstance: AppInstanceModel): Observable<any> {
		return this.http.post<AppInstanceModel>(this.DeleteAppInstanceApi, appInstance);
	}

	getAppInstancesInfo(): Observable<AppInstanceModel[]> {
		return this.http.post<AppInstanceModel[]>(this.GetAppInstancesInfoApi, null);
	}

	getDatabaseProviders(): Observable<DatabaseProviderModel[]> {
		return this.http.get<DatabaseProviderModel[]>(this.GetDatabaseProvidersApi);
	}

	addAppInstance(appInstance: AppInstanceModel): Observable<AppInstanceModel> {
		return this.http.post<AppInstanceModel>(this.AddAppInstanceApi, appInstance);
	}

	editAppInstance(appInstance: AppInstanceModel): Observable<any> {
		return this.http.post<AppInstanceModel>(this.EditAppInstanceApi, appInstance);
	}
}
