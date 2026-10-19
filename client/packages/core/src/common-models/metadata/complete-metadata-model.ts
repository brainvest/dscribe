import {EntityTypeResponse, PropertyDefaultsResponse} from "./response-models";

export type CompleteMetadataModel = {
	entityTypes: {[key: string]: EntityTypeResponse};
	propertyDefaults: {[key: string]: PropertyDefaultsResponse};
};
