import { ListColumn } from './../models/list-column';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatTableDataSource } from '@angular/material';
import { SnackBarService } from 'src/lib/common/notifications/snackbar.service';
import { HistoryType } from 'src/lib/administration/models/history/history-type';
import { HistoryService } from 'src/lib/lob-tools/history-service';

@Component({
	selector: 'dscribe-data-history',
	templateUrl: './data-history.component.html',
	styleUrls: ['./data-history.component.css'],
})
export class DataHistoryComponent implements OnInit {

	// private entityHistories: EntityTypeHistoryModel[] = [];
	isLoading = false;
	private historyData: any[];
	// entityTypesDataSource = new MatTableDataSource<EntityTypeHistoryModel>(this.entityHistories);
	initialSelection = [];
	allowMultiSelect = false;
	selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

	@ViewChild('entityTypesPaginator') entityTypesPaginator: MatPaginator;

	constructor(
		private dialogRef: MatDialogRef<DataHistoryComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private snackbarService: SnackBarService,
		private historyService: HistoryService
	) {
		this.data.columns.push(new ListColumn(
			'Action',
			'Action',
			'string',
			null,
		));
		this.data.columns.push(new ListColumn(
			'ActionTime',
			'ActionTime',
			'string',
			null,
		));
		this.data.columns.push(new ListColumn(
			'ProcessDuration',
			'ProcessDuration',
			'string',
			null,
		));
	}

	ngOnInit() {
		// this.entityTypesDataSource.paginator = this.entityTypesPaginator;
		if (this.data.historyType === HistoryType.addEdit) {
			this.getDataHistory();
		}
		if (this.data.historyType === HistoryType.deleted) {
			this.getDeletedEntityHistory();
		}
	}

	// setActionIcon(data: EntityTypeHistoryModel) {
	// 	switch (data.Action) {
	// 		case 'addEntityType':
	// 			return 'add';
	// 		case 'editEntityType':
	// 			return 'edit';
	// 		case 'deleteEntityType':
	// 			return 'delete';
	// 		default:
	// 			break;
	// 	}
	// }

	// setActionColor(data: EntityTypeHistoryModel) {
	// 	switch (data.Action) {
	// 		case 'addEntityType':
	// 			return {'color': 'green'};
	// 		case 'editEntityType':
	// 			return {'color': 'accent'};
	// 		case 'deleteEntityType':
	// 			return {'color': 'red'};
	// 		default:
	// 			return {};
	// 	}
	// }

	getDeletedEntityHistory() {
		// this.isLoading = true;
		// this.entityHistories = [];
		// this.historyService.getDeletedEntityTypeHistory().subscribe(
		// 	(res: EntityTypeHistoryModel[]) => {
		// 		this.isLoading = false;
		// 		this.entityTypesDataSource.data = this.entityHistories = res;
		// 	}, (error: HttpErrorResponse) => {
		// 		this.snackbarService.open(error.statusText);
		// 		this.isLoading = false;
		// 	}
		// );
	}

	getDataHistory() {
		this.isLoading = true;
		this.historyData = [];
		// this.entityHistories = [];
		this.historyService.getDataHistory(this.data.title, JSON.stringify(this.data.entity)).subscribe(
			(res: any[]) => {
				res.forEach(element => {
					this.historyData.push(JSON.parse(element.Data));
					this.historyData[res.indexOf(element)].Action = element.Action;
					this.historyData[res.indexOf(element)].ActionTime = element.ActionTime;
					this.historyData[res.indexOf(element)].ProcessDuration = element.ProcessDuration;

					this.data.displayedColumns.push('Action');
					this.data.displayedColumns.push('ActionTime');
					this.data.displayedColumns.push('ProcessDuration');
				});
				this.isLoading = false;
				// this.entityTypesDataSource.data = this.entityHistories = res;
			}, (error: HttpErrorResponse) => {
				this.snackbarService.open(error.statusText);
				this.isLoading = false;
			}
		);
	}

	getEntityTypeUsageName(id: number) {
		return this.data.basicInfo.EntityTypeGeneralUsageCategories.find(x => x.Id === id)!.Name;
	}

	cancel() {
		this.dialogRef.close();
	}

}
