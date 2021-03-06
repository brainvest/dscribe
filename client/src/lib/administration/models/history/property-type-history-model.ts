import { HistoryType } from './history-type';
import { PropertyBase } from './../../../metadata/property-base';
import { IHistory } from './history-model';
import { PropertyInfoModel } from '../property-info-model';
import {MetadataBasicInfoModel} from '../../../metadata/metadata-basic-info-model';
import {EntityTypeBase} from '../../../metadata/entity-type-base';

export class PropertyHistoryModel implements IHistory {
	Property: PropertyBase;
	LogId: number;
	ProcessDuration: string;
	Action: string;
	StartTime: Date;
	UserId: string;
	basicInfo: MetadataBasicInfoModel;
	properties: PropertyBase[];
	entityTypes: EntityTypeBase[];
	allPropertiesInfo: PropertyInfoModel[];
	historyType: HistoryType;
	constructor() {
		this.Property = new PropertyBase();
		this.Property.DataTypeId = 1;
		this.Property.OwnerEntityTypeId = 1;
		this.Property.PropertyGeneralUsageCategoryId = 1;
	}
}


