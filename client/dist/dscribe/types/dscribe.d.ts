import { Observable, ReplaySubject } from 'rxjs';
import * as i0 from '@angular/core';
import { EventEmitter, OnInit, OnChanges, AfterViewChecked, SimpleChanges, PipeTransform, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import * as i74 from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import * as i60 from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as i67 from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import * as _angular_common_http from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import * as i73 from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as i51 from '@angular/forms';
import { FormControl } from '@angular/forms';
import * as i53 from '@angular/material/autocomplete';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import * as i75 from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import * as i48 from '@angular/common';
import { DatePipe } from '@angular/common';
import * as i52 from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import * as i49 from '@angular/platform-browser/animations';
import * as i54 from '@angular/material/badge';
import * as i55 from '@angular/material/button';
import * as i56 from '@angular/material/button-toggle';
import * as i57 from '@angular/material/card';
import * as i58 from '@angular/material/checkbox';
import * as i59 from '@angular/material/datepicker';
import * as i61 from '@angular/material/form-field';
import * as i62 from '@angular/material/icon';
import * as i63 from '@angular/material/input';
import * as i64 from '@angular/material/list';
import * as i65 from '@angular/material/menu';
import * as i66 from '@angular/material/core';
import * as i68 from '@angular/material/progress-bar';
import * as i69 from '@angular/material/progress-spinner';
import * as i70 from '@angular/material/radio';
import * as i71 from '@angular/material/select';
import * as i72 from '@angular/material/sidenav';
import * as i76 from '@angular/material/tabs';
import * as i77 from '@angular/material/toolbar';
import * as i78 from '@angular/material/tooltip';

declare enum DscribeFeatureArea {
    Filter = 1,
    List = 2
}

interface DscribeCommandDisplayPredicate<T> {
    component: T;
}

interface DscribeCommandCallbackOutput {
}

interface DscribeCommandCallbackInput<T> {
    area: DscribeFeatureArea;
    sourceComponent: T;
}

interface BadgeInfo {
    text?: string;
    size?: string;
    color?: string;
    position?: string;
}
interface DscribeCommand {
    name: string;
    title: string;
    tooltip?: string;
    badge?: BadgeInfo;
    iconName?: string;
    featureAreas: DscribeFeatureArea | DscribeFeatureArea[];
    callback: (data: DscribeCommandCallbackInput<any>) => void | DscribeCommandCallbackOutput | Observable<DscribeCommandCallbackOutput>;
    displayPredicate?: (data: DscribeCommandDisplayPredicate<any>) => boolean;
}

declare class AppInstanceInformation {
    Id: number;
    AppTypeId: number;
    AppTypeName: string;
    AppTypeTitle: string;
    IsEnabled: boolean;
    IsProduction: boolean;
    MetadataReleaseReleaseTime: string;
    MetadataReleaseVersion: string;
    MetadataReleaseVersionCode: number;
    Name: string;
    Title: string;
    UseUnreleasedMetadata: boolean;
}

declare class DscribeService {
    private config;
    private commands$;
    loggedOut: EventEmitter<void>;
    appInstance$: ReplaySubject<AppInstanceInformation>;
    set authHeaderFetcher(fetcher: () => string);
    logout(): void;
    get authHeaderFetcher(): () => string;
    get username(): string;
    set username(value: string);
    set appInstance(instance: AppInstanceInformation);
    get appInstance(): AppInstanceInformation;
    getCommands(): Observable<DscribeCommand[]>;
    setCommands(value: DscribeCommand[]): void;
    getServerRoot(): string;
    setServerRoot(value: string): void;
    getClientRoot(): string;
    setClientRoot(value: string): void;
    url(relativeToRoot: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DscribeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DscribeService>;
}

declare class DigestEntityType {
    Name: string;
    SingularTitle: string;
    PluralTitle: string;
    TypeGeneralUsageCategoryId: number;
    constructor(Name: string, SingularTitle: string, PluralTitle: string, TypeGeneralUsageCategoryId: number);
}

interface FacetContainer {
    [facetName: string]: [boolean, number, string];
}

declare class FieldError {
    Message: string;
}
declare class Result<T> {
    Succeeded: Boolean;
    ErrorType: ErrorResultType;
    Message: string;
    Errors: {
        [key: string]: FieldError[];
    };
    Data: T;
}
declare enum ErrorResultType {
    UnknownError = 1,
    BadInput = 2,
    NotLoggedIn = 3,
    PermissionDenied = 4
}

declare class HasTypeInfo {
    IsNullable?: boolean;
    DataType?: string;
    EntityType?: EntityTypeMetadata;
    constructor(IsNullable?: boolean, DataType?: string, EntityType?: EntityTypeMetadata);
}
declare class PropertyBehavior {
    BehaviorName: string;
    Parameters: string;
    constructor(BehaviorName: string, Parameters: string);
}
declare class PropertyMetadata extends HasTypeInfo {
    Name?: string;
    GeneralUsage?: string;
    DataType?: string | null;
    EntityTypeName?: string;
    ForeignKeyName?: string;
    InversePropertyName?: string;
    ValidationErrors?: FieldError[];
    EntityType?: EntityTypeMetadata;
    InverseProperty?: PropertyMetadata;
    ForeignKeyProperty?: PropertyMetadata;
    FacetValues?: FacetContainer;
    Title?: string;
    IsNullable?: boolean;
    IsExpression?: boolean;
    Behaviors?: PropertyBehavior[];
    constructor(Name?: string, GeneralUsage?: string, DataType?: string | null, EntityTypeName?: string, ForeignKeyName?: string, InversePropertyName?: string, ValidationErrors?: FieldError[], EntityType?: EntityTypeMetadata, InverseProperty?: PropertyMetadata, ForeignKeyProperty?: PropertyMetadata, FacetValues?: FacetContainer, Title?: string, IsNullable?: boolean, IsExpression?: boolean, Behaviors?: PropertyBehavior[]);
    getConstantType(): string;
}

declare class SelectionContainer<T> {
    obj: T;
    isSelected: boolean;
    constructor(obj: T, isSelected: boolean);
}

declare enum ManageEntityModes {
    Insert = 1,
    Update = 2
}

declare class EntityTypeMetadata extends DigestEntityType {
    Name: string;
    codePath: string;
    displayNamePath: string;
    Properties: {
        [Name: string]: PropertyMetadata;
    };
    PropertyNames: string[];
    private _parentProperty;
    constructor(Name: string, singularTitle: string, pluralTitle: string, typeGeneralUsageCategoryId: number, codePath: string, displayNamePath: string);
    getPrimaryKey(): PropertyMetadata;
    getPropertiesForManage(mode: ManageEntityModes): PropertyMetadata[];
    getPropertiesForFilter(): PropertyMetadata[];
    getPropertiesForGrouping(): SelectionContainer<PropertyMetadata>[];
}

declare class DscribeHttpClient {
    private httpClient;
    private dscribeService;
    constructor(httpClient: HttpClient, dscribeService: DscribeService);
    post<T>(url: string, data: any, options?: {
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
    }): Observable<T>;
    postForBlob(url: string, data: any, options: {
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
    }): Observable<HttpResponse<Blob>>;
    get<T>(url: string): Observable<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DscribeHttpClient, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DscribeHttpClient>;
}

declare class MetadataService {
    private http;
    private config;
    entityTypes$: ReplaySubject<EntityTypeMetadata[]>;
    private currentEntityTypes;
    constructor(http: DscribeHttpClient, config: DscribeService);
    getComplete(): void;
    getEntityTypeByName(entityTypeName: string): Observable<EntityTypeMetadata>;
    private static extractEntityTypeMetadata;
    private static convertBehaviors;
    private fixUpRelationships;
    clearMetadata(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MetadataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MetadataService>;
}

type PrimaryKey = string | number;

interface HasIdName {
    id: PrimaryKey;
    displayName: string;
}

declare class IdAndName {
    EntityType: string;
    Names: {
        DisplayName: string;
        Id: PrimaryKey;
    }[];
}

declare class SortItem {
    propertyName: string;
    isDescending: boolean;
    constructor(propertyName: string, isDescending: boolean);
    static Create(propertyName: string, isDescending: boolean, entityType: EntityTypeMetadata): SortItem;
}

declare enum FilterNodeType {
    Logical = 1,
    Comparison = 2,
    Arithmetic = 3,
    Constant = 4,
    NavigationList = 5,
    Lambda = 6,
    Property = 7
}

declare class StorageFilterNode {
    nodeType?: FilterNodeType;
    operator?: string;
    dataType?: string;
    values?: any[];
    children?: StorageFilterNode[];
    propertyName?: string;
    parameterName?: string;
    subtreeName?: string;
    constructor(nodeType?: FilterNodeType, operator?: string, dataType?: string, values?: any[], children?: StorageFilterNode[], propertyName?: string, parameterName?: string, subtreeName?: string);
}

declare class EntityListRequest {
    entityTypeName: string;
    filters: StorageFilterNode[];
    startIndex?: number;
    count?: number;
    order?: SortItem[];
    constructor(entityTypeName: string, filters: StorageFilterNode[], startIndex?: number, count?: number, order?: SortItem[]);
    getRequestObject(): any;
}

interface HasId {
    Id: PrimaryKey;
}

declare abstract class EntityBase implements HasId {
    Id: PrimaryKey;
}

interface IFilterNodeFactory {
    create(type: FilterNodeType, parent: FilterNode): FilterNode;
}

declare class ParameterInfo {
    name: string;
    typeName: string;
    constructor(name: string, typeName: string);
}

declare abstract class FilterNode {
    parent: FilterNode;
    static factory: IFilterNodeFactory;
    title: string;
    protected _inputType: HasTypeInfo;
    protected _outputType: HasTypeInfo;
    protected constructor(parent: FilterNode);
    getStorageNode(): StorageFilterNode;
    setStorageNode(storage: StorageFilterNode): void;
    getTreeParameters(): ParameterInfo[];
    private getSubtreeParameters;
    abstract setStorageNodeProperties(storage: StorageFilterNode): any;
    abstract applyStorageNode(storage: StorageFilterNode): any;
    get inputType(): HasTypeInfo;
    set inputType(value: HasTypeInfo);
    get childInputType(): HasTypeInfo;
    get outputType(): HasTypeInfo;
    set outputType(value: HasTypeInfo);
    childOutputTypeChanged(child: FilterNode): void;
    abstract get nodeType(): FilterNodeType;
    abstract get children(): FilterNode[];
    abstract isEmpty(): boolean;
    abstract isValid(): boolean;
    canReplaceChild(): boolean;
    shouldBeInlined(): boolean;
    addChild(constant: boolean): void;
    removeChild(child: FilterNode): void;
    replaceChild(oldChild: FilterNode, newChild: FilterNode): void;
}

declare class LambdaFilterNode extends FilterNode {
    entityType: EntityTypeMetadata;
    private _isValueSelection;
    parameter: ParameterInfo;
    private _body;
    constructor(parent: FilterNode, entityType: EntityTypeMetadata, _isValueSelection: any);
    private findParameterName;
    setStorageNodeProperties(storage: StorageFilterNode): void;
    applyStorageNode(storage: StorageFilterNode): void;
    get inputType(): HasTypeInfo;
    set inputType(value: HasTypeInfo);
    childOutputTypeChanged(child: FilterNode): void;
    get nodeType(): FilterNodeType;
    get children(): FilterNode[];
    isValueSelection(): any;
    isEmpty(): boolean;
    isValid(): boolean;
    canReplaceChild(): boolean;
    replaceChild(oldChild: FilterNode, newChild: FilterNode): void;
}

declare class GroupItem {
    property: PropertyMetadata;
    constructor(property: PropertyMetadata);
}

declare enum SimpleAggregate {
    Sum = 0,
    Count = 1,
    Average = 2,
    Min = 3,
    Max = 4
}

declare class AggregationInfo {
    sourceProperty: PropertyMetadata;
    aggregate: SimpleAggregate;
    constructor(sourceProperty: PropertyMetadata, aggregate: SimpleAggregate);
    getResultName(): string;
    getDataType(): string;
}

declare class GroupListRequest {
    entityTypeName: string;
    filters: LambdaFilterNode[];
    order: SortItem[];
    groupBy: GroupItem[];
    aggregations: AggregationInfo[];
    startIndex: number;
    count: number;
    constructor(entityTypeName: string, filters: LambdaFilterNode[], order: SortItem[], groupBy: GroupItem[], aggregations: AggregationInfo[], startIndex: number, count: number);
    getRequestObject(): any;
}

declare class DataHandlerService {
    private http;
    private dscribeService;
    private metadataService;
    constructor(http: DscribeHttpClient, dscribeService: DscribeService, metadataService: MetadataService);
    private filterAPI;
    private filterCountAPI;
    private groupAPI;
    private groupCountAPI;
    private displayNameAPI;
    private allIdAndNameAPI;
    private autocompeleteIdNameAPI;
    private managementURL;
    private expressionValueAPI;
    private saveFiltersApi;
    private listFiltersApi;
    private getFilterTextApi;
    private cache;
    private cache2;
    private uploadQueue;
    private firstAddTime;
    private queueSize;
    private nameResponse;
    private downloadTimeout;
    private expressionValueCacheQueueSize;
    private expressionValueAutoDownloader;
    private expressionValueResponse;
    getName(entityTypeName: string, id: PrimaryKey): Observable<string>;
    private enqueueForName;
    private downloadQueuedNames;
    getIdAndNames(entityTypeName: string): Observable<HasIdName[]>;
    getAutocompleteItems(entityTypeName: string, queryText: string): Observable<IdAndName>;
    countByFilter(request: EntityListRequest): Observable<number>;
    getByFilter(request: EntityListRequest): Observable<EntityBase[]>;
    getGroupCount(request: GroupListRequest): Observable<number>;
    getGrouped(request: GroupListRequest): Observable<any[]>;
    manageEntity(entity: EntityBase, entityTypeName: string, action: ManageEntityModes): Observable<Result<EntityBase>>;
    deleteEntity(entityTypeName: string, entity: EntityBase): Observable<Result<EntityBase>>;
    getAutoCompleteItems(entityTypeName: string, searchTerm: string): Observable<{
        DisplayName: string;
        Id: PrimaryKey;
    }[]>;
    getNewEntityForCreateDialog(entityType: EntityTypeMetadata): any;
    private escapeRegExp;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataHandlerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DataHandlerService>;
}

declare class ListColumn {
    name: string;
    title: string;
    dataType: string;
    dataEntityTypeName: string;
    behaviors: PropertyBehavior[];
    constructor(name: string, title: string, dataType: string, dataEntityTypeName: string, behaviors: PropertyBehavior[]);
}

declare class MasterReference {
    master: any;
    masterProperty: PropertyMetadata;
    childList: {
        onMasterChanged(): void;
    };
    count: number;
    constructor(master: any, masterProperty: PropertyMetadata);
}

declare class TableTemplateComponent {
    data: any[];
    selection: SelectionModel<any>;
    columns: ListColumn[];
    displayedColumns: string[];
    hideAdditionFeature: boolean;
    rowClick: EventEmitter<any>;
    commentsClick: EventEmitter<any>;
    attachmentsClick: EventEmitter<any>;
    sort: MatSort;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableTemplateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableTemplateComponent, "dscribe-table-template", never, { "data": { "alias": "data"; "required": false; }; "selection": { "alias": "selection"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; "displayedColumns": { "alias": "displayedColumns"; "required": false; }; "hideAdditionFeature": { "alias": "hideAdditionFeature"; "required": false; }; }, { "rowClick": "rowClick"; "commentsClick": "commentsClick"; "attachmentsClick": "attachmentsClick"; }, never, never, false, never>;
}

declare class SnackBarService {
    snackBar: MatSnackBar;
    constructor(snackBar: MatSnackBar);
    open(message: string, action?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SnackBarService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SnackBarService>;
}

interface AddNEditStructure {
    path: string;
    pathTitle: string;
    currentEntity?: any;
    componentType: EditorComponentTypes;
    parentEntity?: any;
    entityTypeMetadata?: EntityTypeMetadata;
    propertyMetadata?: PropertyMetadata;
    children?: AddNEditStructure[];
    listBehavior?: ListBehaviors;
    masterReferences?: MasterReference[];
    directProperties?: PropertyMetadata[];
}
declare enum EditorComponentTypes {
    FlatPropertiesEditor = 1,
    TabSet = 2,
    PropertyEditor = 3,
    List = 4
}
declare enum ListBehaviors {
    SaveInServer = 1,
    SaveInObject = 2
}

declare class CommentModel {
    Description: string;
    EntityTypeId: number;
    EntityTypeName: string;
    Id: number;
    Identifier: number;
    IsDeleted: boolean;
    RequestLogId: number;
    Title: string;
    Url: string;
    IsEditing: boolean;
}
declare class GetCommentRequestModel {
    EntityTypeName: string;
    Identifier: number;
}

declare enum ReportFormats {
    RichTextDocument = 1
}
declare class ReportsListResponse {
    EntityTypeName: string;
    Format: ReportFormats;
    Id: number;
    Title: string;
}
declare class DownloadReportRequest {
    ReportDefinitionId: number;
    EntityIdentifier: number;
}
declare class SaveReportAsAttachmentRequest {
    ReportDefinitionId: number;
    EntityIdentifier: number;
    Title: string;
    Description: string;
}

declare class AttachmentListItem {
    Description: string;
    EntityTypeId: number;
    Id: number;
    Identifier: number;
    IsDeleted: boolean;
    Title: string;
    Url: string;
    FileName: string;
    Size: number;
}
declare class AttachmentsListRequest {
    EntityTypeName: string;
    Identifier: number;
}
declare class AttachmentsListResponse {
    Items: AttachmentListItem[];
}

declare class LobInfoService {
    private http;
    private dscribeService;
    private metadata;
    private reports;
    constructor(http: DscribeHttpClient, dscribeService: DscribeService, metadata: MetadataService);
    private getSummaryAPI;
    private getReportsAPI;
    private downloadReportAPI;
    private saveAsAttachmentApi;
    private attachmentsListApi;
    private downloadAttachmentApi;
    private getCommentsApi;
    private addCommentApi;
    private editCommentApi;
    private deleteCommentApi;
    setLobInfo(entityType: EntityTypeMetadata, data: any[]): void;
    private setSummaries;
    getReports(entityTypeName: string): Observable<ReportsListResponse[]>;
    processReportForDownload(request: DownloadReportRequest): Observable<_angular_common_http.HttpResponse<Blob>>;
    saveReportAsAttachment(request: SaveReportAsAttachmentRequest): Observable<_angular_common_http.HttpResponse<Blob>>;
    getAttachmentsList(request: AttachmentsListRequest): Observable<AttachmentsListResponse>;
    downloadAttachment(attachment: AttachmentListItem): Observable<_angular_common_http.HttpResponse<Blob>>;
    getCommentList(model: GetCommentRequestModel): Observable<CommentModel[]>;
    addComment(model: CommentModel): Observable<any>;
    editComment(model: CommentModel): Observable<CommentModel[]>;
    deleteComment(model: CommentModel): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LobInfoService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LobInfoService>;
}

declare class ListComponent implements OnInit, OnChanges, AfterViewChecked {
    private metadataService;
    private dataHandler;
    private dialog;
    private dscribeService;
    private snackbarService;
    private lobService;
    initialSelection: any[];
    allowMultiSelect: boolean;
    selection: SelectionModel<any>;
    entityType: EntityTypeMetadata;
    masters: MasterReference[];
    hideFilter: boolean;
    addNEditStructure: AddNEditStructure;
    hasNav: boolean;
    selectionChanged: EventEmitter<any>;
    navToggled: EventEmitter<void>;
    detailLists?: MasterReference[];
    displayedColumns: any[];
    columns: ListColumn[];
    data: any[];
    totalCount: number;
    private displayedEntityType;
    isLoadingResults: boolean;
    isDataConnected: boolean;
    userRefresh: EventEmitter<null>;
    pageSize: number;
    filterLambda: LambdaFilterNode;
    userDefinedFilter: StorageFilterNode;
    reports: ReportsListResponse[];
    displayMode: string;
    paginator: MatPaginator;
    table: TableTemplateComponent;
    sort: MatSort;
    private customTemplate;
    filterCommands: DscribeCommand[];
    listCommands: DscribeCommand[];
    constructor(metadataService: MetadataService, dataHandler: DataHandlerService, dialog: MatDialog, dscribeService: DscribeService, snackbarService: SnackBarService, lobService: LobInfoService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewChecked(): void;
    connectSort(): void;
    createColumns(entityType: EntityTypeMetadata): void;
    applyFilter(doNotRefres?: boolean): void;
    getCurrentFilters(): StorageFilterNode[];
    refreshData(): void;
    connectData(): void;
    onMasterChanged(): void;
    addNew(): void;
    selectDetails(row: any): void;
    manageComment(): void;
    openAddNEditDialog(instance: any, isNew: boolean): void;
    editSelectedRow(): void;
    showHistory(): void;
    deleteSelected(): void;
    selectRow(row: any): void;
    get filterVisible(): boolean;
    set filterVisible(value: boolean);
    setFilterToEmpty(): void;
    toggleFilter(): void;
    getCustomTemplateWidth(): string;
    callFilterCommand(command: DscribeCommand): void;
    callListCommand(command: DscribeCommand): void;
    shouldDisplayCommand(command: DscribeCommand): boolean;
    toggleNav(): void;
    showComments(row: any): void;
    showAttachments(row: any): void;
    showReports(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListComponent, "dscribe-list", never, { "entityType": { "alias": "entityType"; "required": false; }; "masters": { "alias": "masters"; "required": false; }; "hideFilter": { "alias": "hideFilter"; "required": false; }; "addNEditStructure": { "alias": "addNEditStructure"; "required": false; }; "hasNav": { "alias": "hasNav"; "required": false; }; }, { "selectionChanged": "selectionChanged"; "navToggled": "navToggled"; }, never, never, false, never>;
}

interface DscribeTemplateComponent {
    data: any;
    select: boolean;
    selectChange: EventEmitter<boolean>;
}

declare function DscribeListTemplate(data: {
    entityTypeName: string;
    options?: any;
}): (constructor: Function) => void;

declare class AppTypeModel {
    Id: number;
    Name: string;
    Title: string;
}

declare class AppInstanceModel {
    Id: number;
    AppTypeId: number;
    AppTypeName: string;
    AppTypeTitle: string;
    IsEnabled: boolean;
    IsProduction: boolean;
    MetadataReleaseReleaseTime: string;
    MetadataReleaseVersion: string;
    MetadataReleaseVersionCode: number;
    Name: string;
    Title: string;
    UseUnreleasedMetadata: boolean;
    DataConnectionString: string;
    LobConnectionString: string;
    DatabaseProviderId: number;
    MigrateDatabase: boolean;
}

declare class DatabaseProviderModel {
    id: number;
    name: string;
}

declare class AppManagementService {
    private http;
    private dscribeService;
    constructor(http: DscribeHttpClient, dscribeService: DscribeService);
    private GetAppInstancesInfoApi;
    private GetDatabaseProvidersApi;
    private AddAppInstanceApi;
    private EditAppInstanceApi;
    private DeleteAppInstanceApi;
    private GetAppTypesApi;
    private AddAppTypeApi;
    private EditAppTypeApi;
    private DeleteAppTypeApi;
    deleteAppType(appType: AppTypeModel): Observable<any>;
    editAppType(appType: AppTypeModel): Observable<any>;
    addAppType(appType: AppTypeModel): Observable<any>;
    getAppTypes(): Observable<AppTypeModel[]>;
    deleteAppInstance(appInstance: AppInstanceModel): Observable<any>;
    getAppInstancesInfo(): Observable<AppInstanceModel[]>;
    getDatabaseProviders(): Observable<DatabaseProviderModel[]>;
    addAppInstance(appInstance: AppInstanceModel): Observable<AppInstanceModel>;
    editAppInstance(appInstance: AppInstanceModel): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppManagementService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AppManagementService>;
}

declare class ConfirmationDialogData {
    title: string;
    message?: string;
    constructor(title: string, message?: string);
}

declare class ConfirmationDialogComponent implements OnInit {
    private dialogRef;
    data: ConfirmationDialogData;
    constructor(dialogRef: MatDialogRef<ConfirmationDialogComponent>, data: ConfirmationDialogData);
    static Ask(dialog: MatDialog, title: string, message?: any): Observable<boolean>;
    ngOnInit(): void;
    accept(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmationDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfirmationDialogComponent, "dscribe-confirmation-dialog", never, {}, {}, never, never, false, never>;
}

declare class DisplayValuePipe implements PipeTransform {
    private dataHandlerService;
    constructor(dataHandlerService: DataHandlerService);
    transform(value: any, property: ListColumn): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DisplayValuePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DisplayValuePipe, "displayValue", false>;
}

declare class DscribeInterceptor implements HttpInterceptor {
    private config;
    constructor(config: DscribeService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private handleError;
    static ɵfac: i0.ɵɵFactoryDeclaration<DscribeInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DscribeInterceptor>;
}

declare class DscribeComponent {
    private config;
    set authHeaderFetcher(value: () => string);
    set username(value: string);
    loggedOut: EventEmitter<void>;
    constructor(config: DscribeService);
    static ɵfac: i0.ɵɵFactoryDeclaration<DscribeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DscribeComponent, "dscribe-root", never, { "authHeaderFetcher": { "alias": "authHeaderFetcher"; "required": false; }; "username": { "alias": "username"; "required": false; }; }, { "loggedOut": "loggedOut"; }, never, never, false, never>;
}

declare class ArithmeticOperator {
    name: string;
    title: string;
    minOperandCount: number;
    maxOperandCount: number;
    allowMultipleValues: boolean;
    dataTypeMap: (input: string) => string;
    condition?: (prop: HasTypeInfo) => boolean;
    dataTypes?: string[];
    private static numbers;
    private static toSame;
    private static toInt;
    private static toDecimal;
    static Operators: ArithmeticOperator[];
    constructor(name: string, title: string, minOperandCount: number, maxOperandCount: number, allowMultipleValues: boolean, dataTypeMap: (input: string) => string, condition?: (prop: HasTypeInfo) => boolean, dataTypes?: string[]);
}

declare class ArithmeticFilterNode extends FilterNode {
    private _operator;
    operators: ArithmeticOperator[];
    _children: FilterNode[];
    _operandType: HasTypeInfo;
    constructor(parent: FilterNode);
    get inputType(): HasTypeInfo;
    set inputType(value: HasTypeInfo);
    childOutputTypeChanged(child: FilterNode): void;
    get operator(): ArithmeticOperator;
    set operator(value: ArithmeticOperator);
    calculateOutputType(): void;
    setStorageNodeProperties(storage: StorageFilterNode): void;
    applyStorageNode(storage: StorageFilterNode): void;
    get nodeType(): FilterNodeType;
    get children(): FilterNode[];
    isEmpty(): boolean;
    isValid(): boolean;
    canReplaceChild(): boolean;
    replaceChild(oldChild: FilterNode, newChild: FilterNode): void;
    addChild(constant: boolean): void;
    removeChild(child: FilterNode): void;
    toggleChildType(child: FilterNode): void;
}

declare class FilterTreeManipulator {
    addSibling(node: FilterNode): void;
    toggleType(node: FilterNode): void;
    delete(node: FilterNode): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterTreeManipulator, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FilterTreeManipulator>;
}

declare class ArithmeticFilterNodeComponent implements OnInit {
    manipulator: FilterTreeManipulator;
    node: ArithmeticFilterNode;
    constructor(manipulator: FilterTreeManipulator);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ArithmeticFilterNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ArithmeticFilterNodeComponent, "dscribe-arithmetic-filter-node", never, { "node": { "alias": "node"; "required": false; }; }, {}, never, never, false, never>;
}

declare enum ManageCommentModes {
    view = 1,
    manage = 2
}

declare class LobListDialogData {
    entityTypeName: string;
    identifier: number;
    mode: ManageCommentModes;
}

declare class AttachmentsListComponent implements OnInit {
    private lobInfo;
    private dialogRef;
    data: LobListDialogData;
    attachments: AttachmentListItem[];
    displayedColumns: string[];
    selection: SelectionModel<AttachmentListItem>;
    constructor(lobInfo: LobInfoService, dialogRef: MatDialogRef<AttachmentsListComponent>, data: LobListDialogData);
    ngOnInit(): void;
    download(attachment: AttachmentListItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AttachmentsListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AttachmentsListComponent, "dscribe-attachments-list", never, {}, {}, never, never, false, never>;
}

declare class AutoCompleteMoreDialogComponent {
    dialogRef: MatDialogRef<AutoCompleteMoreDialogComponent>;
    data: any;
    inputs: {
        entityType: EntityTypeMetadata;
        title: string;
        selectedRow: any;
    };
    constructor(dialogRef: MatDialogRef<AutoCompleteMoreDialogComponent>, data: any);
    listRowSelectionChanged(row: any): void;
    doneClicked(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutoCompleteMoreDialogComponent, [{ optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutoCompleteMoreDialogComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
declare class EntityAutoCompleteComponent implements OnInit, OnChanges {
    private dataHandler;
    private dialog;
    entity: any;
    property: PropertyMetadata;
    color: string;
    overridePropertyName: string;
    isFilter: boolean;
    inputCtrl: FormControl<any>;
    filteredOptions: Observable<{
        DisplayName: string;
        Id: PrimaryKey;
    }[]>;
    listRefresher: boolean;
    selection: {
        DisplayName: string;
        Id: PrimaryKey;
    };
    loading: boolean;
    isAutoCompleteOpen: boolean;
    trigger: MatAutocompleteTrigger;
    constructor(dataHandler: DataHandlerService, dialog: MatDialog);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    filter(name: string): Observable<{
        DisplayName: string;
        Id: PrimaryKey;
    }[]>;
    displayFn(): string;
    selectionChange(item: any): void;
    clean(): void;
    toggleDropDown(): void;
    selectFromList(): void;
    addNew(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntityAutoCompleteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EntityAutoCompleteComponent, "dscribe-entity-auto-complete-component", never, { "entity": { "alias": "entity"; "required": false; }; "property": { "alias": "property"; "required": false; }; "color": { "alias": "color"; "required": false; }; "overridePropertyName": { "alias": "overridePropertyName"; "required": false; }; "isFilter": { "alias": "isFilter"; "required": false; }; }, {}, never, never, false, never>;
}

declare class AddNEditAppInstanceComponentData {
    appInstance: AppInstanceModel;
    isNew: boolean;
    constructor(appInstance: AppInstanceModel, isNew: boolean);
    get action(): "Add" | "Edit";
}
declare class AddNEditAppInstanceComponent implements OnInit {
    private dialogRef;
    data: AddNEditAppInstanceComponentData;
    private appManagementService;
    private snackbarService;
    appInstance: AppInstanceModel;
    appInstanceError: AppInstanceModel;
    appTypes: AppTypeModel[];
    databaseProviders: DatabaseProviderModel[];
    submitLoading: boolean;
    constructor(dialogRef: MatDialogRef<AddNEditAppInstanceComponent>, data: AddNEditAppInstanceComponentData, appManagementService: AppManagementService, snackbarService: SnackBarService);
    ngOnInit(): void;
    getAppTypes(): void;
    getDatabaseProvider(): void;
    save(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddNEditAppInstanceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddNEditAppInstanceComponent, "dscribe-host-add-n-edit-app-instance", never, {}, {}, never, never, false, never>;
}

declare class AddNEditAppTypeComponentData {
    appType: AppTypeModel;
    isNew: boolean;
    constructor(appType: AppTypeModel, isNew: boolean);
    get action(): "Add" | "Edit";
}
declare class AddNEditAppTypeComponent implements OnInit {
    private dialogRef;
    data: AddNEditAppTypeComponentData;
    private appManagementService;
    private snackbarService;
    appType: AppTypeModel;
    appTypeError: AppTypeModel;
    submitLoading: boolean;
    constructor(dialogRef: MatDialogRef<AddNEditAppTypeComponent>, data: AddNEditAppTypeComponentData, appManagementService: AppManagementService, snackbarService: SnackBarService);
    ngOnInit(): void;
    save(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddNEditAppTypeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddNEditAppTypeComponent, "dscribe-host-add-n-edit-app-type", never, {}, {}, never, never, false, never>;
}

declare class AddNEditResult {
    action: ManageEntityModes;
    instance: any;
    constructor(action: ManageEntityModes, instance: any);
}

declare class AddNEditComponent implements OnInit {
    private metadataService;
    private dataHandler;
    private snackbarService;
    entityTypeMetadata: EntityTypeMetadata;
    entity: any;
    action: ManageEntityModes;
    entityTypeName: string;
    masters: MasterReference[];
    entitySaved: EventEmitter<AddNEditResult>;
    canceled: EventEmitter<any>;
    parentStructure: AddNEditStructure;
    structure: AddNEditStructure;
    componentTypes: typeof EditorComponentTypes;
    constructor(metadataService: MetadataService, dataHandler: DataHandlerService, snackbarService: SnackBarService);
    ngOnInit(): void;
    private createEditorStructure;
    private afterEntitySaved;
    saveEntity(): void;
    private getMessageFromServerValidationError;
    private smartAppend;
    cancel(): void;
    processFailure(error: Result<any>): void;
    private processSaveResponse;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddNEditComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddNEditComponent, "dscribe-add-n-edit", never, { "entity": { "alias": "entity"; "required": false; }; "action": { "alias": "action"; "required": false; }; "entityTypeName": { "alias": "entityTypeName"; "required": false; }; "masters": { "alias": "masters"; "required": false; }; "parentStructure": { "alias": "parentStructure"; "required": false; }; }, { "entitySaved": "entitySaved"; "canceled": "canceled"; }, never, never, false, never>;
}

declare class LocalFacetModel$1 {
    FacetName: string;
    Value: string;
}
declare class EntityTypeBase {
    static fields: {
        title: string;
        name: string;
        dataType: string;
    }[];
    CodePath: string;
    DisplayNamePath: string;
    Id: number;
    Name: string;
    SchemaName: string;
    PluralTitle: string;
    SingularTitle: string;
    EntityTypeGeneralUsageCategoryId: number;
    TableName: string;
    LocalFacets: LocalFacetModel$1[];
}

declare class FacetDefinitionModel {
    Id: number;
    Name: string;
    DataType: string;
    Default: string;
}

declare class GeneralUsageCategoryModel {
    Id: number;
    Name: string;
}

declare class DataTypeModel {
    Id: number;
    Name: string;
    Identifier: string;
    static NavigationalDataTypeIds: {
        [Key: string]: number;
    };
}

declare class MetadataBasicInfoModel {
    PropertyFacetDefinitions: FacetDefinitionModel[];
    EntityTypeFacetDefinitions: FacetDefinitionModel[];
    PropertyGeneralUsageCategories: GeneralUsageCategoryModel[];
    DataTypes: DataTypeModel[];
    EntityTypeGeneralUsageCategories: GeneralUsageCategoryModel[];
    DefaultPropertyFacetValues: [string, [string, string]][];
    DefaultEntityTypeFacetValues: [string, [string, string]][];
}

declare class LocalFacetModel {
    FacetName: string;
    Value: string;
}
declare class PropertyBase {
    Id: number;
    DataTypeId: number;
    IsNullable: boolean;
    Name: string;
    PropertyGeneralUsageCategoryId: number;
    OwnerEntityTypeId: number;
    DataEntityTypeId: number;
    ForeignKeyPropertyId: number;
    InversePropertyId: number;
    Title: string;
    LocalFacets: LocalFacetModel[];
}

declare class LocalFacetsModel {
    localFacets: [string, [string, string]];
}

declare enum RelatedPropertyAction {
    DontChange = 1,
    ChooseExistingById = 2,
    CreateNewByName = 3,
    RenameExisting = 4
}
declare class AddNEditPropertyMetadataModel extends PropertyBase {
    ForeignKeyAction: RelatedPropertyAction;
    NewForeignKeyName: string;
    NewForeignKeyId: number;
    InversePropertyAction: RelatedPropertyAction;
    NewInversePropertyName: string;
    NewInversePropertyTitle: string;
    NewInversePropertyId: number;
}

declare class PropertyInfoModel {
    Id: number;
    Name: string;
    DataTypeId: number;
    DataEntityTypeId: number;
    OwnerEntityTypeId: number;
}

declare class ReleaseMetadataRequest {
    AppInstanceId: number;
    SetAsInstanceMetadata: boolean;
    Version: string;
    VersionCode: number;
}

declare class MetadataValidationResponse {
    success: boolean;
    warnings: string[];
    errors: string[];
}

declare class MetadataManagementApiClient {
    private http;
    private dscribeService;
    private managementAPI;
    private releaseAPI;
    private getEntityTypesAPI;
    private getPropertiesAPI;
    private getBasicInfoAPI;
    private getEntityTypeFacetsAPI;
    private getPropertyFacetsAPI;
    private getAllPropertyNamesAPI;
    private addEntityTypeAPI;
    private editEntityTypeAPI;
    private addPropertyAPI;
    private editPropertyAPI;
    private getPropertyForEditAPI;
    private releaseMetadataAPI;
    private generateCodeAPI;
    constructor(http: DscribeHttpClient, dscribeService: DscribeService);
    addEntityType(entityType: EntityTypeBase): Observable<null>;
    editEntityType(entityType: EntityTypeBase): Observable<null>;
    deleteEntityType(entityType: EntityTypeBase): Observable<void>;
    addProperty(property: AddNEditPropertyMetadataModel): Observable<null>;
    getPropertyForEdit(propertyId: number): Observable<AddNEditPropertyMetadataModel>;
    editProperty(property: AddNEditPropertyMetadataModel): Observable<null>;
    getBasicInfo(): Observable<MetadataBasicInfoModel>;
    getEntityTypes(): Observable<EntityTypeBase[]>;
    manageEntityTypes(action: string, type: EntityTypeBase): Observable<void>;
    getEntityTypeFacets(): Observable<LocalFacetsModel>;
    getProperties(entityTypeId: number): Observable<PropertyBase[]>;
    manageProperty(action: string, property: PropertyBase): Observable<void>;
    deleteProperty(property: PropertyBase): Observable<void>;
    getPropertyFacets(typeName: string): Observable<LocalFacetsModel>;
    getAllPropertiesInfo(): Observable<PropertyInfoModel[]>;
    releaseMetadata(request: ReleaseMetadataRequest): Observable<null>;
    generateCode(): Observable<MetadataValidationResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MetadataManagementApiClient, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MetadataManagementApiClient>;
}

declare class AddNEditEntityTypeComponentData {
    entityType: EntityTypeBase;
    isNew: boolean;
    basicInfo: MetadataBasicInfoModel;
    constructor(entityType: EntityTypeBase, isNew: boolean, basicInfo: MetadataBasicInfoModel);
    get action(): "Add" | "Edit";
}

declare class AddNEditEntityTypeComponent implements OnInit {
    private dialogRef;
    data: AddNEditEntityTypeComponentData;
    private apiClient;
    private snackbarService;
    entityType: EntityTypeBase;
    entityTypeError: EntityTypeBase;
    submitLoading: boolean;
    basicInfo: MetadataBasicInfoModel;
    constructor(dialogRef: MatDialogRef<AddNEditEntityTypeComponent>, data: AddNEditEntityTypeComponentData, apiClient: MetadataManagementApiClient, snackbarService: SnackBarService);
    ngOnInit(): void;
    setDefaultFacetValues(): void;
    setFacetCheckIcon(facetType: FacetDefinitionModel): "check_box_outline_blank" | "check_box";
    getFacetName(facetType: FacetDefinitionModel): string;
    changeFacetValue(facetType: FacetDefinitionModel): void;
    setEntityTypeFacetDefinitions(): void;
    save(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddNEditEntityTypeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddNEditEntityTypeComponent, "dscribe-add-n-edit-entity-type", never, {}, {}, never, never, false, never>;
}

declare class AddNEditPropertyComponentData {
    property: AddNEditPropertyMetadataModel;
    isNew: any;
    basicInfo: MetadataBasicInfoModel;
    entityTypes: EntityTypeBase[];
    thisEntityTypeProperties: PropertyBase[];
    allProperties: PropertyInfoModel[];
    constructor(property: AddNEditPropertyMetadataModel, isNew: any, basicInfo: MetadataBasicInfoModel, entityTypes: EntityTypeBase[], thisEntityTypeProperties: PropertyBase[], allProperties: PropertyInfoModel[]);
}

declare class AddNEditPropertyComponent implements OnInit {
    private dialogRef;
    data: AddNEditPropertyComponentData;
    private apiClient;
    private snackbarService;
    property: AddNEditPropertyMetadataModel;
    propertyError: AddNEditPropertyMetadataModel;
    basicInfo: MetadataBasicInfoModel;
    entityTypes: EntityTypeBase[];
    actions: typeof RelatedPropertyAction;
    thisTypeProperties: PropertyBase[];
    allProperties: PropertyInfoModel[];
    submitLoading: boolean;
    facets: FacetDefinitionModel[];
    constructor(dialogRef: MatDialogRef<AddNEditEntityTypeComponent>, data: AddNEditPropertyComponentData, apiClient: MetadataManagementApiClient, snackbarService: SnackBarService);
    setDefaultFacetValues(): void;
    changeFacetValue(facetType: FacetDefinitionModel): void;
    getFacetName(facetType: FacetDefinitionModel): string;
    setPropertyFacetDefinitions(): void;
    setFacetCheckIcon(facetType: FacetDefinitionModel): "check_box_outline_blank" | "check_box";
    get isNavigation(): boolean;
    get isNavigationProperty(): boolean;
    get hasInverseProperty(): boolean;
    get compatibleForeignKeys(): PropertyBase[];
    get compatibleInverseProperties(): PropertyInfoModel[];
    ngOnInit(): void;
    save(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddNEditPropertyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddNEditPropertyComponent, "dscribe-add-n-edit-property", never, {}, {}, never, never, false, never>;
}

declare class AppInstanceManagementComponent implements OnInit {
    private appManagementService;
    private snackBarService;
    private dialog;
    displayedAppInstanceColumns: string[];
    appInstances: AppInstanceModel[];
    selectedAppInstance: AppInstanceModel;
    appInstancesDataSource: MatTableDataSource<AppInstanceModel, MatPaginator>;
    AppInstancePaginator: MatPaginator;
    constructor(appManagementService: AppManagementService, snackBarService: SnackBarService, dialog: MatDialog);
    ngOnInit(): void;
    deleteAppInstance(): void;
    addAppInstance(): void;
    editAppInstance(): void;
    openAddNEditAppInstanceDialog(instance: any, isNew: boolean): void;
    getAppInstances(): void;
    selectAppInstance(appInstance: AppInstanceModel): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppInstanceManagementComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AppInstanceManagementComponent, "dscribe-host-app-instance-management", never, {}, {}, never, never, false, never>;
}

declare class AppTypeManagementComponent implements OnInit {
    private appManagementService;
    private snackBarService;
    private dialog;
    displayedAppTypeColumns: string[];
    appTypes: AppTypeModel[];
    selectedAppType: AppTypeModel;
    appTypesDataSource: MatTableDataSource<AppTypeModel, MatPaginator>;
    AppTypePaginator: MatPaginator;
    constructor(appManagementService: AppManagementService, snackBarService: SnackBarService, dialog: MatDialog);
    ngOnInit(): void;
    deleteAppType(): void;
    addAppType(): void;
    editAppType(): void;
    openAddNEditAppTypeDialog(instance: any, isNew: boolean): void;
    getAppTypes(): void;
    selectAppType(appType: AppTypeModel): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppTypeManagementComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AppTypeManagementComponent, "dscribe-host-app-type-management", never, {}, {}, never, never, false, never>;
}

declare class BoolEditorComponent {
    entity: any;
    property: PropertyMetadata;
    color: string;
    overridePropertyName: string;
    isFilter: boolean;
    next(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BoolEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BoolEditorComponent, "dscribe-bool-editor", never, { "entity": { "alias": "entity"; "required": false; }; "property": { "alias": "property"; "required": false; }; "color": { "alias": "color"; "required": false; }; "overridePropertyName": { "alias": "overridePropertyName"; "required": false; }; "isFilter": { "alias": "isFilter"; "required": false; }; }, {}, never, never, false, never>;
}

declare class CommentsListComponent implements OnInit {
    private dialogRef;
    data: LobListDialogData;
    private lobService;
    private snackbarService;
    comments: CommentModel[];
    commentToSave: CommentModel;
    isLoading: boolean;
    submitLoading: boolean;
    isAdding: boolean;
    commentToSaveError: any;
    constructor(dialogRef: MatDialogRef<CommentsListComponent>, data: LobListDialogData, lobService: LobInfoService, snackbarService: SnackBarService);
    ngOnInit(): void;
    cancel(): void;
    getCommentList(): void;
    saveComment(): void;
    deleteComment(comment: CommentModel): void;
    switchToEditMode(item: CommentModel): void;
    switchToAddMode(): void;
    cancelEditMode(comment: CommentModel): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CommentsListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CommentsListComponent, "dscribe-comments-list", never, {}, {}, never, never, false, never>;
}

declare class ComparisonOperator {
    name: string;
    title: string;
    minOperandCount: number;
    maxOperandCount: number;
    allowMultipleValues: boolean;
    condition?: (prop: HasTypeInfo) => boolean;
    dataTypes?: string[];
    constructor(name: string, title: string, minOperandCount: number, maxOperandCount: number, allowMultipleValues: boolean, condition?: (prop: HasTypeInfo) => boolean, dataTypes?: string[]);
    static Operators: ComparisonOperator[];
}

declare class ComparisonFilterNode extends FilterNode {
    private _operator;
    operators: ComparisonOperator[];
    private _children;
    _operandType: HasTypeInfo;
    constructor(parent: FilterNode);
    get inputType(): HasTypeInfo;
    set inputType(value: HasTypeInfo);
    childOutputTypeChanged(child: FilterNode): void;
    get operator(): ComparisonOperator;
    set operator(value: ComparisonOperator);
    calculateOutputType(): void;
    setStorageNodeProperties(storage: StorageFilterNode): void;
    applyStorageNode(storage: StorageFilterNode): void;
    get nodeType(): FilterNodeType;
    get children(): FilterNode[];
    isEmpty(): boolean;
    isValid(): boolean;
    canReplaceChild(): boolean;
    replaceChild(oldChild: FilterNode, newChild: FilterNode): void;
    addChild(constant: boolean): void;
    toggleChildType(child: FilterNode): void;
    removeChild(child: FilterNode): void;
}

declare class ComparisonFilterNodeComponent implements OnInit {
    manipulator: FilterTreeManipulator;
    node: ComparisonFilterNode;
    constructor(manipulator: FilterTreeManipulator);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComparisonFilterNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ComparisonFilterNodeComponent, "dscribe-comparison-filter-node", never, { "node": { "alias": "node"; "required": false; }; }, {}, never, never, false, never>;
}

declare class ConstantFilterNode extends FilterNode {
    values: {
        value: any;
    }[];
    private _allowMultipleValues;
    private _dataType;
    constructor(parent: FilterNode);
    addValue(): void;
    removeValueAt(index: number): void;
    get allowMultipleValues(): boolean;
    set allowMultipleValues(value: boolean);
    setStorageNodeProperties(storage: StorageFilterNode): void;
    applyStorageNode(storage: StorageFilterNode): void;
    get dataType(): HasTypeInfo;
    set dataType(value: HasTypeInfo);
    get nodeType(): FilterNodeType;
    get children(): FilterNode[];
    isEmpty(): boolean;
    isValid(): boolean;
}

declare class ConstantFilterNodeComponent implements OnInit {
    manipulator: FilterTreeManipulator;
    node: ConstantFilterNode;
    constructor(manipulator: FilterTreeManipulator);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConstantFilterNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConstantFilterNodeComponent, "dscribe-constant-filter-node", never, { "node": { "alias": "node"; "required": false; }; }, {}, never, never, false, never>;
}

declare class CustomTemplateHostComponent {
    private componentFactoryResolver;
    private _entityTypeName;
    private _data;
    private _templateComp;
    select: EventEmitter<void>;
    set isSelected(value: boolean);
    set data(value: any);
    get data(): any;
    set entityTypeName(value: string);
    get entityTypeName(): string;
    host: ViewContainerRef;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    loadComponent(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomTemplateHostComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomTemplateHostComponent, "dscribe-custom-template-host", never, { "isSelected": { "alias": "isSelected"; "required": false; }; "data": { "alias": "data"; "required": false; }; "entityTypeName": { "alias": "entityTypeName"; "required": false; }; }, { "select": "select"; }, never, never, false, never>;
}

declare enum HistoryType {
    addEdit = 1,
    deleted = 2
}

interface IHistory {
    StartTime: Date;
    UserId: string;
    ProcessDuration: string;
    LogId: number;
}

declare class PropertyHistoryModel implements IHistory {
    Property: PropertyBase;
    LogId: number;
    ProcessDuration: string;
    Action: string;
    StartTime: Date;
    UserId: string;
    basicInfo: MetadataBasicInfoModel;
    properties: PropertyBase[];
    entityTypes: EntityTypeBase[];
    allPropertiesInfo: PropertyInfoModel[];
    historyType: HistoryType;
    constructor();
}

declare class EntityTypeHistoryModel implements IHistory {
    EntityType: EntityTypeBase;
    LogId: number;
    ProcessDuration: string;
    Action: string;
    StartTime: Date;
    UserId: string;
    basicInfo: MetadataBasicInfoModel;
    historyType: HistoryType;
    constructor();
}

declare class HistoryService {
    private http;
    private dscribeService;
    constructor(http: DscribeHttpClient, dscribeService: DscribeService);
    private getEntityTypeHistoryAPI;
    private getDeletedEntityTypeHistoryAPI;
    private getPropertyHistoryAPI;
    private getDeletedPropertyHistoryAPI;
    private getAppInstanceHistoryAPI;
    private getDeletedAppInstanceHistoryAPI;
    private getAppTypeHistoryAPI;
    private getDeletedAppTypeHistoryAPI;
    private getDataHistoryAPI;
    getEntityTypeHistory(data: EntityTypeHistoryModel): Observable<EntityTypeHistoryModel[]>;
    getDataHistory(entityName: string, data: string): Observable<any[]>;
    getDeletedEntityTypeHistory(): Observable<any>;
    getPropertyHistory(model: PropertyHistoryModel): Observable<PropertyHistoryModel[]>;
    getDeletedPropertyHistory(): Observable<any>;
    getAppInstanceHistory(model: CommentModel): Observable<any>;
    getDeletedAppInstanceHistory(model: CommentModel): Observable<any>;
    getAppTypeHistory(model: CommentModel): Observable<any>;
    getDeletedAppTypeHistory(model: CommentModel): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HistoryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HistoryService>;
}

declare class DataHistoryComponent implements OnInit {
    private dialogRef;
    data: any;
    private snackbarService;
    private historyService;
    datepipe: DatePipe;
    isLoading: boolean;
    historyData: any[];
    initialSelection: any[];
    allowMultiSelect: boolean;
    selection: SelectionModel<any>;
    columns: ListColumn[];
    displayedColumns: string[];
    entityTypesPaginator: MatPaginator;
    constructor(dialogRef: MatDialogRef<DataHistoryComponent>, data: any, snackbarService: SnackBarService, historyService: HistoryService, datepipe: DatePipe);
    ngOnInit(): void;
    getDataHistory(): void;
    selectRow(row: any): void;
    getAction(value: number): "Deleted" | "Added" | "Modified" | "Not implemented";
    static ɵfac: i0.ɵɵFactoryDeclaration<DataHistoryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataHistoryComponent, "dscribe-data-history", never, {}, {}, never, never, false, never>;
}

declare class DateEditorComponent {
    entity: any;
    property: PropertyMetadata;
    color: string;
    overridePropertyName: string;
    isFilter: boolean;
    onModelChange(event: any): void;
    makeNull(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateEditorComponent, "dscribe-date-editor", never, { "entity": { "alias": "entity"; "required": false; }; "property": { "alias": "property"; "required": false; }; "color": { "alias": "color"; "required": false; }; "overridePropertyName": { "alias": "overridePropertyName"; "required": false; }; "isFilter": { "alias": "isFilter"; "required": false; }; }, {}, never, never, false, never>;
}

declare class DatetimeEditorComponent {
    entity: any;
    property: PropertyMetadata;
    color: string;
    overridePropertyName: string;
    isFilter: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatetimeEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DatetimeEditorComponent, "dscribe-datetime-editor", never, { "entity": { "alias": "entity"; "required": false; }; "property": { "alias": "property"; "required": false; }; "color": { "alias": "color"; "required": false; }; "overridePropertyName": { "alias": "overridePropertyName"; "required": false; }; "isFilter": { "alias": "isFilter"; "required": false; }; }, {}, never, never, false, never>;
}

declare class EntityHistoryComponent implements OnInit {
    private dialogRef;
    data: EntityTypeHistoryModel;
    private snackbarService;
    private historyService;
    private entityHistories;
    isLoading: boolean;
    displayedEntityTypeColumns: string[];
    entityTypesDataSource: MatTableDataSource<EntityTypeHistoryModel, MatPaginator>;
    entityTypesPaginator: MatPaginator;
    constructor(dialogRef: MatDialogRef<EntityHistoryComponent>, data: EntityTypeHistoryModel, snackbarService: SnackBarService, historyService: HistoryService);
    ngOnInit(): void;
    setActionIcon(data: EntityTypeHistoryModel): "delete" | "add" | "edit";
    setActionColor(data: EntityTypeHistoryModel): {
        color: string;
    } | {
        color?: undefined;
    };
    getDeletedEntityHistory(): void;
    getEntityHistory(): void;
    getEntityTypeUsageName(id: number): string;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntityHistoryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EntityHistoryComponent, "dscribe-entity-history", never, {}, {}, never, never, false, never>;
}

declare class EntityListEditorComponent implements OnInit, OnChanges {
    private dataHandlerService;
    entity: any;
    property: PropertyMetadata;
    overridePropertyName: string;
    isFilter: boolean;
    master: MasterReference;
    items: HasIdName[];
    constructor(dataHandlerService: DataHandlerService);
    ngOnInit(): void;
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntityListEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EntityListEditorComponent, "dscribe-entity-list-editor", never, { "entity": { "alias": "entity"; "required": false; }; "property": { "alias": "property"; "required": false; }; "overridePropertyName": { "alias": "overridePropertyName"; "required": false; }; "isFilter": { "alias": "isFilter"; "required": false; }; }, {}, never, never, false, never>;
}

declare class EntitySelectComponent {
    entity: any;
    property: PropertyMetadata;
    color: string;
    list: any[];
    overridePropertyName: string;
    isFilter: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntitySelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EntitySelectComponent, "dscribe-entity-select", never, { "entity": { "alias": "entity"; "required": false; }; "property": { "alias": "property"; "required": false; }; "color": { "alias": "color"; "required": false; }; "list": { "alias": "list"; "required": false; }; "overridePropertyName": { "alias": "overridePropertyName"; "required": false; }; "isFilter": { "alias": "isFilter"; "required": false; }; }, {}, never, never, false, never>;
}

declare class EntityTypeGeneralUsageNamePipe implements PipeTransform {
    transform(value: any, args?: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntityTypeGeneralUsageNamePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<EntityTypeGeneralUsageNamePipe, "entityGeneralUsageName", false>;
}

declare class FilterNodeComponent {
    manipulator: FilterTreeManipulator;
    node: FilterNode;
    nodeTypes: typeof FilterNodeType;
    constructor(manipulator: FilterTreeManipulator);
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FilterNodeComponent, "dscribe-filter-node", never, { "node": { "alias": "node"; "required": false; }; }, {}, never, never, false, never>;
}

declare class KeysPipe implements PipeTransform {
    transform(value: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<KeysPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<KeysPipe, "keys", false>;
}

declare class LambdaFilterNodeComponent {
    node: LambdaFilterNode;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<LambdaFilterNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LambdaFilterNodeComponent, "dscribe-lambda-filter-node", never, { "node": { "alias": "node"; "required": false; }; }, {}, never, never, false, never>;
}

declare class ListAddNEditDialogComponent {
    dialogRef: MatDialogRef<ListAddNEditDialogComponent>;
    data: any;
    constructor(dialogRef: MatDialogRef<ListAddNEditDialogComponent>, data: any);
    get actionName(): string;
    afterEntitySaved(result: AddNEditResult): void;
    canceledByUser(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListAddNEditDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListAddNEditDialogComponent, "dscribe-list-add-n-edit-dialog", never, {}, {}, never, never, false, never>;
}

declare class ListContainerComponent implements OnInit {
    private metadata;
    private route;
    private router;
    private config;
    entityType: EntityTypeMetadata;
    entityTypes: EntityTypeMetadata[];
    navFixed: boolean;
    navOpened: boolean;
    clientRoot: string;
    private entityTypeName;
    constructor(metadata: MetadataService, route: ActivatedRoute, router: Router, config: DscribeService);
    ngOnInit(): void;
    private getCurrentEntityType;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListContainerComponent, "dscribe-list-container", never, {}, {}, never, never, false, never>;
}

declare class ListDeleteDialogComponent {
    dialogRef: MatDialogRef<ListDeleteDialogComponent>;
    private snackbarService;
    private dataHandler;
    inputs: {
        entityTypeName: string;
        title: string;
        selectedRow: any;
    };
    constructor(dialogRef: MatDialogRef<ListDeleteDialogComponent>, snackbarService: SnackBarService, dataHandler: DataHandlerService);
    deleteEntity(): void;
    private afterDelete;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListDeleteDialogComponent, [{ optional: true; }, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListDeleteDialogComponent, "dscribe-list-delete-dialog", never, {}, {}, never, never, false, never>;
}

declare class LogicalOperator {
    name: string;
    title: string;
    minNumberOfOperands: number;
    maxNumberOfOperands: number;
    constructor(name: string, title: string, minNumberOfOperands: number, maxNumberOfOperands: number);
    static logicalOperators: LogicalOperator[];
}

declare class LogicalFilterNode extends FilterNode {
    operators: LogicalOperator[];
    private _operator;
    private _children;
    constructor(parent: FilterNode);
    setStorageNodeProperties(storage: StorageFilterNode): void;
    applyStorageNode(storage: StorageFilterNode): void;
    childOutputTypeChanged(child: FilterNode): void;
    get nodeType(): FilterNodeType;
    get children(): FilterNode[];
    addChild(): void;
    removeChild(child: FilterNode): void;
    isEmpty(): boolean;
    isValid(): boolean;
    canReplaceChild(): boolean;
    replaceChild(oldChild: FilterNode, newChild: FilterNode): void;
    get operator(): LogicalOperator;
    set operator(value: LogicalOperator);
}

declare class LogicalFilterNodeComponent {
    manipulator: FilterTreeManipulator;
    node: LogicalFilterNode;
    constructor(manipulator: FilterTreeManipulator);
    static ɵfac: i0.ɵɵFactoryDeclaration<LogicalFilterNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LogicalFilterNodeComponent, "dscribe-logical-filter-node", never, { "node": { "alias": "node"; "required": false; }; }, {}, never, never, false, never>;
}

declare class MetadataManagementComponent implements OnInit {
    private apiClient;
    private dialog;
    private snackbarService;
    private dscribeService;
    basicInfo: MetadataBasicInfoModel;
    entityTypes: EntityTypeBase[];
    entityTypesDataSource: MatTableDataSource<EntityTypeBase, MatPaginator>;
    selectedEntityType: EntityTypeBase;
    entityTypesAreLoading: boolean;
    generateCodeLoading: boolean;
    deleteEntityLoading: boolean;
    deletePropertyLoading: boolean;
    properties: PropertyBase[];
    allPropertiesInfo: PropertyInfoModel[];
    propertiesDataSource: MatTableDataSource<PropertyBase, MatPaginator>;
    selectedProperty: PropertyBase;
    propertiesAreLoading: boolean;
    displayedEntityTypeColumns: string[];
    displayedPropertyColumns: string[];
    entityTypesPaginator: MatPaginator;
    propertiesPaginator: MatPaginator;
    constructor(apiClient: MetadataManagementApiClient, dialog: MatDialog, snackbarService: SnackBarService, dscribeService: DscribeService);
    ngOnInit(): void;
    refreshEntityTypes(): void;
    selectEntityType(entityType: EntityTypeBase): void;
    selectProperty(property: PropertyBase): void;
    refreshProperties(): void;
    getEntityTypeUsageName(id: number): string;
    getPropertyUsageName(id: number): string;
    getDataTypeName(id: number): string;
    getEntityTypeName(id: number): string;
    getPropertyName(id: number): string;
    addEntityType(): void;
    editEntityType(): void;
    deleteEntityType(): void;
    showEntityHistory(): void;
    showDeletedEntityTypeHistory(): void;
    showPropertyHistory(): void;
    showDeletedPropertiesTypeHistory(): void;
    openAddNEditEntityTypeDialog(instance: any, isNew: boolean): void;
    addProperty(): void;
    editProperty(): void;
    deleteProperty(): void;
    openAddNEditPropertyDialog(instance: AddNEditPropertyMetadataModel, isNew: boolean): void;
    openReleaseSettings(): void;
    generateCode(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MetadataManagementComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MetadataManagementComponent, "dscribe-metadata-management", never, {}, {}, never, never, false, never>;
}

declare class NavigationComponent implements OnInit {
    private router;
    private httpClient;
    config: DscribeService;
    appInstances: AppInstanceInformation[];
    selectedAppInstance: AppInstanceInformation;
    clientRoot: string;
    constructor(router: Router, httpClient: DscribeHttpClient, config: DscribeService);
    ngOnInit(): void;
    appInstanceSelected(appInstance: AppInstanceInformation): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavigationComponent, "dscribe-navigation", never, {}, {}, never, never, false, never>;
}

declare class AggregationOperator {
    name: string;
    title: string;
    hasFiltering: boolean;
    isBoolean: boolean;
    hasSelection: boolean;
    dataTypeMap: {
        [key: string]: string;
    };
    constructor(name: string, title: string, hasFiltering: boolean, isBoolean: boolean, hasSelection: boolean, dataTypeMap?: {
        [key: string]: string;
    });
    static Operators: AggregationOperator[];
}

declare class NavigationListFilterNode extends FilterNode {
    private _property;
    private _operator;
    operators: AggregationOperator[];
    filterSubNode: LambdaFilterNode;
    aggregationSelection: LambdaFilterNode;
    constructor(parent: FilterNode);
    get property(): PropertyMetadata;
    set property(value: PropertyMetadata);
    get hasFiltering(): boolean;
    get hasAggregationSelection(): boolean;
    getSelectionType(): HasTypeInfo;
    get operator(): AggregationOperator;
    set operator(value: AggregationOperator);
    setStorageNodeProperties(storage: StorageFilterNode): void;
    applyStorageNode(storage: StorageFilterNode): void;
    get inputType(): HasTypeInfo;
    set inputType(value: HasTypeInfo);
    childOutputTypeChanged(child: FilterNode): void;
    get children(): FilterNode[];
    get nodeType(): FilterNodeType;
    isEmpty(): boolean;
    isValid(): boolean;
}

declare class NavigationListFilterNodeComponent implements OnInit {
    node: NavigationListFilterNode;
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationListFilterNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavigationListFilterNodeComponent, "dscribe-navigation-list-filter-node", never, { "node": { "alias": "node"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NumberEditorComponent {
    entity: any;
    property: PropertyMetadata;
    color: string;
    overridePropertyName: string;
    isFilter: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumberEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NumberEditorComponent, "dscribe-number-editor", never, { "entity": { "alias": "entity"; "required": false; }; "property": { "alias": "property"; "required": false; }; "color": { "alias": "color"; "required": false; }; "overridePropertyName": { "alias": "overridePropertyName"; "required": false; }; "isFilter": { "alias": "isFilter"; "required": false; }; }, {}, never, never, false, never>;
}

declare class PropertyEditorComponent implements OnChanges {
    property: HasTypeInfo;
    entity: any;
    color: string;
    selectionList?: any[];
    dataType?: string;
    overridePropertyName: string;
    width: string;
    isFilter: boolean;
    inputType: string;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PropertyEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PropertyEditorComponent, "dscribe-property-editor", never, { "property": { "alias": "property"; "required": false; }; "entity": { "alias": "entity"; "required": false; }; "color": { "alias": "color"; "required": false; }; "selectionList": { "alias": "selectionList"; "required": false; }; "dataType": { "alias": "dataType"; "required": false; }; "overridePropertyName": { "alias": "overridePropertyName"; "required": false; }; "width": { "alias": "width"; "required": false; }; "isFilter": { "alias": "isFilter"; "required": false; }; }, {}, never, never, false, never>;
}

declare class PropertyFilterNode extends FilterNode {
    properties: PropertyMetadata[];
    private _property;
    child: FilterNode;
    constructor(parent: FilterNode);
    get property(): PropertyMetadata;
    set property(value: PropertyMetadata);
    get outputType(): HasTypeInfo;
    set outputType(value: HasTypeInfo);
    setStorageNodeProperties(storage: StorageFilterNode): void;
    applyStorageNode(storage: StorageFilterNode): void;
    get childInputType(): PropertyMetadata;
    get nodeType(): FilterNodeType;
    get children(): FilterNode[];
    isEmpty(): boolean;
    isValid(): boolean;
}

declare class PropertyFilterNodeComponent implements OnInit {
    manipulator: FilterTreeManipulator;
    node: PropertyFilterNode;
    nodeTypes: typeof FilterNodeType;
    constructor(manipulator: FilterTreeManipulator);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PropertyFilterNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PropertyFilterNodeComponent, "dscribe-property-filter-node", never, { "node": { "alias": "node"; "required": false; }; }, {}, never, never, false, never>;
}

declare class PropertyHistoryComponent implements OnInit {
    private dialogRef;
    data: PropertyHistoryModel;
    private snackbarService;
    private historyService;
    private propertyHistories;
    isLoading: boolean;
    selectedProperty: PropertyHistoryModel;
    displayedPropertyColumns: string[];
    propertiesDataSource: MatTableDataSource<PropertyHistoryModel, MatPaginator>;
    propertyPaginator: MatPaginator;
    constructor(dialogRef: MatDialogRef<PropertyHistoryComponent>, data: PropertyHistoryModel, snackbarService: SnackBarService, historyService: HistoryService);
    ngOnInit(): void;
    getEntityTypeName(id: number): string;
    getDataTypeName(id: number): string;
    getPropertyName(id: number): string;
    setActionIcon(data: PropertyHistoryModel): "delete" | "add" | "edit";
    setActionColor(data: PropertyHistoryModel): {
        color: string;
    } | {
        color?: undefined;
    };
    getPropertyHistory(): void;
    getDeletedPropertyHistory(): void;
    getPropertyUsageName(id: number): string;
    cancel(): void;
    selectProperty(prop: PropertyHistoryModel): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PropertyHistoryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PropertyHistoryComponent, "dscribe-property-history", never, {}, {}, never, never, false, never>;
}

declare class ReleaseMetadataSettingsComponent implements OnInit {
    private dialogRef;
    private data;
    private apiClient;
    private snackbarService;
    releaseSettings: ReleaseMetadataRequest;
    releaseSettingsError: ReleaseMetadataRequest;
    submitLoading: boolean;
    constructor(dialogRef: MatDialogRef<ReleaseMetadataSettingsComponent>, data: any, apiClient: MetadataManagementApiClient, snackbarService: SnackBarService);
    ngOnInit(): void;
    release(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReleaseMetadataSettingsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReleaseMetadataSettingsComponent, "dscribe-release-metadata-settings", never, {}, {}, never, never, false, never>;
}

declare class ReportsListComponent implements OnInit {
    private lobInfo;
    private dialogRef;
    data: LobListDialogData;
    reports: ReportsListResponse[];
    displayedColumns: string[];
    selection: SelectionModel<ReportsListResponse>;
    attachmentTitle: string;
    attachmentDescription: string;
    private _mode;
    get mode(): string;
    set mode(v: string);
    constructor(lobInfo: LobInfoService, dialogRef: MatDialogRef<ReportsListComponent>, data: LobListDialogData);
    ngOnInit(): void;
    ok(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReportsListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReportsListComponent, "dscribe-reports-list", never, {}, {}, never, never, false, never>;
}

declare class SettingModel {
    name: string;
    url: string;
}

declare class SettingsComponent implements OnInit {
    settingItems: SettingModel[];
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SettingsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SettingsComponent, "dscribe-host-settings", never, {}, {}, never, never, false, never>;
}

declare class TextEditorComponent {
    entity: any;
    property: PropertyMetadata;
    color: string;
    overridePropertyName: string;
    isFilter: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextEditorComponent, "dscribe-text-editor", never, { "entity": { "alias": "entity"; "required": false; }; "property": { "alias": "property"; "required": false; }; "color": { "alias": "color"; "required": false; }; "overridePropertyName": { "alias": "overridePropertyName"; "required": false; }; "isFilter": { "alias": "isFilter"; "required": false; }; }, {}, never, never, false, never>;
}

declare class UsersAndRolesManagementComponent implements OnInit {
    isLoadingResults: boolean;
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UsersAndRolesManagementComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UsersAndRolesManagementComponent, "dscribe-users-and-roles-management", never, {}, {}, never, never, false, never>;
}

declare class CommandButtonComponent implements OnInit {
    command: DscribeCommand;
    execute: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    performAction(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CommandButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CommandButtonComponent, "dscribe-command-button", never, { "command": { "alias": "command"; "required": false; }; }, { "execute": "execute"; }, never, never, false, never>;
}

declare class DscribeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DscribeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DscribeModule, [typeof ArithmeticFilterNodeComponent, typeof AttachmentsListComponent, typeof AutoCompleteMoreDialogComponent, typeof AddNEditAppInstanceComponent, typeof AddNEditAppTypeComponent, typeof AddNEditComponent, typeof AddNEditEntityTypeComponent, typeof AddNEditPropertyComponent, typeof AppInstanceManagementComponent, typeof AppTypeManagementComponent, typeof BoolEditorComponent, typeof CommentsListComponent, typeof ComparisonFilterNodeComponent, typeof ConfirmationDialogComponent, typeof ConstantFilterNodeComponent, typeof CustomTemplateHostComponent, typeof DataHistoryComponent, typeof DateEditorComponent, typeof DatetimeEditorComponent, typeof DisplayValuePipe, typeof DscribeComponent, typeof EntityAutoCompleteComponent, typeof EntityHistoryComponent, typeof EntityListEditorComponent, typeof EntitySelectComponent, typeof EntityTypeGeneralUsageNamePipe, typeof FilterNodeComponent, typeof KeysPipe, typeof LambdaFilterNodeComponent, typeof ListAddNEditDialogComponent, typeof ListComponent, typeof ListContainerComponent, typeof ListDeleteDialogComponent, typeof LogicalFilterNodeComponent, typeof MetadataManagementComponent, typeof NavigationComponent, typeof NavigationListFilterNodeComponent, typeof NumberEditorComponent, typeof PropertyEditorComponent, typeof PropertyFilterNodeComponent, typeof PropertyHistoryComponent, typeof ReleaseMetadataSettingsComponent, typeof ReportsListComponent, typeof SettingsComponent, typeof TableTemplateComponent, typeof TextEditorComponent, typeof UsersAndRolesManagementComponent, typeof CommandButtonComponent], [typeof i48.CommonModule, typeof i49.BrowserAnimationsModule, typeof _angular_common_http.HttpClientModule, typeof i51.FormsModule, typeof i51.ReactiveFormsModule, typeof i52.RouterModule, typeof i53.MatAutocompleteModule, typeof i54.MatBadgeModule, typeof i55.MatButtonModule, typeof i56.MatButtonToggleModule, typeof i57.MatCardModule, typeof i58.MatCheckboxModule, typeof i59.MatDatepickerModule, typeof i60.MatDialogModule, typeof i61.MatFormFieldModule, typeof i62.MatIconModule, typeof i63.MatInputModule, typeof i64.MatListModule, typeof i65.MatMenuModule, typeof i66.MatNativeDateModule, typeof i67.MatPaginatorModule, typeof i68.MatProgressBarModule, typeof i69.MatProgressSpinnerModule, typeof i70.MatRadioModule, typeof i71.MatSelectModule, typeof i72.MatSidenavModule, typeof i73.MatSnackBarModule, typeof i74.MatSortModule, typeof i75.MatTableModule, typeof i76.MatTabsModule, typeof i77.MatToolbarModule, typeof i78.MatTooltipModule], [typeof DscribeComponent, typeof ListComponent, typeof DisplayValuePipe, typeof ConfirmationDialogComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DscribeModule>;
}

declare const DSCRIBE_ROUTES: ({
    path: string;
    component: typeof NavigationComponent;
    children: ({
        path: string;
        component: typeof ListContainerComponent;
        children?: undefined;
        redirectTo?: undefined;
        pathMatch?: undefined;
    } | {
        path: string;
        component: typeof MetadataManagementComponent;
        children?: undefined;
        redirectTo?: undefined;
        pathMatch?: undefined;
    } | {
        path: string;
        component: typeof UsersAndRolesManagementComponent;
        children?: undefined;
        redirectTo?: undefined;
        pathMatch?: undefined;
    } | {
        path: string;
        component: typeof SettingsComponent;
        children: ({
            path: string;
            component: typeof AppInstanceManagementComponent;
        } | {
            path: string;
            component: typeof AppTypeManagementComponent;
        })[];
        redirectTo?: undefined;
        pathMatch?: undefined;
    } | {
        path: string;
        redirectTo: string;
        pathMatch: string;
        component?: undefined;
        children?: undefined;
    })[];
    redirectTo?: undefined;
} | {
    path: string;
    redirectTo: string;
    component?: undefined;
    children?: undefined;
})[];

interface DscribeConfig {
    appInstanceId: number;
    appInstance: AppInstanceInformation;
    authHeaderFetcher: () => string;
    serverRoot: string;
    clientRoot: string;
    username: string;
}

export { AppInstanceInformation, AppInstanceModel, AppManagementService, ConfirmationDialogComponent, ConfirmationDialogData, DSCRIBE_ROUTES, DataHandlerService, DisplayValuePipe, DscribeComponent, DscribeFeatureArea, DscribeHttpClient, DscribeInterceptor, DscribeListTemplate, DscribeModule, DscribeService, EntityTypeMetadata, ListComponent, MetadataManagementComponent, MetadataService, SnackBarService };
export type { BadgeInfo, DscribeCommand, DscribeCommandCallbackInput, DscribeCommandDisplayPredicate, DscribeConfig, DscribeTemplateComponent };
