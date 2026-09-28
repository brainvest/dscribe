import {AddNEditPropertyMetadataModel} from "../models/add-n-edit-property-metadata-model";
import {MetadataBasicInfoModel} from "../../metadata/metadata-basic-info-model";
import {EntityTypeBase} from "../..//metadata/entity-type-base";
import {PropertyBase} from "../../metadata/property-base";
import {PropertyInfoModel} from "../models/property-info-model";

export class AddNEditPropertyComponentData {
	constructor(
		public property: AddNEditPropertyMetadataModel,
		public isNew,
		public basicInfo: MetadataBasicInfoModel,
		public entityTypes: EntityTypeBase[],
		public thisEntityTypeProperties: PropertyBase[],
		public allProperties: PropertyInfoModel[]) {
	}
}
