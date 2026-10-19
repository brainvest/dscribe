import {FacetContainer} from "./facets";
import {FieldError} from "../contract-models/result";

export interface DigestEntityType {
	name: string;
	singularTitle: string;
	pluralTitle: string;
	typeGeneralUsageCategoryId: number;
}

export interface EntityTypeMetadata extends DigestEntityType {
}

export interface HasTypeInfo {
	isNullable?: boolean;
	dataType?: string;
	entityType?: EntityTypeMetadata;
}

export interface PropertyMetadata extends HasTypeInfo {
	readonly name?: string,
	readonly generalUsage?: string,
	readonly dataType?: string,
	readonly entityTypeName?: string,
	readonly foreignKeyName?: string,
	readonly inversePropertyName?: string,
	readonly validationErrors?: FieldError[],
	readonly entityType?: EntityTypeMetadata,
	readonly inverseProperty?: PropertyMetadata,
	readonly foreignKeyProperty?: PropertyMetadata,
	readonly facetValues?: FacetContainer,
	readonly title?: string,
	readonly isNullable?: boolean,
	readonly isExpression?: boolean,
	readonly behaviors?: PropertyBehavior[],
}
