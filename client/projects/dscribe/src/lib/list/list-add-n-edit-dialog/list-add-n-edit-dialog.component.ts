import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
	selector: 'dscribe-list-add-n-edit-dialog',
	templateUrl: './list-add-n-edit-dialog.component.html',
	styleUrls: ['./list-add-n-edit-dialog.component.css']
})
export class ListAddNEditDialogComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<ListAddNEditDialogComponent>,
							@Inject(MAT_DIALOG_DATA) public data: any) {
	}

	ngOnInit() {
	}

	afterEntitySaved() {
		this.dialogRef.close('saved');
	}
}
