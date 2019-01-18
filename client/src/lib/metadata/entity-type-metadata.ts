import {DigestEntityType} from './digest-entity-type';
import {PropertyMetadata} from './property-metadata';
import {SelectionContainer} from '../common/models/selection-container';
import {ManageEntityModes} from '../add-n-edit/models/manage-entity-modes';
import {KnownFacets} from './facets/known-facet';

export class EntityTypeMetadata extends DigestEntityType {
	Properties: { [Name: string]: PropertyMetadata };
	PropertyNames: string[];
	private _parentProperty: PropertyMetadata;

	constructor(public Name: string, singularTitle: string, pluralTitle: string,
							typeGeneralUsageCategoryId: number) {
		super(Name, singularTitle, pluralTitle, typeGeneralUsageCategoryId);
	}

	getPrimaryKey(): PropertyMetadata {
		for (const propertyName of this.PropertyNames) {
			const property = this.Properties[propertyName];
			if (property.GeneralUsage === 'PrimaryKey') {
				return property;
			}
		}
		return null;
	}

	getPropertiesForManage(mode: ManageEntityModes): PropertyMetadata[] {
		const hideFacet = mode === ManageEntityModes.Insert ? KnownFacets.HideInInsert : KnownFacets.HideInEdit;
		const props: PropertyMetadata[] = [];
		for (const propertyName of this.PropertyNames) {
			const property = this.Properties[propertyName];
			if (property.FacetValues[hideFacet]) {
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
		//     null, this, null, null, null, 'Count', false));
		// }

		for (const propertyName of this.PropertyNames) {
			const property = this.Properties[propertyName];
			if (property.DataType === 'ForeignKey') {
				if (!props.find(x => x.ForeignKeyProperty === property)) {
					fks.push(property);
				}
				continue;
			}
			if (property.DataType === 'NavigationEntity') {
				const index = fks.indexOf(property.ForeignKeyProperty);
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
		for (const propertyName of this.PropertyNames) {
			const property = this.Properties[propertyName];
			if (!property.FacetValues.HideInList) {
				props.push(new SelectionContainer<PropertyMetadata>(property, false));
			}
		}

		return props;
	}
}
