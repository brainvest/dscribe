import { PropertyHistoryModel } from './../administration/models/history/property-type-history-model';
import { CommentModel } from './models/comment.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DscribeService } from '../dscribe.service';
import { EntityTypeHistoryModel } from '../administration/models/history/entity-type-history-model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HistoryService {

	constructor(
		private http: HttpClient,
		private dscribeService: DscribeService) {
	}

	private getEntityTypeHistoryAPI = this.dscribeService.url('api/History/GetEntityTypeHistory');
	private getDeletedEntityTypeHistoryAPI = this.dscribeService.url('api/History/GetDeletedEntityTypeHistory');
	private getPropertyHistoryAPI = this.dscribeService.url('api/History/GetPropertyHistory');
	private getDeletedPropertyHistoryAPI = this.dscribeService.url('api/History/GetDeletedPropertyHistory');
	private getAppInstanceHistoryAPI = this.dscribeService.url('api/History/GetAppInstanceHistory');
	private getDeletedAppInstanceHistoryAPI = this.dscribeService.url('api/History/GetDeletedAppInstanceHistory');
	private getAppTypeHistoryAPI = this.dscribeService.url('api/History/GetAppTypeHistory');
	private getDeletedAppTypeHistoryAPI = this.dscribeService.url('api/History/GetDeletedAppTypeHistory');

	getEntityTypeHistory(data: EntityTypeHistoryModel): Observable<EntityTypeHistoryModel[]> {
		return this.http.post<EntityTypeHistoryModel[]>(this.getEntityTypeHistoryAPI, data);
	}

	getDeletedEntityTypeHistory(): Observable<any> {
		return this.http.get<any>(this.getDeletedEntityTypeHistoryAPI);
	}

	getPropertyHistory(model: PropertyHistoryModel): Observable<PropertyHistoryModel[]> {
		return this.http.post<PropertyHistoryModel[]>(this.getPropertyHistoryAPI, model);
	}

	getDeletedPropertyHistory(): Observable<any> {
		return this.http.get<any>(this.getDeletedPropertyHistoryAPI);
	}

	getAppInstanceHistory(model: CommentModel): Observable<any> {
		return this.http.get<any>(this.getAppInstanceHistoryAPI);
	}

	getDeletedAppInstanceHistory(model: CommentModel): Observable<any> {
		return this.http.get<any>(this.getDeletedAppInstanceHistoryAPI);
	}

	getAppTypeHistory(model: CommentModel): Observable<any> {
		return this.http.get<any>(this.getAppTypeHistoryAPI);
	}

	getDeletedAppTypeHistory(model: CommentModel): Observable<any> {
		return this.http.get<any>(this.getDeletedAppTypeHistoryAPI);
	}
}
