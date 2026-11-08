import {EntityTypeMetadata} from "../abstractions/metadata-abstractions";
import {CompleteMetadataModel} from "../common-models/metadata/complete-metadata-model";
import {EntityTypeMetadataImplementation} from "../common-models/metadata/entity-type-metadata-implementation";

export class MetadataModel {
	private entityTypes: EntityTypeMetadata[];

	constructor(bundle: CompleteMetadataModel) {
		this.entityTypes = MetadataModel.extractEntityTypeMetadata(bundle.entityTypes, bundle.propertyDefaults);
		this.fixUpRelationships();
	}

	getEntityTypeByName(entityTypeName: string): EntityTypeMetadata | undefined {
		return this.entityTypes.find(x => x.name === entityTypeName);
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
			const entityTypeMetadata = new EntityTypeMetadataImplementation(t.name, t.singularTitle, t.pluralTitle,
				t.typeGeneralUsageCategoryId, t.code, t.displayName);
			entityTypeMetadata.setProperties(t, allDefaultFacets, result);
			result.push(entityTypeMetadata);
		}
		return result;
	}

	private fixUpRelationships() {
		const entityTypes = this.entityTypes as EntityTypeMetadataImplementation[];
		entityTypes.forEach(type => {
			for (const propertyName in type.properties) {
				if (type.properties.hasOwnProperty(propertyName)) {
					const prop = type.properties[propertyName];
					if (prop.entityTypeName) {
						prop.entityType = entityTypes.find(x => x.name === prop.entityTypeName);
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
