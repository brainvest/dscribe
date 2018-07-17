import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppInstanceInfoModel} from './models/app-instance-info-model';

@Injectable()
export class DscribeInterceptor implements HttpInterceptor {

	public static appInstanceId: string = '1';
	public static appInstance: AppInstanceInfoModel;

	intercept(req: HttpRequest<any>, next: HttpHandler):
		Observable<HttpEvent<any>> {
		const newReq = req.clone({
			headers: req.headers.set('AppInstance', DscribeInterceptor.appInstanceId)
				.set('Content-Type', 'application/json') // TODO: this should not be hardcoded
		});
		return next.handle(newReq);
	}
}
