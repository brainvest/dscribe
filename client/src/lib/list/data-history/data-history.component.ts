import {ListColumn} from '../models/list-column';
import {SelectionModel} from '@angular/cdk/collections';
import {HttpErrorResponse} from '@angular/common/http';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator} from '@angular/material';
import {DatePipe} from '@angular/common';
import {SnackBarService} from '../../common/notifications/snackbar.service';
import {HistoryType} from '../../administration/models/history/history-type';
import {HistoryService} from '../../lob-tools/history-service';

@Component({
	selector: 'dscribe-data-history',
	templateUrl: './data-history.component.html',
	styleUrls: ['./data-history.component.css'],
	providers: [DatePipe]
})
export class DataHistoryComponent implements OnInit {

	// private entityHistories: EntityTypeHistoryModel[] = [];
	isLoading = false;
	historyData: any[];
	// entityTypesDataSource = new MatTableDataSource<EntityTypeHistoryModel>(this.entityHistories);
	initialSelection = [];
	allowMultiSelect = false;
	selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
	public columns: ListColumn[] = [];
	public displayedColumns: string[] = [];

	@ViewChild('entityTypesPaginator', { static: false }) entityTypesPaginator: MatPaginator;

	constructor(
		private dialogRef: MatDialogRef<DataHistoryComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private snackbarService: SnackBarService,
		private historyService: HistoryService,
		public datepipe: DatePipe
	) {
		this.columns = JSON.parse(JSON.stringify(this.data.columns));
		this.columns.push(new ListColumn(
			'Action',
			'Action',
			'string',
			null,
		));
		this.columns.push(new ListColumn(
			'ActionTime',
			'ActionTime',
			'string',
			null,
		));
		this.columns.push(new ListColumn(
			'ProcessDuration',
			'ProcessDuration',
			'string',
			null,
		));
	}

	ngOnInit() {
		if (this.data.historyType === HistoryType.addEdit) {
			this.getDataHistory();
		}
		// if (this.data.historyType === HistoryType.deleted) {
		// 	this.getDeletedEntityHistory();
		// }
	}

	getDataHistory() {
		this.isLoading = true;
		this.historyData = [];
		this.historyService.getDataHistory(this.data.title, JSON.stringify(this.data.entity)).subscribe(
			(res: any[]) => {
				res.forEach(element => {
					this.historyData.push(JSON.parse(element.Data));
					this.historyData[res.indexOf(element)].Action = this.getAction(element.Action);
					this.historyData[res.indexOf(element)].ActionTime =
						this.datepipe.transform(element.ActionTime, 'yyyy-MM-dd hh:mm:ss');
					this.historyData[res.indexOf(element)].ProcessDuration = element.ProcessDuration;
				});
				this.data.displayedColumns.forEach(element => {
					if (element !== 'lobInfo') {
						this.displayedColumns.push(element);
					}
				});
				this.displayedColumns.push('Action');
				this.displayedColumns.push('ActionTime');
				this.displayedColumns.push('ProcessDuration');
				this.isLoading = false;
			}, (error: HttpErrorResponse) => {
				this.snackbarService.open(error.statusText);
				this.isLoading = false;
			}
		);
	}

	selectRow(row: any) {

	}

	getAction(value: number) {
		switch (value) {
			case 2:
				return 'Deleted';
			case 4:
				return 'Added';
			case 3:
				return 'Modified';
			default:
				return 'Not implemented';
		}
	}
}
