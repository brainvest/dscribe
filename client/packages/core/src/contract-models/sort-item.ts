import {EntityTypeMetadata} from "../abstractions/metadata-abstractions";
import {DataTypes} from "../common-models/metadata/data-types";

export class SortItem {
	constructor(public propertyName: string, public isDescending: boolean) {
	}

	public static Create(propertyName: string, isDescending: boolean, entityType: EntityTypeMetadata) {
		const property = entityType.properties[propertyName];
		if (property == null) {
			return null;
		}
		const navigationProperty = entityType.propertyNames.find(x => entityType.properties[x].foreignKeyProperty == property);
		var nameProperty = property?.entityType?.displayNamePath;
		if (property.dataType != DataTypes.ForeignKey || !navigationProperty || !nameProperty) {
			return new SortItem(propertyName, isDescending);
		}
		if (nameProperty) {
			return new SortItem(navigationProperty + "." + nameProperty, isDescending);
		}
	}
}
