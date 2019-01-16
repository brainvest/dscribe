import {PropertyHistoryModel} from './../../models/history/property-type-history-model';
import {HttpErrorResponse} from '@angular/common/http';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {HistoryType} from '../../models/history/history-type';
import {SnackBarService} from '../../../common/notifications/snackbar.service';
import {HistoryService} from '../../../lob-tools/history-service';

@Component({
	selector: 'dscribe-property-history',
	templateUrl: './property-history.component.html',
	styleUrls: ['./property-history.component.css']
})
export class PropertyHistoryComponent implements OnInit {

	private propertyHistories: PropertyHistoryModel[] = [];
	isLoading = false;
	selectedProperty: PropertyHistoryModel;
	displayedPropertyColumns = this.data.historyType === HistoryType.addEdit ?
		['action', 'name', 'title', 'dataType', 'nullable', 'dataEntityType', 'usage', 'foreignKey', 'inverse', 'ActionDate'] :
		['action', 'name', 'title', 'dataType', 'nullable', 'usage', 'ActionDate'];
	propertiesDataSource = new MatTableDataSource<PropertyHistoryModel>(this.propertyHistories);

	@ViewChild('propertiesPaginator') propertyPaginator: MatPaginator;

	constructor(
		private dialogRef: MatDialogRef<PropertyHistoryComponent>,
		@Inject(MAT_DIALOG_DATA) public data: PropertyHistoryModel,
		private snackbarService: SnackBarService,
		private historyService: HistoryService) {
	}

	ngOnInit() {
		this.propertiesDataSource.paginator = this.propertyPaginator;
		if (this.data.historyType === HistoryType.addEdit) {
			this.getPropertyHistory();
		}
		if (this.data.historyType === HistoryType.deleted) {
			this.getDeletedPropertyHistory();
		}
	}

	getEntityTypeName(id: number) {
		if (!id) {
			return null;
		}
		return this.data.entityTypes.find(x => x.Id === id)!.Name;
	}

	getDataTypeName(id: number) {
		return this.data.basicInfo.DataTypes.find(x => x.Id === id)!.Name;
	}

	getPropertyName(id: number) {
		if (!id) {
			return;
		}
		const prop = this.data.properties.find(x => x.Id === id);
		if (prop) {
			return prop.Name;
		}
		return this.data.allPropertiesInfo!.find(x => x.Id === id).Name;
	}

	setActionIcon(data: PropertyHistoryModel) {
		switch (data.Action) {
			case 'addProperty':
				return 'add';
			case 'editProperty':
				return 'edit';
			case 'deleteProperty':
				return 'delete';
			default:
				break;
		}
	}

	setActionColor(data: PropertyHistoryModel) {
		switch (data.Action) {
			case 'addProperty':
				return {'color': 'green'};
			case 'editProperty':
				return {'color': 'accent'};
			case 'deleteProperty':
				return {'color': 'red'};
			default:
				return {};
		}
	}

	getPropertyHistory() {
		this.isLoading = true;
		this.propertyHistories = [];
		this.historyService.getPropertyHistory(this.data).subscribe(
			(res: PropertyHistoryModel[]) => {
				this.isLoading = false;
				this.propertiesDataSource.data = this.propertyHistories = res;
			}, (error: HttpErrorResponse) => {
				this.snackbarService.open(error.statusText);
				this.isLoading = false;
			}
		);
	}

	getDeletedPropertyHistory() {
		this.isLoading = true;
		this.propertyHistories = [];
		this.historyService.getDeletedPropertyHistory().subscribe(
			(res: PropertyHistoryModel[]) => {
				this.isLoading = false;
				this.propertiesDataSource.data = this.propertyHistories = res;
			}, (error: HttpErrorResponse) => {
				this.snackbarService.open(error.statusText);
				this.isLoading = false;
			}
		);
	}

	getPropertyUsageName(id: number) {
		return this.data.basicInfo.PropertyGeneralUsageCategories.find(x => x.Id === id)!.Name;
	}

	cancel() {
		this.dialogRef.close();
	}

	selectProperty(prop: PropertyHistoryModel) {
		this.selectedProperty = prop;
	}

}
