import {Observable, ReplaySubject} from 'rxjs';
import {EntityMetadata} from './entity-metadata';
import {PropertyResponse, TypeResponse} from './response-models';
import {PropertyMetadata} from './property-metadata';
import {CompleteMetadataModel} from './complete-metadata-model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {DscribeService} from '../dscribe.service';

export type FacetValue = [boolean, number, string];

export interface FacetContainer {
	[facetName: string]: FacetValue;
}

export interface BasePropertyFacetValues {
	root: FacetContainer;

	[usageCategory: string]: FacetContainer;
}


export class Metadata {
	private typesObservable: ReplaySubject<EntityMetadata[]> = new ReplaySubject<EntityMetadata[]>(1);
	private currentTypes: EntityMetadata[];

	constructor(private http: HttpClient, private config: DscribeService) {
		this.getComplete();
	}

	getComplete(): void {
		this.http.get<CompleteMetadataModel>(this.config.url('api/metadata/getComplete'))
			.subscribe(x => {
				this.currentTypes = this.extractTypeSemantics(x.entities, x.propertyDefaults);
				this.fixUpRelationships();
				this.typesObservable.next(this.currentTypes);
			}, console.error);
	}

	getAllTypes(): Observable<EntityMetadata[]> {
		return this.typesObservable;
	}

	getTypeByName(typeName: string): Observable<EntityMetadata> {
		return this.typesObservable.pipe(map(types => types.find(x => x.name === typeName)));
	}

	private extractTypeSemantics(types: TypeResponse[], allDefaultFacets): EntityMetadata[] {
		const result: EntityMetadata[] = [];
		for (const tName in types) {
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
}
