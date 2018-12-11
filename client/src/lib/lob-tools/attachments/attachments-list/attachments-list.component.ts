import {Component, Inject, OnInit} from '@angular/core';
import {LobInfoService} from '../../lob-info.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LobListDialogData} from '../../models/common-models';
import {AttachmentListItem} from '../../models/attachment-models';
import {SelectionModel} from '@angular/cdk/collections';
import {saveAs} from 'file-saver';
import {MiscHelper} from '../../../helpers/misc-helper';

@Component({
	selector: 'dscribe-attachments-list',
	templateUrl: './attachments-list.component.html',
	styleUrls: ['./attachments-list.component.css']
})
export class AttachmentsListComponent implements OnInit {

	attachments: AttachmentListItem[];
	displayedColumns = ['Actions', 'Title', 'Size', 'FileName', 'Description'];
	selection = new SelectionModel<AttachmentListItem>(false, [], true);

	constructor(
		private lobInfo: LobInfoService,
		private dialogRef: MatDialogRef<AttachmentsListComponent>,
		@Inject(MAT_DIALOG_DATA) public data: LobListDialogData) {
		this.lobInfo.getAttachmentsList({
			EntityTypeName: data.entityTypeName,
			Identifier: data.identifier
		}).subscribe(res => this.attachments = res.Items);
	}

	ngOnInit() {
	}

	download(attachment: AttachmentListItem) {
		this.lobInfo.downloadAttachment(this.selection.selected[0])
			.subscribe(data => {
				saveAs(data.body as Blob, MiscHelper.getFileNameFromHeaders(data));
			});
	}

}
