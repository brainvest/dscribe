import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
	selector: 'dscribe-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

	constructor(
		private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {
	}

	static Ask(dialog: MatDialog, title: string, message = null): Observable<boolean> {
		const dialogRef = dialog.open(ConfirmationDialogComponent, <MatDialogConfig>{
			width: '300px',
			data: new ConfirmationDialogData(title, message)
		});
		return dialogRef.afterClosed().pipe(map(x => !!x));
	}

	ngOnInit() {
	}

	accept() {
		this.dialogRef.close(true);
	}

	cancel() {
		this.dialogRef.close();
	}

}

export class ConfirmationDialogData {
	constructor(
		public title: string,
		public message?: string) {
	}
}
