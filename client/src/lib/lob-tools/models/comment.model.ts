export class CommentModel {
	public Description: string;
	public EntityTypeId: number;
	public EntityTypeName: string;
	public Id: number;
	public Identifier: number;
	public IsDeleted: boolean;
	public RequestLogId: number;
	public Title: string;
	public Url: string;
	public IsEditing: boolean;
}

export class GetCommentRequestModel {
	public EntityTypeName: string;
	public Identifier: number;
}
