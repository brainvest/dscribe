import {DigestEntityType} from './digest-entity-type';
import {PropertyMetadata} from './property-metadata';
import {SelectionContainer} from '../common/models/selection-container';
import {ManageEntityModes} from '../add-n-edit/models/manage-entity-modes';
import {KnownFacets} from './facets/known-facet';

export class EntityTypeMetadata extends DigestEntityType {
	properties: { [name: string]: PropertyMetadata };
	propertyNames: string[];
	private _parentProperty: PropertyMetadata;

	constructor(public name: string, singularTitle: string, pluralTitle: string,
							typeGeneralUsageCategoryId: number) {
		super(name, singularTitle, pluralTitle, typeGeneralUsageCategoryId);
	}

	getPrimaryKey(): PropertyMetadata {
		for (const propertyName of this.propertyNames) {
			const property = this.properties[propertyName];
			if (property.generalUsage === 'PrimaryKey') {
				return property;
			}
		}
		return null;
	}

	getPropertiesForManage(mode: ManageEntityModes): PropertyMetadata[] {
		const hideFacet = mode === ManageEntityModes.Insert ? KnownFacets.HideInInsert : KnownFacets.HideInEdit;
		let props: PropertyMetadata[] = [];
		for (const propertyName of this.propertyNames) {
			const property = this.properties[propertyName];
			if (property.facetValues[hideFacet]) {
				continue;
			}
			props.push(property);
		}
		return props;
	}

	getPropertiesForFilter(): PropertyMetadata[] {
		let props: PropertyMetadata[] = [];
		const fks: PropertyMetadata[] = [];

		// if (parentProperty && parentProperty._entityTypeName === DataTypes.NavigationList) {
		//   props.push(new PropertyMetadata('Count', 'count',
		// 'NormalData', DataTypes.int, null, null, null,
		//     null, this, null, null, null, 'تعداد', false));
		// }

		for (const propertyName of this.propertyNames) {
			const property = this.properties[propertyName];
			if (property.dataType === 'ForeignKey') {
				if (!props.find(x => x.foreignKeyProperty === property)) {
					fks.push(property);
				}
				continue;
			}
			if (property.dataType === 'NavigationEntity') {
				const index = fks.indexOf(property.foreignKeyProperty);
				if (index !== -1) {
					fks.splice(index, 1);
				}
			}
			props.push(property);
		}
		props = props.concat(fks);
		return props;
	}

	getPropertiesForGrouping(): SelectionContainer<PropertyMetadata>[] {
		const props: SelectionContainer<PropertyMetadata>[] = [];
		for (const propertyName of this.propertyNames) {
			const property = this.properties[propertyName];
			if (!property.facetValues.HideInList) {
				props.push(new SelectionContainer<PropertyMetadata>(property, false));
			}
		}

		return props;
	}
}
