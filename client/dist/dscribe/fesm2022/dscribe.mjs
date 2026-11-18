import * as i0 from '@angular/core';
import { EventEmitter, Injectable, Output, Component, Input, Inject, Optional, Pipe, ViewChild, ViewContainerRef, ViewEncapsulation, NgModule } from '@angular/core';
import * as i9 from '@angular/material/sort';
import { MatSort, MatSortModule } from '@angular/material/sort';
import * as i1$2 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i7$1 from '@angular/material/paginator';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BehaviorSubject, ReplaySubject, of, Observable, merge, throwError } from 'rxjs';
import { map, share, startWith, switchMap, catchError, mergeMap, flatMap } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import { HttpHeaders, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as i5 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i6 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i1$1 from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import * as i1$3 from '@angular/common';
import { DatePipe, CommonModule } from '@angular/common';
import * as i2 from '@angular/material/badge';
import { MatBadgeModule } from '@angular/material/badge';
import * as i10 from '@angular/material/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import * as i11 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i5$1 from '@angular/forms';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i7 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i8 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i10$1 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i8$1 from '@angular/material/progress-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { saveAs } from 'file-saver';
import * as i9$1 from '@angular/material/radio';
import { MatRadioModule } from '@angular/material/radio';
import * as i14 from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import * as i9$2 from '@angular/material/button-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import * as i13 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i2$1 from '@angular/router';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as i6$1 from '@angular/material/autocomplete';
import { MatAutocompleteTrigger, MatAutocompleteModule } from '@angular/material/autocomplete';
import * as i9$3 from '@angular/material/checkbox';
import { MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxModule } from '@angular/material/checkbox';
import * as i4 from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as i7$2 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import * as i7$3 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import * as i13$1 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i8$2 from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import * as i9$4 from '@angular/material/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';

var DscribeFeatureArea;
(function (DscribeFeatureArea) {
    DscribeFeatureArea[DscribeFeatureArea["Filter"] = 1] = "Filter";
    DscribeFeatureArea[DscribeFeatureArea["List"] = 2] = "List";
})(DscribeFeatureArea || (DscribeFeatureArea = {}));

class DscribeService {
    constructor() {
        this.config = {};
        this.commands$ = new BehaviorSubject([]);
        this.loggedOut = new EventEmitter();
        this.appInstance$ = new ReplaySubject(1);
    }
    set authHeaderFetcher(fetcher) {
        this.config.authHeaderFetcher = fetcher;
    }
    logout() {
        this.loggedOut.next();
    }
    get authHeaderFetcher() {
        return this.config.authHeaderFetcher;
    }
    get username() {
        return this.config.username;
    }
    set username(value) {
        this.config.username = value;
    }
    set appInstance(instance) {
        this.config.appInstance = instance;
        this.appInstance$.next(instance);
    }
    get appInstance() {
        return this.config.appInstance;
    }
    getCommands() {
        return this.commands$;
    }
    setCommands(value) {
        this.commands$.next(value);
    }
    getServerRoot() {
        return this.config.serverRoot || '';
    }
    setServerRoot(value) {
        this.config.serverRoot = value;
    }
    getClientRoot() {
        return this.config.clientRoot || '/';
    }
    setClientRoot(value) {
        this.config.clientRoot = value;
    }
    url(relativeToRoot) {
        const server = this.config.serverRoot || '';
        if (server.endsWith('/')) {
            if (relativeToRoot.startsWith('/')) {
                return server + relativeToRoot.substring(1);
            }
            else {
                return server + relativeToRoot;
            }
        }
        else {
            if (relativeToRoot.startsWith('/')) {
                return server + relativeToRoot;
            }
            else {
                return server + '/' + relativeToRoot;
            }
        }
    }
    static { this.ɵfac = function DscribeService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DscribeService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DscribeService, factory: DscribeService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DscribeService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, { loggedOut: [{
            type: Output
        }] }); })();

class DigestEntityType {
    constructor(Name, SingularTitle, PluralTitle, TypeGeneralUsageCategoryId) {
        this.Name = Name;
        this.SingularTitle = SingularTitle;
        this.PluralTitle = PluralTitle;
        this.TypeGeneralUsageCategoryId = TypeGeneralUsageCategoryId;
    }
}

class SelectionContainer {
    constructor(obj, isSelected) {
        this.obj = obj;
        this.isSelected = isSelected;
    }
}

var ManageEntityModes;
(function (ManageEntityModes) {
    ManageEntityModes[ManageEntityModes["Insert"] = 1] = "Insert";
    ManageEntityModes[ManageEntityModes["Update"] = 2] = "Update";
})(ManageEntityModes || (ManageEntityModes = {}));

class KnownFacets {
    static { this.HideInList = 'HideInList'; }
    static { this.HideInEdit = 'HideInEdit'; }
    static { this.HideInInsert = 'HideInInsert'; }
}

class EntityTypeMetadata extends DigestEntityType {
    constructor(Name, singularTitle, pluralTitle, typeGeneralUsageCategoryId, codePath, displayNamePath) {
        super(Name, singularTitle, pluralTitle, typeGeneralUsageCategoryId);
        this.Name = Name;
        this.codePath = codePath;
        this.displayNamePath = displayNamePath;
    }
    getPrimaryKey() {
        for (const propertyName of this.PropertyNames) {
            const property = this.Properties[propertyName];
            if (property.GeneralUsage === 'PrimaryKey') {
                return property;
            }
        }
        return null;
    }
    getPropertiesForManage(mode) {
        const hideFacet = mode === ManageEntityModes.Insert ? KnownFacets.HideInInsert : KnownFacets.HideInEdit;
        const props = [];
        for (const propertyName of this.PropertyNames) {
            const property = this.Properties[propertyName];
            if (property.FacetValues[hideFacet]) {
                continue;
            }
            props.push(property);
        }
        return props;
    }
    getPropertiesForFilter() {
        let props = [];
        const fks = [];
        // if (parentProperty && parentProperty._entityTypeName === DataTypes.NavigationList) {
        //   props.push(new PropertyMetadata('Count', 'count',
        // 'NormalData', DataTypes.int, null, null, null,
        //     null, this, null, null, null, 'Count', false));
        // }
        for (const propertyName of this.PropertyNames) {
            const property = this.Properties[propertyName];
            if (property.DataType === 'ForeignKey') {
                if (!props.find(x => x.ForeignKeyProperty === property)) {
                    fks.push(property);
                }
                continue;
            }
            if (property.DataType === 'NavigationEntity') {
                const index = fks.indexOf(property.ForeignKeyProperty);
                if (index !== -1) {
                    fks.splice(index, 1);
                }
            }
            props.push(property);
        }
        props = props.concat(fks);
        return props;
    }
    getPropertiesForGrouping() {
        const props = [];
        for (const propertyName of this.PropertyNames) {
            const property = this.Properties[propertyName];
            if (!property.FacetValues.HideInList) {
                props.push(new SelectionContainer(property, false));
            }
        }
        return props;
    }
}

class DataTypes {
    static { this.int = 'int'; }
    static { this.string = 'string'; }
    static { this.bool = 'bool'; }
    static { this.Date = 'Date'; }
    static { this.Time = 'Time'; }
    static { this.DateTime = 'DateTime'; }
    static { this.ForeignKey = 'ForeignKey'; }
    static { this.NavigationEntity = 'NavigationEntity'; }
    static { this.Enum = 'Enum'; }
    static { this.NavigationList = 'NavigationList'; }
    static { this.Guid = 'Guid'; }
    static { this.decimal = 'decimal'; }
    static { this.long = 'long'; }
    static { this.short = 'short'; }
    static { this.byte = 'byte'; }
    static { this.double = 'double'; }
}

class HasTypeInfo {
    constructor(IsNullable, DataType, EntityType) {
        this.IsNullable = IsNullable;
        this.DataType = DataType;
        this.EntityType = EntityType;
    }
}
class PropertyBehavior {
    constructor(BehaviorName, Parameters) {
        this.BehaviorName = BehaviorName;
        this.Parameters = Parameters;
    }
}
class PropertyMetadata extends HasTypeInfo {
    constructor(Name, GeneralUsage, DataType, EntityTypeName, ForeignKeyName, InversePropertyName, ValidationErrors, EntityType, InverseProperty, ForeignKeyProperty, FacetValues, Title, IsNullable, IsExpression, Behaviors) {
        super(IsNullable, DataType);
        this.Name = Name;
        this.GeneralUsage = GeneralUsage;
        this.DataType = DataType;
        this.EntityTypeName = EntityTypeName;
        this.ForeignKeyName = ForeignKeyName;
        this.InversePropertyName = InversePropertyName;
        this.ValidationErrors = ValidationErrors;
        this.EntityType = EntityType;
        this.InverseProperty = InverseProperty;
        this.ForeignKeyProperty = ForeignKeyProperty;
        this.FacetValues = FacetValues;
        this.Title = Title;
        this.IsNullable = IsNullable;
        this.IsExpression = IsExpression;
        this.Behaviors = Behaviors;
    }
    getConstantType() {
        let type = this.DataType;
        if (type === DataTypes.ForeignKey || type === DataTypes.NavigationEntity) {
            type = this.EntityType ? this.EntityType.getPrimaryKey().DataType : null;
        }
        if (this.IsNullable) {
            type += '?';
        }
        return type;
    }
}

class DscribeHttpClient {
    constructor(httpClient, dscribeService) {
        this.httpClient = httpClient;
        this.dscribeService = dscribeService;
    }
    post(url, data, options) {
        if (!options) {
            options = {
                observe: 'body',
                headers: {}
            };
        }
        if (this.dscribeService.appInstance) {
            options.headers['AppInstance'] = String(this.dscribeService.appInstance.Id);
        }
        return this.httpClient.post(url, data, options);
    }
    postForBlob(url, data, options) {
        if (!options) {
            options = {
                observe: 'response',
                headers: {},
                responseType: 'blob'
            };
        }
        if (this.dscribeService.appInstance) {
            options.headers['AppInstance'] = String(this.dscribeService.appInstance.Id);
        }
        return this.httpClient.post(url, data, options);
    }
    get(url) {
        var options = {
            observe: 'body',
            headers: {}
        };
        if (this.dscribeService.appInstance) {
            options.headers['AppInstance'] = String(this.dscribeService.appInstance.Id);
        }
        return this.httpClient.get(url, options);
    }
    static { this.ɵfac = function DscribeHttpClient_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DscribeHttpClient)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(DscribeService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DscribeHttpClient, factory: DscribeHttpClient.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DscribeHttpClient, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }, { type: DscribeService }], null); })();

class MetadataService {
    constructor(http, config) {
        this.http = http;
        this.config = config;
        this.entityTypes$ = new ReplaySubject(1);
        this.config.appInstance$.subscribe(() => this.clearMetadata());
    }
    getComplete() {
        this.http.get(this.config.url('api/metadata/getComplete'))
            .subscribe(x => {
            this.currentEntityTypes = MetadataService.extractEntityTypeMetadata(x.EntityTypes, x.PropertyDefaults);
            this.fixUpRelationships();
            this.entityTypes$.next(this.currentEntityTypes);
        }, console.error);
    }
    getEntityTypeByName(entityTypeName) {
        return this.entityTypes$.pipe(map(types => types.find(x => x.Name === entityTypeName)));
    }
    static extractEntityTypeMetadata(entityTypes, allDefaultFacets) {
        const result = [];
        for (const entityTypeName in entityTypes) {
            if (!(entityTypeName in entityTypes)) {
                continue;
            }
            const t = entityTypes[entityTypeName];
            const entityTypeMetadata = new EntityTypeMetadata(t.Name, t.SingularTitle, t.PluralTitle, t.TypeGeneralUsageCategoryId, t.Code, t.DisplayName);
            entityTypeMetadata.Properties = {};
            entityTypeMetadata.PropertyNames = [];
            for (const propertyName in t.Properties) {
                if (t.Properties.hasOwnProperty(propertyName)) {
                    const oldProperty = t.Properties[propertyName];
                    const defaultFacets = allDefaultFacets[oldProperty.GeneralUsage];
                    const newProperty = new PropertyMetadata();
                    newProperty.FacetValues = {};
                    if (defaultFacets) {
                        for (const dfName in defaultFacets.Defaults) {
                            if (defaultFacets.Defaults.hasOwnProperty(dfName)) {
                                if (oldProperty.LocalFacets && oldProperty.LocalFacets[dfName]) {
                                    newProperty.FacetValues[dfName] =
                                        oldProperty.LocalFacets[dfName].Value;
                                    delete oldProperty.LocalFacets[dfName];
                                }
                                else {
                                    newProperty.FacetValues[dfName] = defaultFacets.Defaults[dfName].Value;
                                }
                            }
                        }
                    }
                    for (const dfName in oldProperty.LocalFacets) {
                        if (oldProperty.LocalFacets.hasOwnProperty(dfName)) {
                            newProperty.FacetValues[dfName] = oldProperty.LocalFacets[dfName].Value;
                        }
                    }
                    newProperty.Name = oldProperty.Name;
                    newProperty.DataType = oldProperty.DataType;
                    newProperty.EntityTypeName = oldProperty.EntityTypeName;
                    newProperty.ForeignKeyName = oldProperty.ForeignKeyName;
                    newProperty.GeneralUsage = oldProperty.GeneralUsage;
                    newProperty.InversePropertyName = oldProperty.InversePropertyName;
                    newProperty.Title = oldProperty.Title;
                    newProperty.IsNullable = oldProperty.IsNullable;
                    newProperty.IsExpression = oldProperty.IsExpression;
                    newProperty.Behaviors = this.convertBehaviors(oldProperty.Behaviors);
                    entityTypeMetadata.Properties[propertyName] = newProperty;
                    entityTypeMetadata.PropertyNames.push(propertyName);
                }
            }
            result.push(entityTypeMetadata);
        }
        return result;
    }
    static convertBehaviors(behaviors) {
        if (!behaviors) {
            return null;
        }
        var result = [];
        for (const behavior of behaviors) {
            result.push(new PropertyBehavior(behavior.BehaviorName, behavior.Parameters));
        }
        return result;
    }
    fixUpRelationships() {
        this.currentEntityTypes.forEach(type => {
            for (const propertyName in type.Properties) {
                if (type.Properties.hasOwnProperty(propertyName)) {
                    const prop = type.Properties[propertyName];
                    if (prop.EntityTypeName) {
                        prop.EntityType = this.currentEntityTypes.find(x => x.Name === prop.EntityTypeName);
                    }
                    if (prop.ForeignKeyName) {
                        prop.ForeignKeyProperty = type.Properties[prop.ForeignKeyName];
                    }
                    if (prop.InversePropertyName && prop.EntityTypeName && prop.EntityType.Properties) {
                        prop.InverseProperty = prop.EntityType.Properties[prop.InversePropertyName];
                    }
                }
            }
        });
    }
    clearMetadata() {
        this.getComplete();
    }
    static { this.ɵfac = function MetadataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MetadataService)(i0.ɵɵinject(DscribeHttpClient), i0.ɵɵinject(DscribeService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MetadataService, factory: MetadataService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MetadataService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: DscribeHttpClient }, { type: DscribeService }], null); })();

class AddNEditHelper {
    static actionName(action) {
        switch (action) {
            case ManageEntityModes.Insert:
                return 'Add';
            case ManageEntityModes.Update:
                return 'Edit';
            default:
                throw new Error('Unknown action mode: ' + action);
        }
    }
    static joinPath(path1, path2) {
        if (!path1 || !path2 || path1.endsWith('.') || path2.startsWith('.')) {
            return path1 + path2;
        }
        return path1 + '.' + path2;
    }
}

class IdAndNameCacheEntry {
}
class IdAndNameModel {
}
class IdAndNameResponse {
}
class EntityIdAndNames {
}
class DataHandlerService {
    constructor(http, dscribeService, metadataService) {
        this.http = http;
        this.dscribeService = dscribeService;
        this.metadataService = metadataService;
        this.filterAPI = this.dscribeService.url('api/entity/getByFilter');
        this.filterCountAPI = this.dscribeService.url('api/entity/countByFilter');
        this.groupAPI = this.dscribeService.url('api/entity/getGroupped');
        this.groupCountAPI = this.dscribeService.url('api/entity/getGroupCount');
        this.displayNameAPI = this.dscribeService.url('api/entity/GetIdAndName');
        this.allIdAndNameAPI = this.dscribeService.url('api/entity/GetAllIdAndName');
        this.autocompeleteIdNameAPI = this.dscribeService.url('api/entity/GetAutocompleteItems');
        this.managementURL = this.dscribeService.url('api/entity/');
        this.expressionValueAPI = this.dscribeService.url('api/entity/GetExpressionValue');
        this.saveFiltersApi = this.dscribeService.url('api/filters/save');
        this.listFiltersApi = this.dscribeService.url('api/filters/list');
        this.getFilterTextApi = this.dscribeService.url('api/entity/GetFilterText');
        this.cache = {};
        this.cache2 = {};
        this.uploadQueue = {};
        this.queueSize = 0;
        this.nameResponse = new BehaviorSubject(1);
        this.expressionValueCacheQueueSize = 0;
        this.expressionValueResponse = new BehaviorSubject(1);
    }
    getName(entityTypeName, id) {
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
    enqueueForName(entityTypeName, id) {
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
    downloadQueuedNames() {
        if (!this.queueSize) {
            return;
        }
        const request = [];
        for (const entityTypeName in this.uploadQueue) {
            if (!this.uploadQueue.hasOwnProperty(entityTypeName)) {
                continue;
            }
            const ids = [];
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
        this.http.post(this.displayNameAPI, request)
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
    getIdAndNames(entityTypeName) {
        const existing = this.cache[entityTypeName];
        if (existing) {
            if (existing.data) {
                return of(existing.data);
            }
            else {
                return existing.observable;
            }
        }
        const download = this.http.post(this.allIdAndNameAPI, { entityTypeName: entityTypeName })
            .pipe(share());
        this.cache[entityTypeName] = new IdAndNameCacheEntry;
        this.cache[entityTypeName].observable = download;
        download.subscribe(res => {
            this.cache[entityTypeName].data = res;
            this.cache[entityTypeName].observable = null;
        });
        return download;
    }
    getAutocompleteItems(entityTypeName, queryText) {
        return this.http.post(this.autocompeleteIdNameAPI, {
            entityTypeName: entityTypeName,
            queryText: queryText
        });
    }
    countByFilter(request) {
        return this.http.post(this.filterCountAPI, request.getRequestObject());
    }
    getByFilter(request) {
        return this.http.post(this.filterAPI, request.getRequestObject());
    }
    getGroupCount(request) {
        return this.http.post(this.groupCountAPI, request.getRequestObject());
    }
    getGrouped(request) {
        return this.http.post(this.groupAPI, request.getRequestObject());
    }
    manageEntity(entity, entityTypeName, action) {
        return this.http.post(this.managementURL + AddNEditHelper.actionName(action), {
            entityTypeName: entityTypeName,
            entity: entity
        });
    }
    deleteEntity(entityTypeName, entity) {
        return this.http.post(this.managementURL + 'delete', {
            entityTypeName: entityTypeName,
            entity: entity
        });
    }
    getAutoCompleteItems(entityTypeName, searchTerm) {
        return this.getAutocompleteItems(entityTypeName, searchTerm)
            .pipe(map(res => {
            if (!searchTerm || typeof searchTerm === 'number') {
                return res.Names;
            }
            const regExp = new RegExp(this.escapeRegExp(searchTerm), 'i');
            return res.Names.filter(name => regExp.test(name.DisplayName));
        }));
    }
    getNewEntityForCreateDialog(entityType) {
        const entity = {};
        for (const property of entityType.getPropertiesForManage(ManageEntityModes.Insert)) {
            if (property.DataType === DataTypes.bool) {
                if (property.IsNullable) {
                    entity[property.Name] = null;
                }
                else {
                    entity[property.Name] = false;
                }
            }
        }
        return entity;
    }
    escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\^\$\|]/g, '\\$&');
    }
    static { this.ɵfac = function DataHandlerService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DataHandlerService)(i0.ɵɵinject(DscribeHttpClient), i0.ɵɵinject(DscribeService), i0.ɵɵinject(MetadataService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DataHandlerService, factory: DataHandlerService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataHandlerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: DscribeHttpClient }, { type: DscribeService }, { type: MetadataService }], null); })();

class EntityListRequest {
    constructor(entityTypeName, filters, startIndex, count, order) {
        this.entityTypeName = entityTypeName;
        this.filters = filters;
        this.startIndex = startIndex;
        this.count = count;
        this.order = order;
    }
    getRequestObject() {
        return {
            entityTypeName: this.entityTypeName,
            filters: this.filters,
            order: this.order,
            startIndex: this.startIndex,
            count: this.count
        };
    }
}

class SortItem {
    constructor(propertyName, isDescending) {
        this.propertyName = propertyName;
        this.isDescending = isDescending;
    }
    static Create(propertyName, isDescending, entityType) {
        const property = entityType.Properties[propertyName];
        if (property == null) {
            return null;
        }
        const navigationProperty = entityType.PropertyNames.find(x => entityType.Properties[x].ForeignKeyProperty == property);
        var nameProperty = property?.EntityType?.displayNamePath;
        if (property.DataType != DataTypes.ForeignKey || !navigationProperty || !nameProperty) {
            return new SortItem(propertyName, isDescending);
        }
        if (nameProperty) {
            return new SortItem(navigationProperty + "." + nameProperty, isDescending);
        }
    }
}

class ListColumn {
    constructor(name, title, dataType, dataEntityTypeName, behaviors) {
        this.name = name;
        this.title = title;
        this.dataType = dataType;
        this.dataEntityTypeName = dataEntityTypeName;
        this.behaviors = behaviors;
    }
}

class MasterReference {
    constructor(master, masterProperty) {
        this.master = master;
        this.masterProperty = masterProperty;
    }
}

class SnackBarService {
    constructor(snackBar) {
        this.snackBar = snackBar;
    }
    open(message, action = 'close') {
        this.snackBar.open(message, action, { duration: 3000 });
    }
    static { this.ɵfac = function SnackBarService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SnackBarService)(i0.ɵɵinject(i1$1.MatSnackBar)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SnackBarService, factory: SnackBarService.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SnackBarService, [{
        type: Injectable
    }], () => [{ type: i1$1.MatSnackBar }], null); })();

class AddNEditResult {
    constructor(action, instance) {
        this.action = action;
        this.instance = instance;
    }
}

var EditorComponentTypes;
(function (EditorComponentTypes) {
    EditorComponentTypes[EditorComponentTypes["FlatPropertiesEditor"] = 1] = "FlatPropertiesEditor";
    EditorComponentTypes[EditorComponentTypes["TabSet"] = 2] = "TabSet";
    EditorComponentTypes[EditorComponentTypes["PropertyEditor"] = 3] = "PropertyEditor";
    EditorComponentTypes[EditorComponentTypes["List"] = 4] = "List";
})(EditorComponentTypes || (EditorComponentTypes = {}));
var ListBehaviors;
(function (ListBehaviors) {
    ListBehaviors[ListBehaviors["SaveInServer"] = 1] = "SaveInServer";
    ListBehaviors[ListBehaviors["SaveInObject"] = 2] = "SaveInObject";
})(ListBehaviors || (ListBehaviors = {}));

class AddNEditStructureLogic {
    static getStructure(entity, entityTypeMetaData, mode, masters, path, pathTitle) {
        const structure = {
            path: path,
            pathTitle: pathTitle,
            currentEntity: entity,
            componentType: EditorComponentTypes.FlatPropertiesEditor
        };
        const allProperties = entityTypeMetaData.getPropertiesForManage(mode);
        const navProps = allProperties.filter(x => x.DataType === DataTypes.NavigationEntity || x.DataType === DataTypes.NavigationList);
        const propertiesToHide = [];
        for (const nav of navProps) {
            const childMasters = masters ? [...masters, new MasterReference(entity, nav)] : [new MasterReference(entity, nav)];
            let navStructure;
            if (nav.DataType === DataTypes.NavigationEntity) {
                let subEntity = entity[nav.Name];
                if (!subEntity) {
                    subEntity = {};
                    entity[nav.Name] = subEntity;
                }
                navStructure = AddNEditStructureLogic.getStructure(subEntity, nav.EntityType, mode, childMasters, AddNEditHelper.joinPath(path, nav.Name), AddNEditHelper.joinPath(pathTitle, nav.Title));
                navStructure.parentEntity = entity;
                navStructure.masterReferences = childMasters;
                if (nav.ForeignKeyName) {
                    propertiesToHide.push(nav.ForeignKeyName);
                }
            }
            else {
                let list = entity[nav.Name];
                if (!list) {
                    list = [];
                    entity[nav.Name] = list;
                }
                navStructure = {
                    componentType: EditorComponentTypes.List,
                    entityTypeMetadata: nav.EntityType,
                    listBehavior: ListBehaviors.SaveInObject,
                    masterReferences: childMasters,
                    currentEntity: list,
                    parentEntity: entity,
                    path: AddNEditHelper.joinPath(path, nav.Name),
                    pathTitle: AddNEditHelper.joinPath(pathTitle, nav.Title),
                    propertyMetadata: nav
                };
            }
            if (structure.children) {
                structure.children.push(navStructure);
            }
            else {
                structure.children = [navStructure];
            }
        }
        for (const prop of allProperties.filter(x => x.DataType !== DataTypes.NavigationList && x.DataType !== DataTypes.NavigationEntity)) {
            if (masters &&
                masters.find(m => m.masterProperty
                    && m.masterProperty.InverseProperty
                    && m.masterProperty.InverseProperty.ForeignKeyProperty === prop)) {
                continue;
            }
            if (propertiesToHide.indexOf(prop.Name) > -1) {
                continue;
            }
            if (structure.directProperties) {
                structure.directProperties.push(prop);
            }
            else {
                structure.directProperties = [prop];
            }
        }
        return structure;
    }
}

function AddNEditComponent_div_1_dscribe_property_editor_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-property-editor", 5);
} if (rf & 2) {
    const property_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("property", property_r1)("entity", ctx_r1.entity);
} }
function AddNEditComponent_div_1_mat_card_2_mat_tab_2_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const related_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", related_r3.pathTitle, " ");
} }
function AddNEditComponent_div_1_mat_card_2_mat_tab_2_dscribe_property_editor_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-property-editor", 5);
} if (rf & 2) {
    const property_r4 = ctx.$implicit;
    const related_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("property", property_r4)("entity", related_r3.currentEntity);
} }
function AddNEditComponent_div_1_mat_card_2_mat_tab_2_dscribe_list_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-list", 9);
} if (rf & 2) {
    const related_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("hideFilter", true)("entityType", related_r3.entityTypeMetadata)("masters", related_r3.masterReferences)("addNEditStructure", related_r3);
} }
function AddNEditComponent_div_1_mat_card_2_mat_tab_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-tab");
    i0.ɵɵtemplate(1, AddNEditComponent_div_1_mat_card_2_mat_tab_2_ng_template_1_Template, 1, 1, "ng-template", 7)(2, AddNEditComponent_div_1_mat_card_2_mat_tab_2_dscribe_property_editor_2_Template, 1, 2, "dscribe-property-editor", 4)(3, AddNEditComponent_div_1_mat_card_2_mat_tab_2_dscribe_list_3_Template, 1, 4, "dscribe-list", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const related_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", related_r3.directProperties);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", related_r3.componentType === ctx_r1.componentTypes.List);
} }
function AddNEditComponent_div_1_mat_card_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card")(1, "mat-tab-group");
    i0.ɵɵtemplate(2, AddNEditComponent_div_1_mat_card_2_mat_tab_2_Template, 4, 2, "mat-tab", 6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.structure.children);
} }
function AddNEditComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, AddNEditComponent_div_1_dscribe_property_editor_1_Template, 1, 2, "dscribe-property-editor", 4)(2, AddNEditComponent_div_1_mat_card_2_Template, 3, 1, "mat-card", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.structure == null ? null : ctx_r1.structure.directProperties);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.structure == null ? null : ctx_r1.structure.children);
} }
class AddNEditComponent {
    constructor(metadataService, dataHandler, snackbarService) {
        this.metadataService = metadataService;
        this.dataHandler = dataHandler;
        this.snackbarService = snackbarService;
        this.entitySaved = new EventEmitter();
        this.canceled = new EventEmitter();
        this.componentTypes = EditorComponentTypes;
    }
    ngOnInit() {
        this.metadataService
            .getEntityTypeByName(this.entityTypeName)
            .subscribe((metadata) => {
            this.entityTypeMetadata = metadata;
            this.createEditorStructure();
        }, (errors) => {
            this.snackbarService.open(errors);
        });
    }
    createEditorStructure() {
        this.structure = AddNEditStructureLogic.getStructure(this.entity, this.entityTypeMetadata, this.action, this.masters, '', '');
    }
    afterEntitySaved(action, entity) {
        this.entitySaved.emit(new AddNEditResult(action, entity));
    }
    saveEntity() {
        for (let i = 0; i < this.structure.directProperties.length; i++) {
            const prop = this.structure.directProperties[i];
            if (prop.Name) {
                this.structure.directProperties[i].ValidationErrors = null;
            }
        }
        if (this.parentStructure && this.parentStructure.listBehavior === ListBehaviors.SaveInObject) {
            this.parentStructure.currentEntity.push(this.entity);
            this.afterEntitySaved(this.action, this.entity);
            return;
        }
        this.dataHandler.manageEntity(this.entity, this.entityTypeName, this.action).subscribe((res) => {
            if (res.Succeeded) {
                this.processSaveResponse(res.Data, this.action);
            }
            else {
                this.processFailure(res);
                this.snackbarService.open(this.getMessageFromServerValidationError(res));
            }
        }, (errors) => {
            this.processFailure(errors);
            this.snackbarService.open(this.getMessageFromServerValidationError(errors));
        });
    }
    getMessageFromServerValidationError(errors) {
        let message = errors.Message;
        if (errors.Errors) {
            for (const key in errors.Errors) {
                if (!errors.Errors.hasOwnProperty(key)) {
                    continue;
                }
                const value = errors.Errors[key];
                if (!value) {
                    continue;
                }
                for (const item of value) {
                    message = this.smartAppend(message, item.Message);
                }
            }
        }
        return message;
    }
    smartAppend(text1, text2) {
        if (!text1) {
            return text2;
        }
        if (!text2) {
            return text1;
        }
        return text1 + "\n " + text2;
    }
    cancel() {
        this.canceled.emit();
    }
    processFailure(error) {
        if (error.Errors) {
            for (let i = 0; i < this.structure.directProperties.length; i++) {
                const prop = this.structure.directProperties[i];
                if (prop.Name && error.Errors[prop.Name]) {
                    this.structure.directProperties[i].ValidationErrors = error.Errors[prop.Name];
                }
            }
        }
    }
    processSaveResponse(res, action) {
        for (const prop of this.structure.directProperties) {
            prop.ValidationErrors = [];
        }
        if (this.structure.children) {
            for (const detail of this.structure.children) {
                detail.masterReferences[0].master = res;
                if (detail.masterReferences[0].childList) {
                    detail.masterReferences[0].childList.onMasterChanged();
                }
            }
        }
        this.afterEntitySaved(action, res);
    }
    static { this.ɵfac = function AddNEditComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AddNEditComponent)(i0.ɵɵdirectiveInject(MetadataService), i0.ɵɵdirectiveInject(DataHandlerService), i0.ɵɵdirectiveInject(SnackBarService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AddNEditComponent, selectors: [["dscribe-add-n-edit"]], inputs: { entity: "entity", action: "action", entityTypeName: "entityTypeName", masters: "masters", parentStructure: "parentStructure" }, outputs: { entitySaved: "entitySaved", canceled: "canceled" }, standalone: false, decls: 8, vars: 1, consts: [[1, "form-horizontal"], [4, "ngIf"], ["mat-icon-button", "", "color", "primary", "type", "submit", 1, "save-btn", 3, "click"], ["mat-icon-button", "", "color", "warn", "type", "button", 3, "click"], [3, "property", "entity", 4, "ngFor", "ngForOf"], [3, "property", "entity"], [4, "ngFor", "ngForOf"], ["mat-tab-label", ""], [3, "hideFilter", "entityType", "masters", "addNEditStructure", 4, "ngIf"], [3, "hideFilter", "entityType", "masters", "addNEditStructure"]], template: function AddNEditComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "form", 0);
            i0.ɵɵtemplate(1, AddNEditComponent_div_1_Template, 3, 2, "div", 1);
            i0.ɵɵelementStart(2, "button", 2);
            i0.ɵɵlistener("click", function AddNEditComponent_Template_button_click_2_listener() { return ctx.saveEntity(); });
            i0.ɵɵelementStart(3, "mat-icon");
            i0.ɵɵtext(4, "save");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(5, "button", 3);
            i0.ɵɵlistener("click", function AddNEditComponent_Template_button_click_5_listener() { return ctx.cancel(); });
            i0.ɵɵelementStart(6, "mat-icon");
            i0.ɵɵtext(7, "cancel");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.entityTypeMetadata);
        } }, styles: [".save-btn[_ngcontent-%COMP%]{margin:16px 0}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddNEditComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-add-n-edit', template: "<form class=\"form-horizontal\">\r\n\t<div *ngIf=\"entityTypeMetadata\">\r\n\t\t<dscribe-property-editor *ngFor=\"let property of structure?.directProperties\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t [property]=\"property\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t [entity]=\"entity\">\r\n\t\t</dscribe-property-editor>\r\n\t\t<mat-card *ngIf=\"structure?.children\">\r\n\t\t\t<mat-tab-group>\r\n\t\t\t\t<mat-tab *ngFor=\"let related of structure.children\">\r\n\t\t\t\t\t<ng-template mat-tab-label>\r\n\t\t\t\t\t\t{{related.pathTitle}}\r\n\t\t\t\t\t</ng-template>\r\n\t\t\t\t\t<dscribe-property-editor *ngFor=\"let property of related.directProperties\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t [property]=\"property\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t [entity]=\"related.currentEntity\">\r\n\t\t\t\t\t</dscribe-property-editor>\r\n\t\t\t\t\t<dscribe-list *ngIf=\"related.componentType === componentTypes.List\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t[hideFilter]=\"true\" [entityType]=\"related.entityTypeMetadata\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t[masters]=\"related.masterReferences\" [addNEditStructure]=\"related\">\r\n\t\t\t\t\t</dscribe-list>\r\n\t\t\t\t</mat-tab>\r\n\t\t\t</mat-tab-group>\r\n\t\t</mat-card>\r\n\t</div>\r\n\r\n\t<button class=\"save-btn\" mat-icon-button color=\"primary\" type=\"submit\" (click)=\"saveEntity()\">\r\n\t\t<mat-icon>save</mat-icon>\r\n\t</button>\r\n\t<button mat-icon-button color=\"warn\" type=\"button\" (click)=\"cancel()\">\r\n\t\t<mat-icon>cancel</mat-icon>\r\n\t</button>\r\n</form>\r\n", styles: [".save-btn{margin:16px 0}\n"] }]
    }], () => [{ type: MetadataService }, { type: DataHandlerService }, { type: SnackBarService }], { entity: [{
            type: Input
        }], action: [{
            type: Input
        }], entityTypeName: [{
            type: Input
        }], masters: [{
            type: Input
        }], entitySaved: [{
            type: Output
        }], canceled: [{
            type: Output
        }], parentStructure: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AddNEditComponent, { className: "AddNEditComponent", filePath: "lib/add-n-edit/add-n-edit.component.ts", lineNumber: 20 }); })();

class ListAddNEditDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        console.log(data);
    }
    get actionName() {
        return AddNEditHelper.actionName(this.data.action);
    }
    afterEntitySaved(result) {
        this.dialogRef.close(result);
    }
    canceledByUser() {
        this.dialogRef.close(null);
    }
    static { this.ɵfac = function ListAddNEditDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListAddNEditDialogComponent)(i0.ɵɵdirectiveInject(i1$2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListAddNEditDialogComponent, selectors: [["dscribe-list-add-n-edit-dialog"]], standalone: false, decls: 9, vars: 7, consts: [["mat-dialog-title", ""], [1, "flex-spacer"], ["mat-dialog-close", "", "mat-icon-button", "", "tabindex", "-1"], [3, "entitySaved", "canceled", "entityTypeName", "action", "entity", "masters", "parentStructure"]], template: function ListAddNEditDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h1");
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(3, "div", 1);
            i0.ɵɵelementStart(4, "button", 2)(5, "mat-icon");
            i0.ɵɵtext(6, "close");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(7, "mat-dialog-content")(8, "dscribe-add-n-edit", 3);
            i0.ɵɵlistener("entitySaved", function ListAddNEditDialogComponent_Template_dscribe_add_n_edit_entitySaved_8_listener($event) { return ctx.afterEntitySaved($event); })("canceled", function ListAddNEditDialogComponent_Template_dscribe_add_n_edit_canceled_8_listener() { return ctx.canceledByUser(); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("", ctx.actionName, " ", ctx.data.title);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("entityTypeName", ctx.data == null ? null : ctx.data.entityTypeName)("action", ctx.data == null ? null : ctx.data.action)("entity", ctx.data == null ? null : ctx.data.entity)("masters", ctx.data == null ? null : ctx.data.masters)("parentStructure", ctx.data == null ? null : ctx.data.addNEditStructure);
        } }, dependencies: [i5.MatIconButton, i1$2.MatDialogClose, i1$2.MatDialogTitle, i1$2.MatDialogContent, i6.MatIcon, AddNEditComponent], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListAddNEditDialogComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-list-add-n-edit-dialog', template: "<div mat-dialog-title>\r\n\t<h1>{{actionName}} {{data.title}}</h1>\r\n\t<div class=\"flex-spacer\"></div>\r\n\t<button mat-dialog-close mat-icon-button tabindex=\"-1\">\r\n\t\t<mat-icon>close</mat-icon>\r\n\t</button>\r\n</div>\r\n\r\n<mat-dialog-content>\r\n\t<dscribe-add-n-edit\r\n\t\t[entityTypeName]=\"data?.entityTypeName\"\r\n\t\t[action]=\"data?.action\"\r\n\t\t[entity]=\"data?.entity\"\r\n\t\t[masters]=\"data?.masters\"\r\n\t\t[parentStructure]=\"data?.addNEditStructure\"\r\n\t\t(entitySaved)=\"afterEntitySaved($event)\"\r\n\t\t(canceled)=\"canceledByUser()\">\r\n\t</dscribe-add-n-edit>\r\n</mat-dialog-content>\r\n" }]
    }], () => [{ type: i1$2.MatDialogRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListAddNEditDialogComponent, { className: "ListAddNEditDialogComponent", filePath: "lib/list/list-add-n-edit-dialog/list-add-n-edit-dialog.component.ts", lineNumber: 12 }); })();

class ListDeleteDialogComponent {
    constructor(dialogRef, snackbarService, dataHandler) {
        this.dialogRef = dialogRef;
        this.snackbarService = snackbarService;
        this.dataHandler = dataHandler;
    }
    deleteEntity() {
        this.dataHandler.deleteEntity(this.inputs.entityTypeName, this.inputs.selectedRow).subscribe((res) => {
            this.afterDelete(res);
        }, (errors) => {
            this.snackbarService.open(errors);
        });
    }
    afterDelete(res) {
        this.dialogRef.close('deleted');
    }
    static { this.ɵfac = function ListDeleteDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListDeleteDialogComponent)(i0.ɵɵdirectiveInject(i1$2.MatDialogRef, 8), i0.ɵɵdirectiveInject(SnackBarService), i0.ɵɵdirectiveInject(DataHandlerService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListDeleteDialogComponent, selectors: [["dscribe-list-delete-dialog"]], standalone: false, decls: 12, vars: 2, consts: [["mat-dialog-title", "", "color", "warn"], [3, "click"], ["mat-raised-button", "", "color", "warn", 3, "click"], ["mat-raised-button", "", "color", "accent", 3, "click"]], template: function ListDeleteDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h1", 0);
            i0.ɵɵtext(1);
            i0.ɵɵelementStart(2, "mat-icon", 1);
            i0.ɵɵlistener("click", function ListDeleteDialogComponent_Template_mat_icon_click_2_listener() { return ctx.dialogRef.close(); });
            i0.ɵɵtext(3, "close");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "mat-dialog-content")(5, "h3");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "mat-dialog-actions")(8, "button", 2);
            i0.ɵɵlistener("click", function ListDeleteDialogComponent_Template_button_click_8_listener() { return ctx.deleteEntity(); });
            i0.ɵɵtext(9, "Delete");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "button", 3);
            i0.ɵɵlistener("click", function ListDeleteDialogComponent_Template_button_click_10_listener() { return ctx.dialogRef.close(); });
            i0.ɵɵtext(11, "Cancel");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" Delete ", ctx.inputs.title, " ");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("Are you sure you want to delete this ", ctx.inputs.title);
        } }, dependencies: [i5.MatButton, i1$2.MatDialogTitle, i1$2.MatDialogActions, i1$2.MatDialogContent, i6.MatIcon], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListDeleteDialogComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-list-delete-dialog', template: "<h1 mat-dialog-title color=\"warn\">\r\n\tDelete {{inputs.title}}\r\n\t<mat-icon (click)=\"dialogRef.close()\">close</mat-icon>\r\n</h1>\r\n\r\n<mat-dialog-content>\r\n\t<h3>Are you sure you want to delete this {{inputs.title}}</h3>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions>\r\n\t<button mat-raised-button color=\"warn\" (click)=\"deleteEntity()\">Delete</button>\r\n\t<button mat-raised-button color=\"accent\" (click)=\"dialogRef.close()\">Cancel</button>\r\n</mat-dialog-actions>\r\n" }]
    }], () => [{ type: i1$2.MatDialogRef, decorators: [{
                type: Optional
            }] }, { type: SnackBarService }, { type: DataHandlerService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListDeleteDialogComponent, { className: "ListDeleteDialogComponent", filePath: "lib/list/list-delete-dialog/list-delete-dialog.component.ts", lineNumber: 12 }); })();

class StorageFilterNode {
    constructor(nodeType, operator, dataType, values, children, propertyName, parameterName, subtreeName) {
        this.nodeType = nodeType;
        this.operator = operator;
        this.dataType = dataType;
        this.values = values;
        this.children = children;
        this.propertyName = propertyName;
        this.parameterName = parameterName;
        this.subtreeName = subtreeName;
    }
}

class FilterTreeVisitor {
    static visit(node, action) {
        this.visitInternal(node, action, []);
    }
    static map(node, mapper, setter) {
        const nodesArray = [];
        const resultsArray = [];
        return this.mapInternal(node, mapper, setter, nodesArray, resultsArray);
    }
    static mapInternal(node, mapper, setter, nodesArray, resultsArray) {
        if (!node || node.isEmpty()) {
            return null;
        }
        const index = nodesArray.indexOf(node);
        if (index > -1) {
            return resultsArray[index];
        }
        const result = mapper(node);
        nodesArray.push(node);
        resultsArray.push(result);
        const children = node.children;
        if (children) {
            for (const child of children) {
                const mappedChild = this.mapInternal(child, mapper, setter, nodesArray, resultsArray);
                setter(mappedChild, result);
            }
        }
        return result;
    }
    static getRoot(node) {
        if (node.parent) {
            return this.getRoot(node.parent);
        }
        return node;
    }
    static visitInternal(node, action, array) {
        if (!node || node.isEmpty()) {
            return;
        }
        if (array.indexOf(node) > -1) {
            return;
        }
        array.push(node);
        action(node);
        const children = node.children;
        if (children) {
            for (const child of children) {
                this.visitInternal(child, action, array);
            }
        }
    }
}

var FilterNodeType;
(function (FilterNodeType) {
    FilterNodeType[FilterNodeType["Logical"] = 1] = "Logical";
    FilterNodeType[FilterNodeType["Comparison"] = 2] = "Comparison";
    FilterNodeType[FilterNodeType["Arithmetic"] = 3] = "Arithmetic";
    FilterNodeType[FilterNodeType["Constant"] = 4] = "Constant";
    FilterNodeType[FilterNodeType["NavigationList"] = 5] = "NavigationList";
    FilterNodeType[FilterNodeType["Lambda"] = 6] = "Lambda";
    FilterNodeType[FilterNodeType["Property"] = 7] = "Property";
})(FilterNodeType || (FilterNodeType = {}));

// @dynamic
class FilterNode {
    constructor(parent) {
        this.parent = parent;
        if (parent != null) {
            this.inputType = parent.childInputType;
        }
    }
    getStorageNode() {
        return FilterTreeVisitor.map(this, node => {
            if (!node || node.isEmpty()) {
                return null;
            }
            const storageNode = new StorageFilterNode();
            node.setStorageNodeProperties(storageNode);
            storageNode.nodeType = node.nodeType;
            return storageNode;
        }, (child, parent) => {
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(child);
        });
    }
    setStorageNode(storage) {
        if (!storage) {
            return;
        }
        this.applyStorageNode(storage);
        const children = this.children;
        if (!children || !storage.children) {
            return;
        }
        if (storage.children.length > children.length) {
            for (let i = children.length; i < storage.children.length; i++) {
                this.addChild(false);
            }
        }
        for (let i = 0; i < children.length; i++) {
            if (i > storage.children.length) {
                break;
            }
            if (storage.children[i]) {
                if (children[i].nodeType !== storage.children[i].nodeType) {
                    const newChild = FilterNode.factory.create(storage.children[i].nodeType, this);
                    this.replaceChild(children[i], newChild);
                    children[i] = newChild;
                }
                children[i].setStorageNode(storage.children[i]);
            }
        }
    }
    getTreeParameters() {
        return FilterTreeVisitor.getRoot(this).getSubtreeParameters();
    }
    getSubtreeParameters() {
        const parameters = [];
        FilterTreeVisitor.visit(this, (node) => {
            if (node.nodeType === FilterNodeType.Lambda) {
                parameters.push(node.parameter);
            }
        });
        return parameters;
    }
    get inputType() {
        return this._inputType;
    }
    set inputType(value) {
        this._inputType = value;
    }
    get childInputType() {
        return this._inputType;
    }
    get outputType() {
        return this._outputType;
    }
    set outputType(value) {
        this._outputType = value;
    }
    childOutputTypeChanged(child) {
        if (this.parent) {
            this.parent.childOutputTypeChanged(this);
        }
    }
    canReplaceChild() {
        return false;
    }
    shouldBeInlined() {
        if (this.nodeType !== FilterNodeType.Logical) {
            return true;
        }
        return true;
    }
    addChild(constant) {
    }
    removeChild(child) {
    }
    replaceChild(oldChild, newChild) {
    }
}

class ParameterInfo {
    constructor(name, typeName) {
        this.name = name;
        this.typeName = typeName;
    }
}

class LambdaFilterNode extends FilterNode {
    constructor(parent, entityType, _isValueSelection) {
        super(parent);
        this.entityType = entityType;
        this._isValueSelection = _isValueSelection;
        this.inputType = new HasTypeInfo(true, DataTypes.NavigationList, entityType);
        this._body = FilterNode.factory.create(_isValueSelection ? FilterNodeType.Property : FilterNodeType.Comparison, this);
        this.parameter = new ParameterInfo(this.findParameterName(), entityType.Name);
    }
    findParameterName() {
        const existingParameters = this.getTreeParameters();
        const name = this.entityType.Name[0].toLowerCase();
        if (!existingParameters.find(x => x.name === name)) {
            return name;
        }
        for (let i = 2;; i++) {
            const n = name + i;
            if (!existingParameters.find(x => x.name === n)) {
                return n;
            }
        }
    }
    setStorageNodeProperties(storage) {
        storage.parameterName = this.parameter.name;
        storage.dataType = this.parameter.typeName;
    }
    applyStorageNode(storage) {
        this.parameter.name = storage.parameterName;
        this.parameter.typeName = storage.dataType;
    }
    get inputType() {
        return this._inputType;
    }
    set inputType(value) {
        this._inputType = value;
        if (this._body) {
            this._body.inputType = value;
        }
    }
    childOutputTypeChanged(child) {
        this.outputType = child.outputType;
        if (this.parent) {
            this.parent.childOutputTypeChanged(this);
        }
    }
    get nodeType() {
        return FilterNodeType.Lambda;
    }
    get children() {
        return [this._body];
    }
    isValueSelection() {
        return this._isValueSelection;
    }
    isEmpty() {
        return this._body.isEmpty();
    }
    isValid() {
        return this._body.isValid();
    }
    canReplaceChild() {
        return true;
    }
    replaceChild(oldChild, newChild) {
        this._body = newChild;
    }
}

class LambdaHelper {
    static getMasterDetailFilter(masters, entityType) {
        if (!masters || !masters.length) {
            return null;
        }
        const master = masters[0]; // TODO: ignoring other possible masters
        const lambda = new LambdaFilterNode(null, entityType, false);
        lambda.parameter = new ParameterInfo(entityType.Name[0].toLowerCase(), entityType.Name);
        const body = lambda.children[0];
        const left = body.children[0];
        const allProperties = entityType.getPropertiesForFilter();
        const inverseProp = allProperties.find(x => x.Name == master.masterProperty.InversePropertyName);
        left.property = entityType.getPropertiesForFilter()
            .find(x => x.ForeignKeyName === inverseProp.ForeignKeyName)
            .ForeignKeyProperty;
        body.operator = body.operators.find(x => x && x.name === 'Equal');
        const masterId = master.master ? master.master.Id : -1;
        const right = body.children[1];
        right.values = [{ value: masterId }];
        return lambda;
    }
}

class ConstantFilterNode extends FilterNode {
    constructor(parent) {
        super(parent);
        this.values = [{ value: null }];
        this._allowMultipleValues = false;
    }
    addValue() {
        this.values.push({ value: null });
    }
    removeValueAt(index) {
        this.values.splice(index, 1);
    }
    get allowMultipleValues() {
        return this._allowMultipleValues;
    }
    set allowMultipleValues(value) {
        this._allowMultipleValues = value;
        if (!value) {
            if (this.values.length > 1) {
                this.values.splice(1, this.values.length - 1);
            }
        }
    }
    setStorageNodeProperties(storage) {
        storage.values = this.values.map(x => x.value);
    }
    applyStorageNode(storage) {
        this.values = storage.values.map(x => {
            return {
                value: x
            };
        });
    }
    get dataType() {
        return this._dataType;
    }
    set dataType(value) {
        this._dataType = value;
        if (!value.IsNullable && value.DataType == DataTypes.bool && !this.values[0].value) {
            this.values[0].value = false;
        }
    }
    get nodeType() {
        return FilterNodeType.Constant;
    }
    get children() {
        return null;
    }
    isEmpty() {
        return false;
    }
    isValid() {
        return true;
    }
}

class AggregationOperator {
    constructor(name, title, hasFiltering, isBoolean, hasSelection, dataTypeMap = null) {
        this.name = name;
        this.title = title;
        this.hasFiltering = hasFiltering;
        this.isBoolean = isBoolean;
        this.hasSelection = hasSelection;
        this.dataTypeMap = dataTypeMap;
    }
    static { this.Operators = [
        new AggregationOperator('IsEmpty', 'Is Empty', false, true, false),
        new AggregationOperator('IsNotEmpty', 'Is Not Empty', false, true, false),
        new AggregationOperator('Any', 'Any', true, true, false),
        new AggregationOperator('All', 'All', true, true, false),
        new AggregationOperator('None', 'None', true, true, false),
        new AggregationOperator('Count', 'Count', true, false, false, { '_': 'int' }),
        new AggregationOperator('Sum', 'Sum', true, false, true, {
            'int': 'int',
            'long': 'long',
            'decimal': 'decimal'
        }),
        new AggregationOperator('Average', 'Average', true, false, true, {
            'decimal': 'decimal',
            'int': 'decimal',
            'long': 'decimal'
        })
    ]; }
}

class NavigationListFilterNode extends FilterNode {
    constructor(parent) {
        super(parent);
        this._outputType = this.getSelectionType();
    }
    get property() {
        return this._property;
    }
    set property(value) {
        this._property = value;
        this.operators = AggregationOperator.Operators;
        if (this.operator && this.operators.indexOf(this._operator) === -1) {
            this.operator = this.operators[0];
        }
    }
    get hasFiltering() {
        return this._operator && this._operator.hasFiltering;
    }
    get hasAggregationSelection() {
        return this._operator && this._operator.hasSelection;
    }
    getSelectionType() {
        if (!this.operator || this.operator.isBoolean) {
            return new HasTypeInfo(false, DataTypes.bool);
        }
        if (!this.operator.hasSelection) {
            return new HasTypeInfo(false, this.operator.dataTypeMap['_']);
        }
        const type = this.aggregationSelection && this.aggregationSelection.outputType;
        if (type) {
            return new HasTypeInfo(true, this.operator.dataTypeMap[type.DataType]);
        }
    }
    get operator() {
        return this._operator;
    }
    set operator(value) {
        this._operator = value;
        if (this.hasAggregationSelection) {
            if (!this.aggregationSelection) {
                this.aggregationSelection = new LambdaFilterNode(this, this.property.EntityType, true);
            }
        }
        else if (this.aggregationSelection) {
            this.aggregationSelection = null;
        }
        if (this.hasFiltering) {
            if (!this.filterSubNode) {
                this.filterSubNode = new LambdaFilterNode(this, this.property.EntityType, false);
                this.filterSubNode.title = 'Condition on members';
            }
        }
        else if (this.filterSubNode) {
            this.filterSubNode = null;
        }
        this.outputType = this.getSelectionType();
    }
    setStorageNodeProperties(storage) {
        storage.operator = this.operator.name;
    }
    applyStorageNode(storage) {
        this.operator = this.operators.find(x => x.name === storage.operator);
    }
    get inputType() {
        return this._inputType;
    }
    set inputType(value) {
        this._inputType = value;
        for (const child of this.children) {
            if (child) {
                child.inputType = value;
            }
        }
    }
    childOutputTypeChanged(child) {
        if (child === this.aggregationSelection) {
            this.outputType = child.outputType;
        }
        super.childOutputTypeChanged(child);
    }
    get children() {
        return [this.filterSubNode, this.aggregationSelection];
    }
    get nodeType() {
        return FilterNodeType.NavigationList;
    }
    isEmpty() {
        return !this.operator;
    }
    isValid() {
        return (!this.hasFiltering || this.filterSubNode.isValid())
            && (!this.hasAggregationSelection || this.aggregationSelection.isValid());
    }
}

class PropertyFilterNode extends FilterNode {
    constructor(parent) {
        super(parent);
        this.properties = this.parent.childInputType.EntityType.getPropertiesForFilter();
    }
    get property() {
        return this._property;
    }
    set property(value) {
        this._property = value;
        if (!value) {
            this.child = null;
            this.outputType = null;
            this.parent.childOutputTypeChanged(this);
            return;
        }
        this.outputType = value.DataType === DataTypes.NavigationList ?
            new HasTypeInfo(false, DataTypes.bool, null) :
            new HasTypeInfo(value.IsNullable, value.DataType, value.EntityType);
        if (value.DataType === DataTypes.NavigationList) {
            const child = new NavigationListFilterNode(this);
            child.property = value;
            this.child = child;
        }
        else if (value.DataType === DataTypes.NavigationEntity) {
            this.child = new PropertyFilterNode(this);
        }
        else {
            this.child = null;
        }
        this.parent.childOutputTypeChanged(this);
    }
    get outputType() {
        if (this.child && this.child.outputType) {
            return this.child.outputType;
        }
        if (!this._property) {
            return null;
        }
        if (this._property.DataType === DataTypes.NavigationEntity) {
            return this._property.ForeignKeyProperty;
        }
        return this._property;
    }
    set outputType(value) {
    }
    setStorageNodeProperties(storage) {
        if (this._property && this.property.DataType === DataTypes.NavigationEntity && !this.child._property) {
            storage.propertyName = this._property.ForeignKeyName;
        }
        else {
            storage.propertyName = this.property.Name;
        }
    }
    applyStorageNode(storage) {
        const property = this.properties.find(x => x.Name === storage.propertyName || x.ForeignKeyName === storage.propertyName);
        if (property.DataType === DataTypes.ForeignKey) {
            this.property = this.properties.find(x => x.ForeignKeyName === storage.propertyName);
        }
        else {
            this.property = property;
        }
    }
    get childInputType() {
        if (!this._property) {
            return null;
        }
        return this._property;
    }
    get nodeType() {
        return FilterNodeType.Property;
    }
    get children() {
        return [this.child];
    }
    isEmpty() {
        return !this.property;
    }
    isValid() {
        if (this.isEmpty()) {
            return true;
        }
        if (this.property.DataType === DataTypes.NavigationList) {
            return this.child.isValid();
        }
        return true;
    }
}

// @dynamic
class ArithmeticOperator {
    static { this.numbers = [DataTypes.decimal, DataTypes.int, DataTypes.long]; }
    static { this.toSame = (x) => x; }
    static { this.toInt = (x) => DataTypes.decimal; }
    static { this.toDecimal = (x) => DataTypes.int; }
    // noinspection TsLint
    static { this.Operators = [
        new ArithmeticOperator('Add', 'Plus', 2, null, false, ArithmeticOperator.toSame, null, ArithmeticOperator.numbers),
        new ArithmeticOperator('Subtract', 'Minus', 2, 2, false, ArithmeticOperator.toSame, null, ArithmeticOperator.numbers),
        new ArithmeticOperator('Multiply', 'Times', 2, null, false, ArithmeticOperator.toSame, null, ArithmeticOperator.numbers),
        new ArithmeticOperator('Divide', 'Over', 2, 2, false, ArithmeticOperator.toDecimal, null, ArithmeticOperator.numbers),
        new ArithmeticOperator('Log', 'Log', 1, 1, false, ArithmeticOperator.toDecimal, null, ArithmeticOperator.numbers),
        new ArithmeticOperator('Power', 'To Power', 2, 2, false, ArithmeticOperator.toDecimal, null, ArithmeticOperator.numbers),
        new ArithmeticOperator('Abs', 'Abs', 1, 1, false, ArithmeticOperator.toSame, null, ArithmeticOperator.numbers)
    ]; }
    constructor(name, title, minOperandCount, maxOperandCount, allowMultipleValues, dataTypeMap, condition, dataTypes) {
        this.name = name;
        this.title = title;
        this.minOperandCount = minOperandCount;
        this.maxOperandCount = maxOperandCount;
        this.allowMultipleValues = allowMultipleValues;
        this.dataTypeMap = dataTypeMap;
        this.condition = condition;
        this.dataTypes = dataTypes;
    }
}

class ArithmeticFilterNode extends FilterNode {
    constructor(parent) {
        super(parent);
        this._children = [];
        this.inputType = parent.childInputType;
        this._children[0] = new PropertyFilterNode(this);
        this.operator = null;
    }
    get inputType() {
        return this._inputType;
    }
    set inputType(value) {
        if (value === this._inputType) {
            return;
        }
        this._inputType = value;
        if (this._children) {
            for (const child of this._children) {
                child.inputType = value;
            }
        }
    }
    childOutputTypeChanged(child) {
        if (this._children.indexOf(child) !== 0) {
            return;
        }
        if (child.outputType === this._operandType) {
            return;
        }
        this._operandType = child.outputType;
        const type = child.outputType;
        if (!type || !type.DataType) {
            this.operators = ArithmeticOperator.Operators;
            if (!this.operator || this.operators.indexOf(this.operator) === -1) {
                this.operator = this.operators[0];
            }
            return;
        }
        this.operators = ArithmeticOperator.Operators
            .filter(x => !x || ((!x.condition || x.condition(type)) &&
            (!x.dataTypes || x.dataTypes.indexOf(type.DataType) !== -1)));
        if (!this.operator || this.operators.indexOf(this.operator) === -1) {
            this.operator = this.operators[0];
        }
        for (child of this.children) {
            if (child.nodeType === FilterNodeType.Constant) {
                child.dataType = type;
            }
        }
        this.calculateOutputType();
        super.childOutputTypeChanged(child);
    }
    get operator() {
        return this._operator;
    }
    set operator(value) {
        this._operator = value;
        if (!this.operator) {
            return;
        }
        while (this.operator.minOperandCount > this._children.length) {
            const child = new ConstantFilterNode(this);
            child.dataType = this._children[0].outputType;
            child.allowMultipleValues = this.operator.allowMultipleValues;
            this._children.push(child);
        }
        if (this.operator.maxOperandCount !== null && this.operator.maxOperandCount !== undefined &&
            this.operator.maxOperandCount < this._children.length) {
            this._children.splice(this.operator.maxOperandCount, this._children.length - this.operator.maxOperandCount);
        }
        this.calculateOutputType();
        this.parent.childOutputTypeChanged(this);
    }
    calculateOutputType() {
        if (!this._operator) {
            return;
        }
        const outputType = this._operandType && this.operator.dataTypeMap(this._operandType.DataType);
        if (!this._outputType || this.outputType.DataType !== outputType) {
            this.outputType = new HasTypeInfo(this._operandType && this._operandType.IsNullable, outputType, null);
        }
    }
    setStorageNodeProperties(storage) {
        storage.operator = this.operator.name;
    }
    applyStorageNode(storage) {
        this.operators = ArithmeticOperator.Operators;
        this.operator = this.operators.find(x => x.name === storage.operator);
    }
    get nodeType() {
        return FilterNodeType.Arithmetic;
    }
    get children() {
        return this._children;
    }
    isEmpty() {
        return !this.operator && !this._children.find(x => !x.isEmpty());
    }
    isValid() {
        if (this.isEmpty()) {
            return true;
        }
        if (!this._operator) {
            return false;
        }
        return !this._children.find(x => !x.isValid());
    }
    canReplaceChild() {
        return true;
    }
    replaceChild(oldChild, newChild) {
        const index = this._children.indexOf(oldChild);
        if (index === -1) {
            return;
        }
        this._children[index] = newChild;
        if (index === 0) {
            this.childOutputTypeChanged(newChild);
        }
    }
    addChild(constant) {
        if (this._operator &&
            (!this.operator.maxOperandCount || this._children.length < this._operator.maxOperandCount)) {
            if (constant) {
                const child = new ConstantFilterNode(this);
                child.dataType = this._operandType;
                this._children.push(child);
            }
            else {
                const child = new PropertyFilterNode(this);
                child.inputType = this.inputType;
                this._children.push(child);
            }
        }
    }
    removeChild(child) {
        if (!this._operator || this._children.length <= this._operator.minOperandCount) {
            return;
        }
        const index = this.children.indexOf(child);
        if (index === -1) {
            return;
        }
        this.children.splice(index, 1);
        if (index === 0 && this.children.length > 0) {
            this.childOutputTypeChanged(this.children[0]);
        }
    }
    toggleChildType(child) {
        const index = this._children.indexOf(child);
        if (index === -1) {
            return;
        }
        if (child.nodeType === FilterNodeType.Constant) {
            const newChild = new PropertyFilterNode(this);
            newChild.inputType = this.inputType;
            this._children[index] = newChild;
        }
        else {
            const newChild = new ConstantFilterNode(this);
            newChild.dataType = this.inputType;
            this._children[index] = newChild;
        }
    }
}

// @dynamic
class ComparisonOperator {
    constructor(name, title, minOperandCount, maxOperandCount, allowMultipleValues, condition, dataTypes) {
        this.name = name;
        this.title = title;
        this.minOperandCount = minOperandCount;
        this.maxOperandCount = maxOperandCount;
        this.allowMultipleValues = allowMultipleValues;
        this.condition = condition;
        this.dataTypes = dataTypes;
    }
    static { this.Operators = [
        new ComparisonOperator('Equal', 'Equals', 2, 2, true),
        new ComparisonOperator('NotEqual', 'Not Equals', 2, 2, true),
        new ComparisonOperator('IsNull', 'Is Null', 1, 1, false, p => p.IsNullable),
        new ComparisonOperator('IsNotNull', 'Is Not Null', 1, 1, false, p => p.IsNullable),
        new ComparisonOperator('LessThan', 'Less than', 2, 2, false),
        new ComparisonOperator('GreaterThan', 'Greater than', 2, 2, false),
        new ComparisonOperator('LessThanOrEqual', 'Less than or equal', 2, 2, false),
        new ComparisonOperator('GreaterThanOrEqual', 'Greater than or equal', 2, 2, false),
        new ComparisonOperator('Between', 'Between', 3, 3, false),
        new ComparisonOperator('Contains', 'Contains', 2, 2, true, null, [DataTypes.string]),
        new ComparisonOperator('StartsWith', 'Starts with', 2, 2, true, null, [DataTypes.string]),
        new ComparisonOperator('EndsWith', 'Ends with', 2, 2, true, null, [DataTypes.string])
    ]; }
}

class ComparisonFilterNode extends FilterNode {
    constructor(parent) {
        super(parent);
        this._children = [];
        this.inputType = parent.childInputType;
        this._children[0] = new PropertyFilterNode(this);
    }
    get inputType() {
        return this._inputType;
    }
    set inputType(value) {
        if (value === this._inputType) {
            return;
        }
        this._inputType = value;
        if (this._children) {
            for (const child of this._children) {
                child.inputType = value;
            }
        }
    }
    childOutputTypeChanged(child) {
        if (this._children.indexOf(child) !== 0) {
            return;
        }
        if (child.outputType === this._operandType) {
            return;
        }
        this._operandType = child.outputType;
        const type = child.outputType;
        if (!type) {
            this.operators = ComparisonOperator.Operators;
            return;
        }
        this.operators = ComparisonOperator.Operators
            .filter(x => !x || ((!x.condition || x.condition(type)) &&
            (!x.dataTypes || x.dataTypes.indexOf(type.DataType) !== -1)));
        if (this.operator && this.operators.indexOf(this.operator) === -1) {
            this.operator = this.operators[0];
        }
        for (child of this.children) {
            if (child.nodeType === FilterNodeType.Constant) {
                child.dataType = type;
            }
        }
        this.calculateOutputType();
        super.childOutputTypeChanged(child);
    }
    get operator() {
        return this._operator;
    }
    set operator(value) {
        this._operator = value;
        if (!this.operator) {
            return;
        }
        while (this.operator.minOperandCount > this._children.length) {
            const child = new ConstantFilterNode(this);
            child.dataType = this._children[0].outputType;
            child.allowMultipleValues = this.operator.allowMultipleValues;
            this._children.push(child);
        }
        if (this.operator.maxOperandCount !== null && this.operator.maxOperandCount !== undefined &&
            this.operator.maxOperandCount < this._children.length) {
            this._children.splice(this.operator.maxOperandCount, this._children.length - this.operator.maxOperandCount);
        }
        this.calculateOutputType();
        this.parent.childOutputTypeChanged(this);
    }
    calculateOutputType() {
        if (!this._operator) {
            return;
        }
        const outputType = DataTypes.bool;
        if (!this._outputType || this.outputType.DataType !== outputType) {
            this.outputType = new HasTypeInfo(this._operandType && this._operandType.IsNullable, outputType, null);
        }
    }
    setStorageNodeProperties(storage) {
        storage.operator = this.operator && this.operator.name;
    }
    applyStorageNode(storage) {
        this.operators = ComparisonOperator.Operators;
        this.operator = this.operators.find(x => x.name === storage.operator);
    }
    get nodeType() {
        return FilterNodeType.Comparison;
    }
    get children() {
        return this._children;
    }
    isEmpty() {
        return !this.operator && !this._children.find(x => !x.isEmpty());
    }
    isValid() {
        if (this.isEmpty()) {
            return true;
        }
        if (!this._operator) {
            return this.children.length === 1 && this.children[0].isValid() && this.children[0].outputType.DataType === DataTypes.bool;
        }
        return !(this._children.find(x => !x.isValid()));
    }
    canReplaceChild() {
        return true;
    }
    replaceChild(oldChild, newChild) {
        const index = this._children.indexOf(oldChild);
        if (index === -1) {
            return;
        }
        this._children[index] = newChild;
    }
    addChild(constant) {
        if (this._operator &&
            (!this.operator.maxOperandCount || this._children.length < this._operator.maxOperandCount)) {
            if (constant) {
                const child = new ConstantFilterNode(this);
                child.dataType = this.inputType;
                this._children.push(child);
            }
            else {
                const child = new PropertyFilterNode(this);
                child.inputType = this.inputType;
                this._children.push(child);
            }
        }
    }
    toggleChildType(child) {
        const index = this._children.indexOf(child);
        if (index === -1) {
            return;
        }
        if (child.nodeType === FilterNodeType.Constant) {
            const newChild = new PropertyFilterNode(this);
            newChild.inputType = this.inputType;
            this._children[index] = newChild;
        }
        else {
            const newChild = new ConstantFilterNode(this);
            newChild.dataType = this.inputType;
            this._children[index] = newChild;
        }
    }
    removeChild(child) {
        if (!this._operator || this._children.length <= this._operator.minOperandCount) {
            return;
        }
        const index = this._children.indexOf(child);
        if (index === -1) {
            return;
        }
        this._children.splice(index, 1);
    }
}

class LogicalOperator {
    constructor(name, title, minNumberOfOperands, maxNumberOfOperands) {
        this.name = name;
        this.title = title;
        this.minNumberOfOperands = minNumberOfOperands;
        this.maxNumberOfOperands = maxNumberOfOperands;
    }
    static { this.logicalOperators = [
        new LogicalOperator('And', 'And', 2, null),
        new LogicalOperator('Or', 'Or', 2, null),
        new LogicalOperator('Not', 'Not', 1, 1)
    ]; }
}

class LogicalFilterNode extends FilterNode {
    constructor(parent) {
        super(parent);
        this.operators = LogicalOperator.logicalOperators;
        this._children = [];
    }
    setStorageNodeProperties(storage) {
        storage.operator = this.operator.name;
    }
    applyStorageNode(storage) {
        this.operator = this.operators.find(x => x.name === storage.operator);
    }
    childOutputTypeChanged(child) {
        const index = this._children.indexOf(child);
        if (index !== 0) {
            return;
        }
        this.outputType = child.outputType;
        super.childOutputTypeChanged(child);
    }
    get nodeType() {
        return FilterNodeType.Logical;
    }
    get children() {
        return this._children;
    }
    addChild() {
        this.children.push(new ComparisonFilterNode(this));
    }
    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index === -1) {
            return;
        }
        this.children.splice(index, 1);
    }
    isEmpty() {
        return !this.operator || this.children.filter(x => !x.isEmpty()).length === 0;
    }
    isValid() {
        return this.isEmpty() || this.children.filter(x => !x.isValid()).length === 0;
    }
    canReplaceChild() {
        return true;
    }
    replaceChild(oldChild, newChild) {
        const index = this._children.indexOf(oldChild);
        if (index === -1) {
            return;
        }
        this._children[index] = newChild;
    }
    get operator() {
        return this._operator;
    }
    set operator(value) {
        this._operator = value;
        if (!this.operator) {
            return;
        }
        while (this.operator.minNumberOfOperands > this._children.length) {
            const child = new ComparisonFilterNode(this);
            this._children.push(child);
        }
        if (this.operator.maxNumberOfOperands !== null && this.operator.maxNumberOfOperands !== undefined &&
            this.operator.maxNumberOfOperands < this._children.length) {
            this._children.splice(this.operator.maxNumberOfOperands, this._children.length - this.operator.maxNumberOfOperands);
        }
    }
}

class FilterNodeFactory {
    create(type, parent, entityType, isValueSelection) {
        switch (type) {
            case FilterNodeType.Lambda:
                return new LambdaFilterNode(parent, entityType, isValueSelection);
            case FilterNodeType.Constant:
                return new ConstantFilterNode(parent);
            case FilterNodeType.Arithmetic:
                return new ArithmeticFilterNode(parent);
            case FilterNodeType.Comparison:
                return new ComparisonFilterNode(parent);
            case FilterNodeType.Logical:
                return new LogicalFilterNode(parent);
            case FilterNodeType.NavigationList:
                return new NavigationListFilterNode(parent);
            case FilterNodeType.Property:
                return new PropertyFilterNode(parent);
        }
    }
}

class DisplayValuePipe {
    constructor(dataHandlerService) {
        this.dataHandlerService = dataHandlerService;
    }
    transform(value, property) {
        if (property.dataType === DataTypes.ForeignKey) {
            if (value + '' === 'Loading...') {
                return of('Loading...');
            }
            if (!value) {
                return of(value);
            }
            return this.dataHandlerService.getName(property.dataEntityTypeName, value);
        }
        if (property.dataType === DataTypes.Date) {
            if (!value) {
                return of(value);
            }
            return of(value.toString().substr(0, 10));
        }
        if (property.behaviors && property.behaviors.find(x => x.BehaviorName == 'DisplayAsDate' || x.BehaviorName == 'ShowDatePicker')) {
            if (!value) {
                return of(null);
            }
            const date = new Date(value);
            return of(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
        }
        if (property.behaviors && property.behaviors.find(x => x.BehaviorName == 'DisplayAsDateTime' || x.BehaviorName == 'ShowDateTimePicker')) {
            if (!value) {
                return of(null);
            }
            const date = new Date(value);
            return of(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
        }
        return of(value);
    }
    static { this.ɵfac = function DisplayValuePipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DisplayValuePipe)(i0.ɵɵdirectiveInject(DataHandlerService, 16)); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "displayValue", type: DisplayValuePipe, pure: true, standalone: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DisplayValuePipe, [{
        type: Pipe,
        args: [{
                standalone: false,
                name: 'displayValue'
            }]
    }], () => [{ type: DataHandlerService }], null); })();

const _c0$c = a0 => ({ hidden: a0 });
const _c1$5 = a0 => ({ "selected": a0 });
function TableTemplateComponent_th_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 8)(1, "mat-icon");
    i0.ɵɵtext(2, "attach_file");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-icon");
    i0.ɵɵtext(4, "insert_comment");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("hidden", ctx_r0.hideAdditionFeature);
} }
function TableTemplateComponent_td_4_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 9)(1, "mat-icon", 10);
    i0.ɵɵlistener("click", function TableTemplateComponent_td_4_Template_mat_icon_click_1_listener($event) { const row_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); ctx_r0.attachmentsClick.emit(row_r3); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(2, " attach_file ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-icon", 10);
    i0.ɵɵlistener("click", function TableTemplateComponent_td_4_Template_mat_icon_click_3_listener($event) { const row_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); ctx_r0.commentsClick.emit(row_r3); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(4, " insert_comment ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("matTooltip", i0.ɵɵinterpolate1("", row_r3 == null ? null : row_r3._lobInfo == null ? null : row_r3._lobInfo.AttachmentsCount, " attachments"))("ngClass", i0.ɵɵpureFunction1(8, _c0$c, !(row_r3 == null ? null : row_r3._lobInfo == null ? null : row_r3._lobInfo.AttachmentsCount)))("matBadge", row_r3 == null ? null : row_r3._lobInfo == null ? null : row_r3._lobInfo.AttachmentsCount);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("matTooltip", i0.ɵɵinterpolate1("", row_r3 == null ? null : row_r3._lobInfo == null ? null : row_r3._lobInfo.CommentsCount, " comments"))("ngClass", i0.ɵɵpureFunction1(10, _c0$c, !(row_r3 == null ? null : row_r3._lobInfo == null ? null : row_r3._lobInfo.CommentsCount)))("matBadge", row_r3 == null ? null : row_r3._lobInfo == null ? null : row_r3._lobInfo.CommentsCount);
} }
function TableTemplateComponent_ng_container_5_th_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const col_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(col_r4.title || col_r4.name);
} }
function TableTemplateComponent_ng_container_5_td_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 15);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "displayValue");
    i0.ɵɵpipe(3, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r5 = ctx.$implicit;
    const col_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 4, i0.ɵɵpipeBind2(2, 1, row_r5[col_r4.name], col_r4)));
} }
function TableTemplateComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 11);
    i0.ɵɵtemplate(1, TableTemplateComponent_ng_container_5_th_1_Template, 2, 1, "th", 12)(2, TableTemplateComponent_ng_container_5_td_2_Template, 4, 6, "td", 13);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const col_r4 = ctx.$implicit;
    i0.ɵɵproperty("matColumnDef", col_r4.name);
} }
function TableTemplateComponent_tr_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 16);
} }
function TableTemplateComponent_tr_7_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 17);
    i0.ɵɵlistener("click", function TableTemplateComponent_tr_7_Template_tr_click_0_listener() { const row_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.rowClick.emit(row_r7)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r7 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c1$5, ctx_r0.selection.isSelected(row_r7)));
} }
class TableTemplateComponent {
    constructor() {
        this.rowClick = new EventEmitter();
        this.commentsClick = new EventEmitter();
        this.attachmentsClick = new EventEmitter();
    }
    static { this.ɵfac = function TableTemplateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TableTemplateComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TableTemplateComponent, selectors: [["dscribe-table-template"]], viewQuery: function TableTemplateComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(MatSort, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.sort = _t.first);
        } }, inputs: { data: "data", selection: "selection", columns: "columns", displayedColumns: "displayedColumns", hideAdditionFeature: "hideAdditionFeature" }, outputs: { rowClick: "rowClick", commentsClick: "commentsClick", attachmentsClick: "attachmentsClick" }, standalone: false, decls: 8, vars: 5, consts: [[1, "list-table-container"], ["mat-table", "", "matSort", "", 3, "dataSource"], ["matColumnDef", "lobInfo"], ["mat-header-cell", "", "mat-sort-header", "", "class", "lob-cell", 3, "hidden", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "lob-cell", 4, "matCellDef"], [3, "matColumnDef", 4, "ngFor", "ngForOf"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "ngClass", "click", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", "mat-sort-header", "", 1, "lob-cell", 3, "hidden"], ["mat-cell", "", 1, "lob-cell"], ["matBadgeSize", "small", "matBadgeColor", "accent", "matBadgeOverlap", "true", "matBadgePosition", "below before", 3, "click", "ngClass", "matBadge", "matTooltip"], [3, "matColumnDef"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", "", 3, "click", "ngClass"]], template: function TableTemplateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "table", 1);
            i0.ɵɵelementContainerStart(2, 2);
            i0.ɵɵtemplate(3, TableTemplateComponent_th_3_Template, 5, 1, "th", 3)(4, TableTemplateComponent_td_4_Template, 5, 12, "td", 4);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵtemplate(5, TableTemplateComponent_ng_container_5_Template, 3, 1, "ng-container", 5)(6, TableTemplateComponent_tr_6_Template, 1, 0, "tr", 6)(7, TableTemplateComponent_tr_7_Template, 1, 3, "tr", 7);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("dataSource", ctx.data);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.columns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("matRowDefColumns", ctx.displayedColumns);
        } }, dependencies: [i1$3.NgClass, i1$3.NgForOf, i2.MatBadge, i6.MatIcon, i9.MatSort, i9.MatSortHeader, i10.MatTable, i10.MatHeaderCellDef, i10.MatHeaderRowDef, i10.MatColumnDef, i10.MatCellDef, i10.MatRowDef, i10.MatHeaderCell, i10.MatCell, i10.MatHeaderRow, i10.MatRow, i11.MatTooltip, i1$3.AsyncPipe, DisplayValuePipe], styles: ["table[_ngcontent-%COMP%]{max-width:1000px}.mat-cell[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;padding-left:2px;padding-right:2px}.hidden[_ngcontent-%COMP%]{display:none}.mat-cell[_ngcontent-%COMP%]:nth-child(2n){background-color:#0000320d}.mat-row[_ngcontent-%COMP%]:nth-child(2n){background-color:#0000320d}.selected[_ngcontent-%COMP%]{background:#87cefa!important}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TableTemplateComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-table-template', template: "<div class=\"list-table-container\">\r\n\t<table mat-table [dataSource]=\"data\" matSort>\r\n\t\t<ng-container matColumnDef=\"lobInfo\">\r\n\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header class=\"lob-cell\" [hidden]=\"hideAdditionFeature\">\r\n\t\t\t\t<mat-icon>attach_file</mat-icon>\r\n\t\t\t\t<mat-icon>insert_comment</mat-icon>\r\n\t\t\t</th>\r\n\t\t\t<td mat-cell *matCellDef=\"let row\" class=\"lob-cell\">\r\n\t\t\t\t<mat-icon [ngClass]=\"{hidden:!row?._lobInfo?.AttachmentsCount}\" (click)=\"attachmentsClick.emit(row);$event.stopPropagation();\"\r\n\t\t\t\t [matBadge]=\"row?._lobInfo?.AttachmentsCount\" matBadgeSize=\"small\" matBadgeColor=\"accent\" matBadgeOverlap=\"true\"\r\n\t\t\t\t matBadgePosition=\"below before\" matTooltip=\"{{row?._lobInfo?.AttachmentsCount}} attachments\">\r\n\t\t\t\t\tattach_file\r\n\t\t\t\t</mat-icon>\r\n\t\t\t\t<mat-icon [ngClass]=\"{hidden:!row?._lobInfo?.CommentsCount}\" (click)=\"commentsClick.emit(row);$event.stopPropagation();\"\r\n\t\t\t\t [matBadge]=\"row?._lobInfo?.CommentsCount\" matBadgeSize=\"small\" matBadgeColor=\"accent\" matBadgeOverlap=\"true\"\r\n\t\t\t\t matBadgePosition=\"below before\" matTooltip=\"{{row?._lobInfo?.CommentsCount}} comments\">\r\n\t\t\t\t\tinsert_comment\r\n\t\t\t\t</mat-icon>\r\n\t\t\t</td>\r\n\t\t</ng-container>\r\n\t\t<ng-container *ngFor=\"let col of columns\" [matColumnDef]=\"col.name\">\r\n\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>{{col.title || col.name}}</th>\r\n\t\t\t<td mat-cell *matCellDef=\"let row\">{{row[col.name] | displayValue:col | async}}</td>\r\n\t\t</ng-container>\r\n\t\t<tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: true\"></tr>\r\n\t\t<tr mat-row *matRowDef=\"let row; columns: displayedColumns;\" [ngClass]=\"{'selected': selection.isSelected(row)}\"\r\n\t\t (click)=\"rowClick.emit(row)\"></tr>\r\n\t</table>\r\n</div>\r\n", styles: ["table{max-width:1000px}.mat-cell{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;padding-left:2px;padding-right:2px}.hidden{display:none}.mat-cell:nth-child(2n){background-color:#0000320d}.mat-row:nth-child(2n){background-color:#0000320d}.selected{background:#87cefa!important}\n"] }]
    }], null, { data: [{
            type: Input
        }], selection: [{
            type: Input
        }], columns: [{
            type: Input
        }], displayedColumns: [{
            type: Input
        }], hideAdditionFeature: [{
            type: Input
        }], rowClick: [{
            type: Output
        }], commentsClick: [{
            type: Output
        }], attachmentsClick: [{
            type: Output
        }], sort: [{
            type: ViewChild,
            args: [MatSort, { static: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TableTemplateComponent, { className: "TableTemplateComponent", filePath: "lib/list/list-templating/table-template/table-template.component.ts", lineNumber: 12 }); })();

// Workaround for not being able to inject services inside a decorator
class EntityTypeTemplateMapper {
    static { this.map = new Map(); }
    static register(entityTypeName, data) {
        EntityTypeTemplateMapper.map = EntityTypeTemplateMapper.map.set(entityTypeName, data);
    }
    static get(entityTypeName) {
        return EntityTypeTemplateMapper.map.get(entityTypeName);
    }
}

class LobInfoService {
    constructor(http, dscribeService, metadata) {
        this.http = http;
        this.dscribeService = dscribeService;
        this.metadata = metadata;
        this.getSummaryAPI = this.dscribeService.url('api/lobTools/getSummary');
        this.getReportsAPI = this.dscribeService.url('api/report/getReports');
        this.downloadReportAPI = this.dscribeService.url('api/report/processForDownload');
        this.saveAsAttachmentApi = this.dscribeService.url('api/report/saveAsAttachment');
        this.attachmentsListApi = this.dscribeService.url('api/attachment/getAttachmentsList');
        this.downloadAttachmentApi = this.dscribeService.url('api/attachment/download');
        this.getCommentsApi = this.dscribeService.url('api/Comment/GetCommentsList');
        this.addCommentApi = this.dscribeService.url('api/Comment/AddComment');
        this.editCommentApi = this.dscribeService.url('api/Comment/EditComment');
        this.deleteCommentApi = this.dscribeService.url('api/Comment/DeleteComment');
    }
    setLobInfo(entityType, data) {
        if (!data || !data.length) {
            return;
        }
        const ids = [];
        const primaryKey = entityType.getPrimaryKey();
        if (!primaryKey) {
            return;
        }
        const pkName = primaryKey.Name;
        for (const item of data) {
            ids.push(item[pkName]);
        }
        this.http.post(this.getSummaryAPI, {
            EntityTypeName: entityType.Name,
            Identifiers: ids
        }).subscribe(res => this.setSummaries(pkName, data, res.Summaries));
    }
    setSummaries(pkName, data, summaries) {
        for (const item of data) {
            item._lobInfo = summaries[item[pkName]];
        }
    }
    getReports(entityTypeName) {
        if (!this.reports) {
            this.reports = new ReplaySubject(1);
            this.http.post(this.getReportsAPI, {})
                .subscribe(x => this.reports.next(x));
        }
        return this.reports
            .pipe(map(x => x.filter(r => r.EntityTypeName === entityTypeName)));
    }
    processReportForDownload(request) {
        return this.http.postForBlob(this.downloadReportAPI, request, {
            observe: 'response',
            responseType: 'blob'
        });
    }
    saveReportAsAttachment(request) {
        return this.http.postForBlob(this.saveAsAttachmentApi, request, {
            observe: 'response',
            responseType: 'blob'
        });
    }
    getAttachmentsList(request) {
        return this.http.post(this.attachmentsListApi, request);
    }
    downloadAttachment(attachment) {
        return this.http.postForBlob(this.downloadAttachmentApi, {
            Id: attachment.Id
        }, {
            observe: 'response',
            responseType: 'blob'
        });
    }
    getCommentList(model) {
        return this.http.post(this.getCommentsApi, model);
    }
    addComment(model) {
        return this.http.post(this.addCommentApi, model);
    }
    editComment(model) {
        return this.http.post(this.editCommentApi, model);
    }
    deleteComment(model) {
        return this.http.post(this.deleteCommentApi, model);
    }
    static { this.ɵfac = function LobInfoService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LobInfoService)(i0.ɵɵinject(DscribeHttpClient), i0.ɵɵinject(DscribeService), i0.ɵɵinject(MetadataService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LobInfoService, factory: LobInfoService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LobInfoService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: DscribeHttpClient }, { type: DscribeService }, { type: MetadataService }], null); })();

class CommentModel {
}
class GetCommentRequestModel {
}

class LobListDialogData {
}

function CommentsListComponent_mat_progress_bar_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-progress-bar", 6);
} }
function CommentsListComponent_mat_card_4_h4_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h4", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(comment_r1.Title);
} }
function CommentsListComponent_mat_card_4_h5_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h5", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(comment_r1.Description);
} }
function CommentsListComponent_mat_card_4_mat_form_field_5_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r4, " ");
} }
function CommentsListComponent_mat_card_4_mat_form_field_5_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field", 12)(1, "mat-label");
    i0.ɵɵtext(2, "Title");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 13);
    i0.ɵɵtwoWayListener("ngModelChange", function CommentsListComponent_mat_card_4_mat_form_field_5_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r2.commentToSave.Title, $event) || (ctx_r2.commentToSave.Title = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, CommentsListComponent_mat_card_4_mat_form_field_5_p_4_Template, 2, 1, "p", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.commentToSave.Title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.commentToSaveError == null ? null : ctx_r2.commentToSaveError.Title);
} }
function CommentsListComponent_mat_card_4_mat_form_field_6_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r6, " ");
} }
function CommentsListComponent_mat_card_4_mat_form_field_6_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field", 12)(1, "mat-label");
    i0.ɵɵtext(2, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "textarea", 16);
    i0.ɵɵtwoWayListener("ngModelChange", function CommentsListComponent_mat_card_4_mat_form_field_6_Template_textarea_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r2.commentToSave.Description, $event) || (ctx_r2.commentToSave.Description = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, CommentsListComponent_mat_card_4_mat_form_field_6_p_4_Template, 2, 1, "p", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.commentToSave.Description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.commentToSaveError == null ? null : ctx_r2.commentToSaveError.Title);
} }
function CommentsListComponent_mat_card_4_mat_card_actions_7_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function CommentsListComponent_mat_card_4_mat_card_actions_7_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const comment_r1 = i0.ɵɵnextContext(2).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.deleteComment(comment_r1)); });
    i0.ɵɵelementStart(1, "mat-icon", 4);
    i0.ɵɵtext(2, "delete");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r2.isAdding);
} }
function CommentsListComponent_mat_card_4_mat_card_actions_7_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function CommentsListComponent_mat_card_4_mat_card_actions_7_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const comment_r1 = i0.ɵɵnextContext(2).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.switchToEditMode(comment_r1)); });
    i0.ɵɵelementStart(1, "mat-icon", 19);
    i0.ɵɵtext(2, "edit");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r2.isAdding);
} }
function CommentsListComponent_mat_card_4_mat_card_actions_7_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function CommentsListComponent_mat_card_4_mat_card_actions_7_button_3_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const comment_r1 = i0.ɵɵnextContext(2).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.cancelEditMode(comment_r1)); });
    i0.ɵɵelementStart(1, "mat-icon", 4);
    i0.ɵɵtext(2, "cancel");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r2.submitLoading);
} }
function CommentsListComponent_mat_card_4_mat_card_actions_7_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 3);
    i0.ɵɵlistener("click", function CommentsListComponent_mat_card_4_mat_card_actions_7_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.saveComment()); });
    i0.ɵɵelementStart(1, "mat-icon", 20);
    i0.ɵɵtext(2, "save");
    i0.ɵɵelementEnd()();
} }
function CommentsListComponent_mat_card_4_mat_card_actions_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card-actions");
    i0.ɵɵtemplate(1, CommentsListComponent_mat_card_4_mat_card_actions_7_button_1_Template, 3, 1, "button", 5)(2, CommentsListComponent_mat_card_4_mat_card_actions_7_button_2_Template, 3, 1, "button", 5)(3, CommentsListComponent_mat_card_4_mat_card_actions_7_button_3_Template, 3, 1, "button", 5)(4, CommentsListComponent_mat_card_4_mat_card_actions_7_button_4_Template, 3, 0, "button", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !comment_r1.IsEditing);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !comment_r1.IsEditing);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", comment_r1.IsEditing);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", comment_r1.IsEditing);
} }
function CommentsListComponent_mat_card_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card", 7)(1, "mat-card-header");
    i0.ɵɵtemplate(2, CommentsListComponent_mat_card_4_h4_2_Template, 2, 1, "h4", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-card-content");
    i0.ɵɵtemplate(4, CommentsListComponent_mat_card_4_h5_4_Template, 2, 1, "h5", 8)(5, CommentsListComponent_mat_card_4_mat_form_field_5_Template, 5, 2, "mat-form-field", 9)(6, CommentsListComponent_mat_card_4_mat_form_field_6_Template, 5, 2, "mat-form-field", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, CommentsListComponent_mat_card_4_mat_card_actions_7_Template, 5, 4, "mat-card-actions", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comment_r1 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !comment_r1.IsEditing);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !comment_r1.IsEditing);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", comment_r1.IsEditing);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", comment_r1.IsEditing);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.data.mode === 2);
} }
function CommentsListComponent_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function CommentsListComponent_button_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.switchToAddMode()); });
    i0.ɵɵelementStart(1, "mat-icon", 4);
    i0.ɵɵtext(2, "add");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r2.isAdding);
} }
class CommentsListComponent {
    constructor(dialogRef, data, lobService, snackbarService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.lobService = lobService;
        this.snackbarService = snackbarService;
        this.comments = [];
        this.commentToSave = new CommentModel();
        this.isAdding = false;
        console.log(this.data);
    }
    ngOnInit() {
        this.getCommentList();
    }
    cancel() {
        this.dialogRef.close();
    }
    getCommentList() {
        this.isLoading = true;
        this.comments = [];
        const request = new GetCommentRequestModel();
        request.EntityTypeName = this.data.entityTypeName;
        request.Identifier = this.data.identifier;
        this.lobService.getCommentList(request).subscribe((res) => {
            this.comments = res.Items;
            this.isLoading = false;
        }, (error) => {
            this.isLoading = false;
        });
    }
    saveComment() {
        this.isAdding = false;
        this.isLoading = true;
        this.commentToSave.EntityTypeName = this.data.entityTypeName;
        this.commentToSave.Identifier = this.data.identifier;
        const service = this.commentToSave.Id ? this.lobService.editComment(this.commentToSave) : this.lobService.addComment(this.commentToSave);
        service.subscribe((res) => {
            this.commentToSave = new CommentModel();
            this.getCommentList();
        }, (error) => {
            this.snackbarService.open(error.statusText);
            this.isLoading = false;
        });
    }
    deleteComment(comment) {
        this.isLoading = true;
        this.lobService.deleteComment(comment).subscribe((res) => {
            this.getCommentList();
        }, (error) => {
        });
    }
    switchToEditMode(item) {
        this.isAdding = true;
        this.data.mode = 2;
        this.comments.forEach(element => {
            element.IsEditing = false;
        });
        item.IsEditing = true;
        this.commentToSave = JSON.parse(JSON.stringify(item));
    }
    switchToAddMode() {
        this.isAdding = true;
        this.data.mode = 2;
        this.comments.forEach(element => {
            element.IsEditing = false;
        });
        const item = new CommentModel();
        item.IsEditing = true;
        this.comments.push(item);
    }
    cancelEditMode(comment) {
        this.isAdding = false;
        comment.IsEditing = false;
        this.commentToSave = new CommentModel();
        if (!comment.Id) {
            this.comments.splice(this.comments.indexOf(comment));
        }
    }
    static { this.ɵfac = function CommentsListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommentsListComponent)(i0.ɵɵdirectiveInject(i1$2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA), i0.ɵɵdirectiveInject(LobInfoService), i0.ɵɵdirectiveInject(SnackBarService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CommentsListComponent, selectors: [["dscribe-comments-list"]], standalone: false, decls: 10, vars: 4, consts: [["mat-dialog-title", ""], ["mode", "indeterminate", 4, "ngIf"], ["style", "margin-bottom: 10px", 4, "ngFor", "ngForOf"], ["mat-icon-button", "", 3, "click"], ["color", "warn"], ["mat-icon-button", "", 3, "disabled", "click", 4, "ngIf"], ["mode", "indeterminate"], [2, "margin-bottom", "10px"], ["style", "color:gray", 4, "ngIf"], ["class", "full-width", "appearance", "outline", 4, "ngIf"], [4, "ngIf"], [2, "color", "gray"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "type", "text", "placeholder", "Title", "name", "title", 3, "ngModelChange", "ngModel"], ["class", "form-error-message", 4, "ngFor", "ngForOf"], [1, "form-error-message"], ["matInput", "", "type", "text", "placeholder", "Description", "name", "Description", 2, "height", "100px", 3, "ngModelChange", "ngModel"], ["mat-icon-button", "", 3, "click", 4, "ngIf"], ["mat-icon-button", "", 3, "click", "disabled"], ["color", "primary"], ["color", "accent"]], template: function CommentsListComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h1", 0);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(2, CommentsListComponent_mat_progress_bar_2_Template, 1, 0, "mat-progress-bar", 1);
            i0.ɵɵelementStart(3, "mat-dialog-content");
            i0.ɵɵtemplate(4, CommentsListComponent_mat_card_4_Template, 8, 5, "mat-card", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "mat-dialog-actions")(6, "button", 3);
            i0.ɵɵlistener("click", function CommentsListComponent_Template_button_click_6_listener() { return ctx.cancel(); });
            i0.ɵɵelementStart(7, "mat-icon", 4);
            i0.ɵɵtext(8, "cancel");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, CommentsListComponent_button_9_Template, 3, 1, "button", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("", ctx.data.mode === 1 ? "View" : "Manage", " Comments");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.comments);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.data.mode === 2);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.DefaultValueAccessor, i5$1.NgControlStatus, i5$1.NgModel, i5.MatIconButton, i7.MatCard, i7.MatCardActions, i7.MatCardContent, i7.MatCardHeader, i1$2.MatDialogTitle, i1$2.MatDialogActions, i1$2.MatDialogContent, i8.MatFormField, i8.MatLabel, i6.MatIcon, i10$1.MatInput, i8$1.MatProgressBar], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommentsListComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-comments-list', template: "<h1 mat-dialog-title>{{data.mode === 1 ? 'View' : 'Manage'}} Comments</h1>\r\n<mat-progress-bar mode=\"indeterminate\" *ngIf=\"isLoading\"></mat-progress-bar>\r\n<mat-dialog-content>\r\n\t<mat-card style=\"margin-bottom: 10px\" *ngFor=\"let comment of comments\">\r\n\t\t<mat-card-header>\r\n\t\t\t<h4 style=\"color:gray\" *ngIf=\"!comment.IsEditing\">{{comment.Title}}</h4>\r\n\t\t</mat-card-header>\r\n\t\t<mat-card-content>\r\n\t\t\t<h5 style=\"color:gray\" *ngIf=\"!comment.IsEditing\">{{comment.Description}}</h5>\r\n\t\t\t<mat-form-field class=\"full-width\" appearance=\"outline\" *ngIf=\"comment.IsEditing\">\r\n\t\t\t\t<mat-label>Title</mat-label>\r\n\t\t\t\t<input matInput type=\"text\" placeholder=\"Title\" name=\"title\" [(ngModel)]=\"commentToSave.Title\">\r\n\t\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of commentToSaveError?.Title\">\r\n\t\t\t\t\t{{e}}\r\n\t\t\t\t</p>\r\n\t\t\t</mat-form-field>\r\n\t\t\t<mat-form-field class=\"full-width\" appearance=\"outline\" *ngIf=\"comment.IsEditing\">\r\n\t\t\t\t<mat-label>Description</mat-label>\r\n\t\t\t\t<textarea matInput type=\"text\" placeholder=\"Description\" name=\"Description\" [(ngModel)]=\"commentToSave.Description\"\r\n\t\t\t\t style=\"height: 100px;\"></textarea>\r\n\t\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of commentToSaveError?.Title\">\r\n\t\t\t\t\t{{e}}\r\n\t\t\t\t</p>\r\n\t\t\t</mat-form-field>\r\n\t\t</mat-card-content>\r\n\t\t<mat-card-actions *ngIf=\"data.mode === 2\">\r\n\t\t\t<button mat-icon-button (click)=\"deleteComment(comment)\" *ngIf=\"!comment.IsEditing\" [disabled]=\"isAdding\">\r\n\t\t\t\t<mat-icon color=\"warn\">delete</mat-icon>\r\n\t\t\t</button>\r\n\t\t\t<button mat-icon-button (click)=\"switchToEditMode(comment)\" *ngIf=\"!comment.IsEditing\" [disabled]=\"isAdding\">\r\n\t\t\t\t<mat-icon color=\"primary\">edit</mat-icon>\r\n\t\t\t</button>\r\n\t\t\t<button mat-icon-button (click)=\"cancelEditMode(comment)\" [disabled]=\"submitLoading\" *ngIf=\"comment.IsEditing\">\r\n\t\t\t\t<mat-icon color=\"warn\">cancel</mat-icon>\r\n\t\t\t</button>\r\n\t\t\t<button mat-icon-button (click)=\"saveComment()\" *ngIf=\"comment.IsEditing\">\r\n\t\t\t\t<mat-icon color=\"accent\">save</mat-icon>\r\n\t\t\t</button>\r\n\t\t</mat-card-actions>\r\n\t</mat-card>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions>\r\n\t<button mat-icon-button (click)=\"cancel()\">\r\n\t\t<mat-icon color=\"warn\">cancel</mat-icon>\r\n\t</button>\r\n\t<button mat-icon-button (click)=\"switchToAddMode()\" *ngIf=\"data.mode === 2\" [disabled]=\"isAdding\">\r\n\t\t<mat-icon color=\"warn\">add</mat-icon>\r\n\t</button>\r\n</mat-dialog-actions>\r\n" }]
    }], () => [{ type: i1$2.MatDialogRef }, { type: LobListDialogData, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }, { type: LobInfoService }, { type: SnackBarService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CommentsListComponent, { className: "CommentsListComponent", filePath: "lib/lob-tools/comments/comments-list/comments-list.component.ts", lineNumber: 14 }); })();

class MiscHelper {
    static getFileNameFromHeaders(response) {
        const contentDisposition = response.headers.get('content-disposition');
        if (!contentDisposition) {
            return null;
        }
        const regex = new RegExp('filename="(.*)"', 'i');
        const m = regex.exec(contentDisposition);
        if (!m) {
            return null;
        }
        return m[1];
    }
}

const _c0$b = a0 => ({ "selected": a0 });
function AttachmentsListComponent_th_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 10);
    i0.ɵɵtext(1, "Actions");
    i0.ɵɵelementEnd();
} }
function AttachmentsListComponent_td_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 11)(1, "button", 12);
    i0.ɵɵlistener("click", function AttachmentsListComponent_td_3_Template_button_click_1_listener($event) { const attachment_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); ctx_r2.download(attachment_r2); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "cloud_download");
    i0.ɵɵelementEnd()()();
} }
function AttachmentsListComponent_th_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 10);
    i0.ɵɵtext(1, "Title");
    i0.ɵɵelementEnd();
} }
function AttachmentsListComponent_td_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const attachment_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(attachment_r4.Title);
} }
function AttachmentsListComponent_th_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 10);
    i0.ɵɵtext(1, "Size");
    i0.ɵɵelementEnd();
} }
function AttachmentsListComponent_td_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const attachment_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(attachment_r5.Size);
} }
function AttachmentsListComponent_th_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 10);
    i0.ɵɵtext(1, "File Name");
    i0.ɵɵelementEnd();
} }
function AttachmentsListComponent_td_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const attachment_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(attachment_r6.FileName);
} }
function AttachmentsListComponent_th_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 10);
    i0.ɵɵtext(1, "Description");
    i0.ɵɵelementEnd();
} }
function AttachmentsListComponent_td_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const attachment_r7 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(attachment_r7.Description);
} }
function AttachmentsListComponent_tr_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 13);
} }
function AttachmentsListComponent_tr_17_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 14);
    i0.ɵɵlistener("click", function AttachmentsListComponent_tr_17_Template_tr_click_0_listener($event) { const row_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r2 = i0.ɵɵnextContext(); ctx_r2.selection.toggle(row_r9); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r9 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c0$b, ctx_r2.selection.isSelected(row_r9)));
} }
class AttachmentsListComponent {
    constructor(lobInfo, dialogRef, data) {
        this.lobInfo = lobInfo;
        this.dialogRef = dialogRef;
        this.data = data;
        this.displayedColumns = ['Actions', 'Title', 'Size', 'FileName', 'Description'];
        this.selection = new SelectionModel(false, [], true);
        this.lobInfo.getAttachmentsList({
            EntityTypeName: data.entityTypeName,
            Identifier: data.identifier
        }).subscribe(res => this.attachments = res.Items);
    }
    ngOnInit() {
    }
    download(attachment) {
        this.lobInfo.downloadAttachment(this.selection.selected[0])
            .subscribe(data => {
            saveAs(data.body, MiscHelper.getFileNameFromHeaders(data));
        });
    }
    static { this.ɵfac = function AttachmentsListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AttachmentsListComponent)(i0.ɵɵdirectiveInject(LobInfoService), i0.ɵɵdirectiveInject(i1$2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AttachmentsListComponent, selectors: [["dscribe-attachments-list"]], standalone: false, decls: 18, vars: 3, consts: [["mat-table", "", 1, "main-table", 3, "dataSource"], ["matColumnDef", "Actions"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "Title"], ["matColumnDef", "Size"], ["matColumnDef", "FileName"], ["matColumnDef", "Description"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "ngClass", "click", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-icon-button", "", 3, "click"], ["mat-header-row", ""], ["mat-row", "", 3, "click", "ngClass"]], template: function AttachmentsListComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "table", 0);
            i0.ɵɵelementContainerStart(1, 1);
            i0.ɵɵtemplate(2, AttachmentsListComponent_th_2_Template, 2, 0, "th", 2)(3, AttachmentsListComponent_td_3_Template, 4, 0, "td", 3);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(4, 4);
            i0.ɵɵtemplate(5, AttachmentsListComponent_th_5_Template, 2, 0, "th", 2)(6, AttachmentsListComponent_td_6_Template, 2, 1, "td", 3);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(7, 5);
            i0.ɵɵtemplate(8, AttachmentsListComponent_th_8_Template, 2, 0, "th", 2)(9, AttachmentsListComponent_td_9_Template, 2, 1, "td", 3);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(10, 6);
            i0.ɵɵtemplate(11, AttachmentsListComponent_th_11_Template, 2, 0, "th", 2)(12, AttachmentsListComponent_td_12_Template, 2, 1, "td", 3);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(13, 7);
            i0.ɵɵtemplate(14, AttachmentsListComponent_th_14_Template, 2, 0, "th", 2)(15, AttachmentsListComponent_td_15_Template, 2, 1, "td", 3);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵtemplate(16, AttachmentsListComponent_tr_16_Template, 1, 0, "tr", 8)(17, AttachmentsListComponent_tr_17_Template, 1, 3, "tr", 9);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("dataSource", ctx.attachments);
            i0.ɵɵadvance(16);
            i0.ɵɵproperty("matHeaderRowDef", ctx.displayedColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("matRowDefColumns", ctx.displayedColumns);
        } }, dependencies: [i1$3.NgClass, i5.MatIconButton, i6.MatIcon, i10.MatTable, i10.MatHeaderCellDef, i10.MatHeaderRowDef, i10.MatColumnDef, i10.MatCellDef, i10.MatRowDef, i10.MatHeaderCell, i10.MatCell, i10.MatHeaderRow, i10.MatRow], styles: [".main-table[_ngcontent-%COMP%]{width:100%}.selected[_ngcontent-%COMP%]{background:#87cefa}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AttachmentsListComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-attachments-list', template: "<table mat-table [dataSource]=\"attachments\" class=\"main-table\">\r\n\t<ng-container matColumnDef=\"Actions\">\r\n\t\t<th mat-header-cell *matHeaderCellDef>Actions</th>\r\n\t\t<td mat-cell *matCellDef=\"let attachment\">\r\n\t\t\t<button mat-icon-button (click)=\"download(attachment); $event.stopPropagation();\">\r\n\t\t\t\t<mat-icon>cloud_download</mat-icon>\r\n\t\t\t</button>\r\n\t\t</td>\r\n\t</ng-container>\r\n\r\n\t<ng-container matColumnDef=\"Title\">\r\n\t\t<th mat-header-cell *matHeaderCellDef>Title</th>\r\n\t\t<td mat-cell *matCellDef=\"let attachment\">{{attachment.Title}}</td>\r\n\t</ng-container>\r\n\r\n\t<ng-container matColumnDef=\"Size\">\r\n\t\t<th mat-header-cell *matHeaderCellDef>Size</th>\r\n\t\t<td mat-cell *matCellDef=\"let attachment\">{{attachment.Size}}</td>\r\n\t</ng-container>\r\n\r\n\t<ng-container matColumnDef=\"FileName\">\r\n\t\t<th mat-header-cell *matHeaderCellDef>File Name</th>\r\n\t\t<td mat-cell *matCellDef=\"let attachment\">{{attachment.FileName}}</td>\r\n\t</ng-container>\r\n\r\n\t<ng-container matColumnDef=\"Description\">\r\n\t\t<th mat-header-cell *matHeaderCellDef>Description</th>\r\n\t\t<td mat-cell *matCellDef=\"let attachment\">{{attachment.Description}}</td>\r\n\t</ng-container>\r\n\r\n\t<tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n\t<tr mat-row (click)=\"selection.toggle(row); $event.stopPropagation();\"\r\n\t\t\t[ngClass]=\"{'selected': selection.isSelected(row)}\"\r\n\t\t\t*matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n</table>\r\n", styles: [".main-table{width:100%}.selected{background:#87cefa}\n"] }]
    }], () => [{ type: LobInfoService }, { type: i1$2.MatDialogRef }, { type: LobListDialogData, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AttachmentsListComponent, { className: "AttachmentsListComponent", filePath: "lib/lob-tools/attachments/attachments-list/attachments-list.component.ts", lineNumber: 16 }); })();

const _c0$a = a0 => ({ "selected": a0 });
function ReportsListComponent_th_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 18);
    i0.ɵɵtext(1, "Title");
    i0.ɵɵelementEnd();
} }
function ReportsListComponent_td_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const report_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(report_r1.Title);
} }
function ReportsListComponent_tr_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 20);
} }
function ReportsListComponent_tr_10_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 21);
    i0.ɵɵlistener("click", function ReportsListComponent_tr_10_Template_tr_click_0_listener($event) { const row_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(); ctx_r3.selection.toggle(row_r3); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c0$a, ctx_r3.selection.isSelected(row_r3)));
} }
function ReportsListComponent_ng_container_18_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "mat-form-field")(2, "mat-label");
    i0.ɵɵtext(3, "Title");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 22);
    i0.ɵɵtwoWayListener("ngModelChange", function ReportsListComponent_ng_container_18_Template_input_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.attachmentTitle, $event) || (ctx_r3.attachmentTitle = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(5, "br");
    i0.ɵɵelementStart(6, "label", 23);
    i0.ɵɵtext(7, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "textarea", 24);
    i0.ɵɵtwoWayListener("ngModelChange", function ReportsListComponent_ng_container_18_Template_textarea_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.attachmentDescription, $event) || (ctx_r3.attachmentDescription = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtext(9, "\t\t\t\t");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.attachmentTitle);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.attachmentDescription);
} }
class ReportsListComponent {
    get mode() {
        return this._mode;
    }
    set mode(v) {
        this._mode = v;
        console.log(v);
    }
    constructor(lobInfo, dialogRef, data) {
        this.lobInfo = lobInfo;
        this.dialogRef = dialogRef;
        this.data = data;
        this.reports = [];
        this.displayedColumns = ['Title'];
        this.selection = new SelectionModel(false, [], true);
        this._mode = 'download';
        this.lobInfo.getReports(data.entityTypeName)
            .subscribe(x => this.reports = x);
    }
    ngOnInit() {
    }
    ok() {
        if (this.mode === 'download') {
            this.lobInfo.processReportForDownload({
                EntityIdentifier: this.data.identifier,
                ReportDefinitionId: this.selection.selected[0].Id
            }).subscribe(data => {
                saveAs(data.body, MiscHelper.getFileNameFromHeaders(data) || 'download.docx');
                this.dialogRef.close(true);
            }, error => {
                console.log(error);
            });
        }
        else {
            this.lobInfo.saveReportAsAttachment({
                Description: this.attachmentDescription,
                EntityIdentifier: this.data.identifier,
                ReportDefinitionId: this.selection.selected[0].Id,
                Title: this.attachmentTitle
            }).subscribe(x => this.dialogRef.close(true));
        }
    }
    static { this.ɵfac = function ReportsListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReportsListComponent)(i0.ɵɵdirectiveInject(LobInfoService), i0.ɵɵdirectiveInject(i1$2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReportsListComponent, selectors: [["dscribe-reports-list"]], standalone: false, decls: 26, vars: 6, consts: [["mat-dialog-title", ""], [1, "tab-group"], ["label", "Choose the report"], ["mat-table", "", 1, "main-table", 3, "dataSource"], ["matColumnDef", "Title"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "ngClass", "click", 4, "matRowDef", "matRowDefColumns"], ["label", "Settings"], [1, "radio-group", 3, "ngModelChange", "ngModel"], ["value", "download", 1, "radio-button"], ["value", "attach", 1, "radio-button"], [4, "ngIf"], ["mat-icon-button", "", "matTooltip", "Ok", 3, "click"], ["color", "primary"], ["mat-icon-button", "", "mat-dialog-close", ""], ["color", "warn", "matTooltip", "Cancel"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", "", 3, "click", "ngClass"], ["matInput", "", "type", "text", 3, "ngModelChange", "ngModel"], ["for", "attachmentDescription"], ["id", "attachmentDescription", "name", "attachmentDescription", 3, "ngModelChange", "ngModel"]], template: function ReportsListComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h2", 0);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "mat-dialog-content")(3, "mat-tab-group", 1)(4, "mat-tab", 2)(5, "table", 3);
            i0.ɵɵelementContainerStart(6, 4);
            i0.ɵɵtemplate(7, ReportsListComponent_th_7_Template, 2, 0, "th", 5)(8, ReportsListComponent_td_8_Template, 2, 1, "td", 6);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵtemplate(9, ReportsListComponent_tr_9_Template, 1, 0, "tr", 7)(10, ReportsListComponent_tr_10_Template, 1, 3, "tr", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "mat-tab", 9)(12, "mat-radio-group", 10);
            i0.ɵɵtwoWayListener("ngModelChange", function ReportsListComponent_Template_mat_radio_group_ngModelChange_12_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.mode, $event) || (ctx.mode = $event); return $event; });
            i0.ɵɵelementStart(13, "mat-radio-button", 11);
            i0.ɵɵtext(14, "Process and download");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "mat-radio-button", 12);
            i0.ɵɵtext(16, "Save as attachment");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(17, "br");
            i0.ɵɵtemplate(18, ReportsListComponent_ng_container_18_Template, 10, 2, "ng-container", 13);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(19, "mat-dialog-actions")(20, "button", 14);
            i0.ɵɵlistener("click", function ReportsListComponent_Template_button_click_20_listener() { return ctx.ok(); });
            i0.ɵɵelementStart(21, "mat-icon", 15);
            i0.ɵɵtext(22, "done");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "button", 16)(24, "mat-icon", 17);
            i0.ɵɵtext(25, "cancel");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("Reports for ", ctx.data.entityTypeName);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("dataSource", ctx.reports);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("matHeaderRowDef", ctx.displayedColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("matRowDefColumns", ctx.displayedColumns);
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.mode);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.mode == "attach");
        } }, dependencies: [i1$3.NgClass, i1$3.NgIf, i5$1.DefaultValueAccessor, i5$1.NgControlStatus, i5$1.NgModel, i5.MatIconButton, i1$2.MatDialogClose, i1$2.MatDialogTitle, i1$2.MatDialogActions, i1$2.MatDialogContent, i8.MatFormField, i8.MatLabel, i6.MatIcon, i10$1.MatInput, i9$1.MatRadioGroup, i9$1.MatRadioButton, i10.MatTable, i10.MatHeaderCellDef, i10.MatHeaderRowDef, i10.MatColumnDef, i10.MatCellDef, i10.MatRowDef, i10.MatHeaderCell, i10.MatCell, i10.MatHeaderRow, i10.MatRow, i14.MatTab, i14.MatTabGroup, i11.MatTooltip], styles: [".main-table[_ngcontent-%COMP%]{width:100%}.selected[_ngcontent-%COMP%]{background:#87cefa}.radio-group[_ngcontent-%COMP%]{display:inline-flex;flex-direction:column}.radio-button[_ngcontent-%COMP%]{margin:5px}.tab-group[_ngcontent-%COMP%]{min-height:150px}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportsListComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-reports-list', template: "<h2 mat-dialog-title>Reports for {{data.entityTypeName}}</h2>\r\n<mat-dialog-content>\r\n\t<mat-tab-group class=\"tab-group\">\r\n\t\t<mat-tab label=\"Choose the report\">\r\n\t\t\t<table mat-table [dataSource]=\"reports\" class=\"main-table\">\r\n\t\t\t\t<ng-container matColumnDef=\"Title\">\r\n\t\t\t\t\t<th mat-header-cell *matHeaderCellDef>Title</th>\r\n\t\t\t\t\t<td mat-cell *matCellDef=\"let report\">{{report.Title}}</td>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n\t\t\t\t<tr mat-row (click)=\"selection.toggle(row); $event.stopPropagation();\"\r\n\t\t\t\t\t\t[ngClass]=\"{'selected': selection.isSelected(row)}\"\r\n\t\t\t\t\t\t*matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n\t\t\t</table>\r\n\t\t</mat-tab>\r\n\t\t<mat-tab label=\"Settings\">\r\n\t\t\t<mat-radio-group [(ngModel)]=\"mode\" class=\"radio-group\">\r\n\t\t\t\t<mat-radio-button value=\"download\" class=\"radio-button\">Process and download</mat-radio-button>\r\n\t\t\t\t<mat-radio-button value=\"attach\" class=\"radio-button\">Save as attachment</mat-radio-button>\r\n\t\t\t</mat-radio-group>\r\n\t\t\t<br>\r\n\t\t\t<ng-container *ngIf=\"mode == 'attach'\">\r\n\t\t\t\t<mat-form-field>\r\n\t\t\t\t\t<mat-label>Title</mat-label>\r\n\t\t\t\t\t<input matInput type=\"text\" [(ngModel)]=\"attachmentTitle\">\r\n\t\t\t\t</mat-form-field>\r\n\t\t\t\t<br>\r\n\t\t\t\t<label for=\"attachmentDescription\">Description</label>\r\n\t\t\t\t<textarea id=\"attachmentDescription\" name=\"attachmentDescription\" [(ngModel)]=\"attachmentDescription\">\r\n\t\t\t\t</textarea>\r\n\t\t\t</ng-container>\r\n\t\t</mat-tab>\r\n\t</mat-tab-group>\r\n</mat-dialog-content>\r\n<mat-dialog-actions>\r\n\t<button mat-icon-button matTooltip=\"Ok\" (click)=\"ok()\">\r\n\t\t<mat-icon color=\"primary\">done</mat-icon>\r\n\t</button>\r\n\t<button mat-icon-button mat-dialog-close>\r\n\t\t<mat-icon color=\"warn\" matTooltip=\"Cancel\">cancel</mat-icon>\r\n\t</button>\r\n</mat-dialog-actions>\r\n", styles: [".main-table{width:100%}.selected{background:#87cefa}.radio-group{display:inline-flex;flex-direction:column}.radio-button{margin:5px}.tab-group{min-height:150px}\n"] }]
    }], () => [{ type: LobInfoService }, { type: i1$2.MatDialogRef }, { type: LobListDialogData, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ReportsListComponent, { className: "ReportsListComponent", filePath: "lib/lob-tools/reporting/reports-list/reports-list.component.ts", lineNumber: 16 }); })();

var ManageCommentModes;
(function (ManageCommentModes) {
    ManageCommentModes[ManageCommentModes["view"] = 1] = "view";
    ManageCommentModes[ManageCommentModes["manage"] = 2] = "manage";
})(ManageCommentModes || (ManageCommentModes = {}));

var HistoryType;
(function (HistoryType) {
    HistoryType[HistoryType["addEdit"] = 1] = "addEdit";
    HistoryType[HistoryType["deleted"] = 2] = "deleted";
})(HistoryType || (HistoryType = {}));

class HistoryService {
    constructor(http, dscribeService) {
        this.http = http;
        this.dscribeService = dscribeService;
        this.getEntityTypeHistoryAPI = this.dscribeService.url('api/History/GetEntityTypeHistory');
        this.getDeletedEntityTypeHistoryAPI = this.dscribeService.url('api/History/GetDeletedEntityTypeHistory');
        this.getPropertyHistoryAPI = this.dscribeService.url('api/History/GetPropertyHistory');
        this.getDeletedPropertyHistoryAPI = this.dscribeService.url('api/History/GetDeletedPropertyHistory');
        this.getAppInstanceHistoryAPI = this.dscribeService.url('api/History/GetAppInstanceHistory');
        this.getDeletedAppInstanceHistoryAPI = this.dscribeService.url('api/History/GetDeletedAppInstanceHistory');
        this.getAppTypeHistoryAPI = this.dscribeService.url('api/History/GetAppTypeHistory');
        this.getDeletedAppTypeHistoryAPI = this.dscribeService.url('api/History/GetDeletedAppTypeHistory');
        this.getDataHistoryAPI = this.dscribeService.url('api/History/GetDataHistory');
    }
    getEntityTypeHistory(data) {
        return this.http.post(this.getEntityTypeHistoryAPI, data);
    }
    getDataHistory(entityName, data) {
        return this.http.post(this.getDataHistoryAPI, { EntityName: entityName, Data: data });
    }
    getDeletedEntityTypeHistory() {
        return this.http.get(this.getDeletedEntityTypeHistoryAPI);
    }
    getPropertyHistory(model) {
        return this.http.post(this.getPropertyHistoryAPI, model);
    }
    getDeletedPropertyHistory() {
        return this.http.get(this.getDeletedPropertyHistoryAPI);
    }
    getAppInstanceHistory(model) {
        return this.http.get(this.getAppInstanceHistoryAPI);
    }
    getDeletedAppInstanceHistory(model) {
        return this.http.get(this.getDeletedAppInstanceHistoryAPI);
    }
    getAppTypeHistory(model) {
        return this.http.get(this.getAppTypeHistoryAPI);
    }
    getDeletedAppTypeHistory(model) {
        return this.http.get(this.getDeletedAppTypeHistoryAPI);
    }
    static { this.ɵfac = function HistoryService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HistoryService)(i0.ɵɵinject(DscribeHttpClient), i0.ɵɵinject(DscribeService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: HistoryService, factory: HistoryService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HistoryService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: DscribeHttpClient }, { type: DscribeService }], null); })();

const _c0$9 = ["entityTypesPaginator"];
function DataHistoryComponent_mat_progress_bar_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-progress-bar", 3);
} }
function DataHistoryComponent_h1_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("History of ", ctx_r0.data.title);
} }
function DataHistoryComponent_h1_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 4);
    i0.ɵɵtext(1, "Deleted entities history");
    i0.ɵɵelementEnd();
} }
function DataHistoryComponent_mat_dialog_content_3_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-dialog-content")(1, "dscribe-table-template", 5);
    i0.ɵɵlistener("rowClick", function DataHistoryComponent_mat_dialog_content_3_Template_dscribe_table_template_rowClick_1_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.selectRow($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("data", ctx_r0.historyData)("selection", ctx_r0.selection)("columns", ctx_r0.columns)("displayedColumns", ctx_r0.displayedColumns)("hideAdditionFeature", true);
} }
class DataHistoryComponent {
    constructor(dialogRef, data, snackbarService, historyService, datepipe) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.snackbarService = snackbarService;
        this.historyService = historyService;
        this.datepipe = datepipe;
        // private entityHistories: EntityTypeHistoryModel[] = [];
        this.isLoading = false;
        // entityTypesDataSource = new MatTableDataSource<EntityTypeHistoryModel>(this.entityHistories);
        this.initialSelection = [];
        this.allowMultiSelect = false;
        this.selection = new SelectionModel(this.allowMultiSelect, this.initialSelection);
        this.columns = [];
        this.displayedColumns = [];
        this.columns = JSON.parse(JSON.stringify(this.data.columns));
        this.columns.push(new ListColumn('Action', 'Action', 'string', null, null));
        this.columns.push(new ListColumn('ActionTime', 'ActionTime', 'string', null, null));
        this.columns.push(new ListColumn('ProcessDuration', 'ProcessDuration', 'string', null, null));
    }
    ngOnInit() {
        if (this.data.historyType === HistoryType.addEdit) {
            this.getDataHistory();
        }
        // if (this.data.historyType === HistoryType.deleted) {
        // 	this.getDeletedEntityHistory();
        // }
    }
    getDataHistory() {
        this.isLoading = true;
        this.historyData = [];
        this.historyService.getDataHistory(this.data.title, JSON.stringify(this.data.entity)).subscribe((res) => {
            res.forEach(element => {
                this.historyData.push(JSON.parse(element.Data));
                this.historyData[res.indexOf(element)].Action = this.getAction(element.Action);
                this.historyData[res.indexOf(element)].ActionTime =
                    this.datepipe.transform(element.ActionTime, 'yyyy-MM-dd hh:mm:ss');
                this.historyData[res.indexOf(element)].ProcessDuration = element.ProcessDuration;
            });
            this.data.displayedColumns.forEach(element => {
                if (element !== 'lobInfo') {
                    this.displayedColumns.push(element);
                }
            });
            this.displayedColumns.push('Action');
            this.displayedColumns.push('ActionTime');
            this.displayedColumns.push('ProcessDuration');
            this.isLoading = false;
        }, (error) => {
            this.snackbarService.open(error.statusText);
            this.isLoading = false;
        });
    }
    selectRow(row) {
    }
    getAction(value) {
        switch (value) {
            case 2:
                return 'Deleted';
            case 4:
                return 'Added';
            case 3:
                return 'Modified';
            default:
                return 'Not implemented';
        }
    }
    static { this.ɵfac = function DataHistoryComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DataHistoryComponent)(i0.ɵɵdirectiveInject(i1$2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA), i0.ɵɵdirectiveInject(SnackBarService), i0.ɵɵdirectiveInject(HistoryService), i0.ɵɵdirectiveInject(i1$3.DatePipe)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DataHistoryComponent, selectors: [["dscribe-data-history"]], viewQuery: function DataHistoryComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0$9, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.entityTypesPaginator = _t.first);
        } }, standalone: false, features: [i0.ɵɵProvidersFeature([DatePipe])], decls: 4, vars: 4, consts: [["mode", "indeterminate", 4, "ngIf"], ["mat-dialog-title", "", 4, "ngIf"], [4, "ngIf"], ["mode", "indeterminate"], ["mat-dialog-title", ""], [3, "rowClick", "data", "selection", "columns", "displayedColumns", "hideAdditionFeature"]], template: function DataHistoryComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, DataHistoryComponent_mat_progress_bar_0_Template, 1, 0, "mat-progress-bar", 0)(1, DataHistoryComponent_h1_1_Template, 2, 1, "h1", 1)(2, DataHistoryComponent_h1_2_Template, 2, 0, "h1", 1)(3, DataHistoryComponent_mat_dialog_content_3_Template, 2, 5, "mat-dialog-content", 2);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.data.historyType === 1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.data.historyType === 2);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
        } }, dependencies: [i1$3.NgIf, i1$2.MatDialogTitle, i1$2.MatDialogContent, i8$1.MatProgressBar, TableTemplateComponent], styles: ["table[_ngcontent-%COMP%]{width:100%}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataHistoryComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-data-history', providers: [DatePipe], template: "<mat-progress-bar mode=\"indeterminate\" *ngIf=\"isLoading\"></mat-progress-bar>\r\n<h1 mat-dialog-title *ngIf=\"data.historyType === 1\">History of {{data.title}}</h1>\r\n<h1 mat-dialog-title *ngIf=\"data.historyType === 2\">Deleted entities history</h1>\r\n\r\n<mat-dialog-content *ngIf=\"!isLoading\">\r\n\t<dscribe-table-template (rowClick)=\"selectRow($event)\" [data]=\"historyData\" [selection]=\"selection\" [columns]=\"columns\"\r\n\t [displayedColumns]=\"displayedColumns\" [hideAdditionFeature]=\"true\">\r\n\t</dscribe-table-template>\r\n</mat-dialog-content>\r\n\r\n<!-- <mat-dialog-actions>\r\n\t<button mat-icon-button (click)=\"cancel()\" [disabled]=\"submitLoading\">\r\n\t\t<mat-icon color=\"warn\">cancel</mat-icon>\r\n\t</button>\r\n</mat-dialog-actions> -->\r\n", styles: ["table{width:100%}\n"] }]
    }], () => [{ type: i1$2.MatDialogRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }, { type: SnackBarService }, { type: HistoryService }, { type: i1$3.DatePipe }], { entityTypesPaginator: [{
            type: ViewChild,
            args: ['entityTypesPaginator']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DataHistoryComponent, { className: "DataHistoryComponent", filePath: "lib/list/data-history/data-history.component.ts", lineNumber: 19 }); })();

const _c0$8 = ["host"];
function CustomTemplateHostComponent_ng_template_0_Template(rf, ctx) { }
class CustomTemplateHostComponent {
    set isSelected(value) {
        if (this._templateComp) {
            console.log(value, this._data);
            this._templateComp.select = value;
        }
    }
    set data(value) {
        this._data = value;
        if (this._templateComp) {
            this._templateComp.data = value;
        }
    }
    get data() {
        return this._data;
    }
    set entityTypeName(value) {
        this._entityTypeName = value;
        this.loadComponent();
    }
    get entityTypeName() {
        return this._entityTypeName;
    }
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.select = new EventEmitter();
    }
    loadComponent() {
        const cardData = EntityTypeTemplateMapper.get(this._entityTypeName);
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(cardData.component);
        this.host.clear();
        const componentRef = this.host.createComponent(componentFactory);
        this._templateComp = componentRef.instance;
        this._templateComp.selectChange.subscribe(() => {
            this.select.emit();
            console.log('click', this._data);
        });
        this._templateComp.data = this.data;
    }
    static { this.ɵfac = function CustomTemplateHostComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomTemplateHostComponent)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomTemplateHostComponent, selectors: [["dscribe-custom-template-host"]], viewQuery: function CustomTemplateHostComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0$8, 7, ViewContainerRef);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.host = _t.first);
        } }, inputs: { isSelected: "isSelected", data: "data", entityTypeName: "entityTypeName" }, outputs: { select: "select" }, standalone: false, decls: 2, vars: 0, consts: [["host", ""]], template: function CustomTemplateHostComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, CustomTemplateHostComponent_ng_template_0_Template, 0, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } }, encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomTemplateHostComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-custom-template-host', template: "<ng-template #host></ng-template>\r\n" }]
    }], () => [{ type: i0.ComponentFactoryResolver }], { select: [{
            type: Output
        }], isSelected: [{
            type: Input
        }], data: [{
            type: Input
        }], entityTypeName: [{
            type: Input
        }], host: [{
            type: ViewChild,
            args: ['host', { read: ViewContainerRef, static: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomTemplateHostComponent, { className: "CustomTemplateHostComponent", filePath: "lib/list/list-templating/custom-template-host/custom-template-host.component.ts", lineNumber: 11 }); })();

class FilterTreeManipulator {
    addSibling(node) {
        const oldNode = node;
        const oldParent = oldNode.parent;
        const newParent = oldNode.nodeType === FilterNodeType.Comparison || oldNode.nodeType === FilterNodeType.Logical ?
            new LogicalFilterNode(oldParent) : new ArithmeticFilterNode(oldParent);
        oldParent.replaceChild(node, newParent);
        node.parent = newParent;
        if (newParent.nodeType === FilterNodeType.Logical) {
            newParent.operator = newParent.operators[0];
        }
        if (newParent.children.length === 0) {
            newParent.addChild(node.nodeType === FilterNodeType.Constant);
        }
        newParent.replaceChild(newParent.children[0], node);
    }
    toggleType(node) {
        if (node.parent.nodeType === FilterNodeType.Arithmetic) {
            node.parent.toggleChildType(node);
        }
        else if (node.parent.nodeType === FilterNodeType.Comparison) {
            node.parent.toggleChildType(node);
        }
    }
    delete(node) {
        const isParentLambda = node.parent.nodeType === FilterNodeType.Lambda;
        let minNumberOfOperands = 1000;
        const parent = node.parent;
        if (node.parent.nodeType === FilterNodeType.Logical) {
            minNumberOfOperands = node.parent.operator.minNumberOfOperands;
        }
        else if (node.parent.nodeType === FilterNodeType.Arithmetic) {
            minNumberOfOperands = node.parent.operator.minOperandCount;
        }
        if (isParentLambda) {
            const newChild = node.parent.isValueSelection()
                ? new PropertyFilterNode(node.parent)
                : new ComparisonFilterNode(node.parent);
            node.parent.replaceChild(node.parent.children[0], newChild);
            // node = newChild;
        }
        else if (parent && parent.children.length <= minNumberOfOperands) {
            const oldParent = node.parent;
            const newParent = node.parent.parent;
            oldParent.removeChild(node);
            const newChild = oldParent.children[0];
            newParent.replaceChild(oldParent, newChild);
            newChild.parent = newParent;
        }
        else {
            const siblings = node.parent.children;
            siblings.splice(siblings.indexOf(node), 1);
        }
    }
    static { this.ɵfac = function FilterTreeManipulator_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilterTreeManipulator)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FilterTreeManipulator, factory: FilterTreeManipulator.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterTreeManipulator, [{
        type: Injectable
    }], null, null); })();

const _c0$7 = a0 => ({ "display": a0 });
function FilterNodeComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx_r0.node == null ? null : ctx_r0.node.title, " ");
} }
function FilterNodeComponent_dscribe_logical_filter_node_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-logical-filter-node", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("node", ctx_r0.node);
} }
function FilterNodeComponent_dscribe_lambda_filter_node_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-lambda-filter-node", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("node", ctx_r0.node);
} }
function FilterNodeComponent_dscribe_navigation_list_filter_node_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-navigation-list-filter-node", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("node", ctx_r0.node);
} }
function FilterNodeComponent_dscribe_comparison_filter_node_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-comparison-filter-node", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("node", ctx_r0.node);
} }
function FilterNodeComponent_dscribe_arithmetic_filter_node_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-arithmetic-filter-node", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("node", ctx_r0.node);
} }
function FilterNodeComponent_dscribe_constant_filter_node_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-constant-filter-node", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("node", ctx_r0.node);
} }
function FilterNodeComponent_dscribe_property_filter_node_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-property-filter-node", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("node", ctx_r0.node);
} }
class FilterNodeComponent {
    constructor(manipulator) {
        this.manipulator = manipulator;
        this.nodeTypes = FilterNodeType;
    }
    static { this.ɵfac = function FilterNodeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilterNodeComponent)(i0.ɵɵdirectiveInject(FilterTreeManipulator)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FilterNodeComponent, selectors: [["dscribe-filter-node"]], inputs: { node: "node" }, standalone: false, decls: 10, vars: 13, consts: [[1, "filter-node-container", 3, "ngStyle", "ngClass"], [4, "ngIf"], [3, "ngSwitch"], [3, "node", 4, "ngSwitchCase"], [3, "node"]], template: function FilterNodeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, FilterNodeComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
            i0.ɵɵelementContainerStart(2, 2);
            i0.ɵɵtemplate(3, FilterNodeComponent_dscribe_logical_filter_node_3_Template, 1, 1, "dscribe-logical-filter-node", 3)(4, FilterNodeComponent_dscribe_lambda_filter_node_4_Template, 1, 1, "dscribe-lambda-filter-node", 3)(5, FilterNodeComponent_dscribe_navigation_list_filter_node_5_Template, 1, 1, "dscribe-navigation-list-filter-node", 3)(6, FilterNodeComponent_dscribe_comparison_filter_node_6_Template, 1, 1, "dscribe-comparison-filter-node", 3)(7, FilterNodeComponent_dscribe_arithmetic_filter_node_7_Template, 1, 1, "dscribe-arithmetic-filter-node", 3)(8, FilterNodeComponent_dscribe_constant_filter_node_8_Template, 1, 1, "dscribe-constant-filter-node", 3)(9, FilterNodeComponent_dscribe_property_filter_node_9_Template, 1, 1, "dscribe-property-filter-node", 3);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(11, _c0$7, ctx.node.shouldBeInlined() ? "inline-block" : "block"))("ngClass", (ctx.node == null ? null : ctx.node.isValid()) ? "is-ok" : "has-error");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", (ctx.node == null ? null : ctx.node.nodeType) !== ctx.nodeTypes.Lambda);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitch", ctx.node == null ? null : ctx.node.nodeType);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.nodeTypes.Logical);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.nodeTypes.Lambda);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.nodeTypes.NavigationList);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.nodeTypes.Comparison);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.nodeTypes.Arithmetic);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.nodeTypes.Constant);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.nodeTypes.Property);
        } }, styles: [".filter-option{margin:0 2px;width:100px;display:inline-block}.filter-option option[invalid],.noOptionSelected{color:gray}.node-action-btns{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns mat-icon{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns mat-icon:hover{background-color:#ff96ff66}.pull-left{right:70px}.filter-node-container{position:relative;display:inline-block;vertical-align:top}.filter-node-container:hover>.node-action-btns{visibility:visible}.has-error{background-color:#ff000026}.is-ok{background-color:#0000ff0d}.mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl] .mat-form-field-placeholder{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-placeholder,.mat-form-field-empty.mat-form-field-placeholder{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:block;transition:none}.mat-form-field-placeholder:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled{background:transparent 0}.mat-form-field-underline .mat-form-field-ripple{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused .mat-form-field-underline .mat-form-field-ripple{height:2px}.mat-focused .mat-form-field-underline .mat-form-field-ripple,.mat-form-field-invalid .mat-form-field-underline .mat-form-field-ripple{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper .mat-icon,.mat-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::placeholder{color:transparent!important}.mat-input-element::-moz-placeholder{color:transparent!important}.mat-input-element::-webkit-input-placeholder{color:transparent!important}.mat-input-element:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element{resize:vertical;overflow:auto}\n"], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterNodeComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-filter-node', encapsulation: ViewEncapsulation.None, template: "<div class=\"filter-node-container\"\r\n\t\t [ngStyle]=\"{'display': node.shouldBeInlined() ? 'inline-block': 'block'}\"\r\n\t\t [ngClass]=\"(node?.isValid() ? 'is-ok' : 'has-error')\">\r\n\t<ng-container *ngIf=\"node?.nodeType !== nodeTypes.Lambda\">{{node?.title}}\r\n\t</ng-container>\r\n\t<ng-container [ngSwitch]=\"node?.nodeType\">\r\n\t\t<dscribe-logical-filter-node *ngSwitchCase=\"nodeTypes.Logical\" [node]=\"node\">\r\n\r\n\t\t</dscribe-logical-filter-node>\r\n\t\t<dscribe-lambda-filter-node *ngSwitchCase=\"nodeTypes.Lambda\" [node]=\"node\">\r\n\r\n\t\t</dscribe-lambda-filter-node>\r\n\t\t<dscribe-navigation-list-filter-node *ngSwitchCase=\"nodeTypes.NavigationList\" [node]=\"node\">\r\n\r\n\t\t</dscribe-navigation-list-filter-node>\r\n\t\t<dscribe-comparison-filter-node *ngSwitchCase=\"nodeTypes.Comparison\" [node]=\"node\">\r\n\r\n\t\t</dscribe-comparison-filter-node>\r\n\t\t<dscribe-arithmetic-filter-node *ngSwitchCase=\"nodeTypes.Arithmetic\" [node]=\"node\">\r\n\r\n\t\t</dscribe-arithmetic-filter-node>\r\n\t\t<dscribe-constant-filter-node *ngSwitchCase=\"nodeTypes.Constant\" [node]=\"node\">\r\n\r\n\t\t</dscribe-constant-filter-node>\r\n\t\t<dscribe-property-filter-node *ngSwitchCase=\"nodeTypes.Property\" [node]=\"node\">\r\n\r\n\t\t</dscribe-property-filter-node>\r\n\t</ng-container>\r\n</div>\r\n", styles: [".filter-option{margin:0 2px;width:100px;display:inline-block}.filter-option option[invalid],.noOptionSelected{color:gray}.node-action-btns{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns mat-icon{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns mat-icon:hover{background-color:#ff96ff66}.pull-left{right:70px}.filter-node-container{position:relative;display:inline-block;vertical-align:top}.filter-node-container:hover>.node-action-btns{visibility:visible}.has-error{background-color:#ff000026}.is-ok{background-color:#0000ff0d}.mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl] .mat-form-field-placeholder{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-placeholder,.mat-form-field-empty.mat-form-field-placeholder{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:block;transition:none}.mat-form-field-placeholder:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled{background:transparent 0}.mat-form-field-underline .mat-form-field-ripple{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused .mat-form-field-underline .mat-form-field-ripple{height:2px}.mat-focused .mat-form-field-underline .mat-form-field-ripple,.mat-form-field-invalid .mat-form-field-underline .mat-form-field-ripple{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper .mat-icon,.mat-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::placeholder{color:transparent!important}.mat-input-element::-moz-placeholder{color:transparent!important}.mat-input-element::-webkit-input-placeholder{color:transparent!important}.mat-input-element:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element{resize:vertical;overflow:auto}\n"] }]
    }], () => [{ type: FilterTreeManipulator }], { node: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FilterNodeComponent, { className: "FilterNodeComponent", filePath: "lib/filtering/components/filter-node/filter-node.component.ts", lineNumber: 14 }); })();

function CommandButtonComponent_button_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 2);
    i0.ɵɵlistener("click", function CommandButtonComponent_button_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.performAction()); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("matTooltip", i0.ɵɵinterpolate(ctx_r1.command.tooltip || ctx_r1.command.title))("matBadge", ctx_r1.command.badge && ctx_r1.command.badge.text)("matBadgeColor", ctx_r1.command.badge && ctx_r1.command.badge.color || "primary")("matBadgeSize", ctx_r1.command.badge && ctx_r1.command.badge.size || "medium")("matBadgePosition", ctx_r1.command.badge && ctx_r1.command.badge.position || "above after");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.command.iconName);
} }
function CommandButtonComponent_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 3);
    i0.ɵɵlistener("click", function CommandButtonComponent_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.performAction()); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("matTooltip", i0.ɵɵinterpolate(ctx_r1.command.tooltip || ctx_r1.command.title))("matBadge", ctx_r1.command.badge && ctx_r1.command.badge.text)("matBadgeColor", ctx_r1.command.badge && ctx_r1.command.badge.color || "primary")("matBadgeSize", ctx_r1.command.badge && ctx_r1.command.badge.size || "medium")("matBadgePosition", ctx_r1.command.badge && ctx_r1.command.badge.position || "above after");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.command.title);
} }
class CommandButtonComponent {
    constructor() {
        this.execute = new EventEmitter();
    }
    ngOnInit() {
    }
    performAction() {
        this.execute.emit();
    }
    static { this.ɵfac = function CommandButtonComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommandButtonComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CommandButtonComponent, selectors: [["dscribe-command-button"]], inputs: { command: "command" }, outputs: { execute: "execute" }, standalone: false, decls: 2, vars: 2, consts: [["mat-icon-button", "", 3, "matBadge", "matBadgeColor", "matBadgeSize", "matBadgePosition", "matTooltip", "click", 4, "ngIf"], [3, "matBadge", "matBadgeColor", "matBadgeSize", "matBadgePosition", "matTooltip", "click", 4, "ngIf"], ["mat-icon-button", "", 3, "click", "matBadge", "matBadgeColor", "matBadgeSize", "matBadgePosition", "matTooltip"], [3, "click", "matBadge", "matBadgeColor", "matBadgeSize", "matBadgePosition", "matTooltip"]], template: function CommandButtonComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, CommandButtonComponent_button_0_Template, 3, 7, "button", 0)(1, CommandButtonComponent_button_1_Template, 3, 7, "button", 1);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.command.iconName);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.command.iconName);
        } }, dependencies: [i1$3.NgIf, i2.MatBadge, i5.MatIconButton, i6.MatIcon, i11.MatTooltip], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommandButtonComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-command-button', template: "<button\r\n\t*ngIf=\"command.iconName\"\r\n\t[matBadge]=\"command.badge && command.badge.text\"\r\n\t[matBadgeColor]=\"(command.badge && command.badge.color) || 'primary'\"\r\n\t[matBadgeSize]=\"(command.badge && command.badge.size) || 'medium'\"\r\n\t[matBadgePosition]=\"(command.badge && command.badge.position) || 'above after'\"\r\n\tmatTooltip=\"{{command.tooltip || command.title}}\"\r\n\tmat-icon-button\r\n\t(click)=\"performAction()\">\r\n\t<mat-icon>{{command.iconName}}</mat-icon>\r\n</button>\r\n\r\n<button\r\n\t*ngIf=\"!command.iconName\"\r\n\t[matBadge]=\"command.badge && command.badge.text\"\r\n\t[matBadgeColor]=\"(command.badge && command.badge.color) || 'primary'\"\r\n\t[matBadgeSize]=\"(command.badge && command.badge.size) || 'medium'\"\r\n\t[matBadgePosition]=\"(command.badge && command.badge.position) || 'above after'\"\r\n\tmatTooltip=\"{{command.tooltip || command.title}}\"\r\n\t(click)=\"performAction()\">\r\n\t<span>{{command.title}}</span>\r\n</button>\r\n" }]
    }], () => [], { command: [{
            type: Input
        }], execute: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CommandButtonComponent, { className: "CommandButtonComponent", filePath: "lib/common/command-button/command-button.component.ts", lineNumber: 10 }); })();

const _c0$6 = a0 => ({ "width": a0 });
const _c1$4 = a0 => [a0];
const _c2$1 = a0 => ({ "font-weight": a0 });
function ListComponent_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function ListComponent_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleNav()); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "more_vert");
    i0.ɵɵelementEnd()();
} }
function ListComponent_ng_container_23_dscribe_command_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "dscribe-command-button", 20);
    i0.ɵɵlistener("execute", function ListComponent_ng_container_23_dscribe_command_button_1_Template_dscribe_command_button_execute_0_listener() { i0.ɵɵrestoreView(_r3); const command_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.callListCommand(command_r4)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const command_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("command", command_r4);
} }
function ListComponent_ng_container_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ListComponent_ng_container_23_dscribe_command_button_1_Template, 1, 1, "dscribe-command-button", 19);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const command_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.shouldDisplayCommand(command_r4));
} }
function ListComponent_span_24_ng_container_4_dscribe_command_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "dscribe-command-button", 20);
    i0.ɵɵlistener("execute", function ListComponent_span_24_ng_container_4_dscribe_command_button_1_Template_dscribe_command_button_execute_0_listener() { i0.ɵɵrestoreView(_r6); const command_r7 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.callFilterCommand(command_r7)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const command_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("command", command_r7);
} }
function ListComponent_span_24_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ListComponent_span_24_ng_container_4_dscribe_command_button_1_Template, 1, 1, "dscribe-command-button", 19);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const command_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.shouldDisplayCommand(command_r7));
} }
function ListComponent_span_24_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span")(1, "mat-button-toggle", 21);
    i0.ɵɵlistener("change", function ListComponent_span_24_Template_mat_button_toggle_change_1_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleFilter()); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "filter_list");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(4, ListComponent_span_24_ng_container_4_Template, 2, 1, "ng-container", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("matTooltip", i0.ɵɵinterpolate1("", ctx_r1.filterVisible ? "Hide" : "Show", " Filter"))("checked", ctx_r1.filterVisible);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.filterCommands);
} }
function ListComponent_div_28_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "div", 26);
    i0.ɵɵelement(2, "dscribe-filter-node", 27);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("node", ctx_r1.filterLambda);
} }
function ListComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵtemplate(1, ListComponent_div_28_div_1_Template, 3, 1, "div", 23);
    i0.ɵɵelementStart(2, "button", 24);
    i0.ɵɵlistener("click", function ListComponent_div_28_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.applyFilter()); });
    i0.ɵɵelementStart(3, "mat-icon");
    i0.ɵɵtext(4, "done_outline");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.filterLambda);
} }
function ListComponent_div_30_mat_spinner_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-spinner");
} }
function ListComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵtemplate(1, ListComponent_div_30_mat_spinner_1_Template, 1, 0, "mat-spinner", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isLoadingResults);
} }
function ListComponent_ng_container_32_dscribe_custom_template_host_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "dscribe-custom-template-host", 31);
    i0.ɵɵlistener("select", function ListComponent_ng_container_32_dscribe_custom_template_host_2_Template_dscribe_custom_template_host_select_0_listener() { const instance_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectRow(instance_r10)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const instance_r10 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(4, _c0$6, ctx_r1.getCustomTemplateWidth()))("isSelected", ctx_r1.selection.isSelected(instance_r10))("data", instance_r10)("entityTypeName", ctx_r1.entityType.Name);
} }
function ListComponent_ng_container_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 29);
    i0.ɵɵtemplate(2, ListComponent_ng_container_32_dscribe_custom_template_host_2_Template, 1, 6, "dscribe-custom-template-host", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.data);
} }
function ListComponent_dscribe_table_template_33_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "dscribe-table-template", 32);
    i0.ɵɵlistener("rowClick", function ListComponent_dscribe_table_template_33_Template_dscribe_table_template_rowClick_0_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectRow($event)); })("commentsClick", function ListComponent_dscribe_table_template_33_Template_dscribe_table_template_commentsClick_0_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showComments($event)); })("attachmentsClick", function ListComponent_dscribe_table_template_33_Template_dscribe_table_template_attachmentsClick_0_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showAttachments($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("data", ctx_r1.data)("columns", ctx_r1.columns)("displayedColumns", ctx_r1.displayedColumns)("selection", ctx_r1.selection);
} }
function ListComponent_section_35_mat_card_1_mat_tab_2_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(3, _c2$1, prop_r12.count ? "bold" : "normal"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", prop_r12.masterProperty.Title || prop_r12.masterProperty.Name, " (", prop_r12.count, ") ");
} }
function ListComponent_section_35_mat_card_1_mat_tab_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-tab");
    i0.ɵɵtemplate(1, ListComponent_section_35_mat_card_1_mat_tab_2_ng_template_1_Template, 2, 5, "ng-template", 34);
    i0.ɵɵelement(2, "dscribe-list", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r12 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("hideFilter", true)("entityType", prop_r12.masterProperty.EntityType)("masters", i0.ɵɵpureFunction1(3, _c1$4, prop_r12));
} }
function ListComponent_section_35_mat_card_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card")(1, "mat-tab-group");
    i0.ɵɵtemplate(2, ListComponent_section_35_mat_card_1_mat_tab_2_Template, 3, 5, "mat-tab", 7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.detailLists);
} }
function ListComponent_section_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 33);
    i0.ɵɵtemplate(1, ListComponent_section_35_mat_card_1_Template, 3, 1, "mat-card", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.detailLists && ctx_r1.detailLists.length);
} }
class ListComponent {
    constructor(metadataService, dataHandler, dialog, dscribeService, snackbarService, lobService) {
        this.metadataService = metadataService;
        this.dataHandler = dataHandler;
        this.dialog = dialog;
        this.dscribeService = dscribeService;
        this.snackbarService = snackbarService;
        this.lobService = lobService;
        this.initialSelection = [];
        this.allowMultiSelect = false;
        this.selection = new SelectionModel(this.allowMultiSelect, this.initialSelection);
        this.selectionChanged = new EventEmitter();
        this.navToggled = new EventEmitter();
        this.displayedColumns = [];
        this.columns = [];
        this.data = [];
        this.totalCount = 0;
        this.isLoadingResults = false;
        this.isDataConnected = false;
        this.userRefresh = new EventEmitter();
        this.pageSize = 10;
        this.displayMode = 'grid';
        this.filterCommands = [];
        this.listCommands = [];
        this.selection.changed.subscribe((x) => {
            if (x.added.length === 1) {
                this.selectDetails(x.added[0]);
            }
        }, (errors) => {
            // this.snackbarService.open(errors);
        });
    }
    ngOnInit() {
        FilterNode.factory = new FilterNodeFactory();
        this.dscribeService.getCommands().subscribe((commands) => {
            this.filterCommands = commands.filter(x => x.featureAreas === DscribeFeatureArea.Filter || (Array.isArray(x.featureAreas) && x.featureAreas.includes(DscribeFeatureArea.Filter)));
            this.listCommands = commands.filter(x => x.featureAreas === DscribeFeatureArea.List || (Array.isArray(x.featureAreas) && x.featureAreas.includes(DscribeFeatureArea.List)));
        }, (errors) => {
            this.snackbarService.open(errors);
        });
    }
    ngOnChanges(changes) {
        if (this.entityType) {
            if (this.entityType === this.displayedEntityType) {
                return;
            }
            if (this.filterVisible) {
                this.setFilterToEmpty();
            }
            this.customTemplate = EntityTypeTemplateMapper.get(this.entityType.Name);
            if (this.customTemplate) {
                this.displayMode = 'card';
            }
            else {
                this.displayMode = 'grid';
            }
            this.connectSort();
            this.displayedEntityType = this.entityType;
            this.refreshData();
            this.createColumns(this.entityType);
            this.lobService.getReports(this.displayedEntityType.Name)
                .subscribe(x => this.reports = x);
        }
    }
    ngAfterViewChecked() {
        if (this.entityType && this.table && this.table.sort != this.sort) {
            this.connectSort();
        }
    }
    connectSort() {
        if (this.table) {
            this.sort = this.table.sort;
        }
        else {
            this.sort = new MatSort();
        }
        this.sort.sort({ id: this.entityType.getPrimaryKey().Name, start: "desc", disableClear: false });
        this.sort.sortChange.subscribe(() => {
            this.paginator.pageIndex = 0;
            this.refreshData();
        });
    }
    createColumns(entityType) {
        this.detailLists = [];
        this.columns = [];
        this.displayedColumns = ['lobInfo'];
        for (const propertyName in entityType.Properties) {
            if (!entityType.Properties.hasOwnProperty(propertyName)) {
                continue;
            }
            const prop = entityType.Properties[propertyName];
            if (prop.DataType === DataTypes.NavigationList) {
                if (prop && prop.FacetValues && prop.FacetValues[KnownFacets.HideInList]) {
                    continue;
                }
                if (this.masters && this.masters.length) {
                    continue;
                }
                this.detailLists.push(new MasterReference(null, prop));
                continue;
            }
            this.columns.push(new ListColumn(prop.Name, prop.Title, prop.DataType, prop.EntityTypeName, prop.Behaviors));
            if (prop && prop.FacetValues && prop.FacetValues[KnownFacets.HideInList]) {
                continue;
            }
            if (this.masters) {
                const master = this.masters.find(m => m.masterProperty
                    && m.masterProperty.InverseProperty
                    && m.masterProperty.InverseProperty.ForeignKeyName === prop.Name);
                if (master) {
                    master.childList = this;
                    continue;
                }
            }
            this.displayedColumns.push(prop.Name);
        }
    }
    applyFilter(doNotRefres = false) {
        if (this.filterLambda) {
            this.userDefinedFilter = this.filterLambda.getStorageNode();
        }
        else {
            this.userDefinedFilter = null;
        }
        if (!doNotRefres) {
            this.refreshData();
        }
    }
    getCurrentFilters() {
        const filters = [];
        const masterDetail = LambdaHelper.getMasterDetailFilter(this.masters, this.entityType);
        if (masterDetail) {
            filters.push(masterDetail.getStorageNode());
        }
        if (this.userDefinedFilter) {
            filters.push(this.userDefinedFilter);
        }
        return filters;
    }
    refreshData() {
        if (this.addNEditStructure && this.addNEditStructure.listBehavior === ListBehaviors.SaveInObject) {
            this.data = [...this.addNEditStructure.currentEntity];
            this.paginator.pageIndex = 0;
            this.totalCount = this.data.length;
            return;
        }
        if (this.masters) {
            for (const master of this.masters) {
                master.count = null;
            }
        }
        this.isLoadingResults = true;
        this.paginator.pageIndex = 0;
        this.data = [];
        this.connectData();
        this.dataHandler.countByFilter(new EntityListRequest(this.entityType.Name, this.getCurrentFilters()))
            .subscribe((data) => {
            this.totalCount = data;
            if (this.masters) {
                for (const master of this.masters) {
                    master.count = this.totalCount;
                }
            }
            this.userRefresh.emit();
        }, (errors) => {
            this.snackbarService.open(errors);
            this.isLoadingResults = false;
        });
    }
    connectData() {
        if (this.isDataConnected) {
            return;
        }
        this.isDataConnected = true;
        merge(this.sort.sortChange, this.paginator.page, this.userRefresh)
            .pipe(startWith({}), switchMap(() => {
            this.isLoadingResults = true;
            const sort = [];
            if (this.sort.active && this.sort.direction && this.sort.active != this.entityType.getPrimaryKey().Name) {
                sort.push(SortItem.Create(this.sort.active, this.sort.direction === 'desc', this.entityType));
            }
            sort.push(SortItem.Create(this.entityType.getPrimaryKey().Name, true, this.entityType));
            return this.dataHandler.getByFilter(new EntityListRequest(this.entityType.Name, this.getCurrentFilters(), this.paginator.pageIndex * this.pageSize, this.pageSize, sort));
        }), map(data => {
            this.isLoadingResults = false;
            return data;
        }), catchError((errors) => {
            // this.snackbarService.open(errors);
            this.isLoadingResults = false;
            return of([]);
        })).subscribe((data) => {
            this.data = data;
            this.lobService.setLobInfo(this.entityType, data);
        }, (errors) => {
            // this.snackbarService.open(errors);
        });
    }
    onMasterChanged() {
        this.refreshData();
    }
    addNew() {
        const newEntity = this.dataHandler.getNewEntityForCreateDialog(this.entityType);
        if (this.masters) {
            for (const master of this.masters) {
                if (master.master
                    && master.masterProperty
                    && master.masterProperty.InverseProperty
                    && master.masterProperty.InverseProperty.ForeignKeyName) {
                    newEntity[master.masterProperty.InverseProperty.ForeignKeyName] = master.master.Id;
                }
            }
        }
        this.openAddNEditDialog(newEntity, true);
    }
    selectDetails(row) {
        if (this.detailLists && this.detailLists.length) {
            for (const detail of this.detailLists) {
                detail.master = row;
                if (detail.childList) {
                    detail.childList.onMasterChanged();
                }
            }
        }
    }
    manageComment() {
        const data = new LobListDialogData();
        data.entityTypeName = this.entityType.Name;
        data.identifier = this.selection.selected[0].Id;
        data.mode = ManageCommentModes.manage;
        const dialogRef = this.dialog.open(CommentsListComponent, {
            width: '800px',
            data,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe((res) => {
            this.refreshData();
        });
    }
    openAddNEditDialog(instance, isNew) {
        const action = isNew ? ManageEntityModes.Insert : ManageEntityModes.Update;
        const dialogRef = this.dialog.open(ListAddNEditDialogComponent, {
            width: '800px',
            data: {
                entity: instance,
                action: action,
                entityTypeName: this.entityType.Name,
                title: this.entityType.SingularTitle,
                masters: this.masters,
                addNEditStructure: this.addNEditStructure
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.action === action) {
                this.refreshData();
            }
        }, (errors) => {
            // this.snackbarService.open(errors);
        });
    }
    editSelectedRow() {
        this.openAddNEditDialog(this.selection.selected[0], false);
    }
    showHistory() {
        const dialogRef = this.dialog.open(DataHistoryComponent, {
            width: '90%',
            data: {
                entity: this.selection.selected[0],
                entityTypeName: this.entityType.Name,
                title: this.entityType.SingularTitle,
                masters: this.masters,
                addNEditStructure: this.addNEditStructure,
                columns: this.columns,
                displayedColumns: this.displayedColumns,
                historyType: 1,
            }
        });
        dialogRef.afterClosed().subscribe((res => {
        }));
    }
    deleteSelected() {
        const deleteDialogRef = this.dialog.open(ListDeleteDialogComponent, {
            width: '300px'
        });
        deleteDialogRef.componentInstance.inputs = {
            entityTypeName: this.entityType.Name,
            title: this.entityType.SingularTitle,
            selectedRow: this.selection.selected[0]
        };
        deleteDialogRef.afterClosed().subscribe((result) => {
            if (result === 'deleted') {
                this.refreshData();
            }
        }, (errors) => {
            // this.snackbarService.open(errors);
        });
    }
    selectRow(row) {
        if (this.selection.isSelected(row)) {
            this.selection.deselect(row);
            this.selectionChanged.emit(null);
            return;
        }
        if (!this.allowMultiSelect) {
            this.selection.clear();
        }
        this.selection.select(row);
        this.selectDetails(row);
        this.selectionChanged.emit(row);
    }
    get filterVisible() {
        return !!this.filterLambda;
    }
    set filterVisible(value) {
        const isFilterEmpty = this.filterLambda == null || this.filterLambda.isEmpty();
        if (value) {
            this.setFilterToEmpty();
        }
        else {
            this.filterLambda = null;
            this.applyFilter(isFilterEmpty);
        }
    }
    setFilterToEmpty() {
        this.filterLambda = new LambdaFilterNode(null, this.entityType, false);
        this.applyFilter(true);
    }
    toggleFilter() {
        this.filterVisible = !this.filterVisible;
    }
    getCustomTemplateWidth() {
        return `calc(${100 / this.customTemplate.options.perRow}% - 48px)`;
    }
    callFilterCommand(command) {
        command.callback({
            area: DscribeFeatureArea.Filter, sourceComponent: this
        });
    }
    callListCommand(command) {
        command.callback({
            area: DscribeFeatureArea.List, sourceComponent: this
        });
    }
    shouldDisplayCommand(command) {
        return !command.displayPredicate || command.displayPredicate({ component: this });
    }
    toggleNav() {
        this.navToggled.next();
    }
    showComments(row) {
        const pkName = this.entityType.getPrimaryKey().Name;
        this.dialog.open(CommentsListComponent, {
            width: '800px',
            data: {
                entityTypeName: this.displayedEntityType.Name,
                identifier: row[pkName],
                mode: ManageCommentModes.view
            }
        });
    }
    showAttachments(row) {
        const pkName = this.entityType.getPrimaryKey().Name;
        this.dialog.open(AttachmentsListComponent, {
            width: '800px',
            data: {
                entityTypeName: this.displayedEntityType.Name,
                identifier: row[pkName]
            }
        });
    }
    showReports() {
        const pkName = this.entityType.getPrimaryKey().Name;
        this.dialog.open(ReportsListComponent, {
            width: '800px',
            data: {
                entityTypeName: this.displayedEntityType.Name,
                identifier: this.selection.selected[0][pkName]
            }
        });
    }
    static { this.ɵfac = function ListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListComponent)(i0.ɵɵdirectiveInject(MetadataService), i0.ɵɵdirectiveInject(DataHandlerService), i0.ɵɵdirectiveInject(i1$2.MatDialog), i0.ɵɵdirectiveInject(DscribeService), i0.ɵɵdirectiveInject(SnackBarService), i0.ɵɵdirectiveInject(LobInfoService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListComponent, selectors: [["dscribe-list"]], viewQuery: function ListComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(MatPaginator, 7)(TableTemplateComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.paginator = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.table = _t.first);
        } }, inputs: { entityType: "entityType", masters: "masters", hideFilter: "hideFilter", addNEditStructure: "addNEditStructure", hasNav: "hasNav" }, outputs: { selectionChanged: "selectionChanged", navToggled: "navToggled" }, standalone: false, features: [i0.ɵɵNgOnChangesFeature], decls: 36, vars: 26, consts: [[1, "page-content"], [1, "table", "mat-elevation-z4"], [1, "table-actions"], ["mat-icon-button", "", "matTooltip", "Toggle NavBar", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "primary", 3, "click", "matTooltip"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled", "matTooltip"], ["mat-icon-button", "", "color", "warn", 3, "click", "disabled", "matTooltip"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Reports", 3, "click", "disabled"], ["class", "filter", 4, "ngIf"], [1, "list-container"], ["class", "table-loading-shade", 4, "ngIf"], [3, "ngSwitch"], [4, "ngSwitchCase"], [3, "data", "columns", "displayedColumns", "selection", "rowClick", "commentsClick", "attachmentsClick", 4, "ngSwitchDefault"], [1, "list-paginator", 3, "length", "pageSize"], ["class", "detail-section", 4, "ngIf"], ["mat-icon-button", "", "matTooltip", "Toggle NavBar", 3, "click"], [3, "command", "execute", 4, "ngIf"], [3, "execute", "command"], [3, "change", "checked", "matTooltip"], [1, "filter"], ["class", "filter__content", "style", "margin-bottom: 0;", 4, "ngIf"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Apply Filter", 3, "click"], [1, "filter__content", 2, "margin-bottom", "0"], [1, "manipulation-section__content"], [3, "node"], [1, "table-loading-shade"], [2, "display", "flex", "flex-wrap", "wrap"], ["style", "margin: 24px;", 3, "ngStyle", "isSelected", "data", "entityTypeName", "select", 4, "ngFor", "ngForOf"], [2, "margin", "24px", 3, "select", "ngStyle", "isSelected", "data", "entityTypeName"], [3, "rowClick", "commentsClick", "attachmentsClick", "data", "columns", "displayedColumns", "selection"], [1, "detail-section"], ["mat-tab-label", ""], [3, "hideFilter", "entityType", "masters"], [3, "ngStyle"]], template: function ListComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span");
            i0.ɵɵtemplate(4, ListComponent_button_4_Template, 3, 0, "button", 3);
            i0.ɵɵelementStart(5, "span");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div")(8, "button", 4);
            i0.ɵɵlistener("click", function ListComponent_Template_button_click_8_listener() { return ctx.addNew(); });
            i0.ɵɵelementStart(9, "mat-icon");
            i0.ɵɵtext(10, "add");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "button", 5);
            i0.ɵɵlistener("click", function ListComponent_Template_button_click_11_listener() { return ctx.editSelectedRow(); });
            i0.ɵɵelementStart(12, "mat-icon");
            i0.ɵɵtext(13, "edit");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "button", 6);
            i0.ɵɵlistener("click", function ListComponent_Template_button_click_14_listener() { return ctx.deleteSelected(); });
            i0.ɵɵelementStart(15, "mat-icon");
            i0.ɵɵtext(16, "delete");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "button", 6);
            i0.ɵɵlistener("click", function ListComponent_Template_button_click_17_listener() { return ctx.showHistory(); });
            i0.ɵɵelementStart(18, "mat-icon");
            i0.ɵɵtext(19, "history");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "button", 5);
            i0.ɵɵlistener("click", function ListComponent_Template_button_click_20_listener() { return ctx.manageComment(); });
            i0.ɵɵelementStart(21, "mat-icon");
            i0.ɵɵtext(22, "insert_comment");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(23, ListComponent_ng_container_23_Template, 2, 1, "ng-container", 7)(24, ListComponent_span_24_Template, 5, 4, "span", 8);
            i0.ɵɵelementStart(25, "button", 9);
            i0.ɵɵlistener("click", function ListComponent_Template_button_click_25_listener() { return ctx.showReports(); });
            i0.ɵɵelementStart(26, "mat-icon");
            i0.ɵɵtext(27, "class");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(28, ListComponent_div_28_Template, 5, 1, "div", 10);
            i0.ɵɵelementStart(29, "div", 11);
            i0.ɵɵtemplate(30, ListComponent_div_30_Template, 2, 1, "div", 12);
            i0.ɵɵelementContainerStart(31, 13);
            i0.ɵɵtemplate(32, ListComponent_ng_container_32_Template, 3, 1, "ng-container", 14)(33, ListComponent_dscribe_table_template_33_Template, 1, 4, "dscribe-table-template", 15);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelement(34, "mat-paginator", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(35, ListComponent_section_35_Template, 2, 1, "section", 17);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.hasNav);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate((ctx.entityType == null ? null : ctx.entityType.PluralTitle) || (ctx.entityType == null ? null : ctx.entityType.Name));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("matTooltip", i0.ɵɵinterpolate1("Add New ", ctx.entityType == null ? null : ctx.entityType.SingularTitle));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("matTooltip", i0.ɵɵinterpolate1("Edit Selected ", ctx.entityType == null ? null : ctx.entityType.SingularTitle))("disabled", !ctx.selection.hasValue());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("matTooltip", i0.ɵɵinterpolate1("Delete selected ", ctx.entityType == null ? null : ctx.entityType.SingularTitle))("disabled", !ctx.selection.hasValue());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("matTooltip", i0.ɵɵinterpolate1("Show ", ctx.entityType == null ? null : ctx.entityType.SingularTitle, " history"))("disabled", !ctx.selection.hasValue());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("matTooltip", i0.ɵɵinterpolate1("Comment for selected ", ctx.entityType == null ? null : ctx.entityType.SingularTitle))("disabled", !ctx.selection.hasValue());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.listCommands);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.hideFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", !ctx.selection.hasValue() || !(ctx.reports == null ? null : ctx.reports.length));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.filterVisible);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.isLoadingResults);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitch", ctx.displayMode);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "card");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("length", ctx.totalCount)("pageSize", ctx.pageSize);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selection.hasValue());
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i1$3.NgStyle, i1$3.NgSwitch, i1$3.NgSwitchCase, i1$3.NgSwitchDefault, i5.MatIconButton, i9$2.MatButtonToggle, i7.MatCard, i6.MatIcon, i7$1.MatPaginator, i13.MatProgressSpinner, i14.MatTabLabel, i14.MatTab, i14.MatTabGroup, i11.MatTooltip, CustomTemplateHostComponent, FilterNodeComponent, ListComponent, TableTemplateComponent, CommandButtonComponent], styles: [".list-container{position:relative}.list-table-container{position:relative;height:536px;overflow:auto;border:1px solid #d1d8dd;border-bottom:none;border-top:none}.filter{border:1px solid #d1d8dd;border-top:none;display:flex;flex-flow:row}.filter__content{flex-grow:1}.filter__summary button{margin:0 8px}.filter__summary{display:flex}.filter__content{border-top:1px solid #d1d8dd}.list-paginator{border:1px solid #d1d8dd;border-top:none}\n"], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-list', encapsulation: ViewEncapsulation.None, template: "<div class=\"page-content\">\r\n\t<div class=\"table mat-elevation-z4\">\r\n\t\t<div class=\"table-actions\">\r\n\t\t\t<span>\r\n\t\t\t\t<button mat-icon-button *ngIf=\"hasNav\" (click)=\"toggleNav()\" matTooltip=\"Toggle NavBar\">\r\n\t\t\t\t\t<mat-icon>more_vert</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<span>{{entityType?.PluralTitle || entityType?.Name}}</span>\r\n\t\t\t</span>\r\n\t\t\t<div>\r\n\t\t\t\t<button mat-icon-button (click)=\"addNew()\" color=\"primary\" matTooltip=\"Add New {{entityType?.SingularTitle}}\">\r\n\t\t\t\t\t<mat-icon>add</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button [disabled]=\"!selection.hasValue()\" mat-icon-button (click)=\"editSelectedRow()\" color=\"primary\" matTooltip=\"Edit Selected {{entityType?.SingularTitle}}\">\r\n\t\t\t\t\t<mat-icon>edit</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button [disabled]=\"!selection.hasValue()\" mat-icon-button (click)=\"deleteSelected()\" color=\"warn\" matTooltip=\"Delete selected {{entityType?.SingularTitle}}\">\r\n\t\t\t\t\t<mat-icon>delete</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button [disabled]=\"!selection.hasValue()\" mat-icon-button (click)=\"showHistory()\" color=\"warn\" matTooltip=\"Show {{entityType?.SingularTitle}} history\">\r\n\t\t\t\t\t<mat-icon>history</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button [disabled]=\"!selection.hasValue()\" mat-icon-button (click)=\"manageComment()\" color=\"primary\" matTooltip=\"Comment for selected {{entityType?.SingularTitle}}\">\r\n\t\t\t\t\t<mat-icon>insert_comment</mat-icon>\r\n\t\t\t\t</button>\r\n\r\n\t\t\t\t<ng-container *ngFor=\"let command of listCommands\">\r\n\t\t\t\t\t<dscribe-command-button\r\n\t\t\t\t\t\t[command]=\"command\"\r\n\t\t\t\t\t\t*ngIf=\"shouldDisplayCommand(command)\"\r\n\t\t\t\t\t\t(execute)=\"callListCommand(command)\">\r\n\t\t\t\t\t</dscribe-command-button>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<span *ngIf=\"!hideFilter\">\r\n\t\t\t\t\t<mat-button-toggle (change)=\"toggleFilter()\" [checked]=\"filterVisible\" matTooltip=\"{{filterVisible ? 'Hide' : 'Show'}} Filter\">\r\n\t\t\t\t\t\t<mat-icon>filter_list</mat-icon>\r\n\t\t\t\t\t</mat-button-toggle>\r\n\t\t\t\t\t<ng-container *ngFor=\"let command of filterCommands\">\r\n\t\t\t\t\t\t<dscribe-command-button\r\n\t\t\t\t\t\t\t[command]=\"command\"\r\n\t\t\t\t\t\t\t*ngIf=\"shouldDisplayCommand(command)\"\r\n\t\t\t\t\t\t\t(execute)=\"callFilterCommand(command)\">\r\n\t\t\t\t\t\t</dscribe-command-button>\r\n\t\t\t\t\t</ng-container>\r\n\t\t\t\t</span>\r\n\t\t\t\t<button [disabled]=\"!selection.hasValue() || !reports?.length\" mat-icon-button (click)=\"showReports()\" color=\"accent\"\r\n\t\t\t\t matTooltip=\"Reports\">\r\n\t\t\t\t\t<mat-icon>class</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"filter\" *ngIf=\"filterVisible\">\r\n\t\t\t<div class=\"filter__content\" *ngIf=\"filterLambda\" style=\"margin-bottom: 0;\">\r\n\t\t\t\t<div class=\"manipulation-section__content\">\r\n\t\t\t\t\t<dscribe-filter-node [node]=\"filterLambda\"></dscribe-filter-node>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<button mat-icon-button color=\"accent\" (click)=\"applyFilter()\" matTooltip=\"Apply Filter\">\r\n\t\t\t\t<mat-icon>done_outline</mat-icon>\r\n\t\t\t</button>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"list-container\">\r\n\t\t\t<div class=\"table-loading-shade\" *ngIf=\"isLoadingResults\">\r\n\t\t\t\t<mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\r\n\t\t\t</div>\r\n\t\t\t<ng-container [ngSwitch]=\"displayMode\">\r\n\t\t\t\t<ng-container *ngSwitchCase=\"'card'\">\r\n\t\t\t\t\t<div style=\"display: flex; flex-wrap: wrap\">\r\n\t\t\t\t\t\t<dscribe-custom-template-host [ngStyle]=\"{'width': getCustomTemplateWidth()}\" style=\"margin: 24px;\" *ngFor=\"let instance of data\"\r\n\t\t\t\t\t\t (select)=\"selectRow(instance)\" [isSelected]=\"selection.isSelected(instance)\" [data]=\"instance\" [entityTypeName]=\"entityType.Name\">\r\n\r\n\t\t\t\t\t\t</dscribe-custom-template-host>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</ng-container>\r\n\t\t\t\t<dscribe-table-template *ngSwitchDefault (rowClick)=\"selectRow($event)\" [data]=\"data\" [columns]=\"columns\"\r\n\t\t\t\t [displayedColumns]=\"displayedColumns\" [selection]=\"selection\" (commentsClick)=\"showComments($event)\"\r\n\t\t\t\t (attachmentsClick)=\"showAttachments($event)\">\r\n\t\t\t\t</dscribe-table-template>\r\n\t\t\t</ng-container>\r\n\t\t\t<mat-paginator class=\"list-paginator\" [length]=\"totalCount\" [pageSize]=\"pageSize\"></mat-paginator>\r\n\t\t</div>\r\n\r\n\t\t<section class=\"detail-section\" *ngIf=\"selection.hasValue()\">\r\n\t\t\t<mat-card *ngIf=\"detailLists && detailLists.length\">\r\n\t\t\t\t<mat-tab-group>\r\n\t\t\t\t\t<mat-tab *ngFor=\"let prop of detailLists\">\r\n\t\t\t\t\t\t<ng-template mat-tab-label>\r\n\t\t\t\t\t\t\t<span [ngStyle]=\"{'font-weight': prop.count ? 'bold' : 'normal'}\">\r\n\t\t\t\t\t\t\t\t{{prop.masterProperty.Title || prop.masterProperty.Name}} ({{prop.count}})\r\n\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t</ng-template>\r\n\t\t\t\t\t\t<dscribe-list [hideFilter]=\"true\" [entityType]=\"prop.masterProperty.EntityType\" [masters]=\"[prop]\">\r\n\t\t\t\t\t\t</dscribe-list>\r\n\t\t\t\t\t</mat-tab>\r\n\t\t\t\t</mat-tab-group>\r\n\t\t\t</mat-card>\r\n\t\t</section>\r\n\r\n\t</div>\r\n</div>\r\n", styles: [".list-container{position:relative}.list-table-container{position:relative;height:536px;overflow:auto;border:1px solid #d1d8dd;border-bottom:none;border-top:none}.filter{border:1px solid #d1d8dd;border-top:none;display:flex;flex-flow:row}.filter__content{flex-grow:1}.filter__summary button{margin:0 8px}.filter__summary{display:flex}.filter__content{border-top:1px solid #d1d8dd}.list-paginator{border:1px solid #d1d8dd;border-top:none}\n"] }]
    }], () => [{ type: MetadataService }, { type: DataHandlerService }, { type: i1$2.MatDialog }, { type: DscribeService }, { type: SnackBarService }, { type: LobInfoService }], { entityType: [{
            type: Input
        }], masters: [{
            type: Input
        }], hideFilter: [{
            type: Input
        }], addNEditStructure: [{
            type: Input
        }], hasNav: [{
            type: Input
        }], selectionChanged: [{
            type: Output
        }], navToggled: [{
            type: Output
        }], paginator: [{
            type: ViewChild,
            args: [MatPaginator, { static: true }]
        }], table: [{
            type: ViewChild,
            args: [TableTemplateComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListComponent, { className: "ListComponent", filePath: "lib/list/list/list.component.ts", lineNumber: 52 }); })();

function DscribeListTemplate(data) {
    return function (constructor) {
        EntityTypeTemplateMapper.register(data.entityTypeName, { component: constructor, options: data.options });
    };
}

class AppManagementService {
    constructor(http, dscribeService) {
        this.http = http;
        this.dscribeService = dscribeService;
        this.GetAppInstancesInfoApi = this.dscribeService.url('api/AppManagement/GetAppInstancesInfo');
        this.GetDatabaseProvidersApi = this.dscribeService.url('api/AppManagement/GetDatabaseProviders');
        this.AddAppInstanceApi = this.dscribeService.url('api/AppManagement/AddAppInstance');
        this.EditAppInstanceApi = this.dscribeService.url('api/AppManagement/EditAppInstance');
        this.DeleteAppInstanceApi = this.dscribeService.url('api/AppManagement/DeleteAppInstance');
        this.GetAppTypesApi = this.dscribeService.url('api/AppManagement/GetAppTypes');
        this.AddAppTypeApi = this.dscribeService.url('api/AppManagement/AddAppType');
        this.EditAppTypeApi = this.dscribeService.url('api/AppManagement/EditAppType');
        this.DeleteAppTypeApi = this.dscribeService.url('api/AppManagement/DeleteAppType');
    }
    deleteAppType(appType) {
        return this.http.post(this.DeleteAppTypeApi, appType);
    }
    editAppType(appType) {
        return this.http.post(this.EditAppTypeApi, appType);
    }
    addAppType(appType) {
        return this.http.post(this.AddAppTypeApi, appType);
    }
    getAppTypes() {
        return this.http.get(this.GetAppTypesApi);
    }
    deleteAppInstance(appInstance) {
        return this.http.post(this.DeleteAppInstanceApi, appInstance);
    }
    getAppInstancesInfo() {
        return this.http.post(this.GetAppInstancesInfoApi, null);
    }
    getDatabaseProviders() {
        return this.http.get(this.GetDatabaseProvidersApi);
    }
    addAppInstance(appInstance) {
        return this.http.post(this.AddAppInstanceApi, appInstance);
    }
    editAppInstance(appInstance) {
        return this.http.post(this.EditAppInstanceApi, appInstance);
    }
    static { this.ɵfac = function AppManagementService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppManagementService)(i0.ɵɵinject(DscribeHttpClient), i0.ɵɵinject(DscribeService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AppManagementService, factory: AppManagementService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppManagementService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: DscribeHttpClient }, { type: DscribeService }], null); })();

class AppInstanceModel {
}

class AppInstanceInformation {
}

class ConfirmationDialogData {
    constructor(title, message) {
        this.title = title;
        this.message = message;
    }
}

class ConfirmationDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    static Ask(dialog, title, message = null) {
        const dialogRef = dialog.open(ConfirmationDialogComponent, {
            width: '300px',
            data: new ConfirmationDialogData(title, message)
        });
        return dialogRef.afterClosed().pipe(map(x => !!x));
    }
    ngOnInit() {
    }
    accept() {
        this.dialogRef.close(true);
    }
    cancel() {
        this.dialogRef.close();
    }
    static { this.ɵfac = function ConfirmationDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ConfirmationDialogComponent)(i0.ɵɵdirectiveInject(i1$2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ConfirmationDialogComponent, selectors: [["dscribe-confirmation-dialog"]], standalone: false, decls: 11, vars: 2, consts: [["mat-dialog-title", ""], ["mat-icon-button", "", 3, "click"], ["color", "primary"], ["color", "warn"]], template: function ConfirmationDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h1", 0);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "mat-dialog-content");
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "mat-dialog-actions")(5, "button", 1);
            i0.ɵɵlistener("click", function ConfirmationDialogComponent_Template_button_click_5_listener() { return ctx.accept(); });
            i0.ɵɵelementStart(6, "mat-icon", 2);
            i0.ɵɵtext(7, "done");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "button", 1);
            i0.ɵɵlistener("click", function ConfirmationDialogComponent_Template_button_click_8_listener() { return ctx.cancel(); });
            i0.ɵɵelementStart(9, "mat-icon", 3);
            i0.ɵɵtext(10, "cancel");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.data.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.data.message || ctx.data.title, "\n");
        } }, dependencies: [i5.MatIconButton, i1$2.MatDialogTitle, i1$2.MatDialogActions, i1$2.MatDialogContent, i6.MatIcon], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConfirmationDialogComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-confirmation-dialog', template: "<h1 mat-dialog-title>{{data.title}}</h1>\r\n<mat-dialog-content>\r\n\t{{data.message || data.title}}\r\n</mat-dialog-content>\r\n<mat-dialog-actions>\r\n\t<button mat-icon-button (click)=\"accept()\">\r\n\t\t<mat-icon color=\"primary\">done</mat-icon>\r\n\t</button>\r\n\t<button mat-icon-button (click)=\"cancel()\">\r\n\t\t<mat-icon color=\"warn\">cancel</mat-icon>\r\n\t</button>\r\n</mat-dialog-actions>\r\n" }]
    }], () => [{ type: i1$2.MatDialogRef }, { type: ConfirmationDialogData, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ConfirmationDialogComponent, { className: "ConfirmationDialogComponent", filePath: "lib/common/confirmation-dialog/confirmation-dialog.component.ts", lineNumber: 13 }); })();

class DscribeInterceptor {
    constructor(config) {
        this.config = config;
    }
    intercept(req, next) {
        let headers = req.headers || new HttpHeaders();
        // TODO: this should not be hardcoded
        headers = headers.set('Content-Type', 'application/json');
        if (this.config && this.config.authHeaderFetcher && this.config.authHeaderFetcher()) {
            headers = headers.set('Authorization', this.config.authHeaderFetcher());
        }
        const newReq = req.clone({ headers });
        return next.handle(newReq).pipe(catchError(this.handleError));
    }
    handleError(error) {
        if (error.status === 500) {
            return throwError(error);
        }
        else if (error.status === 400) {
            return throwError(error);
        }
        else {
            return throwError(error.statusText);
        }
    }
    static { this.ɵfac = function DscribeInterceptor_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DscribeInterceptor)(i0.ɵɵinject(DscribeService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DscribeInterceptor, factory: DscribeInterceptor.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DscribeInterceptor, [{
        type: Injectable
    }], () => [{ type: DscribeService }], null); })();

class DscribeComponent {
    set authHeaderFetcher(value) {
        this.config.authHeaderFetcher = value;
    }
    set username(value) {
        this.config.username = value;
    }
    constructor(config) {
        this.config = config;
        this.loggedOut = new EventEmitter();
        config.loggedOut.subscribe(() => {
            this.loggedOut.next();
        });
    }
    static { this.ɵfac = function DscribeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DscribeComponent)(i0.ɵɵdirectiveInject(DscribeService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DscribeComponent, selectors: [["dscribe-root"]], inputs: { authHeaderFetcher: "authHeaderFetcher", username: "username" }, outputs: { loggedOut: "loggedOut" }, standalone: false, decls: 1, vars: 0, template: function DscribeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "router-outlet");
        } }, dependencies: [i2$1.RouterOutlet], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DscribeComponent, [{
        type: Component,
        args: [{
                standalone: false,
                selector: 'dscribe-root',
                template: `
		<router-outlet></router-outlet>
	`
            }]
    }], () => [{ type: DscribeService }], { authHeaderFetcher: [{
            type: Input
        }], username: [{
            type: Input
        }], loggedOut: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DscribeComponent, { className: "DscribeComponent", filePath: "lib/dscribe.component.ts", lineNumber: 11 }); })();

let LocalFacetModel$1 = class LocalFacetModel {
};
class EntityTypeBase {
    static { this.fields = [
        { title: 'Name', name: 'Name', dataType: 'string' },
        { title: 'Schema', name: 'SchemaName', dataType: 'string' },
        { title: 'Plural Title', name: 'PluralTitle', dataType: 'string' },
        { title: 'Singular Title', name: 'SingularTitle', dataType: 'string' },
        {
            title: 'Usage Category',
            name: 'EntityTypeGeneralUsageCategoryId',
            dataType: 'entityCategory'
        },
        { title: 'Code Path', name: 'CodePath', dataType: 'string' },
        {
            title: 'Display Name Path',
            name: 'DisplayNamePath',
            dataType: 'string'
        },
    ]; }
}

class MetadataManagementApiClient {
    constructor(http, dscribeService) {
        this.http = http;
        this.dscribeService = dscribeService;
        this.managementAPI = this.dscribeService.url('api/ManageMetadata/');
        this.releaseAPI = this.dscribeService.url('api/ReleaseMetadata/');
        this.getEntityTypesAPI = this.managementAPI + 'getEntityTypes';
        this.getPropertiesAPI = this.managementAPI + 'getProperties';
        this.getBasicInfoAPI = this.managementAPI + 'getBasicInfo';
        this.getEntityTypeFacetsAPI = this.managementAPI + 'getEntityTypeFacets';
        this.getPropertyFacetsAPI = this.managementAPI + 'getPropertyFacets';
        this.getAllPropertyNamesAPI = this.managementAPI + 'getAllPropertyNames';
        this.addEntityTypeAPI = this.managementAPI + 'addEntityType';
        this.editEntityTypeAPI = this.managementAPI + 'editEntityType';
        this.addPropertyAPI = this.managementAPI + 'addProperty';
        this.editPropertyAPI = this.managementAPI + 'editProperty';
        this.getPropertyForEditAPI = this.managementAPI + 'getPropertyForEdit';
        this.releaseMetadataAPI = this.releaseAPI + 'releaseMetadata';
        this.generateCodeAPI = this.releaseAPI + 'generateCode';
    }
    addEntityType(entityType) {
        return this.http.post(this.addEntityTypeAPI, entityType);
    }
    editEntityType(entityType) {
        return this.http.post(this.editEntityTypeAPI, entityType);
    }
    deleteEntityType(entityType) {
        return this.http.post(this.managementAPI + 'deleteEntityType', entityType);
    }
    addProperty(property) {
        return this.http.post(this.addPropertyAPI, property);
    }
    getPropertyForEdit(propertyId) {
        return this.http.post(this.getPropertyForEditAPI, { propertyId: propertyId });
    }
    editProperty(property) {
        return this.http.post(this.editPropertyAPI, property);
    }
    getBasicInfo() {
        return this.http.post(this.getBasicInfoAPI, {});
    }
    getEntityTypes() {
        return this.http.post(this.getEntityTypesAPI, {});
    }
    manageEntityTypes(action, type) {
        return this.http.post(this.managementAPI + action + 'Type', type);
    }
    getEntityTypeFacets() {
        return this.http.post(this.getEntityTypeFacetsAPI, {});
    }
    getProperties(entityTypeId) {
        return this.http.post(this.getPropertiesAPI, { entityTypeId: entityTypeId });
    }
    manageProperty(action, property) {
        return this.http.post(this.managementAPI + action + 'Property', property);
    }
    deleteProperty(property) {
        return this.http.post(this.managementAPI + 'deleteProperty', property);
    }
    getPropertyFacets(typeName) {
        return this.http.post(this.getPropertyFacetsAPI, { typeName: typeName });
    }
    getAllPropertiesInfo() {
        return this.http.post(this.getAllPropertyNamesAPI, {});
    }
    releaseMetadata(request) {
        return this.http.post(this.releaseMetadataAPI, request);
    }
    generateCode() {
        return this.http.post(this.generateCodeAPI, null);
    }
    static { this.ɵfac = function MetadataManagementApiClient_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MetadataManagementApiClient)(i0.ɵɵinject(DscribeHttpClient), i0.ɵɵinject(DscribeService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MetadataManagementApiClient, factory: MetadataManagementApiClient.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MetadataManagementApiClient, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: DscribeHttpClient }, { type: DscribeService }], null); })();

class AddNEditEntityTypeComponentData {
    constructor(entityType, isNew, basicInfo) {
        this.entityType = entityType;
        this.isNew = isNew;
        this.basicInfo = basicInfo;
    }
    get action() {
        return this.isNew ? 'Add' : 'Edit';
    }
}

function AddNEditEntityTypeComponent_p_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r2, " ");
} }
function AddNEditEntityTypeComponent_p_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r3, " ");
} }
function AddNEditEntityTypeComponent_p_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r4, " ");
} }
function AddNEditEntityTypeComponent_p_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r5, " ");
} }
function AddNEditEntityTypeComponent_p_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r6, " ");
} }
function AddNEditEntityTypeComponent_mat_option_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", category_r7.Id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", category_r7.Name, " ");
} }
function AddNEditEntityTypeComponent_p_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r8, " ");
} }
function AddNEditEntityTypeComponent_mat_card_36_div_3_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 23);
    i0.ɵɵlistener("click", function AddNEditEntityTypeComponent_mat_card_36_div_3_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const facetType_r10 = i0.ɵɵnextContext().$implicit; const ctx_r10 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r10.changeFacetValue(facetType_r10)); });
    i0.ɵɵelementStart(1, "mat-icon", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const facetType_r10 = i0.ɵɵnextContext().$implicit;
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r10.setFacetCheckIcon(facetType_r10));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r10.getFacetName(facetType_r10), " ");
} }
function AddNEditEntityTypeComponent_mat_card_36_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, AddNEditEntityTypeComponent_mat_card_36_div_3_button_1_Template, 4, 2, "button", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const facetType_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", facetType_r10.Default);
} }
function AddNEditEntityTypeComponent_mat_card_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card", 20)(1, "h5", 21);
    i0.ɵɵtext(2, "Facets");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, AddNEditEntityTypeComponent_mat_card_36_div_3_Template, 2, 1, "div", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r10.basicInfo.EntityTypeFacetDefinitions);
} }
function AddNEditEntityTypeComponent_p_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r12 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r12, " ");
} }
function AddNEditEntityTypeComponent_p_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r13 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r13, " ");
} }
function AddNEditEntityTypeComponent_button_48_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 23);
    i0.ɵɵlistener("click", function AddNEditEntityTypeComponent_button_48_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.save()); });
    i0.ɵɵelementStart(1, "mat-icon", 24);
    i0.ɵɵtext(2, "save");
    i0.ɵɵelementEnd()();
} }
function AddNEditEntityTypeComponent_button_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵelement(1, "mat-spinner", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("diameter", 20);
} }
class AddNEditEntityTypeComponent {
    constructor(dialogRef, data, apiClient, snackbarService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.apiClient = apiClient;
        this.snackbarService = snackbarService;
        this.entityType = new EntityTypeBase();
        this.submitLoading = false;
        this.entityType = this.data.entityType;
        this.basicInfo = data.basicInfo;
        if (!this.data.isNew) {
            this.data.basicInfo.EntityTypeFacetDefinitions = [];
            this.setDefaultFacetValues();
        }
    }
    ngOnInit() {
    }
    setDefaultFacetValues() {
        const currentGeneralUsageCategory = this.data.basicInfo.EntityTypeGeneralUsageCategories
            .find(x => x.Id === this.data.entityType.EntityTypeGeneralUsageCategoryId);
        this.basicInfo.EntityTypeFacetDefinitions.forEach((x) => {
            if (this.data.basicInfo.DefaultEntityTypeFacetValues[currentGeneralUsageCategory.Name]) {
                x.Default = this.data.basicInfo.DefaultEntityTypeFacetValues[currentGeneralUsageCategory.Name][x.Name];
            }
        });
        this.setEntityTypeFacetDefinitions();
    }
    setFacetCheckIcon(facetType) {
        if (this.data.entityType.LocalFacets) {
            const localFacet = this.data.entityType.LocalFacets.find(x => x.FacetName === facetType.Name);
            if (localFacet) {
                if (localFacet.Value.toLowerCase() === 'false') {
                    return 'check_box_outline_blank';
                }
                else if (localFacet.Value.toLowerCase() === 'true') {
                    return 'check_box';
                }
            }
        }
        if (facetType.Default) {
            if (facetType.Default.toLowerCase() === 'false') {
                return 'check_box_outline_blank';
            }
            else if (facetType.Default.toLowerCase() === 'true') {
                return 'check_box';
            }
        }
        if (facetType.Default === undefined) {
            return 'check_box_outline_blank';
        }
    }
    getFacetName(facetType) {
        if (!this.data.entityType.LocalFacets) {
            this.data.entityType.LocalFacets = [];
        }
        const localFacet = this.data.entityType.LocalFacets.find(x => x.FacetName === facetType.Name);
        if (localFacet) {
            if (localFacet.FacetName === facetType.Name) {
                return facetType.Name;
            }
        }
        return facetType.Name + ' ( Default )';
    }
    changeFacetValue(facetType) {
        const localFacet = this.data.entityType.LocalFacets.find(x => x.FacetName === facetType.Name);
        if (!localFacet) {
            this.data.entityType.LocalFacets.push({
                FacetName: facetType.Name,
                Value: 'False'
            });
        }
        else {
            if (localFacet) {
                if (localFacet.Value.toLowerCase() === 'false') {
                    localFacet.Value = 'True';
                }
                else if (localFacet.Value.toLowerCase() === 'true') {
                    const index = this.data.entityType.LocalFacets.indexOf(localFacet);
                    this.data.entityType.LocalFacets.splice(index, 1);
                }
            }
        }
    }
    setEntityTypeFacetDefinitions() {
        this.basicInfo.EntityTypeFacetDefinitions = [];
        const generalUsageCategory = this.basicInfo.EntityTypeGeneralUsageCategories.find(x => x.Id === this.entityType.EntityTypeGeneralUsageCategoryId);
        if (generalUsageCategory) {
            for (const g in this.basicInfo.DefaultEntityTypeFacetValues[generalUsageCategory.Name]) {
                if (generalUsageCategory) {
                    let id = 0;
                    this.basicInfo.EntityTypeFacetDefinitions.push({
                        Id: ++id,
                        Default: this.basicInfo.DefaultEntityTypeFacetValues[generalUsageCategory.Name][g],
                        Name: g,
                        DataType: ''
                    });
                }
            }
        }
    }
    save() {
        this.submitLoading = true;
        const request = (this.data.isNew) ?
            this.apiClient.addEntityType(this.entityType) :
            this.apiClient.editEntityType(this.entityType);
        request.subscribe((data) => {
            this.dialogRef.close('saved');
            this.submitLoading = false;
        }, (error) => {
            this.entityTypeError = error.error.errors;
            this.snackbarService.open(error.statusText);
            this.submitLoading = false;
        });
    }
    cancel() {
        this.dialogRef.close();
    }
    static { this.ɵfac = function AddNEditEntityTypeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AddNEditEntityTypeComponent)(i0.ɵɵdirectiveInject(i1$2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA), i0.ɵɵdirectiveInject(MetadataManagementApiClient), i0.ɵɵdirectiveInject(SnackBarService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AddNEditEntityTypeComponent, selectors: [["dscribe-add-n-edit-entity-type"]], standalone: false, decls: 53, vars: 23, consts: [["entityTypeForm", "ngForm"], ["mat-dialog-title", ""], ["appearance", "outline", 1, "full-width"], ["matInput", "", "type", "text", "placeholder", "Name", "name", "name", "required", "", 3, "ngModelChange", "ngModel"], ["class", "form-error-message", 4, "ngFor", "ngForOf"], ["matInput", "", "type", "text", "placeholder", "Table Name", "name", "tableName", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "text", "placeholder", "Singular Title", "name", "singular", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "text", "placeholder", "Plural Title", "name", "plural", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "text", "placeholder", "Schema", "name", "schema", 3, "ngModelChange", "ngModel"], ["name", "usage", "placeholder", "General Usage Category", 3, "ngModelChange", "selectionChange", "ngModel", "required"], [3, "value", 4, "ngFor", "ngForOf"], ["style", "margin-bottom: 10px", 4, "ngIf"], ["matInput", "", "type", "text", "placeholder", "Code Path", "name", "code", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "text", "placeholder", "Display Name Path", "name", "displayName", 3, "ngModelChange", "ngModel"], ["mat-icon-button", "", 3, "click", 4, "ngIf"], ["mat-icon-button", "", 4, "ngIf"], ["mat-icon-button", "", 3, "click", "disabled"], ["color", "warn"], [1, "form-error-message"], [3, "value"], [2, "margin-bottom", "10px"], [2, "color", "gray"], [4, "ngFor", "ngForOf"], ["mat-icon-button", "", 3, "click"], ["color", "primary"], ["mat-icon-button", ""], ["color", "accent", 2, "margin-left", "10px", 3, "diameter"]], template: function AddNEditEntityTypeComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "h1", 1);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "mat-dialog-content")(3, "form", null, 0)(5, "mat-form-field", 2)(6, "mat-label");
            i0.ɵɵtext(7, "Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 3);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditEntityTypeComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.entityType.Name, $event) || (ctx.entityType.Name = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, AddNEditEntityTypeComponent_p_9_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "mat-form-field", 2)(11, "mat-label");
            i0.ɵɵtext(12, "Table Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "input", 5);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditEntityTypeComponent_Template_input_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.entityType.TableName, $event) || (ctx.entityType.TableName = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(14, AddNEditEntityTypeComponent_p_14_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "mat-form-field", 2)(16, "mat-label");
            i0.ɵɵtext(17, "Singular Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "input", 6);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditEntityTypeComponent_Template_input_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.entityType.SingularTitle, $event) || (ctx.entityType.SingularTitle = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(19, AddNEditEntityTypeComponent_p_19_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "mat-form-field", 2)(21, "mat-label");
            i0.ɵɵtext(22, "Plural Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "input", 7);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditEntityTypeComponent_Template_input_ngModelChange_23_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.entityType.PluralTitle, $event) || (ctx.entityType.PluralTitle = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(24, AddNEditEntityTypeComponent_p_24_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "mat-form-field", 2)(26, "mat-label");
            i0.ɵɵtext(27, "Schema");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "input", 8);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditEntityTypeComponent_Template_input_ngModelChange_28_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.entityType.SchemaName, $event) || (ctx.entityType.SchemaName = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(29, AddNEditEntityTypeComponent_p_29_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "mat-form-field", 2)(31, "mat-label");
            i0.ɵɵtext(32, "General Usage Category");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "mat-select", 9);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditEntityTypeComponent_Template_mat_select_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.entityType.EntityTypeGeneralUsageCategoryId, $event) || (ctx.entityType.EntityTypeGeneralUsageCategoryId = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("selectionChange", function AddNEditEntityTypeComponent_Template_mat_select_selectionChange_33_listener() { return ctx.setEntityTypeFacetDefinitions(); });
            i0.ɵɵtemplate(34, AddNEditEntityTypeComponent_mat_option_34_Template, 2, 2, "mat-option", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(35, AddNEditEntityTypeComponent_p_35_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(36, AddNEditEntityTypeComponent_mat_card_36_Template, 4, 1, "mat-card", 11);
            i0.ɵɵelementStart(37, "mat-form-field", 2)(38, "mat-label");
            i0.ɵɵtext(39, "Code Path");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "input", 12);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditEntityTypeComponent_Template_input_ngModelChange_40_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.entityType.CodePath, $event) || (ctx.entityType.CodePath = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(41, AddNEditEntityTypeComponent_p_41_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "mat-form-field", 2)(43, "mat-label");
            i0.ɵɵtext(44, "Display Name Path");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "input", 13);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditEntityTypeComponent_Template_input_ngModelChange_45_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.entityType.DisplayNamePath, $event) || (ctx.entityType.DisplayNamePath = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(46, AddNEditEntityTypeComponent_p_46_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(47, "mat-dialog-actions");
            i0.ɵɵtemplate(48, AddNEditEntityTypeComponent_button_48_Template, 3, 0, "button", 14)(49, AddNEditEntityTypeComponent_button_49_Template, 2, 1, "button", 15);
            i0.ɵɵelementStart(50, "button", 16);
            i0.ɵɵlistener("click", function AddNEditEntityTypeComponent_Template_button_click_50_listener() { return ctx.cancel(); });
            i0.ɵɵelementStart(51, "mat-icon", 17);
            i0.ɵɵtext(52, "cancel");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("", ctx.data.isNew ? "New" : "Edit", " Entity Type");
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.entityType.Name);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.entityTypeError == null ? null : ctx.entityTypeError.Name);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.entityType.TableName);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.entityTypeError == null ? null : ctx.entityTypeError.TableName);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.entityType.SingularTitle);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.entityTypeError == null ? null : ctx.entityTypeError.SingularTitle);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.entityType.PluralTitle);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.entityTypeError == null ? null : ctx.entityTypeError.PluralTitle);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.entityType.SchemaName);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.entityTypeError == null ? null : ctx.entityTypeError.SchemaName);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.entityType.EntityTypeGeneralUsageCategoryId);
            i0.ɵɵproperty("required", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.data.basicInfo.EntityTypeGeneralUsageCategories);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.entityTypeError == null ? null : ctx.entityTypeError.EntityTypeGeneralUsageCategoryId);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.entityType.EntityTypeGeneralUsageCategoryId);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.entityType.CodePath);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.entityTypeError == null ? null : ctx.entityTypeError.CodePath);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.entityType.DisplayNamePath);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.entityTypeError == null ? null : ctx.entityTypeError.DisplayNamePath);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.submitLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.submitLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.submitLoading);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.ɵNgNoValidate, i5$1.DefaultValueAccessor, i5$1.NgControlStatus, i5$1.NgControlStatusGroup, i5$1.RequiredValidator, i5$1.NgModel, i5$1.NgForm, i6$1.MatOption, i5.MatIconButton, i7.MatCard, i1$2.MatDialogTitle, i1$2.MatDialogActions, i1$2.MatDialogContent, i8.MatFormField, i8.MatLabel, i6.MatIcon, i10$1.MatInput, i13.MatProgressSpinner, i13$1.MatSelect], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddNEditEntityTypeComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-add-n-edit-entity-type', template: "<h1 mat-dialog-title>{{data.isNew ? 'New' : 'Edit'}} Entity Type</h1>\r\n\r\n<mat-dialog-content>\r\n\t<form #entityTypeForm=\"ngForm\">\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Name</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Name\" name=\"name\" [(ngModel)]=\"entityType.Name\" required>\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of entityTypeError?.Name\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Table Name</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Table Name\" name=\"tableName\" [(ngModel)]=\"entityType.TableName\">\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of entityTypeError?.TableName\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Singular Title</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Singular Title\" name=\"singular\" [(ngModel)]=\"entityType.SingularTitle\"\r\n\t\t\t required>\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of entityTypeError?.SingularTitle\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Plural Title</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Plural Title\" name=\"plural\" [(ngModel)]=\"entityType.PluralTitle\" required>\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of entityTypeError?.PluralTitle\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Schema</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Schema\" name=\"schema\" [(ngModel)]=\"entityType.SchemaName\">\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of entityTypeError?.SchemaName\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>General Usage Category</mat-label>\r\n\t\t\t<mat-select name=\"usage\" placeholder=\"General Usage Category\" [(ngModel)]=\"entityType.EntityTypeGeneralUsageCategoryId\"\r\n\t\t\t [required]=\"true\" (selectionChange)=\"setEntityTypeFacetDefinitions()\">\r\n\t\t\t\t<mat-option *ngFor=\"let category of data.basicInfo.EntityTypeGeneralUsageCategories\" [value]=\"category.Id\">\r\n\t\t\t\t\t{{category.Name}}\r\n\t\t\t\t</mat-option>\r\n\t\t\t</mat-select>\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of entityTypeError?.EntityTypeGeneralUsageCategoryId\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-card style=\"margin-bottom: 10px\" *ngIf=\"entityType.EntityTypeGeneralUsageCategoryId\">\r\n\t\t\t<h5 style=\"color:gray\">Facets</h5>\r\n\t\t\t<div *ngFor=\"let facetType of basicInfo.EntityTypeFacetDefinitions\">\r\n\t\t\t\t<button mat-icon-button (click)=\"changeFacetValue(facetType)\" *ngIf=\"facetType.Default\">\r\n\t\t\t\t\t<mat-icon color=\"warn\">{{setFacetCheckIcon(facetType)}}</mat-icon>\r\n\t\t\t\t\t{{getFacetName(facetType)}}\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\t\t</mat-card>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Code Path</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Code Path\" name=\"code\" [(ngModel)]=\"entityType.CodePath\">\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of entityTypeError?.CodePath\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Display Name Path</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Display Name Path\" name=\"displayName\" [(ngModel)]=\"entityType.DisplayNamePath\">\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of entityTypeError?.DisplayNamePath\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t</form>\r\n\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions>\r\n\t<button mat-icon-button (click)=\"save()\" *ngIf=\"!submitLoading\">\r\n\t\t<mat-icon color=\"primary\">save</mat-icon>\r\n\t</button>\r\n\t<button mat-icon-button *ngIf=\"submitLoading\">\r\n\t\t<mat-spinner style=\"margin-left: 10px;\" [diameter]=\"20\" color=\"accent\"></mat-spinner>\r\n\t</button>\r\n\t<button mat-icon-button (click)=\"cancel()\" [disabled]=\"submitLoading\">\r\n\t\t<mat-icon color=\"warn\">cancel</mat-icon>\r\n\t</button>\r\n</mat-dialog-actions>\r\n" }]
    }], () => [{ type: i1$2.MatDialogRef }, { type: AddNEditEntityTypeComponentData, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }, { type: MetadataManagementApiClient }, { type: SnackBarService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AddNEditEntityTypeComponent, { className: "AddNEditEntityTypeComponent", filePath: "lib/administration/add-n-edit-entity/add-n-edit-entity-type.component.ts", lineNumber: 17 }); })();

class LocalFacetModel {
}
class PropertyBase {
}

var RelatedPropertyAction;
(function (RelatedPropertyAction) {
    RelatedPropertyAction[RelatedPropertyAction["DontChange"] = 1] = "DontChange";
    RelatedPropertyAction[RelatedPropertyAction["ChooseExistingById"] = 2] = "ChooseExistingById";
    RelatedPropertyAction[RelatedPropertyAction["CreateNewByName"] = 3] = "CreateNewByName";
    RelatedPropertyAction[RelatedPropertyAction["RenameExisting"] = 4] = "RenameExisting";
})(RelatedPropertyAction || (RelatedPropertyAction = {}));
class AddNEditPropertyMetadataModel extends PropertyBase {
}

class DataTypeModel {
    static { this.NavigationalDataTypeIds = {
        ForeignKey: 7,
        NavigationProperty: 8,
        NavigationList: 10
    }; }
}

class AddNEditPropertyComponentData {
    constructor(property, isNew, basicInfo, entityTypes, thisEntityTypeProperties, allProperties) {
        this.property = property;
        this.isNew = isNew;
        this.basicInfo = basicInfo;
        this.entityTypes = entityTypes;
        this.thisEntityTypeProperties = thisEntityTypeProperties;
        this.allProperties = allProperties;
    }
}

class KeysPipe {
    transform(value) {
        const keys = [];
        for (const enumMember in value) {
            if (!value.hasOwnProperty(enumMember)) {
                continue;
            }
            const val = parseInt(enumMember, 10);
            if (!isNaN(val)) {
                keys.push({ key: val, value: value[enumMember] });
            }
        }
        return keys;
    }
    static { this.ɵfac = function KeysPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KeysPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "keys", type: KeysPipe, pure: true, standalone: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KeysPipe, [{
        type: Pipe,
        args: [{
                standalone: false,
                name: 'keys'
            }]
    }], null, null); })();

function AddNEditPropertyComponent_p_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r2, " ");
} }
function AddNEditPropertyComponent_p_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r3, " ");
} }
function AddNEditPropertyComponent_mat_option_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dataType_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", dataType_r4.Id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", dataType_r4.Name, " ");
} }
function AddNEditPropertyComponent_p_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r5, " ");
} }
function AddNEditPropertyComponent_mat_form_field_21_mat_option_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityType_r8 = ctx.$implicit;
    i0.ɵɵproperty("value", entityType_r8.Id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", entityType_r8.Name, " ");
} }
function AddNEditPropertyComponent_mat_form_field_21_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r9, " ");
} }
function AddNEditPropertyComponent_mat_form_field_21_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field", 2)(1, "mat-label");
    i0.ɵɵtext(2, "Data Entity Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-select", 19);
    i0.ɵɵtwoWayListener("ngModelChange", function AddNEditPropertyComponent_mat_form_field_21_Template_mat_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r6 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r6.property.DataEntityTypeId, $event) || (ctx_r6.property.DataEntityTypeId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtemplate(4, AddNEditPropertyComponent_mat_form_field_21_mat_option_4_Template, 2, 2, "mat-option", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AddNEditPropertyComponent_mat_form_field_21_p_5_Template, 2, 1, "p", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r6.property.DataEntityTypeId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r6.entityTypes);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r6.propertyError == null ? null : ctx_r6.propertyError.DataEntityTypeId);
} }
function AddNEditPropertyComponent_div_22_mat_option_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r11 = ctx.$implicit;
    i0.ɵɵproperty("value", action_r11.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", action_r11.value, " ");
} }
function AddNEditPropertyComponent_div_22_p_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r12 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r12, " ");
} }
function AddNEditPropertyComponent_div_22_mat_form_field_8_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r14 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r14, " ");
} }
function AddNEditPropertyComponent_div_22_mat_form_field_8_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field", 2)(1, "mat-label");
    i0.ɵɵtext(2, "Foreign Key Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 22);
    i0.ɵɵtwoWayListener("ngModelChange", function AddNEditPropertyComponent_div_22_mat_form_field_8_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r6 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r6.property.NewForeignKeyName, $event) || (ctx_r6.property.NewForeignKeyName = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, AddNEditPropertyComponent_div_22_mat_form_field_8_p_4_Template, 2, 1, "p", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r6.property.NewForeignKeyName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r6.propertyError == null ? null : ctx_r6.propertyError.NewForeignKeyName);
} }
function AddNEditPropertyComponent_div_22_mat_form_field_9_mat_option_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r16 = ctx.$implicit;
    i0.ɵɵproperty("value", prop_r16.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", prop_r16.name, " ");
} }
function AddNEditPropertyComponent_div_22_mat_form_field_9_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r17 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r17, " ");
} }
function AddNEditPropertyComponent_div_22_mat_form_field_9_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field", 2)(1, "mat-label");
    i0.ɵɵtext(2, "Foreign Key");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-select", 23);
    i0.ɵɵtwoWayListener("ngModelChange", function AddNEditPropertyComponent_div_22_mat_form_field_9_Template_mat_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r6 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r6.property.NewForeignKeyId, $event) || (ctx_r6.property.NewForeignKeyId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtemplate(4, AddNEditPropertyComponent_div_22_mat_form_field_9_mat_option_4_Template, 2, 2, "mat-option", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AddNEditPropertyComponent_div_22_mat_form_field_9_p_5_Template, 2, 1, "p", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r6.property.NewForeignKeyId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r6.compatibleForeignKeys);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r6.propertyError == null ? null : ctx_r6.propertyError.NewForeignKeyId);
} }
function AddNEditPropertyComponent_div_22_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20)(1, "mat-form-field", 2)(2, "mat-label");
    i0.ɵɵtext(3, "Foreign Key Action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "mat-select", 21);
    i0.ɵɵtwoWayListener("ngModelChange", function AddNEditPropertyComponent_div_22_Template_mat_select_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r6 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r6.property.ForeignKeyAction, $event) || (ctx_r6.property.ForeignKeyAction = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtemplate(5, AddNEditPropertyComponent_div_22_mat_option_5_Template, 2, 2, "mat-option", 7);
    i0.ɵɵpipe(6, "keys");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, AddNEditPropertyComponent_div_22_p_7_Template, 2, 1, "p", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, AddNEditPropertyComponent_div_22_mat_form_field_8_Template, 5, 2, "mat-form-field", 8)(9, AddNEditPropertyComponent_div_22_mat_form_field_9_Template, 6, 3, "mat-form-field", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r6.property.ForeignKeyAction);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(6, 5, ctx_r6.actions));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r6.propertyError == null ? null : ctx_r6.propertyError.ForeignKeyAction);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r6.property.ForeignKeyAction == ctx_r6.actions.CreateNewByName || ctx_r6.property.ForeignKeyAction == ctx_r6.actions.RenameExisting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r6.property.ForeignKeyAction == ctx_r6.actions.ChooseExistingById);
} }
function AddNEditPropertyComponent_div_23_mat_option_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r19 = ctx.$implicit;
    i0.ɵɵproperty("value", action_r19.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", action_r19.value, " ");
} }
function AddNEditPropertyComponent_div_23_p_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r20 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r20, " ");
} }
function AddNEditPropertyComponent_div_23_mat_form_field_8_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r22 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r22, " ");
} }
function AddNEditPropertyComponent_div_23_mat_form_field_8_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field", 2)(1, "mat-label");
    i0.ɵɵtext(2, "Inverse Property Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 25);
    i0.ɵɵtwoWayListener("ngModelChange", function AddNEditPropertyComponent_div_23_mat_form_field_8_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r21); const ctx_r6 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r6.property.NewInversePropertyName, $event) || (ctx_r6.property.NewInversePropertyName = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, AddNEditPropertyComponent_div_23_mat_form_field_8_p_4_Template, 2, 1, "p", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r6.property.NewInversePropertyName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r6.propertyError == null ? null : ctx_r6.propertyError.NewInversePropertyName);
} }
function AddNEditPropertyComponent_div_23_mat_form_field_9_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r24 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r24, " ");
} }
function AddNEditPropertyComponent_div_23_mat_form_field_9_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field", 2)(1, "mat-label");
    i0.ɵɵtext(2, "Inverse Property Title");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 26);
    i0.ɵɵtwoWayListener("ngModelChange", function AddNEditPropertyComponent_div_23_mat_form_field_9_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r23); const ctx_r6 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r6.property.NewInversePropertyTitle, $event) || (ctx_r6.property.NewInversePropertyTitle = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, AddNEditPropertyComponent_div_23_mat_form_field_9_p_4_Template, 2, 1, "p", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r6.property.NewInversePropertyTitle);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r6.propertyError == null ? null : ctx_r6.propertyError.NewInversePropertyTitle);
} }
function AddNEditPropertyComponent_div_23_mat_form_field_10_mat_option_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r26 = ctx.$implicit;
    i0.ɵɵproperty("value", prop_r26.Id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", prop_r26.Name, " ");
} }
function AddNEditPropertyComponent_div_23_mat_form_field_10_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r27 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r27, " ");
} }
function AddNEditPropertyComponent_div_23_mat_form_field_10_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field", 2)(1, "mat-label");
    i0.ɵɵtext(2, "Inverse Property");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-select", 27);
    i0.ɵɵtwoWayListener("ngModelChange", function AddNEditPropertyComponent_div_23_mat_form_field_10_Template_mat_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r25); const ctx_r6 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r6.property.NewInversePropertyId, $event) || (ctx_r6.property.NewInversePropertyId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtemplate(4, AddNEditPropertyComponent_div_23_mat_form_field_10_mat_option_4_Template, 2, 2, "mat-option", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AddNEditPropertyComponent_div_23_mat_form_field_10_p_5_Template, 2, 1, "p", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r6.property.NewInversePropertyId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r6.compatibleInverseProperties);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r6.propertyError == null ? null : ctx_r6.propertyError.NewInversePropertyId);
} }
function AddNEditPropertyComponent_div_23_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20)(1, "mat-form-field", 2)(2, "mat-label");
    i0.ɵɵtext(3, "Inverse Property Action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "mat-select", 24);
    i0.ɵɵtwoWayListener("ngModelChange", function AddNEditPropertyComponent_div_23_Template_mat_select_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r6 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r6.property.InversePropertyAction, $event) || (ctx_r6.property.InversePropertyAction = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtemplate(5, AddNEditPropertyComponent_div_23_mat_option_5_Template, 2, 2, "mat-option", 7);
    i0.ɵɵpipe(6, "keys");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, AddNEditPropertyComponent_div_23_p_7_Template, 2, 1, "p", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, AddNEditPropertyComponent_div_23_mat_form_field_8_Template, 5, 2, "mat-form-field", 8)(9, AddNEditPropertyComponent_div_23_mat_form_field_9_Template, 5, 2, "mat-form-field", 8)(10, AddNEditPropertyComponent_div_23_mat_form_field_10_Template, 6, 3, "mat-form-field", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r6.property.InversePropertyAction);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(6, 6, ctx_r6.actions));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r6.propertyError == null ? null : ctx_r6.propertyError.InversePropertyAction);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r6.property.InversePropertyAction === ctx_r6.actions.CreateNewByName || ctx_r6.property.InversePropertyAction == ctx_r6.actions.RenameExisting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r6.property.InversePropertyAction === ctx_r6.actions.CreateNewByName || ctx_r6.property.InversePropertyAction == ctx_r6.actions.RenameExisting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r6.property.InversePropertyAction == ctx_r6.actions.ChooseExistingById);
} }
function AddNEditPropertyComponent_mat_option_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r28 = ctx.$implicit;
    i0.ɵɵproperty("value", category_r28.Id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", category_r28.Name, " ");
} }
function AddNEditPropertyComponent_p_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r29 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r29, " ");
} }
function AddNEditPropertyComponent_mat_card_30_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "button", 31);
    i0.ɵɵlistener("click", function AddNEditPropertyComponent_mat_card_30_div_3_Template_button_click_1_listener() { const facetType_r31 = i0.ɵɵrestoreView(_r30).$implicit; const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.changeFacetValue(facetType_r31)); });
    i0.ɵɵelementStart(2, "mat-icon", 16);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const facetType_r31 = ctx.$implicit;
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r6.setFacetCheckIcon(facetType_r31));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r6.getFacetName(facetType_r31), " ");
} }
function AddNEditPropertyComponent_mat_card_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card", 28)(1, "h5", 29);
    i0.ɵɵtext(2, "Facets");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, AddNEditPropertyComponent_mat_card_30_div_3_Template, 5, 2, "div", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r6.facets);
} }
function AddNEditPropertyComponent_button_34_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function AddNEditPropertyComponent_button_34_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r32); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.save()); });
    i0.ɵɵelementStart(1, "mat-icon", 32);
    i0.ɵɵtext(2, "save");
    i0.ɵɵelementEnd()();
} }
function AddNEditPropertyComponent_button_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 33);
    i0.ɵɵelement(1, "mat-spinner", 34);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("diameter", 20);
} }
class AddNEditPropertyComponent {
    constructor(dialogRef, data, apiClient, snackbarService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.apiClient = apiClient;
        this.snackbarService = snackbarService;
        this.actions = RelatedPropertyAction;
        this.submitLoading = false;
        this.property = data.property;
        this.basicInfo = data.basicInfo;
        this.entityTypes = data.entityTypes;
        this.thisTypeProperties = data.thisEntityTypeProperties;
        this.allProperties = data.allProperties;
        if (!this.data.isNew) {
            this.facets = [];
            this.setDefaultFacetValues();
        }
    }
    setDefaultFacetValues() {
        const currentGeneralUsageCategory = this.data.basicInfo.PropertyGeneralUsageCategories
            .find(x => x.Id === this.data.property.PropertyGeneralUsageCategoryId);
        this.facets.forEach((x) => {
            if (this.data.basicInfo.DefaultPropertyFacetValues[currentGeneralUsageCategory.Name]) {
                x.Default = this.data.basicInfo.DefaultPropertyFacetValues[currentGeneralUsageCategory.Name][x.Name];
            }
            else {
                x.Default = this.basicInfo.PropertyFacetDefinitions.find(t => t.Id === x.Id).Default;
            }
        });
        this.setPropertyFacetDefinitions();
    }
    changeFacetValue(facetType) {
        const localFacet = this.data.property.LocalFacets.find(x => x.FacetName === facetType.Name);
        if (!localFacet) {
            this.data.property.LocalFacets.push({
                FacetName: facetType.Name,
                Value: 'False'
            });
        }
        else {
            if (localFacet) {
                if (localFacet.Value.toLowerCase() === 'false') {
                    localFacet.Value = 'True';
                }
                else if (localFacet.Value.toLowerCase() === 'true') {
                    const index = this.data.property.LocalFacets.indexOf(localFacet);
                    this.data.property.LocalFacets.splice(index, 1);
                }
            }
        }
    }
    getFacetName(facetType) {
        if (!this.data.property.LocalFacets) {
            this.data.property.LocalFacets = [];
        }
        const localFacet = this.data.property.LocalFacets.find(x => x.FacetName === facetType.Name);
        if (localFacet) {
            if (localFacet.FacetName === facetType.Name) {
                return facetType.Name;
            }
        }
        return facetType.Name + ' ( Default )';
    }
    setPropertyFacetDefinitions() {
        this.facets = [];
        const generalUsageCategory = this.basicInfo.PropertyGeneralUsageCategories.find(x => x.Id === this.property.PropertyGeneralUsageCategoryId);
        for (const g of this.basicInfo.PropertyFacetDefinitions) {
            const defaults = generalUsageCategory && this.basicInfo.DefaultPropertyFacetValues[generalUsageCategory.Name];
            let id = 0;
            this.facets.push({
                Id: ++id,
                Default: defaults ? defaults[g.Name] : g.Default,
                Name: g.Name,
                DataType: ''
            });
        }
    }
    setFacetCheckIcon(facetType) {
        if (this.data.property.LocalFacets) {
            const localFacet = this.data.property.LocalFacets.find(x => x.FacetName === facetType.Name);
            if (localFacet) {
                if (localFacet.Value.toLowerCase() === 'false') {
                    return 'check_box_outline_blank';
                }
                else if (localFacet.Value.toLowerCase() === 'true') {
                    return 'check_box';
                }
            }
        }
        if (facetType.Default) {
            if (facetType.Default.toLowerCase() === 'false') {
                return 'check_box_outline_blank';
            }
            else if (facetType.Default.toLowerCase() === 'true') {
                return 'check_box';
            }
        }
        if (facetType.Default === undefined) {
            return 'check_box_outline_blank';
        }
    }
    get isNavigation() {
        return this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.ForeignKey ||
            this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationProperty ||
            this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationList;
    }
    get isNavigationProperty() {
        return this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationProperty;
    }
    get hasInverseProperty() {
        return this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationProperty ||
            this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationList;
    }
    get compatibleForeignKeys() {
        return this.thisTypeProperties.filter(x => x.DataTypeId === DataTypeModel.NavigationalDataTypeIds.ForeignKey &&
            x.DataEntityTypeId === this.property.DataEntityTypeId);
    }
    get compatibleInverseProperties() {
        if (this.property.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationProperty) {
            return this.allProperties.filter(x => x.OwnerEntityTypeId === this.property.DataEntityTypeId &&
                x.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationList &&
                x.DataEntityTypeId === this.property.OwnerEntityTypeId);
        }
        return this.allProperties.filter(x => x.OwnerEntityTypeId === this.property.DataEntityTypeId &&
            x.DataTypeId === DataTypeModel.NavigationalDataTypeIds.NavigationProperty &&
            x.DataEntityTypeId === this.property.OwnerEntityTypeId);
    }
    ngOnInit() {
    }
    save() {
        this.submitLoading = true;
        const request = this.data.isNew ?
            this.apiClient.addProperty(this.property) :
            this.apiClient.editProperty(this.property);
        request.subscribe((result) => {
            this.dialogRef.close('saved');
            this.submitLoading = false;
        }, (error) => {
            this.propertyError = error.error.errors;
            this.snackbarService.open(error.statusText);
            this.submitLoading = false;
        });
    }
    cancel() {
        this.dialogRef.close();
    }
    static { this.ɵfac = function AddNEditPropertyComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AddNEditPropertyComponent)(i0.ɵɵdirectiveInject(i1$2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA), i0.ɵɵdirectiveInject(MetadataManagementApiClient), i0.ɵɵdirectiveInject(SnackBarService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AddNEditPropertyComponent, selectors: [["dscribe-add-n-edit-property"]], standalone: false, decls: 39, vars: 19, consts: [["propertyForm", "ngForm"], ["mat-dialog-title", ""], ["appearance", "outline", 1, "full-width"], ["matInput", "", "type", "text", "placeholder", "Name", "name", "name", 3, "ngModelChange", "ngModel"], ["class", "form-error-message", 4, "ngFor", "ngForOf"], ["matInput", "", "type", "text", "placeholder", "Title", "name", "title", 3, "ngModelChange", "ngModel"], ["name", "dataType", "placeholder", "Data Type", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "full-width", "appearance", "outline", 4, "ngIf"], ["class", "form-group", 4, "ngIf"], ["name", "usage", "placeholder", "General Usage Category", 3, "ngModelChange", "selectionChange", "ngModel"], ["style", "margin-bottom: 10px", 4, "ngIf"], ["name", "isNullable", 3, "ngModelChange", "ngModel"], ["mat-icon-button", "", 3, "click", 4, "ngIf"], ["mat-icon-button", "", 4, "ngIf"], ["mat-icon-button", "", 3, "click", "disabled"], ["color", "warn"], [1, "form-error-message"], [3, "value"], ["name", "dataEntityType", "placeholder", "Data Type Entity", 3, "ngModelChange", "ngModel"], [1, "form-group"], ["name", "foreignKeyAction", "placeholder", "Foreign Key Action", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "text", "placeholder", "Foreign Key Name", "name", "foreignKeyName", 3, "ngModelChange", "ngModel"], ["name", "foreignKeyId", "placeholder", "Choose Foreign Key", 3, "ngModelChange", "ngModel"], ["name", "inversePropertyAction", "placeholder", "Inverse Property Action", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "text", "placeholder", "Inverse Property Name", "name", "inversePropertyName", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "text", "placeholder", "Inverse Property Title", "name", "inversePropertyTitle", 3, "ngModelChange", "ngModel"], ["name", "inversePropertyId", "placeholder", "Choose Inverse Property", 3, "ngModelChange", "ngModel"], [2, "margin-bottom", "10px"], [2, "color", "gray"], [4, "ngFor", "ngForOf"], ["mat-icon-button", "", 3, "click"], ["color", "primary"], ["mat-icon-button", ""], ["color", "accent", 2, "margin-left", "10px", 3, "diameter"]], template: function AddNEditPropertyComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "h1", 1);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "mat-dialog-content")(3, "form", null, 0)(5, "mat-form-field", 2)(6, "mat-label");
            i0.ɵɵtext(7, "Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 3);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditPropertyComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.property.Name, $event) || (ctx.property.Name = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, AddNEditPropertyComponent_p_9_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "mat-form-field", 2)(11, "mat-label");
            i0.ɵɵtext(12, "Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "input", 5);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditPropertyComponent_Template_input_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.property.Title, $event) || (ctx.property.Title = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(14, AddNEditPropertyComponent_p_14_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "mat-form-field", 2)(16, "mat-label");
            i0.ɵɵtext(17, "Data Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "mat-select", 6);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditPropertyComponent_Template_mat_select_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.property.DataTypeId, $event) || (ctx.property.DataTypeId = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtemplate(19, AddNEditPropertyComponent_mat_option_19_Template, 2, 2, "mat-option", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(20, AddNEditPropertyComponent_p_20_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(21, AddNEditPropertyComponent_mat_form_field_21_Template, 6, 3, "mat-form-field", 8)(22, AddNEditPropertyComponent_div_22_Template, 10, 7, "div", 9)(23, AddNEditPropertyComponent_div_23_Template, 11, 8, "div", 9);
            i0.ɵɵelementStart(24, "mat-form-field", 2)(25, "mat-label");
            i0.ɵɵtext(26, "General Usage Category");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "mat-select", 10);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditPropertyComponent_Template_mat_select_ngModelChange_27_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.property.PropertyGeneralUsageCategoryId, $event) || (ctx.property.PropertyGeneralUsageCategoryId = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("selectionChange", function AddNEditPropertyComponent_Template_mat_select_selectionChange_27_listener() { return ctx.setPropertyFacetDefinitions(); });
            i0.ɵɵtemplate(28, AddNEditPropertyComponent_mat_option_28_Template, 2, 2, "mat-option", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(29, AddNEditPropertyComponent_p_29_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(30, AddNEditPropertyComponent_mat_card_30_Template, 4, 1, "mat-card", 11);
            i0.ɵɵelementStart(31, "mat-checkbox", 12);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditPropertyComponent_Template_mat_checkbox_ngModelChange_31_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.property.IsNullable, $event) || (ctx.property.IsNullable = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtext(32, "Is Nullable");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(33, "mat-dialog-actions");
            i0.ɵɵtemplate(34, AddNEditPropertyComponent_button_34_Template, 3, 0, "button", 13)(35, AddNEditPropertyComponent_button_35_Template, 2, 1, "button", 14);
            i0.ɵɵelementStart(36, "button", 15);
            i0.ɵɵlistener("click", function AddNEditPropertyComponent_Template_button_click_36_listener() { return ctx.cancel(); });
            i0.ɵɵelementStart(37, "mat-icon", 16);
            i0.ɵɵtext(38, "cancel");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("", ctx.data.isNew ? "New" : "Edit", " Property");
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.property.Name);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.propertyError == null ? null : ctx.propertyError.Name);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.property.Title);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.propertyError == null ? null : ctx.propertyError.Title);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.property.DataTypeId);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.data.basicInfo.DataTypes);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.propertyError == null ? null : ctx.propertyError.DataTypeId);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isNavigation);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isNavigationProperty);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isNavigationProperty);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.property.PropertyGeneralUsageCategoryId);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.data.basicInfo.PropertyGeneralUsageCategories);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.propertyError == null ? null : ctx.propertyError.PropertyGeneralUsageCategoryId);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.property.PropertyGeneralUsageCategoryId);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.property.IsNullable);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.submitLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.submitLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.submitLoading);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.ɵNgNoValidate, i5$1.DefaultValueAccessor, i5$1.NgControlStatus, i5$1.NgControlStatusGroup, i5$1.NgModel, i5$1.NgForm, i6$1.MatOption, i5.MatIconButton, i7.MatCard, i9$3.MatCheckbox, i1$2.MatDialogTitle, i1$2.MatDialogActions, i1$2.MatDialogContent, i8.MatFormField, i8.MatLabel, i6.MatIcon, i10$1.MatInput, i13.MatProgressSpinner, i13$1.MatSelect, KeysPipe], styles: [".form-group[_ngcontent-%COMP%]{margin-bottom:1px;border:RGBA(0,0,127,.2) 1px solid;background-color:#00007f0d;padding:2px;border-radius:4px}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddNEditPropertyComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-add-n-edit-property', template: "<h1 mat-dialog-title>{{data.isNew ? 'New' : 'Edit'}} Property</h1>\r\n\r\n<mat-dialog-content>\r\n\t<form #propertyForm=\"ngForm\">\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Name</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Name\" name=\"name\" [(ngModel)]=\"property.Name\">\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of propertyError?.Name\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Title</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Title\" name=\"title\" [(ngModel)]=\"property.Title\">\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of propertyError?.Title\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Data Type</mat-label>\r\n\t\t\t<mat-select name=\"dataType\" placeholder=\"Data Type\" [(ngModel)]=\"property.DataTypeId\">\r\n\t\t\t\t<mat-option *ngFor=\"let dataType of data.basicInfo.DataTypes\" [value]=\"dataType.Id\">\r\n\t\t\t\t\t{{dataType.Name}}\r\n\t\t\t\t</mat-option>\r\n\t\t\t</mat-select>\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of propertyError?.DataTypeId\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" *ngIf=\"isNavigation\" appearance=\"outline\">\r\n\t\t\t<mat-label>Data Entity Type</mat-label>\r\n\t\t\t<mat-select name=\"dataEntityType\" placeholder=\"Data Type Entity\" [(ngModel)]=\"property.DataEntityTypeId\">\r\n\t\t\t\t<mat-option *ngFor=\"let entityType of entityTypes\" [value]=\"entityType.Id\">\r\n\t\t\t\t\t{{entityType.Name}}\r\n\t\t\t\t</mat-option>\r\n\t\t\t</mat-select>\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of propertyError?.DataEntityTypeId\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<div class=\"form-group\" *ngIf=\"isNavigationProperty\">\r\n\t\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t\t<mat-label>Foreign Key Action</mat-label>\r\n\t\t\t\t<mat-select name=\"foreignKeyAction\" placeholder=\"Foreign Key Action\" [(ngModel)]=\"property.ForeignKeyAction\">\r\n\t\t\t\t\t<mat-option *ngFor=\"let action of actions | keys\" [value]=\"action.key\">\r\n\t\t\t\t\t\t{{action.value}}\r\n\t\t\t\t\t</mat-option>\r\n\t\t\t\t</mat-select>\r\n\t\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of propertyError?.ForeignKeyAction\">\r\n\t\t\t\t\t{{e}}\r\n\t\t\t\t</p>\r\n\t\t\t</mat-form-field>\r\n\r\n\t\t\t<mat-form-field *ngIf=\"property.ForeignKeyAction == actions.CreateNewByName || property.ForeignKeyAction == actions.RenameExisting\"\r\n\t\t\t class=\"full-width\" appearance=\"outline\">\r\n\t\t\t\t<mat-label>Foreign Key Name</mat-label>\r\n\t\t\t\t<input matInput type=\"text\" placeholder=\"Foreign Key Name\" name=\"foreignKeyName\" [(ngModel)]=\"property.NewForeignKeyName\">\r\n\t\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of propertyError?.NewForeignKeyName\">\r\n\t\t\t\t\t{{e}}\r\n\t\t\t\t</p>\r\n\t\t\t</mat-form-field>\r\n\r\n\t\t\t<mat-form-field *ngIf=\"property.ForeignKeyAction == actions.ChooseExistingById\" class=\"full-width\" appearance=\"outline\">\r\n\t\t\t\t<mat-label>Foreign Key</mat-label>\r\n\t\t\t\t<mat-select name=\"foreignKeyId\" placeholder=\"Choose Foreign Key\" [(ngModel)]=\"property.NewForeignKeyId\">\r\n\t\t\t\t\t<mat-option *ngFor=\"let prop of compatibleForeignKeys\" [value]=\"prop.id\">\r\n\t\t\t\t\t\t{{prop.name}}\r\n\t\t\t\t\t</mat-option>\r\n\t\t\t\t</mat-select>\r\n\t\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of propertyError?.NewForeignKeyId\">\r\n\t\t\t\t\t{{e}}\r\n\t\t\t\t</p>\r\n\t\t\t</mat-form-field>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"form-group\" *ngIf=\"isNavigationProperty\">\r\n\t\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\r\n\t\t\t\t<mat-label>Inverse Property Action</mat-label>\r\n\t\t\t\t<mat-select name=\"inversePropertyAction\" placeholder=\"Inverse Property Action\" [(ngModel)]=\"property.InversePropertyAction\">\r\n\t\t\t\t\t<mat-option *ngFor=\"let action of actions | keys\" [value]=\"action.key\">\r\n\t\t\t\t\t\t{{action.value}}\r\n\t\t\t\t\t</mat-option>\r\n\t\t\t\t</mat-select>\r\n\t\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of propertyError?.InversePropertyAction\">\r\n\t\t\t\t\t{{e}}\r\n\t\t\t\t</p>\r\n\t\t\t</mat-form-field>\r\n\r\n\t\t\t<mat-form-field *ngIf=\"property.InversePropertyAction === actions.CreateNewByName || property.InversePropertyAction == actions.RenameExisting\"\r\n\t\t\t class=\"full-width\" appearance=\"outline\">\r\n\t\t\t\t<mat-label>Inverse Property Name</mat-label>\r\n\t\t\t\t<input matInput type=\"text\" placeholder=\"Inverse Property Name\" name=\"inversePropertyName\" [(ngModel)]=\"property.NewInversePropertyName\">\r\n\t\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of propertyError?.NewInversePropertyName\">\r\n\t\t\t\t\t{{e}}\r\n\t\t\t\t</p>\r\n\t\t\t</mat-form-field>\r\n\r\n\t\t\t<mat-form-field *ngIf=\"property.InversePropertyAction === actions.CreateNewByName || property.InversePropertyAction == actions.RenameExisting\"\r\n\t\t\t class=\"full-width\" appearance=\"outline\">\r\n\t\t\t\t<mat-label>Inverse Property Title</mat-label>\r\n\t\t\t\t<input matInput type=\"text\" placeholder=\"Inverse Property Title\" name=\"inversePropertyTitle\" [(ngModel)]=\"property.NewInversePropertyTitle\">\r\n\t\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of propertyError?.NewInversePropertyTitle\">\r\n\t\t\t\t\t{{e}}\r\n\t\t\t\t</p>\r\n\t\t\t</mat-form-field>\r\n\r\n\t\t\t<mat-form-field *ngIf=\"property.InversePropertyAction == actions.ChooseExistingById\" class=\"full-width\" appearance=\"outline\">\r\n\t\t\t\t<mat-label>Inverse Property</mat-label>\r\n\t\t\t\t<mat-select name=\"inversePropertyId\" placeholder=\"Choose Inverse Property\" [(ngModel)]=\"property.NewInversePropertyId\">\r\n\t\t\t\t\t<mat-option *ngFor=\"let prop of compatibleInverseProperties\" [value]=\"prop.Id\">\r\n\t\t\t\t\t\t{{prop.Name}}\r\n\t\t\t\t\t</mat-option>\r\n\t\t\t\t</mat-select>\r\n\t\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of propertyError?.NewInversePropertyId\">\r\n\t\t\t\t\t{{e}}\r\n\t\t\t\t</p>\r\n\t\t\t</mat-form-field>\r\n\t\t</div>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>General Usage Category</mat-label>\r\n\t\t\t<mat-select name=\"usage\" placeholder=\"General Usage Category\" [(ngModel)]=\"property.PropertyGeneralUsageCategoryId\"\r\n\t\t\t(selectionChange)=\"setPropertyFacetDefinitions()\">\r\n\t\t\t\t<mat-option *ngFor=\"let category of data.basicInfo.PropertyGeneralUsageCategories\" [value]=\"category.Id\">\r\n\t\t\t\t\t{{category.Name}}\r\n\t\t\t\t</mat-option>\r\n\t\t\t</mat-select>\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of propertyError?.PropertyGeneralUsageCategoryId\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\t\t<mat-card style=\"margin-bottom: 10px\" *ngIf=\"property.PropertyGeneralUsageCategoryId\">\r\n\t\t\t<h5 style=\"color:gray\">Facets</h5>\r\n\t\t\t<div *ngFor=\"let facetType of facets\">\r\n\t\t\t\t<button mat-icon-button (click)=\"changeFacetValue(facetType)\">\r\n\t\t\t\t\t<mat-icon color=\"warn\">{{setFacetCheckIcon(facetType)}}</mat-icon>\r\n\t\t\t\t\t{{getFacetName(facetType)}}\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\t\t</mat-card>\r\n\t\t<mat-checkbox name=\"isNullable\" [(ngModel)]=\"property.IsNullable\">Is Nullable</mat-checkbox>\r\n\r\n\t</form>\r\n\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions>\r\n\t<button mat-icon-button (click)=\"save()\" *ngIf=\"!submitLoading\">\r\n\t\t<mat-icon color=\"primary\">save</mat-icon>\r\n\t</button>\r\n\t<button mat-icon-button *ngIf=\"submitLoading\">\r\n\t\t<mat-spinner style=\"margin-left: 10px;\" [diameter]=\"20\" color=\"accent\"></mat-spinner>\r\n\t</button>\r\n\t<button mat-icon-button (click)=\"cancel()\" [disabled]=\"submitLoading\">\r\n\t\t<mat-icon color=\"warn\">cancel</mat-icon>\r\n\t</button>\r\n</mat-dialog-actions>\r\n", styles: [".form-group{margin-bottom:1px;border:RGBA(0,0,127,.2) 1px solid;background-color:#00007f0d;padding:2px;border-radius:4px}\n"] }]
    }], () => [{ type: i1$2.MatDialogRef }, { type: AddNEditPropertyComponentData, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }, { type: MetadataManagementApiClient }, { type: SnackBarService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AddNEditPropertyComponent, { className: "AddNEditPropertyComponent", filePath: "lib/administration/add-n-edit-property/add-n-edit-property.component.ts", lineNumber: 22 }); })();

class EntityTypeGeneralUsageNamePipe {
    transform(value, args) {
        return null;
    }
    static { this.ɵfac = function EntityTypeGeneralUsageNamePipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EntityTypeGeneralUsageNamePipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "entityGeneralUsageName", type: EntityTypeGeneralUsageNamePipe, pure: true, standalone: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EntityTypeGeneralUsageNamePipe, [{
        type: Pipe,
        args: [{
                standalone: false,
                name: 'entityGeneralUsageName'
            }]
    }], null, null); })();

class EntityTypeHistoryModel {
    constructor() {
        this.EntityType = new EntityTypeBase();
        this.EntityType.EntityTypeGeneralUsageCategoryId = 1;
        this.EntityType.Name = 'a';
        this.EntityType.PluralTitle = 'a';
        this.EntityType.SingularTitle = 'a';
    }
}

const _c0$5 = ["entityTypesPaginator"];
function EntityHistoryComponent_mat_progress_bar_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-progress-bar", 4);
} }
function EntityHistoryComponent_h1_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("History of ", ctx_r0.data.EntityType.Name);
} }
function EntityHistoryComponent_h1_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 5);
    i0.ɵɵtext(1, "Deleted entities history");
    i0.ɵɵelementEnd();
} }
function EntityHistoryComponent_mat_dialog_content_3_th_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Action");
    i0.ɵɵelementEnd();
} }
function EntityHistoryComponent_mat_dialog_content_3_td_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24)(1, "button", 25)(2, "mat-icon", 26);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const entityHistory_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngStyle", ctx_r0.setActionColor(entityHistory_r2));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.setActionIcon(entityHistory_r2));
} }
function EntityHistoryComponent_mat_dialog_content_3_th_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Name");
    i0.ɵɵelementEnd();
} }
function EntityHistoryComponent_mat_dialog_content_3_td_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityHistory_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entityHistory_r3.EntityType.Name);
} }
function EntityHistoryComponent_mat_dialog_content_3_th_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Table Name");
    i0.ɵɵelementEnd();
} }
function EntityHistoryComponent_mat_dialog_content_3_td_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityHistory_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entityHistory_r4.EntityType.TableName);
} }
function EntityHistoryComponent_mat_dialog_content_3_th_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Schema");
    i0.ɵɵelementEnd();
} }
function EntityHistoryComponent_mat_dialog_content_3_td_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityHistory_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entityHistory_r5.EntityType.SchemaName);
} }
function EntityHistoryComponent_mat_dialog_content_3_th_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Usage");
    i0.ɵɵelementEnd();
} }
function EntityHistoryComponent_mat_dialog_content_3_td_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityHistory_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getEntityTypeUsageName(entityHistory_r6.EntityType.EntityTypeGeneralUsageCategoryId), " ");
} }
function EntityHistoryComponent_mat_dialog_content_3_th_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Singular");
    i0.ɵɵelementEnd();
} }
function EntityHistoryComponent_mat_dialog_content_3_td_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityHistory_r7 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entityHistory_r7.EntityType.SingularTitle);
} }
function EntityHistoryComponent_mat_dialog_content_3_th_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Plural");
    i0.ɵɵelementEnd();
} }
function EntityHistoryComponent_mat_dialog_content_3_td_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityHistory_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entityHistory_r8.EntityType.PluralTitle);
} }
function EntityHistoryComponent_mat_dialog_content_3_th_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Code");
    i0.ɵɵelementEnd();
} }
function EntityHistoryComponent_mat_dialog_content_3_td_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityHistory_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entityHistory_r9.EntityType.CodePath);
} }
function EntityHistoryComponent_mat_dialog_content_3_th_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Display Name");
    i0.ɵɵelementEnd();
} }
function EntityHistoryComponent_mat_dialog_content_3_td_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityHistory_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entityHistory_r10.EntityType.DisplayNamePath);
} }
function EntityHistoryComponent_mat_dialog_content_3_th_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Action Date");
    i0.ɵɵelementEnd();
} }
function EntityHistoryComponent_mat_dialog_content_3_td_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 27);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityHistory_r11 = ctx.$implicit;
    i0.ɵɵproperty("matTooltip", i0.ɵɵpipeBind2(1, 2, entityHistory_r11.StartTime, "shortTime"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 5, entityHistory_r11.StartTime));
} }
function EntityHistoryComponent_mat_dialog_content_3_tr_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 28);
} }
function EntityHistoryComponent_mat_dialog_content_3_tr_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 29);
} }
function EntityHistoryComponent_mat_dialog_content_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-dialog-content")(1, "table", 6);
    i0.ɵɵelementContainerStart(2, 7);
    i0.ɵɵtemplate(3, EntityHistoryComponent_mat_dialog_content_3_th_3_Template, 2, 0, "th", 8)(4, EntityHistoryComponent_mat_dialog_content_3_td_4_Template, 4, 2, "td", 9);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(5, 10);
    i0.ɵɵtemplate(6, EntityHistoryComponent_mat_dialog_content_3_th_6_Template, 2, 0, "th", 8)(7, EntityHistoryComponent_mat_dialog_content_3_td_7_Template, 2, 1, "td", 9);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(8, 11);
    i0.ɵɵtemplate(9, EntityHistoryComponent_mat_dialog_content_3_th_9_Template, 2, 0, "th", 8)(10, EntityHistoryComponent_mat_dialog_content_3_td_10_Template, 2, 1, "td", 9);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(11, 12);
    i0.ɵɵtemplate(12, EntityHistoryComponent_mat_dialog_content_3_th_12_Template, 2, 0, "th", 8)(13, EntityHistoryComponent_mat_dialog_content_3_td_13_Template, 2, 1, "td", 9);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(14, 13);
    i0.ɵɵtemplate(15, EntityHistoryComponent_mat_dialog_content_3_th_15_Template, 2, 0, "th", 8)(16, EntityHistoryComponent_mat_dialog_content_3_td_16_Template, 2, 1, "td", 9);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(17, 14);
    i0.ɵɵtemplate(18, EntityHistoryComponent_mat_dialog_content_3_th_18_Template, 2, 0, "th", 8)(19, EntityHistoryComponent_mat_dialog_content_3_td_19_Template, 2, 1, "td", 9);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(20, 15);
    i0.ɵɵtemplate(21, EntityHistoryComponent_mat_dialog_content_3_th_21_Template, 2, 0, "th", 8)(22, EntityHistoryComponent_mat_dialog_content_3_td_22_Template, 2, 1, "td", 9);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(23, 16);
    i0.ɵɵtemplate(24, EntityHistoryComponent_mat_dialog_content_3_th_24_Template, 2, 0, "th", 8)(25, EntityHistoryComponent_mat_dialog_content_3_td_25_Template, 2, 1, "td", 9);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(26, 17);
    i0.ɵɵtemplate(27, EntityHistoryComponent_mat_dialog_content_3_th_27_Template, 2, 0, "th", 8)(28, EntityHistoryComponent_mat_dialog_content_3_td_28_Template, 2, 1, "td", 9);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(29, 18);
    i0.ɵɵtemplate(30, EntityHistoryComponent_mat_dialog_content_3_th_30_Template, 2, 0, "th", 8)(31, EntityHistoryComponent_mat_dialog_content_3_td_31_Template, 4, 7, "td", 19);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵtemplate(32, EntityHistoryComponent_mat_dialog_content_3_tr_32_Template, 1, 0, "tr", 20)(33, EntityHistoryComponent_mat_dialog_content_3_tr_33_Template, 1, 0, "tr", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(34, "mat-paginator", 22, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("dataSource", ctx_r0.entityTypesDataSource);
    i0.ɵɵadvance(31);
    i0.ɵɵproperty("matHeaderRowDef", ctx_r0.displayedEntityTypeColumns);
    i0.ɵɵadvance();
    i0.ɵɵproperty("matRowDefColumns", ctx_r0.displayedEntityTypeColumns);
    i0.ɵɵadvance();
    i0.ɵɵproperty("length", ctx_r0.entityTypesDataSource.data.length)("pageSize", 5);
} }
class EntityHistoryComponent {
    constructor(dialogRef, data, snackbarService, historyService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.snackbarService = snackbarService;
        this.historyService = historyService;
        this.entityHistories = [];
        this.isLoading = false;
        this.displayedEntityTypeColumns = ['action', 'name', 'tableName', 'schema', 'usage', 'singular', 'plural', 'code', 'displayName', 'ActionDate'];
        this.entityTypesDataSource = new MatTableDataSource(this.entityHistories);
    }
    ngOnInit() {
        this.entityTypesDataSource.paginator = this.entityTypesPaginator;
        if (this.data.historyType === HistoryType.addEdit) {
            this.getEntityHistory();
        }
        if (this.data.historyType === HistoryType.deleted) {
            this.getDeletedEntityHistory();
        }
    }
    setActionIcon(data) {
        switch (data.Action) {
            case 'addEntityType':
                return 'add';
            case 'editEntityType':
                return 'edit';
            case 'deleteEntityType':
                return 'delete';
            default:
                break;
        }
    }
    setActionColor(data) {
        switch (data.Action) {
            case 'addEntityType':
                return { 'color': 'green' };
            case 'editEntityType':
                return { 'color': 'accent' };
            case 'deleteEntityType':
                return { 'color': 'red' };
            default:
                return {};
        }
    }
    getDeletedEntityHistory() {
        this.isLoading = true;
        this.entityHistories = [];
        this.historyService.getDeletedEntityTypeHistory().subscribe((res) => {
            this.isLoading = false;
            this.entityTypesDataSource.data = this.entityHistories = res;
        }, (error) => {
            this.snackbarService.open(error.statusText);
            this.isLoading = false;
        });
    }
    getEntityHistory() {
        this.isLoading = true;
        this.entityHistories = [];
        this.historyService.getEntityTypeHistory(this.data).subscribe((res) => {
            this.isLoading = false;
            this.entityTypesDataSource.data = this.entityHistories = res;
        }, (error) => {
            this.snackbarService.open(error.statusText);
            this.isLoading = false;
        });
    }
    getEntityTypeUsageName(id) {
        return this.data.basicInfo.EntityTypeGeneralUsageCategories.find(x => x.Id === id).Name;
    }
    cancel() {
        this.dialogRef.close();
    }
    static { this.ɵfac = function EntityHistoryComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EntityHistoryComponent)(i0.ɵɵdirectiveInject(i1$2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA), i0.ɵɵdirectiveInject(SnackBarService), i0.ɵɵdirectiveInject(HistoryService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EntityHistoryComponent, selectors: [["dscribe-entity-history"]], viewQuery: function EntityHistoryComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0$5, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.entityTypesPaginator = _t.first);
        } }, standalone: false, decls: 4, vars: 4, consts: [["entityTypesPaginator", ""], ["mode", "indeterminate", 4, "ngIf"], ["mat-dialog-title", "", 4, "ngIf"], [4, "ngIf"], ["mode", "indeterminate"], ["mat-dialog-title", ""], ["mat-table", "", "matSort", "", 3, "dataSource"], ["matColumnDef", "action"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "tableName"], ["matColumnDef", "schema"], ["matColumnDef", "usage"], ["matColumnDef", "singular"], ["matColumnDef", "plural"], ["matColumnDef", "code"], ["matColumnDef", "displayName"], ["matColumnDef", "ActionDate"], ["mat-cell", "", 3, "matTooltip", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["id", "entityTypesPaginator", 3, "length", "pageSize"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-icon-button", ""], ["color", "accent", 3, "ngStyle"], ["mat-cell", "", 3, "matTooltip"], ["mat-header-row", ""], ["mat-row", ""]], template: function EntityHistoryComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, EntityHistoryComponent_mat_progress_bar_0_Template, 1, 0, "mat-progress-bar", 1)(1, EntityHistoryComponent_h1_1_Template, 2, 1, "h1", 2)(2, EntityHistoryComponent_h1_2_Template, 2, 0, "h1", 2)(3, EntityHistoryComponent_mat_dialog_content_3_Template, 36, 5, "mat-dialog-content", 3);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.data.historyType === 1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.data.historyType === 2);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
        } }, dependencies: [i1$3.NgIf, i1$3.NgStyle, i5.MatIconButton, i1$2.MatDialogTitle, i1$2.MatDialogContent, i6.MatIcon, i7$1.MatPaginator, i8$1.MatProgressBar, i9.MatSort, i9.MatSortHeader, i10.MatTable, i10.MatHeaderCellDef, i10.MatHeaderRowDef, i10.MatColumnDef, i10.MatCellDef, i10.MatRowDef, i10.MatHeaderCell, i10.MatCell, i10.MatHeaderRow, i10.MatRow, i11.MatTooltip, i1$3.DatePipe], styles: ["table[_ngcontent-%COMP%]{width:100%}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EntityHistoryComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-entity-history', template: "<mat-progress-bar mode=\"indeterminate\" *ngIf=\"isLoading\"></mat-progress-bar>\r\n<h1 mat-dialog-title *ngIf=\"data.historyType === 1\">History of {{data.EntityType.Name}}</h1>\r\n<h1 mat-dialog-title *ngIf=\"data.historyType === 2\">Deleted entities history</h1>\r\n\r\n<mat-dialog-content *ngIf=\"!isLoading\">\r\n\t<table mat-table [dataSource]=\"entityTypesDataSource\" matSort>\r\n\r\n\t\t<ng-container matColumnDef=\"action\">\r\n\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Action</th>\r\n\t\t\t<td mat-cell *matCellDef=\"let entityHistory\">\r\n\t\t\t\t<button mat-icon-button>\r\n\t\t\t\t\t<mat-icon color=\"accent\" [ngStyle]=\"setActionColor(entityHistory)\">{{setActionIcon(entityHistory)}}</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t</td>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"name\">\r\n\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>\r\n\t\t\t<td mat-cell *matCellDef=\"let entityHistory\">{{entityHistory.EntityType.Name}}</td>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"tableName\">\r\n\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Table Name</th>\r\n\t\t\t<td mat-cell *matCellDef=\"let entityHistory\">{{entityHistory.EntityType.TableName}}</td>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"schema\">\r\n\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Schema</th>\r\n\t\t\t<td mat-cell *matCellDef=\"let entityHistory\">{{entityHistory.EntityType.SchemaName}}</td>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"usage\">\r\n\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Usage</th>\r\n\t\t\t<td mat-cell *matCellDef=\"let entityHistory\">\r\n\t\t\t\t{{getEntityTypeUsageName(entityHistory.EntityType.EntityTypeGeneralUsageCategoryId)}}\r\n\t\t\t</td>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"singular\">\r\n\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Singular</th>\r\n\t\t\t<td mat-cell *matCellDef=\"let entityHistory\">{{entityHistory.EntityType.SingularTitle}}</td>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"plural\">\r\n\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Plural</th>\r\n\t\t\t<td mat-cell *matCellDef=\"let entityHistory\">{{entityHistory.EntityType.PluralTitle}}</td>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"code\">\r\n\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Code</th>\r\n\t\t\t<td mat-cell *matCellDef=\"let entityHistory\">{{entityHistory.EntityType.CodePath}}</td>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"displayName\">\r\n\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Display Name</th>\r\n\t\t\t<td mat-cell *matCellDef=\"let entityHistory\">{{entityHistory.EntityType.DisplayNamePath}}</td>\r\n\t\t</ng-container>\r\n\r\n\t\t<ng-container matColumnDef=\"ActionDate\">\r\n\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Action Date</th>\r\n\t\t\t<td mat-cell *matCellDef=\"let entityHistory\" [matTooltip]=\"entityHistory.StartTime | date:'shortTime'\">{{entityHistory.StartTime | date}}</td>\r\n\t\t</ng-container>\r\n\r\n\r\n\t\t<tr mat-header-row *matHeaderRowDef=\"displayedEntityTypeColumns\"></tr>\r\n\t\t<tr mat-row *matRowDef=\"let entityHistory; columns: displayedEntityTypeColumns;\"></tr>\r\n\t</table>\r\n\t<mat-paginator id=\"entityTypesPaginator\" #entityTypesPaginator [length]=\"entityTypesDataSource.data.length\" [pageSize]=\"5\"></mat-paginator>\r\n</mat-dialog-content>\r\n\r\n<!-- <mat-dialog-actions>\r\n\t<button mat-icon-button (click)=\"cancel()\" [disabled]=\"submitLoading\">\r\n\t\t<mat-icon color=\"warn\">cancel</mat-icon>\r\n\t</button>\r\n</mat-dialog-actions> -->\r\n", styles: ["table{width:100%}\n"] }]
    }], () => [{ type: i1$2.MatDialogRef }, { type: EntityTypeHistoryModel, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }, { type: SnackBarService }, { type: HistoryService }], { entityTypesPaginator: [{
            type: ViewChild,
            args: ['entityTypesPaginator']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EntityHistoryComponent, { className: "EntityHistoryComponent", filePath: "lib/administration/history/entity-history/entity-history.component.ts", lineNumber: 17 }); })();

class PropertyHistoryModel {
    constructor() {
        this.Property = new PropertyBase();
        this.Property.DataTypeId = 1;
        this.Property.OwnerEntityTypeId = 1;
        this.Property.PropertyGeneralUsageCategoryId = 1;
    }
}

const _c0$4 = ["propertiesPaginator"];
const _c1$3 = a0 => ({ "highlight": a0 });
function PropertyHistoryComponent_mat_progress_bar_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-progress-bar", 21);
} }
function PropertyHistoryComponent_h1_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("History of ", ctx_r0.data.Property.Name);
} }
function PropertyHistoryComponent_h1_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 22);
    i0.ɵɵtext(1, "Deleted propertied history");
    i0.ɵɵelementEnd();
} }
function PropertyHistoryComponent_th_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Action");
    i0.ɵɵelementEnd();
} }
function PropertyHistoryComponent_td_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24)(1, "button", 25)(2, "mat-icon", 26);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const propertyHistory_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngStyle", ctx_r0.setActionColor(propertyHistory_r2));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.setActionIcon(propertyHistory_r2));
} }
function PropertyHistoryComponent_th_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Name");
    i0.ɵɵelementEnd();
} }
function PropertyHistoryComponent_td_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const propertyHistory_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(propertyHistory_r3.Property.Name);
} }
function PropertyHistoryComponent_th_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Title");
    i0.ɵɵelementEnd();
} }
function PropertyHistoryComponent_td_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const propertyHistory_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(propertyHistory_r4.Property.Title);
} }
function PropertyHistoryComponent_th_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Data Type");
    i0.ɵɵelementEnd();
} }
function PropertyHistoryComponent_td_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const propertyHistory_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.getDataTypeName(propertyHistory_r5.Property.DataTypeId));
} }
function PropertyHistoryComponent_th_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Nullable");
    i0.ɵɵelementEnd();
} }
function PropertyHistoryComponent_td_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const propertyHistory_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(propertyHistory_r6.Property.IsNullable);
} }
function PropertyHistoryComponent_ng_container_21_th_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Data Entity Type");
    i0.ɵɵelementEnd();
} }
function PropertyHistoryComponent_ng_container_21_td_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const propertyHistory_r7 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.getEntityTypeName(propertyHistory_r7.Property.DataEntityTypeId));
} }
function PropertyHistoryComponent_ng_container_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 27);
    i0.ɵɵtemplate(1, PropertyHistoryComponent_ng_container_21_th_1_Template, 2, 0, "th", 6)(2, PropertyHistoryComponent_ng_container_21_td_2_Template, 2, 1, "td", 7);
    i0.ɵɵelementContainerEnd();
} }
function PropertyHistoryComponent_th_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Usage");
    i0.ɵɵelementEnd();
} }
function PropertyHistoryComponent_td_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const propertyHistory_r8 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.getPropertyUsageName(propertyHistory_r8.Property.PropertyGeneralUsageCategoryId));
} }
function PropertyHistoryComponent_ng_container_25_th_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Foreign Key");
    i0.ɵɵelementEnd();
} }
function PropertyHistoryComponent_ng_container_25_td_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const propertyHistory_r9 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.getPropertyName(propertyHistory_r9.Property.ForeignKeyPropertyId));
} }
function PropertyHistoryComponent_ng_container_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 28);
    i0.ɵɵtemplate(1, PropertyHistoryComponent_ng_container_25_th_1_Template, 2, 0, "th", 6)(2, PropertyHistoryComponent_ng_container_25_td_2_Template, 2, 1, "td", 7);
    i0.ɵɵelementContainerEnd();
} }
function PropertyHistoryComponent_ng_container_26_th_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Inverse Property");
    i0.ɵɵelementEnd();
} }
function PropertyHistoryComponent_ng_container_26_td_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const propertyHistory_r10 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.getPropertyName(propertyHistory_r10.Property.InversePropertyId));
} }
function PropertyHistoryComponent_ng_container_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 29);
    i0.ɵɵtemplate(1, PropertyHistoryComponent_ng_container_26_th_1_Template, 2, 0, "th", 6)(2, PropertyHistoryComponent_ng_container_26_td_2_Template, 2, 1, "td", 7);
    i0.ɵɵelementContainerEnd();
} }
function PropertyHistoryComponent_th_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 23);
    i0.ɵɵtext(1, "Action Date");
    i0.ɵɵelementEnd();
} }
function PropertyHistoryComponent_td_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 30);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const propertyHistory_r11 = ctx.$implicit;
    i0.ɵɵproperty("matTooltip", i0.ɵɵpipeBind2(1, 2, propertyHistory_r11.StartTime, "shortTime"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 5, propertyHistory_r11.StartTime));
} }
function PropertyHistoryComponent_tr_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 31);
} }
function PropertyHistoryComponent_tr_31_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 32);
    i0.ɵɵlistener("click", function PropertyHistoryComponent_tr_31_Template_tr_click_0_listener() { const property_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.selectProperty(property_r13)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const property_r13 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c1$3, (ctx_r0.selectedProperty == null ? null : ctx_r0.selectedProperty.Property.Id) === property_r13.Id));
} }
class PropertyHistoryComponent {
    constructor(dialogRef, data, snackbarService, historyService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.snackbarService = snackbarService;
        this.historyService = historyService;
        this.propertyHistories = [];
        this.isLoading = false;
        this.displayedPropertyColumns = this.data.historyType === HistoryType.addEdit ?
            ['action', 'name', 'title', 'dataType', 'nullable', 'dataEntityType', 'usage', 'foreignKey', 'inverse', 'ActionDate'] :
            ['action', 'name', 'title', 'dataType', 'nullable', 'usage', 'ActionDate'];
        this.propertiesDataSource = new MatTableDataSource(this.propertyHistories);
    }
    ngOnInit() {
        this.propertiesDataSource.paginator = this.propertyPaginator;
        if (this.data.historyType === HistoryType.addEdit) {
            this.getPropertyHistory();
        }
        if (this.data.historyType === HistoryType.deleted) {
            this.getDeletedPropertyHistory();
        }
    }
    getEntityTypeName(id) {
        if (!id) {
            return null;
        }
        return this.data.entityTypes.find(x => x.Id === id).Name;
    }
    getDataTypeName(id) {
        return this.data.basicInfo.DataTypes.find(x => x.Id === id).Name;
    }
    getPropertyName(id) {
        if (!id) {
            return;
        }
        const prop = this.data.properties.find(x => x.Id === id);
        if (prop) {
            return prop.Name;
        }
        return this.data.allPropertiesInfo.find(x => x.Id === id).Name;
    }
    setActionIcon(data) {
        switch (data.Action) {
            case 'addProperty':
                return 'add';
            case 'editProperty':
                return 'edit';
            case 'deleteProperty':
                return 'delete';
            default:
                break;
        }
    }
    setActionColor(data) {
        switch (data.Action) {
            case 'addProperty':
                return { 'color': 'green' };
            case 'editProperty':
                return { 'color': 'accent' };
            case 'deleteProperty':
                return { 'color': 'red' };
            default:
                return {};
        }
    }
    getPropertyHistory() {
        this.isLoading = true;
        this.propertyHistories = [];
        this.historyService.getPropertyHistory(this.data).subscribe((res) => {
            this.isLoading = false;
            this.propertiesDataSource.data = this.propertyHistories = res;
        }, (error) => {
            this.snackbarService.open(error.statusText);
            this.isLoading = false;
        });
    }
    getDeletedPropertyHistory() {
        this.isLoading = true;
        this.propertyHistories = [];
        this.historyService.getDeletedPropertyHistory().subscribe((res) => {
            this.isLoading = false;
            this.propertiesDataSource.data = this.propertyHistories = res;
        }, (error) => {
            this.snackbarService.open(error.statusText);
            this.isLoading = false;
        });
    }
    getPropertyUsageName(id) {
        return this.data.basicInfo.PropertyGeneralUsageCategories.find(x => x.Id === id).Name;
    }
    cancel() {
        this.dialogRef.close();
    }
    selectProperty(prop) {
        this.selectedProperty = prop;
    }
    static { this.ɵfac = function PropertyHistoryComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PropertyHistoryComponent)(i0.ɵɵdirectiveInject(i1$2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA), i0.ɵɵdirectiveInject(SnackBarService), i0.ɵɵdirectiveInject(HistoryService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PropertyHistoryComponent, selectors: [["dscribe-property-history"]], viewQuery: function PropertyHistoryComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0$4, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.propertyPaginator = _t.first);
        } }, standalone: false, decls: 34, vars: 12, consts: [["propertiesPaginator", ""], ["mode", "indeterminate", 4, "ngIf"], ["mat-dialog-title", "", 4, "ngIf"], [3, "hidden"], ["mat-table", "", "matSort", "", 3, "dataSource"], ["matColumnDef", "action"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "title"], ["matColumnDef", "dataType"], ["matColumnDef", "nullable"], ["matColumnDef", "dataEntityType", 4, "ngIf"], ["matColumnDef", "usage"], ["matColumnDef", "foreignKey", 4, "ngIf"], ["matColumnDef", "inverse", 4, "ngIf"], ["matColumnDef", "ActionDate"], ["mat-cell", "", 3, "matTooltip", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "ngClass", "click", 4, "matRowDef", "matRowDefColumns"], ["id", "propertiesPaginator", 3, "length", "pageSize"], ["mode", "indeterminate"], ["mat-dialog-title", ""], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-icon-button", ""], ["color", "accent", 3, "ngStyle"], ["matColumnDef", "dataEntityType"], ["matColumnDef", "foreignKey"], ["matColumnDef", "inverse"], ["mat-cell", "", 3, "matTooltip"], ["mat-header-row", ""], ["mat-row", "", 3, "click", "ngClass"]], template: function PropertyHistoryComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, PropertyHistoryComponent_mat_progress_bar_0_Template, 1, 0, "mat-progress-bar", 1)(1, PropertyHistoryComponent_h1_1_Template, 2, 1, "h1", 2)(2, PropertyHistoryComponent_h1_2_Template, 2, 0, "h1", 2);
            i0.ɵɵelementStart(3, "mat-dialog-content")(4, "div", 3)(5, "table", 4);
            i0.ɵɵelementContainerStart(6, 5);
            i0.ɵɵtemplate(7, PropertyHistoryComponent_th_7_Template, 2, 0, "th", 6)(8, PropertyHistoryComponent_td_8_Template, 4, 2, "td", 7);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(9, 8);
            i0.ɵɵtemplate(10, PropertyHistoryComponent_th_10_Template, 2, 0, "th", 6)(11, PropertyHistoryComponent_td_11_Template, 2, 1, "td", 7);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(12, 9);
            i0.ɵɵtemplate(13, PropertyHistoryComponent_th_13_Template, 2, 0, "th", 6)(14, PropertyHistoryComponent_td_14_Template, 2, 1, "td", 7);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(15, 10);
            i0.ɵɵtemplate(16, PropertyHistoryComponent_th_16_Template, 2, 0, "th", 6)(17, PropertyHistoryComponent_td_17_Template, 2, 1, "td", 7);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(18, 11);
            i0.ɵɵtemplate(19, PropertyHistoryComponent_th_19_Template, 2, 0, "th", 6)(20, PropertyHistoryComponent_td_20_Template, 2, 1, "td", 7);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵtemplate(21, PropertyHistoryComponent_ng_container_21_Template, 3, 0, "ng-container", 12);
            i0.ɵɵelementContainerStart(22, 13);
            i0.ɵɵtemplate(23, PropertyHistoryComponent_th_23_Template, 2, 0, "th", 6)(24, PropertyHistoryComponent_td_24_Template, 2, 1, "td", 7);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵtemplate(25, PropertyHistoryComponent_ng_container_25_Template, 3, 0, "ng-container", 14)(26, PropertyHistoryComponent_ng_container_26_Template, 3, 0, "ng-container", 15);
            i0.ɵɵelementContainerStart(27, 16);
            i0.ɵɵtemplate(28, PropertyHistoryComponent_th_28_Template, 2, 0, "th", 6)(29, PropertyHistoryComponent_td_29_Template, 4, 7, "td", 17);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵtemplate(30, PropertyHistoryComponent_tr_30_Template, 1, 0, "tr", 18)(31, PropertyHistoryComponent_tr_31_Template, 1, 3, "tr", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(32, "mat-paginator", 20, 0);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.data.historyType === 1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.data.historyType === 2);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("hidden", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("dataSource", ctx.propertiesDataSource);
            i0.ɵɵadvance(16);
            i0.ɵɵproperty("ngIf", ctx.data.historyType === 1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.data.historyType === 1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.data.historyType === 1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("matHeaderRowDef", ctx.displayedPropertyColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("matRowDefColumns", ctx.displayedPropertyColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("length", ctx.propertiesDataSource.data.length)("pageSize", 5);
        } }, dependencies: [i1$3.NgClass, i1$3.NgIf, i1$3.NgStyle, i5.MatIconButton, i1$2.MatDialogTitle, i1$2.MatDialogContent, i6.MatIcon, i7$1.MatPaginator, i8$1.MatProgressBar, i9.MatSort, i9.MatSortHeader, i10.MatTable, i10.MatHeaderCellDef, i10.MatHeaderRowDef, i10.MatColumnDef, i10.MatCellDef, i10.MatRowDef, i10.MatHeaderCell, i10.MatCell, i10.MatHeaderRow, i10.MatRow, i11.MatTooltip, i1$3.DatePipe], styles: ["table[_ngcontent-%COMP%]{width:100%}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PropertyHistoryComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-property-history', template: "<mat-progress-bar mode=\"indeterminate\" *ngIf=\"isLoading\"></mat-progress-bar>\r\n<h1 mat-dialog-title *ngIf=\"data.historyType === 1\">History of {{data.Property.Name}}</h1>\r\n<h1 mat-dialog-title *ngIf=\"data.historyType === 2\">Deleted propertied history</h1>\r\n\r\n<mat-dialog-content>\r\n\t<div [hidden]=\"isLoading\">\r\n\t\t<table mat-table [dataSource]=\"propertiesDataSource\" matSort>\r\n\r\n\t\t\t<ng-container matColumnDef=\"action\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Action</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let propertyHistory\">\r\n\t\t\t\t\t<button mat-icon-button>\r\n\t\t\t\t\t\t<mat-icon color=\"accent\" [ngStyle]=\"setActionColor(propertyHistory)\">{{setActionIcon(propertyHistory)}}</mat-icon>\r\n\t\t\t\t\t</button>\r\n\t\t\t\t</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"name\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let propertyHistory\">{{propertyHistory.Property.Name}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"title\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Title</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let propertyHistory\">{{propertyHistory.Property.Title}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"dataType\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Data Type</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let propertyHistory\">{{getDataTypeName(propertyHistory.Property.DataTypeId)}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"nullable\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Nullable</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let propertyHistory\">{{propertyHistory.Property.IsNullable}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"dataEntityType\" *ngIf=\"data.historyType === 1\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Data Entity Type</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let propertyHistory\">{{getEntityTypeName(propertyHistory.Property.DataEntityTypeId)}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"usage\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Usage</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let propertyHistory\">{{getPropertyUsageName(propertyHistory.Property.PropertyGeneralUsageCategoryId)}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"foreignKey\" *ngIf=\"data.historyType === 1\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Foreign Key</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let propertyHistory\">{{getPropertyName(propertyHistory.Property.ForeignKeyPropertyId)}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"inverse\" *ngIf=\"data.historyType === 1\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Inverse Property</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let propertyHistory\">{{getPropertyName(propertyHistory.Property.InversePropertyId)}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"ActionDate\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Action Date</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let propertyHistory\" [matTooltip]=\"propertyHistory.StartTime | date:'shortTime'\">{{propertyHistory.StartTime\r\n\t\t\t\t\t| date}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<tr mat-header-row *matHeaderRowDef=\"displayedPropertyColumns\"></tr>\r\n\t\t\t<tr mat-row *matRowDef=\"let property; columns: displayedPropertyColumns;\" [ngClass]=\"{'highlight': selectedProperty?.Property.Id === property.Id}\"\r\n\t\t\t (click)=\"selectProperty(property)\"></tr>\r\n\t\t</table>\r\n\t\t<mat-paginator id=\"propertiesPaginator\" #propertiesPaginator [length]=\"propertiesDataSource.data.length\" [pageSize]=\"5\"></mat-paginator>\r\n\t</div>\r\n</mat-dialog-content>\r\n", styles: ["table{width:100%}\n"] }]
    }], () => [{ type: i1$2.MatDialogRef }, { type: PropertyHistoryModel, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }, { type: SnackBarService }, { type: HistoryService }], { propertyPaginator: [{
            type: ViewChild,
            args: ['propertiesPaginator', { static: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PropertyHistoryComponent, { className: "PropertyHistoryComponent", filePath: "lib/administration/history/property-history/property-history.component.ts", lineNumber: 17 }); })();

class ReleaseMetadataRequest {
}

function ReleaseMetadataSettingsComponent_p_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r2, " ");
} }
function ReleaseMetadataSettingsComponent_p_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r3, " ");
} }
function ReleaseMetadataSettingsComponent_p_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r4, " ");
} }
function ReleaseMetadataSettingsComponent_button_23_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 13);
    i0.ɵɵlistener("click", function ReleaseMetadataSettingsComponent_button_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.release()); });
    i0.ɵɵelementStart(1, "mat-icon", 14);
    i0.ɵɵtext(2, "save");
    i0.ɵɵelementEnd()();
} }
function ReleaseMetadataSettingsComponent_button_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵelement(1, "mat-spinner", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("diameter", 20);
} }
class ReleaseMetadataSettingsComponent {
    constructor(dialogRef, data, apiClient, snackbarService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.apiClient = apiClient;
        this.snackbarService = snackbarService;
        this.releaseSettings = new ReleaseMetadataRequest();
        this.releaseSettingsError = new ReleaseMetadataRequest();
        this.submitLoading = false;
    }
    ngOnInit() {
    }
    release() {
        this.submitLoading = true;
        this.apiClient.releaseMetadata(this.releaseSettings)
            .subscribe((x) => {
            this.dialogRef.close(true);
        }, (error) => {
            this.submitLoading = false;
            this.releaseSettingsError = error.error;
            this.snackbarService.open(error.statusText);
            this.submitLoading = false;
        });
    }
    cancel() {
        this.dialogRef.close();
    }
    static { this.ɵfac = function ReleaseMetadataSettingsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReleaseMetadataSettingsComponent)(i0.ɵɵdirectiveInject(i1$2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA), i0.ɵɵdirectiveInject(MetadataManagementApiClient), i0.ɵɵdirectiveInject(SnackBarService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReleaseMetadataSettingsComponent, selectors: [["dscribe-release-metadata-settings"]], standalone: false, decls: 28, vars: 10, consts: [["releaseForm", "ngForm"], ["mat-dialog-title", ""], ["appearance", "outline"], ["matInput", "", "placeholder", "App Instance Id", "name", "appInstanceId", 3, "ngModelChange", "ngModel"], ["class", "form-error-message", 4, "ngFor", "ngForOf"], ["name", "setAsInstanceMetadata", 3, "ngModelChange", "ngModel"], ["matInput", "", "placeholder", "Version", "name", "version", 3, "ngModelChange", "ngModel"], ["matInput", "", "placeholder", "Version Code", "name", "versionCode", 3, "ngModelChange", "ngModel"], ["mat-icon-button", "", 3, "click", 4, "ngIf"], ["mat-icon-button", "", 4, "ngIf"], ["mat-icon-button", "", 3, "click", "disabled"], ["color", "warn"], [1, "form-error-message"], ["mat-icon-button", "", 3, "click"], ["color", "primary"], ["mat-icon-button", ""], ["color", "accent", 2, "margin-left", "10px", 3, "diameter"]], template: function ReleaseMetadataSettingsComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "h1", 1);
            i0.ɵɵtext(1, "Release Metadata");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "mat-dialog-content")(3, "form", null, 0)(5, "mat-form-field", 2)(6, "mat-label");
            i0.ɵɵtext(7, "App Instance Id");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 3);
            i0.ɵɵtwoWayListener("ngModelChange", function ReleaseMetadataSettingsComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.releaseSettings.AppInstanceId, $event) || (ctx.releaseSettings.AppInstanceId = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, ReleaseMetadataSettingsComponent_p_9_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "mat-checkbox", 5);
            i0.ɵɵtwoWayListener("ngModelChange", function ReleaseMetadataSettingsComponent_Template_mat_checkbox_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.releaseSettings.SetAsInstanceMetadata, $event) || (ctx.releaseSettings.SetAsInstanceMetadata = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtext(11, "Set as Instance Metadata");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "mat-form-field", 2)(13, "mat-label");
            i0.ɵɵtext(14, "Version");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "input", 6);
            i0.ɵɵtwoWayListener("ngModelChange", function ReleaseMetadataSettingsComponent_Template_input_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.releaseSettings.Version, $event) || (ctx.releaseSettings.Version = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(16, ReleaseMetadataSettingsComponent_p_16_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "mat-form-field", 2)(18, "mat-label");
            i0.ɵɵtext(19, "Version Code");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "input", 7);
            i0.ɵɵtwoWayListener("ngModelChange", function ReleaseMetadataSettingsComponent_Template_input_ngModelChange_20_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.releaseSettings.VersionCode, $event) || (ctx.releaseSettings.VersionCode = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(21, ReleaseMetadataSettingsComponent_p_21_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(22, "mat-dialog-actions");
            i0.ɵɵtemplate(23, ReleaseMetadataSettingsComponent_button_23_Template, 3, 0, "button", 8)(24, ReleaseMetadataSettingsComponent_button_24_Template, 2, 1, "button", 9);
            i0.ɵɵelementStart(25, "button", 10);
            i0.ɵɵlistener("click", function ReleaseMetadataSettingsComponent_Template_button_click_25_listener() { return ctx.cancel(); });
            i0.ɵɵelementStart(26, "mat-icon", 11);
            i0.ɵɵtext(27, "cancel");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.releaseSettings.AppInstanceId);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.releaseSettingsError == null ? null : ctx.releaseSettingsError.AppInstanceId);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.releaseSettings.SetAsInstanceMetadata);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.releaseSettings.Version);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.releaseSettingsError == null ? null : ctx.releaseSettingsError.Version);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.releaseSettings.VersionCode);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.releaseSettingsError == null ? null : ctx.releaseSettingsError.VersionCode);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.submitLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.submitLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.submitLoading);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.ɵNgNoValidate, i5$1.DefaultValueAccessor, i5$1.NgControlStatus, i5$1.NgControlStatusGroup, i5$1.NgModel, i5$1.NgForm, i5.MatIconButton, i9$3.MatCheckbox, i1$2.MatDialogTitle, i1$2.MatDialogActions, i1$2.MatDialogContent, i8.MatFormField, i8.MatLabel, i6.MatIcon, i10$1.MatInput, i13.MatProgressSpinner], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReleaseMetadataSettingsComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-release-metadata-settings', template: "<h1 mat-dialog-title>Release Metadata</h1>\r\n\r\n<mat-dialog-content>\r\n\r\n\t<form #releaseForm=\"ngForm\">\r\n\t\t<mat-form-field appearance=\"outline\">\r\n\t\t\t<mat-label>App Instance Id</mat-label>\r\n\t\t\t<input matInput placeholder=\"App Instance Id\" name=\"appInstanceId\" [(ngModel)]=\"releaseSettings.AppInstanceId\">\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of releaseSettingsError?.AppInstanceId\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-checkbox name=\"setAsInstanceMetadata\" [(ngModel)]=\"releaseSettings.SetAsInstanceMetadata\">Set as Instance\r\n\t\t\tMetadata</mat-checkbox>\r\n\r\n\t\t<mat-form-field appearance=\"outline\">\r\n\t\t\t<mat-label>Version</mat-label>\r\n\t\t\t<input matInput placeholder=\"Version\" name=\"version\" [(ngModel)]=\"releaseSettings.Version\">\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of releaseSettingsError?.Version\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field appearance=\"outline\">\r\n\t\t\t<mat-label>Version Code</mat-label>\r\n\t\t\t<input matInput placeholder=\"Version Code\" name=\"versionCode\" [(ngModel)]=\"releaseSettings.VersionCode\">\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of releaseSettingsError?.VersionCode\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t</form>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions>\r\n\t<button mat-icon-button (click)=\"release()\" *ngIf=\"!submitLoading\">\r\n\t\t<mat-icon color=\"primary\">save</mat-icon>\r\n\t</button>\r\n\t<button mat-icon-button *ngIf=\"submitLoading\">\r\n\t\t<mat-spinner style=\"margin-left: 10px;\" [diameter]=\"20\" color=\"accent\"></mat-spinner>\r\n\t</button>\r\n\t<button mat-icon-button (click)=\"cancel()\" [disabled]=\"submitLoading\">\r\n\t\t<mat-icon color=\"warn\">cancel</mat-icon>\r\n\t</button>\r\n</mat-dialog-actions>\r\n" }]
    }], () => [{ type: i1$2.MatDialogRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }, { type: MetadataManagementApiClient }, { type: SnackBarService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ReleaseMetadataSettingsComponent, { className: "ReleaseMetadataSettingsComponent", filePath: "lib/administration/release-metadata-settings/release-metadata-settings.component.ts", lineNumber: 14 }); })();

const _c0$3 = ["entityTypesPaginator"];
const _c1$2 = ["propertiesPaginator"];
const _c2 = a0 => ({ "color": a0 });
const _c3 = a0 => ({ "highlight": a0 });
function MetadataManagementComponent_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function MetadataManagementComponent_button_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.deleteEntityType()); });
    i0.ɵɵelementStart(1, "mat-icon", 40);
    i0.ɵɵtext(2, "delete");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", !ctx_r1.selectedEntityType);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(2, _c2, ctx_r1.selectedEntityType ? "" : "#dddddd"));
} }
function MetadataManagementComponent_button_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 41);
    i0.ɵɵelement(1, "mat-spinner", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("diameter", 20);
} }
function MetadataManagementComponent_button_23_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 43);
    i0.ɵɵlistener("click", function MetadataManagementComponent_button_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.generateCode()); });
    i0.ɵɵelementStart(1, "mat-icon", 15);
    i0.ɵɵtext(2, "code");
    i0.ɵɵelementEnd()();
} }
function MetadataManagementComponent_button_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 44);
    i0.ɵɵelement(1, "mat-spinner", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("diameter", 20);
} }
function MetadataManagementComponent_th_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Name");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityType_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entityType_r4.Name);
} }
function MetadataManagementComponent_th_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Usage");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityType_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getEntityTypeUsageName(entityType_r5.EntityTypeGeneralUsageCategoryId), " ");
} }
function MetadataManagementComponent_th_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Singular");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityType_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entityType_r6.SingularTitle);
} }
function MetadataManagementComponent_th_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Plural");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityType_r7 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entityType_r7.PluralTitle);
} }
function MetadataManagementComponent_th_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Code");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityType_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entityType_r8.CodePath);
} }
function MetadataManagementComponent_th_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Display Name");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityType_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entityType_r9.DisplayNamePath);
} }
function MetadataManagementComponent_tr_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 47);
} }
function MetadataManagementComponent_tr_45_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 48);
    i0.ɵɵlistener("click", function MetadataManagementComponent_tr_45_Template_tr_click_0_listener() { const entityType_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectEntityType(entityType_r11)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityType_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c3, (ctx_r1.selectedEntityType == null ? null : ctx_r1.selectedEntityType.Id) === entityType_r11.Id));
} }
function MetadataManagementComponent_span_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Properties of ", ctx_r1.selectedEntityType == null ? null : ctx_r1.selectedEntityType.Name);
} }
function MetadataManagementComponent_span_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Please select an entity type to manage its properties");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_button_69_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function MetadataManagementComponent_button_69_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.deleteProperty()); });
    i0.ɵɵelementStart(1, "mat-icon", 40);
    i0.ɵɵtext(2, "delete");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", !ctx_r1.selectedEntityType || !ctx_r1.selectedProperty);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(2, _c2, ctx_r1.selectedProperty ? "" : "#dddddd"));
} }
function MetadataManagementComponent_button_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 41);
    i0.ɵɵelement(1, "mat-spinner", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("diameter", 20);
} }
function MetadataManagementComponent_th_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Name");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const property_r13 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(property_r13.Name);
} }
function MetadataManagementComponent_th_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Title");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const property_r14 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(property_r14.Title);
} }
function MetadataManagementComponent_th_80_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Data Type");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const property_r15 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.getDataTypeName(property_r15.DataTypeId));
} }
function MetadataManagementComponent_th_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Nullable");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const property_r16 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(property_r16.IsNullable);
} }
function MetadataManagementComponent_th_86_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Data Entity Type");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_87_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const property_r17 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.getEntityTypeName(property_r17.DataEntityTypeId));
} }
function MetadataManagementComponent_th_89_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Usage");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_90_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const property_r18 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.getPropertyUsageName(property_r18.PropertyGeneralUsageCategoryId));
} }
function MetadataManagementComponent_th_92_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Foreign Key");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_93_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const property_r19 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.getPropertyName(property_r19.ForeignKeyPropertyId));
} }
function MetadataManagementComponent_th_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 45);
    i0.ɵɵtext(1, "Inverse Property");
    i0.ɵɵelementEnd();
} }
function MetadataManagementComponent_td_96_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const property_r20 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.getPropertyName(property_r20.InversePropertyId));
} }
function MetadataManagementComponent_tr_97_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 47);
} }
function MetadataManagementComponent_tr_98_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 48);
    i0.ɵɵlistener("click", function MetadataManagementComponent_tr_98_Template_tr_click_0_listener() { const property_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectProperty(property_r22)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const property_r22 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c3, (ctx_r1.selectedProperty == null ? null : ctx_r1.selectedProperty.Id) === property_r22.Id));
} }
class MetadataManagementComponent {
    constructor(apiClient, dialog, snackbarService, dscribeService) {
        this.apiClient = apiClient;
        this.dialog = dialog;
        this.snackbarService = snackbarService;
        this.dscribeService = dscribeService;
        this.entityTypes = [];
        this.entityTypesDataSource = new MatTableDataSource(this.entityTypes);
        this.entityTypesAreLoading = false;
        this.generateCodeLoading = false;
        this.deleteEntityLoading = false;
        this.deletePropertyLoading = false;
        this.propertiesDataSource = new MatTableDataSource();
        this.propertiesAreLoading = false;
        this.displayedEntityTypeColumns = ['name', 'usage', 'singular', 'plural', 'code', 'displayName'];
        this.displayedPropertyColumns = ['Name', 'title', 'dataType', 'nullable', 'dataEntityType', 'usage', 'foreignKey', 'inverse'];
    }
    ngOnInit() {
        this.entityTypesDataSource.paginator = this.entityTypesPaginator;
        this.propertiesDataSource.paginator = this.propertiesPaginator;
        this.entityTypesAreLoading = true;
        this.dscribeService.appInstance$.subscribe(() => this.apiClient.getBasicInfo().subscribe(data => {
            this.basicInfo = data;
            this.refreshEntityTypes();
        }, (errors) => {
            this.snackbarService.open(errors);
        }));
    }
    refreshEntityTypes() {
        this.apiClient.getEntityTypes()
            .subscribe(entityTypes => {
            this.entityTypesDataSource.data = this.entityTypes = entityTypes;
            this.entityTypesAreLoading = false;
        }, (errors) => {
            this.snackbarService.open(errors);
        });
    }
    selectEntityType(entityType) {
        if (entityType === this.selectedEntityType) {
            return;
        }
        this.propertiesDataSource.data = this.properties = [];
        this.selectedEntityType = entityType;
        if (entityType) {
            this.refreshProperties();
        }
    }
    selectProperty(property) {
        this.selectedProperty = property;
    }
    refreshProperties() {
        this.propertiesAreLoading = true;
        this.apiClient.getAllPropertiesInfo()
            .subscribe(info => this.allPropertiesInfo = info);
        this.apiClient.getProperties(this.selectedEntityType.Id)
            .subscribe(props => {
            this.propertiesDataSource.data = this.properties = props;
            this.propertiesAreLoading = false;
        });
    }
    getEntityTypeUsageName(id) {
        return this.basicInfo.EntityTypeGeneralUsageCategories.find(x => x.Id === id).Name;
    }
    getPropertyUsageName(id) {
        return this.basicInfo.PropertyGeneralUsageCategories.find(x => x.Id === id).Name;
    }
    getDataTypeName(id) {
        return this.basicInfo.DataTypes.find(x => x.Id === id).Name;
    }
    getEntityTypeName(id) {
        if (!id) {
            return null;
        }
        return this.entityTypes.find(x => x.Id === id).Name;
    }
    getPropertyName(id) {
        if (!id) {
            return;
        }
        const prop = this.properties.find(x => x.Id === id);
        if (prop) {
            return prop.Name;
        }
        return this.allPropertiesInfo.find(x => x.Id === id).Name;
    }
    addEntityType() {
        this.openAddNEditEntityTypeDialog({}, true);
    }
    editEntityType() {
        if (!this.selectedEntityType) {
            return;
        }
        this.openAddNEditEntityTypeDialog(this.selectedEntityType, false);
    }
    deleteEntityType() {
        this.deleteEntityLoading = true;
        if (!this.selectedEntityType) {
            return;
        }
        ConfirmationDialogComponent.Ask(this.dialog, 'Are you sure you want to delete this entity type?', 'This action cannot be undone')
            .subscribe(x => {
            if (x) {
                this.apiClient.deleteEntityType(this.selectedEntityType)
                    .subscribe(() => {
                    this.refreshEntityTypes();
                    this.deleteEntityLoading = false;
                }, (error) => {
                    this.snackbarService.open(error.error);
                    this.deleteEntityLoading = false;
                });
            }
            else {
                this.deleteEntityLoading = false;
            }
        });
    }
    showEntityHistory() {
        const data = new EntityTypeHistoryModel();
        data.EntityType.Id = this.selectedEntityType.Id;
        data.EntityType.Name = this.selectedEntityType.Name;
        data.basicInfo = this.basicInfo;
        data.historyType = HistoryType.addEdit;
        const dialogRef = this.dialog.open(EntityHistoryComponent, {
            width: '90%',
            data: data
        });
        dialogRef.afterClosed().subscribe((res => {
        }));
    }
    showDeletedEntityTypeHistory() {
        const data = new EntityTypeHistoryModel();
        data.basicInfo = this.basicInfo;
        data.historyType = HistoryType.deleted;
        const dialogRef = this.dialog.open(EntityHistoryComponent, {
            width: '90%',
            data: data
        });
        dialogRef.afterClosed().subscribe((res => {
        }));
    }
    showPropertyHistory() {
        const data = new PropertyHistoryModel();
        data.Property.Id = this.selectedProperty.Id;
        data.Property.Name = this.selectedProperty.Name;
        data.basicInfo = this.basicInfo;
        data.entityTypes = this.entityTypes;
        data.properties = this.properties;
        data.allPropertiesInfo = this.allPropertiesInfo;
        data.historyType = HistoryType.addEdit;
        const dialogRef = this.dialog.open(PropertyHistoryComponent, {
            width: '90%',
            data: data
        });
        dialogRef.afterClosed().subscribe((res => {
        }));
    }
    showDeletedPropertiesTypeHistory() {
        const data = new PropertyHistoryModel();
        data.properties = this.properties;
        data.basicInfo = this.basicInfo;
        data.entityTypes = this.entityTypes;
        data.properties = this.properties;
        data.allPropertiesInfo = this.allPropertiesInfo;
        data.historyType = HistoryType.deleted;
        const dialogRef = this.dialog.open(PropertyHistoryComponent, {
            width: '90%',
            data: data
        });
        dialogRef.afterClosed().subscribe((res => {
        }));
    }
    openAddNEditEntityTypeDialog(instance, isNew) {
        const dialogRef = this.dialog.open(AddNEditEntityTypeComponent, {
            width: '800px',
            disableClose: true,
            data: new AddNEditEntityTypeComponentData(instance, isNew, this.basicInfo)
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.refreshEntityTypes();
            }
        }, (errors) => {
            this.snackbarService.open(errors);
        });
    }
    addProperty() {
        const instance = new AddNEditPropertyMetadataModel();
        instance.OwnerEntityTypeId = this.selectedEntityType.Id;
        this.openAddNEditPropertyDialog(instance, true);
    }
    editProperty() {
        if (!this.selectedProperty) {
            return;
        }
        this.apiClient.getPropertyForEdit(this.selectedProperty.Id)
            .subscribe(property => {
            this.openAddNEditPropertyDialog(property, false);
        }, (errors) => {
            this.snackbarService.open(errors);
        });
    }
    deleteProperty() {
        this.deletePropertyLoading = true;
        if (!this.selectedProperty) {
            return;
        }
        ConfirmationDialogComponent.Ask(this.dialog, 'Are you sure you want to delete this property?', 'This action cannot be undone.')
            .subscribe(x => {
            if (x) {
                this.apiClient.deleteProperty(this.selectedProperty).subscribe(() => {
                    this.refreshProperties();
                }, (errors) => {
                    this.snackbarService.open(errors);
                });
            }
            this.deletePropertyLoading = false;
        }, (errors) => {
            this.snackbarService.open(errors);
            this.deletePropertyLoading = false;
        });
    }
    openAddNEditPropertyDialog(instance, isNew) {
        const dialogRef = this.dialog.open(AddNEditPropertyComponent, {
            width: '800px',
            disableClose: true,
            data: new AddNEditPropertyComponentData(instance, isNew, this.basicInfo, this.entityTypes, this.properties, this.allPropertiesInfo)
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.refreshProperties();
            }
        }, (errors) => {
            this.snackbarService.open(errors);
        });
    }
    openReleaseSettings() {
        this.dialog.open(ReleaseMetadataSettingsComponent, {
            width: '300px',
            disableClose: true,
        });
    }
    generateCode() {
        this.generateCodeLoading = true;
        this.apiClient.generateCode()
            .subscribe((x) => {
            this.generateCodeLoading = false;
            if (x.Success) {
                this.snackbarService.open('Code has generated successful.');
            }
            else {
                this.snackbarService.open('errors occured please see the validation errors');
            }
        }, (errors) => {
            this.generateCodeLoading = false;
            this.snackbarService.open(errors);
        });
    }
    static { this.ɵfac = function MetadataManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MetadataManagementComponent)(i0.ɵɵdirectiveInject(MetadataManagementApiClient), i0.ɵɵdirectiveInject(i1$2.MatDialog), i0.ɵɵdirectiveInject(SnackBarService), i0.ɵɵdirectiveInject(DscribeService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MetadataManagementComponent, selectors: [["dscribe-metadata-management"]], viewQuery: function MetadataManagementComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0$3, 7)(_c1$2, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.entityTypesPaginator = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.propertiesPaginator = _t.first);
        } }, standalone: false, decls: 101, vars: 42, consts: [["entityTypesPaginator", ""], ["propertiesPaginator", ""], [1, "page-content"], [1, "table-wrapper"], [1, "table-toolbar"], ["mat-icon-button", "", "matTooltip", "Show history", 3, "click", "disabled"], ["color", "primary", 3, "ngStyle"], ["mat-icon-button", "", 3, "click"], ["color", "primary"], ["mat-icon-button", "", 3, "click", "disabled"], ["color", "accent", 3, "ngStyle"], ["mat-icon-button", "", 3, "disabled", "click", 4, "ngIf"], ["mat-icon-button", "", "matTooltip", "Delete loading", "style", "margin-top: -26px;", 4, "ngIf"], ["mat-icon-button", "", "matTooltip", "Show deleted entities", 3, "click"], ["mat-icon-button", "", "matTooltip", "Release Metadata", 3, "click"], ["color", "warn"], ["mat-icon-button", "", "matTooltip", "Generate Code", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "matTooltip", "Generate Code Loading", "style", "margin-top: -26px;", 4, "ngIf"], ["mat-table", "", "matSort", "", 3, "dataSource"], ["matColumnDef", "name"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "usage"], ["matColumnDef", "singular"], ["matColumnDef", "plural"], ["matColumnDef", "code"], ["matColumnDef", "displayName"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "ngClass", "click", 4, "matRowDef", "matRowDefColumns"], ["id", "entityTypesPaginator", 3, "length", "pageSize"], [4, "ngIf"], ["mat-icon-button", "", "matTooltip", "Show deleted properties", 3, "click", "disabled"], ["matColumnDef", "Name"], ["matColumnDef", "title"], ["matColumnDef", "dataType"], ["matColumnDef", "nullable"], ["matColumnDef", "dataEntityType"], ["matColumnDef", "foreignKey"], ["matColumnDef", "inverse"], ["id", "propertiesPaginator", 3, "length", "pageSize"], ["color", "warn", 3, "ngStyle"], ["mat-icon-button", "", "matTooltip", "Delete loading", 2, "margin-top", "-26px"], ["strokeWidth", "3", "color", "accent", 3, "diameter"], ["mat-icon-button", "", "matTooltip", "Generate Code", 3, "click"], ["mat-icon-button", "", "matTooltip", "Generate Code Loading", 2, "margin-top", "-26px"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", "", 3, "click", "ngClass"]], template: function MetadataManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "span");
            i0.ɵɵtext(4, "Entity Types");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div")(6, "button", 5);
            i0.ɵɵlistener("click", function MetadataManagementComponent_Template_button_click_6_listener() { return ctx.showEntityHistory(); });
            i0.ɵɵelementStart(7, "mat-icon", 6);
            i0.ɵɵtext(8, "history");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "button", 7);
            i0.ɵɵlistener("click", function MetadataManagementComponent_Template_button_click_9_listener() { return ctx.addEntityType(); });
            i0.ɵɵelementStart(10, "mat-icon", 8);
            i0.ɵɵtext(11, "add");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "button", 9);
            i0.ɵɵlistener("click", function MetadataManagementComponent_Template_button_click_12_listener() { return ctx.editEntityType(); });
            i0.ɵɵelementStart(13, "mat-icon", 10);
            i0.ɵɵtext(14, "edit");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(15, MetadataManagementComponent_button_15_Template, 3, 4, "button", 11)(16, MetadataManagementComponent_button_16_Template, 2, 1, "button", 12);
            i0.ɵɵelementStart(17, "button", 13);
            i0.ɵɵlistener("click", function MetadataManagementComponent_Template_button_click_17_listener() { return ctx.showDeletedEntityTypeHistory(); });
            i0.ɵɵelementStart(18, "mat-icon", 8);
            i0.ɵɵtext(19, "delete_sweep");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "button", 14);
            i0.ɵɵlistener("click", function MetadataManagementComponent_Template_button_click_20_listener() { return ctx.openReleaseSettings(); });
            i0.ɵɵelementStart(21, "mat-icon", 15);
            i0.ɵɵtext(22, "new_releases");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(23, MetadataManagementComponent_button_23_Template, 3, 0, "button", 16)(24, MetadataManagementComponent_button_24_Template, 2, 1, "button", 17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "table", 18);
            i0.ɵɵelementContainerStart(26, 19);
            i0.ɵɵtemplate(27, MetadataManagementComponent_th_27_Template, 2, 0, "th", 20)(28, MetadataManagementComponent_td_28_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(29, 22);
            i0.ɵɵtemplate(30, MetadataManagementComponent_th_30_Template, 2, 0, "th", 20)(31, MetadataManagementComponent_td_31_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(32, 23);
            i0.ɵɵtemplate(33, MetadataManagementComponent_th_33_Template, 2, 0, "th", 20)(34, MetadataManagementComponent_td_34_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(35, 24);
            i0.ɵɵtemplate(36, MetadataManagementComponent_th_36_Template, 2, 0, "th", 20)(37, MetadataManagementComponent_td_37_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(38, 25);
            i0.ɵɵtemplate(39, MetadataManagementComponent_th_39_Template, 2, 0, "th", 20)(40, MetadataManagementComponent_td_40_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(41, 26);
            i0.ɵɵtemplate(42, MetadataManagementComponent_th_42_Template, 2, 0, "th", 20)(43, MetadataManagementComponent_td_43_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵtemplate(44, MetadataManagementComponent_tr_44_Template, 1, 0, "tr", 27)(45, MetadataManagementComponent_tr_45_Template, 1, 3, "tr", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(46, "mat-paginator", 29, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 3)(49, "div", 4);
            i0.ɵɵtemplate(50, MetadataManagementComponent_span_50_Template, 2, 1, "span", 30)(51, MetadataManagementComponent_span_51_Template, 2, 0, "span", 30);
            i0.ɵɵelementStart(52, "mat-card-actions")(53, "button", 9);
            i0.ɵɵlistener("click", function MetadataManagementComponent_Template_button_click_53_listener() { return ctx.showPropertyHistory(); });
            i0.ɵɵelementStart(54, "mat-icon", 6);
            i0.ɵɵtext(55, "history");
            i0.ɵɵelementEnd()();
            i0.ɵɵtext(56, "\u00A0 ");
            i0.ɵɵelementStart(57, "button", 9);
            i0.ɵɵlistener("click", function MetadataManagementComponent_Template_button_click_57_listener() { return ctx.addProperty(); });
            i0.ɵɵelementStart(58, "mat-icon", 6);
            i0.ɵɵtext(59, "add");
            i0.ɵɵelementEnd()();
            i0.ɵɵtext(60, "\u00A0 ");
            i0.ɵɵelementStart(61, "button", 9);
            i0.ɵɵlistener("click", function MetadataManagementComponent_Template_button_click_61_listener() { return ctx.editProperty(); });
            i0.ɵɵelementStart(62, "mat-icon", 10);
            i0.ɵɵtext(63, "edit");
            i0.ɵɵelementEnd()();
            i0.ɵɵtext(64, "\u00A0 ");
            i0.ɵɵelementStart(65, "button", 31);
            i0.ɵɵlistener("click", function MetadataManagementComponent_Template_button_click_65_listener() { return ctx.showDeletedPropertiesTypeHistory(); });
            i0.ɵɵelementStart(66, "mat-icon", 6);
            i0.ɵɵtext(67, "delete_sweep");
            i0.ɵɵelementEnd()();
            i0.ɵɵtext(68, "\u00A0 ");
            i0.ɵɵtemplate(69, MetadataManagementComponent_button_69_Template, 3, 4, "button", 11)(70, MetadataManagementComponent_button_70_Template, 2, 1, "button", 12);
            i0.ɵɵtext(71, "\u00A0 ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(72, "table", 18);
            i0.ɵɵelementContainerStart(73, 32);
            i0.ɵɵtemplate(74, MetadataManagementComponent_th_74_Template, 2, 0, "th", 20)(75, MetadataManagementComponent_td_75_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(76, 33);
            i0.ɵɵtemplate(77, MetadataManagementComponent_th_77_Template, 2, 0, "th", 20)(78, MetadataManagementComponent_td_78_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(79, 34);
            i0.ɵɵtemplate(80, MetadataManagementComponent_th_80_Template, 2, 0, "th", 20)(81, MetadataManagementComponent_td_81_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(82, 35);
            i0.ɵɵtemplate(83, MetadataManagementComponent_th_83_Template, 2, 0, "th", 20)(84, MetadataManagementComponent_td_84_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(85, 36);
            i0.ɵɵtemplate(86, MetadataManagementComponent_th_86_Template, 2, 0, "th", 20)(87, MetadataManagementComponent_td_87_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(88, 22);
            i0.ɵɵtemplate(89, MetadataManagementComponent_th_89_Template, 2, 0, "th", 20)(90, MetadataManagementComponent_td_90_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(91, 37);
            i0.ɵɵtemplate(92, MetadataManagementComponent_th_92_Template, 2, 0, "th", 20)(93, MetadataManagementComponent_td_93_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(94, 38);
            i0.ɵɵtemplate(95, MetadataManagementComponent_th_95_Template, 2, 0, "th", 20)(96, MetadataManagementComponent_td_96_Template, 2, 1, "td", 21);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵtemplate(97, MetadataManagementComponent_tr_97_Template, 1, 0, "tr", 27)(98, MetadataManagementComponent_tr_98_Template, 1, 3, "tr", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(99, "mat-paginator", 39, 1);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("disabled", !ctx.selectedEntityType);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(30, _c2, ctx.selectedEntityType ? "" : "#dddddd"));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", !ctx.selectedEntityType);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(32, _c2, ctx.selectedEntityType ? "" : "#dddddd"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.deleteEntityLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.deleteEntityLoading);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", !ctx.generateCodeLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.generateCodeLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("dataSource", ctx.entityTypesDataSource);
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("matHeaderRowDef", ctx.displayedEntityTypeColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("matRowDefColumns", ctx.displayedEntityTypeColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("length", ctx.entityTypesDataSource.data.length)("pageSize", 5);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.selectedEntityType);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.selectedEntityType);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.selectedEntityType || !ctx.selectedProperty);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(34, _c2, ctx.selectedProperty ? "" : "#dddddd"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", !ctx.selectedEntityType);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(36, _c2, ctx.selectedEntityType ? "" : "#dddddd"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", !ctx.selectedEntityType || !ctx.selectedProperty);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(38, _c2, ctx.selectedProperty ? "" : "#dddddd"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", !ctx.selectedEntityType);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(40, _c2, ctx.selectedEntityType ? "" : "#dddddd"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.deletePropertyLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.deletePropertyLoading);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("dataSource", ctx.propertiesDataSource);
            i0.ɵɵadvance(25);
            i0.ɵɵproperty("matHeaderRowDef", ctx.displayedPropertyColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("matRowDefColumns", ctx.displayedPropertyColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("length", ctx.propertiesDataSource.data == null ? null : ctx.propertiesDataSource.data.length)("pageSize", 5);
        } }, dependencies: [i1$3.NgClass, i1$3.NgIf, i1$3.NgStyle, i5.MatIconButton, i7.MatCardActions, i6.MatIcon, i7$1.MatPaginator, i13.MatProgressSpinner, i9.MatSort, i9.MatSortHeader, i10.MatTable, i10.MatHeaderCellDef, i10.MatHeaderRowDef, i10.MatColumnDef, i10.MatCellDef, i10.MatRowDef, i10.MatHeaderCell, i10.MatCell, i10.MatHeaderRow, i10.MatRow, i11.MatTooltip], styles: ["table[_ngcontent-%COMP%]{width:100%}.table-toolbar[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;align-items:center}.table-toolbar[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{margin-left:20px;font-size:large}.table-wrapper[_ngcontent-%COMP%]{border:lightgray 1px solid;margin-bottom:1px}tr.highlight[_ngcontent-%COMP%]{background-color:#0ff}.mat-spinner[_ngcontent-%COMP%]{margin-top:26px;margin-left:5px}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MetadataManagementComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-metadata-management', template: "<div class=\"page-content\">\r\n\t<div class=\"table-wrapper\">\r\n\t\t<div class=\"table-toolbar\">\r\n\t\t\t<span>Entity Types</span>\r\n\t\t\t<div>\r\n\t\t\t\t<button mat-icon-button (click)=\"showEntityHistory()\" [disabled]=\"!selectedEntityType\" matTooltip=\"Show history\">\r\n\t\t\t\t\t<mat-icon color=\"primary\" [ngStyle]=\"{ 'color' : selectedEntityType ? '' : '#dddddd' }\">history</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button (click)=\"addEntityType()\">\r\n\t\t\t\t\t<mat-icon color=\"primary\">add</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button (click)=\"editEntityType()\" [disabled]=\"!selectedEntityType\">\r\n\t\t\t\t\t<mat-icon color=\"accent\" [ngStyle]=\"{ 'color' : selectedEntityType ? '' : '#dddddd' }\">edit</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button (click)=\"deleteEntityType()\" [disabled]=\"!selectedEntityType\" *ngIf=\"!deleteEntityLoading\">\r\n\t\t\t\t\t<mat-icon color=\"warn\" [ngStyle]=\"{ 'color' : selectedEntityType ? '' : '#dddddd' }\">delete</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button matTooltip=\"Delete loading\" *ngIf=\"deleteEntityLoading\" style=\"margin-top: -26px;\">\r\n\t\t\t\t\t<mat-spinner strokeWidth=\"3\" [diameter]=\"20\" color=\"accent\"></mat-spinner>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button matTooltip=\"Show deleted entities\" (click)=\"showDeletedEntityTypeHistory()\">\r\n\t\t\t\t\t<mat-icon color=\"primary\">delete_sweep</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button (click)=\"openReleaseSettings()\" matTooltip=\"Release Metadata\">\r\n\t\t\t\t\t<mat-icon color=\"warn\">new_releases</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button (click)=\"generateCode()\" matTooltip=\"Generate Code\" *ngIf=\"!generateCodeLoading\">\r\n\t\t\t\t\t<mat-icon color=\"warn\">code</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button matTooltip=\"Generate Code Loading\" *ngIf=\"generateCodeLoading\" style=\"margin-top: -26px;\">\r\n\t\t\t\t\t<mat-spinner strokeWidth=\"3\" [diameter]=\"20\" color=\"accent\"></mat-spinner>\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<table mat-table [dataSource]=\"entityTypesDataSource\" matSort>\r\n\r\n\t\t\t<ng-container matColumnDef=\"name\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let entityType\">{{entityType.Name}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"usage\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Usage</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let entityType\">\r\n\t\t\t\t\t{{getEntityTypeUsageName(entityType.EntityTypeGeneralUsageCategoryId)}}\r\n\t\t\t\t</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"singular\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Singular</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let entityType\">{{entityType.SingularTitle}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"plural\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Plural</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let entityType\">{{entityType.PluralTitle}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"code\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Code</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let entityType\">{{entityType.CodePath}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"displayName\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Display Name</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let entityType\">{{entityType.DisplayNamePath}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<tr mat-header-row *matHeaderRowDef=\"displayedEntityTypeColumns\"></tr>\r\n\t\t\t<tr mat-row *matRowDef=\"let entityType; columns: displayedEntityTypeColumns;\" [ngClass]=\"{'highlight': selectedEntityType?.Id === entityType.Id}\"\r\n\t\t\t (click)=\"selectEntityType(entityType)\"></tr>\r\n\t\t</table>\r\n\t\t<mat-paginator id=\"entityTypesPaginator\" #entityTypesPaginator [length]=\"entityTypesDataSource.data.length\"\r\n\t\t [pageSize]=\"5\"></mat-paginator>\r\n\t</div>\r\n\r\n\t<div class=\"table-wrapper\">\r\n\t\t<div class=\"table-toolbar\">\r\n\t\t\t<span *ngIf=\"selectedEntityType\">Properties of {{selectedEntityType?.Name}}</span>\r\n\t\t\t<span *ngIf=\"!selectedEntityType\">Please select an entity type to manage its properties</span>\r\n\t\t\t<mat-card-actions>\r\n\t\t\t\t<button mat-icon-button (click)=\"showPropertyHistory()\" [disabled]=\"!selectedEntityType || !selectedProperty\">\r\n\t\t\t\t\t<mat-icon color=\"primary\" [ngStyle]=\"{ 'color' : selectedProperty ? '' : '#dddddd' }\">history</mat-icon>\r\n\t\t\t\t</button>&nbsp;\r\n\t\t\t\t<button mat-icon-button (click)=\"addProperty()\" [disabled]=\"!selectedEntityType\">\r\n\t\t\t\t\t<mat-icon color=\"primary\" [ngStyle]=\"{ 'color' : selectedEntityType ? '' : '#dddddd' }\">add</mat-icon>\r\n\t\t\t\t</button>&nbsp;\r\n\t\t\t\t<button mat-icon-button (click)=\"editProperty()\" [disabled]=\"!selectedEntityType || !selectedProperty\">\r\n\t\t\t\t\t<mat-icon color=\"accent\" [ngStyle]=\"{ 'color' : selectedProperty ? '' : '#dddddd' }\">edit</mat-icon>\r\n\t\t\t\t</button>&nbsp;\r\n\t\t\t\t<button mat-icon-button matTooltip=\"Show deleted properties\" (click)=\"showDeletedPropertiesTypeHistory()\" [disabled]=\"!selectedEntityType\">\r\n\t\t\t\t\t<mat-icon color=\"primary\" [ngStyle]=\"{ 'color' : selectedEntityType ? '' : '#dddddd' }\">delete_sweep</mat-icon>\r\n\t\t\t\t</button>&nbsp;\r\n\t\t\t\t<button mat-icon-button (click)=\"deleteProperty()\" [disabled]=\"!selectedEntityType || !selectedProperty\" *ngIf=\"!deletePropertyLoading\">\r\n\t\t\t\t\t<mat-icon color=\"warn\" [ngStyle]=\"{ 'color' : selectedProperty ? '' : '#dddddd' }\">delete</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button matTooltip=\"Delete loading\" *ngIf=\"deletePropertyLoading\" style=\"margin-top: -26px;\">\r\n\t\t\t\t\t<mat-spinner strokeWidth=\"3\" [diameter]=\"20\" color=\"accent\"></mat-spinner>\r\n\t\t\t\t</button>&nbsp;\r\n\t\t\t</mat-card-actions>\r\n\t\t</div>\r\n\t\t<table mat-table [dataSource]=\"propertiesDataSource\" matSort>\r\n\r\n\t\t\t<ng-container matColumnDef=\"Name\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let property\">{{property.Name}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"title\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Title</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let property\">{{property.Title}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"dataType\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Data Type</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let property\">{{getDataTypeName(property.DataTypeId)}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"nullable\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Nullable</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let property\">{{property.IsNullable}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"dataEntityType\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Data Entity Type</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let property\">{{getEntityTypeName(property.DataEntityTypeId)}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"usage\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Usage</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let property\">{{getPropertyUsageName(property.PropertyGeneralUsageCategoryId)}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"foreignKey\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Foreign Key</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let property\">{{getPropertyName(property.ForeignKeyPropertyId)}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"inverse\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Inverse Property</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let property\">{{getPropertyName(property.InversePropertyId)}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<tr mat-header-row *matHeaderRowDef=\"displayedPropertyColumns\"></tr>\r\n\t\t\t<tr mat-row *matRowDef=\"let property; columns: displayedPropertyColumns;\" [ngClass]=\"{'highlight': selectedProperty?.Id === property.Id}\"\r\n\t\t\t (click)=\"selectProperty(property)\"></tr>\r\n\t\t</table>\r\n\t\t<mat-paginator id=\"propertiesPaginator\" #propertiesPaginator [length]=\"propertiesDataSource.data?.length\" [pageSize]=\"5\"></mat-paginator>\r\n\t</div>\r\n</div>\r\n", styles: ["table{width:100%}.table-toolbar{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;align-items:center}.table-toolbar>span{margin-left:20px;font-size:large}.table-wrapper{border:lightgray 1px solid;margin-bottom:1px}tr.highlight{background-color:#0ff}.mat-spinner{margin-top:26px;margin-left:5px}\n"] }]
    }], () => [{ type: MetadataManagementApiClient }, { type: i1$2.MatDialog }, { type: SnackBarService }, { type: DscribeService }], { entityTypesPaginator: [{
            type: ViewChild,
            args: ['entityTypesPaginator', { static: true }]
        }], propertiesPaginator: [{
            type: ViewChild,
            args: ['propertiesPaginator', { static: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MetadataManagementComponent, { className: "MetadataManagementComponent", filePath: "lib/administration/metadata-management/metadata-management.component.ts", lineNumber: 32 }); })();

function AddNEditAppInstanceComponent_p_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r2, " ");
} }
function AddNEditAppInstanceComponent_p_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r3, " ");
} }
function AddNEditAppInstanceComponent_mat_option_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const appType_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", appType_r4.Id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", appType_r4.Name, " ");
} }
function AddNEditAppInstanceComponent_p_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r5, " ");
} }
function AddNEditAppInstanceComponent_mat_option_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const databaseProvider_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", databaseProvider_r6.Id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", databaseProvider_r6.Name, " ");
} }
function AddNEditAppInstanceComponent_p_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r7 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r7, " ");
} }
function AddNEditAppInstanceComponent_p_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r8, " ");
} }
function AddNEditAppInstanceComponent_p_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r9, " ");
} }
function AddNEditAppInstanceComponent_button_47_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function AddNEditAppInstanceComponent_button_47_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.save()); });
    i0.ɵɵelementStart(1, "mat-icon", 19);
    i0.ɵɵtext(2, "save");
    i0.ɵɵelementEnd()();
} }
function AddNEditAppInstanceComponent_button_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵelement(1, "mat-spinner", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("diameter", 20);
} }
class AddNEditAppInstanceComponentData {
    constructor(appInstance, isNew) {
        this.appInstance = appInstance;
        this.isNew = isNew;
    }
    get action() {
        return this.isNew ? 'Add' : 'Edit';
    }
}
class AddNEditAppInstanceComponent {
    constructor(dialogRef, data, appManagementService, snackbarService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.appManagementService = appManagementService;
        this.snackbarService = snackbarService;
        this.appInstance = new AppInstanceModel();
        this.appTypes = [];
        this.databaseProviders = [];
        this.submitLoading = false;
        this.appInstanceError = new AppInstanceModel();
    }
    ngOnInit() {
        this.appInstance = JSON.parse(JSON.stringify(this.data.appInstance));
        this.getAppTypes();
        this.getDatabaseProvider();
    }
    getAppTypes() {
        this.appTypes = [];
        this.appManagementService.getAppTypes().subscribe((res) => {
            this.appTypes = res;
        }, (error) => {
            this.snackbarService.open(error.error);
        });
    }
    getDatabaseProvider() {
        this.databaseProviders = [];
        this.appManagementService.getDatabaseProviders().subscribe((res) => {
            this.databaseProviders = res;
        }, (error) => {
            this.snackbarService.open(error.error);
        });
    }
    save() {
        this.submitLoading = true;
        const request = (this.data.isNew) ?
            this.appManagementService.addAppInstance(this.appInstance) :
            this.appManagementService.editAppInstance(this.appInstance);
        request.subscribe((data) => {
            this.dialogRef.close('saved');
            this.submitLoading = false;
            this.snackbarService.open('Success');
        }, (error) => {
            this.appInstanceError = error.error.errors ? error.error.errors : new AppInstanceModel();
            this.snackbarService.open(error.statusText);
            this.submitLoading = false;
        });
    }
    cancel() {
        this.dialogRef.close();
    }
    static { this.ɵfac = function AddNEditAppInstanceComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AddNEditAppInstanceComponent)(i0.ɵɵdirectiveInject(i1$2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA), i0.ɵɵdirectiveInject(AppManagementService), i0.ɵɵdirectiveInject(SnackBarService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AddNEditAppInstanceComponent, selectors: [["dscribe-host-add-n-edit-app-instance"]], standalone: false, decls: 52, vars: 23, consts: [["entityTypeForm", "ngForm"], ["mat-dialog-title", ""], ["appearance", "outline", 1, "full-width"], ["matInput", "", "type", "text", "placeholder", "Name", "name", "name", "required", "", 3, "ngModelChange", "ngModel"], ["class", "form-error-message", 4, "ngFor", "ngForOf"], ["matInput", "", "type", "text", "placeholder", "Title", "name", "title", 3, "ngModelChange", "ngModel"], ["name", "appType", "placeholder", "App Type", 3, "ngModelChange", "ngModel", "required"], [3, "value", 4, "ngFor", "ngForOf"], ["name", "databaseProvider", "placeholder", "Database provider", 3, "ngModelChange", "ngModel", "required"], ["name", "isEnabled", 3, "ngModelChange", "ngModel"], ["name", "isProduction", 3, "ngModelChange", "ngModel"], ["name", "migrateDatabase", 3, "ngModelChange", "ngModel"], ["mat-icon-button", "", 3, "click", 4, "ngIf"], ["mat-icon-button", "", 4, "ngIf"], ["mat-icon-button", "", 3, "click", "disabled"], ["color", "warn"], [1, "form-error-message"], [3, "value"], ["mat-icon-button", "", 3, "click"], ["color", "primary"], ["mat-icon-button", ""], ["color", "accent", 2, "margin-left", "10px", 3, "diameter"]], template: function AddNEditAppInstanceComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "h1", 1);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "mat-dialog-content")(3, "form", null, 0)(5, "mat-form-field", 2)(6, "mat-label");
            i0.ɵɵtext(7, "Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 3);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditAppInstanceComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.appInstance.Name, $event) || (ctx.appInstance.Name = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, AddNEditAppInstanceComponent_p_9_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "mat-form-field", 2)(11, "mat-label");
            i0.ɵɵtext(12, "Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "input", 5);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditAppInstanceComponent_Template_input_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.appInstance.Title, $event) || (ctx.appInstance.Title = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(14, AddNEditAppInstanceComponent_p_14_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "mat-form-field", 2)(16, "mat-label");
            i0.ɵɵtext(17, "App type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "mat-select", 6);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditAppInstanceComponent_Template_mat_select_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.appInstance.AppTypeId, $event) || (ctx.appInstance.AppTypeId = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtemplate(19, AddNEditAppInstanceComponent_mat_option_19_Template, 2, 2, "mat-option", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(20, AddNEditAppInstanceComponent_p_20_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "mat-form-field", 2)(22, "mat-label");
            i0.ɵɵtext(23, "Database Provider");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "mat-select", 8);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditAppInstanceComponent_Template_mat_select_ngModelChange_24_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.appInstance.DatabaseProviderId, $event) || (ctx.appInstance.DatabaseProviderId = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtemplate(25, AddNEditAppInstanceComponent_mat_option_25_Template, 2, 2, "mat-option", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(26, AddNEditAppInstanceComponent_p_26_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "mat-form-field", 2)(28, "mat-label");
            i0.ɵɵtext(29, "Data Connection String");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "input", 5);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditAppInstanceComponent_Template_input_ngModelChange_30_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.appInstance.DataConnectionString, $event) || (ctx.appInstance.DataConnectionString = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(31, AddNEditAppInstanceComponent_p_31_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "mat-form-field", 2)(33, "mat-label");
            i0.ɵɵtext(34, "LOB Connection String");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "input", 5);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditAppInstanceComponent_Template_input_ngModelChange_35_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.appInstance.LobConnectionString, $event) || (ctx.appInstance.LobConnectionString = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(36, AddNEditAppInstanceComponent_p_36_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div")(38, "mat-checkbox", 9);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditAppInstanceComponent_Template_mat_checkbox_ngModelChange_38_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.appInstance.IsEnabled, $event) || (ctx.appInstance.IsEnabled = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtext(39, "Is Enable");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "div")(41, "mat-checkbox", 10);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditAppInstanceComponent_Template_mat_checkbox_ngModelChange_41_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.appInstance.IsProduction, $event) || (ctx.appInstance.IsProduction = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtext(42, "Is Production");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "div")(44, "mat-checkbox", 11);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditAppInstanceComponent_Template_mat_checkbox_ngModelChange_44_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.appInstance.MigrateDatabase, $event) || (ctx.appInstance.MigrateDatabase = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtext(45, "Migrate Database");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(46, "mat-dialog-actions");
            i0.ɵɵtemplate(47, AddNEditAppInstanceComponent_button_47_Template, 3, 0, "button", 12)(48, AddNEditAppInstanceComponent_button_48_Template, 2, 1, "button", 13);
            i0.ɵɵelementStart(49, "button", 14);
            i0.ɵɵlistener("click", function AddNEditAppInstanceComponent_Template_button_click_49_listener() { return ctx.cancel(); });
            i0.ɵɵelementStart(50, "mat-icon", 15);
            i0.ɵɵtext(51, "cancel");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("", ctx.data.isNew ? "New" : "Edit", " App instance");
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.appInstance.Name);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.appInstanceError == null ? null : ctx.appInstanceError.Name);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.appInstance.Title);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.appInstanceError == null ? null : ctx.appInstanceError.Title);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.appInstance.AppTypeId);
            i0.ɵɵproperty("required", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.appTypes);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.appInstanceError == null ? null : ctx.appInstanceError.AppTypeId);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.appInstance.DatabaseProviderId);
            i0.ɵɵproperty("required", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.databaseProviders);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.appInstanceError == null ? null : ctx.appInstanceError.DatabaseProviderId);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.appInstance.DataConnectionString);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.appInstanceError == null ? null : ctx.appInstanceError.DataConnectionString);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.appInstance.LobConnectionString);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.appInstanceError == null ? null : ctx.appInstanceError.LobConnectionString);
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.appInstance.IsEnabled);
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.appInstance.IsProduction);
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.appInstance.MigrateDatabase);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.submitLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.submitLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.submitLoading);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.ɵNgNoValidate, i5$1.DefaultValueAccessor, i5$1.NgControlStatus, i5$1.NgControlStatusGroup, i5$1.RequiredValidator, i5$1.NgModel, i5$1.NgForm, i6$1.MatOption, i5.MatIconButton, i9$3.MatCheckbox, i1$2.MatDialogTitle, i1$2.MatDialogActions, i1$2.MatDialogContent, i8.MatFormField, i8.MatLabel, i6.MatIcon, i10$1.MatInput, i13.MatProgressSpinner, i13$1.MatSelect], styles: [".connection__string__section[_ngcontent-%COMP%]{border:solid 1px lightgray;padding:15px;margin-bottom:5px}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddNEditAppInstanceComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-host-add-n-edit-app-instance', template: "<h1 mat-dialog-title>{{data.isNew ? 'New' : 'Edit'}} App instance</h1>\r\n\r\n<mat-dialog-content>\r\n\t<form #entityTypeForm=\"ngForm\">\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Name</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Name\" name=\"name\" [(ngModel)]=\"appInstance.Name\" required>\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of appInstanceError?.Name\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Title</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Title\" name=\"title\" [(ngModel)]=\"appInstance.Title\">\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of appInstanceError?.Title\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>App type</mat-label>\r\n\t\t\t<mat-select name=\"appType\" placeholder=\"App Type\" [(ngModel)]=\"appInstance.AppTypeId\" [required]=\"true\">\r\n\t\t\t\t<mat-option *ngFor=\"let appType of appTypes\" [value]=\"appType.Id\">\r\n\t\t\t\t\t{{appType.Name}}\r\n\t\t\t\t</mat-option>\r\n\t\t\t</mat-select>\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of appInstanceError?.AppTypeId\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Database Provider</mat-label>\r\n\t\t\t<mat-select name=\"databaseProvider\" placeholder=\"Database provider\" [(ngModel)]=\"appInstance.DatabaseProviderId\"\r\n\t\t\t [required]=\"true\">\r\n\t\t\t\t<mat-option *ngFor=\"let databaseProvider of databaseProviders\" [value]=\"databaseProvider.Id\">\r\n\t\t\t\t\t{{databaseProvider.Name}}\r\n\t\t\t\t</mat-option>\r\n\t\t\t</mat-select>\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of appInstanceError?.DatabaseProviderId\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n        </mat-form-field>\r\n        \r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Data Connection String</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Title\" name=\"title\" [(ngModel)]=\"appInstance.DataConnectionString\">\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of appInstanceError?.DataConnectionString\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>LOB Connection String</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Title\" name=\"title\" [(ngModel)]=\"appInstance.LobConnectionString\">\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of appInstanceError?.LobConnectionString\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n        <div>\r\n\t\t\t<mat-checkbox name=\"isEnabled\" [(ngModel)]=\"appInstance.IsEnabled\">Is Enable</mat-checkbox>\r\n\t\t</div>\r\n\t\t<div>\r\n\t\t\t<mat-checkbox name=\"isProduction\" [(ngModel)]=\"appInstance.IsProduction\">Is Production</mat-checkbox>\r\n        </div>\r\n        <div>\r\n\t\t\t<mat-checkbox name=\"migrateDatabase\" [(ngModel)]=\"appInstance.MigrateDatabase\">Migrate Database</mat-checkbox>\r\n\t\t</div>\r\n\t</form>\r\n\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions>\r\n\t<button mat-icon-button (click)=\"save()\" *ngIf=\"!submitLoading\">\r\n\t\t<mat-icon color=\"primary\">save</mat-icon>\r\n\t</button>\r\n\t<button mat-icon-button *ngIf=\"submitLoading\">\r\n\t\t<mat-spinner style=\"margin-left: 10px;\" [diameter]=\"20\" color=\"accent\"></mat-spinner>\r\n\t</button>\r\n\t<button mat-icon-button (click)=\"cancel()\" [disabled]=\"submitLoading\">\r\n\t\t<mat-icon color=\"warn\">cancel</mat-icon>\r\n\t</button>\r\n</mat-dialog-actions>\r\n", styles: [".connection__string__section{border:solid 1px lightgray;padding:15px;margin-bottom:5px}\n"] }]
    }], () => [{ type: i1$2.MatDialogRef }, { type: AddNEditAppInstanceComponentData, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }, { type: AppManagementService }, { type: SnackBarService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AddNEditAppInstanceComponent, { className: "AddNEditAppInstanceComponent", filePath: "lib/administration/settings/add-n-edit-app-instance/add-n-edit-app-instancecomponent.ts", lineNumber: 28 }); })();

class AppTypeModel {
}

function AddNEditAppTypeComponent_p_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r2, " ");
} }
function AddNEditAppTypeComponent_p_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r3, " ");
} }
function AddNEditAppTypeComponent_button_16_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵlistener("click", function AddNEditAppTypeComponent_button_16_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.save()); });
    i0.ɵɵelementStart(1, "mat-icon", 12);
    i0.ɵɵtext(2, "save");
    i0.ɵɵelementEnd()();
} }
function AddNEditAppTypeComponent_button_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 13);
    i0.ɵɵelement(1, "mat-spinner", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("diameter", 20);
} }
class AddNEditAppTypeComponentData {
    constructor(appType, isNew) {
        this.appType = appType;
        this.isNew = isNew;
    }
    get action() {
        return this.isNew ? 'Add' : 'Edit';
    }
}
class AddNEditAppTypeComponent {
    constructor(dialogRef, data, appManagementService, snackbarService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.appManagementService = appManagementService;
        this.snackbarService = snackbarService;
        this.appType = new AppTypeModel();
        this.submitLoading = false;
    }
    ngOnInit() {
        this.appType = JSON.parse(JSON.stringify(this.data.appType));
    }
    save() {
        this.submitLoading = true;
        const request = (this.data.isNew) ?
            this.appManagementService.addAppType(this.appType) :
            this.appManagementService.editAppType(this.appType);
        request.subscribe((data) => {
            this.submitLoading = false;
            this.dialogRef.close('saved');
            this.snackbarService.open('Success');
        }, (error) => {
            this.appTypeError = error.error;
            this.snackbarService.open(error.statusText);
            this.submitLoading = false;
        });
    }
    cancel() {
        this.dialogRef.close();
    }
    static { this.ɵfac = function AddNEditAppTypeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AddNEditAppTypeComponent)(i0.ɵɵdirectiveInject(i1$2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA), i0.ɵɵdirectiveInject(AppManagementService), i0.ɵɵdirectiveInject(SnackBarService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AddNEditAppTypeComponent, selectors: [["dscribe-host-add-n-edit-app-type"]], standalone: false, decls: 21, vars: 8, consts: [["entityTypeForm", "ngForm"], ["mat-dialog-title", ""], ["appearance", "outline", 1, "full-width"], ["matInput", "", "type", "text", "placeholder", "Name", "name", "name", "required", "", 3, "ngModelChange", "ngModel"], ["class", "form-error-message", 4, "ngFor", "ngForOf"], ["matInput", "", "type", "text", "placeholder", "Title", "name", "title", 3, "ngModelChange", "ngModel"], ["mat-icon-button", "", 3, "click", 4, "ngIf"], ["mat-icon-button", "", 4, "ngIf"], ["mat-icon-button", "", 3, "click", "disabled"], ["color", "warn"], [1, "form-error-message"], ["mat-icon-button", "", 3, "click"], ["color", "primary"], ["mat-icon-button", ""], ["color", "accent", 2, "margin-left", "10px", 3, "diameter"]], template: function AddNEditAppTypeComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "h1", 1);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "mat-dialog-content")(3, "form", null, 0)(5, "mat-form-field", 2)(6, "mat-label");
            i0.ɵɵtext(7, "Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 3);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditAppTypeComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.appType.Name, $event) || (ctx.appType.Name = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, AddNEditAppTypeComponent_p_9_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "mat-form-field", 2)(11, "mat-label");
            i0.ɵɵtext(12, "Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "input", 5);
            i0.ɵɵtwoWayListener("ngModelChange", function AddNEditAppTypeComponent_Template_input_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.appType.Title, $event) || (ctx.appType.Title = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(14, AddNEditAppTypeComponent_p_14_Template, 2, 1, "p", 4);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "mat-dialog-actions");
            i0.ɵɵtemplate(16, AddNEditAppTypeComponent_button_16_Template, 3, 0, "button", 6)(17, AddNEditAppTypeComponent_button_17_Template, 2, 1, "button", 7);
            i0.ɵɵelementStart(18, "button", 8);
            i0.ɵɵlistener("click", function AddNEditAppTypeComponent_Template_button_click_18_listener() { return ctx.cancel(); });
            i0.ɵɵelementStart(19, "mat-icon", 9);
            i0.ɵɵtext(20, "cancel");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("", ctx.data.isNew ? "New" : "Edit", " App Type");
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.appType.Name);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.appTypeError == null ? null : ctx.appTypeError.Name);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.appType.Title);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.appTypeError == null ? null : ctx.appTypeError.Title);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.submitLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.submitLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.submitLoading);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.ɵNgNoValidate, i5$1.DefaultValueAccessor, i5$1.NgControlStatus, i5$1.NgControlStatusGroup, i5$1.RequiredValidator, i5$1.NgModel, i5$1.NgForm, i5.MatIconButton, i1$2.MatDialogTitle, i1$2.MatDialogActions, i1$2.MatDialogContent, i8.MatFormField, i8.MatLabel, i6.MatIcon, i10$1.MatInput, i13.MatProgressSpinner], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddNEditAppTypeComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-host-add-n-edit-app-type', template: "<h1 mat-dialog-title>{{data.isNew ? 'New' : 'Edit'}} App Type</h1>\r\n\r\n<mat-dialog-content>\r\n\t<form #entityTypeForm=\"ngForm\">\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Name</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Name\" name=\"name\" [(ngModel)]=\"appType.Name\" required>\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of appTypeError?.Name\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t\t<mat-form-field class=\"full-width\" appearance=\"outline\">\r\n\t\t\t<mat-label>Title</mat-label>\r\n\t\t\t<input matInput type=\"text\" placeholder=\"Title\" name=\"title\" [(ngModel)]=\"appType.Title\">\r\n\t\t\t<p class=\"form-error-message\" *ngFor=\"let e of appTypeError?.Title\">\r\n\t\t\t\t{{e}}\r\n\t\t\t</p>\r\n\t\t</mat-form-field>\r\n\r\n\t</form>\r\n\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions>\r\n\t<button mat-icon-button (click)=\"save()\" *ngIf=\"!submitLoading\">\r\n\t\t<mat-icon color=\"primary\">save</mat-icon>\r\n\t</button>\r\n\t<button mat-icon-button *ngIf=\"submitLoading\">\r\n\t\t<mat-spinner style=\"margin-left: 10px;\" [diameter]=\"20\" color=\"accent\"></mat-spinner>\r\n\t</button>\r\n\t<button mat-icon-button (click)=\"cancel()\" [disabled]=\"submitLoading\">\r\n\t\t<mat-icon color=\"warn\">cancel</mat-icon>\r\n\t</button>\r\n</mat-dialog-actions>\r\n" }]
    }], () => [{ type: i1$2.MatDialogRef }, { type: AddNEditAppTypeComponentData, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }, { type: AppManagementService }, { type: SnackBarService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AddNEditAppTypeComponent, { className: "AddNEditAppTypeComponent", filePath: "lib/administration/settings/add-n-edit-app-type/add-n-edit-app-type.component.ts", lineNumber: 25 }); })();

const _c0$2 = ["entitiyTypesPaginator"];
const _c1$1 = a0 => ({ "highlight": a0 });
function AppInstanceManagementComponent_th_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 20);
    i0.ɵɵtext(1, "Name");
    i0.ɵɵelementEnd();
} }
function AppInstanceManagementComponent_td_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const appInstance_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(appInstance_r1.Name);
} }
function AppInstanceManagementComponent_th_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 20);
    i0.ɵɵtext(1, "title");
    i0.ɵɵelementEnd();
} }
function AppInstanceManagementComponent_td_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const appInstance_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(appInstance_r2.Title);
} }
function AppInstanceManagementComponent_th_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 20);
    i0.ɵɵtext(1, "App name");
    i0.ɵɵelementEnd();
} }
function AppInstanceManagementComponent_td_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const appInstance_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(appInstance_r3.AppTypeName);
} }
function AppInstanceManagementComponent_th_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 20);
    i0.ɵɵtext(1, "Enable");
    i0.ɵɵelementEnd();
} }
function AppInstanceManagementComponent_td_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 21)(1, "button", 22)(2, "mat-icon", 8);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const appInstance_r4 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(appInstance_r4.IsEnabled === true ? "check" : "close");
} }
function AppInstanceManagementComponent_th_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 20);
    i0.ɵɵtext(1, "Production");
    i0.ɵɵelementEnd();
} }
function AppInstanceManagementComponent_td_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 21)(1, "button", 22)(2, "mat-icon", 8);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const appInstance_r5 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(appInstance_r5.IsProduction === true ? "check" : "close");
} }
function AppInstanceManagementComponent_tr_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 23);
} }
function AppInstanceManagementComponent_tr_35_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 24);
    i0.ɵɵlistener("click", function AppInstanceManagementComponent_tr_35_Template_tr_click_0_listener() { const appInstance_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.selectAppInstance(appInstance_r7)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const appInstance_r7 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c1$1, (ctx_r7.selectedAppInstance == null ? null : ctx_r7.selectedAppInstance.Id) === appInstance_r7.id));
} }
class AppInstanceManagementComponent {
    constructor(appManagementService, snackBarService, dialog) {
        this.appManagementService = appManagementService;
        this.snackBarService = snackBarService;
        this.dialog = dialog;
        this.displayedAppInstanceColumns = ['name', 'title', 'appTypeName', 'isEnabled', 'isProduction'];
        this.appInstances = [];
        this.selectedAppInstance = new AppInstanceModel();
        this.appInstancesDataSource = new MatTableDataSource(this.appInstances);
    }
    ngOnInit() {
        this.appInstancesDataSource.paginator = this.AppInstancePaginator;
        this.getAppInstances();
    }
    deleteAppInstance() {
        if (!this.selectedAppInstance) {
            return;
        }
        ConfirmationDialogComponent.Ask(this.dialog, 'Are you sure you want to delete this app instance?', 'This action cannot be undone.')
            .subscribe(x => {
            if (x) {
                this.appManagementService.deleteAppInstance(this.selectedAppInstance).subscribe(() => {
                    this.getAppInstances();
                }, (errors) => {
                    this.snackBarService.open(errors.error);
                });
            }
        });
    }
    addAppInstance() {
        this.openAddNEditAppInstanceDialog({}, true);
    }
    editAppInstance() {
        if (!this.selectedAppInstance) {
            return;
        }
        this.openAddNEditAppInstanceDialog(this.selectedAppInstance, false);
    }
    openAddNEditAppInstanceDialog(instance, isNew) {
        const dialogRef = this.dialog.open(AddNEditAppInstanceComponent, {
            width: '800px',
            disableClose: true,
            data: new AddNEditAppInstanceComponentData(instance, isNew)
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.selectedAppInstance = null;
                this.getAppInstances();
            }
        });
    }
    getAppInstances() {
        this.appInstances = [];
        this.appManagementService.getAppInstancesInfo().subscribe((res) => {
            this.appInstances = res;
            this.appInstancesDataSource.data = this.appInstances = res;
        }, (error) => {
            this.snackBarService.open(error);
        });
    }
    selectAppInstance(appInstance) {
        if (appInstance === this.selectedAppInstance) {
            return;
        }
        this.selectedAppInstance = appInstance;
    }
    static { this.ɵfac = function AppInstanceManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppInstanceManagementComponent)(i0.ɵɵdirectiveInject(AppManagementService), i0.ɵɵdirectiveInject(SnackBarService), i0.ɵɵdirectiveInject(i1$2.MatDialog)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppInstanceManagementComponent, selectors: [["dscribe-host-app-instance-management"]], viewQuery: function AppInstanceManagementComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0$2, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.AppInstancePaginator = _t.first);
        } }, standalone: false, decls: 38, vars: 7, consts: [["appInstancesPaginator", ""], [1, "page-content"], [1, "table-wrapper"], [1, "table-toolbar"], ["mat-icon-button", "", 3, "click"], ["color", "primary"], ["mat-icon-button", "", 3, "click", "disabled"], ["color", "accent"], ["color", "warn"], ["mat-table", "", "matSort", "", 3, "dataSource"], ["matColumnDef", "name"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "title"], ["matColumnDef", "appTypeName"], ["matColumnDef", "isEnabled"], ["matColumnDef", "isProduction"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "ngClass", "click", 4, "matRowDef", "matRowDefColumns"], ["id", "appInstancesPaginator", 3, "length", "pageSize"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-icon-button", ""], ["mat-header-row", ""], ["mat-row", "", 3, "click", "ngClass"]], template: function AppInstanceManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "span");
            i0.ɵɵtext(4, "AppInstances");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div")(6, "button", 4);
            i0.ɵɵlistener("click", function AppInstanceManagementComponent_Template_button_click_6_listener() { return ctx.addAppInstance(); });
            i0.ɵɵelementStart(7, "mat-icon", 5);
            i0.ɵɵtext(8, "add");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "button", 4);
            i0.ɵɵlistener("click", function AppInstanceManagementComponent_Template_button_click_9_listener() { return ctx.getAppInstances(); });
            i0.ɵɵelementStart(10, "mat-icon", 5);
            i0.ɵɵtext(11, "refresh");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "button", 6);
            i0.ɵɵlistener("click", function AppInstanceManagementComponent_Template_button_click_12_listener() { return ctx.editAppInstance(); });
            i0.ɵɵelementStart(13, "mat-icon", 7);
            i0.ɵɵtext(14, "edit");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "button", 6);
            i0.ɵɵlistener("click", function AppInstanceManagementComponent_Template_button_click_15_listener() { return ctx.deleteAppInstance(); });
            i0.ɵɵelementStart(16, "mat-icon", 8);
            i0.ɵɵtext(17, "delete");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(18, "table", 9);
            i0.ɵɵelementContainerStart(19, 10);
            i0.ɵɵtemplate(20, AppInstanceManagementComponent_th_20_Template, 2, 0, "th", 11)(21, AppInstanceManagementComponent_td_21_Template, 2, 1, "td", 12);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(22, 13);
            i0.ɵɵtemplate(23, AppInstanceManagementComponent_th_23_Template, 2, 0, "th", 11)(24, AppInstanceManagementComponent_td_24_Template, 2, 1, "td", 12);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(25, 14);
            i0.ɵɵtemplate(26, AppInstanceManagementComponent_th_26_Template, 2, 0, "th", 11)(27, AppInstanceManagementComponent_td_27_Template, 2, 1, "td", 12);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(28, 15);
            i0.ɵɵtemplate(29, AppInstanceManagementComponent_th_29_Template, 2, 0, "th", 11)(30, AppInstanceManagementComponent_td_30_Template, 4, 1, "td", 12);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(31, 16);
            i0.ɵɵtemplate(32, AppInstanceManagementComponent_th_32_Template, 2, 0, "th", 11)(33, AppInstanceManagementComponent_td_33_Template, 4, 1, "td", 12);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵtemplate(34, AppInstanceManagementComponent_tr_34_Template, 1, 0, "tr", 17)(35, AppInstanceManagementComponent_tr_35_Template, 1, 3, "tr", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(36, "mat-paginator", 19, 0);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("disabled", !ctx.selectedAppInstance);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", !ctx.selectedAppInstance);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("dataSource", ctx.appInstancesDataSource);
            i0.ɵɵadvance(16);
            i0.ɵɵproperty("matHeaderRowDef", ctx.displayedAppInstanceColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("matRowDefColumns", ctx.displayedAppInstanceColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("length", ctx.appInstances == null ? null : ctx.appInstances.length)("pageSize", 5);
        } }, dependencies: [i1$3.NgClass, i5.MatIconButton, i6.MatIcon, i7$1.MatPaginator, i9.MatSort, i9.MatSortHeader, i10.MatTable, i10.MatHeaderCellDef, i10.MatHeaderRowDef, i10.MatColumnDef, i10.MatCellDef, i10.MatRowDef, i10.MatHeaderCell, i10.MatCell, i10.MatHeaderRow, i10.MatRow], styles: ["table[_ngcontent-%COMP%]{width:100%}.table-toolbar[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;align-items:center}.table-toolbar[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{margin-left:20px;font-size:large}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppInstanceManagementComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-host-app-instance-management', template: "<div class=\"page-content\">\r\n\t<div class=\"table-wrapper\">\r\n\t\t<div class=\"table-toolbar\">\r\n\t\t\t<span>AppInstances</span>\r\n\t\t\t<div>\r\n\t\t\t\t<button mat-icon-button (click)=\"addAppInstance()\">\r\n\t\t\t\t\t<mat-icon color=\"primary\">add</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button (click)=\"getAppInstances()\">\r\n\t\t\t\t\t<mat-icon color=\"primary\">refresh</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button (click)=\"editAppInstance()\" [disabled]=\"!selectedAppInstance\">\r\n\t\t\t\t\t<mat-icon color=\"accent\">edit</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button (click)=\"deleteAppInstance()\" [disabled]=\"!selectedAppInstance\">\r\n\t\t\t\t\t<mat-icon color=\"warn\">delete</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<table mat-table [dataSource]=\"appInstancesDataSource\" matSort>\r\n\r\n\t\t\t<ng-container matColumnDef=\"name\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let appInstance\">{{appInstance.Name}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"title\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>title</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let appInstance\">{{appInstance.Title}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"appTypeName\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>App name</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let appInstance\">{{appInstance.AppTypeName}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"isEnabled\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Enable</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let appInstance\">\r\n\t\t\t\t\t<button mat-icon-button>\r\n\t\t\t\t\t\t<mat-icon color=\"warn\">{{appInstance.IsEnabled === true ? 'check' : 'close'}}</mat-icon>\r\n\t\t\t\t\t</button>\r\n\t\t\t\t</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"isProduction\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Production</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let appInstance\">\r\n\t\t\t\t\t<button mat-icon-button>\r\n\t\t\t\t\t\t<mat-icon color=\"warn\">{{appInstance.IsProduction === true ? 'check' : 'close'}}</mat-icon>\r\n\t\t\t\t\t</button>\r\n\t\t\t\t</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<tr mat-header-row *matHeaderRowDef=\"displayedAppInstanceColumns\"></tr>\r\n\t\t\t<tr mat-row *matRowDef=\"let appInstance; columns: displayedAppInstanceColumns;\" [ngClass]=\"{'highlight': selectedAppInstance?.Id === appInstance.id}\"\r\n\t\t\t (click)=\"selectAppInstance(appInstance)\"></tr>\r\n\t\t</table>\r\n\t\t<mat-paginator id=\"appInstancesPaginator\" #appInstancesPaginator [length]=\"appInstances?.length\" [pageSize]=\"5\"></mat-paginator>\r\n\t</div>\r\n</div>\r\n", styles: ["table{width:100%}.table-toolbar{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;align-items:center}.table-toolbar>span{margin-left:20px;font-size:large}\n"] }]
    }], () => [{ type: AppManagementService }, { type: SnackBarService }, { type: i1$2.MatDialog }], { AppInstancePaginator: [{
            type: ViewChild,
            args: ['entitiyTypesPaginator']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppInstanceManagementComponent, { className: "AppInstanceManagementComponent", filePath: "lib/administration/settings/app-instance-management/app-instance-management.component.ts", lineNumber: 17 }); })();

const _c0$1 = ["entitiyTypesPaginator"];
const _c1 = a0 => ({ "highlight": a0 });
function AppTypeManagementComponent_th_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 17);
    i0.ɵɵtext(1, "Name");
    i0.ɵɵelementEnd();
} }
function AppTypeManagementComponent_td_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const appType_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(appType_r1.Name);
} }
function AppTypeManagementComponent_th_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 17);
    i0.ɵɵtext(1, "Title");
    i0.ɵɵelementEnd();
} }
function AppTypeManagementComponent_td_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const appType_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(appType_r2.Title);
} }
function AppTypeManagementComponent_tr_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 19);
} }
function AppTypeManagementComponent_tr_26_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 20);
    i0.ɵɵlistener("click", function AppTypeManagementComponent_tr_26_Template_tr_click_0_listener() { const appType_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.selectAppType(appType_r4)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const appType_r4 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c1, (ctx_r4.selectedAppType == null ? null : ctx_r4.selectedAppType.Id) === appType_r4.id));
} }
class AppTypeManagementComponent {
    constructor(appManagementService, snackBarService, dialog) {
        this.appManagementService = appManagementService;
        this.snackBarService = snackBarService;
        this.dialog = dialog;
        this.displayedAppTypeColumns = ['name', 'title'];
        this.appTypes = [];
        this.appTypesDataSource = new MatTableDataSource(this.appTypes);
    }
    ngOnInit() {
        this.appTypesDataSource.paginator = this.AppTypePaginator;
        this.getAppTypes();
    }
    deleteAppType() {
        if (!this.selectedAppType) {
            return;
        }
        ConfirmationDialogComponent.Ask(this.dialog, 'Are you sure you want to delete this app type?', 'This action cannot be undone.')
            .subscribe(x => {
            if (x) {
                this.appManagementService.deleteAppType(this.selectedAppType).subscribe(() => {
                    this.getAppTypes();
                }, (errors) => {
                    this.snackBarService.open(errors.error);
                });
            }
        });
    }
    addAppType() {
        this.openAddNEditAppTypeDialog({}, true);
    }
    editAppType() {
        if (!this.selectedAppType) {
            return;
        }
        this.openAddNEditAppTypeDialog(this.selectedAppType, false);
    }
    openAddNEditAppTypeDialog(instance, isNew) {
        const dialogRef = this.dialog.open(AddNEditAppTypeComponent, {
            width: '800px',
            disableClose: true,
            data: new AddNEditAppTypeComponentData(instance, isNew)
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.selectedAppType = null;
                this.getAppTypes();
            }
        });
    }
    getAppTypes() {
        this.appTypes = [];
        this.appManagementService.getAppTypes().subscribe((res) => {
            this.appTypes = res;
            this.appTypesDataSource.data = this.appTypes = res;
        }, (error) => {
            this.snackBarService.open(error);
        });
    }
    selectAppType(appType) {
        if (appType === this.selectedAppType) {
            return;
        }
        this.selectedAppType = appType;
    }
    static { this.ɵfac = function AppTypeManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppTypeManagementComponent)(i0.ɵɵdirectiveInject(AppManagementService), i0.ɵɵdirectiveInject(SnackBarService), i0.ɵɵdirectiveInject(i1$2.MatDialog)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppTypeManagementComponent, selectors: [["dscribe-host-app-type-management"]], viewQuery: function AppTypeManagementComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0$1, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.AppTypePaginator = _t.first);
        } }, standalone: false, decls: 29, vars: 7, consts: [["AppTypePaginator", ""], [1, "page-content"], [1, "table-wrapper"], [1, "table-toolbar"], ["mat-icon-button", "", 3, "click"], ["color", "primary"], ["mat-icon-button", "", 3, "click", "disabled"], ["color", "accent"], ["color", "warn"], ["mat-table", "", "matSort", "", 3, "dataSource"], ["matColumnDef", "name"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "title"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "ngClass", "click", 4, "matRowDef", "matRowDefColumns"], ["id", "AppTypePaginator", 3, "length", "pageSize"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", "", 3, "click", "ngClass"]], template: function AppTypeManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "span");
            i0.ɵɵtext(4, "AppType");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div")(6, "button", 4);
            i0.ɵɵlistener("click", function AppTypeManagementComponent_Template_button_click_6_listener() { return ctx.addAppType(); });
            i0.ɵɵelementStart(7, "mat-icon", 5);
            i0.ɵɵtext(8, "add");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "button", 4);
            i0.ɵɵlistener("click", function AppTypeManagementComponent_Template_button_click_9_listener() { return ctx.getAppTypes(); });
            i0.ɵɵelementStart(10, "mat-icon", 5);
            i0.ɵɵtext(11, "refresh");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "button", 6);
            i0.ɵɵlistener("click", function AppTypeManagementComponent_Template_button_click_12_listener() { return ctx.editAppType(); });
            i0.ɵɵelementStart(13, "mat-icon", 7);
            i0.ɵɵtext(14, "edit");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "button", 6);
            i0.ɵɵlistener("click", function AppTypeManagementComponent_Template_button_click_15_listener() { return ctx.deleteAppType(); });
            i0.ɵɵelementStart(16, "mat-icon", 8);
            i0.ɵɵtext(17, "delete");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(18, "table", 9);
            i0.ɵɵelementContainerStart(19, 10);
            i0.ɵɵtemplate(20, AppTypeManagementComponent_th_20_Template, 2, 0, "th", 11)(21, AppTypeManagementComponent_td_21_Template, 2, 1, "td", 12);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(22, 13);
            i0.ɵɵtemplate(23, AppTypeManagementComponent_th_23_Template, 2, 0, "th", 11)(24, AppTypeManagementComponent_td_24_Template, 2, 1, "td", 12);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵtemplate(25, AppTypeManagementComponent_tr_25_Template, 1, 0, "tr", 14)(26, AppTypeManagementComponent_tr_26_Template, 1, 3, "tr", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(27, "mat-paginator", 16, 0);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("disabled", !ctx.selectedAppType);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", !ctx.selectedAppType);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("dataSource", ctx.appTypesDataSource);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("matHeaderRowDef", ctx.displayedAppTypeColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("matRowDefColumns", ctx.displayedAppTypeColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("length", ctx.appTypes == null ? null : ctx.appTypes.length)("pageSize", 5);
        } }, dependencies: [i1$3.NgClass, i5.MatIconButton, i6.MatIcon, i7$1.MatPaginator, i9.MatSort, i9.MatSortHeader, i10.MatTable, i10.MatHeaderCellDef, i10.MatHeaderRowDef, i10.MatColumnDef, i10.MatCellDef, i10.MatRowDef, i10.MatHeaderCell, i10.MatCell, i10.MatHeaderRow, i10.MatRow], styles: ["table[_ngcontent-%COMP%]{width:100%}.table-toolbar[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;align-items:center}.table-toolbar[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{margin-left:20px;font-size:large}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppTypeManagementComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-host-app-type-management', template: "<div class=\"page-content\">\r\n\t<div class=\"table-wrapper\">\r\n\t\t<div class=\"table-toolbar\">\r\n\t\t\t<span>AppType</span>\r\n\t\t\t<div>\r\n\t\t\t\t<button mat-icon-button (click)=\"addAppType()\">\r\n\t\t\t\t\t<mat-icon color=\"primary\">add</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button (click)=\"getAppTypes()\">\r\n\t\t\t\t\t<mat-icon color=\"primary\">refresh</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button (click)=\"editAppType()\" [disabled]=\"!selectedAppType\">\r\n\t\t\t\t\t<mat-icon color=\"accent\">edit</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-icon-button (click)=\"deleteAppType()\" [disabled]=\"!selectedAppType\">\r\n\t\t\t\t\t<mat-icon color=\"warn\">delete</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<table mat-table [dataSource]=\"appTypesDataSource\" matSort>\r\n\r\n\t\t\t<ng-container matColumnDef=\"name\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let appType\">{{appType.Name}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<ng-container matColumnDef=\"title\">\r\n\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Title</th>\r\n\t\t\t\t<td mat-cell *matCellDef=\"let appType\">{{appType.Title}}</td>\r\n\t\t\t</ng-container>\r\n\r\n\t\t\t<tr mat-header-row *matHeaderRowDef=\"displayedAppTypeColumns\"></tr>\r\n\t\t\t<tr mat-row *matRowDef=\"let appType; columns: displayedAppTypeColumns;\" [ngClass]=\"{'highlight': selectedAppType?.Id === appType.id}\"\r\n\t\t\t (click)=\"selectAppType(appType)\"></tr>\r\n\t\t</table>\r\n\t\t<mat-paginator id=\"AppTypePaginator\" #AppTypePaginator [length]=\"appTypes?.length\" [pageSize]=\"5\"></mat-paginator>\r\n\t</div>\r\n</div>\r\n", styles: ["table{width:100%}.table-toolbar{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;align-items:center}.table-toolbar>span{margin-left:20px;font-size:large}\n"] }]
    }], () => [{ type: AppManagementService }, { type: SnackBarService }, { type: i1$2.MatDialog }], { AppTypePaginator: [{
            type: ViewChild,
            args: ['entitiyTypesPaginator']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppTypeManagementComponent, { className: "AppTypeManagementComponent", filePath: "lib/administration/settings/app-type-management/app-type-management.component.ts", lineNumber: 17 }); })();

function SettingsComponent_a_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const settingItem_r1 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", settingItem_r1.url);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", settingItem_r1.name, " ");
} }
class SettingsComponent {
    constructor() {
        this.settingItems = [];
    }
    ngOnInit() {
        this.settingItems.push({ name: 'App instance', url: 'app-instance-management' });
        this.settingItems.push({ name: 'App type', url: 'app-type-management' });
    }
    static { this.ɵfac = function SettingsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SettingsComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SettingsComponent, selectors: [["dscribe-host-settings"]], standalone: false, decls: 6, vars: 1, consts: [[1, "list-wrapper"], [1, "list-container"], [1, "secondary-nav", "mat-elevation-z4"], ["class", "secondary-nav-item", "routerLinkActive", "active", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "router-outlet"], ["routerLinkActive", "active", 1, "secondary-nav-item", 3, "routerLink"]], template: function SettingsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "nav", 2);
            i0.ɵɵtemplate(3, SettingsComponent_a_3_Template, 2, 2, "a", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 4);
            i0.ɵɵelement(5, "router-outlet");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.settingItems);
        } }, dependencies: [i1$3.NgForOf, i2$1.RouterOutlet, i2$1.RouterLink, i2$1.RouterLinkActive], styles: [".list-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:absolute;inset:0;overflow:auto}.list-wrapper[_ngcontent-%COMP%]   .list-container[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row}.router-outlet[_ngcontent-%COMP%]{margin-left:240px;width:100%}.router-outlet[dir=rtl][_ngcontent-%COMP%]{margin-left:unset;margin-right:240px}.secondary-nav[_ngcontent-%COMP%]{transition:width .3s;padding:24px 0;background-color:#262f3d;min-width:240px;width:240px;position:fixed;top:51px;bottom:0;left:0}.secondary-nav[dir=rtl][_ngcontent-%COMP%]{left:unset;right:0}.secondary-nav-item[_ngcontent-%COMP%]{box-sizing:border-box;height:36px;line-height:2.2em;display:block;text-decoration:none;padding:0 32px;margin:8px 0 8px 4px;font-size:16px;color:#ffffffb3}.secondary-nav-item[_ngcontent-%COMP%]:hover{background-color:#ffffff14}.secondary-nav-item.active[_ngcontent-%COMP%]{color:#4fc3f7!important;border-left:#3F51B5 solid 4px;margin-left:0}.secondary-nav.open[_ngcontent-%COMP%]{width:240px;min-width:240px;position:fixed;bottom:0;top:51px}.secondary-nav.close[_ngcontent-%COMP%]{width:0}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SettingsComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-host-settings', template: "<div class=\"list-wrapper\">\r\n\t<div class=\"list-container\">\r\n\t\t<nav class=\"secondary-nav mat-elevation-z4\">\r\n\t\t\t<a class=\"secondary-nav-item\" *ngFor=\"let settingItem of settingItems\" [routerLink]=\"settingItem.url\"\r\n\t\t\t routerLinkActive=\"active\">\r\n\t\t\t\t{{settingItem.name}}\r\n\t\t\t</a>\r\n\t\t</nav>\r\n\t<div class=\"router-outlet\">\r\n\t\t\t<router-outlet></router-outlet>\r\n\t</div>\r\n\t</div>\r\n</div>\r\n", styles: [".list-wrapper{display:flex;flex-direction:column;position:absolute;inset:0;overflow:auto}.list-wrapper .list-container{flex:1;display:flex;flex-direction:row}.router-outlet{margin-left:240px;width:100%}.router-outlet[dir=rtl]{margin-left:unset;margin-right:240px}.secondary-nav{transition:width .3s;padding:24px 0;background-color:#262f3d;min-width:240px;width:240px;position:fixed;top:51px;bottom:0;left:0}.secondary-nav[dir=rtl]{left:unset;right:0}.secondary-nav-item{box-sizing:border-box;height:36px;line-height:2.2em;display:block;text-decoration:none;padding:0 32px;margin:8px 0 8px 4px;font-size:16px;color:#ffffffb3}.secondary-nav-item:hover{background-color:#ffffff14}.secondary-nav-item.active{color:#4fc3f7!important;border-left:#3F51B5 solid 4px;margin-left:0}.secondary-nav.open{width:240px;min-width:240px;position:fixed;bottom:0;top:51px}.secondary-nav.close{width:0}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SettingsComponent, { className: "SettingsComponent", filePath: "lib/administration/settings/settings.component.ts", lineNumber: 10 }); })();

function ArithmeticFilterNodeComponent_div_0_div_1_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-icon", 12);
    i0.ɵɵlistener("click", function ArithmeticFilterNodeComponent_div_0_div_1_mat_icon_2_Template_mat_icon_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.manipulator.addSibling(ctx_r2.node)); });
    i0.ɵɵtext(1, "fast_forward");
    i0.ɵɵelementEnd();
} }
function ArithmeticFilterNodeComponent_div_0_div_1_mat_icon_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-icon", 13);
    i0.ɵɵlistener("click", function ArithmeticFilterNodeComponent_div_0_div_1_mat_icon_5_Template_mat_icon_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.manipulator.delete(ctx_r2.node)); });
    i0.ɵɵtext(1, "delete");
    i0.ɵɵelementEnd();
} }
function ArithmeticFilterNodeComponent_div_0_div_1_option_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const o_r5 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", o_r5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(o_r5 == null ? null : o_r5.title);
} }
function ArithmeticFilterNodeComponent_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "div", 5);
    i0.ɵɵtemplate(2, ArithmeticFilterNodeComponent_div_0_div_1_mat_icon_2_Template, 2, 0, "mat-icon", 6);
    i0.ɵɵelementStart(3, "mat-icon", 7);
    i0.ɵɵlistener("click", function ArithmeticFilterNodeComponent_div_0_div_1_Template_mat_icon_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.node.addChild(true)); });
    i0.ɵɵtext(4, "add");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, ArithmeticFilterNodeComponent_div_0_div_1_mat_icon_5_Template, 2, 0, "mat-icon", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "select", 9);
    i0.ɵɵtwoWayListener("ngModelChange", function ArithmeticFilterNodeComponent_div_0_div_1_Template_select_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r2.node.operator, $event) || (ctx_r2.node.operator = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(7, "option", 10);
    i0.ɵɵtext(8, "Math Operators");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, ArithmeticFilterNodeComponent_div_0_div_1_option_9_Template, 2, 2, "option", 11);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.node == null ? null : ctx_r2.node.parent == null ? null : ctx_r2.node.parent.canReplaceChild());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.node == null ? null : ctx_r2.node.parent == null ? null : ctx_r2.node.parent.canReplaceChild());
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.node.operator);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r2.node.operators);
} }
function ArithmeticFilterNodeComponent_div_0_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ind_r6 = i0.ɵɵnextContext().index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ind_r6 > ((ctx_r2.node.operator == null ? null : ctx_r2.node.operator.minOperandCount) == 2 ? 1 : 0) ? ctx_r2.node.operator == null ? null : ctx_r2.node.operator.title : "", " ");
} }
function ArithmeticFilterNodeComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, ArithmeticFilterNodeComponent_div_0_div_1_Template, 10, 4, "div", 1)(2, ArithmeticFilterNodeComponent_div_0_span_2_Template, 2, 1, "span", 2);
    i0.ɵɵelement(3, "dscribe-filter-node", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r7 = ctx.$implicit;
    const ind_r6 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ind_r6 == ((ctx_r2.node.operator == null ? null : ctx_r2.node.operator.minOperandCount) == 2 ? 1 : 0));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ind_r6 != ((ctx_r2.node.operator == null ? null : ctx_r2.node.operator.minOperandCount) == 2 ? 1 : 0));
    i0.ɵɵadvance();
    i0.ɵɵproperty("node", child_r7);
} }
class ArithmeticFilterNodeComponent {
    constructor(manipulator) {
        this.manipulator = manipulator;
    }
    ngOnInit() {
    }
    static { this.ɵfac = function ArithmeticFilterNodeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ArithmeticFilterNodeComponent)(i0.ɵɵdirectiveInject(FilterTreeManipulator)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ArithmeticFilterNodeComponent, selectors: [["dscribe-arithmetic-filter-node"]], inputs: { node: "node" }, standalone: false, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["class", "filter-node-container", 4, "ngIf"], ["class", "filter-option", 4, "ngIf"], [3, "node"], [1, "filter-node-container"], [1, "node-action-btns"], ["class", "add-sibling-btn", "title", "add calculations before this one", 3, "click", 4, "ngIf"], ["title", "add operands", 1, "add-sibling-btn", 3, "click"], ["class", "add-sibling-btn", "title", "delete this operation (and all operands)", 3, "click", 4, "ngIf"], [1, "filter-option", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", "", "selected", ""], [3, "ngValue", 4, "ngFor", "ngForOf"], ["title", "add calculations before this one", 1, "add-sibling-btn", 3, "click"], ["title", "delete this operation (and all operands)", 1, "add-sibling-btn", 3, "click"], [3, "ngValue"], [1, "filter-option"]], template: function ArithmeticFilterNodeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ArithmeticFilterNodeComponent_div_0_Template, 4, 3, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngForOf", ctx.node.children);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.NgSelectOption, i5$1.ɵNgSelectMultipleOption, i5$1.SelectControlValueAccessor, i5$1.NgControlStatus, i5$1.NgModel, i6.MatIcon, FilterNodeComponent], styles: [".filter-option[_ngcontent-%COMP%]{margin:0 2px;width:100px;display:inline-block}.filter-option[_ngcontent-%COMP%]   option[invalid][_ngcontent-%COMP%], .noOptionSelected[_ngcontent-%COMP%]{color:gray}.node-action-btns[_ngcontent-%COMP%]{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:hover{background-color:#ff96ff66}.pull-left[_ngcontent-%COMP%]{right:70px}.filter-node-container[_ngcontent-%COMP%]{position:relative;display:inline-block;vertical-align:top}.filter-node-container[_ngcontent-%COMP%]:hover > .node-action-btns[_ngcontent-%COMP%]{visibility:visible}.has-error[_ngcontent-%COMP%]{background-color:#ff000026}.is-ok[_ngcontent-%COMP%]{background-color:#0000ff0d}.mat-form-field[_ngcontent-%COMP%]{display:inline-block;position:relative;text-align:left}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{text-align:right}.mat-form-field-wrapper[_ngcontent-%COMP%]{position:relative}.mat-form-field-flex[_ngcontent-%COMP%]{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]{white-space:nowrap;flex:none}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]{font:inherit;vertical-align:baseline}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:inherit}.mat-form-field-infix[_ngcontent-%COMP%]{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder[_ngcontent-%COMP%]{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%], .mat-form-field-empty.mat-form-field-placeholder[_ngcontent-%COMP%]{display:block}.mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:none}.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:block;transition:none}.mat-form-field-placeholder[_ngcontent-%COMP%]:not(.mat-form-field-empty){transition:none}.mat-form-field-underline[_ngcontent-%COMP%]{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled[_ngcontent-%COMP%]{background:transparent 0}.mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{height:2px}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%], .mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper[_ngcontent-%COMP%]{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-subscript-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper[_ngcontent-%COMP%]{display:flex}.mat-form-field-hint-spacer[_ngcontent-%COMP%]{flex:1 0 1em}.mat-error[_ngcontent-%COMP%]{display:block}.mat-input-element[_ngcontent-%COMP%]{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}.mat-input-element[_ngcontent-%COMP%]::placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-moz-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-webkit-input-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element[_ngcontent-%COMP%]{resize:vertical;overflow:auto}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ArithmeticFilterNodeComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-arithmetic-filter-node', template: "<div *ngFor=\"let child of node.children; let ind = index\">\r\n\t<div class=\"filter-node-container\" *ngIf=\"ind == (node.operator?.minOperandCount == 2 ? 1 : 0)\">\r\n\t\t<div class=\"node-action-btns\">\r\n\t\t\t<mat-icon class=\"add-sibling-btn\" (click)=\"manipulator.addSibling(node)\"\r\n\t\t\t\t\t\t\t\t*ngIf=\"node?.parent?.canReplaceChild()\" title=\"add calculations before this one\">fast_forward</mat-icon>\r\n\t\t\t<mat-icon class=\"add-sibling-btn\" (click)=\"node.addChild(true)\" title=\"add operands\">add</mat-icon>\r\n\t\t\t<mat-icon class=\"add-sibling-btn\" (click)=\"manipulator.delete(node)\"\r\n\t\t\t\t\t\t\t\t*ngIf=\"node?.parent?.canReplaceChild()\" title=\"delete this operation (and all operands)\">delete</mat-icon>\r\n\t\t</div>\r\n\t\t<select class=\"filter-option\" [(ngModel)]=\"node.operator\">\r\n\t\t\t<option value=\"\" disabled selected>Math Operators</option>\r\n\t\t\t<option *ngFor=\"let o of node.operators\" [ngValue]=\"o\">{{o?.title}}</option>\r\n\t\t</select>\r\n\t</div>\r\n\t<span *ngIf=\"ind != (node.operator?.minOperandCount == 2 ? 1 : 0)\" class=\"filter-option\">\r\n\t\t{{ind > (node.operator?.minOperandCount == 2 ? 1 : 0) ? node.operator?.title : ''}}\r\n\t</span>\r\n\t<dscribe-filter-node [node]=\"child\"></dscribe-filter-node>\r\n</div>\r\n", styles: [".filter-option{margin:0 2px;width:100px;display:inline-block}.filter-option option[invalid],.noOptionSelected{color:gray}.node-action-btns{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns mat-icon{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns mat-icon:hover{background-color:#ff96ff66}.pull-left{right:70px}.filter-node-container{position:relative;display:inline-block;vertical-align:top}.filter-node-container:hover>.node-action-btns{visibility:visible}.has-error{background-color:#ff000026}.is-ok{background-color:#0000ff0d}.mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl] .mat-form-field-placeholder{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-placeholder,.mat-form-field-empty.mat-form-field-placeholder{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:block;transition:none}.mat-form-field-placeholder:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled{background:transparent 0}.mat-form-field-underline .mat-form-field-ripple{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused .mat-form-field-underline .mat-form-field-ripple{height:2px}.mat-focused .mat-form-field-underline .mat-form-field-ripple,.mat-form-field-invalid .mat-form-field-underline .mat-form-field-ripple{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper .mat-icon,.mat-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::placeholder{color:transparent!important}.mat-input-element::-moz-placeholder{color:transparent!important}.mat-input-element::-webkit-input-placeholder{color:transparent!important}.mat-input-element:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element{resize:vertical;overflow:auto}\n"] }]
    }], () => [{ type: FilterTreeManipulator }], { node: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ArithmeticFilterNodeComponent, { className: "ArithmeticFilterNodeComponent", filePath: "lib/filtering/components/arithmetic-filter-node/arithmetic-filter-node.component.ts", lineNumber: 11 }); })();

function ComparisonFilterNodeComponent_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.node.operator == null ? null : ctx_r0.node.operator.title, " ");
} }
function ComparisonFilterNodeComponent_ng_container_0_div_3_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-icon", 11);
    i0.ɵɵlistener("click", function ComparisonFilterNodeComponent_ng_container_0_div_3_mat_icon_2_Template_mat_icon_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.manipulator.addSibling(ctx_r0.node)); });
    i0.ɵɵtext(1, "fast_forward ");
    i0.ɵɵelementEnd();
} }
function ComparisonFilterNodeComponent_ng_container_0_div_3_mat_icon_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-icon", 12);
    i0.ɵɵlistener("click", function ComparisonFilterNodeComponent_ng_container_0_div_3_mat_icon_3_Template_mat_icon_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.manipulator.delete(ctx_r0.node)); });
    i0.ɵɵtext(1, "delete ");
    i0.ɵɵelementEnd();
} }
function ComparisonFilterNodeComponent_ng_container_0_div_3_option_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const o_r5 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", o_r5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(o_r5 == null ? null : o_r5.title);
} }
function ComparisonFilterNodeComponent_ng_container_0_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "div", 5);
    i0.ɵɵtemplate(2, ComparisonFilterNodeComponent_ng_container_0_div_3_mat_icon_2_Template, 2, 0, "mat-icon", 6)(3, ComparisonFilterNodeComponent_ng_container_0_div_3_mat_icon_3_Template, 2, 0, "mat-icon", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 8);
    i0.ɵɵtwoWayListener("ngModelChange", function ComparisonFilterNodeComponent_ng_container_0_div_3_Template_select_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.node.operator, $event) || (ctx_r0.node.operator = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(5, "option", 9);
    i0.ɵɵtext(6, "Condition");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, ComparisonFilterNodeComponent_ng_container_0_div_3_option_7_Template, 2, 2, "option", 10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.node == null ? null : ctx_r0.node.parent == null ? null : ctx_r0.node.parent.canReplaceChild());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.node == null ? null : ctx_r0.node.parent == null ? null : ctx_r0.node.parent.canReplaceChild());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("noOptionSelected", !ctx_r0.node.operator);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.node.operator);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", undefined);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.node.operators);
} }
function ComparisonFilterNodeComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ComparisonFilterNodeComponent_ng_container_0_ng_container_1_Template, 2, 1, "ng-container", 1);
    i0.ɵɵelement(2, "dscribe-filter-node", 2);
    i0.ɵɵtemplate(3, ComparisonFilterNodeComponent_ng_container_0_div_3_Template, 8, 7, "div", 3);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const child_r6 = ctx.$implicit;
    const ind_r7 = ctx.index;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ind_r7 > 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("node", child_r6);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ind_r7 == 0);
} }
class ComparisonFilterNodeComponent {
    constructor(manipulator) {
        this.manipulator = manipulator;
    }
    ngOnInit() {
    }
    static { this.ɵfac = function ComparisonFilterNodeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ComparisonFilterNodeComponent)(i0.ɵɵdirectiveInject(FilterTreeManipulator)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ComparisonFilterNodeComponent, selectors: [["dscribe-comparison-filter-node"]], inputs: { node: "node" }, standalone: false, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "node"], ["class", "filter-node-container", 4, "ngIf"], [1, "filter-node-container"], [1, "node-action-btns"], ["class", "add-sibling-btn", "title", "Combine logically with another condition", 3, "click", 4, "ngIf"], ["class", "add-sibling-btn", "title", "remove this condition", 3, "click", 4, "ngIf"], ["placeholder", "Operator", 1, "filter-option", 3, "ngModelChange", "ngModel"], ["selected", "", "invalid", "", 3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["title", "Combine logically with another condition", 1, "add-sibling-btn", 3, "click"], ["title", "remove this condition", 1, "add-sibling-btn", 3, "click"], [3, "ngValue"]], template: function ComparisonFilterNodeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ComparisonFilterNodeComponent_ng_container_0_Template, 4, 3, "ng-container", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngForOf", ctx.node.children);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.NgSelectOption, i5$1.ɵNgSelectMultipleOption, i5$1.SelectControlValueAccessor, i5$1.NgControlStatus, i5$1.NgModel, i6.MatIcon, FilterNodeComponent], styles: [".filter-option[_ngcontent-%COMP%]{margin:0 2px;width:100px;display:inline-block}.filter-option[_ngcontent-%COMP%]   option[invalid][_ngcontent-%COMP%], .noOptionSelected[_ngcontent-%COMP%]{color:gray}.node-action-btns[_ngcontent-%COMP%]{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:hover{background-color:#ff96ff66}.pull-left[_ngcontent-%COMP%]{right:70px}.filter-node-container[_ngcontent-%COMP%]{position:relative;display:inline-block;vertical-align:top}.filter-node-container[_ngcontent-%COMP%]:hover > .node-action-btns[_ngcontent-%COMP%]{visibility:visible}.has-error[_ngcontent-%COMP%]{background-color:#ff000026}.is-ok[_ngcontent-%COMP%]{background-color:#0000ff0d}.mat-form-field[_ngcontent-%COMP%]{display:inline-block;position:relative;text-align:left}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{text-align:right}.mat-form-field-wrapper[_ngcontent-%COMP%]{position:relative}.mat-form-field-flex[_ngcontent-%COMP%]{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]{white-space:nowrap;flex:none}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]{font:inherit;vertical-align:baseline}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:inherit}.mat-form-field-infix[_ngcontent-%COMP%]{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder[_ngcontent-%COMP%]{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%], .mat-form-field-empty.mat-form-field-placeholder[_ngcontent-%COMP%]{display:block}.mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:none}.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:block;transition:none}.mat-form-field-placeholder[_ngcontent-%COMP%]:not(.mat-form-field-empty){transition:none}.mat-form-field-underline[_ngcontent-%COMP%]{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled[_ngcontent-%COMP%]{background:transparent 0}.mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{height:2px}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%], .mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper[_ngcontent-%COMP%]{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-subscript-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper[_ngcontent-%COMP%]{display:flex}.mat-form-field-hint-spacer[_ngcontent-%COMP%]{flex:1 0 1em}.mat-error[_ngcontent-%COMP%]{display:block}.mat-input-element[_ngcontent-%COMP%]{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}.mat-input-element[_ngcontent-%COMP%]::placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-moz-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-webkit-input-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element[_ngcontent-%COMP%]{resize:vertical;overflow:auto}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ComparisonFilterNodeComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-comparison-filter-node', template: "<ng-container *ngFor=\"let child of node.children; let ind = index\">\r\n\t<ng-container *ngIf=\"ind > 1\">\r\n\t\t{{node.operator?.title}}\r\n\t</ng-container>\r\n\t<dscribe-filter-node [node]=\"child\"></dscribe-filter-node>\r\n\t<div class=\"filter-node-container\" *ngIf=\"ind == 0\">\r\n\t\t<div class=\"node-action-btns\">\r\n\t\t\t<mat-icon class=\"add-sibling-btn\" (click)=\"manipulator.addSibling(node)\"\r\n\t\t\t\t\t\t\t\t*ngIf=\"node?.parent?.canReplaceChild()\" title=\"Combine logically with another condition\">fast_forward\r\n\t\t\t</mat-icon>\r\n\t\t\t<mat-icon class=\"add-sibling-btn\" (click)=\"manipulator.delete(node)\"\r\n\t\t\t\t\t\t\t\t*ngIf=\"node?.parent?.canReplaceChild()\" title=\"remove this condition\">delete\r\n\t\t\t</mat-icon>\r\n\t\t</div>\r\n\t\t<select class=\"filter-option\" [class.noOptionSelected]=\"!node.operator\" [(ngModel)]=\"node.operator\"\r\n\t\t\t\t\t\t\t\tplaceholder=\"Operator\">\r\n\t\t\t<option [ngValue]=\"undefined\" selected invalid>Condition</option>\r\n\t\t\t<option *ngFor=\"let o of node.operators\" [ngValue]=\"o\">{{o?.title}}</option>\r\n\t\t</select>\r\n\t</div>\r\n</ng-container>\r\n", styles: [".filter-option{margin:0 2px;width:100px;display:inline-block}.filter-option option[invalid],.noOptionSelected{color:gray}.node-action-btns{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns mat-icon{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns mat-icon:hover{background-color:#ff96ff66}.pull-left{right:70px}.filter-node-container{position:relative;display:inline-block;vertical-align:top}.filter-node-container:hover>.node-action-btns{visibility:visible}.has-error{background-color:#ff000026}.is-ok{background-color:#0000ff0d}.mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl] .mat-form-field-placeholder{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-placeholder,.mat-form-field-empty.mat-form-field-placeholder{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:block;transition:none}.mat-form-field-placeholder:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled{background:transparent 0}.mat-form-field-underline .mat-form-field-ripple{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused .mat-form-field-underline .mat-form-field-ripple{height:2px}.mat-focused .mat-form-field-underline .mat-form-field-ripple,.mat-form-field-invalid .mat-form-field-underline .mat-form-field-ripple{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper .mat-icon,.mat-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::placeholder{color:transparent!important}.mat-input-element::-moz-placeholder{color:transparent!important}.mat-input-element::-webkit-input-placeholder{color:transparent!important}.mat-input-element:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element{resize:vertical;overflow:auto}\n"] }]
    }], () => [{ type: FilterTreeManipulator }], { node: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ComparisonFilterNodeComponent, { className: "ComparisonFilterNodeComponent", filePath: "lib/filtering/components/comparison-filter-node/comparison-filter-node.component.ts", lineNumber: 11 }); })();

function BoolEditorComponent_mat_checkbox_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-checkbox", 3);
    i0.ɵɵtwoWayListener("ngModelChange", function BoolEditorComponent_mat_checkbox_0_Template_mat_checkbox_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name], $event) || (ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("click", function BoolEditorComponent_mat_checkbox_0_Template_mat_checkbox_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.next()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name]);
    i0.ɵɵproperty("indeterminate", ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name] === null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.property.Title || ctx_r1.overridePropertyName || ctx_r1.property.Name, "\n");
} }
function BoolEditorComponent_input_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 4);
    i0.ɵɵlistener("click", function BoolEditorComponent_input_1_Template_input_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.next()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("checked", ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name])("indeterminate", ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name] === null);
} }
function BoolEditorComponent_div_2_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const validationError_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", validationError_r4.Message, " ");
} }
function BoolEditorComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, BoolEditorComponent_div_2_p_1_Template, 2, 1, "p", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.property.ValidationErrors);
} }
class BoolEditorComponent {
    next() {
        const val = this.entity[this.overridePropertyName || this.property.Name];
        let nextVal;
        if (!this.property.IsNullable) {
            nextVal = !val;
        }
        else {
            nextVal = val == null ? true : val ? false : null;
        }
        this.entity[this.overridePropertyName || this.property.Name] = nextVal;
    }
    static { this.ɵfac = function BoolEditorComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BoolEditorComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BoolEditorComponent, selectors: [["dscribe-bool-editor"]], inputs: { entity: "entity", property: "property", color: "color", overridePropertyName: "overridePropertyName", isFilter: "isFilter" }, standalone: false, features: [i0.ɵɵProvidersFeature([
                { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } }
            ])], decls: 3, vars: 3, consts: [["class", "full-width", 3, "ngModel", "indeterminate", "ngModelChange", "click", 4, "ngIf"], ["type", "checkbox", 3, "checked", "indeterminate", "click", 4, "ngIf"], [4, "ngIf"], [1, "full-width", 3, "ngModelChange", "click", "ngModel", "indeterminate"], ["type", "checkbox", 3, "click", "checked", "indeterminate"], ["class", "error-message", 4, "ngFor", "ngForOf"], [1, "error-message"]], template: function BoolEditorComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, BoolEditorComponent_mat_checkbox_0_Template, 2, 3, "mat-checkbox", 0)(1, BoolEditorComponent_input_1_Template, 1, 2, "input", 1)(2, BoolEditorComponent_div_2_Template, 2, 1, "div", 2);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", !ctx.isFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.property.ValidationErrors);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.NgControlStatus, i5$1.NgModel, i9$3.MatCheckbox], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BoolEditorComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-bool-editor', providers: [
                    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } }
                ], template: "<mat-checkbox \r\n\t*ngIf=\"!isFilter\" \r\n\tclass=\"full-width\" \r\n\t[(ngModel)]=\"entity[overridePropertyName || property.Name]\" \r\n\t(click)=\"next()\"\r\n\t[indeterminate]=\"entity[overridePropertyName || property.Name] === null\">\r\n\t{{property.Title || overridePropertyName || property.Name}}\r\n</mat-checkbox>\r\n\r\n<input type=\"checkbox\" \r\n\t*ngIf=\"isFilter\" \r\n\t[checked]=\"entity[overridePropertyName || property.Name]\"\r\n\t[indeterminate]=\"entity[overridePropertyName || property.Name] === null\"\r\n\t(click)=\"next()\">\r\n\r\n<div *ngIf=\"property.ValidationErrors\">\r\n\t<p *ngFor=\"let validationError of property.ValidationErrors\" class=\"error-message\">\r\n\t\t{{validationError.Message}}\r\n\t</p>\r\n</div>\r\n" }]
    }], null, { entity: [{
            type: Input
        }], property: [{
            type: Input
        }], color: [{
            type: Input
        }], overridePropertyName: [{
            type: Input
        }], isFilter: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BoolEditorComponent, { className: "BoolEditorComponent", filePath: "lib/property-editors/bool-editor.component.ts", lineNumber: 13 }); })();

function DateEditorComponent_mat_form_field_0_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 8);
    i0.ɵɵlistener("click", function DateEditorComponent_mat_form_field_0_button_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.makeNull()); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "remove");
    i0.ɵɵelementEnd()();
} }
function DateEditorComponent_mat_form_field_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field", 3)(1, "mat-label");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 4);
    i0.ɵɵlistener("ngModelChange", function DateEditorComponent_mat_form_field_0_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onModelChange($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 5);
    i0.ɵɵtemplate(5, DateEditorComponent_mat_form_field_0_button_5_Template, 3, 0, "button", 6);
    i0.ɵɵelement(6, "mat-datepicker-toggle", 7)(7, "mat-datepicker", null, 0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const picker_r4 = i0.ɵɵreference(8);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.property.Title || ctx_r1.property.Name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("placeholder", ctx_r1.property.Title || ctx_r1.property.Name)("matDatepicker", picker_r4)("ngModel", ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name])("required", !ctx_r1.property.IsNullable);
    i0.ɵɵattribute("id", ctx_r1.property.Name)("name", ctx_r1.property.Name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.property == null ? null : ctx_r1.property.IsNullable);
    i0.ɵɵadvance();
    i0.ɵɵproperty("for", picker_r4);
} }
function DateEditorComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span")(1, "input", 9);
    i0.ɵɵlistener("ngModelChange", function DateEditorComponent_span_1_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onModelChange($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(2, "mat-datepicker-toggle", 10)(3, "mat-datepicker", null, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const picker_r6 = i0.ɵɵreference(4);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("placeholder", ctx_r1.property.Title || ctx_r1.overridePropertyName || ctx_r1.property.Name)("matDatepicker", picker_r6)("ngModel", ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name]);
    i0.ɵɵattribute("id", ctx_r1.property.Name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("for", picker_r6);
} }
function DateEditorComponent_div_2_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const validationError_r7 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", validationError_r7.Message);
} }
function DateEditorComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, DateEditorComponent_div_2_p_1_Template, 2, 1, "p", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.property.ValidationErrors);
} }
class DateEditorComponent {
    onModelChange(event) {
        event.setTime(event.getTime() - (event.getTimezoneOffset() * 60 * 1000)); // To prevent changes of date because of time zone.
        this.entity[this.overridePropertyName || this.property.Name] = event.toJSON();
        console.log(this.entity[this.overridePropertyName || this.property.Name]);
    }
    makeNull() {
        this.entity[this.overridePropertyName || this.property.Name] = null;
    }
    static { this.ɵfac = function DateEditorComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DateEditorComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DateEditorComponent, selectors: [["dscribe-date-editor"]], inputs: { entity: "entity", property: "property", color: "color", overridePropertyName: "overridePropertyName", isFilter: "isFilter" }, standalone: false, decls: 3, vars: 3, consts: [["picker", ""], ["class", "full-width", "appearance", "outline", 4, "ngIf"], [4, "ngIf"], ["appearance", "outline", 1, "full-width"], ["matInput", "", 3, "ngModelChange", "placeholder", "matDatepicker", "ngModel", "required"], ["matSuffix", "", 2, "display", "flex", "flex-flow", "row"], ["mat-icon-button", "", "matTooltip", "Clear the value", "tabindex", "-1", 3, "click", 4, "ngIf"], [3, "for"], ["mat-icon-button", "", "matTooltip", "Clear the value", "tabindex", "-1", 3, "click"], [3, "ngModelChange", "placeholder", "matDatepicker", "ngModel"], ["matSuffix", "", 3, "for"], ["class", "error-message", 4, "ngFor", "ngForOf"], [1, "error-message"]], template: function DateEditorComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, DateEditorComponent_mat_form_field_0_Template, 9, 9, "mat-form-field", 1)(1, DateEditorComponent_span_1_Template, 5, 5, "span", 2)(2, DateEditorComponent_div_2_Template, 2, 1, "div", 2);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", !ctx.isFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.property.ValidationErrors);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.DefaultValueAccessor, i5$1.NgControlStatus, i5$1.RequiredValidator, i5$1.NgModel, i5.MatIconButton, i4.MatDatepicker, i4.MatDatepickerInput, i4.MatDatepickerToggle, i8.MatFormField, i8.MatLabel, i8.MatSuffix, i6.MatIcon, i10$1.MatInput, i11.MatTooltip], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DateEditorComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-date-editor', template: "<mat-form-field *ngIf=\"!isFilter\" class=\"full-width\" appearance=\"outline\">\r\n\t<mat-label>{{property.Title || property.Name}}</mat-label>\r\n\t<input \r\n\t\tmatInput \r\n\t\t[placeholder]=\"property.Title || property.Name\" \r\n\t\t[attr.id]=\"property.Name\" \r\n\t\t[attr.name]=\"property.Name\" \r\n\t\t[matDatepicker]=\"picker\"\r\n\t\t[ngModel]=\"entity[overridePropertyName || property.Name]\" \r\n\t\t(ngModelChange)=\"onModelChange($event)\"\r\n\t\t[required]=\"!property.IsNullable\">\r\n\t<div matSuffix style=\"display: flex;flex-flow: row;\">\r\n\t\t<button mat-icon-button matTooltip=\"Clear the value\" tabindex=\"-1\" *ngIf=\"property?.IsNullable\"\r\n\t\t\t(click)=\"makeNull()\">\r\n\t\t\t<mat-icon>remove</mat-icon>\r\n\t\t</button>\r\n\t\t<mat-datepicker-toggle [for]=\"picker\"></mat-datepicker-toggle>\r\n\t\t<mat-datepicker #picker></mat-datepicker>\r\n\t</div>\r\n</mat-form-field>\r\n\r\n<span *ngIf=\"isFilter\">\r\n\t<input [placeholder]=\"property.Title || overridePropertyName || property.Name\" [attr.id]=\"property.Name\"\r\n\t\t[matDatepicker]=\"picker\" [ngModel]=\"entity[overridePropertyName || property.Name]\"\r\n\t\t(ngModelChange)=\"onModelChange($event)\">\r\n\t<mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n\t<mat-datepicker #picker></mat-datepicker>\r\n</span>\r\n\r\n<div *ngIf=\"property.ValidationErrors\">\r\n\t<p *ngFor=\"let validationError of property.ValidationErrors\" class=\"error-message\">\r\n\t\t{{validationError.Message}}</p>\r\n</div>" }]
    }], null, { entity: [{
            type: Input
        }], property: [{
            type: Input
        }], color: [{
            type: Input
        }], overridePropertyName: [{
            type: Input
        }], isFilter: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DateEditorComponent, { className: "DateEditorComponent", filePath: "lib/property-editors/date-editor.component.ts", lineNumber: 9 }); })();

class DatetimeEditorComponent {
    static { this.ɵfac = function DatetimeEditorComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DatetimeEditorComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DatetimeEditorComponent, selectors: [["dscribe-datetime-editor"]], inputs: { entity: "entity", property: "property", color: "color", overridePropertyName: "overridePropertyName", isFilter: "isFilter" }, standalone: false, decls: 2, vars: 0, template: function DatetimeEditorComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "span");
            i0.ɵɵtext(1, "Date-time is not implemented yet");
            i0.ɵɵelementEnd();
        } }, encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DatetimeEditorComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-datetime-editor', template: "<span>Date-time is not implemented yet</span>\r\n" }]
    }], null, { entity: [{
            type: Input
        }], property: [{
            type: Input
        }], color: [{
            type: Input
        }], overridePropertyName: [{
            type: Input
        }], isFilter: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DatetimeEditorComponent, { className: "DatetimeEditorComponent", filePath: "lib/property-editors/datetime-editor.component.ts", lineNumber: 9 }); })();

function EntityAutoCompleteComponent_mat_form_field_0_i_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 12);
} }
function EntityAutoCompleteComponent_mat_form_field_0_mat_option_20_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-option", 13);
    i0.ɵɵlistener("onSelectionChange", function EntityAutoCompleteComponent_mat_form_field_0_mat_option_20_Template_mat_option_onSelectionChange_0_listener() { const item_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectionChange(item_r4)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r4.Id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r4.DisplayName ? item_r4.DisplayName : "", " ");
} }
function EntityAutoCompleteComponent_mat_form_field_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field", 7)(1, "mat-label");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "input", 8);
    i0.ɵɵelementStart(4, "div", 9)(5, "button", 10);
    i0.ɵɵlistener("click", function EntityAutoCompleteComponent_mat_form_field_0_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleDropDown()); });
    i0.ɵɵelementStart(6, "mat-icon");
    i0.ɵɵtext(7, "arrow_drop_down");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 10);
    i0.ɵɵlistener("click", function EntityAutoCompleteComponent_mat_form_field_0_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectFromList()); });
    i0.ɵɵelementStart(9, "mat-icon");
    i0.ɵɵtext(10, "menu");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "button", 10);
    i0.ɵɵlistener("click", function EntityAutoCompleteComponent_mat_form_field_0_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.addNew()); });
    i0.ɵɵelementStart(12, "mat-icon");
    i0.ɵɵtext(13, "add");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "button", 11);
    i0.ɵɵlistener("click", function EntityAutoCompleteComponent_mat_form_field_0_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clean()); });
    i0.ɵɵelementStart(15, "mat-icon");
    i0.ɵɵtext(16, "remove");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(17, EntityAutoCompleteComponent_mat_form_field_0_i_17_Template, 1, 0, "i", 3);
    i0.ɵɵelementStart(18, "mat-autocomplete", 4, 0);
    i0.ɵɵtemplate(20, EntityAutoCompleteComponent_mat_form_field_0_mat_option_20_Template, 2, 2, "mat-option", 5);
    i0.ɵɵpipe(21, "async");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const auto_r5 = i0.ɵɵreference(19);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.property.Title || ctx_r1.property.Name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("placeholder", ctx_r1.property.Title || ctx_r1.property.Name)("formControl", ctx_r1.inputCtrl)("matAutocomplete", auto_r5)("required", !ctx_r1.property.IsNullable)("matAutocompleteDisabled", true);
    i0.ɵɵattribute("id", ctx_r1.property.Name)("aria-label", ctx_r1.property.Name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("matTooltip", i0.ɵɵinterpolate1("", ctx_r1.isAutoCompleteOpen ? "Hide" : "Show", " DropDown"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("matTooltip", i0.ɵɵinterpolate1("Select a ", (ctx_r1.property == null ? null : ctx_r1.property.EntityType == null ? null : ctx_r1.property.EntityType.SingularTitle) || (ctx_r1.property == null ? null : ctx_r1.property.EntityType == null ? null : ctx_r1.property.EntityType.Name), " from list"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("matTooltip", i0.ɵɵinterpolate1("Add a new ", (ctx_r1.property == null ? null : ctx_r1.property.EntityType == null ? null : ctx_r1.property.EntityType.SingularTitle) || (ctx_r1.property == null ? null : ctx_r1.property.EntityType == null ? null : ctx_r1.property.EntityType.Name)));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r1.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("displayWith", ctx_r1.displayFn.bind(ctx_r1));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(21, 17, ctx_r1.filteredOptions));
} }
function EntityAutoCompleteComponent_input_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 14);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    const auto_r6 = i0.ɵɵreference(4);
    i0.ɵɵproperty("placeholder", ctx_r1.property.Title || ctx_r1.overridePropertyName || ctx_r1.property.Name)("formControl", ctx_r1.inputCtrl)("matAutocomplete", auto_r6);
    i0.ɵɵattribute("id", ctx_r1.property.Name)("aria-label", ctx_r1.property.Name);
} }
function EntityAutoCompleteComponent_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 12);
} }
function EntityAutoCompleteComponent_mat_option_5_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-option", 13);
    i0.ɵɵlistener("onSelectionChange", function EntityAutoCompleteComponent_mat_option_5_Template_mat_option_onSelectionChange_0_listener() { const item_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectionChange(item_r8)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r8.Id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r8.DisplayName ? item_r8.DisplayName : "", " ");
} }
function EntityAutoCompleteComponent_div_7_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const validationError_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", validationError_r9.Message, " ");
} }
function EntityAutoCompleteComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, EntityAutoCompleteComponent_div_7_p_1_Template, 2, 1, "p", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.property.ValidationErrors);
} }
class AutoCompleteMoreDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.inputs = data;
    }
    listRowSelectionChanged(row) {
        this.inputs.selectedRow = row;
    }
    doneClicked() {
        this.dialogRef.close(this.inputs.selectedRow);
    }
    static { this.ɵfac = function AutoCompleteMoreDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AutoCompleteMoreDialogComponent)(i0.ɵɵdirectiveInject(i1$2.MatDialogRef, 8), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AutoCompleteMoreDialogComponent, selectors: [["ng-component"]], standalone: false, decls: 7, vars: 3, consts: [[1, "page-header"], [3, "selectionChanged", "hideFilter", "entityType"], ["mat-raised-button", "", "color", "primary", 3, "click"]], template: function AutoCompleteMoreDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "mat-dialog-content")(1, "h1", 0);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "dscribe-list", 1);
            i0.ɵɵlistener("selectionChanged", function AutoCompleteMoreDialogComponent_Template_dscribe_list_selectionChanged_3_listener($event) { return ctx.listRowSelectionChanged($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "mat-dialog-actions")(5, "button", 2);
            i0.ɵɵlistener("click", function AutoCompleteMoreDialogComponent_Template_button_click_5_listener() { return ctx.doneClicked(); });
            i0.ɵɵtext(6, "Ok");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.inputs.entityType.PluralTitle);
            i0.ɵɵadvance();
            i0.ɵɵproperty("hideFilter", false)("entityType", ctx.inputs.entityType);
        } }, dependencies: [i5.MatButton, i1$2.MatDialogActions, i1$2.MatDialogContent, ListComponent], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AutoCompleteMoreDialogComponent, [{
        type: Component,
        args: [{
                standalone: false,
                template: `
		<mat-dialog-content>
			<h1 class="page-header">{{inputs.entityType.PluralTitle}}</h1>
			<dscribe-list
				[hideFilter]="false"
				[entityType]="inputs.entityType"
				(selectionChanged)="listRowSelectionChanged($event)">
			</dscribe-list>
		</mat-dialog-content>
		<mat-dialog-actions>
			<button mat-raised-button color="primary" (click)="doneClicked()">Ok</button>
		</mat-dialog-actions>
	`
            }]
    }], () => [{ type: i1$2.MatDialogRef, decorators: [{
                type: Optional
            }] }, { type: undefined, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AutoCompleteMoreDialogComponent, { className: "AutoCompleteMoreDialogComponent", filePath: "lib/property-editors/entity-auto-complete.component.ts", lineNumber: 33 }); })();
class EntityAutoCompleteComponent {
    constructor(dataHandler, dialog) {
        this.dataHandler = dataHandler;
        this.dialog = dialog;
        this.inputCtrl = new FormControl();
        this.listRefresher = true;
        this.loading = false;
    }
    ngOnChanges(changes) {
        if (this.entity) {
            const id = this.entity[this.overridePropertyName || this.property.Name];
            if (!id) {
                this.selection = null;
                this.inputCtrl.setValue(this.selection);
                return;
            }
            this.dataHandler.getName(this.property.EntityTypeName, id)
                .subscribe(result => {
                this.selection = { DisplayName: result, Id: id };
                this.inputCtrl.setValue(this.selection);
            });
        }
    }
    ngOnInit() {
        this.filteredOptions = this.inputCtrl.valueChanges
            .pipe(startWith({ name: null }), map(idName => {
            return idName && typeof idName === 'object' ? idName.name : idName;
        }), mergeMap(name => this.filter(name)), share());
    }
    filter(name) {
        if (name) {
            this.trigger.autocompleteDisabled = false;
        }
        return this.dataHandler.getAutoCompleteItems(this.property.EntityTypeName, name);
    }
    displayFn() {
        return this.selection ? this.selection.DisplayName : '';
    }
    selectionChange(item) {
        this.selection = item;
        this.entity[this.overridePropertyName || this.property.Name] = item && item.Id;
        this.inputCtrl.setValue(item);
    }
    clean() {
        this.selectionChange(null);
        this.inputCtrl.setValue('');
        this.trigger.autocompleteDisabled = true;
    }
    toggleDropDown() {
        if (this.trigger.autocomplete.isOpen) {
            this.trigger.closePanel();
            this.trigger.autocompleteDisabled = true;
        }
        else {
            this.trigger.autocompleteDisabled = false;
            this.trigger.openPanel();
        }
    }
    selectFromList() {
        const data = {
            entity: this.property.EntityType,
            selectedRow: null,
            entityType: this.property.EntityType
        };
        this.dialog.open(AutoCompleteMoreDialogComponent, {
            width: '800px',
            data: data
        }).afterClosed().subscribe(x => {
            if (!x) {
                return;
            }
            this.dataHandler.getName(this.property.EntityTypeName, data.selectedRow[this.property.EntityType.getPrimaryKey().Name])
                .subscribe(y => {
                this.selectionChange({
                    Id: data.selectedRow[this.property.EntityType.getPrimaryKey().Name],
                    DisplayName: y
                });
            });
        });
    }
    addNew() {
        this.dialog.open(ListAddNEditDialogComponent, {
            width: '800px',
            data: {
                entity: {},
                action: ManageEntityModes.Insert,
                entityTypeName: this.property.EntityType.Name,
                title: this.property.EntityType.SingularTitle,
                master: null
            }
        }).afterClosed().subscribe((x) => {
            if (!x) {
                return;
            }
            this.dataHandler.getName(this.property.EntityTypeName, x.instance[this.property.EntityType.getPrimaryKey().Name])
                .subscribe(y => {
                this.selectionChange({
                    Id: x.instance[this.property.EntityType.getPrimaryKey().Name],
                    DisplayName: y
                });
            });
        });
    }
    static { this.ɵfac = function EntityAutoCompleteComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EntityAutoCompleteComponent)(i0.ɵɵdirectiveInject(DataHandlerService), i0.ɵɵdirectiveInject(i1$2.MatDialog)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EntityAutoCompleteComponent, selectors: [["dscribe-entity-auto-complete-component"]], viewQuery: function EntityAutoCompleteComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(MatAutocompleteTrigger, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.trigger = _t.first);
        } }, inputs: { entity: "entity", property: "property", color: "color", overridePropertyName: "overridePropertyName", isFilter: "isFilter" }, standalone: false, features: [i0.ɵɵNgOnChangesFeature], decls: 8, vars: 8, consts: [["auto", "matAutocomplete"], ["class", "full-width", "appearance", "outline", 4, "ngIf"], [3, "placeholder", "formControl", "matAutocomplete", 4, "ngIf"], ["class", "fa fa-spinner", "matSuffix", "", 4, "ngIf"], [3, "displayWith"], [3, "value", "onSelectionChange", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["appearance", "outline", 1, "full-width"], ["matInput", "", 3, "placeholder", "formControl", "matAutocomplete", "required", "matAutocompleteDisabled"], ["matSuffix", "", 1, "dropdown-actions-container"], ["mat-icon-button", "", "tabindex", "-1", 3, "click", "matTooltip"], ["mat-icon-button", "", "matTooltip", "Clear the value", "tabindex", "-1", 3, "click"], ["matSuffix", "", 1, "fa", "fa-spinner"], [3, "onSelectionChange", "value"], [3, "placeholder", "formControl", "matAutocomplete"], ["class", "error-message", 4, "ngFor", "ngForOf"], [1, "error-message"]], template: function EntityAutoCompleteComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, EntityAutoCompleteComponent_mat_form_field_0_Template, 22, 19, "mat-form-field", 1)(1, EntityAutoCompleteComponent_input_1_Template, 1, 5, "input", 2)(2, EntityAutoCompleteComponent_i_2_Template, 1, 0, "i", 3);
            i0.ɵɵelementStart(3, "mat-autocomplete", 4, 0);
            i0.ɵɵtemplate(5, EntityAutoCompleteComponent_mat_option_5_Template, 2, 2, "mat-option", 5);
            i0.ɵɵpipe(6, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, EntityAutoCompleteComponent_div_7_Template, 2, 1, "div", 6);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.listRefresher && !ctx.isFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("displayWith", ctx.displayFn.bind(ctx));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(6, 6, ctx.filteredOptions));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.property == null ? null : ctx.property.ValidationErrors);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.DefaultValueAccessor, i5$1.NgControlStatus, i5$1.RequiredValidator, i5$1.FormControlDirective, i6$1.MatAutocomplete, i6$1.MatOption, i6$1.MatAutocompleteTrigger, i5.MatIconButton, i8.MatFormField, i8.MatLabel, i8.MatSuffix, i6.MatIcon, i10$1.MatInput, i11.MatTooltip, i1$3.AsyncPipe], styles: [".dropdown-actions-container[_ngcontent-%COMP%]{display:flex;flex-flow:row wrap}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EntityAutoCompleteComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-entity-auto-complete-component', template: "<mat-form-field class=\"full-width\" *ngIf=\"listRefresher && !isFilter\" appearance=\"outline\">\r\n\t<mat-label>{{property.Title || property.Name}}</mat-label>\r\n\t<input \r\n\t\tmatInput \r\n\t\t[placeholder]=\"property.Title || property.Name\" \r\n\t\t[attr.id]=\"property.Name\"\r\n\t\t[attr.aria-label]=\"property.Name\"\r\n\t\t[formControl]=\"inputCtrl\" \r\n\t\t[matAutocomplete]=\"auto\" \r\n\t\t[required]=\"!property.IsNullable\"\r\n\t\t[matAutocompleteDisabled]=\"true\">\r\n\t<div matSuffix class=\"dropdown-actions-container\">\r\n\t\t<button mat-icon-button (click)=\"toggleDropDown()\" matTooltip=\"{{isAutoCompleteOpen ? 'Hide' : 'Show'}} DropDown\" tabindex=\"-1\">\r\n\t\t\t<mat-icon>arrow_drop_down</mat-icon>\r\n\t\t</button>\r\n\t\t<button mat-icon-button (click)=\"selectFromList()\" tabindex=\"-1\"\r\n\t\t\t\t\t\tmatTooltip=\"Select a {{property?.EntityType?.SingularTitle || property?.EntityType?.Name}} from list\">\r\n\t\t\t<mat-icon>menu</mat-icon>\r\n\t\t</button>\r\n\t\t<button mat-icon-button (click)=\"addNew()\" tabindex=\"-1\"\r\n\t\t\t\t\t\tmatTooltip=\"Add a new {{property?.EntityType?.SingularTitle || property?.EntityType?.Name}}\">\r\n\t\t\t<mat-icon>add</mat-icon>\r\n\t\t</button>\r\n\t\t<button mat-icon-button (click)=\"clean()\" matTooltip=\"Clear the value\" tabindex=\"-1\">\r\n\t\t\t<mat-icon>remove</mat-icon>\r\n\t\t</button>\r\n\t</div>\r\n\t<i *ngIf=\"loading\" class=\"fa fa-spinner\" matSuffix></i>\r\n\t<mat-autocomplete \r\n\t\t#auto=\"matAutocomplete\" \r\n\t\t[displayWith]=\"displayFn.bind(this)\">\r\n\t\t<mat-option *ngFor=\"let item of filteredOptions | async\" [value]=\"item.Id\"\r\n\t\t\t\t\t\t\t\t(onSelectionChange)=\"selectionChange(item)\">\r\n\t\t\t{{ item.DisplayName ? item.DisplayName : '' }}\r\n\t\t</mat-option>\r\n\t</mat-autocomplete>\r\n</mat-form-field>\r\n\r\n<input *ngIf=\"isFilter\" [placeholder]=\"property.Title || overridePropertyName || property.Name\"\r\n\t\t\t [attr.id]=\"property.Name\"\r\n\t\t\t [attr.aria-label]=\"property.Name\" [formControl]=\"inputCtrl\" [matAutocomplete]=\"auto\">\r\n<i *ngIf=\"loading\" class=\"fa fa-spinner\" matSuffix></i>\r\n<mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayFn.bind(this)\">\r\n\t<mat-option *ngFor=\"let item of filteredOptions | async\" [value]=\"item.Id\"\r\n\t\t\t\t\t\t\t(onSelectionChange)=\"selectionChange(item)\">\r\n\t\t{{ item.DisplayName ? item.DisplayName : '' }}\r\n\t</mat-option>\r\n</mat-autocomplete>\r\n\r\n<div *ngIf=\"property?.ValidationErrors\">\r\n\t<p *ngFor=\"let validationError of property.ValidationErrors\" class=\"error-message\">\r\n\t\t{{validationError.Message}}\r\n\t</p>\r\n</div>\r\n", styles: [".dropdown-actions-container{display:flex;flex-flow:row wrap}\n"] }]
    }], () => [{ type: DataHandlerService }, { type: i1$2.MatDialog }], { entity: [{
            type: Input
        }], property: [{
            type: Input
        }], color: [{
            type: Input
        }], overridePropertyName: [{
            type: Input
        }], isFilter: [{
            type: Input
        }], trigger: [{
            type: ViewChild,
            args: [MatAutocompleteTrigger]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EntityAutoCompleteComponent, { className: "EntityAutoCompleteComponent", filePath: "lib/property-editors/entity-auto-complete.component.ts", lineNumber: 61 }); })();

const _c0 = a0 => [a0];
class EntityListEditorComponent {
    constructor(dataHandlerService) {
        this.dataHandlerService = dataHandlerService;
    }
    ngOnInit() {
        this.dataHandlerService.getIdAndNames(this.property.EntityTypeName).subscribe((res) => {
            this.items = res;
        }, (errors) => {
        });
        // TODO: Will cause exception
        this.master = new MasterReference(this.entity, this.property);
    }
    ngOnChanges() {
        if (!this.master) {
            // TODO: Will cause exception
            this.master = new MasterReference(this.entity, this.property);
        }
        this.master.master = this.entity;
        this.master.masterProperty = this.property;
    }
    static { this.ɵfac = function EntityListEditorComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EntityListEditorComponent)(i0.ɵɵdirectiveInject(DataHandlerService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EntityListEditorComponent, selectors: [["dscribe-entity-list-editor"]], inputs: { entity: "entity", property: "property", overridePropertyName: "overridePropertyName", isFilter: "isFilter" }, standalone: false, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 4, consts: [[3, "entityType", "masters"]], template: function EntityListEditorComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "dscribe-list", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("entityType", ctx.property.EntityType)("masters", i0.ɵɵpureFunction1(2, _c0, ctx.master));
        } }, dependencies: [ListComponent], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EntityListEditorComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-entity-list-editor', template: "<dscribe-list [entityType]=\"property.EntityType\" [masters]=\"[master]\"></dscribe-list>\r\n" }]
    }], () => [{ type: DataHandlerService }], { entity: [{
            type: Input
        }], property: [{
            type: Input
        }], overridePropertyName: [{
            type: Input
        }], isFilter: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EntityListEditorComponent, { className: "EntityListEditorComponent", filePath: "lib/property-editors/entity-list-editor.component.ts", lineNumber: 12 }); })();

function EntitySelectComponent_mat_form_field_0_mat_option_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r3.Id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r3.DisplayName ? item_r3.DisplayName : item_r3.Name, " ");
} }
function EntitySelectComponent_mat_form_field_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field", 3)(1, "mat-label");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-select", 4);
    i0.ɵɵtwoWayListener("ngModelChange", function EntitySelectComponent_mat_form_field_0_Template_mat_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name], $event) || (ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtemplate(4, EntitySelectComponent_mat_form_field_0_mat_option_4_Template, 2, 2, "mat-option", 5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.property.Title || ctx_r1.property.Name);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name]);
    i0.ɵɵproperty("required", !ctx_r1.property.IsNullable);
    i0.ɵɵattribute("id", ctx_r1.property.Name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.list);
} }
function EntitySelectComponent_select_1_option_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", item_r5.Id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r5.DisplayName ? item_r5.DisplayName : item_r5.Name, " ");
} }
function EntitySelectComponent_select_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "select", 7);
    i0.ɵɵtwoWayListener("ngModelChange", function EntitySelectComponent_select_1_Template_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name], $event) || (ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtemplate(1, EntitySelectComponent_select_1_option_1_Template, 2, 2, "option", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name]);
    i0.ɵɵattribute("id", ctx_r1.property.Name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.list);
} }
function EntitySelectComponent_div_2_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const validationError_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", validationError_r6.Message, " ");
} }
function EntitySelectComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, EntitySelectComponent_div_2_p_1_Template, 2, 1, "p", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.property.ValidationErrors);
} }
class EntitySelectComponent {
    static { this.ɵfac = function EntitySelectComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EntitySelectComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EntitySelectComponent, selectors: [["dscribe-entity-select"]], inputs: { entity: "entity", property: "property", color: "color", list: "list", overridePropertyName: "overridePropertyName", isFilter: "isFilter" }, standalone: false, decls: 3, vars: 3, consts: [["class", "full-width", "appearance", "outline", 4, "ngIf"], [3, "ngModel", "ngModelChange", 4, "ngIf"], [4, "ngIf"], ["appearance", "outline", 1, "full-width"], [3, "ngModelChange", "ngModel", "required"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [3, "ngModelChange", "ngModel"], [3, "ngValue", 4, "ngFor", "ngForOf"], [3, "ngValue"], ["class", "error-message", 4, "ngFor", "ngForOf"], [1, "error-message"]], template: function EntitySelectComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, EntitySelectComponent_mat_form_field_0_Template, 5, 5, "mat-form-field", 0)(1, EntitySelectComponent_select_1_Template, 2, 3, "select", 1)(2, EntitySelectComponent_div_2_Template, 2, 1, "div", 2);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", !ctx.isFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.property == null ? null : ctx.property.ValidationErrors);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.NgSelectOption, i5$1.ɵNgSelectMultipleOption, i5$1.SelectControlValueAccessor, i5$1.NgControlStatus, i5$1.RequiredValidator, i5$1.NgModel, i6$1.MatOption, i8.MatFormField, i8.MatLabel, i13$1.MatSelect], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EntitySelectComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-entity-select', template: "<mat-form-field class=\"full-width\" *ngIf=\"!isFilter\" appearance=\"outline\">\r\n\t<mat-label>{{property.Title || property.Name}}</mat-label>\r\n\t<mat-select \r\n\t\t[attr.id]=\"property.Name\" \r\n\t\t[(ngModel)]=\"entity[overridePropertyName || property.Name]\"\r\n\t\t[required]=\"!property.IsNullable\">\r\n\t\t<mat-option *ngFor=\"let item of list\" [value]=\"item.Id\">\r\n\t\t\t{{ item.DisplayName ? item.DisplayName : item.Name }}\r\n\t\t</mat-option>\r\n\t</mat-select>\r\n</mat-form-field>\r\n\r\n<select *ngIf=\"isFilter\" [attr.id]=\"property.Name\" [(ngModel)]=\"entity[overridePropertyName || property.Name]\">\r\n\t<option *ngFor=\"let item of list\" [ngValue]=\"item.Id\">\r\n\t\t{{ item.DisplayName ? item.DisplayName : item.Name }}\r\n\t</option>\r\n</select>\r\n\r\n<div *ngIf=\"property?.ValidationErrors\">\r\n\t<p *ngFor=\"let validationError of property.ValidationErrors\" class=\"error-message\">\r\n\t\t{{validationError.Message}}\r\n\t</p>\r\n</div>\r\n" }]
    }], null, { entity: [{
            type: Input
        }], property: [{
            type: Input
        }], color: [{
            type: Input
        }], list: [{
            type: Input
        }], overridePropertyName: [{
            type: Input
        }], isFilter: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EntitySelectComponent, { className: "EntitySelectComponent", filePath: "lib/property-editors/entity-select.component.ts", lineNumber: 9 }); })();

function NumberEditorComponent_mat_form_field_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field", 3)(1, "mat-label");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 4);
    i0.ɵɵtwoWayListener("ngModelChange", function NumberEditorComponent_mat_form_field_0_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name], $event) || (ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.property.Title || ctx_r1.property.Name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("placeholder", ctx_r1.property.Title || ctx_r1.property.Name)("required", !ctx_r1.property.IsNullable);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name]);
} }
function NumberEditorComponent_input_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 5);
    i0.ɵɵtwoWayListener("ngModelChange", function NumberEditorComponent_input_1_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name], $event) || (ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("placeholder", ctx_r1.property.Title || ctx_r1.overridePropertyName || ctx_r1.property.Name);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name]);
} }
function NumberEditorComponent_div_2_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const validationError_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", validationError_r4.Message, " ");
} }
function NumberEditorComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, NumberEditorComponent_div_2_p_1_Template, 2, 1, "p", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.property.ValidationErrors);
} }
class NumberEditorComponent {
    static { this.ɵfac = function NumberEditorComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NumberEditorComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NumberEditorComponent, selectors: [["dscribe-number-editor"]], inputs: { entity: "entity", property: "property", color: "color", overridePropertyName: "overridePropertyName", isFilter: "isFilter" }, standalone: false, decls: 3, vars: 3, consts: [["class", "full-width", "appearance", "outline", 4, "ngIf"], ["type", "number", 3, "placeholder", "ngModel", "ngModelChange", 4, "ngIf"], [4, "ngIf"], ["appearance", "outline", 1, "full-width"], ["type", "number", "matInput", "", 3, "ngModelChange", "placeholder", "required", "ngModel"], ["type", "number", 3, "ngModelChange", "placeholder", "ngModel"], ["class", "error-message", 4, "ngFor", "ngForOf"], [1, "error-message"]], template: function NumberEditorComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, NumberEditorComponent_mat_form_field_0_Template, 4, 4, "mat-form-field", 0)(1, NumberEditorComponent_input_1_Template, 1, 2, "input", 1)(2, NumberEditorComponent_div_2_Template, 2, 1, "div", 2);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", !ctx.isFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.property.ValidationErrors);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.DefaultValueAccessor, i5$1.NumberValueAccessor, i5$1.NgControlStatus, i5$1.RequiredValidator, i5$1.NgModel, i8.MatFormField, i8.MatLabel, i10$1.MatInput], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NumberEditorComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-number-editor', template: "<mat-form-field *ngIf=\"!isFilter\" class=\"full-width\" appearance=\"outline\">\r\n\t<mat-label>{{property.Title || property.Name}}</mat-label>\r\n\t<input \r\n\t\ttype=\"number\" \r\n\t\tmatInput \r\n\t\t[placeholder]=\"property.Title || property.Name\"\r\n\t\t[required]=\"!property.IsNullable\"\r\n\t\t[(ngModel)]=\"entity[overridePropertyName || property.Name]\">\r\n</mat-form-field>\r\n\r\n<input *ngIf=\"isFilter\" type=\"number\" [placeholder]=\"property.Title || overridePropertyName || property.Name\"\r\n\t\t\t [(ngModel)]=\"entity[overridePropertyName || property.Name]\">\r\n\r\n<div *ngIf=\"property.ValidationErrors\">\r\n\t<p *ngFor=\"let validationError of property.ValidationErrors\" class=\"error-message\">\r\n\t\t{{validationError.Message}}\r\n\t</p>\r\n</div>\r\n" }]
    }], null, { entity: [{
            type: Input
        }], property: [{
            type: Input
        }], color: [{
            type: Input
        }], overridePropertyName: [{
            type: Input
        }], isFilter: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NumberEditorComponent, { className: "NumberEditorComponent", filePath: "lib/property-editors/number-editor.component.ts", lineNumber: 9 }); })();

function TextEditorComponent_mat_form_field_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field", 3)(1, "mat-label");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 4);
    i0.ɵɵtwoWayListener("ngModelChange", function TextEditorComponent_mat_form_field_0_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name], $event) || (ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.property.Title || ctx_r1.property.Name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("placeholder", ctx_r1.property.Title || ctx_r1.property.Name);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name]);
    i0.ɵɵproperty("required", !ctx_r1.property.IsNullable);
} }
function TextEditorComponent_input_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 5);
    i0.ɵɵtwoWayListener("ngModelChange", function TextEditorComponent_input_1_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name], $event) || (ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("placeholder", ctx_r1.property.Title || ctx_r1.overridePropertyName || ctx_r1.property.Name);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.entity[ctx_r1.overridePropertyName || ctx_r1.property.Name]);
} }
function TextEditorComponent_div_2_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const validationError_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", validationError_r4.Message, " ");
} }
function TextEditorComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, TextEditorComponent_div_2_p_1_Template, 2, 1, "p", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.property.ValidationErrors);
} }
class TextEditorComponent {
    static { this.ɵfac = function TextEditorComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TextEditorComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TextEditorComponent, selectors: [["dscribe-text-editor"]], inputs: { entity: "entity", property: "property", color: "color", overridePropertyName: "overridePropertyName", isFilter: "isFilter" }, standalone: false, decls: 3, vars: 3, consts: [["class", "full-width", "appearance", "outline", 4, "ngIf"], ["type", "text", "id", "property.Name", "name", "property.Name", 3, "placeholder", "ngModel", "ngModelChange", 4, "ngIf"], [4, "ngIf"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "type", "text", "id", "property.Name", "name", "property.Name", 3, "ngModelChange", "placeholder", "ngModel", "required"], ["type", "text", "id", "property.Name", "name", "property.Name", 3, "ngModelChange", "placeholder", "ngModel"], ["class", "error-message", 4, "ngFor", "ngForOf"], [1, "error-message"]], template: function TextEditorComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, TextEditorComponent_mat_form_field_0_Template, 4, 4, "mat-form-field", 0)(1, TextEditorComponent_input_1_Template, 1, 2, "input", 1)(2, TextEditorComponent_div_2_Template, 2, 1, "div", 2);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", !ctx.isFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.property == null ? null : ctx.property.ValidationErrors);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.DefaultValueAccessor, i5$1.NgControlStatus, i5$1.RequiredValidator, i5$1.NgModel, i8.MatFormField, i8.MatLabel, i10$1.MatInput], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TextEditorComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-text-editor', template: "<mat-form-field *ngIf=\"!isFilter\" class=\"full-width\" appearance=\"outline\">\r\n\t<mat-label>{{property.Title || property.Name}}</mat-label>\r\n\t<input \r\n\t\tmatInput \r\n\t\ttype=\"text\" \r\n\t\tid=\"property.Name\"\r\n\t\tname=\"property.Name\"\r\n\t\t[placeholder]=\"property.Title || property.Name\"\r\n\t\t[(ngModel)]=\"entity[overridePropertyName || property.Name]\" \r\n\t\t[required]=\"!property.IsNullable\">\r\n</mat-form-field>\r\n\r\n<input \r\n\ttype=\"text\" \r\n\t*ngIf=\"isFilter\" \r\n\tid=\"property.Name\"\r\n\tname=\"property.Name\"\r\n\t[placeholder]=\"property.Title || overridePropertyName || property.Name\"\r\n\t[(ngModel)]=\"entity[overridePropertyName || property.Name]\">\r\n\r\n<div *ngIf=\"property?.ValidationErrors\">\r\n\t<p *ngFor=\"let validationError of property.ValidationErrors\" class=\"error-message\">\r\n\t\t{{validationError.Message}}\r\n\t</p>\r\n</div>\r\n" }]
    }], null, { entity: [{
            type: Input
        }], property: [{
            type: Input
        }], color: [{
            type: Input
        }], overridePropertyName: [{
            type: Input
        }], isFilter: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TextEditorComponent, { className: "TextEditorComponent", filePath: "lib/property-editors/text-editor.component.ts", lineNumber: 9 }); })();

function PropertyEditorComponent_dscribe_text_editor_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-text-editor", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_dscribe_number_editor_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-number-editor", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_dscribe_entity_auto_complete_component_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-entity-auto-complete-component", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_dscribe_entity_list_editor_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-entity-list-editor", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_dscribe_bool_editor_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-bool-editor", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_dscribe_date_editor_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-date-editor", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_dscribe_datetime_editor_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-datetime-editor", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_dscribe_entity_select_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-entity-select", 5);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("list", ctx_r0.selectionList)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_dscribe_entity_select_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-entity-select", 5);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("list", ctx_r0.selectionList)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_dscribe_entity_select_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-entity-select", 5);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("list", ctx_r0.selectionList)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_ng_container_11_dscribe_entity_select_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-entity-select", 5);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("list", ctx_r0.selectionList)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, PropertyEditorComponent_ng_container_11_dscribe_entity_select_1_Template, 1, 5, "dscribe-entity-select", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "dataTypeSemantic");
} }
function PropertyEditorComponent_ng_container_12_dscribe_entity_select_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-entity-select", 5);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("list", ctx_r0.selectionList)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_ng_container_12_dscribe_entity_select_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-entity-select", 5);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("list", ctx_r0.selectionList)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, PropertyEditorComponent_ng_container_12_dscribe_entity_select_1_Template, 1, 5, "dscribe-entity-select", 2)(2, PropertyEditorComponent_ng_container_12_dscribe_entity_select_2_Template, 1, 5, "dscribe-entity-select", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "dataTypeSemantic");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "foreignKeyProperty");
} }
function PropertyEditorComponent_ng_container_13_dscribe_entity_select_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-entity-select", 5);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("list", ctx_r0.selectionList)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_ng_container_13_dscribe_entity_select_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-entity-select", 5);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("property", ctx_r0.property)("entity", ctx_r0.entity)("list", ctx_r0.selectionList)("overridePropertyName", ctx_r0.overridePropertyName)("isFilter", ctx_r0.isFilter);
} }
function PropertyEditorComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, PropertyEditorComponent_ng_container_13_dscribe_entity_select_1_Template, 1, 5, "dscribe-entity-select", 2)(2, PropertyEditorComponent_ng_container_13_dscribe_entity_select_2_Template, 1, 5, "dscribe-entity-select", 2);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "dataTypeSemantic");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "inverseProperty");
} }
class PropertyEditorComponent {
    ngOnChanges(changes) {
        if (changes['property'] && changes['property'].currentValue !== changes['property'].previousValue) {
            switch (this.property && this.property.DataType) {
                case DataTypes.bool:
                    this.inputType = 'checkbox';
                    break;
                case DataTypes.Date:
                    this.inputType = 'date';
                    break;
                case DataTypes.DateTime:
                    this.inputType = 'datetime';
                    break;
                case DataTypes.int:
                case DataTypes.decimal:
                    this.inputType = 'Number';
                    break;
                case DataTypes.ForeignKey:
                    this.inputType = 'entitySelector';
                    break;
                case DataTypes.NavigationList:
                    this.inputType = 'entityListEditor';
                    break;
                default:
                    this.inputType = 'Text';
            }
        }
    }
    static { this.ɵfac = function PropertyEditorComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PropertyEditorComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PropertyEditorComponent, selectors: [["dscribe-property-editor"]], inputs: { property: "property", entity: "entity", color: "color", selectionList: "selectionList", dataType: "dataType", overridePropertyName: "overridePropertyName", width: "width", isFilter: "isFilter" }, standalone: false, features: [i0.ɵɵNgOnChangesFeature], decls: 14, vars: 14, consts: [[3, "ngSwitch"], [3, "property", "entity", "overridePropertyName", "isFilter", 4, "ngSwitchCase"], [3, "property", "entity", "list", "overridePropertyName", "isFilter", 4, "ngSwitchCase"], [4, "ngIf"], [3, "property", "entity", "overridePropertyName", "isFilter"], [3, "property", "entity", "list", "overridePropertyName", "isFilter"]], template: function PropertyEditorComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementContainerStart(0, 0);
            i0.ɵɵtemplate(1, PropertyEditorComponent_dscribe_text_editor_1_Template, 1, 4, "dscribe-text-editor", 1)(2, PropertyEditorComponent_dscribe_number_editor_2_Template, 1, 4, "dscribe-number-editor", 1)(3, PropertyEditorComponent_dscribe_entity_auto_complete_component_3_Template, 1, 4, "dscribe-entity-auto-complete-component", 1)(4, PropertyEditorComponent_dscribe_entity_list_editor_4_Template, 1, 4, "dscribe-entity-list-editor", 1)(5, PropertyEditorComponent_dscribe_bool_editor_5_Template, 1, 4, "dscribe-bool-editor", 1)(6, PropertyEditorComponent_dscribe_date_editor_6_Template, 1, 4, "dscribe-date-editor", 1)(7, PropertyEditorComponent_dscribe_datetime_editor_7_Template, 1, 4, "dscribe-datetime-editor", 1)(8, PropertyEditorComponent_dscribe_entity_select_8_Template, 1, 5, "dscribe-entity-select", 2)(9, PropertyEditorComponent_dscribe_entity_select_9_Template, 1, 5, "dscribe-entity-select", 2)(10, PropertyEditorComponent_dscribe_entity_select_10_Template, 1, 5, "dscribe-entity-select", 2)(11, PropertyEditorComponent_ng_container_11_Template, 2, 1, "ng-container", 3)(12, PropertyEditorComponent_ng_container_12_Template, 3, 2, "ng-container", 3)(13, PropertyEditorComponent_ng_container_13_Template, 3, 2, "ng-container", 3);
            i0.ɵɵelementContainerEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngSwitch", ctx.inputType);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "Text");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "Number");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "entitySelector");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "entityListEditor");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "checkbox");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "date");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "datetime");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "typeCategory");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "propertyCategory");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "propertyDataType");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.dataType == "ForeignKey");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.dataType == "NavigationEntity");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.dataType == "NavigationList");
        } }, dependencies: [i1$3.NgIf, i1$3.NgSwitch, i1$3.NgSwitchCase, BoolEditorComponent, DateEditorComponent, DatetimeEditorComponent, EntityAutoCompleteComponent, EntityListEditorComponent, EntitySelectComponent, NumberEditorComponent, TextEditorComponent], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PropertyEditorComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-property-editor', template: "<ng-container [ngSwitch]=\"inputType\">\r\n\t<dscribe-text-editor\r\n\t\t*ngSwitchCase=\"'Text'\"\r\n\t\t[property]=\"property\"\r\n\t\t[entity]=\"entity\"\r\n\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t[isFilter]=\"isFilter\">\r\n\t</dscribe-text-editor>\r\n\r\n\t<dscribe-number-editor\r\n\t\t*ngSwitchCase=\"'Number'\"\r\n\t\t[property]=\"property\"\r\n\t\t[entity]=\"entity\"\r\n\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t[isFilter]=\"isFilter\">\r\n\t</dscribe-number-editor>\r\n\r\n\t<dscribe-entity-auto-complete-component\r\n\t\t*ngSwitchCase=\"'entitySelector'\"\r\n\t\t[property]=\"property\"\r\n\t\t[entity]=\"entity\"\r\n\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t[isFilter]=\"isFilter\">\r\n\t</dscribe-entity-auto-complete-component>\r\n\r\n\r\n\t<dscribe-entity-list-editor\r\n\t\t*ngSwitchCase=\"'entityListEditor'\"\r\n\t\t[property]=\"property\"\r\n\t\t[entity]=\"entity\"\r\n\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t[isFilter]=\"isFilter\">\r\n\t</dscribe-entity-list-editor>\r\n\r\n\t<dscribe-bool-editor\r\n\t\t*ngSwitchCase=\"'checkbox'\"\r\n\t\t[property]=\"property\"\r\n\t\t[entity]=\"entity\"\r\n\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t[isFilter]=\"isFilter\">\r\n\t</dscribe-bool-editor>\r\n\r\n\t<dscribe-date-editor\r\n\t\t*ngSwitchCase=\"'date'\"\r\n\t\t[property]=\"property\"\r\n\t\t[entity]=\"entity\"\r\n\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t[isFilter]=\"isFilter\">\r\n\t</dscribe-date-editor>\r\n\r\n\t<dscribe-datetime-editor\r\n\t\t*ngSwitchCase=\"'datetime'\"\r\n\t\t[property]=\"property\"\r\n\t\t[entity]=\"entity\"\r\n\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t[isFilter]=\"isFilter\">\r\n\t</dscribe-datetime-editor>\r\n\r\n\t<dscribe-entity-select\r\n\t\t*ngSwitchCase=\"'typeCategory'\"\r\n\t\t[property]=\"property\"\r\n\t\t[entity]=\"entity\"\r\n\t\t[list]=\"selectionList\"\r\n\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t[isFilter]=\"isFilter\">\r\n\t</dscribe-entity-select>\r\n\r\n\t<dscribe-entity-select\r\n\t\t*ngSwitchCase=\"'propertyCategory'\"\r\n\t\t[property]=\"property\"\r\n\t\t[entity]=\"entity\"\r\n\t\t[list]=\"selectionList\"\r\n\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t[isFilter]=\"isFilter\">\r\n\t</dscribe-entity-select>\r\n\r\n\t<dscribe-entity-select\r\n\t\t*ngSwitchCase=\"'propertyDataType'\"\r\n\t\t[property]=\"property\"\r\n\t\t[entity]=\"entity\"\r\n\t\t[list]=\"selectionList\"\r\n\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t[isFilter]=\"isFilter\">\r\n\t</dscribe-entity-select>\r\n\r\n\t<ng-container *ngIf=\"dataType == 'ForeignKey'\">\r\n\t\t<dscribe-entity-select\r\n\t\t\t*ngSwitchCase=\"'dataTypeSemantic'\"\r\n\t\t\t[property]=\"property\"\r\n\t\t\t[entity]=\"entity\"\r\n\t\t\t[list]=\"selectionList\"\r\n\t\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t\t[isFilter]=\"isFilter\">\r\n\t\t</dscribe-entity-select>\r\n\t</ng-container>\r\n\r\n\t<ng-container *ngIf=\"dataType == 'NavigationEntity'\">\r\n\t\t<dscribe-entity-select\r\n\t\t\t*ngSwitchCase=\"'dataTypeSemantic'\"\r\n\t\t\t[property]=\"property\"\r\n\t\t\t[entity]=\"entity\"\r\n\t\t\t[list]=\"selectionList\"\r\n\t\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t\t[isFilter]=\"isFilter\">\r\n\t\t</dscribe-entity-select>\r\n\r\n\t\t<dscribe-entity-select\r\n\t\t\t*ngSwitchCase=\"'foreignKeyProperty'\"\r\n\t\t\t[property]=\"property\"\r\n\t\t\t[entity]=\"entity\"\r\n\t\t\t[list]=\"selectionList\"\r\n\t\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t\t[isFilter]=\"isFilter\">\r\n\t\t</dscribe-entity-select>\r\n\t</ng-container>\r\n\r\n\t<ng-container *ngIf=\"dataType == 'NavigationList'\">\r\n\t\t<dscribe-entity-select\r\n\t\t\t*ngSwitchCase=\"'dataTypeSemantic'\"\r\n\t\t\t[property]=\"property\"\r\n\t\t\t[entity]=\"entity\"\r\n\t\t\t[list]=\"selectionList\"\r\n\t\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t\t[isFilter]=\"isFilter\">\r\n\t\t</dscribe-entity-select>\r\n\r\n\t\t<dscribe-entity-select\r\n\t\t\t*ngSwitchCase=\"'inverseProperty'\"\r\n\t\t\t[property]=\"property\"\r\n\t\t\t[entity]=\"entity\"\r\n\t\t\t[list]=\"selectionList\"\r\n\t\t\t[overridePropertyName]=\"overridePropertyName\"\r\n\t\t\t[isFilter]=\"isFilter\">\r\n\t\t</dscribe-entity-select>\r\n\t</ng-container>\r\n</ng-container>\r\n" }]
    }], null, { property: [{
            type: Input
        }], entity: [{
            type: Input
        }], color: [{
            type: Input
        }], selectionList: [{
            type: Input
        }], dataType: [{
            type: Input
        }], overridePropertyName: [{
            type: Input
        }], width: [{
            type: Input
        }], isFilter: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PropertyEditorComponent, { className: "PropertyEditorComponent", filePath: "lib/property-editors/property-editor.component.ts", lineNumber: 10 }); })();

function ConstantFilterNodeComponent_div_0_div_1_mat_icon_5_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-icon", 9);
    i0.ɵɵlistener("click", function ConstantFilterNodeComponent_div_0_div_1_mat_icon_5_Template_mat_icon_click_0_listener() { i0.ɵɵrestoreView(_r3); const i_r4 = i0.ɵɵnextContext(2).index; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.node.removeValueAt(i_r4)); });
    i0.ɵɵtext(1, "delete ");
    i0.ɵɵelementEnd();
} }
function ConstantFilterNodeComponent_div_0_div_1_mat_icon_6_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-icon", 10);
    i0.ɵɵlistener("click", function ConstantFilterNodeComponent_div_0_div_1_mat_icon_6_Template_mat_icon_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.node.addValue()); });
    i0.ɵɵtext(1, "add ");
    i0.ɵɵelementEnd();
} }
function ConstantFilterNodeComponent_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "mat-icon", 5);
    i0.ɵɵlistener("click", function ConstantFilterNodeComponent_div_0_div_1_Template_mat_icon_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.manipulator.addSibling(ctx_r1.node)); });
    i0.ɵɵtext(2, "fast_forward");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-icon", 6);
    i0.ɵɵlistener("click", function ConstantFilterNodeComponent_div_0_div_1_Template_mat_icon_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.manipulator.toggleType(ctx_r1.node)); });
    i0.ɵɵtext(4, "refresh");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, ConstantFilterNodeComponent_div_0_div_1_mat_icon_5_Template, 2, 0, "mat-icon", 7)(6, ConstantFilterNodeComponent_div_0_div_1_mat_icon_6_Template, 2, 0, "mat-icon", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r4 = i0.ɵɵnextContext().index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r1.node.values.length > 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.node.allowMultipleValues && i_r4 == ctx_r1.node.values.length - 1);
} }
function ConstantFilterNodeComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, ConstantFilterNodeComponent_div_0_div_1_Template, 7, 2, "div", 2);
    i0.ɵɵelement(2, "dscribe-property-editor", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const value_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.node.allowMultipleValues);
    i0.ɵɵadvance();
    i0.ɵɵproperty("property", ctx_r1.node.dataType)("overridePropertyName", "value")("entity", value_r6)("isFilter", true);
} }
class ConstantFilterNodeComponent {
    constructor(manipulator) {
        this.manipulator = manipulator;
    }
    ngOnInit() {
    }
    static { this.ɵfac = function ConstantFilterNodeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ConstantFilterNodeComponent)(i0.ɵɵdirectiveInject(FilterTreeManipulator)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ConstantFilterNodeComponent, selectors: [["dscribe-constant-filter-node"]], inputs: { node: "node" }, standalone: false, decls: 1, vars: 1, consts: [["class", "filter-node-container", 4, "ngFor", "ngForOf"], [1, "filter-node-container"], ["class", "node-action-btns", 4, "ngIf"], [1, "filter-option", 3, "property", "overridePropertyName", "entity", "isFilter"], [1, "node-action-btns"], ["title", "move under calculation", 3, "click"], ["title", "convert to dependent value", 3, "click"], ["title", "remove", 3, "click", 4, "ngIf"], ["class", "add-value-btn", "title", "add", 3, "click", 4, "ngIf"], ["title", "remove", 3, "click"], ["title", "add", 1, "add-value-btn", 3, "click"]], template: function ConstantFilterNodeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ConstantFilterNodeComponent_div_0_Template, 3, 5, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngForOf", ctx.node.values);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i6.MatIcon, PropertyEditorComponent], styles: [".filter-option[_ngcontent-%COMP%]{margin:0 2px;width:100px;display:inline-block}.filter-option[_ngcontent-%COMP%]   option[invalid][_ngcontent-%COMP%], .noOptionSelected[_ngcontent-%COMP%]{color:gray}.node-action-btns[_ngcontent-%COMP%]{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:hover{background-color:#ff96ff66}.pull-left[_ngcontent-%COMP%]{right:70px}.filter-node-container[_ngcontent-%COMP%]{position:relative;display:inline-block;vertical-align:top}.filter-node-container[_ngcontent-%COMP%]:hover > .node-action-btns[_ngcontent-%COMP%]{visibility:visible}.has-error[_ngcontent-%COMP%]{background-color:#ff000026}.is-ok[_ngcontent-%COMP%]{background-color:#0000ff0d}.mat-form-field[_ngcontent-%COMP%]{display:inline-block;position:relative;text-align:left}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{text-align:right}.mat-form-field-wrapper[_ngcontent-%COMP%]{position:relative}.mat-form-field-flex[_ngcontent-%COMP%]{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]{white-space:nowrap;flex:none}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]{font:inherit;vertical-align:baseline}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:inherit}.mat-form-field-infix[_ngcontent-%COMP%]{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder[_ngcontent-%COMP%]{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%], .mat-form-field-empty.mat-form-field-placeholder[_ngcontent-%COMP%]{display:block}.mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:none}.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:block;transition:none}.mat-form-field-placeholder[_ngcontent-%COMP%]:not(.mat-form-field-empty){transition:none}.mat-form-field-underline[_ngcontent-%COMP%]{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled[_ngcontent-%COMP%]{background:transparent 0}.mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{height:2px}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%], .mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper[_ngcontent-%COMP%]{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-subscript-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper[_ngcontent-%COMP%]{display:flex}.mat-form-field-hint-spacer[_ngcontent-%COMP%]{flex:1 0 1em}.mat-error[_ngcontent-%COMP%]{display:block}.mat-input-element[_ngcontent-%COMP%]{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}.mat-input-element[_ngcontent-%COMP%]::placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-moz-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-webkit-input-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element[_ngcontent-%COMP%]{resize:vertical;overflow:auto}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConstantFilterNodeComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-constant-filter-node', template: "<div *ngFor=\"let value of node.values; let i = index\" class=\"filter-node-container\">\r\n\t<div class=\"node-action-btns\" *ngIf=\"node.allowMultipleValues\">\r\n\t\t<mat-icon (click)=\"manipulator.addSibling(node)\" title=\"move under calculation\">fast_forward</mat-icon>\r\n\t\t<mat-icon (click)=\"manipulator.toggleType(node)\" title=\"convert to dependent value\">refresh</mat-icon>\r\n\t\t<mat-icon (click)=\"node.removeValueAt(i)\"\r\n\t\t\t\t\t\t\t*ngIf=\"node.values.length > 1\" title=\"remove\">delete\r\n\t\t</mat-icon>\r\n\t\t<mat-icon class=\"add-value-btn\" *ngIf=\"node.allowMultipleValues && i == node.values.length - 1\"\r\n\t\t\t\t\t\t\t(click)=\"node.addValue()\" title=\"add\">add\r\n\t\t</mat-icon>\r\n\t</div>\r\n\t<dscribe-property-editor\r\n\t\tclass=\"filter-option\"\r\n\t\t[property]=\"node.dataType\"\r\n\t\t[overridePropertyName]=\"'value'\"\r\n\t\t[entity]=\"value\"\r\n\t\t[isFilter]=\"true\">\r\n\t</dscribe-property-editor>\r\n</div>\r\n", styles: [".filter-option{margin:0 2px;width:100px;display:inline-block}.filter-option option[invalid],.noOptionSelected{color:gray}.node-action-btns{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns mat-icon{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns mat-icon:hover{background-color:#ff96ff66}.pull-left{right:70px}.filter-node-container{position:relative;display:inline-block;vertical-align:top}.filter-node-container:hover>.node-action-btns{visibility:visible}.has-error{background-color:#ff000026}.is-ok{background-color:#0000ff0d}.mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl] .mat-form-field-placeholder{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-placeholder,.mat-form-field-empty.mat-form-field-placeholder{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:block;transition:none}.mat-form-field-placeholder:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled{background:transparent 0}.mat-form-field-underline .mat-form-field-ripple{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused .mat-form-field-underline .mat-form-field-ripple{height:2px}.mat-focused .mat-form-field-underline .mat-form-field-ripple,.mat-form-field-invalid .mat-form-field-underline .mat-form-field-ripple{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper .mat-icon,.mat-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::placeholder{color:transparent!important}.mat-input-element::-moz-placeholder{color:transparent!important}.mat-input-element::-webkit-input-placeholder{color:transparent!important}.mat-input-element:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element{resize:vertical;overflow:auto}\n"] }]
    }], () => [{ type: FilterTreeManipulator }], { node: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ConstantFilterNodeComponent, { className: "ConstantFilterNodeComponent", filePath: "lib/filtering/components/constant-filter-node/constant-filter-node.component.ts", lineNumber: 11 }); })();

function LambdaFilterNodeComponent_dscribe_filter_node_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "dscribe-filter-node", 1);
} if (rf & 2) {
    const child_r1 = ctx.$implicit;
    i0.ɵɵproperty("node", child_r1);
} }
class LambdaFilterNodeComponent {
    constructor() {
    }
    static { this.ɵfac = function LambdaFilterNodeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LambdaFilterNodeComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LambdaFilterNodeComponent, selectors: [["dscribe-lambda-filter-node"]], inputs: { node: "node" }, standalone: false, decls: 3, vars: 2, consts: [[3, "node", 4, "ngFor", "ngForOf"], [3, "node"]], template: function LambdaFilterNodeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtext(0);
            i0.ɵɵelementContainerStart(1);
            i0.ɵɵtemplate(2, LambdaFilterNodeComponent_dscribe_filter_node_2_Template, 1, 1, "dscribe-filter-node", 0);
            i0.ɵɵelementContainerEnd();
        } if (rf & 2) {
            i0.ɵɵtextInterpolate1("", ctx.node == null ? null : ctx.node.title, "\n");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.node == null ? null : ctx.node.children);
        } }, dependencies: [i1$3.NgForOf, FilterNodeComponent], styles: [".filter-option[_ngcontent-%COMP%]{margin:0 2px;width:100px;display:inline-block}.filter-option[_ngcontent-%COMP%]   option[invalid][_ngcontent-%COMP%], .noOptionSelected[_ngcontent-%COMP%]{color:gray}.node-action-btns[_ngcontent-%COMP%]{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:hover{background-color:#ff96ff66}.pull-left[_ngcontent-%COMP%]{right:70px}.filter-node-container[_ngcontent-%COMP%]{position:relative;display:inline-block;vertical-align:top}.filter-node-container[_ngcontent-%COMP%]:hover > .node-action-btns[_ngcontent-%COMP%]{visibility:visible}.has-error[_ngcontent-%COMP%]{background-color:#ff000026}.is-ok[_ngcontent-%COMP%]{background-color:#0000ff0d}.mat-form-field[_ngcontent-%COMP%]{display:inline-block;position:relative;text-align:left}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{text-align:right}.mat-form-field-wrapper[_ngcontent-%COMP%]{position:relative}.mat-form-field-flex[_ngcontent-%COMP%]{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]{white-space:nowrap;flex:none}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]{font:inherit;vertical-align:baseline}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:inherit}.mat-form-field-infix[_ngcontent-%COMP%]{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder[_ngcontent-%COMP%]{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%], .mat-form-field-empty.mat-form-field-placeholder[_ngcontent-%COMP%]{display:block}.mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:none}.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:block;transition:none}.mat-form-field-placeholder[_ngcontent-%COMP%]:not(.mat-form-field-empty){transition:none}.mat-form-field-underline[_ngcontent-%COMP%]{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled[_ngcontent-%COMP%]{background:transparent 0}.mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{height:2px}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%], .mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper[_ngcontent-%COMP%]{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-subscript-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper[_ngcontent-%COMP%]{display:flex}.mat-form-field-hint-spacer[_ngcontent-%COMP%]{flex:1 0 1em}.mat-error[_ngcontent-%COMP%]{display:block}.mat-input-element[_ngcontent-%COMP%]{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}.mat-input-element[_ngcontent-%COMP%]::placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-moz-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-webkit-input-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element[_ngcontent-%COMP%]{resize:vertical;overflow:auto}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LambdaFilterNodeComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-lambda-filter-node', template: "{{node?.title}}\r\n<ng-container>\r\n\t<dscribe-filter-node *ngFor=\"let child of node?.children\" [node]=\"child\"></dscribe-filter-node>\r\n</ng-container>\r\n", styles: [".filter-option{margin:0 2px;width:100px;display:inline-block}.filter-option option[invalid],.noOptionSelected{color:gray}.node-action-btns{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns mat-icon{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns mat-icon:hover{background-color:#ff96ff66}.pull-left{right:70px}.filter-node-container{position:relative;display:inline-block;vertical-align:top}.filter-node-container:hover>.node-action-btns{visibility:visible}.has-error{background-color:#ff000026}.is-ok{background-color:#0000ff0d}.mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl] .mat-form-field-placeholder{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-placeholder,.mat-form-field-empty.mat-form-field-placeholder{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:block;transition:none}.mat-form-field-placeholder:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled{background:transparent 0}.mat-form-field-underline .mat-form-field-ripple{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused .mat-form-field-underline .mat-form-field-ripple{height:2px}.mat-focused .mat-form-field-underline .mat-form-field-ripple,.mat-form-field-invalid .mat-form-field-underline .mat-form-field-ripple{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper .mat-icon,.mat-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::placeholder{color:transparent!important}.mat-input-element::-moz-placeholder{color:transparent!important}.mat-input-element::-webkit-input-placeholder{color:transparent!important}.mat-input-element:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element{resize:vertical;overflow:auto}\n"] }]
    }], () => [], { node: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LambdaFilterNodeComponent, { className: "LambdaFilterNodeComponent", filePath: "lib/filtering/components/lambda-filter-node/lambda-filter-node.component.ts", lineNumber: 10 }); })();

function LogicalFilterNodeComponent_div_8_select_1_option_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const o_r3 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", o_r3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(o_r3.title);
} }
function LogicalFilterNodeComponent_div_8_select_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "select", 9);
    i0.ɵɵtwoWayListener("ngModelChange", function LogicalFilterNodeComponent_div_8_select_1_Template_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.node.operator, $event) || (ctx_r1.node.operator = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(1, "option", 10);
    i0.ɵɵtext(2, "Logical Operator");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, LogicalFilterNodeComponent_div_8_select_1_option_3_Template, 2, 2, "option", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.node.operator);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.node.operators);
} }
function LogicalFilterNodeComponent_div_8_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r4 = i0.ɵɵnextContext().index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i_r4 > 1 ? ctx_r1.node == null ? null : ctx_r1.node.operator == null ? null : ctx_r1.node.operator.title : "", " ");
} }
function LogicalFilterNodeComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, LogicalFilterNodeComponent_div_8_select_1_Template, 4, 2, "select", 6)(2, LogicalFilterNodeComponent_div_8_span_2_Template, 2, 1, "span", 7);
    i0.ɵɵelement(3, "dscribe-filter-node", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r5 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i_r4 == 1 || ctx_r1.node.children.length == 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i_r4 != (ctx_r1.node == null ? null : ctx_r1.node.operator == null ? null : ctx_r1.node.operator.minNumberOfOperands) - 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("node", child_r5);
} }
class LogicalFilterNodeComponent {
    constructor(manipulator) {
        this.manipulator = manipulator;
    }
    static { this.ɵfac = function LogicalFilterNodeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LogicalFilterNodeComponent)(i0.ɵɵdirectiveInject(FilterTreeManipulator)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LogicalFilterNodeComponent, selectors: [["dscribe-logical-filter-node"]], inputs: { node: "node" }, standalone: false, decls: 9, vars: 1, consts: [[1, "filter-node-container"], [1, "node-action-btns"], ["title", "combine logically with another condition", 3, "click"], ["title", "add child", 3, "click"], ["title", "remove", 3, "click"], [4, "ngFor", "ngForOf"], ["class", "filter-option", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "filter-option", 4, "ngIf"], [3, "node"], [1, "filter-option", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", "", "selected", ""], [3, "ngValue", 4, "ngFor", "ngForOf"], [3, "ngValue"], [1, "filter-option"]], template: function LogicalFilterNodeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "mat-icon", 2);
            i0.ɵɵlistener("click", function LogicalFilterNodeComponent_Template_mat_icon_click_2_listener() { return ctx.manipulator.addSibling(ctx.node); });
            i0.ɵɵtext(3, "fast_forward ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "mat-icon", 3);
            i0.ɵɵlistener("click", function LogicalFilterNodeComponent_Template_mat_icon_click_4_listener() { return ctx.node.addChild(); });
            i0.ɵɵtext(5, "add");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "mat-icon", 4);
            i0.ɵɵlistener("click", function LogicalFilterNodeComponent_Template_mat_icon_click_6_listener() { return ctx.manipulator.delete(ctx.node); });
            i0.ɵɵtext(7, "delete");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(8, LogicalFilterNodeComponent_div_8_Template, 4, 3, "div", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngForOf", ctx.node.children);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.NgSelectOption, i5$1.ɵNgSelectMultipleOption, i5$1.SelectControlValueAccessor, i5$1.NgControlStatus, i5$1.NgModel, i6.MatIcon, FilterNodeComponent], styles: [".filter-option[_ngcontent-%COMP%]{margin:0 2px;width:100px;display:inline-block}.filter-option[_ngcontent-%COMP%]   option[invalid][_ngcontent-%COMP%], .noOptionSelected[_ngcontent-%COMP%]{color:gray}.node-action-btns[_ngcontent-%COMP%]{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:hover{background-color:#ff96ff66}.pull-left[_ngcontent-%COMP%]{right:70px}.filter-node-container[_ngcontent-%COMP%]{position:relative;display:inline-block;vertical-align:top}.filter-node-container[_ngcontent-%COMP%]:hover > .node-action-btns[_ngcontent-%COMP%]{visibility:visible}.has-error[_ngcontent-%COMP%]{background-color:#ff000026}.is-ok[_ngcontent-%COMP%]{background-color:#0000ff0d}.mat-form-field[_ngcontent-%COMP%]{display:inline-block;position:relative;text-align:left}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{text-align:right}.mat-form-field-wrapper[_ngcontent-%COMP%]{position:relative}.mat-form-field-flex[_ngcontent-%COMP%]{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]{white-space:nowrap;flex:none}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]{font:inherit;vertical-align:baseline}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:inherit}.mat-form-field-infix[_ngcontent-%COMP%]{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder[_ngcontent-%COMP%]{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%], .mat-form-field-empty.mat-form-field-placeholder[_ngcontent-%COMP%]{display:block}.mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:none}.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:block;transition:none}.mat-form-field-placeholder[_ngcontent-%COMP%]:not(.mat-form-field-empty){transition:none}.mat-form-field-underline[_ngcontent-%COMP%]{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled[_ngcontent-%COMP%]{background:transparent 0}.mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{height:2px}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%], .mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper[_ngcontent-%COMP%]{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-subscript-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper[_ngcontent-%COMP%]{display:flex}.mat-form-field-hint-spacer[_ngcontent-%COMP%]{flex:1 0 1em}.mat-error[_ngcontent-%COMP%]{display:block}.mat-input-element[_ngcontent-%COMP%]{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}.mat-input-element[_ngcontent-%COMP%]::placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-moz-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-webkit-input-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element[_ngcontent-%COMP%]{resize:vertical;overflow:auto}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LogicalFilterNodeComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-logical-filter-node', template: "<div class=\"filter-node-container\">\r\n\t<div class=\"node-action-btns\">\r\n\t\t<mat-icon (click)=\"manipulator.addSibling(node)\"\r\n\t\t\t\t\t\t\ttitle=\"combine logically with another condition\">fast_forward\r\n\t\t</mat-icon>\r\n\t\t<mat-icon (click)=\"node.addChild()\" title=\"add child\">add</mat-icon>\r\n\t\t<mat-icon (click)=\"manipulator.delete(node)\" title=\"remove\">delete</mat-icon>\r\n\t</div>\r\n\t<div *ngFor=\"let child of node.children; let i = index\">\r\n\t\t<select class=\"filter-option\" [(ngModel)]=\"node.operator\" *ngIf=\"i == 1 || node.children.length == 1\">\r\n\t\t\t<option value=\"\" disabled selected>Logical Operator</option>\r\n\t\t\t<option *ngFor=\"let o of node.operators\" [ngValue]=\"o\">{{o.title}}</option>\r\n\t\t</select>\r\n\t\t<span *ngIf=\"i != node?.operator?.minNumberOfOperands - 1\" class=\"filter-option\">\r\n\t\t{{i > 1 ? node?.operator?.title : ''}}\r\n\t</span>\r\n\t\t<dscribe-filter-node [node]=\"child\"></dscribe-filter-node>\r\n\t</div>\r\n</div>\r\n", styles: [".filter-option{margin:0 2px;width:100px;display:inline-block}.filter-option option[invalid],.noOptionSelected{color:gray}.node-action-btns{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns mat-icon{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns mat-icon:hover{background-color:#ff96ff66}.pull-left{right:70px}.filter-node-container{position:relative;display:inline-block;vertical-align:top}.filter-node-container:hover>.node-action-btns{visibility:visible}.has-error{background-color:#ff000026}.is-ok{background-color:#0000ff0d}.mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl] .mat-form-field-placeholder{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-placeholder,.mat-form-field-empty.mat-form-field-placeholder{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:block;transition:none}.mat-form-field-placeholder:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled{background:transparent 0}.mat-form-field-underline .mat-form-field-ripple{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused .mat-form-field-underline .mat-form-field-ripple{height:2px}.mat-focused .mat-form-field-underline .mat-form-field-ripple,.mat-form-field-invalid .mat-form-field-underline .mat-form-field-ripple{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper .mat-icon,.mat-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::placeholder{color:transparent!important}.mat-input-element::-moz-placeholder{color:transparent!important}.mat-input-element::-webkit-input-placeholder{color:transparent!important}.mat-input-element:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element{resize:vertical;overflow:auto}\n"] }]
    }], () => [{ type: FilterTreeManipulator }], { node: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LogicalFilterNodeComponent, { className: "LogicalFilterNodeComponent", filePath: "lib/filtering/components/logical-filter-node/logical-filter-node.component.ts", lineNumber: 11 }); })();

function NavigationListFilterNodeComponent_option_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const o_r1 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", o_r1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(o_r1.title);
} }
function NavigationListFilterNodeComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "dscribe-filter-node", 6);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("node", ctx_r1.node.aggregationSelection);
} }
function NavigationListFilterNodeComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "br")(2, "dscribe-filter-node", 6);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("node", ctx_r1.node.filterSubNode);
} }
class NavigationListFilterNodeComponent {
    constructor() {
    }
    ngOnInit() {
    }
    static { this.ɵfac = function NavigationListFilterNodeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NavigationListFilterNodeComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NavigationListFilterNodeComponent, selectors: [["dscribe-navigation-list-filter-node"]], inputs: { node: "node" }, standalone: false, decls: 7, vars: 7, consts: [[2, "border", "1px solid navy"], [1, "filter-option", 3, "ngModelChange", "ngModel"], ["disabled", "", "invalid", "", 3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "ngValue"], [3, "node"]], template: function NavigationListFilterNodeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "select", 1);
            i0.ɵɵtwoWayListener("ngModelChange", function NavigationListFilterNodeComponent_Template_select_ngModelChange_1_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.node.operator, $event) || (ctx.node.operator = $event); return $event; });
            i0.ɵɵelementStart(2, "option", 2);
            i0.ɵɵtext(3, "Operator");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(4, NavigationListFilterNodeComponent_option_4_Template, 2, 2, "option", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, NavigationListFilterNodeComponent_ng_container_5_Template, 2, 1, "ng-container", 4)(6, NavigationListFilterNodeComponent_ng_container_6_Template, 3, 1, "ng-container", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵclassProp("noOptionSelected", !ctx.node.operator);
            i0.ɵɵtwoWayProperty("ngModel", ctx.node.operator);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngValue", undefined);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.node.operators);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.node.hasAggregationSelection);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.node.hasFiltering);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.NgSelectOption, i5$1.ɵNgSelectMultipleOption, i5$1.SelectControlValueAccessor, i5$1.NgControlStatus, i5$1.NgModel, FilterNodeComponent], styles: [".filter-option[_ngcontent-%COMP%]{margin:0 2px;width:100px;display:inline-block}.filter-option[_ngcontent-%COMP%]   option[invalid][_ngcontent-%COMP%], .noOptionSelected[_ngcontent-%COMP%]{color:gray}.node-action-btns[_ngcontent-%COMP%]{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:hover{background-color:#ff96ff66}.pull-left[_ngcontent-%COMP%]{right:70px}.filter-node-container[_ngcontent-%COMP%]{position:relative;display:inline-block;vertical-align:top}.filter-node-container[_ngcontent-%COMP%]:hover > .node-action-btns[_ngcontent-%COMP%]{visibility:visible}.has-error[_ngcontent-%COMP%]{background-color:#ff000026}.is-ok[_ngcontent-%COMP%]{background-color:#0000ff0d}.mat-form-field[_ngcontent-%COMP%]{display:inline-block;position:relative;text-align:left}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{text-align:right}.mat-form-field-wrapper[_ngcontent-%COMP%]{position:relative}.mat-form-field-flex[_ngcontent-%COMP%]{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]{white-space:nowrap;flex:none}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]{font:inherit;vertical-align:baseline}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:inherit}.mat-form-field-infix[_ngcontent-%COMP%]{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder[_ngcontent-%COMP%]{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%], .mat-form-field-empty.mat-form-field-placeholder[_ngcontent-%COMP%]{display:block}.mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:none}.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:block;transition:none}.mat-form-field-placeholder[_ngcontent-%COMP%]:not(.mat-form-field-empty){transition:none}.mat-form-field-underline[_ngcontent-%COMP%]{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled[_ngcontent-%COMP%]{background:transparent 0}.mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{height:2px}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%], .mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper[_ngcontent-%COMP%]{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-subscript-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper[_ngcontent-%COMP%]{display:flex}.mat-form-field-hint-spacer[_ngcontent-%COMP%]{flex:1 0 1em}.mat-error[_ngcontent-%COMP%]{display:block}.mat-input-element[_ngcontent-%COMP%]{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}.mat-input-element[_ngcontent-%COMP%]::placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-moz-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-webkit-input-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element[_ngcontent-%COMP%]{resize:vertical;overflow:auto}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NavigationListFilterNodeComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-navigation-list-filter-node', template: "<div style=\"border: 1px solid navy;\">\r\n\t<select class=\"filter-option\" [class.noOptionSelected]=\"!node.operator\" [(ngModel)]=\"node.operator\">\r\n\t\t<option [ngValue]=\"undefined\" disabled invalid>Operator</option>\r\n\t\t<option *ngFor=\"let o of node.operators\" [ngValue]=\"o\">{{o.title}}</option>\r\n\t</select>\r\n\t<ng-container *ngIf=\"node.hasAggregationSelection\">\r\n\t\t<dscribe-filter-node [node]=\"node.aggregationSelection\"></dscribe-filter-node>\r\n\t</ng-container>\r\n\t<ng-container *ngIf=\"node.hasFiltering\">\r\n\t\t<br>\r\n\t\t<dscribe-filter-node [node]=\"node.filterSubNode\"></dscribe-filter-node>\r\n\t</ng-container>\r\n</div>\r\n", styles: [".filter-option{margin:0 2px;width:100px;display:inline-block}.filter-option option[invalid],.noOptionSelected{color:gray}.node-action-btns{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns mat-icon{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns mat-icon:hover{background-color:#ff96ff66}.pull-left{right:70px}.filter-node-container{position:relative;display:inline-block;vertical-align:top}.filter-node-container:hover>.node-action-btns{visibility:visible}.has-error{background-color:#ff000026}.is-ok{background-color:#0000ff0d}.mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl] .mat-form-field-placeholder{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-placeholder,.mat-form-field-empty.mat-form-field-placeholder{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:block;transition:none}.mat-form-field-placeholder:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled{background:transparent 0}.mat-form-field-underline .mat-form-field-ripple{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused .mat-form-field-underline .mat-form-field-ripple{height:2px}.mat-focused .mat-form-field-underline .mat-form-field-ripple,.mat-form-field-invalid .mat-form-field-underline .mat-form-field-ripple{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper .mat-icon,.mat-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::placeholder{color:transparent!important}.mat-input-element::-moz-placeholder{color:transparent!important}.mat-input-element::-webkit-input-placeholder{color:transparent!important}.mat-input-element:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element{resize:vertical;overflow:auto}\n"] }]
    }], () => [], { node: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NavigationListFilterNodeComponent, { className: "NavigationListFilterNodeComponent", filePath: "lib/filtering/components/navigation-list-filter-node/navigation-list-filter-node.component.ts", lineNumber: 10 }); })();

function PropertyFilterNodeComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "mat-icon", 7);
    i0.ɵɵlistener("click", function PropertyFilterNodeComponent_div_1_Template_mat_icon_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.manipulator.addSibling(ctx_r1.node)); });
    i0.ɵɵtext(2, "fast_forward");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-icon", 8);
    i0.ɵɵlistener("click", function PropertyFilterNodeComponent_div_1_Template_mat_icon_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.manipulator.delete(ctx_r1.node)); });
    i0.ɵɵtext(4, "delete");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "mat-icon", 9);
    i0.ɵɵlistener("click", function PropertyFilterNodeComponent_div_1_Template_mat_icon_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.manipulator.toggleType(ctx_r1.node)); });
    i0.ɵɵtext(6, "refresh");
    i0.ɵɵelementEnd()();
} }
function PropertyFilterNodeComponent_option_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r3 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", p_r3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate((p_r3 == null ? null : p_r3.Title) || (p_r3 == null ? null : p_r3.Name));
} }
function PropertyFilterNodeComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "dscribe-filter-node", 11);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("node", ctx_r1.node.child);
} }
class PropertyFilterNodeComponent {
    constructor(manipulator) {
        this.manipulator = manipulator;
        this.nodeTypes = FilterNodeType;
    }
    ngOnInit() {
    }
    static { this.ɵfac = function PropertyFilterNodeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PropertyFilterNodeComponent)(i0.ɵɵdirectiveInject(FilterTreeManipulator)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PropertyFilterNodeComponent, selectors: [["dscribe-property-filter-node"]], inputs: { node: "node" }, standalone: false, decls: 7, vars: 8, consts: [[1, "filter-node-container"], ["class", "node-action-btns", 4, "ngIf"], ["placeholder", "Property", 1, "filter-option", 3, "ngModelChange", "ngModel"], ["selected", "", "invalid", "", 3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "node-action-btns"], ["title", "move under calculation", 3, "click"], ["title", "remove", 3, "click"], ["title", "convert to constant", 3, "click"], [3, "ngValue"], [3, "node"]], template: function PropertyFilterNodeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, PropertyFilterNodeComponent_div_1_Template, 7, 0, "div", 1);
            i0.ɵɵelementStart(2, "select", 2);
            i0.ɵɵtwoWayListener("ngModelChange", function PropertyFilterNodeComponent_Template_select_ngModelChange_2_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.node.property, $event) || (ctx.node.property = $event); return $event; });
            i0.ɵɵelementStart(3, "option", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, PropertyFilterNodeComponent_option_5_Template, 2, 2, "option", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, PropertyFilterNodeComponent_ng_container_6_Template, 2, 1, "ng-container", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", (ctx.node == null ? null : ctx.node.parent == null ? null : ctx.node.parent.nodeType) !== ctx.nodeTypes.Property);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("noOptionSelected", !ctx.node.property);
            i0.ɵɵtwoWayProperty("ngModel", ctx.node.property);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngValue", undefined);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("properties of ", ctx.node.inputType.EntityType.SingularTitle, " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.node.properties);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.node.child);
        } }, dependencies: [i1$3.NgForOf, i1$3.NgIf, i5$1.NgSelectOption, i5$1.ɵNgSelectMultipleOption, i5$1.SelectControlValueAccessor, i5$1.NgControlStatus, i5$1.NgModel, i6.MatIcon, FilterNodeComponent], styles: [".filter-option[_ngcontent-%COMP%]{margin:0 2px;width:100px;display:inline-block}.filter-option[_ngcontent-%COMP%]   option[invalid][_ngcontent-%COMP%], .noOptionSelected[_ngcontent-%COMP%]{color:gray}.node-action-btns[_ngcontent-%COMP%]{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:hover{background-color:#ff96ff66}.pull-left[_ngcontent-%COMP%]{right:70px}.filter-node-container[_ngcontent-%COMP%]{position:relative;display:inline-block;vertical-align:top}.filter-node-container[_ngcontent-%COMP%]:hover > .node-action-btns[_ngcontent-%COMP%]{visibility:visible}.has-error[_ngcontent-%COMP%]{background-color:#ff000026}.is-ok[_ngcontent-%COMP%]{background-color:#0000ff0d}.mat-form-field[_ngcontent-%COMP%]{display:inline-block;position:relative;text-align:left}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{text-align:right}.mat-form-field-wrapper[_ngcontent-%COMP%]{position:relative}.mat-form-field-flex[_ngcontent-%COMP%]{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]{white-space:nowrap;flex:none}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]{font:inherit;vertical-align:baseline}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:inherit}.mat-form-field-infix[_ngcontent-%COMP%]{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder[_ngcontent-%COMP%]{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl][_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%], .mat-form-field-empty.mat-form-field-placeholder[_ngcontent-%COMP%]{display:block}.mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:none}.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-form-field-placeholder[_ngcontent-%COMP%]{display:block;transition:none}.mat-form-field-placeholder[_ngcontent-%COMP%]:not(.mat-form-field-empty){transition:none}.mat-form-field-underline[_ngcontent-%COMP%]{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled[_ngcontent-%COMP%]{background:transparent 0}.mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{height:2px}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%], .mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper[_ngcontent-%COMP%]{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-subscript-wrapper[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper[_ngcontent-%COMP%]{display:flex}.mat-form-field-hint-spacer[_ngcontent-%COMP%]{flex:1 0 1em}.mat-error[_ngcontent-%COMP%]{display:block}.mat-input-element[_ngcontent-%COMP%]{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}.mat-input-element[_ngcontent-%COMP%]::placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-moz-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]::-webkit-input-placeholder{color:transparent!important}.mat-input-element[_ngcontent-%COMP%]:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element[_ngcontent-%COMP%]{resize:vertical;overflow:auto}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PropertyFilterNodeComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-property-filter-node', template: "<div class=\"filter-node-container\">\r\n\t<div class=\"node-action-btns\" *ngIf=\"node?.parent?.nodeType !== nodeTypes.Property\">\r\n\t\t<mat-icon (click)=\"manipulator.addSibling(node)\" title=\"move under calculation\">fast_forward</mat-icon>\r\n\t\t<mat-icon (click)=\"manipulator.delete(node)\" title=\"remove\">delete</mat-icon>\r\n\t\t<mat-icon (click)=\"manipulator.toggleType(node)\" title=\"convert to constant\">refresh</mat-icon>\r\n\t</div>\r\n\t<select class=\"filter-option\" [class.noOptionSelected]=\"!node.property\" [(ngModel)]=\"node.property\"\r\n\t\t\t\t\tplaceholder=\"Property\">\r\n\t\t<option [ngValue]=\"undefined\" selected invalid>properties of {{node.inputType.EntityType.SingularTitle}}\r\n\t\t</option>\r\n\t\t<option *ngFor=\"let p of node.properties\" [ngValue]=\"p\">{{p?.Title || p?.Name}}</option>\r\n\t</select>\r\n\t<ng-container *ngIf=\"node.child\">\r\n\t\t<dscribe-filter-node [node]=\"node.child\"></dscribe-filter-node>\r\n\t</ng-container>\r\n</div>\r\n", styles: [".filter-option{margin:0 2px;width:100px;display:inline-block}.filter-option option[invalid],.noOptionSelected{color:gray}.node-action-btns{position:absolute;top:0;right:16px;visibility:collapse;height:10px;font-size:10px;z-index:10;background-color:#ffff9666}.node-action-btns mat-icon{vertical-align:top;width:10px;height:10px;font-size:inherit;background:none;padding:0;margin:0;border:none;color:purple;cursor:default}.node-action-btns mat-icon:hover{background-color:#ff96ff66}.pull-left{right:70px}.filter-node-container{position:relative;display:inline-block;vertical-align:top}.filter-node-container:hover>.node-action-btns{visibility:visible}.has-error{background-color:#ff000026}.is-ok{background-color:#0000ff0d}.mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0}.mat-form-field-placeholder-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}.mat-form-field-placeholder{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}[dir=rtl] .mat-form-field-placeholder{transform-origin:100% 0;left:auto;right:0}.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-placeholder,.mat-form-field-empty.mat-form-field-placeholder{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-placeholder-wrapper .mat-form-field-placeholder{display:block;transition:none}.mat-form-field-placeholder:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;height:1px;width:100%}.mat-form-field-underline.mat-disabled{background:transparent 0}.mat-form-field-underline .mat-form-field-ripple{position:absolute;height:1px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused .mat-form-field-underline .mat-form-field-ripple{height:2px}.mat-focused .mat-form-field-underline .mat-form-field-ripple,.mat-form-field-invalid .mat-form-field-underline .mat-form-field-ripple{visibility:visible;transform:scaleX(1);transition:transform .15s linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-form-field-subscript-wrapper{position:absolute;width:100%;overflow:hidden}.mat-form-field-placeholder-wrapper .mat-icon,.mat-form-field-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::placeholder{color:transparent!important}.mat-input-element::-moz-placeholder{color:transparent!important}.mat-input-element::-webkit-input-placeholder{color:transparent!important}.mat-input-element:-ms-input-placeholder{color:transparent!important}textarea.mat-input-element{resize:vertical;overflow:auto}\n"] }]
    }], () => [{ type: FilterTreeManipulator }], { node: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PropertyFilterNodeComponent, { className: "PropertyFilterNodeComponent", filePath: "lib/filtering/components/property-filter-node/property-filter-node.component.ts", lineNumber: 12 }); })();

function ListContainerComponent_a_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entityType_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", i0.ɵɵinterpolate2("", ctx_r2.clientRoot, "entity/", entityType_r2.Name));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", entityType_r2.PluralTitle || entityType_r2.Name, " ");
} }
class ListContainerComponent {
    constructor(metadata, route, router, config) {
        this.metadata = metadata;
        this.route = route;
        this.router = router;
        this.config = config;
        this.navFixed = true;
        this.navOpened = true;
        this.clientRoot = config.getClientRoot();
    }
    ngOnInit() {
        this.metadata.entityTypes$.subscribe(entityTypes => {
            this.entityTypes = entityTypes.sort(function (a, b) {
                const n = a.PluralTitle || a.SingularTitle || a.Name;
                const m = b.PluralTitle || b.SingularTitle || b.Name;
                if (n < m) {
                    return -1;
                }
                if (n > m) {
                    return 1;
                }
                return 0;
            });
        });
        this.route.params.pipe(flatMap(params => {
            this.entityTypeName = params['entityTypeName'];
            return this.getCurrentEntityType();
        })).subscribe(type => {
            if (!type) {
                this.router.navigate([this.entityTypeName], { relativeTo: this.route });
                return;
            }
            this.entityType = type;
        }, err => console.log(err));
    }
    getCurrentEntityType() {
        const firstEntityType$ = this.metadata.entityTypes$.pipe(map(allEntityTypes => {
            this.entityTypeName = allEntityTypes[0].Name;
            return null;
        }));
        if (!this.entityTypeName) {
            return firstEntityType$;
        }
        return this.metadata.getEntityTypeByName(this.entityTypeName).pipe(flatMap(entityType => {
            if (entityType) {
                return of(entityType);
            }
            return firstEntityType$;
        }));
    }
    static { this.ɵfac = function ListContainerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListContainerComponent)(i0.ɵɵdirectiveInject(MetadataService), i0.ɵɵdirectiveInject(i2$1.ActivatedRoute), i0.ɵɵdirectiveInject(i2$1.Router), i0.ɵɵdirectiveInject(DscribeService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListContainerComponent, selectors: [["dscribe-list-container"]], standalone: false, decls: 15, vars: 6, consts: [["drawer", ""], [3, "openedChange", "mode", "opened"], [2, "flex-grow", "1"], ["mat-icon-button", "", 3, "click"], ["mat-list-item", "", "routerLinkActive", "active", 3, "routerLink", 4, "ngFor", "ngForOf"], [3, "navToggled", "entityType", "hasNav"], ["mat-list-item", "", "routerLinkActive", "active", 3, "routerLink"]], template: function ListContainerComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "mat-drawer-container")(1, "mat-drawer", 1, 0);
            i0.ɵɵtwoWayListener("openedChange", function ListContainerComponent_Template_mat_drawer_openedChange_1_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.navOpened, $event) || (ctx.navOpened = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementStart(3, "mat-toolbar")(4, "span");
            i0.ɵɵtext(5, "Entities");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 2);
            i0.ɵɵtext(7, "\u00A0");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "button", 3);
            i0.ɵɵlistener("click", function ListContainerComponent_Template_button_click_8_listener() { return ctx.navFixed = !ctx.navFixed; });
            i0.ɵɵelementStart(9, "mat-icon");
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "mat-list");
            i0.ɵɵtemplate(12, ListContainerComponent_a_12_Template, 2, 4, "a", 4);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "mat-drawer-content")(14, "dscribe-list", 5);
            i0.ɵɵlistener("navToggled", function ListContainerComponent_Template_dscribe_list_navToggled_14_listener() { i0.ɵɵrestoreView(_r1); const drawer_r4 = i0.ɵɵreference(2); return i0.ɵɵresetView(drawer_r4.toggle()); });
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("mode", ctx.navFixed ? "side" : "over");
            i0.ɵɵtwoWayProperty("opened", ctx.navOpened);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.navFixed ? "lock" : "lock_open");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.entityTypes);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("entityType", ctx.entityType)("hasNav", true);
        } }, dependencies: [i1$3.NgForOf, i2$1.RouterLink, i2$1.RouterLinkActive, i5.MatIconButton, i6.MatIcon, i7$2.MatList, i7$2.MatListItem, i8$2.MatDrawer, i8$2.MatDrawerContainer, i8$2.MatDrawerContent, i9$4.MatToolbar, ListComponent], styles: ["a[_ngcontent-%COMP%]{box-sizing:border-box;height:36px;line-height:2.2em;display:block;text-decoration:none;padding:0 32px;margin:8px 0 8px 4px;font-size:16px;color:#ffffffb3;white-space:nowrap}mat-drawer-container[_ngcontent-%COMP%]{max-width:100%}mat-drawer-content[_ngcontent-%COMP%]{max-width:100%}dscribe-list[_ngcontent-%COMP%]{max-width:100%}a[_ngcontent-%COMP%]:hover{background-color:#ffffff14}a.active[_ngcontent-%COMP%]{color:#4fc3f7!important;border-left:#3F51B5 solid 4px;margin-left:0}a.open[_ngcontent-%COMP%]{width:240px;min-width:240px;position:fixed;bottom:0;top:51px}a.close[_ngcontent-%COMP%]{width:0}.mat-list-item[_ngcontent-%COMP%]{margin:0;height:30px!important}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListContainerComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-list-container', template: "<mat-drawer-container>\r\n\t<mat-drawer #drawer [mode]=\"navFixed?'side':'over'\" [(opened)]=\"navOpened\">\r\n\t\t<mat-toolbar>\r\n\t\t\t<span>Entities</span>\r\n\t\t\t<span style=\"flex-grow: 1\">&nbsp;</span>\r\n\t\t\t<button mat-icon-button (click)=\"navFixed = !navFixed\">\r\n\t\t\t\t<mat-icon>{{navFixed ? 'lock' : 'lock_open'}}</mat-icon>\r\n\t\t\t</button>\r\n\t\t</mat-toolbar>\r\n\t\t<mat-list>\r\n\t\t\t<a mat-list-item *ngFor=\"let entityType of entityTypes\" routerLink=\"{{clientRoot}}entity/{{entityType.Name}}\"\r\n\t\t\t\t routerLinkActive=\"active\">\r\n\t\t\t\t{{entityType.PluralTitle || entityType.Name}}\r\n\t\t\t</a>\r\n\t\t</mat-list>\r\n\t</mat-drawer>\r\n\t<mat-drawer-content>\r\n\t\t<dscribe-list [entityType]=\"entityType\" [hasNav]=\"true\" (navToggled)=\"drawer.toggle()\"></dscribe-list>\r\n\t</mat-drawer-content>\r\n</mat-drawer-container>\r\n", styles: ["a{box-sizing:border-box;height:36px;line-height:2.2em;display:block;text-decoration:none;padding:0 32px;margin:8px 0 8px 4px;font-size:16px;color:#ffffffb3;white-space:nowrap}mat-drawer-container{max-width:100%}mat-drawer-content{max-width:100%}dscribe-list{max-width:100%}a:hover{background-color:#ffffff14}a.active{color:#4fc3f7!important;border-left:#3F51B5 solid 4px;margin-left:0}a.open{width:240px;min-width:240px;position:fixed;bottom:0;top:51px}a.close{width:0}.mat-list-item{margin:0;height:30px!important}\n"] }]
    }], () => [{ type: MetadataService }, { type: i2$1.ActivatedRoute }, { type: i2$1.Router }, { type: DscribeService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListContainerComponent, { className: "ListContainerComponent", filePath: "lib/list/list-container/list-container.component.ts", lineNumber: 15 }); })();

function NavigationComponent_button_21_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵlistener("click", function NavigationComponent_button_21_Template_button_click_0_listener() { const appInstance_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.appInstanceSelected(appInstance_r2)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const appInstance_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", appInstance_r2.Title, " ");
} }
class NavigationComponent {
    constructor(router, httpClient, config) {
        this.router = router;
        this.httpClient = httpClient;
        this.config = config;
        this.appInstances = [];
        this.clientRoot = config.getClientRoot();
    }
    ngOnInit() {
        this.httpClient.post(this.config.url('api/AppManagement/GetAppInstancesInfoForHome'), null)
            .subscribe(apps => {
            this.appInstances = apps;
            this.appInstanceSelected(apps[0]);
        });
    }
    appInstanceSelected(appInstance) {
        this.config.appInstance = appInstance;
        this.selectedAppInstance = appInstance;
    }
    static { this.ɵfac = function NavigationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NavigationComponent)(i0.ɵɵdirectiveInject(i2$1.Router), i0.ɵɵdirectiveInject(DscribeHttpClient), i0.ɵɵdirectiveInject(DscribeService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NavigationComponent, selectors: [["dscribe-navigation"]], standalone: false, decls: 33, vars: 13, consts: [["menu", "matMenu"], ["identityMenu", "matMenu"], [1, "dscribe-main-navbar", "mat-elevation-z6"], [1, "main-nav"], [1, "main-nav-tabs-container"], ["mat-button", "", "routerLinkActive", "active", 1, "main-nav-tab", 3, "routerLink"], ["mat-button", "", "routerLinkActive", "active", 3, "routerLink"], ["mat-button", "", 3, "matMenuTriggerFor"], ["mat-icon-button", "", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "click", 4, "ngFor", "ngForOf"], ["mat-menu-item", ""], ["mat-menu-item", "", 3, "click"], [1, "container"]], template: function NavigationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "nav", 2)(1, "mat-toolbar", 3)(2, "div", 4)(3, "a", 5);
            i0.ɵɵtext(4, " Entity Types ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "a", 5);
            i0.ɵɵtext(6, " Administration ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "a", 5);
            i0.ɵɵtext(8, " Security ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "a", 6)(10, "mat-icon");
            i0.ɵɵtext(11, "settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "button", 7);
            i0.ɵɵtext(13);
            i0.ɵɵelementStart(14, "mat-icon");
            i0.ɵɵtext(15, "keyboard_arrow_down");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "button", 8)(17, "mat-icon");
            i0.ɵɵtext(18, "account_circle");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(19, "mat-menu", null, 0);
            i0.ɵɵtemplate(21, NavigationComponent_button_21_Template, 2, 1, "button", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "mat-menu", null, 1)(24, "span", 10);
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "button", 11);
            i0.ɵɵlistener("click", function NavigationComponent_Template_button_click_26_listener() { return ctx.config.logout(); });
            i0.ɵɵtext(27, " Logout ");
            i0.ɵɵelementStart(28, "mat-icon");
            i0.ɵɵtext(29, "logout");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(30, "div", 12)(31, "main");
            i0.ɵɵelement(32, "router-outlet");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            const menu_r4 = i0.ɵɵreference(20);
            const identityMenu_r5 = i0.ɵɵreference(23);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("routerLink", i0.ɵɵinterpolate1("", ctx.clientRoot, "entity"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("routerLink", i0.ɵɵinterpolate1("", ctx.clientRoot, "administration"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("routerLink", i0.ɵɵinterpolate1("", ctx.clientRoot, "security"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("routerLink", i0.ɵɵinterpolate1("", ctx.clientRoot, "setting"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("matMenuTriggerFor", menu_r4);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.selectedAppInstance && ctx.selectedAppInstance.Title, " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("matMenuTriggerFor", identityMenu_r5);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngForOf", ctx.appInstances);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", ctx.config.username, " ");
        } }, dependencies: [i1$3.NgForOf, i2$1.RouterOutlet, i2$1.RouterLink, i2$1.RouterLinkActive, i5.MatButton, i5.MatIconButton, i6.MatIcon, i7$3.MatMenu, i7$3.MatMenuItem, i7$3.MatMenuTrigger, i9$4.MatToolbar], styles: [".container[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:row}main[_ngcontent-%COMP%]{max-width:100%}.container[_ngcontent-%COMP%]   main[_ngcontent-%COMP%]{flex-grow:1;background-color:#eceff1}.dscribe-main-navbar[_ngcontent-%COMP%]{background-color:#039be5;color:#fff}.main-nav[_ngcontent-%COMP%]{background-color:#039be5;padding:8px;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;height:50px!important}.main-nav-tabs-container[_ngcontent-%COMP%]{flex:1}.main-nav-tabs-container[_ngcontent-%COMP%]   .main-nav-tab[_ngcontent-%COMP%]{line-height:48px}.main-nav-tabs-container[_ngcontent-%COMP%]   .main-nav-tab.active[_ngcontent-%COMP%]{border-bottom:1px solid white}.main-nav-header[_ngcontent-%COMP%]{border-bottom:1px solid #d8d8d8}.mat-toolbar[_ngcontent-%COMP%]{color:#fff!important}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NavigationComponent, [{
        type: Component,
        args: [{ standalone: false, selector: 'dscribe-navigation', template: "<nav class=\"dscribe-main-navbar mat-elevation-z6\">\r\n\t<mat-toolbar class=\"main-nav\">\r\n\t\t<div class=\"main-nav-tabs-container\">\r\n\t\t\t<a mat-button class=\"main-nav-tab\" routerLink=\"{{clientRoot}}entity\" routerLinkActive=\"active\">\r\n\t\t\t\tEntity Types\r\n\t\t\t</a>\r\n\t\t\t<a mat-button class=\"main-nav-tab\" routerLink=\"{{clientRoot}}administration\" routerLinkActive=\"active\">\r\n\t\t\t\tAdministration\r\n\t\t\t</a>\r\n\t\t\t<a mat-button class=\"main-nav-tab\" routerLink=\"{{clientRoot}}security\" routerLinkActive=\"active\">\r\n\t\t\t\tSecurity\r\n\t\t\t</a>\r\n\t\t</div>\r\n\t\t<a mat-button routerLink=\"{{clientRoot}}setting\" routerLinkActive=\"active\">\r\n\t\t\t<mat-icon>settings</mat-icon>\r\n\t\t</a>\r\n\t\t<button mat-button [matMenuTriggerFor]=\"menu\">\r\n\t\t\t{{selectedAppInstance && selectedAppInstance.Title}}\r\n\t\t\t<mat-icon>keyboard_arrow_down</mat-icon>\r\n\t\t</button>\r\n\t\t<button mat-icon-button [matMenuTriggerFor]=\"identityMenu\">\r\n\t\t\t<mat-icon>account_circle</mat-icon>\r\n\t\t</button>\r\n\t</mat-toolbar>\r\n</nav>\r\n<mat-menu #menu=\"matMenu\">\r\n\t<button *ngFor=\"let appInstance of appInstances\" mat-menu-item (click)=\"appInstanceSelected(appInstance)\">\r\n\t\t{{appInstance.Title}}\r\n\t</button>\r\n</mat-menu>\r\n\r\n<mat-menu #identityMenu=\"matMenu\">\r\n\t<span mat-menu-item>\r\n\t\t{{config.username}}\r\n\t</span>\r\n\t<button mat-menu-item (click)=\"config.logout()\">\r\n\t\tLogout\r\n\t\t<mat-icon>logout</mat-icon>\r\n\t</button>\r\n</mat-menu>\r\n\r\n<div class=\"container\">\r\n\t<main>\r\n\t\t<router-outlet></router-outlet>\r\n\t</main>\r\n</div>\r\n", styles: [".container{flex:1;display:flex;flex-direction:row}main{max-width:100%}.container main{flex-grow:1;background-color:#eceff1}.dscribe-main-navbar{background-color:#039be5;color:#fff}.main-nav{background-color:#039be5;padding:8px;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;height:50px!important}.main-nav-tabs-container{flex:1}.main-nav-tabs-container .main-nav-tab{line-height:48px}.main-nav-tabs-container .main-nav-tab.active{border-bottom:1px solid white}.main-nav-header{border-bottom:1px solid #d8d8d8}.mat-toolbar{color:#fff!important}\n"] }]
    }], () => [{ type: i2$1.Router }, { type: DscribeHttpClient }, { type: DscribeService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NavigationComponent, { className: "NavigationComponent", filePath: "lib/navigation/navigation.component.ts", lineNumber: 13 }); })();

class UsersAndRolesManagementComponent {
    constructor() { }
    ngOnInit() { }
    static { this.ɵfac = function UsersAndRolesManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UsersAndRolesManagementComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UsersAndRolesManagementComponent, selectors: [["dscribe-users-and-roles-management"]], standalone: false, decls: 0, vars: 0, template: function UsersAndRolesManagementComponent_Template(rf, ctx) { }, encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UsersAndRolesManagementComponent, [{
        type: Component,
        args: [{ standalone: false, selector: "dscribe-users-and-roles-management", template: "<!-- <div class=\"page-content\">\r\n\t<div class=\"table mat-elevation-z4\">\r\n\t\t<div class=\"table-actions\">\r\n\t\t\t<span>\r\n\t\t\t\t<span>Users and Roles</span>\r\n\t\t\t</span>\r\n\t\t\t<div>\r\n\t\t\t\t<button mat-icon-button (click)=\"saveUserRoles()\" color=\"primary\" matTooltip=\"Save User Roles\">\r\n\t\t\t\t\t<mat-icon>save</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"list-container\">\r\n\t\t\t<div class=\"table-loading-shade\" *ngIf=\"isLoadingResults\">\r\n\t\t\t\t<mat-spinner></mat-spinner>\r\n\t\t\t</div>\r\n\r\n\t\t\t<table mat-table [dataSource]=\"users\" matSort>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"userName\">\r\n\t\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>UserName</th>\r\n\t\t\t\t\t<td mat-cell *matCellDef=\"let user\">{{user.UserName}}</td>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"usage\">\r\n\t\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Usage</th>\r\n\t\t\t\t\t<td mat-cell *matCellDef=\"let entityType\">\r\n\t\t\t\t\t\t{{getEntityTypeUsageName(entityType.EntityTypeGeneralUsageCategoryId)}}\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"singular\">\r\n\t\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Singular</th>\r\n\t\t\t\t\t<td mat-cell *matCellDef=\"let entityType\">{{entityType.SingularTitle}}</td>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"plural\">\r\n\t\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Plural</th>\r\n\t\t\t\t\t<td mat-cell *matCellDef=\"let entityType\">{{entityType.PluralTitle}}</td>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"code\">\r\n\t\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Code</th>\r\n\t\t\t\t\t<td mat-cell *matCellDef=\"let entityType\">{{entityType.CodePath}}</td>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<ng-container matColumnDef=\"displayName\">\r\n\t\t\t\t\t<th mat-header-cell *matHeaderCellDef mat-sort-header>Display Name</th>\r\n\t\t\t\t\t<td mat-cell *matCellDef=\"let entityType\">{{entityType.DisplayNamePath}}</td>\r\n\t\t\t\t</ng-container>\r\n\r\n\t\t\t\t<tr mat-header-row *matHeaderRowDef=\"displayedEntityTypeColumns\"></tr>\r\n\t\t\t\t<tr mat-row *matRowDef=\"let entityType; columns: displayedEntityTypeColumns;\" [ngClass]=\"{'highlight': selectedEntityType?.Id === entityType.Id}\"\r\n\t\t\t\t (click)=\"selectEntityType(entityType)\"></tr>\r\n\t\t\t</table>\r\n\r\n\t\t\t<mat-paginator class=\"list-paginator\" [length]=\"totalCount\" [pageSize]=\"pageSize\"></mat-paginator>\r\n\t\t</div>\r\n\r\n\t\t<section class=\"detail-section\" *ngIf=\"selection.hasValue()\">\r\n\t\t\t<mat-card *ngIf=\"detailLists && detailLists.length\">\r\n\t\t\t\t<mat-tab-group>\r\n\t\t\t\t\t<mat-tab *ngFor=\"let prop of detailLists\">\r\n\t\t\t\t\t\t<ng-template mat-tab-label>\r\n\t\t\t\t\t\t\t{{prop.masterProperty.Title || prop.masterProperty.Name}}\r\n\t\t\t\t\t\t</ng-template>\r\n\t\t\t\t\t\t<dscribe-list [hideFilter]=\"true\" [entityType]=\"prop.masterProperty.EntityType\" [masters]=\"[prop]\">\r\n\t\t\t\t\t\t</dscribe-list>\r\n\t\t\t\t\t</mat-tab>\r\n\t\t\t\t</mat-tab-group>\r\n\t\t\t</mat-card>\r\n\t\t</section>\r\n\r\n\t</div>\r\n</div> -->\r\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UsersAndRolesManagementComponent, { className: "UsersAndRolesManagementComponent", filePath: "lib/security/components/users-and-roles-management/users-and-roles-management.component.ts", lineNumber: 9 }); })();

class DscribeModule {
    static { this.ɵfac = function DscribeModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DscribeModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: DscribeModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
            { provide: HTTP_INTERCEPTORS, useClass: DscribeInterceptor, multi: true },
            FilterTreeManipulator,
            SnackBarService
        ], imports: [CommonModule,
            BrowserAnimationsModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule,
            MatAutocompleteModule,
            MatBadgeModule,
            MatButtonModule,
            MatButtonToggleModule,
            MatCardModule,
            MatCheckboxModule,
            MatDatepickerModule,
            MatDialogModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatListModule,
            MatMenuModule,
            MatNativeDateModule,
            MatPaginatorModule,
            MatProgressBarModule,
            MatProgressSpinnerModule,
            MatRadioModule,
            MatSelectModule,
            MatSidenavModule,
            MatSnackBarModule,
            MatSortModule,
            MatTableModule,
            MatTabsModule,
            MatToolbarModule,
            MatTooltipModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DscribeModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    BrowserAnimationsModule,
                    HttpClientModule,
                    FormsModule,
                    ReactiveFormsModule,
                    RouterModule,
                    MatAutocompleteModule,
                    MatBadgeModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatCardModule,
                    MatCheckboxModule,
                    MatDatepickerModule,
                    MatDialogModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatInputModule,
                    MatListModule,
                    MatMenuModule,
                    MatNativeDateModule,
                    MatPaginatorModule,
                    MatProgressBarModule,
                    MatProgressSpinnerModule,
                    MatRadioModule,
                    MatSelectModule,
                    MatSidenavModule,
                    MatSnackBarModule,
                    MatSortModule,
                    MatTableModule,
                    MatTabsModule,
                    MatToolbarModule,
                    MatTooltipModule
                ],
                declarations: [
                    ArithmeticFilterNodeComponent,
                    AttachmentsListComponent,
                    AutoCompleteMoreDialogComponent,
                    AddNEditAppInstanceComponent,
                    AddNEditAppTypeComponent,
                    AddNEditComponent,
                    AddNEditEntityTypeComponent,
                    AddNEditPropertyComponent,
                    AppInstanceManagementComponent,
                    AppTypeManagementComponent,
                    BoolEditorComponent,
                    CommentsListComponent,
                    ComparisonFilterNodeComponent,
                    ConfirmationDialogComponent,
                    ConstantFilterNodeComponent,
                    CustomTemplateHostComponent,
                    DataHistoryComponent,
                    DateEditorComponent,
                    DatetimeEditorComponent,
                    DisplayValuePipe,
                    DscribeComponent,
                    EntityAutoCompleteComponent,
                    EntityHistoryComponent,
                    EntityListEditorComponent,
                    EntitySelectComponent,
                    EntityTypeGeneralUsageNamePipe,
                    FilterNodeComponent,
                    KeysPipe,
                    LambdaFilterNodeComponent,
                    ListAddNEditDialogComponent,
                    ListComponent,
                    ListContainerComponent,
                    ListDeleteDialogComponent,
                    LogicalFilterNodeComponent,
                    MetadataManagementComponent,
                    NavigationComponent,
                    NavigationListFilterNodeComponent,
                    NumberEditorComponent,
                    PropertyEditorComponent,
                    PropertyFilterNodeComponent,
                    PropertyHistoryComponent,
                    ReleaseMetadataSettingsComponent,
                    ReportsListComponent,
                    SettingsComponent,
                    TableTemplateComponent,
                    TextEditorComponent,
                    UsersAndRolesManagementComponent,
                    CommandButtonComponent
                ],
                exports: [DscribeComponent, ListComponent, DisplayValuePipe, ConfirmationDialogComponent],
                providers: [
                    { provide: HTTP_INTERCEPTORS, useClass: DscribeInterceptor, multi: true },
                    FilterTreeManipulator,
                    SnackBarService
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(DscribeModule, { declarations: [ArithmeticFilterNodeComponent,
        AttachmentsListComponent,
        AutoCompleteMoreDialogComponent,
        AddNEditAppInstanceComponent,
        AddNEditAppTypeComponent,
        AddNEditComponent,
        AddNEditEntityTypeComponent,
        AddNEditPropertyComponent,
        AppInstanceManagementComponent,
        AppTypeManagementComponent,
        BoolEditorComponent,
        CommentsListComponent,
        ComparisonFilterNodeComponent,
        ConfirmationDialogComponent,
        ConstantFilterNodeComponent,
        CustomTemplateHostComponent,
        DataHistoryComponent,
        DateEditorComponent,
        DatetimeEditorComponent,
        DisplayValuePipe,
        DscribeComponent,
        EntityAutoCompleteComponent,
        EntityHistoryComponent,
        EntityListEditorComponent,
        EntitySelectComponent,
        EntityTypeGeneralUsageNamePipe,
        FilterNodeComponent,
        KeysPipe,
        LambdaFilterNodeComponent,
        ListAddNEditDialogComponent,
        ListComponent,
        ListContainerComponent,
        ListDeleteDialogComponent,
        LogicalFilterNodeComponent,
        MetadataManagementComponent,
        NavigationComponent,
        NavigationListFilterNodeComponent,
        NumberEditorComponent,
        PropertyEditorComponent,
        PropertyFilterNodeComponent,
        PropertyHistoryComponent,
        ReleaseMetadataSettingsComponent,
        ReportsListComponent,
        SettingsComponent,
        TableTemplateComponent,
        TextEditorComponent,
        UsersAndRolesManagementComponent,
        CommandButtonComponent], imports: [CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule], exports: [DscribeComponent, ListComponent, DisplayValuePipe, ConfirmationDialogComponent] }); })();
i0.ɵɵsetComponentScope(AddNEditComponent, [i1$3.NgForOf, i1$3.NgIf, i5$1.ɵNgNoValidate, i5$1.NgControlStatusGroup, i5$1.NgForm, i5.MatIconButton, i7.MatCard, i6.MatIcon, i14.MatTabLabel, i14.MatTab, i14.MatTabGroup, ListComponent,
    PropertyEditorComponent], []);
i0.ɵɵsetComponentScope(FilterNodeComponent, [i1$3.NgClass, i1$3.NgIf, i1$3.NgStyle, i1$3.NgSwitch, i1$3.NgSwitchCase, ArithmeticFilterNodeComponent,
    ComparisonFilterNodeComponent,
    ConstantFilterNodeComponent,
    LambdaFilterNodeComponent,
    LogicalFilterNodeComponent,
    NavigationListFilterNodeComponent,
    PropertyFilterNodeComponent], []);

const DSCRIBE_ROUTES = [
    {
        path: '', component: NavigationComponent,
        children: [
            { path: 'entity/:entityTypeName', component: ListContainerComponent },
            { path: 'entity', component: ListContainerComponent },
            { path: 'administration', component: MetadataManagementComponent },
            { path: 'security', component: UsersAndRolesManagementComponent },
            {
                path: 'setting', component: SettingsComponent,
                children: [
                    { path: 'app-instance-management', component: AppInstanceManagementComponent },
                    { path: 'app-type-management', component: AppTypeManagementComponent },
                ]
            },
            { path: '', redirectTo: 'entity', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'entity' }
];

/*
 * Public API Surface of src
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AppInstanceInformation, AppInstanceModel, AppManagementService, ConfirmationDialogComponent, ConfirmationDialogData, DSCRIBE_ROUTES, DataHandlerService, DisplayValuePipe, DscribeComponent, DscribeFeatureArea, DscribeHttpClient, DscribeInterceptor, DscribeListTemplate, DscribeModule, DscribeService, EntityTypeMetadata, ListComponent, MetadataManagementComponent, MetadataService, SnackBarService };
//# sourceMappingURL=dscribe.mjs.map
