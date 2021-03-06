import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../common/services/data-handler.service';
import {SnackBarService} from '../../common/notifications/snackbar.service';

@Component({
	selector: 'dscribe-list-delete-dialog',
	templateUrl: './list-delete-dialog.component.html',
	styleUrls: ['./list-delete-dialog.component.css']
})
export class ListDeleteDialogComponent {

	inputs: {
		entityTypeName: string,
		title: string,
		selectedRow: any
	};

	constructor(
		@Optional() public dialogRef: MatDialogRef<ListDeleteDialogComponent>,
		private snackbarService: SnackBarService,
		private dataHandler: DataHandlerService) {
	}

	deleteEntity() {
		this.dataHandler.deleteEntity(this.inputs.entityTypeName, this.inputs.selectedRow).subscribe(
			(res: any) => {
				this.afterDelete(res);
			},
			(errors: any) => {
				this.snackbarService.open(errors);
			});
	}

	private afterDelete(res: any) {
		this.dialogRef.close('deleted');
	}

}
