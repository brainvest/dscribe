import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DscribeService} from '../../dscribe.service';
import {Observable, ReplaySubject} from 'rxjs';
import {EntityMetadata} from '../../metadata/entity-metadata';
import {CompleteMetadataModel} from '../../metadata/complete-metadata-model';
import {map} from 'rxjs/operators';
import {PropertyResponse, TypeResponse} from '../../metadata/response-models';
import {PropertyMetadata} from '../../metadata/property-metadata';

@Injectable({
	providedIn: 'root'
})
export class MetadataService {
	types$: ReplaySubject<EntityMetadata[]> = new ReplaySubject<EntityMetadata[]>(1);
	private currentTypes: EntityMetadata[];

	constructor(private http: HttpClient, private config: DscribeService) {
		console.log('new instance');
		this.config.appInstance$.subscribe(() => this.clearMetadata());
	}

	getComplete(): void {
		this.http.get<CompleteMetadataModel>(this.config.url('api/metadata/getComplete'))
			.subscribe(x => {
				this.currentTypes = this.extractTypeSemantics(x.entities, x.propertyDefaults);
				this.fixUpRelationships();
				this.types$.next(this.currentTypes);
			}, console.error);
	}

	getTypeByName(typeName: string): Observable<EntityMetadata> {
		return this.types$.pipe(map(types => types.find(x => x.name === typeName)));
	}

	private extractTypeSemantics(types: TypeResponse[], allDefaultFacets): EntityMetadata[] {
		const result: EntityMetadata[] = [];
		for (const tName in types) {
			if (!(tName in types)) {
				continue;
			}
			const t = types[tName];
			const type = new EntityMetadata(t.name, t.singularTitle, t.pluralTitle,
				t.typeGeneralUsageCategoryId);
			type.properties = {};
			type.propertyNames = [];
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
					type.properties[propertyName] = newProperty;
					type.propertyNames.push(propertyName);
				}
			}
			result.push(type);
		}
		return result;
	}

	private fixUpRelationships() {
		this.currentTypes.forEach(type => {
			for (const propertyName in type.properties) {
				if (type.properties.hasOwnProperty(propertyName)) {
					const prop = type.properties[propertyName];
					if (prop.entityTypeName) {
						prop.entityType = this.currentTypes.find(x => x.name === prop.entityTypeName);
					}
					if (prop.foreignKeyName) {
						prop.foreignKeyProperty = type.properties[prop.foreignKeyName];
					}
					if (prop.inversePropertyName && prop.entityType && prop.entityType.properties) {
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
