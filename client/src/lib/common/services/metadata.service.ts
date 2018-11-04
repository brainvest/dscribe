import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DscribeService} from '../../dscribe.service';
import {Observable, ReplaySubject} from 'rxjs';
import {EntityTypeMetadata} from '../../metadata/entity-type-metadata';
import {CompleteMetadataModel} from '../../metadata/complete-metadata-model';
import {map} from 'rxjs/operators';
import {PropertyResponse, EntityTypeResponse} from '../../metadata/response-models';
import {PropertyMetadata} from '../../metadata/property-metadata';

@Injectable({
	providedIn: 'root'
})
export class MetadataService {
	entityTypes$: ReplaySubject<EntityTypeMetadata[]> = new ReplaySubject<EntityTypeMetadata[]>(1);
	private currentEntityTypes: EntityTypeMetadata[];

	constructor(private http: HttpClient, private config: DscribeService) {
		console.log('new instance');
		this.config.appInstance$.subscribe(() => this.clearMetadata());
	}

	getComplete(): void {
		this.http.get<CompleteMetadataModel>(this.config.url('api/metadata/getComplete'))
			.subscribe(x => {
				this.currentEntityTypes = this.extractEntityTypeMetadata(x.entityTypes, x.propertyDefaults);
				this.fixUpRelationships();
				this.entityTypes$.next(this.currentEntityTypes);
			}, console.error);
	}

	getEntityTypeByName(entityTypeName: string): Observable<EntityTypeMetadata> {
		return this.entityTypes$.pipe(map(types => types.find(x => x.name === entityTypeName)));
	}

	private extractEntityTypeMetadata(entityTypes: EntityTypeResponse[], allDefaultFacets): EntityTypeMetadata[] {
		const result: EntityTypeMetadata[] = [];
		for (const entityTypeName in entityTypes) {
			if (!(entityTypeName in entityTypes)) {
				continue;
			}
			const t = entityTypes[entityTypeName];
			const entityTypeMetadata = new EntityTypeMetadata(t.name, t.singularTitle, t.pluralTitle,
				t.typeGeneralUsageCategoryId);
			entityTypeMetadata.properties = {};
			entityTypeMetadata.propertyNames = [];
			for (const propertyName in t.properties) {
				if (t.properties.hasOwnProperty(propertyName)) {
					const oldProperty: PropertyResponse = t.properties[propertyName];
					const defaultFacets = allDefaultFacets[oldProperty.generalUsage];
					const newProperty = new PropertyMetadata();
					newProperty.facetValues = {};

					if (defaultFacets) {
						for (const dfName in defaultFacets.defaults) {
							if (defaultFacets.defaults.hasOwnProperty(dfName)) {
								if (oldProperty.localFacets && oldProperty.localFacets[dfName]) {
									newProperty.facetValues[dfName] =
										oldProperty.localFacets[dfName].value;
									delete oldProperty.localFacets[dfName];
								} else {
									newProperty.facetValues[dfName] =
										defaultFacets.defaults[dfName].value;
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
					newProperty.jsName = oldProperty.jsName;
					newProperty.title = oldProperty.title;
					newProperty.isNullable = oldProperty.isNullable;
					newProperty.isExpression = oldProperty.isExpression;
					entityTypeMetadata.properties[propertyName] = newProperty;
					entityTypeMetadata.propertyNames.push(propertyName);
				}
			}
			result.push(entityTypeMetadata);
		}
		return result;
	}

	private fixUpRelationships() {
		this.currentEntityTypes.forEach(type => {
			for (const propertyName in type.properties) {
				if (type.properties.hasOwnProperty(propertyName)) {
					const prop = type.properties[propertyName];
					if (prop.entityTypeName) {
						prop.entityType = this.currentEntityTypes.find(x => x.name === prop.entityTypeName);
					}
					if (prop.foreignKeyName) {
						prop.foreignKeyProperty = type.properties[prop.foreignKeyName];
					}
					if (prop.inversePropertyName && prop.entityTypeName && prop.entityType.properties) {
						prop.inverseProperty = prop.entityType.properties[prop.inversePropertyName];
					}
				}
			}
		});
	}

	clearMetadata() {
		this.getComplete();
	}
}
