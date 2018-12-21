import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DscribeService } from '../../dscribe.service';
import { Observable, ReplaySubject } from 'rxjs';
import { CommentModel, GetCommentRequestModel } from '../models/lob/comment.model';

@Injectable({
	providedIn: 'root'
})
export class LobService {
	private getCommentsApi = this.dscribeService.url('api/Comment/GetCommentsList');

	constructor(private http: HttpClient, private dscribeService: DscribeService) {
	}

	getCommentList(model: GetCommentRequestModel): Observable<CommentModel[]> {
		return this.http.post<CommentModel[]>(this.getCommentsApi, model);
	}
}
