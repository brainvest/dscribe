import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ReleaseMetadataRequest} from '../models/release-metadata-request';
import {MetadataManagementApiClient} from '../metadata-management-api-client';
import {HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from '../../common/notifications/snackbar.service';

@Component({
	selector: 'dscribe-release-metadata-settings',
	templateUrl: './release-metadata-settings.component.html',
	styleUrls: ['./release-metadata-settings.component.css']
})
export class ReleaseMetadataSettingsComponent implements OnInit {

	releaseSettings = new ReleaseMetadataRequest();
	releaseSettingsError = new ReleaseMetadataRequest();
	submitLoading = false;

	constructor(
		private dialogRef: MatDialogRef<ReleaseMetadataSettingsComponent>,
		@Inject(MAT_DIALOG_DATA) private data: any,
		private apiClient: MetadataManagementApiClient,
		private snackbarService: SnackBarService) {
	}

	ngOnInit() {
	}

	release() {
		this.submitLoading = true;
		this.apiClient.releaseMetadata(this.releaseSettings)
			.subscribe((x: any) => {
				this.dialogRef.close(true);
			}, (error: HttpErrorResponse) => {
				this.submitLoading = false;
				this.releaseSettingsError = error.error;
				this.snackbarService.open(error.statusText);
				this.submitLoading = false;
			});
	}

	cancel() {
		this.dialogRef.close();
	}
}
