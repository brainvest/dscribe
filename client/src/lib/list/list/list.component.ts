import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Type, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MetadataService} from '../../common/services/metadata.service';
import {DataHandlerService} from '../../common/services/data-handler.service';
import {EntityTypeMetadata} from '../../metadata/entity-type-metadata';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge, of} from 'rxjs';
import {EntityListRequest} from '../../common/models/entity-list-request';
import {SortItem} from '../../common/models/sort-item';
import {ListColumn} from '../models/list-column';
import {KnownFacets} from '../../metadata/facets/known-facet';
import {MasterReference} from '../models/master-reference';
import {HasId} from '../../common/models/has-id';
import {ListAddNEditDialogComponent} from '../list-add-n-edit-dialog/list-add-n-edit-dialog.component';
import {ListDeleteDialogComponent} from '../list-delete-dialog/list-delete-dialog.component';
import {LambdaFilterNode} from '../../filtering/models/filter-nodes/lambda-filter-node';
import {StorageFilterNode} from '../../filtering/models/storage-filter-node';
import {LambdaHelper} from '../../helpers/lambda-helper';
import {FilterNode} from '../../filtering/models/filter-nodes/filter-node';
import {FilterNodeFactory} from '../../filtering/models/filter-node-factory';
import {SelectionModel} from '@angular/cdk/collections';
import {DataTypes} from '../../metadata/data-types';
import {TableTemplateComponent} from '../list-templating/table-template/table-template.component';
import {EntityTypeTemplateMapper} from '../list-templating/entity-type-template-mapper';
import {DscribeService} from '../../dscribe.service';
import {DscribeFeatureArea} from '../../models/dscribe-feature-area.enum';
import {DscribeCommand} from '../../models/dscribe-command';
import {DscribeCommandCallbackInput} from '../../models/dscribe-command-callback-input';
import {DscribeCommandDisplayPredicate} from '../../models/dscribe-command-display-predicate';
import {SnackBarService} from '../../common/notifications/snackbar.service';
import {ManageEntityModes} from '../../add-n-edit/models/manage-entity-modes';
import {AddNEditResult} from '../../common/models/add-n-edit-result';
import {AddNEditStructure, ListBehaviors} from '../../add-n-edit/models/add-n-edit-structure';
import {LobInfoService} from '../../lob-tools/lob-info.service';
import {CommentsListComponent} from '../../lob-tools/comments/comments-list/comments-list.component';
import {LobListDialogData} from '../../lob-tools/models/common-models';
import {AttachmentsListComponent} from '../../lob-tools/attachments/attachments-list/attachments-list.component';
import {ReportsListResponse} from '../../lob-tools/models/report-models';
import {ReportsListComponent} from '../../lob-tools/reporting/reports-list/reports-list.component';
import {ManageCommentModes} from '../../lob-tools/models/manage-comment-modes';
import {DataHistoryComponent} from '../data-history/data-history.component';

@Component({
	selector: 'dscribe-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit, OnChanges {
	initialSelection = [];
	allowMultiSelect = false;
	selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

	@Input() entityType: EntityTypeMetadata;
	@Input() masters: MasterReference[];
	@Input() hideFilter: boolean;
	@Input() addNEditStructure: AddNEditStructure;
	@Input() hasNav: boolean;

	@Output() selectionChanged = new EventEmitter<any>();
	@Output() navToggled = new EventEmitter<any>();

	detailLists?: MasterReference[];
	displayedColumns = [];
	columns: ListColumn[] = [];
	data = [];
	totalCount = 0;
	private displayedEntityTypeName: string;
	isLoadingResults = false;
	isDataConnected = false;
	userRefresh: EventEmitter<null> = new EventEmitter<null>();
	pageSize = 10;
	filterLambda: LambdaFilterNode;
	userDefinedFilter: StorageFilterNode;
	reports: ReportsListResponse[];

	displayMode = 'grid';

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(TableTemplateComponent) table: TableTemplateComponent;
	sort: MatSort;
	private customTemplate: { component: Type<any>; options?: any };
	filterCommands: DscribeCommand[] = [];
	listCommands: DscribeCommand[] = [];

	constructor(
		private metadataService: MetadataService,
		private dataHandler: DataHandlerService,
		private dialog: MatDialog,
		private dscribeService: DscribeService,
		private snackbarService: SnackBarService,
		private lobService: LobInfoService) {
		this.selection.changed.subscribe((x: any) => {
			if (x.added.length === 1) {
				this.selectDetails(x.added[0]);
			}
		}, (errors: any) => {
			// this.snackbarService.open(errors);
		});
	}

	ngOnInit() {
		FilterNode.factory = new FilterNodeFactory();
		this.dscribeService.getCommands().subscribe(
			(commands: DscribeCommand[]) => {
				this.filterCommands = commands.filter(x =>
					x.featureAreas === DscribeFeatureArea.Filter || (Array.isArray(x.featureAreas) && x.featureAreas.includes(DscribeFeatureArea.Filter))
				);
				this.listCommands = commands.filter(x =>
					x.featureAreas === DscribeFeatureArea.List || (Array.isArray(x.featureAreas) && x.featureAreas.includes(DscribeFeatureArea.List))
				);
			}, (errors: any) => {
				this.snackbarService.open(errors);
			});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.entityType) {
			if (this.entityType.Name === this.displayedEntityTypeName) {
				return;
			}
			if (this.filterVisible) {
				this.setFilterToEmpty();
			}
			this.customTemplate = EntityTypeTemplateMapper.get(this.entityType.Name);
			if (this.customTemplate) {
				this.displayMode = 'card';
			} else {
				this.displayMode = 'grid';
			}
			if (this.table) {
				this.sort = this.table.sort;
			} else {
				this.sort = new MatSort();
			}
			this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
			this.displayedEntityTypeName = this.entityType.Name;
			this.refreshData();
			this.createColumns(this.entityType);
			this.lobService.getReports(this.displayedEntityTypeName)
				.subscribe(x => this.reports = x);
		}
	}

	createColumns(entityType: EntityTypeMetadata) {
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
			this.columns.push(new ListColumn(
				prop.Name,
				prop.Title,
				prop.DataType,
				prop.EntityTypeName,
				prop.Behaviors
			));
			if (prop && prop.FacetValues && prop.FacetValues[KnownFacets.HideInList]) {
				continue;
			}
			if (this.masters) {
				const master = this.masters.find(m =>
					m.masterProperty
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

	applyFilter(doNotRefres: boolean = false) {
		if (this.filterLambda) {
			this.userDefinedFilter = this.filterLambda.getStorageNode();
		} else {
			this.userDefinedFilter = null;
		}
		if (!doNotRefres) {
			this.refreshData();
		}
	}

	getCurrentFilters(): StorageFilterNode[] {
		const filters: StorageFilterNode[] = [];
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
			.subscribe(
				(data: any) => {
					this.totalCount = data;
					if (this.masters) {
						for (const master of this.masters) {
							master.count = this.totalCount;
						}
					}
					this.userRefresh.emit();
				}, (errors: any) => {
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
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoadingResults = true;
					const sort = [];
					if (this.sort.active) {
						sort.push(new SortItem(this.sort.active, this.sort.direction === 'desc'));
					}
					return this.dataHandler.getByFilter(
						new EntityListRequest(
							this.entityType.Name,
							this.getCurrentFilters(),
							this.paginator.pageIndex * this.pageSize,
							this.pageSize, sort));
				}),
				map(data => {
					this.isLoadingResults = false;
					return data;
				}),
				catchError((errors: any) => {
					// this.snackbarService.open(errors);
					this.isLoadingResults = false;
					return of([]);
				})
			).subscribe((data: any) => {
			this.data = data;
			this.lobService.setLobInfo(this.entityType, data);
		}, (errors: any) => {
			// this.snackbarService.open(errors);
		});
	}

	onMasterChanged() {
		this.refreshData();
	}

	addNew() {
		const newEntity = {};
		if (this.masters) {
			for (const master of this.masters) {
				if (master.master
					&& master.masterProperty
					&& master.masterProperty.InverseProperty
					&& master.masterProperty.InverseProperty.ForeignKeyName) {
					newEntity[master.masterProperty.InverseProperty.ForeignKeyName] = (master.master as HasId).Id;
				}
			}
		}
		this.openAddNEditDialog(newEntity, true);
	}

	createNewItem(): any {
		return {};
	}

	selectDetails(row: any) {
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
		const data: LobListDialogData = new LobListDialogData();
		data.entityTypeName = this.entityType.Name;
		data.identifier = this.selection.selected[0].Id;
		data.mode = ManageCommentModes.manage;
		const dialogRef = this.dialog.open(CommentsListComponent, {
			width: '800px',
			data,
			disableClose: true
		});
		dialogRef.afterClosed().subscribe(
			(res: any) => {
				this.refreshData();
			}
		);
	}

	openAddNEditDialog(instance: any, isNew: boolean) {
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
		dialogRef.afterClosed().subscribe(
			(result: AddNEditResult) => {
				if (result && result.action === action) {
					this.refreshData();
				}
			}, (errors: any) => {
				// this.snackbarService.open(errors);
			}
		);
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
		dialogRef.afterClosed().subscribe(
			(res => {

			})
		);
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

		deleteDialogRef.afterClosed().subscribe((result: any) => {
			if (result === 'deleted') {
				this.refreshData();
			}
		}, (errors: any) => {
			// this.snackbarService.open(errors);
		});
	}

	selectRow(row: any) {
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
		} else {
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

	getCustomTemplateWidth(): string {
		return `calc(${100 / this.customTemplate.options.perRow}% - 48px)`;
	}

	callFilterCommand(command: DscribeCommand) {
		command.callback(<DscribeCommandCallbackInput<ListComponent>>{
			area: DscribeFeatureArea.Filter, sourceComponent: this
		});
	}

	callListCommand(command: DscribeCommand) {
		command.callback(<DscribeCommandCallbackInput<ListComponent>>{
			area: DscribeFeatureArea.List, sourceComponent: this
		});
	}

	shouldDisplayCommand(command: DscribeCommand) {
		return !command.displayPredicate || command.displayPredicate(<DscribeCommandDisplayPredicate<ListComponent>>{component: this});
	}

	toggleNav() {
		this.navToggled.next();
	}

	showComments(row: any) {
		const pkName = this.entityType.getPrimaryKey().Name;
		this.dialog.open(CommentsListComponent, {
			width: '800px',
			data: <LobListDialogData>{
				entityTypeName: this.displayedEntityTypeName,
				identifier: row[pkName],
				mode: ManageCommentModes.view
			}
		});
	}

	showAttachments(row: any) {
		const pkName = this.entityType.getPrimaryKey().Name;
		this.dialog.open(AttachmentsListComponent, {
			width: '800px',
			data: <LobListDialogData>{
				entityTypeName: this.displayedEntityTypeName,
				identifier: row[pkName]
			}
		});
	}

	showReports() {
		const pkName = this.entityType.getPrimaryKey().Name;
		this.dialog.open(ReportsListComponent, {
			width: '800px',
			data: <LobListDialogData>{
				entityTypeName: this.displayedEntityTypeName,
				identifier: this.selection.selected[0][pkName]
			}
		});
	}

}
