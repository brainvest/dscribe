import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})

// This wrapper is created to limit the access of client code to HttpClient features, as well as to add any necessary
// modifications/interceptions/notifications required by future logic.
export class ApiClientService {

	static serverRootUrl = 'http://localhost:5000/';

	constructor(private httpClient: HttpClient) {
	}

	private headers: HttpHeaders = new HttpHeaders({
		'Content-Type': 'application/json',
		'AppInstance': '1'
	});

	post<TResponse>(path: string, requestObject: object): Observable<TResponse> {
		const body = JSON.stringify(requestObject);
		return this.httpClient.post<TResponse>(this.getFullUrl(path), body, this.headers);
	}

	get<TResponse>(path: string): Observable<TResponse> {
		return this.httpClient.get<TResponse>(this.getFullUrl(path), this.headers);
	}

	private getFullUrl(url: string): string {
		return ApiClientService.serverRootUrl + url;
	}
}
