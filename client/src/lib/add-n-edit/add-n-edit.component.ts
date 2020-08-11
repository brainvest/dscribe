import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntityTypeMetadata} from '../metadata/entity-type-metadata';
import {MasterReference} from '../list/models/master-reference';
import {MetadataService} from '../common/services/metadata.service';
import {DataHandlerService} from '../common/services/data-handler.service';
import {EntityBase} from '../common/models/entity-base';
import {SnackBarService} from '../common/notifications/snackbar.service';
import {AddNEditResult} from '../common/models/add-n-edit-result';
import {AddNEditStructure, EditorComponentTypes, ListBehaviors} from './models/add-n-edit-structure';
import {ManageEntityModes} from './models/manage-entity-modes';
import {AddNEditStructureLogic} from './add-n-edit-structure-logic';
import {Result} from '../common/models/Result';

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
	@Input() masters: MasterReference[];
	@Output() entitySaved = new EventEmitter<AddNEditResult>();
	@Output() canceled = new EventEmitter();
	@Input() parentStructure: AddNEditStructure;

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
		this.structure = AddNEditStructureLogic.getStructure(this.entity, this.entityTypeMetadata, this.action, this.masters, '', '');
	}

	private afterEntitySaved(action: ManageEntityModes, entity: any) {
		this.entitySaved.emit(new AddNEditResult(action, entity));
	}

	saveEntity() {

		for (let i = 0; i < this.structure.directProperties.length; i++) {
			const prop = this.structure.directProperties[i];
			if (prop.Name) {
				this.structure.directProperties[i].ValidationErrors = null;
			}
		}

		if (this.parentStructure && this.parentStructure.listBehavior === ListBehaviors.SaveInObject) {
			this.parentStructure.currentEntity.push(this.entity);
			this.afterEntitySaved(this.action, this.entity);
			return;
		}

		this.dataHandler.manageEntity(this.entity, this.entityTypeName, this.action).subscribe(
			(res) => {
				if (res.Succeeded) {
					this.processSaveResponse(res.Data, this.action);
				} else {
					this.processFailure(res);
					this.snackbarService.open(this.getMessageFromServerValidationError(res));
				}
			},
			(errors: any) => {
				this.processFailure(errors);
				this.snackbarService.open(this.getMessageFromServerValidationError(errors));
			}
		)
		;
	}

	private getMessageFromServerValidationError(errors) {
		let message = errors.Message;
		if (errors.Errors) {
			for (const key in errors.Errors) {
				if (!errors.Errors.hasOwnProperty(key)) {
					continue;
				}
				const value = errors.Errors[key];
				if (!value) {
					continue;
				}
				for (const item of value) {
					message = this.smartAppend(message, item.Message);
				}
			}
		}
		return message;
	}

	private smartAppend(text1, text2) {
		if (!text1) {
			return text2;
		}
		if (!text2) {
			return text1;
		}
		return text1 + "\n " + text2;
	}

	cancel() {
		this.canceled.emit();
	}

	processFailure(error: Result<any>) {
		if (error.Errors) {
			for (let i = 0; i < this.structure.directProperties.length; i++) {
				const prop = this.structure.directProperties[i];
				if (prop.Name && error.Errors[prop.Name]) {
					this.structure.directProperties[i].ValidationErrors = error.Errors[prop.Name];
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
