import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AddNEditResult} from '../../common/models/add-n-edit-result';
import {AddNEditHelper} from '../../add-n-edit/add-n-edit-helper';

@Component({
	selector: 'dscribe-list-add-n-edit-dialog',
	templateUrl: './list-add-n-edit-dialog.component.html',
	styleUrls: ['./list-add-n-edit-dialog.component.css']
})
export class ListAddNEditDialogComponent {

	constructor(public dialogRef: MatDialogRef<ListAddNEditDialogComponent>,
							@Inject(MAT_DIALOG_DATA) public data: any) {
		console.log(data);
	}

	get actionName() {
		return AddNEditHelper.actionName(this.data.action);
	}

	afterEntitySaved(result: AddNEditResult) {
		this.dialogRef.close(result);
	}

	canceledByUser() {
		this.dialogRef.close(null);
	}
}
