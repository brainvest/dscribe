import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Component, OnInit, ViewChild} from '@angular/core';
import {AddNEditAppTypeComponent, AddNEditAppTypeComponentData} from '../add-n-edit-app-type/add-n-edit-app-type.component';
import {AppTypeModel} from '../../../common/models/app-type.model';
import {AppManagementService} from '../../../common/services/app-management.service';
import {SnackBarService} from '../../../common/notifications/snackbar.service';
import {ConfirmationDialogComponent} from '../../../common/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'dscribe-host-app-type-management',
	templateUrl: './app-type-management.component.html',
	styleUrls: ['./app-type-management.component.css']
})
export class AppTypeManagementComponent implements OnInit {

	displayedAppTypeColumns = ['name', 'title'];
	appTypes: AppTypeModel[] = [];
	selectedAppType: AppTypeModel;
	appTypesDataSource = new MatTableDataSource<AppTypeModel>(this.appTypes);


	@ViewChild('entitiyTypesPaginator') AppTypePaginator: MatPaginator;


	constructor(
		private appManagementService: AppManagementService,
		private snackBarService: SnackBarService,
		private dialog: MatDialog,
	) {
	}

	ngOnInit() {
		this.appTypesDataSource.paginator = this.AppTypePaginator;
		this.getAppTypes();
	}

	deleteAppType() {
		if (!this.selectedAppType) {
			return;
		}
		ConfirmationDialogComponent.Ask(this.dialog, 'Are you sure you want to delete this app type?', 'This action cannot be undone.')
			.subscribe(x => {
				if (x) {
					this.appManagementService.deleteAppType(this.selectedAppType).subscribe(
						() => {
							this.getAppTypes();
						},
						(errors: any) => {
							this.snackBarService.open(errors.error);
						});
				}
			});
	}

	addAppType() {
		this.openAddNEditAppTypeDialog({}, true);
	}

	editAppType() {
		if (!this.selectedAppType) {
			return;
		}
		this.openAddNEditAppTypeDialog(this.selectedAppType, false);
	}

	openAddNEditAppTypeDialog(instance: any, isNew: boolean) {
		const dialogRef = this.dialog.open(AddNEditAppTypeComponent, {
			width: '800px',
			disableClose: true,
			data: new AddNEditAppTypeComponentData(instance, isNew)
		});
		dialogRef.afterClosed().subscribe(
			result => {
				if (result !== undefined) {
					this.selectedAppType = null;
					this.getAppTypes();
				}
			}
		);
	}

	getAppTypes() {
		this.appTypes = [];
		this.appManagementService.getAppTypes().subscribe(
			(res: any) => {
				this.appTypes = res;
				this.appTypesDataSource.data = this.appTypes = res;
			}, (error: any) => {
				this.snackBarService.open(error);
			}
		);
	}

	selectAppType(appType: AppTypeModel) {
		if (appType === this.selectedAppType) {
			return;
		}
		this.selectedAppType = appType;
	}
}
