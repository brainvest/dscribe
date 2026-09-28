export enum ReportFormats {
	RichTextDocument = 1
}

export class ReportsListResponse {
	EntityTypeName: string;
	Format: ReportFormats;
	Id: number;
	Title: string;
}

export class DownloadReportRequest {
	ReportDefinitionId: number;
	EntityIdentifier: number;
}

export class SaveReportAsAttachmentRequest {
	ReportDefinitionId: number;
	EntityIdentifier: number;
	Title: string;
	Description: string;
}
