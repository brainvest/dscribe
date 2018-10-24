import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DscribeService} from '../dscribe.service';

@Injectable()
export class DscribeInterceptor implements HttpInterceptor {
	constructor(private config: DscribeService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler):
		Observable<HttpEvent<any>> {
		let headers = req.headers || new HttpHeaders();
		// TODO: this should not be hardcoded
		headers = headers.set('Content-Type', 'application/json');
		if (this.config.appInstance) {
			headers = headers.set('AppInstance', String(this.config.appInstance.id));
		}
		if (this.config.authHeaderFetcher()) {
			headers = headers.set('Authorization', this.config.authHeaderFetcher());
		}

		const newReq = req.clone({headers});
		return next.handle(newReq);
	}
}
