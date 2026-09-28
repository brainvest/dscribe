import {DataTypes} from "../../metadata/data-types";
import {EntityTypeMetadata} from "../../metadata/entity-type-metadata";

export class SortItem {
	constructor(public propertyName: string, public isDescending: boolean) {
	}

	public static Create(propertyName: string, isDescending: boolean, entityType: EntityTypeMetadata) {
		const property = entityType.Properties[propertyName];
		if (property == null) {
			return null;
		}
		const navigationProperty = entityType.PropertyNames.find(x => entityType.Properties[x].ForeignKeyProperty == property);
		var nameProperty = property?.EntityType?.displayNamePath;
		if (property.DataType != DataTypes.ForeignKey || !navigationProperty || !nameProperty) {
			return new SortItem(propertyName, isDescending);
		}
		if (nameProperty) {
			return new SortItem(navigationProperty + "." + nameProperty, isDescending);
		}
	}
}
