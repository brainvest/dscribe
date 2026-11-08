import {EntityTypeMetadata, PropertyMetadata} from "../abstractions/metadata-abstractions";
import {MasterReference} from "./master-reference";

export interface AddNEditStructure {
	path: string;
	pathTitle: string;
	currentEntity?: any;
	componentType: EditorComponentTypes;
	parentEntity?: any;
	entityTypeMetadata?: EntityTypeMetadata;
	propertyMetadata?: PropertyMetadata;
	children?: AddNEditStructure[];
	listBehavior?: ListBehaviors;
	masterReferences?: MasterReference[];
	directProperties?: PropertyMetadata[];
}

export enum EditorComponentTypes {
	FlatPropertiesEditor = 1,
	TabSet,
	PropertyEditor,
	List
}

export enum ListBehaviors {
	SaveInServer = 1,
	SaveInObject
}
