import {Component, computed, inject, input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {ManageEntityModes, PropertyMetadata} from '@waltzar/core';
import {RouterLink} from '@angular/router';
import {ActiveApp} from '../../../core/active-app';

/** How a property is edited, derived from its metadata data type. */
export type FieldKind = 'text' | 'number' | 'checkbox' | 'date' | 'reference';

export interface FormField {
	name: string;
	title: string;
	kind: FieldKind;
	required: boolean;
	/** For `reference` fields: the title of the entity the field points at. */
	referenceTitle?: string;
}

const NUMBER_TYPES = new Set(['int', 'long', 'short', 'byte', 'decimal', 'double']);
const DATE_TYPES = new Set(['Date', 'DateTime', 'DateTimeOffset']);

/**
 * A data-entry form rendered entirely from the metadata of one entity type: which fields exist, their titles and
 * editors come from the server, so a new entity type needs no client code.
 */
@Component({
	selector: 'app-entity-form',
	imports: [
		ReactiveFormsModule,
		RouterLink,
		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
	],
	templateUrl: './entity-form.html',
	styleUrl: './entity-form.scss',
})
export class EntityForm {
	private readonly activeApp = inject(ActiveApp);

	/** Bound from the `:entityTypeName` route parameter. */
	readonly entityTypeName = input.required<string>();

	protected readonly metadataState = computed(() => this.activeApp.metadata().state);
	protected readonly entityType = computed(() => this.activeApp.formByName(this.entityTypeName()));

	protected readonly fields = computed<FormField[]>(() =>
		(this.entityType()?.getPropertiesForManage(ManageEntityModes.Insert) ?? []).map(toField),
	);

	protected readonly form = computed(
		() =>
			new FormGroup(
				Object.fromEntries(
					this.fields().map((field) => [
						field.name,
						new FormControl(field.kind === 'checkbox' ? false : '', {
							nonNullable: true,
							validators: field.required && field.kind !== 'checkbox' ? [Validators.required] : [],
						}),
					]),
				),
			),
	);
}

function toField(property: PropertyMetadata): FormField {
	return {
		name: property.name ?? '',
		title: property.title ?? property.name ?? '',
		kind: kindOf(property),
		required: !property.isNullable,
		referenceTitle: property.entityType?.singularTitle,
	};
}

function kindOf(property: PropertyMetadata): FieldKind {
	const type = property.dataType ?? '';
	if (type === 'ForeignKey') {
		return 'reference';
	}
	if (type === 'bool') {
		return 'checkbox';
	}
	if (NUMBER_TYPES.has(type)) {
		return 'number';
	}
	if (DATE_TYPES.has(type)) {
		return 'date';
	}
	return 'text';
}
