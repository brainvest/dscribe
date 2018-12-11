import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DscribeService} from '../dscribe.service';
import {LobSummaryInfo, LobSummaryRequest, LobSummaryResponse} from '../common/models/lob/common-models';
import {MetadataService} from '../common/services/metadata.service';
import {EntityTypeMetadata} from '../metadata/entity-type-metadata';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {DownloadReportRequest, ReportsListResponse, SaveReportAsAttachmentRequest} from './models/report-models';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class LobInfoService {

	private reports: ReplaySubject<ReportsListResponse[]>;

	constructor(
		private http: HttpClient,
		private dscribeService: DscribeService,
		private metadata: MetadataService) {
	}

	private getSummaryAPI = this.dscribeService.url('api/lobTools/getSummary');

	private getReportsAPI = this.dscribeService.url('api/report/getReports');
	private downloadReportAPI = this.dscribeService.url('api/report/processForDownload');
	private saveAsAttachmentApi = this.dscribeService.url('api/report/saveAsAttachment');

	setLobInfo(entityType: EntityTypeMetadata, data: any[]) {
		if (!data || !data.length) {
			return;
		}
		const ids = [];
		const primaryKey = entityType.getPrimaryKey();
		if (!primaryKey) {
			return;
		}
		const pkName = primaryKey.Name;
		for (const item of data) {
			ids.push(item[pkName]);
		}
		this.http.post<LobSummaryResponse>(this.getSummaryAPI, <LobSummaryRequest>{
			EntityTypeName: entityType.Name,
			Identifiers: ids
		}).subscribe(res => this.setSummaries(pkName, data, res.Summaries));
	}

	private setSummaries(pkName: string, data: any[], summaries: { [key: number]: LobSummaryInfo }) {
		for (const item of data) {
			item._lobInfo = summaries[item[pkName]];
		}
	}

	getReports(entityTypeName: string): Observable<ReportsListResponse[]> {
		if (!this.reports) {
			this.reports = new ReplaySubject<ReportsListResponse[]>(1);
			this.http.post<ReportsListResponse[]>(this.getReportsAPI, {})
				.subscribe(x => this.reports.next(x));
		}
		return this.reports
			.pipe(map(x => x.filter(r => r.EntityTypeName === entityTypeName)));
	}

	processReportForDownload(request: DownloadReportRequest) {
		return this.http.post(this.downloadReportAPI, request, {
			observe: 'response',
			responseType: 'blob'
		});
	}

	saveReportAsAttachment(request: SaveReportAsAttachmentRequest) {
		return this.http.post(this.saveAsAttachmentApi, request, {
			observe: 'response',
			responseType: 'blob'
		});
	}
}
