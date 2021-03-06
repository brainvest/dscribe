﻿import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PropertyMetadata } from '../metadata/property-metadata';
import { MasterReference } from '../list/models/master-reference';
import { HasIdName } from '../common/models/has-id-name';
import { DataHandlerService } from '../common/services/data-handler.service';

@Component({
	selector: 'dscribe-entity-list-editor',
	templateUrl: './entity-list-editor.component.html'
})
export class EntityListEditorComponent implements OnInit, OnChanges {
	@Input() entity: any;
	@Input() property: PropertyMetadata;
	@Input() overridePropertyName: string;
	@Input() isFilter: boolean;

	master: MasterReference;
	items: HasIdName[];
	constructor(
		private dataHandlerService: DataHandlerService) {
	}


	ngOnInit(): void {
		this.dataHandlerService.getIdAndNames(this.property.EntityTypeName).subscribe(
			(res: any) => {
				this.items = res;
			},
			(errors: any) => {
			}
		);
		// TODO: Will cause exception
		this.master = new MasterReference(this.entity, this.property);
	}

	ngOnChanges(): void {
		if (!this.master) {
			// TODO: Will cause exception
			this.master = new MasterReference(this.entity, this.property);
		}
		this.master.master = this.entity;
		this.master.masterProperty = this.property;
	}
}
