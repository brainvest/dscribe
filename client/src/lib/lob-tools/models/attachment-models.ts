export class AttachmentListItem {
	Description: string;
	EntityTypeId: number;
	Id: number;
	Identifier: number;
	IsDeleted: boolean;
	Title: string;
	Url: string;
	FileName: string;
	Size: number;
}

export class AttachmentsListRequest {
	EntityTypeName: string;
	Identifier: number;
}

export class AttachmentsListResponse {
	Items: AttachmentListItem[];
}
