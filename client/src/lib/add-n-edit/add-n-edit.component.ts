import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntityMetadata} from '../metadata/entity-metadata';
import {MasterReference} from '../list/models/master-reference';
import {PropertyMetadata} from '../metadata/property-metadata';
import {MetadataService} from '../common/services/metadata.service';
import {DataHandlerService} from '../common/services/data-handler.service';
import {KnownFacets} from '../metadata/facets/known-facet';
import {EntityBase} from '../common/models/entity-base';
import {AddNEditResult} from '../common/models/add-n-edit-result';

@Component({
	selector: 'dscribe-add-n-edit',
	templateUrl: './add-n-edit.component.html',
	styleUrls: ['./add-n-edit.component.css']
})
export class AddNEditComponent implements OnInit {

	entityMetadata: EntityMetadata;
	@Input() entity: any;
	@Input() action: string;
	@Input() entityType: string;
	@Input() master: MasterReference;
	@Output() entitySaved = new EventEmitter<AddNEditResult>();
	@Output() canceled = new EventEmitter();

	properties: PropertyMetadata[];
	detailLists: MasterReference[];

	constructor(private metadataService: MetadataService, private dataHandler: DataHandlerService) {
	}

	ngOnInit() {
		this.metadataService.getTypeByName(this.entityType).subscribe(
			metadata => {
				this.entityMetadata = metadata;
				this.createPropertyEditors();
			},
			error => console.log(error)
		);
	}

	private createPropertyEditors() {
		this.properties = [];
		for (const propertyName in this.entityMetadata.properties) {
			if (this.entityMetadata.properties.hasOwnProperty(propertyName)) {
				const prop = this.entityMetadata.properties[propertyName];
				if (prop.facetValues[KnownFacets.HideInEdit]) {
					continue;
				}
				if (this.master
					&& this.master.masterProperty
					&& this.master.masterProperty.inverseProperty
					&& this.master.masterProperty.inverseProperty.foreignKeyProperty === prop) {
					continue;
				}
				if (prop.dataType === 'NavigationList') {
					if (!this.detailLists) {
						this.detailLists = [];
					}
					this.detailLists.push(new MasterReference(this.entity, prop, this.entityMetadata));
					continue;
				}
				this.properties.push(prop);
			}
		}
	}

	private afterEntitySaved(action: string, entity: any) {
		this.entitySaved.emit(new AddNEditResult(action, entity));
	}

	saveEntity() {
		this.dataHandler.manageEntity(this.entity, this.entityType, this.action).subscribe(
			res => this.processSaveResponse(res, this.action),
			error => this.processFailure(error)
		)
		;
	}

	cancel() {
		this.canceled.emit();
	}

	processFailure(error: any) {
		if (error.modelState) {
			for (let i = 0; i < this.properties.length; i++) {
				const prop = this.properties[i];
				if (prop.name && error.modelState[prop.name]) {
					this.properties[i].validationErrors = error.modelState[prop.name].errors;
				}
			}
		}
	}

	private processSaveResponse(res: EntityBase, action: string) {
		for (const prop of this.properties) {
			prop.validationErrors = [];
		}
		if (this.detailLists && this.detailLists.length) {
			for (const detail of this.detailLists) {
				detail.master = res;
				if (detail.childList) {
					detail.childList.onMasterChanged();
				}
			}
		}
		this.afterEntitySaved(action, res);
	}

}
