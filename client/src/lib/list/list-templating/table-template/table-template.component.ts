import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ListColumn } from '../../models/list-column';
import { MatSort } from '@angular/material';

@Component({
	selector: 'dscribe-table-template',
	templateUrl: './table-template.component.html',
	styleUrls: ['./table-template.component.css']
})
export class TableTemplateComponent {
	@Input() data: any[];
	@Input() selection: SelectionModel<any>;
	@Input() columns: ListColumn[];
	@Input() displayedColumns: string[];
	@Input() hideAdditionFeature: boolean;

	@Output() rowClick = new EventEmitter<any>();
	@Output() commentsClick = new EventEmitter<any>();
	@Output() attachmentsClick = new EventEmitter<any>();
	@ViewChild(MatSort, { static: true }) sort: MatSort;

}
