import { CommentModel, GetCommentRequestModel } from '../../models/comment.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LobListDialogData } from '../../models/common-models';
import { LobInfoService } from '../../lob-info.service';

@Component({
	selector: 'dscribe-comments-list',
	templateUrl: './comments-list.component.html',
	styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

	public comments: CommentModel[] = [];
	public commentToSave: CommentModel = new CommentModel();
	public isLoading: boolean;

	constructor(
		private dialogRef: MatDialogRef<CommentsListComponent>,
		@Inject(MAT_DIALOG_DATA) public data: LobListDialogData,
		private lobService: LobInfoService,
	) {
	}

	ngOnInit() {
		this.getCommentList();
	}

	cancel() {
		this.dialogRef.close();
	}

	getCommentList() {
		this.isLoading = true;
		this.comments = [];
		const request: GetCommentRequestModel = new GetCommentRequestModel();
		request.EntityTypeName = this.data.entityTypeName;
		request.Identifier = this.data.identifier;
		this.lobService.getCommentList(request).subscribe(
			(res: any) => {
				this.comments = res.Items;
				this.isLoading = false;
			}, (error: any) => {
				this.isLoading = false;
			}
		);
	}

	saveComment() {
		this.isLoading = true;
		this.commentToSave.EntityTypeName = this.data.entityTypeName;
		this.commentToSave.Identifier = this.data.identifier;
		const service = this.commentToSave.Id ? this.lobService.editComment(this.commentToSave) : this.lobService.addComment(this.commentToSave);
		service.subscribe(
			(res: any) => {
				this.getCommentList();
			}, (error: any) => {

			}
		);
	}

	deleteComment(comment: CommentModel) {
		this.isLoading = true;
		this.lobService.deleteComment(comment).subscribe(
			(res: any) => {
				this.getCommentList();
			}, (error: any) => {

			}
		);
	}

	switchToEditMode(item: CommentModel) {
		this.comments.forEach(element => {
			element.IsEditing = false;
		});
		item.IsEditing = true;
		this.commentToSave = JSON.parse(JSON.stringify(item));
	}

	switchToAddMode() {
		this.comments.forEach(element => {
			element.IsEditing = false;
		});
		const item = new CommentModel();
		item.IsEditing = true;
		this.comments.push(item);
	}

	cancelEditMode(comment: CommentModel) {
		comment.IsEditing = false;
		this.commentToSave = new CommentModel();
		if (!comment.Id) {
			this.comments.splice(this.comments.indexOf(comment));
		}
	}
}
