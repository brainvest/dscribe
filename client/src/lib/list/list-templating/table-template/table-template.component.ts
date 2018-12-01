import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {ListColumn} from '../../models/list-column';
import {MatSort} from '@angular/material';

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

	@Output() rowClick = new EventEmitter<any>();
	@ViewChild(MatSort) sort: MatSort;

}
