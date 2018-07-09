import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class DscribeInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler):
		Observable<HttpEvent<any>> {
		const newReq = req.clone({
			headers: req.headers.set('AppInstance', '1').set('Content-Type', 'application/json') // TODO: this should not be hardcoded
		});
		return next.handle(newReq);
	}
}
