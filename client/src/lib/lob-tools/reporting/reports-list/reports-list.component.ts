import {Component, Inject, OnInit} from '@angular/core';
import {LobInfoService} from '../../lob-info.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LobListDialogData} from '../../models/common-models';
import {ReportsListResponse} from '../../models/report-models';
import {SelectionModel} from '@angular/cdk/collections';
import {saveAs} from 'file-saver';
import {MiscHelper} from '../../../helpers/misc-helper';

@Component({
	selector: 'dscribe-reports-list',
	templateUrl: './reports-list.component.html',
	styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {

	reports: ReportsListResponse[] = [];
	displayedColumns: string[] = ['Title'];
	selection = new SelectionModel<ReportsListResponse>(false, [], true);
	attachmentTitle: string;
	attachmentDescription: string;

	private _mode = 'download';
	get mode() {
		return this._mode;
	}

	set mode(v: string) {
		this._mode = v;
		console.log(v);
	}

	constructor(
		private lobInfo: LobInfoService,
		private dialogRef: MatDialogRef<ReportsListComponent>,
		@Inject(MAT_DIALOG_DATA) public data: LobListDialogData) {
		this.lobInfo.getReports(data.entityTypeName)
			.subscribe(x => this.reports = x);
	}

	ngOnInit() {
	}

	ok() {
		if (this.mode === 'download') {
			this.lobInfo.processReportForDownload({
				EntityIdentifier: this.data.identifier,
				ReportDefinitionId: this.selection.selected[0].Id
			}).subscribe(data => {
				saveAs(data.body as Blob, MiscHelper.getFileNameFromHeaders(data) || 'download.docx');
				this.dialogRef.close(true);
			}, error => {
				console.log(error);
			});
		} else {
			this.lobInfo.saveReportAsAttachment({
				Description: this.attachmentDescription,
				EntityIdentifier: this.data.identifier,
				ReportDefinitionId: this.selection.selected[0].Id,
				Title: this.attachmentTitle
			}).subscribe(x => this.dialogRef.close(true));
		}
	}

}
