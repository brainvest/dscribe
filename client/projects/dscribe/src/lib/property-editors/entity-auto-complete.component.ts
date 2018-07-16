import {Component, Input, OnChanges, OnInit, Optional, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {DataHandlerService} from '../common/services/data-handler.service';
import {PropertyMetadata} from '../metadata/property-metadata';
import {map, mergeMap, share, startWith} from 'rxjs/operators';
import {MetadataService} from '../common/services/metadata.service';
import {EntityMetadata} from '../metadata/entity-metadata';

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

	constructor(private dataHandler: DataHandlerService) {
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
		return this.dataHandler.getAutoCompleteItems(this.property.entityTypeName, name);
	}

	displayFn(): string {
		return this.selection ? this.selection.displayName : '';
	}

	selectionChange(item) {
		this.selection = item;
		this.entity[this.overridePropertyName || this.property.jsName] = item.id;
	}
}

@Component({
	template: `
		<mat-dialog-content>
			<h1 class="page-header">{{inputs.entity.pluralTitle}}</h1>
			<dscribe-list
				[showFilter]="true"
				[entity]="inputs.entity"
				(RowSelectionChanged)="listRowSelectionChanged($event)">
			</dscribe-list>
		</mat-dialog-content>
		<mat-dialog-actions>
			<button mat-raised-button color="primary" (click)="doneClicked()">تایید</button>
		</mat-dialog-actions>
	`,
	providers: [MetadataService]
})
export class AutoCompleteMoreDialogComponent {
	inputs: {
		entity: EntityMetadata,
		title: string,
		selectedRow: any
	};

	constructor(@Optional() public dialogRef: MatDialogRef<AutoCompleteMoreDialogComponent>) {
	}

	listRowSelectionChanged(row: any) {
		this.inputs.selectedRow = row;
	}

	doneClicked() {
		this.dialogRef.close(this.inputs.selectedRow);
	}
}
