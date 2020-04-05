import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Component, OnInit, ViewChild} from '@angular/core';
import {AddNEditAppInstanceComponent, AddNEditAppInstanceComponentData} from '../add-n-edit-app-instance/add-n-edit-app-instancecomponent';
import {AppInstanceModel} from '../../../common/models/app-instance-model';
import {AppManagementService} from '../../../common/services/app-management.service';
import {SnackBarService} from '../../../common/notifications/snackbar.service';
import {ConfirmationDialogComponent} from '../../../common/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'dscribe-host-app-instance-management',
	templateUrl: './app-instance-management.component.html',
	styleUrls: ['./app-instance-management.component.css']
})
export class AppInstanceManagementComponent implements OnInit {

	displayedAppInstanceColumns = ['name', 'title', 'appTypeName', 'isEnabled', 'isProduction'];
	appInstances: AppInstanceModel[] = [];
	selectedAppInstance: AppInstanceModel = new AppInstanceModel();
	appInstancesDataSource = new MatTableDataSource<AppInstanceModel>(this.appInstances);


	@ViewChild('entitiyTypesPaginator') AppInstancePaginator: MatPaginator;


	constructor(
		private appManagementService: AppManagementService,
		private snackBarService: SnackBarService,
		private dialog: MatDialog) {
	}

	ngOnInit() {
		this.appInstancesDataSource.paginator = this.AppInstancePaginator;
		this.getAppInstances();
	}

	deleteAppInstance() {
		if (!this.selectedAppInstance) {
			return;
		}
		ConfirmationDialogComponent.Ask(this.dialog, 'Are you sure you want to delete this app instance?', 'This action cannot be undone.')
			.subscribe(x => {
				if (x) {
					this.appManagementService.deleteAppInstance(this.selectedAppInstance).subscribe(
						() => {
							this.getAppInstances();
						},
						(errors: any) => {
							this.snackBarService.open(errors.error);
						});
				}
			});
	}

	addAppInstance() {
		this.openAddNEditAppInstanceDialog({}, true);
	}

	editAppInstance() {
		if (!this.selectedAppInstance) {
			return;
		}
		this.openAddNEditAppInstanceDialog(this.selectedAppInstance, false);
	}

	openAddNEditAppInstanceDialog(instance: any, isNew: boolean) {
		const dialogRef = this.dialog.open(AddNEditAppInstanceComponent, {
			width: '800px',
			disableClose: true,
			data: new AddNEditAppInstanceComponentData(instance, isNew)
		});
		dialogRef.afterClosed().subscribe(
			result => {
				if (result !== undefined) {
					this.selectedAppInstance = null;
					this.getAppInstances();
				}
			}
		);
	}

	getAppInstances() {
		this.appInstances = [];
		this.appManagementService.getAppInstancesInfo().subscribe(
			(res: any) => {
				this.appInstances = res;
				this.appInstancesDataSource.data = this.appInstances = res;
			}, (error: any) => {
				this.snackBarService.open(error);
			}
		);
	}

	selectAppInstance(appInstance: AppInstanceModel) {
		if (appInstance === this.selectedAppInstance) {
			return;
		}
		this.selectedAppInstance = appInstance;
	}
}
