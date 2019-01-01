import { PropertyHistoryModel } from './../administration/models/history/property-type-history-model';
import { GetCommentRequestModel, CommentModel } from './models/comment.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DscribeService } from '../dscribe.service';
import { LobSummaryInfo, LobSummaryRequest, LobSummaryResponse } from '../common/models/lob/common-models';
import { MetadataService } from '../common/services/metadata.service';
import { EntityTypeMetadata } from '../metadata/entity-type-metadata';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { DownloadReportRequest, ReportsListResponse, SaveReportAsAttachmentRequest } from './models/report-models';
import { map } from 'rxjs/operators';
import { AttachmentListItem, AttachmentsListRequest, AttachmentsListResponse } from './models/attachment-models';
import { EntityTypeHistoryModel } from '../administration/models/history/entity-type-history-model';

@Injectable({
	providedIn: 'root'
})
export class HistoryService {

	constructor(
		private http: HttpClient,
		private dscribeService: DscribeService) {
	}

	private getEntityTypeHistoryAPI = this.dscribeService.url('api/RequestLog/GetEntityTypeHistory');
	private getDeletedEntityTypeHistoryAPI = this.dscribeService.url('api/RequestLog/GetDeletedEntityTypeHistory');
	private getPropertyHistoryAPI = this.dscribeService.url('api/RequestLog/GetPropertyHistory');
	private getDeletedPropertyHistoryAPI = this.dscribeService.url('api/RequestLog/GetDeletedPropertyHistory');
	private getAppInstanceHistoryAPI = this.dscribeService.url('api/RequestLog/GetAppInstanceHistory');
	private getDeletedAppInstanceHistoryAPI = this.dscribeService.url('api/RequestLog/GetDeletedAppInstanceHistory');
	private getAppTypeHistoryAPI = this.dscribeService.url('api/RequestLog/GetAppTypeHistory');
	private getDeletedAppTypeHistoryAPI = this.dscribeService.url('api/RequestLog/GetDeletedAppTypeHistory');

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
