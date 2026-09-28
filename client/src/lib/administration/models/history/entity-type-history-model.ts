import { IHistory } from './history-model';
import { HistoryType } from './history-type';
import {EntityTypeBase} from '../../../metadata/entity-type-base';
import {MetadataBasicInfoModel} from '../../../metadata/metadata-basic-info-model';

export class EntityTypeHistoryModel implements IHistory {
	EntityType: EntityTypeBase;
	LogId: number;
	ProcessDuration: string;
	Action: string;
	StartTime: Date;
	UserId: string;
	basicInfo: MetadataBasicInfoModel;
	historyType: HistoryType;

	constructor() {
		this.EntityType = new EntityTypeBase();
		this.EntityType.EntityTypeGeneralUsageCategoryId = 1;
		this.EntityType.Name = 'a';
		this.EntityType.PluralTitle = 'a';
		this.EntityType.SingularTitle = 'a';
	}
}


