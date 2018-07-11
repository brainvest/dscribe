import {Component, Optional} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {DataHandlerService} from '../../common/services/data-handler.service';

@Component({
	selector: 'dscribe-list-delete-dialog',
	templateUrl: './list-delete-dialog.component.html',
	styleUrls: ['./list-delete-dialog.component.css']
})
export class ListDeleteDialogComponent {

	inputs: {
		entityType: string,
		title: string,
		selectedRow: any
	};

	constructor(@Optional() public dialogRef: MatDialogRef<ListDeleteDialogComponent>,
							private dataHandler: DataHandlerService) {
	}

	deleteEntity() {
		this.dataHandler.deleteEntity(this.inputs.entityType, this.inputs.selectedRow).subscribe(
			res => this.afterDelete(res),
			error => console.log(error)
		);
	}

	private afterDelete(res: any) {
		this.dialogRef.close('deleted');
	}

}
