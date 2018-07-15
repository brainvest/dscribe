import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TypeBase} from '../../metadata/entity-base';
import {MetadataBasicInfoModel} from '../../metadata/metadata-basic-info-model';

@Component({
	selector: 'dscribe-add-n-edit-entity',
	templateUrl: './add-n-edit-entity.component.html',
	styleUrls: ['./add-n-edit-entity.component.css']
})
export class AddNEditEntityComponent implements OnInit {

	entity: TypeBase;

	constructor(
		private dialogRef: MatDialogRef<AddNEditEntityComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AddNEditEntityComponentData) {
	}

	ngOnInit() {
		this.entity = this.data.entity;
	}

}

export class AddNEditEntityComponentData {
	constructor(
		public entity: TypeBase,
		public isNew: boolean,
		public basicInfo: MetadataBasicInfoModel) {

	}

	get action() {
		return this.isNew ? 'Add' : 'Edit';
	}

}
