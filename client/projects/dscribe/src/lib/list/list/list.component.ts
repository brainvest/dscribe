import {Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
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
import {SelectionChange, SelectionModel} from '@angular/cdk/collections';
import {DataTypes} from '../../metadata/data-types';

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
	selectedRow: any = null;
	filterLambda: LambdaFilterNode;
	userDefinedFilter: StorageFilterNode;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private metadataService: MetadataService,
							private dataHandler: DataHandlerService,
							private dialog: MatDialog) {
		this.selection.onChange.subscribe(x => this.selectionChanged(x));
	}

	ngOnInit() {
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		FilterNode.factory = new FilterNodeFactory();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.entity) {
			if (this.entity.name === this.displayedEntityType) {
				return;
			}
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
				prop.jsName
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
		this.selectedRow = null;
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

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.data.forEach(row => this.selection.select(row));
	}

	selectRow(row: any) {
		this.selectedRow = row;
		if (this.detailLists && this.detailLists.length) {
			for (const detail of this.detailLists) {
				detail.master = this.selectedRow;
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

	private selectionChanged(x: SelectionChange<any>) {
		if (x.added.length === 1) {
			this.selectRow(x.added[0]);
		}
	}
}
