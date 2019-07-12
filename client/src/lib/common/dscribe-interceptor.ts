import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DscribeService } from '../dscribe.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DscribeInterceptor implements HttpInterceptor {
	constructor(private config: DscribeService) { }


	intercept(req: HttpRequest<any>, next: HttpHandler):
		Observable<HttpEvent<any>> {
		let headers = req.headers || new HttpHeaders();
		// TODO: this should not be hardcoded
		headers = headers.set('Content-Type', 'application/json');
		if (this.config.appInstance) {
			headers = headers.set('AppInstance', String(this.config.appInstance.Id));
		}
		if (this.config && this.config.authHeaderFetcher && this.config.authHeaderFetcher()) {
			headers = headers.set('Authorization', this.config.authHeaderFetcher());
		}

		const newReq = req.clone({ headers });
		return next.handle(newReq).pipe(catchError(this.handleError));
	}

	private handleError(error: HttpErrorResponse) {
		if (error.status === 500) {
			return throwError(error);
		} else if (error.status === 400) {
			return throwError(error);
		} else {
			return throwError(error.statusText);
		}
	}
}
