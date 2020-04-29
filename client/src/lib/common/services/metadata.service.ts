import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DscribeService} from '../../dscribe.service';
import {Observable, ReplaySubject} from 'rxjs';
import {EntityTypeMetadata} from '../../metadata/entity-type-metadata';
import {CompleteMetadataModel} from '../../metadata/complete-metadata-model';
import {map} from 'rxjs/operators';
import {PropertyResponse, PropertyBehaviorResponse} from '../../metadata/response-models';
import {PropertyMetadata, PropertyBehavior} from '../../metadata/property-metadata';

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
				this.currentEntityTypes = MetadataService.extractEntityTypeMetadata(x.EntityTypes, x.PropertyDefaults);
				this.fixUpRelationships();
				this.entityTypes$.next(this.currentEntityTypes);
			}, console.error);
	}

	getEntityTypeByName(entityTypeName: string): Observable<EntityTypeMetadata> {
		return this.entityTypes$.pipe(map(types => types.find(x => x.Name === entityTypeName)));
	}

	private static extractEntityTypeMetadata(
		entityTypes: { [key: string]: any },
		allDefaultFacets: { [key: string]: any }): EntityTypeMetadata[] {
		const result: EntityTypeMetadata[] = [];
		for (const entityTypeName in entityTypes) {
			if (!(entityTypeName in entityTypes)) {
				continue;
			}
			const t = entityTypes[entityTypeName];
			const entityTypeMetadata = new EntityTypeMetadata(t.Name, t.SingularTitle, t.PluralTitle,
				t.TypeGeneralUsageCategoryId);
			entityTypeMetadata.Properties = {};
			entityTypeMetadata.PropertyNames = [];
			for (const propertyName in t.Properties) {
				if (t.Properties.hasOwnProperty(propertyName)) {
					const oldProperty: PropertyResponse = t.Properties[propertyName];
					const defaultFacets = allDefaultFacets[oldProperty.GeneralUsage];
					const newProperty = new PropertyMetadata();
					newProperty.FacetValues = {};

					if (defaultFacets) {
						for (const dfName in defaultFacets.Defaults) {
							if (defaultFacets.Defaults.hasOwnProperty(dfName)) {
								if (oldProperty.LocalFacets && oldProperty.LocalFacets[dfName]) {
									newProperty.FacetValues[dfName] =
										oldProperty.LocalFacets[dfName].Value;
									delete oldProperty.LocalFacets[dfName];
								} else {
									newProperty.FacetValues[dfName] = defaultFacets.Defaults[dfName].Value;
								}
							}
						}
					}

					for (const dfName in oldProperty.LocalFacets) {
						if (oldProperty.LocalFacets.hasOwnProperty(dfName)) {
							newProperty.FacetValues[dfName] = oldProperty.LocalFacets[dfName].Value;
						}
					}

					newProperty.Name = oldProperty.Name;
					newProperty.DataType = oldProperty.DataType;
					newProperty.EntityTypeName = oldProperty.EntityTypeName;
					newProperty.ForeignKeyName = oldProperty.ForeignKeyName;
					newProperty.GeneralUsage = oldProperty.GeneralUsage;
					newProperty.InversePropertyName = oldProperty.InversePropertyName;
					newProperty.Title = oldProperty.Title;
					newProperty.IsNullable = oldProperty.IsNullable;
					newProperty.IsExpression = oldProperty.IsExpression;
					newProperty.Behaviors = this.convertBehaviors(oldProperty.Behaviors);
					entityTypeMetadata.Properties[propertyName] = newProperty;
					entityTypeMetadata.PropertyNames.push(propertyName);
				}
			}
			result.push(entityTypeMetadata);
		}
		return result;
	}

	private static convertBehaviors(behaviors: PropertyBehaviorResponse[]) : PropertyBehavior[] {
		if (!behaviors) {
			return null;
		}
		var result : PropertyBehavior[] = [];
		for (const behavior of behaviors) {
			result.push(new PropertyBehavior(behavior.BehaviorName, behavior.Parameters));
		}
		return result;
	}

	private fixUpRelationships() {
		this.currentEntityTypes.forEach(type => {
			for (const propertyName in type.Properties) {
				if (type.Properties.hasOwnProperty(propertyName)) {
					const prop = type.Properties[propertyName];
					if (prop.EntityTypeName) {
						prop.EntityType = this.currentEntityTypes.find(x => x.Name === prop.EntityTypeName);
					}
					if (prop.ForeignKeyName) {
						prop.ForeignKeyProperty = type.Properties[prop.ForeignKeyName];
					}
					if (prop.InversePropertyName && prop.EntityTypeName && prop.EntityType.Properties) {
						prop.InverseProperty = prop.EntityType.Properties[prop.InversePropertyName];
					}
				}
			}
		});
	}

	clearMetadata() {
		this.getComplete();
	}
}
