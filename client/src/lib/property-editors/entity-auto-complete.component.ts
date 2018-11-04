import {Component, Inject, Input, OnChanges, OnInit, Optional, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatAutocompleteTrigger, MatDialog, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {DataHandlerService} from '../common/services/data-handler.service';
import {PropertyMetadata} from '../metadata/property-metadata';
import {map, mergeMap, share, startWith} from 'rxjs/operators';
import {EntityTypeMetadata} from '../metadata/entity-type-metadata';
import {ListAddNEditDialogComponent} from '../list/list-add-n-edit-dialog/list-add-n-edit-dialog.component';
import {AddNEditResult} from '../common/models/add-n-edit-result';

@Component({
	selector: 'dscribe-entity-auto-complete-component',
	templateUrl: './entity-auto-complete.component.html',
	styleUrls: ['./entity-auto-complete.component.scss']
})
export class EntityAutoCompleteComponent implements OnInit, OnChanges {
	@Input() entity: any;
	@Input() property: PropertyMetadata;
	@Input() color: string;
	@Input() overridePropertyName: string;
	@Input() isFilter: boolean;

	inputCtrl = new FormControl();
	filteredOptions: Observable<{ displayName: string, id: number }[]>;
	listRefresher = true;
	selection: { displayName: string, id: number };
	loading = false;
	isAutoCompleteOpen: boolean;

	@ViewChild(MatAutocompleteTrigger)
	trigger: MatAutocompleteTrigger;

	constructor(private dataHandler: DataHandlerService, private dialog: MatDialog) {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.entity) {
			const id = this.entity[this.overridePropertyName || this.property.jsName];
			if (!id) {
				this.selection = null;
				this.inputCtrl.setValue(this.selection);
				return;
			}
			this.dataHandler.getName(this.property.entityTypeName, id)
				.subscribe(result => {
					this.selection = {displayName: result, id: id};
					this.inputCtrl.setValue(this.selection);
				});
		}
	}

	ngOnInit() {
		this.filteredOptions = this.inputCtrl.valueChanges
			.pipe(
				startWith({name: null})
				, map(idName => {
					return idName && typeof idName === 'object' ? idName.name : idName;
				})
				, mergeMap(name => this.filter(name))
				, share());
	}

	filter(name: string): Observable<{ displayName: string, id: number }[]> {
		if (name) {
			this.trigger.autocompleteDisabled = false;
		}
		return this.dataHandler.getAutoCompleteItems(this.property.entityTypeName, name);
	}

	displayFn(): string {
		return this.selection ? this.selection.displayName : '';
	}

	selectionChange(item) {
		this.selection = item;
		this.entity[this.overridePropertyName || this.property.jsName] = item && item.id;
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
		} else {
			this.trigger.autocompleteDisabled = false;
			this.trigger.openPanel();
		}
	}

	selectFromList() {
		const data = {
			entity: this.property.entityType,
			selectedRow: null
		};
		this.dialog.open(AutoCompleteMoreDialogComponent, {
			width: '800px',
			data: data
		}).afterClosed().subscribe(x => {
			if (!x) {
				return;
			}
			this.dataHandler.getName(this.property.entityTypeName, data.selectedRow.id)
				.subscribe(y => {
					this.selectionChange({
						id: data.selectedRow.id,
						displayName: y
					});
				});
		});
	}

	addNew() {
		this.dialog.open(ListAddNEditDialogComponent, {
			width: '800px',
			data: {
				entity: {},
				action: 'add',
				entityTypeName: this.property.entityType.name,
				title: this.property.entityType.singularTitle,
				master: null
			}
		}).afterClosed().subscribe((x: AddNEditResult) => {
			if (!x) {
				return;
			}
			this.dataHandler.getName(this.property.entityTypeName, x.instance.id)
				.subscribe(y => {
					this.selectionChange({
						id: x.instance.id,
						displayName: y
					});
				});
		});
	}

}

@Component({
	template: `
		<mat-dialog-content>
			<h1 class="page-header">{{inputs.entityType.pluralTitle}}</h1>
			<dscribe-list
				[hideFilter]="false"
				[entityType]="inputs.entityType"
				(selectionChanged)="listRowSelectionChanged($event)">
			</dscribe-list>
		</mat-dialog-content>
		<mat-dialog-actions>
			<button mat-raised-button color="primary" (click)="doneClicked()">تایید</button>
		</mat-dialog-actions>
	`
})
export class AutoCompleteMoreDialogComponent {
	inputs: {
		entityType: EntityTypeMetadata,
		title: string,
		selectedRow: any
	};

	constructor(@Optional() public dialogRef: MatDialogRef<AutoCompleteMoreDialogComponent>,
							@Inject(MAT_DIALOG_DATA) public data: any) {
		this.inputs = data;
	}

	listRowSelectionChanged(row: any) {
		this.inputs.selectedRow = row;
	}

	doneClicked() {
		this.dialogRef.close(this.inputs.selectedRow);
	}

}
