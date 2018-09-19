import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DscribeService} from '../dscribe.service';

@Injectable()
export class DscribeInterceptor implements HttpInterceptor {
	constructor(private config: DscribeService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler):
		Observable<HttpEvent<any>> {
		const newReq = req.clone({
			headers: req.headers.set('AppInstance', String(this.config.appInstance.id))
				.set('Content-Type', 'application/json') // TODO: this should not be hardcoded
				.set('Authorization', this.config.authHeaderFetcher() || '')
		});
		return next.handle(newReq);
	}
}
