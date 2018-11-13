import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntityTypeMetadata} from '../metadata/entity-type-metadata';
import {MasterReference} from '../list/models/master-reference';
import {MetadataService} from '../common/services/metadata.service';
import {DataHandlerService} from '../common/services/data-handler.service';
import {EntityBase} from '../common/models/entity-base';
import {SnackBarService} from '../common/notifications/snackbar.service';
import {AddNEditResult} from '../common/models/add-n-edit-result';
import {AddNEditStructure, EditorComponentTypes} from './models/add-n-edit-structure';
import {ManageEntityModes} from './models/manage-entity-modes';
import {AddNEditStructureLogic} from './add-n-edit-structure-logic';

@Component({
	selector: 'dscribe-add-n-edit',
	templateUrl: './add-n-edit.component.html',
	styleUrls: ['./add-n-edit.component.css']
})
export class AddNEditComponent implements OnInit {

	entityTypeMetadata: EntityTypeMetadata;
	@Input() entity: any;
	@Input() action: ManageEntityModes;
	@Input() entityTypeName: string;
	@Input() master: MasterReference;
	@Output() entitySaved = new EventEmitter<AddNEditResult>();
	@Output() canceled = new EventEmitter();

	structure: AddNEditStructure;
	componentTypes = EditorComponentTypes;

	constructor(
		private metadataService: MetadataService,
		private dataHandler: DataHandlerService,
		private snackbarService: SnackBarService) {
	}

	ngOnInit() {
		this.metadataService
			.getEntityTypeByName(this.entityTypeName)
			.subscribe(
				(metadata: any) => {
					this.entityTypeMetadata = metadata;
					this.createEditorStructure();
				},
				(errors: any) => {
					this.snackbarService.open(errors);
				});
	}

	private createEditorStructure() {
		const masters = this.master ? [this.master] : null;
		this.structure = AddNEditStructureLogic.getStructure(this.entity, this.entityTypeMetadata, this.action, masters, '', '');
	}

	private afterEntitySaved(action: ManageEntityModes, entity: any) {
		this.entitySaved.emit(new AddNEditResult(action, entity));
	}

	saveEntity() {
		this.dataHandler.manageEntity(this.entity, this.entityTypeName, this.action).subscribe(
			(res: any) => {
				this.processSaveResponse(res, this.action);
			},
			(errors: any) => {
				this.processFailure(errors);
				this.snackbarService.open(errors);
			}
		)
		;
	}

	cancel() {
		this.canceled.emit();
	}

	processFailure(error: any) {
		if (error.modelState) {
			for (let i = 0; i < this.structure.directProperties.length; i++) {
				const prop = this.structure.directProperties[i];
				if (prop.Name && error.modelState[prop.Name]) {
					this.structure.directProperties[i].ValidationErrors = error.modelState[prop.Name].errors;
				}
			}
		}
	}

	private processSaveResponse(res: EntityBase, action: ManageEntityModes) {
		for (const prop of this.structure.directProperties) {
			prop.ValidationErrors = [];
		}
		if (this.structure.children) {
			for (const detail of this.structure.children) {
				detail.masterReferences[0].master = res;
				if (detail.masterReferences[0].childList) {
					detail.masterReferences[0].childList.onMasterChanged();
				}
			}
		}
		this.afterEntitySaved(action, res);
	}

}
