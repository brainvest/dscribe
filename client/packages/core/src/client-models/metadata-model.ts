import {CompleteMetadataModel} from "../common-models/metadata/complete-metadata-model";
import {EntityTypeMetadata} from "../common-models/metadata/entity-type-metadata";
import {PropertyBehavior} from "../common-models/metadata/property-metadata";
import {PropertyBehaviorResponse} from "../common-models/metadata/response-models";

export class MetadataModel {
	private entityTypes: EntityTypeMetadata[];

	constructor(bundle: CompleteMetadataModel) {
		this.entityTypes = MetadataModel.extractEntityTypeMetadata(bundle.entityTypes, bundle.propertyDefaults);
		this.fixUpRelationships();
	}

	getEntityTypeByName(entityTypeName: string): EntityTypeMetadata | undefined {
		return this.entityTypes.find(x => x.Name === entityTypeName);
	}

	private static extractEntityTypeMetadata(
		entityTypes: {[key: string]: any},
		allDefaultFacets: {[key: string]: any}): EntityTypeMetadata[] {
		const result: EntityTypeMetadata[] = [];
		for (const entityTypeName in entityTypes) {
			if (!(entityTypeName in entityTypes)) {
				continue;
			}
			const t = entityTypes[entityTypeName];
			const entityTypeMetadata = new EntityTypeMetadata(t.name, t.singularTitle, t.pluralTitle,
				t.typeGeneralUsageCategoryId, t.code, t.displayName);
			entityTypeMetadata.setProperties(t, allDefaultFacets, result);
		}
		return result;
	}

	private static convertBehaviors(behaviors: PropertyBehaviorResponse[]): PropertyBehavior[] | undefined {
		if (!behaviors) {
			return undefined;
		}
		var result: PropertyBehavior[] = [];
		for (const behavior of behaviors) {
			result.push(new PropertyBehavior(behavior.behaviorName, behavior.parameters));
		}
		return result;
	}

	private fixUpRelationships() {
		this.entityTypes.forEach(type => {
			for (const propertyName in type.properties) {
				if (type.properties.hasOwnProperty(propertyName)) {
					const prop = type.properties[propertyName];
					if (prop.entityTypeName) {
						prop.entityType = this.entityTypes.find(x => x.name === prop.entityTypeName);
					}
					if (prop.foreignKeyName) {
						prop.foreignKeyProperty = type.properties[prop.foreignKeyName];
					}
					if (prop.inversePropertyName && prop.entityTypeName && prop.entityType?.properties) {
						prop.inverseProperty = prop.entityType?.properties[prop.inversePropertyName];
					}
				}
			}
		});
	}
}
