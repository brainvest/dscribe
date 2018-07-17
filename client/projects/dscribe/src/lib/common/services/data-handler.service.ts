import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HasIdName} from '../models/has-id-name';
import {IdAndName} from '../models/id-and-name';
import {EntityListRequest} from '../models/entity-list-request';
import {EntityBase} from '../models/entity-base';
import {GroupListRequest} from '../models/groupping/group-list-request';
import {catchError, map, share} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DataHandlerService {

	private filterAPI = 'api/entity/getByFilter';
	private filterCountAPI = 'api/entity/countByFilter';
	private groupAPI = 'api/entity/getGroupped';
	private groupCountAPI = 'api/entity/getGroupCount';
	private displayNameAPI = 'api/entity/GetIdAndName';
	private allIdAndNameAPI = 'api/entity/GetAllIdAndName';
	private autocompeleteIdNameAPI = 'api/entity/GetAutocompleteItems';
	private managementURL = 'api/entity/';
	private expressionValueAPI = 'api/entity/GetExpressionValue';
	private saveFiltersApi = 'api/filters/save';
	private listFiltersApi = 'api/filters/list';
	private getFilterTextApi = 'api/entity/GetFilterText';

	private cache: { [id: string]: IdAndNameCacheEntry; } = {};
	private cache2: { [entityName: string]: EntityIdAndNames; } = {};
	private uploadQueue: { [entityName: string]: { [id: number]: number }; } = {};
	private firstAddTime: Date;
	private queueSize = 0;
	private nameResponse: BehaviorSubject<any> = new BehaviorSubject<any>(1);
	private downloadTimeout: any;

	private expressionValueCacheQueueSize = 0;
	private expressionValueAutoDownloader: any;
	private expressionValueResponse: BehaviorSubject<any> = new BehaviorSubject<any>(1);

	constructor(private http: HttpClient) {
	}

	getName(entityType: string, id: number): Observable<string> {
		if (id === null || id === undefined || id.toString().length === 0) {
			return null;
		}
		let existing = this.cache2[entityType];
		if (!existing) {
			existing = new EntityIdAndNames();
			this.cache2[entityType] = existing;
		}
		const name = existing[id];
		if (name !== undefined) {
			return of(name);
		}
		this.enqueueForName(entityType, id);
		return Observable.create(observer => {
			observer.next('Loading...');
			this.nameResponse.subscribe(() => {
				const name2 = existing[id];
				if (name2 !== undefined) {
					observer.next(name2);
					observer.complete(name2);
				}
			});
		});
	}

	private enqueueForName(entityType: string, id: number) {
		let existing = this.uploadQueue[entityType];
		if (!existing) {
			existing = [];
			this.uploadQueue[entityType] = existing;
		}
		if (existing[id]) {
			return;
		}
		existing[id] = -1;
		if (this.queueSize === 0) {
			this.firstAddTime = new Date();
			this.downloadTimeout = setTimeout(() => this.downloadQueuedNames(), 300);
		}
		this.queueSize++;
		if (this.queueSize > 30) {
			this.downloadQueuedNames();
			clearTimeout(this.downloadTimeout);
		}
	}

	private downloadQueuedNames() {
		if (!this.queueSize) {
			return;
		}
		const request: { entityType: string; ids: number[] }[] = [];
		for (const entityType in this.uploadQueue) {
			if (!this.uploadQueue.hasOwnProperty(entityType)) {
				continue;
			}
			const ids: number[] = [];
			const array = this.uploadQueue[entityType];
			for (const id in array) {
				if (array.hasOwnProperty(id) && array[id] === -1) {
					ids.push(+id);
					array[id] = 1;
				}
			}
			request.push({
				entityType: entityType,
				ids: ids
			});
		}
		this.firstAddTime = null;
		this.queueSize = 0;
		this.http.post<IdAndNameResponse[]>(this.displayNameAPI, request)
			.subscribe(result => {
				for (const item of result) {
					const existing = this.cache2[item.entityType];
					for (const id of item.names) {
						existing[id.id] = id.displayName;
						delete (this.uploadQueue[item.entityType])[id.id];
					}
				}
				this.nameResponse.next({});
			});
	}

	getIdAndNames(entityType: string): Observable<HasIdName[]> {
		const existing = this.cache[entityType];
		if (existing) {
			if (existing.data) {
				return of(existing.data);
			} else {
				return existing.observable;
			}
		}
		const download = this.http.post<HasIdName[]>(this.allIdAndNameAPI, {entityType: entityType})
			.pipe(catchError(this.handleError), share());
		this.cache[entityType] = new IdAndNameCacheEntry;
		this.cache[entityType].observable = download;
		download.subscribe(res => {
			this.cache[entityType].data = res;
			this.cache[entityType].observable = null;
		});
		return download;
	}

	getAutocompleteItems(entityType: string, queryText: string): Observable<IdAndName> {
		return this.http.post<IdAndName>(this.autocompeleteIdNameAPI, {
			entityType: entityType,
			queryText: queryText
		});
	}

	countByFilter(request: EntityListRequest): Observable<number> {
		return this.http.post<number>(this.filterCountAPI, request.getRequestObject());
	}

	getByFilter(request: EntityListRequest): Observable<EntityBase[]> {
		return this.http.post<EntityBase[]>(this.filterAPI, request.getRequestObject());
	}

	getGroupCount(request: GroupListRequest): Observable<number> {
		return this.http.post<number>(this.groupCountAPI, request.getRequestObject());
	}

	getGrouped(request: GroupListRequest): Observable<any[]> {
		return this.http.post<any[]>(this.groupAPI, request.getRequestObject());
	}

	manageEntity(entity: EntityBase, entityType: string, action: string): Observable<EntityBase> {
		return this.http.post<EntityBase>(this.managementURL + action, {
			entityType: entityType,
			entity: entity
		});
	}

	deleteEntity(entityType: string, entity: EntityBase): Observable<EntityBase> {
		return this.http.post<EntityBase>(this.managementURL + 'delete', {
			entityType: entityType,
			entity: entity
		});
	}

	getAutoCompleteItems(entityTypeName: string, searchTerm: string): Observable<{ displayName: string, id: number }[]> {
		return this.getAutocompleteItems(entityTypeName, searchTerm)
			.pipe(map(res => {
				if (!searchTerm || typeof searchTerm === 'number') {
					return res.names;
				}
				const regExp = new RegExp(this.escapeRegExp(searchTerm), 'i');
				return res.names.filter(name => regExp.test(name.displayName));
			}));
	}

	private escapeRegExp(str: string): string {
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\^\$\|]/g, '\\$&');
	}

	private handleError(error: any) {
		const errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` :
				'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}

class IdAndNameCacheEntry {
	public observable: Observable<HasIdName[]>;
	public data: HasIdName[];
}

class IdAndNameModel {
	id: number;
	displayName: string;
}

class IdAndNameResponse {
	entityType: string;
	names: IdAndNameModel[];
}

class EntityIdAndNames {
	[id: number]: string;
}
