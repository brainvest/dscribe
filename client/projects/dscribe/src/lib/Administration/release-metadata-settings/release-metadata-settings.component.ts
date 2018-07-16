import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ReleaseMetadataRequest} from '../models/release-metadata-request';
import {MetadataManagementApiClient} from '../metadata-management-api-client';

@Component({
	selector: 'dscribe-release-metadata-settings',
	templateUrl: './release-metadata-settings.component.html',
	styleUrls: ['./release-metadata-settings.component.css']
})
export class ReleaseMetadataSettingsComponent implements OnInit {

	releaseSettings = new ReleaseMetadataRequest();

	constructor(
		private dialogRef: MatDialogRef<ReleaseMetadataSettingsComponent>,
		@Inject(MAT_DIALOG_DATA) private data: any,
		private apiClient: MetadataManagementApiClient) {
	}

	ngOnInit() {
	}

	release() {
		this.apiClient.releaseMetadata(this.releaseSettings)
			.subscribe(x => {
				this.dialogRef.close(true);
			});
	}

	cancel() {
		this.dialogRef.close();
	}
}
