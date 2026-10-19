import {EntityTypeMetadata} from '../../abstractions/metadata-abstractions';
import {PropertyMetadata} from '../property-metadata';
import {SelectionContainer} from '../../contract-models/selection-container';
import {ManageEntityModes} from '../../client-models/manage-entity-modes';
import {KnownFacets} from '../../abstractions/facets';
import {PropertyResponse} from './response-models';

export class EntityTypeMetadataImplementation implements EntityTypeMetadata {
	properties: {[Name: string]: PropertyMetadata};
	propertyNames: string[];
	// private _parentProperty: PropertyMetadata;

	constructor(public readonly name: string, public readonly singularTitle: string, public readonly pluralTitle: string,
		public readonly typeGeneralUsageCategoryId: number, public codePath: string
		, public displayNamePath: string) {
		this.properties = {};
		this.propertyNames = [];
	}

	setProperties(t: any, allDefaultFacets: {[key: string]: any;}, result: EntityTypeMetadata[]) {
		for (const propertyName in t.Properties) {
			if (t.Properties.hasOwnProperty(propertyName)) {
				const oldProperty: PropertyResponse = t.Properties[propertyName];
				const defaultFacets = allDefaultFacets[oldProperty.generalUsage];
				const newProperty = new PropertyMetadata();
				newProperty.facetValues = {};

				if (defaultFacets) {
					for (const dfName in defaultFacets.Defaults) {
						if (defaultFacets.Defaults.hasOwnProperty(dfName)) {
							if (oldProperty.localFacets && oldProperty.localFacets[dfName]) {
								newProperty.facetValues[dfName] =
									oldProperty.localFacets[dfName].value;
								delete oldProperty.localFacets[dfName];
							} else {
								newProperty.facetValues[dfName] = defaultFacets.Defaults[dfName].value;
							}
						}
					}
				}

				for (const dfName in oldProperty.localFacets) {
					if (oldProperty.localFacets.hasOwnProperty(dfName)) {
						newProperty.facetValues[dfName] = oldProperty.localFacets[dfName].value;
					}
				}

				newProperty.name = oldProperty.name;
				newProperty.dataType = oldProperty.dataType;
				newProperty.entityTypeName = oldProperty.entityTypeName;
				newProperty.foreignKeyName = oldProperty.foreignKeyName;
				newProperty.generalUsage = oldProperty.generalUsage;
				newProperty.inversePropertyName = oldProperty.inversePropertyName;
				newProperty.title = oldProperty.title;
				newProperty.isNullable = oldProperty.isNullable;
				newProperty.isExpression = oldProperty.isExpression;
				newProperty.behaviors = this.convertBehaviors(oldProperty.behaviors);
				entityTypeMetadata.properties[propertyName] = newProperty;
				entityTypeMetadata.propertyNames.push(propertyName);
			}
		}
		result.push(entityTypeMetadata);
	}


	getPrimaryKey(): PropertyMetadata | undefined {
		for (const propertyName of this.propertyNames) {
			const property = this.properties[propertyName];
			if (property.generalUsage === 'PrimaryKey') {
				return property;
			}
		}
		return undefined;
	}

	getPropertiesForManage(mode: ManageEntityModes): PropertyMetadata[] {
		const hideFacet = mode === ManageEntityModes.Insert ? KnownFacets.HideInInsert : KnownFacets.HideInEdit;
		const props: PropertyMetadata[] = [];
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
		//     null, this, null, null, null, 'Count', false));
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
