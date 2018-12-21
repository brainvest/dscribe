import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LobListDialogData } from '../../models/common-models';
import { LobService } from 'src/lib/common/services/lob.service';
import { GetCommentRequestModel, CommentModel } from 'src/lib/common/models/lob/comment.model';

@Component({
	selector: 'dscribe-comments-list',
	templateUrl: './comments-list.component.html',
	styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

	public comments: CommentModel[] = [];
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: LobListDialogData,
		private lobService: LobService,
	) {
	}

	ngOnInit() {
		this.getCommentList();
	}

	getCommentList() {
		this.comments = [];
		const request: GetCommentRequestModel = new GetCommentRequestModel();
		request.EntityTypeName = this.data.entityTypeName;
		request.Identifier = this.data.identifier;
		this.lobService.getCommentList(request).subscribe(
			(res: CommentModel[]) => {
				this.comments = res;
			}, (error: any) => {

			}
		);
	}
}
