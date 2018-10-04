import {Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, Type, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {MetadataService} from '../../common/services/metadata.service';
import {DataHandlerService} from '../../common/services/data-handler.service';
import {EntityMetadata} from '../../metadata/entity-metadata';
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
import {EntityTemplateMapper} from '../list-templating/entity-template-mapper';
import {DscribeService} from '../../dscribe.service';
import {DscribeFeatureArea} from '../../models/dscribe-feature-area.enum';
import {DscribeCommand} from '../../models/dscribe-command';
import {DscribeCommandCallbackInput} from '../../models/dscribe-command-callback-input';
import {DscribeCommandDisplayPredicate} from '../../models/dscribe-command-display-predicate';

@Component({
	selector: 'dscribe-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit, OnChanges {
	initialSelection = [];
	allowMultiSelect = false;
	selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

	@Input() entity: EntityMetadata;
	@Input() master: MasterReference;
	@Input() hideFilter: boolean;

	detailLists?: MasterReference[];
	displayedColumns = ['select'];
	columns: ListColumn[] = [];
	data = [];
	totalCount = 0;
	private displayedEntityType: string;
	isLoadingResults = true;
	isDataConnected = false;
	userRefresh: EventEmitter<null> = new EventEmitter<null>();
	pageSize = 10;
	filterLambda: LambdaFilterNode;
	userDefinedFilter: StorageFilterNode;

	displayMode = 'grid';

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(TableTemplateComponent) table: TableTemplateComponent;
	sort: MatSort;
	private customTemplate: { component: Type<any>; options?: any };
	filterCommands: DscribeCommand[];

	constructor(private metadataService: MetadataService, private dataHandler: DataHandlerService,
							private dialog: MatDialog, private dscribeService: DscribeService) {
		this.selection.changed.subscribe(x => {
			if (x.added.length === 1) {
				this.selectDetails(x.added[0]);
			}
		});
	}

	ngOnInit() {
		FilterNode.factory = new FilterNodeFactory();
		this.dscribeService.getCommands().subscribe(commands => {
			this.filterCommands = commands.filter(x =>
				x.featureAreas === DscribeFeatureArea.Filter || x.featureAreas.includes(DscribeFeatureArea.Filter)
			);
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.entity) {
			if (this.entity.name === this.displayedEntityType) {
				return;
			}
			this.customTemplate = EntityTemplateMapper.get(this.entity.name);
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
			this.displayedEntityType = this.entity.name;
			this.refreshData();
			this.createColumns(this.entity);
		}
	}

	createColumns(entity: EntityMetadata) {
		this.detailLists = [];
		this.columns = [];
		this.displayedColumns = ['select'];
		for (const propertyName in entity.properties) {
			if (!entity.properties.hasOwnProperty(propertyName)) {
				continue;
			}
			const prop = entity.properties[propertyName];
			if (prop.dataType === DataTypes.NavigationList) {
				if (prop && prop.facetValues && prop.facetValues[KnownFacets.HideInList]) {
					continue;
				}
				if (this.master) {
					continue;
				}
				if (!this.detailLists) {
					this.detailLists = [];
				}
				this.detailLists.push(new MasterReference(null, prop, entity));
				continue;
			}
			this.columns.push(new ListColumn(
				prop.name,
				prop.title,
				prop.jsName,
				prop.dataType,
				prop.entityTypeName
			));
			if (prop && prop.facetValues && prop.facetValues[KnownFacets.HideInList]) {
				continue;
			}
			if (this.master) {
				this.master.childList = this;
				if (this.master.masterProperty
					&& this.master.masterProperty.inverseProperty
					&& this.master.masterProperty.inverseProperty.foreignKeyName
					=== prop.name) {
					continue;
				}
			}
			this.displayedColumns.push(prop.name);
		}
		console.log(this.detailLists);
	}

	applyFilter() {
		if (this.filterLambda) {
			this.userDefinedFilter = this.filterLambda.getStorageNode();
		} else {
			this.userDefinedFilter = null;
		}
		this.refreshData();
	}

	getCurrentFilters(): StorageFilterNode[] {
		const filters: StorageFilterNode[] = [];
		const masterDetail = LambdaHelper.getMasterDetailFilter(this.master, this.entity);
		if (masterDetail) {
			filters.push(masterDetail.getStorageNode());
		}
		if (this.userDefinedFilter) {
			filters.push(this.userDefinedFilter);
		}
		return filters;
	}

	refreshData() {
		this.isLoadingResults = true;
		this.paginator.pageIndex = 0;
		this.data = [];
		this.connectData();
		this.dataHandler.countByFilter(new EntityListRequest(this.entity.name, this.getCurrentFilters())).subscribe((data) => {
			this.totalCount = data;
			this.userRefresh.emit();
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
					return this.dataHandler.getByFilter(new EntityListRequest(this.entity.name, this.getCurrentFilters(),
						this.paginator.pageIndex * this.pageSize, this.pageSize, sort));
				}),
				map(data => {
					this.isLoadingResults = false;
					return data;
				}),
				catchError(() => {
					this.isLoadingResults = false;
					return of([]);
				})
			).subscribe(data => this.data = data);
	}

	onMasterChanged() {
		this.refreshData();
	}

	addNew() {
		const newEntity = {};
		if (this.master
			&& this.master.master
			&& this.master.masterProperty
			&& this.master.masterProperty.inverseProperty
			&& this.master.masterProperty.inverseProperty.foreignKeyName) {
			newEntity[this.master.masterProperty.inverseProperty.foreignKeyName] = (this.master.master as HasId).id;
		}
		this.openAddNEditDialog(newEntity, true);
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

	editRow(row: any) {
		this.openAddNEditDialog(row, false);
	}

	openAddNEditDialog(instance: any, isNew: boolean) {
		const dialogRef = this.dialog.open(ListAddNEditDialogComponent, {
			width: '800px',
			data: {
				entity: instance,
				action: isNew ? 'add' : 'edit',
				entityType: this.entity.name,
				title: this.entity.singularTitle,
				master: this.master
			}
		});
		dialogRef.afterClosed().subscribe(
			result => {
				if (result === 'saved') {
					this.refreshData();
				}
			}
		);
	}

	deleteSelected() {
		const deleteDialogRef = this.dialog.open(ListDeleteDialogComponent, {
			width: '300px'
		});
		deleteDialogRef.componentInstance.inputs = {
			entityType: this.entity.name,
			title: this.entity.singularTitle,
			selectedRow: this.selection.selected[0]
		};

		deleteDialogRef.afterClosed().subscribe((result) => {
				if (result === 'deleted') {
					this.refreshData();
				}
			}
		);
	}

	toggleFilter() {
		if (this.filterLambda) {
			this.filterLambda = null;
		} else {
			this.filterLambda = new LambdaFilterNode(null, this.entity, false);
		}
	}

	getCustomTemplateWidth(): string {
		return `calc(${100 / this.customTemplate.options.perRow}% - 48px)`;
	}

	callFilterCommand(command: DscribeCommand) {
		command.callback(<DscribeCommandCallbackInput<ListComponent>> {
			area: DscribeFeatureArea.Filter, sourceComponent: this
		});
	}

	shouldDisplayCommand(command: DscribeCommand) {
		return command.displayPredicate(<DscribeCommandDisplayPredicate<ListComponent>>{component: this});
	}

	customTemplateSelected(instance: any) {
		if (!this.allowMultiSelect) {
			this.selection.clear();
		}
		this.selection.select(instance);
		this.selectDetails(instance);
	}
}
