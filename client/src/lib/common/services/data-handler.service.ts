import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HasIdName} from '../models/has-id-name';
import {IdAndName} from '../models/id-and-name';
import {EntityListRequest} from '../models/entity-list-request';
import {EntityBase} from '../models/entity-base';
import {GroupListRequest} from '../models/groupping/group-list-request';
import {map, share} from 'rxjs/operators';
import {DscribeService} from '../../dscribe.service';
import {ManageEntityModes} from '../../add-n-edit/models/manage-entity-modes';
import {AddNEditHelper} from '../../add-n-edit/add-n-edit-helper';
import {Result} from '../models/Result';
import {DscribeHttpClient} from './dscribe-http-client';
import {PrimaryKey} from '../models/primary-key';
import {MetadataService} from './metadata.service';
import {DataTypes} from 'src/lib/metadata/data-types';
import {EntityTypeMetadata} from 'src/lib/metadata/entity-type-metadata';

class IdAndNameCacheEntry {
	public observable: Observable<HasIdName[]>;
	public data: HasIdName[];
}

class IdAndNameModel {
	Id: PrimaryKey;
	DisplayName: string;
}

class IdAndNameResponse {
	EntityTypeName: string;
	Names: IdAndNameModel[];
}

class EntityIdAndNames {
	[id: string]: string;
}

@Injectable({
	providedIn: 'root',
})
export class DataHandlerService {

	constructor(private http: DscribeHttpClient, private dscribeService: DscribeService, private metadataService: MetadataService) {
	}

	private filterAPI = this.dscribeService.url('api/entity/getByFilter');
	private filterCountAPI = this.dscribeService.url('api/entity/countByFilter');
	private groupAPI = this.dscribeService.url('api/entity/getGroupped');
	private groupCountAPI = this.dscribeService.url('api/entity/getGroupCount');
	private displayNameAPI = this.dscribeService.url('api/entity/GetIdAndName');
	private allIdAndNameAPI = this.dscribeService.url('api/entity/GetAllIdAndName');
	private autocompeleteIdNameAPI = this.dscribeService.url('api/entity/GetAutocompleteItems');
	private managementURL = this.dscribeService.url('api/entity/');
	private expressionValueAPI = this.dscribeService.url('api/entity/GetExpressionValue');
	private saveFiltersApi = this.dscribeService.url('api/filters/save');
	private listFiltersApi = this.dscribeService.url('api/filters/list');
	private getFilterTextApi = this.dscribeService.url('api/entity/GetFilterText');

	private cache: { [id: string]: IdAndNameCacheEntry; } = {};
	private cache2: { [entityTypeName: string]: EntityIdAndNames; } = {};
	private uploadQueue: { [entityTypeName: string]: { [id: string]: number }; } = {};
	private firstAddTime: Date;
	private queueSize = 0;
	private nameResponse: BehaviorSubject<any> = new BehaviorSubject<any>(1);
	private downloadTimeout: any;

	private expressionValueCacheQueueSize = 0;
	private expressionValueAutoDownloader: any;
	private expressionValueResponse: BehaviorSubject<any> = new BehaviorSubject<any>(1);


	getName(entityTypeName: string, id: PrimaryKey): Observable<string> {
		if (id === null || id === undefined || id.toString().length === 0) {
			return of(String(id));
		}
		let existing = this.cache2[entityTypeName];
		if (!existing) {
			existing = new EntityIdAndNames();
			this.cache2[entityTypeName] = existing;
		}
		const name = existing[id];
		if (name !== undefined) {
			return of(name);
		}
		this.enqueueForName(entityTypeName, String(id));
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

	private enqueueForName(entityTypeName: string, id: string) {
		let existing = this.uploadQueue[entityTypeName];
		if (!existing) {
			existing = {};
			this.uploadQueue[entityTypeName] = existing;
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
		const request: { entityTypeName: string; ids: PrimaryKey[] }[] = [];
		for (const entityTypeName in this.uploadQueue) {
			if (!this.uploadQueue.hasOwnProperty(entityTypeName)) {
				continue;
			}
			const ids: PrimaryKey[] = [];
			const array = this.uploadQueue[entityTypeName];
			for (const id in array) {
				if (array.hasOwnProperty(id) && array[id] === -1) {
					ids.push(id);
					array[id] = 1;
				}
			}
			if (!ids.length) {
				continue;
			}
			request.push({
				entityTypeName: entityTypeName,
				ids: ids
			});
		}
		this.firstAddTime = null;
		this.queueSize = 0;
		this.http.post<IdAndNameResponse[]>(this.displayNameAPI, request)
			.subscribe(result => {
				for (const item of result) {
					const existing = this.cache2[item.EntityTypeName];
					for (const id of item.Names) {
						existing[id.Id] = id.DisplayName;
						delete (this.uploadQueue[item.EntityTypeName])[id.Id];
					}
				}
				this.nameResponse.next({});
			});
	}

	getIdAndNames(entityTypeName: string): Observable<HasIdName[]> {
		const existing = this.cache[entityTypeName];
		if (existing) {
			if (existing.data) {
				return of(existing.data);
			} else {
				return existing.observable;
			}
		}
		const download = this.http.post<HasIdName[]>(this.allIdAndNameAPI, {entityTypeName: entityTypeName})
			.pipe(share());
		this.cache[entityTypeName] = new IdAndNameCacheEntry;
		this.cache[entityTypeName].observable = download;
		download.subscribe(res => {
			this.cache[entityTypeName].data = res;
			this.cache[entityTypeName].observable = null;
		});
		return download;
	}

	getAutocompleteItems(entityTypeName: string, queryText: string): Observable<IdAndName> {
		return this.http.post<IdAndName>(this.autocompeleteIdNameAPI, {
			entityTypeName: entityTypeName,
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

	manageEntity(entity: EntityBase, entityTypeName: string, action: ManageEntityModes): Observable<Result<EntityBase>> {
		return this.http.post<Result<EntityBase>>(this.managementURL + AddNEditHelper.actionName(action), {
			entityTypeName: entityTypeName,
			entity: entity
		});
	}

	deleteEntity(entityTypeName: string, entity: EntityBase): Observable<Result<EntityBase>> {
		return this.http.post<Result<EntityBase>>(this.managementURL + 'delete', {
			entityTypeName: entityTypeName,
			entity: entity
		});
	}

	getAutoCompleteItems(entityTypeName: string, searchTerm: string): Observable<{ DisplayName: string, Id: PrimaryKey }[]> {
		return this.getAutocompleteItems(entityTypeName, searchTerm)
			.pipe(map(res => {
				if (!searchTerm || typeof searchTerm === 'number') {
					return res.Names;
				}
				const regExp = new RegExp(this.escapeRegExp(searchTerm), 'i');
				return res.Names.filter(name => regExp.test(name.DisplayName));
			}));
	}

	getNewEntityForCreateDialog(entityType: EntityTypeMetadata): any{
		const entity = {};
		for (const property of entityType.getPropertiesForManage(ManageEntityModes.Insert)) {
			if (property.DataType === DataTypes.bool && !property.IsNullable) {
				entity[property.Name] = false;
			}
		}
		return entity;
	}

	private escapeRegExp(str: string): string {
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\^\$\|]/g, '\\$&');
	}
}
