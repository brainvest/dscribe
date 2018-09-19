import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppInstanceInfoModel} from './models/app-instance-info-model';

@Injectable()
export class DscribeInterceptor implements HttpInterceptor {

	public static appInstanceId = '1';
	public static appInstance: AppInstanceInfoModel;
	public static authHeaderFetcher: Function;

	constructor() {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler):
		Observable<HttpEvent<any>> {
		const newReq = req.clone({
			headers: req.headers.set('AppInstance', DscribeInterceptor.appInstanceId)
				.set('Content-Type', 'application/json') // TODO: this should not be hardcoded
				.set('Authorization', DscribeInterceptor.authHeaderFetcher() || '')
		});
		return next.handle(newReq);
	}
}
