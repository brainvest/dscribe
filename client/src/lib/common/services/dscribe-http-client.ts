import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {DscribeService} from "../../dscribe.service";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class DscribeHttpClient {
    constructor(private httpClient: HttpClient, private dscribeService: DscribeService) {
    }

    public post<T>(url: string, data: any, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        if (!options) {
            options = {
                observe: 'body' as const,
                headers: {}
            };
        }
        if (this.dscribeService.appInstance) {
            options.headers['AppInstance'] = String(this.dscribeService.appInstance.Id);
        }
        return this.httpClient.post<T>(url, data, options);
    }

    public postForBlob(url: string, data: any, options: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
    }): Observable<HttpResponse<Blob>> {
        if (!options) {
            options = {
                observe: 'response' as const,
                headers: {},
                responseType: 'blob' as const
            };
        }
        if (this.dscribeService.appInstance) {
            options.headers['AppInstance'] = String(this.dscribeService.appInstance.Id);
        }
        return this.httpClient.post(url, data, options);
    }

    public get<T>(url: string): Observable<T> {
        var options = {
            observe: 'body' as const,
            headers: {}
        };
        if (this.dscribeService.appInstance) {
            options.headers['AppInstance'] = String(this.dscribeService.appInstance.Id);
        }
        return this.httpClient.get<T>(url, options);
    }
}
